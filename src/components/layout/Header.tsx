"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Logo from "@/components/brand/Logo";
import LiquidShape from "@/components/liquid/LiquidShape";
import Button from "@/components/ui/Button";
import { nav } from "@/content/site";

/**
 * Barre pleine largeur avec un filet en bas — pas de pilule flottante en
 * verre dépoli, devenue le tic de tous les sites générés.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-paper-50/85 border-b border-paper-200 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8 xl:gap-6">
        <Logo />

        {/* Espacement resserré entre 1024 et 1280 : à `gap-7`, les sept entrées plus
          le bouton dépassaient la largeur de la barre. */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-4 lg:flex xl:gap-7"
        >
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`label link-underline whitespace-nowrap transition-colors duration-300 ${
                isActive(item.href) ? "text-brand-600" : "text-slate-600 hover:text-ink-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="/espace-client" variant="solid">
              Espace client
            </Button>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="border-paper-300 text-ink-900 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm border lg:hidden"
          >
            <span
              className={`bg-current block h-px w-4 transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`bg-current block h-px w-4 transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Panneau mobile : bloc encre plein écran, forme liquide en fond */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="bg-ink-900 fixed inset-0 z-40 overflow-hidden lg:hidden"
      >
        <LiquidShape
          family="drop"
          tone="profond"
          spin={0.8}
          className="absolute -right-[22%] -bottom-[12%] h-[22rem] w-[22rem] opacity-45"
        />

        <div className="relative flex h-[var(--header-h)] items-center px-5 sm:px-8">
          <Logo tone="light" />
        </div>

        <nav
          aria-label="Navigation mobile"
          onClick={() => setOpen(false)}
          className="relative flex flex-col px-5 pt-8 sm:px-8"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-paper-50 font-display flex items-baseline gap-4 border-b border-white/10 py-5 text-3xl"
            >
              <span className="numeric text-aqua-300 text-[0.6rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
          <Button href="/espace-client" variant="light" size="lg" className="mt-10 w-full">
            Espace client
          </Button>
        </nav>
      </div>
    </header>
  );
}
