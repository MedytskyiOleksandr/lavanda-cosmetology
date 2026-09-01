"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {NAVIGATION} from "@/data";
import {Container} from "@/components/ui/Layout";
import {cn} from "@/lib/utils";
import {Menu, X} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 py-4", "bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-2"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-lavender-light">
            <Image
              src="/lavanda_icon.svg"
              alt="Lavanda Cosmetology Logo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-xl md:text-2xl font-heading font-medium tracking-wide text-foreground group-hover:text-primary transition-colors leading-tight">
              Lavanda Cosmetology
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-body font-light">
              Antonina Cholovska
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-4 animate-fade-in">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-foreground py-2 border-b border-lavender-mist last:border-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
