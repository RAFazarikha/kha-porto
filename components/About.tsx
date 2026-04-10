import Image from "next/image";

export default function About() {
  const skills = [
    "HTML", "CSS", "PHP", "JavaScript (ES6+)", "TypeScript",
    "Laravel", "CodeIgniter", "MySQL",
    "React", "Next.js", "Tailwind CSS", 
    "REST APIs", "Git", "Figma", "Wordpress"
  ];

  return (
    <section id="about" className="py-20 bg-slate-100 dark:bg-slate-800/50 transition-colors text-slate-800 dark:text-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Tentang Saya</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="md:w-2/5">
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 text-justify">
              Hello! I am Rachmad Aziz Fazarikha, a passionate Fullstack Web Developer and an undergraduate Information Systems student at Universitas Trunojoyo Madura. Over the past 4 years of exploring the technology industry, I have developed a deep interest in building dynamic, efficient, and user-centric web applications from the ground up.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-justify">
              I am highly motivated by the challenge of turning complex problems into streamlined digital solutions. By leveraging modern frameworks, I continuously seek to enhance my projects and am always eager to implement my knowledge into impactful, real-world applications that make a difference.
            </p>
          </div>

          <div className="md:w-1/5 items-center text-center justify-center mx-auto p-2 border-4 border-slate-300 dark:border-slate-700 rounded-full hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
            <Image src="/rachmad-aziz-fazarikha.webp" alt="Rachmad Aziz Fazarikha" className="rounded-full" width={192} height={192} />
          </div>
          
          <div className="md:w-2/5">
            <h3 className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-justify mb-3">I specialize in building full-stack solutions using a modern tech stack that includes:</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-justify">
              Leveraging this varied ecosystem, I build robust, secure, and performant web applications. My focus is on creating scalable systems that are both elegant in design and powerful in function. My objective is to turn vision into robust digital reality, ensuring seamless integration and future maintainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}