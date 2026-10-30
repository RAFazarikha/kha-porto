import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Educations from "@/components/Educations";
import { Separator } from "@/components/ui/separator";

interface AboutProps {
  dict: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    experiences: { role: string; org: string; period: string; place?: string }[];
    certificates: { title: string; issuer: string; year: string; file: string | null }[];
  };
}

export default function About({ dict }: AboutProps) {
  return (
    <section id="about" className="transition-colors space-y-4 md:space-y-6 mb-8">
      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h1 data-display-title="" className="text-2xl md:text-3xl font-bold tracking-tight text-primary">{dict.title}</h1>
          <p className="text-sm text-muted-foreground">{dict.subtitle}</p>
        </div>
        <Separator />
        <p className="text-base leading-relaxed">{dict.description}</p>
        <p className="text-base leading-relaxed text-muted-foreground">{dict.description2}</p>
      </div>

      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-primary">
            <GraduationCap className="size-6" /><span>{dict.titleEducation}</span>
          </h2>
          <p className="text-sm text-muted-foreground">{dict.subTitleEducation}</p>
        </div>
        <Separator />
        <Educations />
      </div>

      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-primary">
            <Briefcase className="size-6" /><span>{dict.titleExperience}</span>
          </h2>
          <p className="text-sm text-muted-foreground">{dict.subTitleExperience}</p>
        </div>
        <Separator />
        <ol className="relative ml-2 border-l-2 border-primary/20 space-y-4">
          {dict.experiences.map((e, i) => (
            <li key={e.role} className="group relative pl-6">
              <span aria-hidden="true" className="absolute -left-[7px] top-[14px] size-3 rounded-full bg-primary/40 transition-all duration-300 group-hover:bg-primary group-hover:scale-125 motion-reduce:transition-none" />
              <div className="rounded-md -mx-2 px-2 py-1 transition-colors duration-200 hover:bg-muted motion-reduce:transition-none">
                <Reveal delay={i * 0.08}>
                  <p className="font-semibold text-base in-[.bold]:text-xl">{e.role}</p>
                  <p className="text-sm text-foreground">{e.org}</p>
                  <p className="text-xs text-muted-foreground">{[e.period, e.place].filter(Boolean).join(" · ")}</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-primary">
            <Award className="size-6" /><span>{dict.titleCert}</span>
          </h2>
          <p className="text-sm text-muted-foreground">{dict.subTitleCert}</p>
        </div>
        <Separator />
        <ul className="space-y-3">
          {dict.certificates.map((c, i) => (
            <li
              key={c.title}
              className="group flex items-center gap-3 rounded-md py-1 transition-colors duration-200 hover:bg-muted motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-3 shrink-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-8 group-hover:bg-primary motion-reduce:transition-none"
              />
              <Reveal delay={i * 0.08} className="flex-1">
                {c.file ? (
                  <a
                    href={`/sertifikat/${encodeURIComponent(c.file)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium hover:underline underline-offset-2 text-sm md:text-base in-[.bold]:text-lg"
                  >
                    {c.title}
                  </a>
                ) : (
                  <p className="font-medium text-sm md:text-base in-[.bold]:text-lg">{c.title}</p>
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
