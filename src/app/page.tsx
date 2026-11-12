import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Loader />
      <CursorGlow />
      <div className="pointer-events-none fixed inset-0 -z-10 cyber-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-white/5 py-10 text-center text-sm text-mist">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js and Framer Motion.
      </footer>
    </>
  );
}
