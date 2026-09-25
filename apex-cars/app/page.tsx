import { Hero } from "@/components/Hero";
import { CarsExplorer } from "@/components/CarsExplorer";
import { About } from "@/components/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarsExplorer />
      <About />
    </>
  );
}
