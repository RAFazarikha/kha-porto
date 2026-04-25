"use client";

import { ExternalLink, GitBranch } from "lucide-react";
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

interface ProjectsProps {
  dict: Record<string, string>;
}

const projects = {
  id: [
    {
      title: "Open Data Disabilitas",
      description: "Sistem open data disabilitas yang digunakan oleh Komisi Nasional Disabilitas (KND).",
      tech: ["CodeIgniter", "PHP", "MySQL", "Tailwind"],
      github: "https://gitlab.com/RAFazarikha/opendatakomnasdisabilitas",
      live: "https://opendatadisabilitas.com/",
      thumbnail: "/projects/knd.png"
    },
    {
      title: "Roompi - Room Booking Platform",
      description: "Aplikasi booking ruangan untuk kebutuhan organisasi ataupun perusahaan.",
      tech: ["Laravel", "React", "MySQL", "Tailwind CSS", "REST APIs"],
      github: "https://github.com/RAFazarikha/peminjaman-ruangan-online",
      live: "https://roompi-nfa.netlify.app/",
      thumbnail: "/projects/roompi.png"
    },
    {
      title: "Peta Kuliner Sumenep",
      description: "Aplikasi untuk pencarian, visualisasi peta, dan pengelompokan UMKM kuliner di Sumenep.",
      tech: ["Laravel", "Tailwind CSS", "MySQL"],
      github: "https://github.com/RAFazarikha/webgis-umkm",
      live: "https://petakulinersumenep.my.id/",
      thumbnail: "/projects/petakuliner.png"
    }
  ],
  en: [
    {
      title: "Open Data Disabilitas",
      description: "The open data system for people with disabilities used by the National Commission on Disabilities (KND).",
      tech: ["CodeIgniter", "PHP", "MySQL", "Tailwind"],
      github: "https://gitlab.com/RAFazarikha/opendatakomnasdisabilitas",
      live: "https://opendatadisabilitas.com/",
      thumbnail: "/projects/knd.png"
    },
    {
      title: "Roompi - Room Booking Platform",
      description: "A room booking app for organizations and businesses.",
      tech: ["Laravel", "React", "MySQL", "Tailwind CSS", "REST APIs"],
      github: "https://github.com/RAFazarikha/peminjaman-ruangan-online",
      live: "https://roompi-nfa.netlify.app/",
      thumbnail: "/projects/roompi.png"
    },
    {
      title: "Peta Kuliner Sumenep",
      description: "An application for searching, mapping, and clustering culinary MSMEs in Sumenep.",
      tech: ["Laravel", "Tailwind CSS", "MySQL"],
      github: "https://github.com/RAFazarikha/webgis-umkm",
      live: "https://petakulinersumenep.my.id/",
      thumbnail: "/projects/petakuliner.png"
    }
  ]
}

export default function Projects({ dict }: ProjectsProps) {
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  const currentProjectData = projects[lang];

  return (
    <section id="projects" className="transition-colors space-y-3 lg:space-y-5">
      <div className="relative space-y-4 ml-3 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{dict.title}</h1>
          <p className="flex flex-row">
            {dict.subtitle}
          </p>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 gap-8">
          {currentProjectData.map((project, index) => (
            <Card className="relative mx-auto w-full max-w-sm pt-0" key={index}>
              <Image
                src={project.thumbnail}
                alt="image project"
                width={500}
                height={500}
                quality={100}
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
                <a
                  href={project.github}
                  target="_blank"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  <GitBranch className="w-4 h-4" /> Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  <ExternalLink className="w-4 h-4" /> View
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}