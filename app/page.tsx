import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/techstack";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Hero/>
    <TechStack/>
    <Projects/>
    <Contact/>
   </div>
  );
}
