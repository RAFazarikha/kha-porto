"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Memuat komponen secara dinamis hanya di client-side
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" /> // Mencegah layout shift
});

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link href="/" className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-200">
              Kha<span className="text-blue-600 dark:text-blue-400">Portfolio</span>.
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="mx-auto flex items-baseline space-x-8 text-slate-800 dark:text-slate-200">
              <a href="#hero" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tentang</a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Proyek</a>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}