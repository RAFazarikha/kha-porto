import { ExternalLink, GitBranch } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Dashboard",
      description: "Sistem manajemen inventaris dan analitik penjualan dengan visualisasi data interaktif.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      github: "#",
      live: "#"
    },
    {
      title: "Platform Edukasi",
      description: "Aplikasi pembelajaran online dengan fitur streaming video dan kuis real-time.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      title: "SaaS Task Manager",
      description: "Aplikasi manajemen proyek kolaboratif dengan fitur drag-and-drop Kanban board.",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Proyek Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Placeholder Thumbnail */}
              <div className="h-48 bg-slate-300 dark:bg-slate-700 w-full animate-pulse flex items-center justify-center">
                 <span className="text-slate-500 dark:text-slate-500 text-sm">Thumbnail Placeholder</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tag) => (
                    <span key={tag} className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <a href={project.github} className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <GitBranch className="w-4 h-4" /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}