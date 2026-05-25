import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Theme } from "../types";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  activeSection: string;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Get In Touch" },
];

export default function Navbar({ theme, toggleTheme, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Sign */}
        <button
          onClick={() => handleNavClick("hero")}
          className="text-xl font-display font-black tracking-tight group focus:outline-none transition-transform active:scale-95 duration-200"
        >
          <motion.span
            animate={{
              scale: [1, 1.03, 1],
              filter: ["hue-rotate(0deg) brightness(1)", "hue-rotate(10deg) brightness(1.1)", "hue-rotate(0deg) brightness(1)"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ display: "inline-block" }}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent"
          >
            Hirusha Ashinshana.
          </motion.span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg group focus:outline-none ${
                activeSection === item.id
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-slate-100 dark:bg-white/5 rounded-lg -z-0 border border-slate-200/50 dark:border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Subtle hover bottom line */}
              {activeSection !== item.id && (
                <span className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              )}
            </button>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            id="theme-toggler-desktop"
            className="p-2 ml-4 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors duration-200 border border-slate-200/50 dark:border-white/10 focus:outline-none cursor-pointer"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile controls & toggle */}
        <div className="flex items-center md:hidden space-x-3">
          {/* Theme Switcher for mobile */}
          <button
            onClick={toggleTheme}
            id="theme-toggler-mobile"
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-white/10 focus:outline-none cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-white/10 focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#050505]/95 backdrop-blur-lg border-b border-slate-200 dark:border-white/10"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-semibold border-l-4 border-cyan-500"
                      : "text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
