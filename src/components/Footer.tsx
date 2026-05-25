export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="root-footer"
      className="py-12 bg-white dark:bg-transparent border-t border-slate-200/50 dark:border-white/5 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & tag */}
        <div className="flex items-center space-x-2 text-sm font-display font-semibold text-slate-500 dark:text-slate-400">
          <span>Hirusha Ashinshana Portfolio</span>
        </div>

        {/* Core copyright tagline */}
        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono text-center sm:text-right">
          <p>© {currentYear} Hirusha Ashinshana. Built with passion.</p>
        </div>
      </div>
    </footer>
  );
}
