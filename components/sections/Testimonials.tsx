import { TESTIMONIALS } from "@/data";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  return (
    <Section id="testimonials">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4">Відгуки</Badge>
          <Heading className="mb-6">Що говорять клієнти</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 md:p-12 rounded-[40px] border border-border shadow-soft relative overflow-hidden"
            >
              <Quote size={64} className="absolute -top-4 -right-4 text-lavender-mist/40 -z-0" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        "fill-current",
                        i < testimonial.rating ? "text-primary" : "text-lavender-mist"
                      )}
                    />
                  ))}
                </div>
                <p className="text-lg italic text-foreground mb-8 leading-relaxed">
                  &#34;{testimonial.text}&#34;
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-heading font-medium text-xl">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

