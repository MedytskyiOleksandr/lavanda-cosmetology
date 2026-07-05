import { PRICING } from "@/data";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Clock } from "lucide-react";

export const Pricing = () => {
  return (
    <Section id="pricing" className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <Badge className="mb-4">Прайс-лист</Badge>
            <Heading>Вартість послуг</Heading>
          </div>
          <p className="text-muted text-body max-w-sm">
            Ціни вказані орієнтовно. Остаточна вартість визначається після консультації залежно від обраних препаратів.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PRICING.map((category, idx) => (
            <div key={idx} className="bg-surface p-8 md:p-10 rounded-[40px] border border-border">
              <h3 className="text-2xl font-heading font-medium mb-8 pb-4 border-b border-lavender-mist">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-start gap-4 group">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                      {item.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
                          <Clock size={12} />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 md:w-16 bg-lavender-mist mt-3 hidden sm:block" />
                      <span className="text-lg font-heading font-semibold text-primary whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
