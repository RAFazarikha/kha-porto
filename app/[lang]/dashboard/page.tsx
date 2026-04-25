// app/[lang]/page.tsx
import { getDictionary } from "@/dictionaries/getDictionary"; 
import Dashboard from "@/components/Dashboard";

export default async function Home({
  params,
}: {
  // 1. Bungkus dengan Promise
  params: Promise<{ lang: "en" | "id" }>; 
}) {
  // 2. Await params-nya
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // 3. Gunakan 'lang' untuk memanggil dictionary
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <Dashboard github={dict.dashboard.github} />
    </main>
  );
}