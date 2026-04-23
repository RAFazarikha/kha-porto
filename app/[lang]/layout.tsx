import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // (Sesuaikan path jika diperlukan)
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio Profesional",
  description: "Portofolio developer yang dibangun dengan Next.js dan Tailwind CSS",
};

// 1. Tambahkan kata 'async' di sini
export default async function RootLayout({
  children,
  params, 
}: Readonly<{
  children: React.ReactNode;
  // 2. Bungkus tipe params dengan Promise
  params: Promise<{ lang: string }>; 
}>) {
  // 3. Lakukan 'await' pada params sebelum menggunakannya
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    // 4. Gunakan variabel 'lang' yang sudah di-await
    <html lang={lang} suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className={`${inter.className} transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark", "cyberpunk", "brutalism", "vintage"]}
          disableTransitionOnChange
        >
          <Navbar />
          <TooltipProvider delay={100} timeout={100}>{children}</TooltipProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}