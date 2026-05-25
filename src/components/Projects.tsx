import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Filter, Code, Sparkles, Server } from "lucide-react";
import { Project } from "../types";

const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "ML Model Architecture Builder",
    description: "Visually build, design, and configure complex neural network and deep learning layers on a Node-based interactive drag-and-drop canvas. Powered by the Gemini API for automatic neural model advice and layout synthesis.",
    tags: ["Next.js", "TypeScript", "Gemini API", "Tailwind CSS"],
    liveUrl: "https://ml-model-architecture-builder.vercel.app/",
    githubUrl: "https://github.com/hirusha-a/ml-model-architecture-builder",
    category: "AI & ML",
    featured: true,
  },
  {
    id: "proj-2",
    title: "NovaCoin",
    description: "A highly responsive real-time cryptocurrency dashboard tracking the global digital coin market indices, candlestick trend historicals, and transaction data updates.",
    tags: ["Python", "TypeScript", "HTML", "CSS"],
    liveUrl: "https://nova-coin-nine.vercel.app/",
    githubUrl: "https://github.com/hirusha-a/nova-coin",
    category: "Web Apps",
    featured: true,
  },
  {
    id: "proj-3",
    title: "NeuroClass Sentiment Suite",
    description: "Natural language classifier trained with custom transformer layers to parse, categorize, and visual real-time streams of social signals with a fast internal pipeline.",
    tags: ["Python", "PyTorch", "React", "Tailwind CSS"],
    liveUrl: "https://github.com/hirusha-a",
    githubUrl: "https://github.com/hirusha-a",
    category: "AI & ML",
    featured: false,
  },
  {
    id: "proj-4",
    title: "OmniSync Collaborative Engine",
    description: "Real-time, persistent developer canvas and group text space with instant code-execution testing environment built to streamline remote workflow iterations.",
    tags: ["TypeScript", "React", "Express", "Vite"],
    liveUrl: "https://github.com/hirusha-a",
    category: "Tools",
    featured: false,
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "AI & ML" | "Web Apps" | "Tools">("All");

  const filteredProjects = projectsData.filter(
    (proj) => filter === "All" || proj.category === filter
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-950/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-500 dark:text-purple-400 font-semibold uppercase">
            Creative Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
            Finished Deployments & Projects
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A filtered showcase of real systems, digital solutions, and neural architecture tools built down to production-level standards.
          </p>
        </div>

        {/* Filter Handles */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 px-2.5 py-1.5 rounded-xl text-slate-400 text-xs font-mono select-none">
            <Filter size={12} />
            <span>Filter:</span>
          </div>

          {(["All", "AI & ML", "Web Apps", "Tools"] as const).map((catName) => (
            <button
              key={catName}
              onClick={() => setFilter(catName)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 focus:outline-none cursor-pointer ${
                filter === catName
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md border border-slate-900 dark:border-white scale-[1.03]"
                  : "bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-350 border border-slate-200/40 dark:border-white/10"
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between bg-slate-50/50 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/10 hover:border-slate-300 dark:hover:border-cyan-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl dark:hover:shadow-cyan-500/5"
              >
                {/* Decorative Tech Tag Category Icon */}
                <div className="absolute top-6 right-6 p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center select-none">
                  {project.category === "AI & ML" && <Sparkles size={14} className="text-purple-400" />}
                  {project.category === "Web Apps" && <Code size={14} className="text-cyan-400" />}
                  {project.category === "Tools" && <Server size={14} className="text-emerald-400" />}
                </div>

                {/* Card Main Body */}
                <div className="space-y-4">
                  {/* Category Banner tag */}
                  <span className="inline-block text-[10px] uppercase tracking-wider font-mono font-bold text-cyan-500 dark:text-cyan-400">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Descr */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Tech stack Tags row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-350 text-[11px] font-mono font-medium rounded border border-slate-200/50 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA URL Actions */}
                <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-200/50 dark:border-white/5">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="inline-flex items-center space-x-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer referrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-250 text-xs font-mono font-medium rounded-lg active:scale-[0.98] transition-all cursor-pointer border border-slate-150 dark:border-white/10"
                    >
                      <Github size={12} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
