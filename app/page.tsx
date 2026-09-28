import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </main>
  );
}
