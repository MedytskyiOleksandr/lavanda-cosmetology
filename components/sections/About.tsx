import Image from "next/image";
import {Container, Section} from "@/components/ui/Layout";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {CheckCircle2} from "lucide-react";
import myself from "@/public/images/antonina-esthetician-lavanda-cosmetology-kyiv.jpg"

export const About = () => {
  const highlights = [
    "Дипломований косметолог-нутриціолог",
    "Медична освіта",
    "Індивідуальний підбір домашнього догляду",
    "Робота з сертифікованими препаратами",
    "Цілісний підхід до краси (зсередини та зовні)",
  ];

  return (
    <Section id="about" className="bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main Image */}
              <div
                className="relative z-10 w-full h-full rounded-full overflow-hidden border-8 border-white shadow-hover">
                <Image
                  src={myself}
                  alt="Antonina Cholovska, founder and licensed esthetician at Lavanda Cosmetology, holding a skincare serum bottle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Decorative Circle */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-lavender rounded-full z-0 opacity-30"/>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Badge className="mb-6">Засновниця Lavanda Cosmetology</Badge>
            <Heading className="mb-6">Антоніна Чоловська</Heading>
            <p className="text-body text-foreground mb-6">
              Моя місія — допомогти кожному клієнту не просто виглядати краще, а відчувати себе впевнено та здорово. Я
              вірю, що справжня краса — це відображення внутрішнього стану організму.
            </p>
            <p className="text-body text-muted mb-8">
              Саме тому в моїй практиці я поєдную передові косметологічні процедури з глибоким аналізом способу життя та
              харчування. Такий комплексний підхід дозволяє досягати не просто тимчасового візуального ефекту, а
              стійкого результату на довгі роки.
            </p>

            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 size={20} className="text-primary shrink-0"/>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};
