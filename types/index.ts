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
  id: string;
  category: string;
  image: string;
  items: PricingItem[];
  showFooterText?: boolean;
  subcategories?: {
    name: string;
    items: PricingItem[];
  }[];
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
