export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: "face" | "body" | "nutrition" | "anti-age";
  image?: string;
}

export interface PricingItem {
  name: string;
  price: string;
  duration?: string;
}

export interface PricingCategory {
  category: string;
  items: PricingItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
