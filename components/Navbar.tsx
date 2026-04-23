"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// dynamic import tetap
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

export default function Navbar() {
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  const navTexts = {
    id: { home: "Beranda", about: "Tentang", projects: "Proyek" },
    en: { home: "Home", about: "About", projects: "Projects" },
  };
  const t = navTexts[lang] || navTexts.id;

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex shrink-0">
            <Link
              href={`/${lang}`}
              className="font-bold text-xl tracking-tight"
            >
              Kha
              <span className="text-primary">
                Portfolio
              </span>
              .
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()} 
                    render={
                      <Link href="#" className="text-sm font-medium transition-colors">
                        {t.home}
                      </Link>
                    }
                  />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}  
                    render={
                      <Link href="#" className="text-sm font-medium transition-colors">
                        {t.about}
                      </Link>
                    }
                  />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()} 
                    render={
                      <Link href="#" className="text-sm font-medium transition-colors">
                        {t.projects}
                      </Link>
                    }
                  />
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}