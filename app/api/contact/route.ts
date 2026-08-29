/**
 * Contact form API route
 *
 * Required environment variables in .env.local:
 *
 * TELEGRAM_BOT_TOKEN — get it from @BotFather on Telegram:
 *   1. Open Telegram and search for @BotFather
 *   2. Send /newbot and follow the prompts
 *   3. Copy the token it gives you (looks like 123456:ABC-DEF...)
 *
 * TELEGRAM_CHAT_ID — your personal chat ID:
 *   1. Start a conversation with your bot (send it any message)
 *   2. Open https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates in a browser
 *   3. Find "chat":{"id": <number>} — that number is your chat ID
 *
 * TURNSTILE_SECRET_KEY — from Cloudflare Turnstile dashboard:
 *   1. Go to https://dash.cloudflare.com/ → Turnstile
 *   2. Add a site, copy the Secret Key
 *   3. Also copy the Site Key into NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Common spam patterns — extend as needed
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|crypto|bitcoin|nft|loan|forex|seo\s*service|buy\s*followers|click\s*here)\b/i,
  /https?:\/\/[^\s]{3,}/i, // any URL in the message
  /(.)\1{6,}/, // 7+ repeated characters (aaaaaaa)
];

function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(100, "Ім'я занадто довге"),
  phone: z
    .string()
    .min(7, "Введіть коректний номер телефону")
    .max(20, "Номер телефону занадто довгий")
    .regex(/^[\d\s\+\(\)\-]+$/, "Номер телефону містить недопустимі символи"),
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Повідомлення має містити щонайменше 10 символів")
    .max(2000, "Повідомлення занадто довге"),
  turnstileToken: z.string().min(1, "Перевірка безпеки не пройдена"),
  // Honeypot — must be empty; bots typically fill every field
  website: z.string().max(0, "Bot detected").optional(),
});

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    }
  );

  const data = await res.json();
  return data.success === true;
}

async function sendToTelegram(
  name: string,
  phone: string,
  email: string | undefined,
  message: string
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials are not configured");
  }

  const text = [
    "📬 *Нова заявка з сайту*",
    "",
    `👤 *Ім'я:* ${escapeMarkdown(name)}`,
    `📞 *Телефон:* ${escapeMarkdown(phone)}`,
    email ? `📧 *Email:* ${escapeMarkdown(email)}` : null,
    "",
    `💬 *Повідомлення:*\n${escapeMarkdown(message)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API error: ${err}`);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

// Simple in-memory rate limiter (per IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Забагато запитів. Спробуйте пізніше." },
      { status: 429 }
    );
  }

  // Reject oversized payloads (guard against large-body DoS)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10_000) {
    return NextResponse.json(
      { error: "Запит занадто великий" },
      { status: 413 }
    );
  }

  // Enforce JSON content-type
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Невірний формат запиту" },
      { status: 415 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Невірний формат запиту" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ errors: fieldErrors }, { status: 422 });
  }

  const { name, phone, email, message, turnstileToken, website } = parsed.data;

  // Honeypot check — silently succeed so bots don't know they were blocked
  if (website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Spam content check
  if (isSpam(name) || isSpam(message) || (email && isSpam(email))) {
    return NextResponse.json(
      { error: "Повідомлення містить недопустимий вміст" },
      { status: 422 }
    );
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Перевірка безпеки не пройдена. Спробуйте ще раз." },
      { status: 403 }
    );
  }

  try {
    await sendToTelegram(name, phone, email, message);
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
    return NextResponse.json(
      { error: "Не вдалося надіслати повідомлення. Спробуйте пізніше." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
