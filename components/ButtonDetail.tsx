"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile"
import { ClipboardList, ExternalLink, GitBranch } from "lucide-react";
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge";

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  thumbnail: string;
  overview: string;
  job: string[];
}

interface DetailProps {
  dict: ProjectItem;
  title: Record<string, string>;
}

interface ProjectDetailsProps extends React.ComponentProps<"div"> {
  dict: ProjectItem;
  projectTitle: Record<string, string>;
}


export default function ButtonDetail({ dict, title }: DetailProps) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" size={"lg"}><ClipboardList className="w-4 h-4" />Detail</Button>} />
        <DialogContent className="sm:max-w-4xl sm:max-h-sm">
          <DialogHeader>
            <DialogTitle className={"text-2xl font-semibold leading-none tracking-tight"}>{dict.title}</DialogTitle>
            <DialogDescription>
              {dict.description}
            </DialogDescription>
          </DialogHeader>
          <ProjectDetails className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4" dict={dict} projectTitle={title} />
          <DialogFooter className="pt-2">
            <a
              href={dict.github}
              target="_blank"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <GitBranch className="w-4 h-4" /> Code
            </a>
            <a
              href={dict.live}
              target="_blank"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <ExternalLink className="w-4 h-4" /> View
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size={"lg"}><ClipboardList className="w-4 h-4" />Detail</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className={"text-2xl font-semibold leading-none tracking-tight"}>{dict.title}</DrawerTitle>
          <DrawerDescription>
            {dict.description}
          </DrawerDescription>
        </DrawerHeader>
        <ProjectDetails className="no-scrollbar overflow-y-auto px-4" dict={dict} projectTitle={title} />
        <DrawerFooter className="pt-2">
          <a
            href={dict.live}
            target="_blank"
            className={buttonVariants({ variant: "default" })}
          >
            <ExternalLink className="w-4 h-4" /> View
          </a>
          <a
            href={dict.github}
            target="_blank"
            className={buttonVariants({ variant: "outline" })}
          >
            <GitBranch className="w-4 h-4" /> Code
          </a>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function ProjectDetails({ className, dict, projectTitle }: ProjectDetailsProps) {
  return (
    <div className={cn("grid items-start gap-6 rounded-lg border p-6", className)}>

      {/* Deskripsi Project */}
      <div className="grid gap-2">
        <h3 className="font-semibold text-lg leading-none tracking-tight">
          {projectTitle.overview}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {dict.overview}
        </p>
      </div>

      {/* Teknologi yang Dipakai */}
      <div className="grid gap-3">
        <h3 className="font-semibold text-lg leading-none tracking-tight">
          {projectTitle.tech}
        </h3>
        <div className="flex flex-wrap gap-2">
          {dict.tech.map((tech, idx) => (
            <Badge key={idx} variant="destructive" className="">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Apa saja yang dikerjakan */}
      <div className="grid gap-2">
        <h3 className="font-semibold text-lg leading-none tracking-tight">
          {projectTitle.job}
        </h3>
        <ul className="text-sm text-muted-foreground list-disc list-outside ml-4 space-y-1.5">
          {dict.job.map((job, idx) => (
            <li key={idx}>{job}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}