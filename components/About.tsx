import { Award, Briefcase, GraduationCap } from "lucide-react";
import Educations from "@/components/Educations";
import { Separator } from "@/components/ui/separator"

interface AboutProps {
  dict: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    experiences: { role: string; org: string; period: string; place?: string }[];
    certificates: { title: string; issuer: string; year: string; file: string | null }[];
  };
}

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
        <ul className="space-y-4">
          {dict.experiences.map((e) => (
            <li key={e.role}>
              <p className="font-medium">{e.role}</p>
              <p className="text-sm">{e.org}</p>
              <p className="text-xs text-muted-foreground">{[e.period, e.place].filter(Boolean).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <Award size={30} /><span>{dict.titleCert}</span>
          </h2>
          <p>{dict.subTitleCert}</p>
        </div>
        <Separator />
        <ul className="space-y-4">
          {dict.certificates.map((c) => (
            <li key={c.title}>
              {c.file ? (
                <a href={`/sertifikat/${encodeURIComponent(c.file)}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{c.title}</a>
              ) : (
                <p className="font-medium">{c.title}</p>
              )}
              <p className="text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}