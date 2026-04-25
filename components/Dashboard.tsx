import { Dot, GraduationCap } from "lucide-react";
import Educations from "@/components/Educations";
import GithubStats from "@/components/GithubStats";

interface DashboardProps {
  github: Record<string, string>;
}

export default function Dashboard({ github }: DashboardProps) {

  return (
    <section id="about" className="transition-colors space-y-3 lg:space-y-5">
      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{github.title}</h1>
          <p className="flex flex-row">
            {github.subtitle}
          </p>
        </div>

        <hr />

        <GithubStats dict={github}/>
      </div>

      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <GraduationCap size={30} /><span>{github.titleEducation}</span>
          </h2>
          <p className="flex flex-row">
            <Dot /><span>{github.subTitleEducation}</span>
          </p>
        </div>

        <hr />

        <Educations />
      </div>
    </section>
  );
}