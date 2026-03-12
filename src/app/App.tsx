import { Navbar } from "./components/Navbar";
import { BlackHoleHero } from "./components/hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#05060a] relative z-0 text-white">
      <div className="relative overflow-hidden">
        <Navbar />
        <BlackHoleHero />
      </div>

      <About />
      <Projects />
      <Certificates />

      <div className="relative z-0">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}