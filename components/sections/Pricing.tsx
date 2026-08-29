"use client";

import React, {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import {PRICING} from "@/data";
import {Container, Section} from "@/components/ui/Layout";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {ChevronLeft, ChevronRight, X, Sparkles, Flower2, Zap, Syringe, Droplets, Apple, UserRound} from "lucide-react";
import {cn} from "@/lib/utils";
import {PricingCategory} from "@/types";

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "cleansing":
      return <Sparkles size={40} className="text-primary"/>;
    case "care":
      return <Flower2 size={40} className="text-primary"/>;
    case "apparatus":
      return <Zap size={40} className="text-primary"/>;
    case "mesotherapy":
      return <Syringe size={40} className="text-primary"/>;
    case "biorevitalization":
      return <Droplets size={40} className="text-primary"/>;
    case "nutrition":
      return <Apple size={40} className="text-primary"/>;
    case "cosmetologist":
      return <UserRound size={40} className="text-primary"/>;
    default:
      return <Sparkles size={40} className="text-primary"/>;
  }
};

const PricingCard = ({
                       category,
                       isOpen,
                       onOpenChange
                     }: {
  category: PricingCategory;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] px-2 min-w-0">
      <div
        className="relative h-125 w-full group cursor-pointer perspective-1000 transform-style-3d"
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
        onClick={() => onOpenChange(!isOpen)}
      >
        {/* Main Card */}
        <div className={cn(
          "h-full w-full rounded-[40px] p-8 flex flex-col justify-between overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-out border border-border bg-white shadow-soft transform-gpu backface-hidden group-hover:shadow-hover group-hover:rotate-y-5 group-hover:border-lavender",
          isOpen ? "border-lavender rotate-y-5 shadow-hover" : ""
        )}>
          {/* Decorative Background */}
          <div
            className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-lavender/5 rounded-full blur-3xl group-hover:bg-lavender/15 transition-colors duration-700 pointer-events-none"/>

          <div className="relative z-10">
            <div
              className="mb-6 p-4 bg-surface rounded-2xl w-fit shadow-sm border border-lavender-mist group-hover:scale-110 transition-transform duration-500 ease-out transform-gpu">
              {getCategoryIcon(category.id)}
            </div>
            <h3 className="text-2xl md:text-3xl font-heading text-foreground mb-4">{category.category}</h3>
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Ціна від</p>
              <p className="text-xl font-heading font-semibold text-primary">{category.items[0].price.split('-')[0]}</p>
            </div>
            <p
              className="text-sm text-secondary uppercase tracking-widest font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              Детальніше
            </p>
          </div>
        </div>

        {/* Paper View Overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 transition-[opacity,transform] duration-500 ease-out transform-gpu opacity-0 pointer-events-none translate-y-0 scale-[0.98] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:rotate-y-5-z-10",
            isOpen ? "opacity-100 pointer-events-auto scale-100 rotate-y-5-z-10" : ""
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white h-full w-full rounded-[40px] border border-lavender-mist relative flex flex-col overflow-hidden p-1">
            {/* Close button for mobile/touch */}
            <button
              className="absolute top-6 right-8 p-2 text-muted hover:text-primary md:hidden z-30 bg-white/80 backdrop-blur-sm rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onOpenChange(false);
              }}
            >
              <X size={24}/>
            </button>

            <div
              className="flex-1 overflow-y-auto p-5 md:p-7 rounded-[36px] scrollbar-thin scrollbar-thumb-lavender-light">
              <div className="text-center mb-10">
                <h4 className="text-2xl font-heading text-primary mb-2 uppercase tracking-widest">
                  {category.category}
                </h4>
                <div className="flex justify-center items-center gap-3">
                  <div className="h-px w-10 bg-lavender/40"/>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender"/>
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender"/>
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender"/>
                  </div>
                  <div className="h-px w-10 bg-lavender/40"/>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                {category.items.map((item, idx) => (
                  <div key={idx}
                       className="flex justify-between items-baseline gap-3 group/item border-b border-dashed border-lavender-mist/50 pb-2">
                    <span className="text-sm md:text-base text-foreground/90 font-medium flex-2">
                      {item.name}
                    </span>
                    <span
                      className="text-sm md:text-base font-heading font-semibold text-secondary whitespace-nowrap text-right">
                      {item.price}
                    </span>
                  </div>
                ))}

                {category.subcategories?.map((sub, idx) => (
                  <div key={idx} className="mt-12">
                    <div className="text-center mb-8">
                      <h5 className="text-xl font-heading text-primary mb-3 uppercase tracking-wide">
                        {sub.name}
                      </h5>
                      <div className="flex justify-center items-center gap-2 opacity-50">
                        <div className="h-px w-8 bg-lavender"/>
                        <div className="w-1 h-1 rounded-full bg-lavender"/>
                        <div className="h-px w-8 bg-lavender"/>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {sub.items.map((item, sIdx) => (
                        <div key={sIdx}
                             className="flex justify-between items-baseline gap-3 border-b border-dashed border-lavender-mist/50 pb-2">
                          <span className="text-sm md:text-base text-foreground/90 font-medium flex-2">
                            {item.name}
                          </span>
                          <span
                            className="text-sm md:text-base font-heading font-semibold text-secondary whitespace-nowrap text-right">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {(category.showFooterText ?? true) && (
                <div className="mt-10 pt-6 border-t border-lavender-mist text-center">
                  <p className="text-xs text-muted italic">
                    * Вартість може варіюватися залежно від складності процедури та використаних препаратів
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Pricing = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": {slidesToScroll: 2},
      "(min-width: 1024px)": {slidesToScroll: 3},
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setActiveCategoryId(null);
    };

    const handleDragStart = () => {
      setActiveCategoryId(null);
    };

    updateSnaps();
    emblaApi.on("select", handleSelect);
    emblaApi.on("slidesChanged", handleDragStart);
    emblaApi.on("reInit", updateSnaps);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("slidesChanged", handleDragStart);
      emblaApi.off("reInit", updateSnaps);
    };
  }, [emblaApi]);

  return (
    <Section id="pricing" className="bg-surface/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4">Мої послуги</Badge>
          <Heading className="mb-6">Професійні процедури для вашого здоров&#39;я та краси</Heading>
          <p className="text-body text-muted">
            Я пропоную широкий спектр послуг, від класичної косметології до сучасних апаратних методик та
            нутриціологічної підтримки.
          </p>
        </div>

        <div className="relative group/carousel px-0 md:px-16">
          {/* Desktop Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-border shadow-soft hover:border-primary hover:text-primary transition-all text-muted"
            aria-label="Previous view"
          >
            <ChevronLeft size={24}/>
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-border shadow-soft hover:border-primary hover:text-primary transition-all text-muted"
            aria-label="Next view"
          >
            <ChevronRight size={24}/>
          </button>

          <div className="-mx-4 md:-mx-12 px-4 md:px-12 -my-20 py-20 overflow-hidden">
            <div className="embla overflow-visible cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="embla__container flex">
                {[...PRICING].map((category, index) => (
                  <PricingCard
                    key={`${category.id}-${index}`}
                    category={category}
                    isOpen={activeCategoryId === category.id}
                    onOpenChange={(open) => setActiveCategoryId(open ? category.id : null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-primary w-8"
                  : "bg-lavender-mist hover:bg-lavender"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <p className="text-xs text-muted italic">
            * Гортайте вліво або вправо для перегляду
          </p>
        </div>
      </Container>
    </Section>
  );
};
