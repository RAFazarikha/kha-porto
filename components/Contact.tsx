import { Card3D } from "@/components/Card3D";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SiGmail } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";

interface ContactProps {
  dict: Record<string, string>;
}

export default function Contact({ dict }: ContactProps) {
  const channels = [
    { key: "email", href: "mailto:fazarikha923@gmail.com", title: dict.email, sub: dict.subTitleEmail, cta: dict.ctaEmail, icon: SiGmail, span: "md:col-span-2 in-[.bento]:md:col-span-2 in-[.bento]:lg:col-span-3" },
    { key: "github", href: "https://github.com/RAFazarikha", title: dict.github, sub: dict.subTitleGithub, cta: dict.ctaGithub, icon: FaGithub, span: "" },
    { key: "linkedin", href: "https://www.linkedin.com/in/rachmad-aziz-fazarikha/", title: dict.linkedin, sub: dict.subTitleLinkedin, cta: dict.ctaLinkedin, icon: FaLinkedin, span: "" },
    { key: "instagram", href: "https://www.instagram.com/fzrkha", title: dict.instagram, sub: dict.subTitleInstagram, cta: dict.ctaInstagram, icon: FaInstagram, span: "" },
    { key: "tiktok", href: "https://www.tiktok.com/@fazarikha.24", title: dict.tiktok, sub: dict.subTitleTiktok, cta: dict.ctaTiktok, icon: FaTiktok, span: "" },
  ];

  return (
    <section id="contact" className="transition-colors space-y-4 mb-8">
      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h1 data-display-title="" className="text-2xl md:text-3xl font-bold tracking-tight text-primary">{dict.title}</h1>
          <p className="text-sm text-muted-foreground">{dict.subtitle}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 in-[.bento]:lg:grid-cols-3 gap-4">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <Card3D key={c.key} className={c.span}>
                <Card data-themed-card="" className="h-full py-6 rounded-lg hover:shadow-lg transition-all duration-300 border flex flex-col justify-between">
                  <CardHeader>
                    <h2 className="text-lg md:text-xl in-[.bold]:text-2xl font-bold tracking-tight text-primary">
                      {c.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">{c.sub}</p>
                    <Icon className="size-12 md:size-14 shrink-0 text-primary" />
                  </CardContent>
                  <CardFooter>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                      <span>{c.cta}</span>
                      <ArrowUpRight className="size-4" />
                    </a>
                  </CardFooter>
                </Card>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
