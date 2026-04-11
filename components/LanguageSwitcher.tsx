"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === "id" ? "en" : "id";
    
    // CARA LEBIH AMAN: Memecah URL dan hanya mengganti bagian bahasanya saja
    // Contoh: "/id/tentang" -> ["", "id", "tentang"] -> ubah index 1 -> gabungkan lagi
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLang; 
    }
    const newPath = segments.join("/");
    
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}

      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors rounded-lg text-sm font-semibold flex items-center gap-2"
    >
      <span className={currentLang === "id" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}>ID</span>
      <span className="text-slate-400 dark:text-slate-600">/</span>
      <span className={currentLang === "en" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}>EN</span>
    </button>
  );
}