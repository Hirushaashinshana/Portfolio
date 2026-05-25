import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Ensure "dark" is always present on document element for dark mode selection and classes
    const root = document.documentElement;
    root.classList.add("dark");
  }, []);

  // Observer to track which section is currently on screen for the navbar
  useEffect(() => {
    const sections = ["hero", "skills", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // triggers when section is in main viewing area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="dark bg-[#050505] text-slate-200">
      {/* Fixed Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 origin-[0%] z-[100]"
        style={{ scaleX }}
      />

      {/* Interactive canvas particles network */}
      <InteractiveBackground />

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
        {/* Navigation Bar */}
        <Navbar activeSection={activeSection} />

        {/* Content Layout Panels */}
        <main className="flex-grow">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Footnotes copyright */}
        <Footer />
      </div>
    </div>
  );
}
