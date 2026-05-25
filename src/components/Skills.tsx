import { motion } from "motion/react";
import { 
  Code, Cpu, Layers, Terminal, Globe, 
  Wind, GitBranch, Github, Shield, Cloud, Server, BrainCircuit 
} from "lucide-react";

interface SkillItem {
  name: string;
  icon: any;
  level: number; // 0-100 representation
  glowColor: string;
}

const skillCategories = [
  {
    title: "Languages",
    description: "The core foundational languages I speak to specify and configure systems.",
    items: [
      { name: "Python", icon: Terminal, level: 90, glowColor: "from-blue-500/10 to-emerald-500/10 hover:border-emerald-500/30 text-emerald-500" },
      { name: "TypeScript", icon: Cpu, level: 85, glowColor: "from-blue-500/10 to-cyan-500/10 hover:border-cyan-500/30 text-cyan-500" },
      { name: "JavaScript", icon: Code, level: 95, glowColor: "from-yellow-500/10 to-amber-500/10 hover:border-amber-500/30 text-amber-500" },
      { name: "HTML / CSS", icon: Layers, level: 90, glowColor: "from-orange-500/10 to-rose-500/10 hover:border-rose-500/30 text-rose-500" },
    ] as SkillItem[]
  },
  {
    title: "Frameworks & Libraries",
    description: "The ecosystems and engines I leverage to engineer high-velocity software.",
    items: [
      { name: "React", icon: Globe, level: 90, glowColor: "from-cyan-500/10 to-teal-500/10 hover:border-cyan-500/30 text-cyan-400" },
      { name: "Next.js", icon: Cloud, level: 85, glowColor: "from-neutral-500/10 to-neutral-900/10 hover:border-slate-400/35 text-slate-800 dark:text-white" },
      { name: "Tailwind CSS", icon: Wind, level: 95, glowColor: "from-sky-500/10 to-teal-500/10 hover:border-sky-400/30 text-sky-450" },
      { name: "PyTorch", icon: BrainCircuit, level: 80, glowColor: "from-red-500/10 to-orange-500/10 hover:border-orange-500/30 text-orange-500" },
      { name: "TensorFlow", icon: Shield, level: 75, glowColor: "from-amber-600/10 to-orange-600/10 hover:border-amber-500/30 text-amber-600" },
    ] as SkillItem[]
  },
  {
    title: "Tools & Platforms",
    description: "Deployment, operations, and source control platforms facilitating high reliability.",
    items: [
      { name: "Git", icon: GitBranch, level: 85, glowColor: "from-orange-600/10 to-red-600/10 hover:border-orange-600/30 text-orange-600" },
      { name: "GitHub", icon: Github, level: 95, glowColor: "from-slate-500/10 to-purple-500/10 hover:border-purple-500/30 text-purple-500" },
      { name: "Vercel", icon: Server, level: 90, glowColor: "from-slate-800/10 to-black/10 hover:border-slate-500/30 text-slate-800 dark:text-neutral-200" },
      { name: "Netlify", icon: Globe, level: 80, glowColor: "from-teal-500/10 to-cyan-500/10 hover:border-teal-500/30 text-teal-500" },
    ] as SkillItem[]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/45 dark:bg-transparent">
      {/* Grid Pattern and subtle blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-3/4 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-900/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cyan-700/5 dark:bg-cyan-900/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-500 dark:text-purple-400 font-semibold uppercase">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Arsenal of Technologies
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            A comprehensive overview of components, pipelines, systems, and structures I build with daily.
          </p>
        </div>

        {/* Categories Grid (Modularized structures) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              className="group bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-white/10 shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">
                    cat-0{catIndex + 1}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Badges Stack */}
                <div className="space-y-4">
                  {category.items.map((skill) => {
                    const IconComp = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className={`group/skill relative p-3 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-[#0a0a0a]/80 bg-gradient-to-r ${skill.glowColor} transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 group-hover/skill:bg-white dark:group-hover/skill:bg-black transition-all duration-300">
                              <IconComp size={16} className={`${skill.glowColor.split(" ").slice(-1)[0]}`} />
                            </div>
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 font-display">
                              {skill.name}
                            </span>
                          </div>
                          {skill.level && (
                            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 select-none">
                              {skill.level}%
                            </span>
                          )}
                        </div>

                        {/* Subtle level progress bar track */}
                        <div className="h-1 w-full bg-slate-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
