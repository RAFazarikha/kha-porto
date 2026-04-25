"use client"
import * as React from "react"

import { useParams, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"
import { Folders, House, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

const navigationData = {
  id: {
    navMain: [
      {
        title: "Memulai",
        items: [
          { title: "Beranda", icon:House, url: "/id" },
          { title: "Tentang", icon:User, url: "/id/about" }, // Sesuaikan URL dengan routing kamu
          { title: "Proyek", icon:Folders, url: "/id/projects" },
          { title: "Dasbor", icon:LayoutDashboard, url: "/id/dashboard" },
        ],
      },
    ],
    text: "Dirancang dengan Next.js, Shadcn UI & Tailwind."
  },
  en: {
    navMain: [
      {
        title: "Getting Started",
        items: [
          { title: "Home", icon:House, url: "/en" },
          { title: "About", icon:User, url: "/en/about" },
          { title: "Projects", icon:Folders, url: "/en/projects" },
          { title: "Dashboard", icon:LayoutDashboard, url: "/en/dashboard" },
        ],
      },
    ],
    text: "Designed with Next.js, Shadcn UI & Tailwind."
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const params = useParams();
    const lang = (params?.lang as "id" | "en") || "id";

    const pathname = usePathname();

    const currentNavData = navigationData[lang];

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-7 border-t border-r border-l rounded-t-lg shadow pb-5">
        <Image 
          src="/rachmad-aziz-fazarikha.jpeg" 
          alt="Profile"  
          width={100}
          height={100}
          className="h-28 w-28 rounded-full object-cover text-center border-2 items-center justify-center mx-auto mb-4"
        />
        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <h2 className="font-bold text-xl tracking-tight">
              Kha
              <span className="text-primary">
                Portfolio
              </span>
              .</h2>
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent className="border-r border-l shadow py-3">
        {/* We create a SidebarGroup for each parent. */}
        {currentNavData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title} className="group">
                    <SidebarMenuButton isActive={pathname === subItem.url} 
                      render={
                        <Link href={subItem.url}>
                          {subItem.icon && <subItem.icon className="size-5! group-hover:-rotate-25 transition-transform duration-200" />}
                          <span className="text-base">{subItem.title}</span>
                        </Link>
                      }
                    >
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-b border-r border-l pb-7 rounded-b-xl shadow">
        <p className="text-sm text-center px-3 pt-3">
          © {new Date().getFullYear()} KhaPortfolio. <br />{currentNavData.text}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
