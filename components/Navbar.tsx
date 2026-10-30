"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import { useParams, usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const nav = {
  id: [["", "Beranda"], ["/about", "Tentang"], ["/projects", "Proyek"], ["/dashboard", "Dasbor"], ["/contact", "Kontak"]],
  en: [["", "Home"], ["/about", "About"], ["/projects", "Projects"], ["/dashboard", "Dashboard"], ["/contact", "Contact"]],
} as const;

export default function Navbar() {
  const lang = useParams()?.lang === "id" ? "id" : "en";
  const pathname = usePathname();

  return (
    <header data-site-header="" className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold tracking-tight">
          <Image src={icon} alt="" width={32} height={32} className="size-8 rounded-(--radius) object-contain" />
          <span>Kha<span className="text-primary">Portfolio</span>.</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
        <nav aria-label="Main" className="-mx-1 flex w-full gap-1 overflow-x-auto">
          {nav[lang].map(([path, label]) => {
            const href = `/${lang}${path}`;
            const current = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex items-center px-3 py-2 text-sm whitespace-nowrap rounded-(--radius) min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${current ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
