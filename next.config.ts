import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // Prevent clickjacking — disallow embedding in iframes
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Enforce HTTPS for 2 years (enable once HTTPS is confirmed on production)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Cloudflare Turnstile + Vercel preview toolbar (injected in preview deployments)
      // 'unsafe-eval' is required by React in development mode for call-stack reconstruction
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://vercel.live https://*.vercel.live`,
      // Styles: self + inline (Tailwind requires this)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs + Unsplash (used in next/image)
      "img-src 'self' data: https://images.unsplash.com",
      // Frames: Cloudflare Turnstile widget runs in an iframe
      "frame-src https://challenges.cloudflare.com",
      // API calls: self + Cloudflare Turnstile verify + Vercel preview toolbar connections
      "connect-src 'self' https://challenges.cloudflare.com https://vercel.live https://*.vercel.live wss://*.vercel.live",
      // Block all plugins (Flash, etc.)
      "object-src 'none'",
      // Disallow <base> tag hijacking
      "base-uri 'self'",
      // Only allow form submissions to self
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.50.135"],
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
