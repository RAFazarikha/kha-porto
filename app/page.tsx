import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <GithubStats />
    </main>
  );
}