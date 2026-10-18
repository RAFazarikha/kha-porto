import { Database } from "lucide-react";
import { SiDocker, SiFilament, SiFramer, SiGit, SiGo, SiHuggingface, SiInertia, SiLaravel, SiMysql, SiNextdotjs, SiNodedotjs, SiOpenai, SiPostgresql, SiPrisma, SiPython, SiPytorch, SiReact, SiShadcnui, SiTailwindcss, SiTurborepo, SiTypescript, SiVite } from "react-icons/si";
import { Badge } from "@/components/ui/badge"


const skills = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "shadcn/ui", icon: SiShadcnui },
    { name: "Framer Motion", icon: SiFramer },
    { name: "Inertia.js", icon: SiInertia },
    { name: "Laravel", icon: SiLaravel },
    { name: "Filament", icon: SiFilament },
    { name: "Go", icon: SiGo },
    { name: "Node.js / Express", icon: SiNodedotjs },
    { name: "Python / FastAPI", icon: SiPython },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "Prisma", icon: SiPrisma },
    { name: "RAG / FAISS", icon: Database },
    { name: "LLM API (Google GenAI, Groq, OpenAI)", icon: SiOpenai },
    { name: "PyTorch", icon: SiPytorch },
    { name: "Hugging Face", icon: SiHuggingface },
    { name: "Docker", icon: SiDocker },
    { name: "Turborepo", icon: SiTurborepo },
    { name: "Vite", icon: SiVite },
    { name: "Git", icon: SiGit },
]

export default function Skills() {
    return (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge key={skill.name} variant="default" 
              className="px-6 py-4 text-sm hover:shadow hover:scale-110 transition-all duration-200">
                <skill.icon size={16} />
                {skill.name}
            </Badge>
          ))}
        </div>
    )
}
