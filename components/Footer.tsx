"use client";

import { Mail } from "lucide-react";
import { useParams } from "next/navigation";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  // 1. Mengambil parameter bahasa dari URL (misal: 'id' atau 'en')
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  // 2. Kamus lokal sederhana khusus untuk teks Footer
  const footLang = {
    id: { text: "Dirancang dengan Next.js, Shadcn UI & Tailwind." },
    en: { text: "Designed with Next.js, Shadcn UI & Tailwind." },
  };
  const t = footLang[lang] || footLang.id;

  return (
    <footer id="contact" className="py-12 border-t transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} KhaPortfolio. {t.text}
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/RAFazarikha" className="hover:text-primary transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/rachmad-aziz-fazarikha/" className="hover:text-primary transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://wa.me/6282143456658" className="hover:text-primary transition-colors">
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a href="mailto:fazarikha923@gmail.com" className="hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}