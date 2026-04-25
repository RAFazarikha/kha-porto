import { Dot, GraduationCap } from "lucide-react";
import Educations from "@/components/Educations";

interface AboutProps {
  dict: Record<string, string>;
}

export default function About({ dict }: AboutProps) {

  return (
    <section id="about" className="transition-colors space-y-3 lg:space-y-5">
      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{dict.title}</h1>
          <p className="flex flex-row">
            <Dot /><span>{dict.subtitle}</span>
          </p>
        </div>

        <hr />

        <p className="text-base leading-relaxed text-justify">
          {dict.description}
        </p>

        <p className="text-base leading-relaxed text-justify">
          {dict.description2}
        </p>
      </div>

      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <GraduationCap size={30} /><span>{dict.titleEducation}</span>
          </h2>
          <p className="flex flex-row">
            <Dot /><span>{dict.subTitleEducation}</span>
          </p>
        </div>

        <hr />

        <Educations />
      </div>
    </section>
  );
}