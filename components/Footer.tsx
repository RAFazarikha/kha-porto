import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} DevPortfolio. Dirancang dengan Next.js & Tailwind.
        </p>
        <div className="flex gap-6">
          {/* <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a> */}
          <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}