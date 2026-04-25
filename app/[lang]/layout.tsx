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
      </body>
    </html>
  );
}