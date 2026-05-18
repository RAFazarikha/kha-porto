"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

const SplashData = {
  id: {
    loadingText: "Menciptakan pengalaman digital..."
  },
  en: {
    loadingText: "Crafting digital experiences..."
  }
}

export default function SplashScreen() {

  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  const currentData = SplashData[lang];

  // Selalu mulai dengan 'true' agar Server Next.js merender animasi ini di awal.
  // Ini mencegah konten utama web Anda "bocor" (terlihat sesaat) sebelum animasi muncul.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      // SOLUSI LINTER: Menggunakan setTimeout dengan jeda 0ms.
      // Ini mengeksekusi setIsVisible secara asynchronous di luar siklus render saat ini.
      // Error "cascading renders" akan hilang!
      const quickHideTimer = setTimeout(() => setIsVisible(false), 0);

      return () => clearTimeout(quickHideTimer);
    } else {
      // Jika belum pernah lihat, jalankan animasi selama 2.5 detik
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background text-foreground"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {/* Ganti dengan Logo sesungguhnya */}
            <Image src="/android-chrome-192x192.png" alt="Logo" width={46} height={46} />
            <h1 className="text-4xl font-bold tracking-tight">
              Kha
              <span className="text-primary">
                Portfolio
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4"
          >
            <p className="text-muted-foreground">{currentData.loadingText}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}