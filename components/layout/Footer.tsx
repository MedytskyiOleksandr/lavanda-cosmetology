import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export const Footer = () => {
  return (
    <footer className="bg-surface py-16 md:py-24 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col mb-6">
              <span className="text-2xl font-heading font-medium tracking-wide text-foreground">
                Lavanda Cosmetology
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-body font-light">
                Antonina Cholovska
              </span>
            </Link>
            <p className="text-muted text-body mb-8 max-w-md">
              Професійна косметологія та нутриціологія. Ми створюємо індивідуальні програми для вашої краси та здоров&#39;я, поєднуючи сучасні методики та цілісний підхід.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <InstagramIcon width={20} height={20} />
              </a>
              <a href="#" aria-label="Facebook" className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <FacebookIcon width={20} height={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-medium mb-6">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted group">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span>м. Київ, вул. Приклад (центр)</span>
              </li>
              <li className="flex items-center gap-3 text-muted group">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+380000000000" className="hover:text-primary transition-colors">+38 (000) 000-00-00</a>
              </li>
              <li className="flex items-center gap-3 text-muted group">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:info@lavanda.com" className="hover:text-primary transition-colors">info@lavanda.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-medium mb-6">Години роботи</h4>
            <ul className="space-y-2 text-muted">
              <li className="flex justify-between">
                <span>Пн - Пт:</span>
                <span className="font-medium text-foreground">09:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Сб:</span>
                <span className="font-medium text-foreground">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Нд:</span>
                <span className="font-medium text-foreground">Вихідний</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Lavanda Cosmetology. Всі права захищені.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-primary transition-colors">Умови використання</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
