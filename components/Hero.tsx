import { Button } from "@/components/ui/button"

interface HeroProps {
  dict: Record<string, string>;
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[80vh] transition-colors">
      
      {/* Overlay untuk memastikan teks tetap terbaca di atas gambar latar */}
      <div className="absolute inset-0 z-0 backdrop-blur-sm"></div>

      {/* Konten Utama - Tambahkan relative dan z-10 agar berada di atas overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          {dict.greeting}<span className="text-primary">{dict.greeting2}</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {dict.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size={"lg"} className={`px-7 py-6`}>
            {dict.button}
          </Button>
          <Button variant="secondary" size={"lg"} className={`px-7 py-6`}>
            {dict.button2}
          </Button>
        </div>
      </div>
    </section>
  );
}