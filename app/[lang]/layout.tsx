import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Inter, Nunito, DM_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css"; // (Sesuaikan path jika diperlukan)
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip"
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { THEMES, DEFAULT_THEME, THEME_COOKIE_NAME, isThemeId } from "@/lib/theme";
import TopLoader from "@/components/TopLoader";
import Script from "next/script";
import SplashScreen from "@/components/SplashScreen";

const SITE_URL = "https://rachmadazizfazarikha.my.id";
const locales = ["en", "id"] as const;
type Locale = (typeof locales)[number];
const isLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: "%s | Rachmad Aziz Fazarikha",
    },
    description: meta.description,
    keywords: [
      "Full-stack Developer Indonesia",
      "Web Developer Next.js",
      "React Developer",
      "Jasa Pembuatan Website",
      "Laravel Developer",
    ],
    authors: [{ name: "Rachmad Aziz Fazarikha" }],
    creator: "Rachmad Aziz Fazarikha",
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${SITE_URL}/${lang}`,
      siteName: "Rachmad Aziz Fazarikha Portfolio",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { en: `${SITE_URL}/en`, id: `${SITE_URL}/id`, "x-default": `${SITE_URL}/en` },
    },
    robots: { index: true, follow: true },
  };
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const fontVars = [inter, nunito, dmSans, jetbrains].map((f) => f.variable).join(" ");

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
  if (!isLocale(lang)) notFound();
  const saved = (await cookies()).get(THEME_COOKIE_NAME)?.value;
  const theme = isThemeId(saved) ? saved : DEFAULT_THEME;

  return (
    // 4. Gunakan variabel 'lang' yang sudah di-await
    <html lang={lang} className={`${fontVars} ${theme}`} suppressHydrationWarning>
      <head>
        <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
        <Script
          defer src="https://cloud.umami.is/script.js" data-website-id="3dc7691f-9820-4587-b31e-21a49fa67275"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`transition-colors duration-300 selection:bg-secondary`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring font-medium text-sm"
        >
          {lang === "id" ? "Lewati ke konten utama" : "Skip to main content"}
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          themes={[...THEMES]}
          enableSystem={false}
          disableTransitionOnChange
        >
          <SplashScreen />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl px-2 py-6 md:px-4 font-sans outline-none">
            <TooltipProvider delay={100} timeout={100}>
              <TopLoader />
              {children}
            </TooltipProvider>
          </main>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rachmad Aziz Fazarikha",
              url: "https://rachmadazizfazarikha.my.id",
              jobTitle: "Full-stack Web Developer",
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