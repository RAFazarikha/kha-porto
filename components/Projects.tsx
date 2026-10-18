"use client";

import { Reveal } from "@/components/Reveal";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator"
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
    <section id="projects" className="transition-colors space-y-3 lg:space-y-5 mb-5">
      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{dict.title}</h1>
          <p className="flex flex-row">
            {dict.subtitle}
          </p>
        </div>
        <Separator />
        <div className="grid md:grid-cols-2 gap-8">
          {currentProjectData.map((project, index) => (
            <Reveal key={index} delay={(index % 2) * 0.08}>
            <Card className="relative mx-auto w-full max-w-sm pt-0 hover:shadow transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1 motion-reduce:transform-none">
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={500}
                height={500}
                quality={75}
                className="relative z-20 w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <Badge key={idx} variant="destructive" className="">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
              <CardFooter className="gap-3">
                <ButtonDetail dict={currentProjectData[index]} title={dict} />
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  <ExternalLink className="w-4 h-4" /> {dict.view}
                </a>
              </CardFooter>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}