import { GraduationCap } from "lucide-react";
import Educations from "@/components/Educations";
import { Separator } from "@/components/ui/separator"

interface AboutProps {
  dict: Record<string, string>;
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
    </section>
  );
}