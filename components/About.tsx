export default function About() {
  const skills = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", 
    "JavaScript (ES6+)", "REST APIs", "Git", "Figma"
  ];

  return (
    <section id="about" className="py-20 bg-slate-100 dark:bg-slate-800/50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Tentang Saya</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              Berbekal pemahaman mendalam tentang siklus pengembangan *frontend*, saya telah merancang dan membangun berbagai aplikasi *web* yang efisien dan *scalable*. Fokus utama saya adalah penulisan kode yang bersih dan implementasi UI/UX yang *pixel-perfect*.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Saya selalu antusias mengeksplorasi teknologi terbaru dan menerapkan *best practices* dalam setiap baris kode yang saya tulis.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Keahlian (Tech Stack)</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}