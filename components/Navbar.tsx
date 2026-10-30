"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import icon from "@/app/icon.png";
import { useParams, usePathname } from "next/navigation";
import LanguageSwitcher, { type LangDict } from "./LanguageSwitcher";
import ThemeToggle, { type ThemeDict } from "./ThemeToggle";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type NavDict = LangDict &
  ThemeDict & {
    mainNav: string;
    home: string;
    about: string;
    projects: string;
    dashboard: string;
    contact: string;
    cv: string;
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
  };

const CV_URL = "/cv/Rachmad_Aziz_Fazarikha_CV.pdf";
const ITEMS = [
  { path: "", key: "home" },
  { path: "/about", key: "about" },
  { path: "/projects", key: "projects" },
  { path: "/dashboard", key: "dashboard" },
  { path: "/contact", key: "contact" },
] as const;

// Status scroll lewat external store: tanpa setState di effect
const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrolled = () => window.scrollY > 4;
const getServerScrolled = () => false;

export default function Navbar({ dict: t }: { dict: NavDict }) {
  const lang = useParams()?.lang === "id" ? "id" : "en";
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);

  // Menu mobile terbuka hanya untuk pathname saat dibuka: pindah halaman otomatis menutup
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const rest = pathname.replace(new RegExp(`^/${lang}`), "") || "/";
  const isActive = (path: string) => (path === "" ? rest === "/" : rest === path || rest.startsWith(`${path}/`));

  const cv = (
    <a
      href={CV_URL}
      download="Rachmad_Aziz_Fazarikha_CV.pdf"
      data-nav-cta=""
      className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-(--radius) border border-transparent bg-primary px-3 text-sm font-semibold text-primary-foreground outline-none hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring pointer-coarse:min-h-11"
    >
      <Download className="size-4" aria-hidden="true" />
      <span className="sr-only lg:not-sr-only">{t.cv}</span>
    </a>
  );

  return (
    <header data-site-header="" data-scrolled={scrolled} className="sticky top-0 z-50">
      <div data-nav-bar="" className="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between gap-3 px-2 md:px-3">
        <Link
          href={`/${lang}`}
          data-nav-logo=""
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-(--radius) font-bold tracking-tight outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image src={icon} alt="" width={32} height={32} className="size-8 rounded-(--radius) object-contain" />
          <span>
            Kha<span className="text-primary">Portfolio</span>.
          </span>
        </Link>

        <nav aria-label={t.mainNav} className="hidden md:block">
          <ul data-nav-list="" className="flex items-center gap-1">
            {ITEMS.map(({ path, key }) => {
              const active = isActive(path);
              return (
                <li key={key}>
                  <Link
                    href={`/${lang}${path}`}
                    data-nav-link=""
                    aria-current={active ? "page" : undefined}
                    className="relative isolate inline-flex min-h-11 items-center rounded-(--radius) px-3 text-sm font-medium text-foreground outline-none hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        data-nav-pill=""
                        aria-hidden="true"
                        className="absolute inset-0 -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    {t[key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LanguageSwitcher currentLang={lang} dict={t} />
          <ThemeToggle dict={t} />
          {cv}
        </div>

        <Sheet open={open} onOpenChange={(o) => setOpenFor(o ? pathname : null)}>
          <SheetTrigger
            aria-label={t.openMenu}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-(--radius) border border-border text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            data-nav-sheet=""
            className="gap-0 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] data-[side=right]:w-full data-[side=right]:sm:max-w-none"
          >
            <SheetHeader className="flex-row items-center justify-between border-b border-border p-3">
              <SheetTitle className="px-1 text-base">{t.menuTitle}</SheetTitle>
              <SheetClose
                aria-label={t.closeMenu}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-(--radius) border border-border text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X className="size-5" aria-hidden="true" />
              </SheetClose>
            </SheetHeader>

            <nav aria-label={t.mainNav} className="p-3">
              <ul className="flex flex-col gap-1">
                {ITEMS.map(({ path, key }) => {
                  const active = isActive(path);
                  return (
                    <li key={key}>
                      <Link
                        href={`/${lang}${path}`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpenFor(null)}
                        className={`flex min-h-12 items-center rounded-(--radius) px-4 text-lg font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                          active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {t[key]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-4 border-t border-border p-4">
              <LanguageSwitcher currentLang={lang} dict={t} large />
              <ThemeToggle dict={t} inline />
              <a
                href={CV_URL}
                download="Rachmad_Aziz_Fazarikha_CV.pdf"
                data-nav-cta=""
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-(--radius) border border-transparent bg-primary px-4 text-base font-semibold text-primary-foreground outline-none hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Download className="size-5" aria-hidden="true" />
                {t.cv}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
