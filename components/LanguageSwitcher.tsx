"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLang: "id" | "en") => {
    if (newLang === currentLang) return;
    
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
    <ButtonGroup>
      <Button variant={currentLang === "id" ? "default" : "outline"} aria-pressed={currentLang === "id"} onClick={() => switchTo("id")}>ID</Button>
      <Button variant={currentLang === "en" ? "default" : "outline"} aria-pressed={currentLang === "en"} onClick={() => switchTo("en")}>EN</Button>
    </ButtonGroup>
  );
}