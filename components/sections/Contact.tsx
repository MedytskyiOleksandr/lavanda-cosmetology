"use client";

import {useState, useRef, SyntheticEvent} from "react";
import {Container, Section} from "@/components/ui/Layout";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {Input, Textarea} from "@/components/ui/Form";
import {Button} from "@/components/ui/Button";
import {Phone, Mail, MapPin, CheckCircle2} from "lucide-react";
import {InstagramIcon, FacebookIcon} from "@/components/ui/SocialIcons";
import {CONTACT_INFO} from "@/data";
import {Turnstile} from "@marsidev/react-turnstile";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  // Honeypot field — must stay empty; filled only by bots
  website: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  general?: string;
}

const initialForm: FormState = {name: "", phone: "", email: "", message: "", website: ""};

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Введіть ваше ім'я";
  } else if (form.name.trim().length < 2) {
    errors.name = "Ім'я має містити щонайменше 2 символи";
  }

  if (!form.phone.trim()) {
    errors.phone = "Введіть номер телефону";
  } else if (!/^[\d\s\+\(\)\-]{7,20}$/.test(form.phone.trim())) {
    errors.phone = "Введіть коректний номер телефону";
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Введіть коректний email";
  }

  if (!form.message.trim()) {
    errors.message = "Введіть ваше повідомлення";
  } else if (form.message.trim().length < 10) {
    errors.message = "Повідомлення має містити щонайменше 10 символів";
  }

  return errors;
}

export const Contact = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const turnstileToken = useRef<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!turnstileToken.current) {
      setErrors({general: "Будь ласка, пройдіть перевірку безпеки"});
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form, turnstileToken: turnstileToken.current, website: form.website}),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const mapped: FormErrors = {};
          for (const [key, msgs] of Object.entries(data.errors)) {
            (mapped as Record<string, string>)[key] = (msgs as string[])[0];
          }
          setErrors(mapped);
        } else {
          setErrors({general: data.error ?? "Сталася помилка. Спробуйте ще раз."});
        }
        return;
      }

      setIsSuccess(true);
      setForm(initialForm);
      turnstileToken.current = null;
    } catch {
      setErrors({general: "Не вдалося надіслати повідомлення. Перевірте з'єднання."});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Badge className="mb-4">Контакти</Badge>
            <Heading className="mb-6">Залишилися питання? Зв&apos;яжіться зі мною</Heading>
            <p className="text-body text-muted mb-10 max-w-md">
              Я завжди рада відповісти на ваші запитання та допомогти підібрати найкращі процедури для вашої краси.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Phone size={24}/>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Телефон</p>
                  <a href={`tel:${CONTACT_INFO.phone.trim()}`} className="text-lg font-medium hover:text-primary transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Електронна пошта</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24}/>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Адреса</p>
                  <a
                    href={CONTACT_INFO.addressGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium hover:text-primary transition-colors block"
                  >
                    {CONTACT_INFO.address}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href={CONTACT_INFO.instagram}
                aria-label="Instagram"
                target="_blank"
                className="p-4 bg-surface rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <InstagramIcon width={24} height={24}/>
              </a>
              <a
                href={CONTACT_INFO.facebook}
                aria-label="Facebook"
                target="_blank"
                className="p-4 bg-surface rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <FacebookIcon width={24} height={24}/>
              </a>
            </div>
          </div>

          <div className="bg-surface p-8 md:p-12 rounded-[40px] border border-border shadow-soft">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full min-h-80 text-center gap-4">
                <CheckCircle2 size={56} className="text-primary"/>
                <h3 className="text-2xl font-heading font-medium">Дякуємо!</h3>
                <p className="text-muted max-w-xs">
                  Ваше повідомлення надіслано. Я зв&apos;яжуся з вами найближчим часом.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Надіслати ще одне
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-heading font-medium mb-8">Надіслати повідомлення</h3>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">
                        Ваше ім&apos;я <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <Input
                        id="name"
                        placeholder="Олена"
                        value={form.name}
                        aria-invalid={!!errors.name}
                        onChange={(e) => {
                          setForm((f) => ({...f, name: e.target.value}));
                          if (errors.name) setErrors((err) => ({...err, name: undefined}));
                        }}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 ml-1" role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground ml-1">
                        Номер телефону <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+38 (0__) ___ __ __"
                        value={form.phone}
                        aria-invalid={!!errors.phone}
                        onChange={(e) => {
                          setForm((f) => ({...f, phone: e.target.value}));
                          if (errors.phone) setErrors((err) => ({...err, phone: undefined}));
                        }}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 ml-1" role="alert">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">
                      Email <span className="text-muted font-normal">(необов&apos;язково)</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={form.email}
                      aria-invalid={!!errors.email}
                      onChange={(e) => {
                        setForm((f) => ({...f, email: e.target.value}));
                        if (errors.email) setErrors((err) => ({...err, email: undefined}));
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 ml-1" role="alert">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                      Ваше повідомлення <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Я хотіла б дізнатися більше про..."
                      value={form.message}
                      aria-invalid={!!errors.message}
                      onChange={(e) => {
                        setForm((f) => ({...f, message: e.target.value}));
                        if (errors.message) setErrors((err) => ({...err, message: undefined}));
                      }}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 ml-1" role="alert">{errors.message}</p>
                    )}
                  </div>
                  {/* Honeypot — visually hidden, must never be filled by a real user */}
                  <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] overflow-hidden" tabIndex={-1}>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      autoComplete="off"
                      tabIndex={-1}
                      value={form.website}
                      onChange={(e) => setForm((f) => ({...f, website: e.target.value}))}
                    />
                  </div>
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                    onSuccess={(token) => {
                      turnstileToken.current = token;
                      if (errors.general) setErrors((err) => ({...err, general: undefined}));
                    }}
                    onExpire={() => { turnstileToken.current = null; }}
                    onError={() => { turnstileToken.current = null; }}
                  />
                  {errors.general && (
                    <p className="text-sm text-red-500 text-center" role="alert">{errors.general}</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Надсилається..." : "Відправити запит"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
