import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, FileText, ChevronDown, Cpu, Sparkles, Code2, Database } from "lucide-react";

const roles = ["Full-Stack Developer", "Data Science Enthusiast", "AI Builder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        setSubText(currentRole.substring(0, subText.length + 1));
        if (subText === currentRole) {
          // Pause at the end of typing
          timer = setTimeout(() => setIsDeleting(true), 1500);
          setTypingSpeed(50);
          return;
        }
      } else {
        setSubText(currentRole.substring(0, subText.length - 1));
        if (subText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, roleIndex, typingSpeed]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-12 md:py-20">
        {/* Hero Copy (7 cols on large, full on small) */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-center md:text-left">
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 px-3.5 py-1.5 rounded-full w-fit mx-auto md:mx-0 shadow-sm mb-2"
          >
            <Sparkles size={14} className="text-cyan-500 dark:text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-slate-600 dark:text-cyan-400">
              Welcome
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I'm{" "}
              <motion.span
                animate={{
                  scale: [1, 1.03, 1],
                  filter: ["hue-rotate(0deg) brightness(1)", "hue-rotate(15deg) brightness(1.15)", "hue-rotate(0deg) brightness(1)"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent"
              >
                Hirusha Ashinshana
              </motion.span>
            </motion.h1>

            {/* Dynamic Typing Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 text-lg sm:text-xl md:text-2xl font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center md:justify-start"
            >
              <span>{subText}</span>
              <span className="ml-1 w-2.5 h-6 bg-cyan-400 animate-pulse inline-block" />
            </motion.div>
          </div>

          {/* Core Biography */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-sans"
          >
            I engineering highly interactive web applications and robust architectures. 
            Passionate about building intelligent neural systems, optimizing performance, 
            and crafting polished human-machine interfaces.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black hover:scale-[1.02] shadow-lg shadow-cyan-500/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 font-bold rounded-lg cursor-pointer focus:outline-none"
            >
              <span>View Work</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* Visual Ornament Component (5 cols on large) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-5 hidden md:flex justify-center relative"
        >
          {/* Outer glowing geometric borders */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-emerald-500 opacity-20 dark:opacity-30 blur-lg animate-pulse" />

          {/* Console Mock Window */}
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6 font-mono text-sm leading-relaxed overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-250/50 dark:border-white/10 pb-3 mb-4 select-none">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">hirusha-terminal.sh</span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center space-x-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">~</span>
                <span className="text-purple-600 dark:text-purple-400">id</span>
                <span className="text-slate-700 dark:text-slate-400">hirusha</span>
              </div>
              <div className="text-slate-700 dark:text-slate-350 bg-slate-100/40 dark:bg-white/5 p-2.5 rounded border border-slate-200/20 dark:border-white/10">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 select-none">Current Workspace</p>
                <div className="flex items-center space-x-2">
                  <Cpu size={14} className="text-cyan-600 dark:text-cyan-400" />
                  <span className="text-cyan-600 dark:text-cyan-400">Node / PyTorch / Gemini</span>
                </div>
              </div>

              <div className="flex items-start space-x-1">
                <span className="text-emerald-500 font-bold">~</span>
                <span className="text-purple-400 text-xs">cat profile.json</span>
              </div>
              <div className="text-xs font-mono select-text bg-[#030303]/60 p-3.5 rounded-xl border border-white/5 space-y-1 overflow-x-auto leading-relaxed">
                <div>
                  <span className="text-pink-400">{"{"}</span>
                </div>
                <div className="pl-4">
                  <div>
                    <span className="text-cyan-400">"name"</span>
                    <span className="text-pink-400">:</span> <span className="text-amber-300">"Hirusha Ashinshana"</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"status"</span>
                    <span className="text-pink-400">:</span> <span className="text-amber-300">"Ready to build"</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"skills"</span>
                    <span className="text-pink-400">:</span> <span className="text-purple-400">{"["}</span>
                  </div>
                  <div className="pl-4 text-emerald-400">
                    <span>"Python"</span>, <span>"TS"</span>, <span>"Next.js"</span>,
                    <br />
                    <span>"TensorFlow"</span>, <span>"React"</span>
                  </div>
                  <div>
                    <span className="text-purple-400">{" ]"}</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"philosophy"</span>
                    <span className="text-pink-400">:</span> <span className="text-purple-400">{"["}</span>
                  </div>
                  <div className="pl-4 text-emerald-400">
                    <span>"Clean interfaces"</span>,
                    <br />
                    <span>"Intelligent systems"</span>
                  </div>
                  <div>
                    <span className="text-purple-400">{" ]"}</span>
                  </div>
                </div>
                <div>
                  <span className="text-pink-400">{"}"}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 text-slate-400 dark:text-slate-500 text-xs">
                <Code2 size={12} className="text-purple-400" />
                <span>Lines of Code: Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection("skills")}>
        <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2 select-none">
          Explore Portfolio
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="p-1 px-1.5 rounded-full border border-slate-300 dark:border-white/10"
        >
          <ChevronDown size={14} className="text-slate-600 dark:text-white" />
        </motion.div>
      </div>
    </section>
  );
}
