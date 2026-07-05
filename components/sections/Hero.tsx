import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";

export const Hero = () => {
  return (
    <Section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-lavender-mist rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-lavender-mist rounded-full blur-[100px] -z-10 opacity-40" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge className="mb-6">Краса починається тут</Badge>
            <Heading as="h1" variant="display" className="mb-6">
              Ваша шкіра заслуговує на <span className="text-primary italic">професійний</span> догляд
            </Heading>
            <p className="text-body text-muted mb-8 max-w-lg">
              Комплексний підхід до краси та здоров&#39;я: професійна косметологія та індивідуальна нутриціологія від Антоніни Чоловської.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="primary">Записатися на візит</Button>
              <Button size="lg" variant="outline">Переглянути послуги</Button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-heading font-semibold text-foreground">10+</p>
                <p className="text-sm text-muted">Років досвіду</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-semibold text-foreground">2000+</p>
                <p className="text-sm text-muted">Задоволених клієнтів</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-semibold text-foreground">15+</p>
                <p className="text-sm text-muted">Сертифікатів</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in delay-200">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-hover border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
                alt="Cosmetology treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-soft border border-border animate-slide-up delay-500 hidden sm:block">
              <p className="text-primary font-heading text-lg font-medium italic">&#34;Краса — це здоров&#39;я&#34;</p>
              <p className="text-xs text-muted mt-1">— Антоніна Чоловська</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
