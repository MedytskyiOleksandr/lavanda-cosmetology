import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Lavanda Cosmetology",
    default: "Lavanda Cosmetology — Антоніна Чоловська",
  },
  description:
    "Lavanda Cosmetology — професійна косметологія та нутриціологія у Києві. Антоніна Чоловська — дипломований косметолог-нутриціолог, засновниця Lavanda Cosmetology.",
  keywords: ["косметолог Київ", "нутриціолог Київ", "чистка обличчя", "пілінги", "anti-age", "Lavanda Cosmetology"],
  authors: [{ name: "Antonina Cholovska" }],
  creator: "Antonina Cholovska",
  metadataBase: new URL("https://lavanda-cosmetology.com.ua"), // Placeholder
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://lavanda-cosmetology.com.ua",
    title: "Lavanda Cosmetology — Антоніна Чоловська",
    description: "Професійна косметологія та нутриціологія у Києві.",
    siteName: "Lavanda Cosmetology",
    images: [
      {
        url: "/lavanda_icon.svg",
        width: 800,
        height: 800,
        alt: "Lavanda Cosmetology Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavanda Cosmetology — Антоніна Чоловська",
    description: "Професійна косметологія та нутриціологія у Києві.",
    images: ["/lavanda_icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${jost.variable} scroll-smooth`}>
      <body className="font-body bg-background text-foreground selection:bg-lavender-light">
        {children}
      </body>
    </html>
  );
}
