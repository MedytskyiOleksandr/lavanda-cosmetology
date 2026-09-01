import Image from "next/image";
import {Container} from "@/components/ui/Layout";
import {Phone, Mail, MapPin} from "lucide-react";
import {InstagramIcon, FacebookIcon} from "@/components/ui/SocialIcons";
import {CONTACT_INFO} from "@/data";

export const Footer = () => {
  return (
    <footer className="bg-surface py-16 md:py-24 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-lavender-mist">
                <Image
                  src="/lavanda_icon.svg"
                  alt="Lavanda Cosmetology Logo"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-heading font-medium tracking-wide text-foreground group-hover:text-primary transition-colors leading-tight">
                  Lavanda Cosmetology
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-body font-light">
                  Antonina Cholovska
                </span>
              </div>
            </div>
            <p className="text-muted text-body mb-8 max-w-md">
              Професійна косметологія та нутриціологія. Cтворюю індивідуальні програми для вашої краси та здоров&#39;я,
              поєднуючи сучасні методики та цілісний підхід.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.instagram} aria-label="Instagram"
                 className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <InstagramIcon width={20} height={20}/>
              </a>
              <a href={CONTACT_INFO.facebook} aria-label="Facebook"
                 className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <FacebookIcon width={20} height={20}/>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-medium mb-6">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted group">

                <MapPin size={20} className="text-primary mt-1 shrink-0"/>
                <a
                  href={CONTACT_INFO.addressGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >{CONTACT_INFO.address}</a>
              </li>
              <li className="flex items-center gap-3 text-muted group">
                <Phone size={20} className="text-primary shrink-0"/>
                <a href={`tel:${CONTACT_INFO.phone.trim()}`} className="hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-muted group">
                <Mail size={20} className="text-primary shrink-0"/>
                <a href={`mailto:${CONTACT_INFO.email}`}  className="hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-medium mb-6">Години роботи</h4>
            <ul className="space-y-2 text-muted">
              <li className="flex justify-between">
                <span>Пн - Сб:</span>
                <span className="font-medium text-foreground">08:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Нд:</span>
                <span className="font-medium text-foreground">Вихідний</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
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
