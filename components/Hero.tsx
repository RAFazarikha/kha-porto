import { Dot, CodeXml } from "lucide-react";
import Skills from "./Skills";

interface HeroProps {
  dict: Record<string, string>;
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section id="hero" className="transition-colors space-y-3 lg:space-y-5">

      {/* Konten Utama - Tambahkan relative dan z-10 agar berada di atas overlay */}
      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight">
            {dict.greeting}<span className="text-primary"> {dict.name}</span>
          </h1>
          <p className="flex flex-row">
            <Dot /><span>{dict.address}</span>
          </p>
        </div>

        <hr />

        <p className="text-base">
          {dict.description}
        </p>
        <p className="text-base">
          {dict.description2}
        </p>
      </div>

      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <div className="flex flex-row gap-3">
            <CodeXml className="size-7 text-primary" />
            <h2 className="text-lg md:text-xl tracking-tight text-primary">
              {dict.skill}
            </h2>
          </div>
          <p className="flex flex-row">
            <Dot /><span>{dict.descSkill}</span>
          </p>
        </div>
        <hr />
        <Skills />
      </div>
    </section>
  );
}