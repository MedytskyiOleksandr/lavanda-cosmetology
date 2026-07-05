"use client";

import {useState, SyntheticEvent} from "react";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: "", phone: "", email: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API call — replace with real endpoint when ready
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSuccess(true);
    setForm(initialForm);
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
                <div className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Телефон</p>
                  <a href="tel:+380000000000" className="text-lg font-medium hover:text-primary transition-colors">
                    +38 (000) 000-00-00
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Електронна пошта</p>
                  <a href="mailto:info@lavanda.com" className="text-lg font-medium hover:text-primary transition-colors">
                    info@lavanda.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lavender-mist rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Адреса</p>
                  <p className="text-lg font-medium">м. Київ, вул. Приклад (центр)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="p-4 bg-surface rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <InstagramIcon width={24} height={24} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-4 bg-surface rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <FacebookIcon width={24} height={24} />
              </a>
            </div>
          </div>

          <div className="bg-surface p-8 md:p-12 rounded-[40px] border border-border shadow-soft">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full min-h-80 text-center gap-4">
                <CheckCircle2 size={56} className="text-primary" />
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
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground ml-1">
                        Номер телефону <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+38 (0__) ___ __ __"
                        required
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
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
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                      Ваше повідомлення <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Я хотіла б дізнатися більше про..."
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>
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
