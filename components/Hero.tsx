import { CodeXml } from "lucide-react";
import Typewriter from "./Typewriter";
import Skills from "./Skills";
import { Card3D } from "./Card3D";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Mascot } from "@/components/theme/Mascot";

interface HeroProps {
  dict: Record<string, string>;
}

const card = "relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground";

export default function Hero({ dict }: HeroProps) {
  return (
    <section id="hero" className="transition-colors space-y-4 md:space-y-6 mb-8">
      <div className="grid gap-4 md:gap-6 md:grid-cols-[auto_1fr] items-stretch">
        <Card3D className="relative flex items-center justify-center border rounded-lg shadow bg-card text-card-foreground p-6 md:p-8" data-themed-card="">
          <Image
            src="/rakha.webp"
            alt="Rachmad Aziz Fazarikha"
            width={240}
            height={240}
            priority
            sizes="(max-width: 768px) 160px, 240px"
            className="size-40 md:size-60 rounded-full border-2 object-cover"
          />
          <div className="hidden in-[.brutal]:block absolute bottom-2 left-2">
            <Mascot className="size-12 md:size-16" />
          </div>
        </Card3D>

      <Card3D className={card} data-themed-card="">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 data-display-title="" className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {dict.greeting}{" "}
                <span aria-hidden="true" className="inline-block origin-[70%_70%] animate-[wave_2s_ease-in-out_2] motion-reduce:animate-none">👋</span>
                <span className="text-primary block md:inline"> {dict.name}</span>
              </h1>
              <p className="text-sm md:text-base text-primary font-medium">
                <Typewriter roles={[dict.title, dict.tagline]} />
              </p>
              <p className="text-sm text-muted-foreground">{dict.address}</p>
            </div>
          </div>

          <Separator />

          <p className="text-base leading-relaxed">{dict.description}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{dict.description2}</p>
        </Card3D>
      </div>

      <Card3D className={card} data-themed-card="">
        <div>
          <div className="flex flex-row items-center gap-3">
            <CodeXml className="size-6 text-primary" />
            <h2 className="text-lg md:text-2xl font-bold tracking-tight text-primary">
              {dict.skill}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{dict.descSkill}</p>
        </div>
        <Separator />
        <Skills />
      </Card3D>
    </section>
  );
}
