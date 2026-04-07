export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[80vh] bg-[url('/light-bg.svg')] dark:bg-[url('/dark-bg.svg')] bg-cover bg-center bg-no-repeat text-slate-800 dark:text-slate-200 transition-colors">
      
      {/* Overlay untuk memastikan teks tetap terbaca di atas gambar latar */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-900/80 z-0 backdrop-blur-sm"></div>

      {/* Konten Utama - Tambahkan relative dan z-10 agar berada di atas overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-slate-800 dark:text-slate-200 text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Membangun Pengalaman Digital yang <span className="text-blue-600 dark:text-blue-400">Luar Biasa</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Saya adalah seorang Frontend Developer yang berdedikasi menciptakan antarmuka modern, responsif, dan performa tinggi menggunakan ekosistem modern.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg font-medium bg-blue-600 text-slate-50 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-lg"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg font-medium border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors backdrop-blur-md text-slate-800 dark:text-slate-200"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
}