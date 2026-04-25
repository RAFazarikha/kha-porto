import { FaCss3Alt } from "react-icons/fa6";
import { SiCanva, SiCodeigniter, SiFigma, SiGit, SiHtml5, SiJavascript, SiLaravel, SiMysql, SiNextdotjs, SiPhp, SiReact, SiTailwindcss, SiTypescript, SiWordpress } from "react-icons/si";
import { Badge } from "@/components/ui/badge"


const skills = {
    "html": {
        "name": "HTML",
        "icon": SiHtml5
    },
    "css": {
        "name": "CSS",
        "icon": FaCss3Alt
    },
    "php": {
        "name": "PHP",
        "icon": SiPhp
    },
    "javascript": {
        "name": "JavaScript (ES6+)",
        "icon": SiJavascript
    },
    "typescript": {
        "name": "TypeScript",
        "icon": SiTypescript
    },
    "laravel": {
        "name": "Laravel",
        "icon": SiLaravel
    },
    "codeigniter": {
        "name": "CodeIgniter",
        "icon": SiCodeigniter
    },
    "mysql": {
        "name": "MySQL",
        "icon": SiMysql
    },
    "react": {
        "name": "React",
        "icon": SiReact
    },
    "nextjs": {
        "name": "Next.js",
        "icon": SiNextdotjs
    },
    "tailwindcss": {
        "name": "Tailwind CSS",
        "icon": SiTailwindcss
    },
    "git": {
        "name": "Git",
        "icon": SiGit
    },
    "figma": {
        "name": "Figma",
        "icon": SiFigma
    },
    "canva": {
        "name": "Canva",
        "icon": SiCanva
    },
    "wordpress": {
        "name": "Wordpress",
        "icon": SiWordpress
    }
}

export default function Skills() {
    return (
        <div className="flex flex-wrap gap-3">
          {Object.values(skills).map((skill) => (
            <Badge key={skill.name} variant="default" 
              className="px-6 py-4 text-sm hover:shadow hover:scale-110 transition-all duration-200">
                <skill.icon size={16} />
                {skill.name}
            </Badge>
          ))}
        </div>
    )
}
