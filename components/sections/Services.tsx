import { SERVICES } from "@/data";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const Services = () => {
  return (
    <Section id="services">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4">Наші послуги</Badge>
          <Heading className="mb-6">Професійні процедури для вашого здоров&#39;я та краси</Heading>
          <p className="text-body text-muted">
            Ми пропонуємо широкий спектр послуг, від класичної косметології до сучасних апаратних методик та нутриціологічної підтримки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-4xl border border-border shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-lavender-mist rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {/* Icon placeholder based on category */}
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-heading font-medium mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-medium text-foreground">{service.price}</span>
                <Button variant="ghost" size="sm" className="p-0 h-auto group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline">Усі послуги та ціни</Button>
        </div>
      </Container>
    </Section>
  );
};
