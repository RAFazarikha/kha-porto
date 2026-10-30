"use client";

import { Reveal } from "@/components/Reveal";
import { Card3D } from "@/components/Card3D";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ButtonDetail from "@/components/ButtonDetail";
import { getProjects } from "@/project_data/getProjects";

interface ProjectsProps {
  dict: Record<string, string>;
}

const projects = await getProjects();

export default function Projects({ dict }: ProjectsProps) {
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";
  const currentProjectData = projects[lang];

  return (
    <section id="projects" className="transition-colors space-y-4 mb-8">
      <div data-themed-card="" className="relative space-y-4 py-7 px-4 sm:px-6 lg:px-8 border rounded-lg shadow bg-card text-card-foreground">
        <div>
          <h1 data-display-title="" className="text-2xl md:text-3xl font-bold tracking-tight text-primary">{dict.title}</h1>
          <p className="text-sm text-muted-foreground">{dict.subtitle}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 in-[.bento]:lg:grid-cols-3 gap-6 in-[.bento]:gap-4">
          {currentProjectData.map((project, index) => {
            // Bento: kartu pertama jadi feature card besar span 2 kolom
            const bentoSpan = index === 0 ? "in-[.bento]:md:col-span-2 in-[.bento]:lg:col-span-2" : "";
            return (
              <Reveal key={project.title} delay={(index % 3) * 0.08} className={`h-full ${bentoSpan}`}>
                <Card3D className="h-full">
                  <Card data-themed-card="" className="h-full flex flex-col justify-between pt-0 hover:shadow-lg transition-all duration-300">
                    <div>
                      {/* Bold: sembunyikan thumbnail agar fokus ke teks besar */}
                      <div className="relative aspect-video w-full overflow-hidden in-[.bold]:hidden">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="space-y-1">
                        <CardTitle className="text-xl in-[.bold]:text-3xl font-bold tracking-tight">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs md:text-sm">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-1.5 pt-0">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </CardContent>
                    </div>
                    <CardFooter className="gap-2 pt-4">
                      <ButtonDetail dict={currentProjectData[index]} title={dict} />
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "default", size: "default" })}
                      >
                        <ExternalLink className="size-4" /> {dict.view}
                      </a>
                    </CardFooter>
                  </Card>
                </Card3D>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
