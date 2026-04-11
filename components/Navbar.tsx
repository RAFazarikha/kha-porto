"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher"; 

// Memuat komponen secara dinamis hanya di client-side
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" /> // Mencegah layout shift
});

export default function Navbar() {
  // 1. Mengambil parameter bahasa dari URL (misal: 'id' atau 'en')
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  // 2. Kamus lokal sederhana khusus untuk teks Navbar
  const navTexts = {
    id: { home: "Beranda", about: "Tentang", projects: "Proyek" },
    en: { home: "Home", about: "About", projects: "Projects" },
  };
  const t = navTexts[lang] || navTexts.id;

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex shrink-0">
            {/* Link logo diarahkan kembali ke root bahasa yang sedang aktif */}
            <Link href={`/${lang}`} className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-200">
              Kha<span className="text-blue-600 dark:text-blue-400">Portfolio</span>.
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="mx-auto flex items-baseline space-x-8 text-slate-800 dark:text-slate-200">
              <a href="#hero" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.home}
              </a>
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.about}
              </a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.projects}
              </a>
            </div>
          </div>

          {/* Action Buttons (Language & Theme) */}
          <div className="flex items-center gap-4">
            {/* Tombol Switch Bahasa */}
            <LanguageSwitcher currentLang={lang} />
            
            {/* Tombol Switch Tema */}
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}