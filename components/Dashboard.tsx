import GithubStats from "@/components/GithubStats";
import WakatimeStats from "@/components/WakatimeStats";
import { SiGithub, SiWakatime } from "react-icons/si";
import { Separator } from "@/components/ui/separator";

interface DashboardProps {
  github: Record<string, string>;
  wakatime: Record<string, string>;
}

export default function Dashboard({ github, wakatime }: DashboardProps) {
  return (
    <section id="dashboard" className="transition-colors space-y-6 mb-8">
      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h1 data-display-title="" className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tight text-primary">
            <SiGithub className="size-8" />
            <span>{github.title}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{github.subtitle}</p>
        </div>
        <Separator />
        <GithubStats dict={github} />
      </div>

      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold tracking-tight text-primary">
            <SiWakatime className="size-7" />
            <span>{wakatime.title}</span>
          </h2>
          <p className="text-sm text-muted-foreground">{wakatime.subtitle}</p>
        </div>
        <Separator />
        <WakatimeStats dict={wakatime} />
      </div>
    </section>
  );
}
