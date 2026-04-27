import GithubStats from "@/components/GithubStats";
import WakatimeStats from "@/components/WakatimeStats";
import { SiGithub, SiWakatime } from "react-icons/si";
import { Separator } from "@/components/ui/separator"

interface DashboardProps {
  github: Record<string, string>;
  wakatime: Record<string, string>;
}

export default function Dashboard({ github, wakatime }: DashboardProps) {

  return (
    <section id="about" className="transition-colors space-y-3 lg:space-y-5">
      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="flex flex-row gap-2 text-2xl md:text-3xl tracking-tight text-primary"><SiGithub size={30} />{github.title}</h1>
          <p className="flex flex-row">
            {github.subtitle}
          </p>
        </div>

        <Separator />

        <GithubStats dict={github}/>
      </div>

      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h2 className="flex flex-row gap-2 text-xl md:text-2xl tracking-tight text-primary">
            <SiWakatime size={30} />{wakatime.title}
          </h2>
          <p className="flex flex-row">
            {wakatime.subtitle}
          </p>
        </div>

        <Separator />

        <WakatimeStats dict={wakatime}/>
      </div>
    </section>
  );
}