import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Github, Linkedin, Mail, ArrowUpRight, Copy, Check } from "lucide-react";

interface StatusMessage {
  type: "success" | "error" | null;
  text: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFocus = (field: "name" | "email" | "message") => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setFocused((prev) => ({ ...prev, [field]: false }));
    // trigger inline validation on blur
    validateField(field, formData[field]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateField = (field: string, value: string) => {
    let err = "";
    if (!value.trim()) {
      err = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        err = "Enter a valid email address";
      }
    } else if (field === "message" && value.length < 10) {
      err = "Message must be at least 10 characters long";
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return err === "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    setIsSubmitting(true);

    // Simulate standard server latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("hirushaashinshana711@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/45 dark:bg-transparent">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-700/5 dark:bg-cyan-900/10 blur-3xl animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono tracking-widest text-cyan-500 dark:text-cyan-400 font-semibold uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let's Collaborate On Something
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            Have a project concept, dynamic team position, or simply want to chat development? Submit a line below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Quick info pane (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Contact Credentials
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">
                I am responsive for contract gigs, active employment opportunities, or tech pipeline development consulting.
              </p>

              <div className="space-y-4 font-sans">
                {/* Instant Copy Email Block */}
                <div onClick={copyEmailToClipboard} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">Primary Email</p>
                      <p className="text-xs sm:text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">hirushaashinshana711@gmail.com</p>
                    </div>
                  </div>
                  <button className="p-1 rounded bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-cyan-500">
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200/30 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Send size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">Availability</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">Open for active positions</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-white/10">
                <p className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase mb-3 text-center sm:text-left">Social Channels & Links</p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href="https://github.com/hirusha-a"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group focus:outline-none border border-slate-200/20 dark:border-white/10"
                    title="GitHub"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group focus:outline-none border border-slate-200/20 dark:border-white/10"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="mailto:hirushaashinshana711@gmail.com"
                    className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group focus:outline-none border border-slate-200/20 dark:border-white/10"
                    title="Email"
                  >
                    <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6 font-sans"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Name input (Floating Label) */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                        className={`w-full bg-slate-50 dark:bg-black/40 p-3.5 pt-6 text-sm text-slate-900 dark:text-white border rounded-lg outline-none transition-all duration-300 font-medium ${
                          errors.name
                            ? "border-rose-500 bg-rose-50/10 dark:bg-rose-950/10"
                            : focused.name
                            ? "border-cyan-500 shadow-[0_0_12px_rgba(8,220,230,0.15)] bg-white dark:bg-black/60"
                            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                        required
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-3.5 pointer-events-none transition-all duration-300 font-medium ${
                          focused.name || formData.name
                            ? "top-1 text-[10px] font-mono uppercase text-cyan-500 font-bold"
                            : "top-4 text-sm text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        Your Name
                      </label>
                      {errors.name && (
                        <p className="text-xs text-rose-500 mt-1 pl-1 font-mono font-bold select-none">{errors.name}</p>
                      )}
                    </div>

                    {/* Email input (Floating Label) */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        className={`w-full bg-slate-50 dark:bg-black/40 p-3.5 pt-6 text-sm text-slate-900 dark:text-white border rounded-lg outline-none transition-all duration-300 font-medium ${
                          errors.email
                            ? "border-rose-500 bg-rose-50/10 dark:bg-rose-950/10"
                            : focused.email
                            ? "border-cyan-500 shadow-[0_0_12px_rgba(8,220,230,0.15)] bg-white dark:bg-black/60"
                            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                        required
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-3.5 pointer-events-none transition-all duration-300 font-medium ${
                          focused.email || formData.email
                            ? "top-1 text-[10px] font-mono uppercase text-cyan-500 font-bold"
                            : "top-4 text-sm text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1 pl-1 font-mono font-bold select-none">{errors.email}</p>
                      )}
                    </div>

                    {/* Message field (Floating Label) */}
                    <div className="relative">
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={() => handleBlur("message")}
                        rows={5}
                        className={`w-full bg-slate-50 dark:bg-black/40 p-3.5 pt-6 text-sm text-slate-900 dark:text-white border rounded-lg outline-none transition-all duration-300 font-medium resize-none ${
                          errors.message
                            ? "border-rose-500 bg-rose-50/10 dark:bg-rose-950/10"
                            : focused.message
                            ? "border-cyan-500 shadow-[0_0_12px_rgba(8,220,230,0.15)] bg-white dark:bg-black/60"
                            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                        required
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-3.5 pointer-events-none transition-all duration-300 font-medium ${
                          focused.message || formData.message
                            ? "top-1 text-[10px] font-mono uppercase text-cyan-500 font-bold"
                            : "top-4 text-sm text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        Tell me about your project
                      </label>
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1 pl-1 font-mono font-bold select-none">{errors.message}</p>
                      )}
                    </div>

                    {/* Submission button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black hover:scale-[1.01] font-bold rounded-lg shadow-md shadow-cyan-500/10 active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                          <span className="font-mono text-sm leading-none">TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <div className="relative p-3.5 bg-emerald-500/15 text-emerald-500 rounded-full inline-block">
                      <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-75" />
                      <CheckCircle size={40} className="relative z-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                        Transmission Successful!
                      </h4>
                      <p className="text-sm text-slate-550 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Thank you, Hirusha has received your metadata pipeline request safely and will ping you back shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-350 text-xs font-mono font-semibold rounded-lg active:scale-[0.98] transition-all cursor-pointer border border-slate-200/50 dark:border-white/10 focus:outline-none"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
