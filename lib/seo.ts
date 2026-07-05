import { FAQ, SERVICES } from "@/data";

export const getBeautySalonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Lavanda Cosmetology",
  "image": "https://lavanda-cosmetology.com.ua/logo.png", // Placeholder
  "@id": "https://lavanda-cosmetology.com.ua",
  "url": "https://lavanda-cosmetology.com.ua",
  "telephone": "+380000000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "вул. Приклад",
    "addressLocality": "Київ",
    "postalCode": "01001",
    "addressCountry": "UA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.4501,
    "longitude": 30.5234
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/lavanda_cosmetology",
    "https://www.facebook.com/lavanda_cosmetology"
  ],
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cosmetology Services",
    "itemListElement": SERVICES.map((service, index) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.description
      },
      "position": index + 1
    }))
  }
});

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});
