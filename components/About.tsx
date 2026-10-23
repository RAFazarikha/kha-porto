import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Educations from "@/components/Educations";
import { Separator } from "@/components/ui/separator"

interface AboutProps {
  dict: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    experiences: { role: string; org: string; period: string; place?: string }[];
    certificates: { title: string; issuer: string; year: string; file: string | null }[];
  };
}

// ponytail: pemanis About = timeline glow + marker bar pakai Tailwind group util, tanpa library baru
export default function About({ dict }: AboutProps) {

  return (
    <section id="about" className="transition-colors space-y-3 lg:space-y-5 mb-5">
      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{dict.title}</h1>
          <p className="flex flex-row">
            {dict.subtitle}
          </p>
        </div>

        <Separator />

        <p className="text-base leading-relaxed text-justify">
          {dict.description}
        </p>

        <p className="text-base leading-relaxed text-justify">
          {dict.description2}
        </p>
      </div>

      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <GraduationCap size={30} /><span>{dict.titleEducation}</span>
          </h2>
          <p className="flex flex-row">
            {dict.subTitleEducation}
          </p>
        </div>

        <Separator />

        <Educations />
      </div>

      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <Briefcase size={30} /><span>{dict.titleExperience}</span>
          </h2>
          <p>{dict.subTitleExperience}</p>
        </div>
        <Separator />
        {/* Timeline vertikal: garis + bullet glow, hover item menyala */}
        <ol className="relative ml-2 border-l-2 border-primary/20 space-y-5">
          {dict.experiences.map((e, i) => (
            <li key={e.role} className="group relative pl-6">
              <span aria-hidden="true" className="absolute -left-[7px] top-[14px] size-3 rounded-full bg-primary/30 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_12px_var(--primary)] motion-reduce:transition-none" />
              <div className="rounded-md -mx-2 px-2 py-1 transition-colors duration-200 hover:bg-accent/40 motion-reduce:transition-none">
                <Reveal delay={i * 0.08}>
                  <p className="font-medium">{e.role}</p>
                  <p className="text-sm">{e.org}</p>
                  <p className="text-xs text-muted-foreground">{[e.period, e.place].filter(Boolean).join(" · ")}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <Award size={30} /><span>{dict.titleCert}</span>
          </h2>
          <p>{dict.subTitleCert}</p>
        </div>
        <Separator />
        {/* Badge sertifikat: bar pendek memanjang & menyala saat hover */}
        <ul className="space-y-4">
          {dict.certificates.map((c, i) => (
            <li
              key={c.title}
              className="group flex items-center gap-3 rounded-md py-1 transition-colors duration-200 hover:bg-accent/40 motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-3 shrink-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-12 group-hover:bg-primary group-hover:shadow-[0_0_10px_var(--primary)] motion-reduce:transition-none motion-reduce:group-hover:w-3"
              />
              <Reveal delay={i * 0.08} className="flex-1">
                {c.file ? (
                  <a
                    href={`/sertifikat/${encodeURIComponent(c.file)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none hover:underline underline-offset-2"
                  >
                    {c.title}
                  </a>
                ) : (
                  <p className="font-medium transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                    {c.title}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
