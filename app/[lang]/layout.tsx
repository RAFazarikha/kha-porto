import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // (Sesuaikan path jika diperlukan)
import { ThemeProvider } from "@/components/ThemeProvider";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-Sidebar";
import TopLoader from "@/components/TopLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://rachmadazizfazarikha.my.id"),
  title: {
    default: "Rachmad Aziz Fazarikha - Fullstack Web Developer",
    template: "%s | Rachmad Aziz Fazarikha",
  },
  description:
    "Fullstack Web Developer dari Indonesia yang berfokus pada pengembangan aplikasi web modern menggunakan Next.js, React, Laravel, dan framework modern lainnya.",
  keywords: [
    "Fullstack Developer Indonesia",
    "Web Developer Next.js",
    "React Developer",
    "Jasa Pembuatan Website",
    "Laravel Developer",
  ],
  authors: [{ name: "Rachmad Aziz Fazarikha" }],
  creator: "Rachmad Aziz Fazarikha",

  openGraph: {
    title: "Rachmad Aziz Fazarikha - Fullstack Developer",
    description:
      "Portfolio Fullstack Web Developer dengan pengalaman membangun aplikasi web modern.",
    url: "https://namadomainmu.com",
    siteName: "Rachmad Aziz Fazarikha Portfolio",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} transition-colors duration-300 selection:bg-secondary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark", "cyberpunk", "brutalism", "vintage"]}
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          <SidebarProvider className="mx-auto max-w-6xl items-start lg:px-4 font-sans">
            
            <AppSidebar 
              variant="sidebar"
              collapsible="none"
              className="top-0 lg:my-8 border-none shrink-0 hidden md:flex" />

            <main className="flex-1 w-full lg:my-8 overflow-y-auto font-sans">
              
              <div className="md:hidden mb-8">
                <SidebarTrigger />
              </div>

              <TooltipProvider delay={100} timeout={100}>
                <TopLoader />
                {children}
              </TooltipProvider>

            </main>
          </SidebarProvider>
          {/* <Footer /> */}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rachmad Aziz Fazarikha",
              url: "https://rachmadazizfazarikha.my.id",
              jobTitle: "Fullstack Web Developer",
              sameAs: [
                "https://github.com/RAFazarikha",
                "https://www.linkedin.com/in/rachmad-aziz-fazarikha/",
                "https://www.instagram.com/fzrkha",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}