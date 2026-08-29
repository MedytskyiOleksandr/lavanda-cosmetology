"use client";

import * as React from "react";
import { Container, Section } from "@/components/ui/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { FAQ as FAQData } from "@/data";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Section id="faq" className="bg-surface">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4">Часті запитання</Badge>
          <Heading className="mb-6">Відповіді на ваші запитання</Heading>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-border overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-lavender-mist/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-medium text-foreground pr-8">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={cn("text-primary transition-transform duration-300", openIndex === idx && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "px-8 overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === idx ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-muted leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
