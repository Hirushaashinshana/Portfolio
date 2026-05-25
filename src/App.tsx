import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InteractiveBackground from "./components/InteractiveBackground";
import { Theme } from "./types";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("hirusha-theme") as Theme;
    if (stored) return stored;
    return "dark";
  });

  const [activeSection, setActiveSection] = useState("hero");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    localStorage.setItem("hirusha-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={theme === "dark" ? "dark bg-[#050505] text-slate-200" : "bg-slate-50 text-slate-800"}>
      {/* Fixed Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 origin-[0%] z-[100]"
        style={{ scaleX }}
      />

      {/* Interactive canvas particles network */}
      <InteractiveBackground theme={theme} />

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
        {/* Navigation Bar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />

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
