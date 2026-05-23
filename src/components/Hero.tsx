import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

const techBadges = [
  { icon: "🤖", label: "OpenAI + Claude" },
  { icon: "⚙️", label: "n8n Workflows" },
  { icon: "🔌", label: "Make + APIs" },
  { icon: "</> ", label: "Python / JS" },
];

const pipeline = [
  { step: "1", title: "WEALTH &\nINSURANCE", sub: "Financial Protection & Strategy", icon: "🛡️" },
  { step: "2", title: "INVESTMENT\nDEAL", sub: "Curated Investment Opportunities", icon: "📈" },
  { step: "3", title: "REAL ESTATE\nACQUISITION", sub: "Acquire High-Value Properties", icon: "🏢" },
  { step: "4", title: "CONSTRUCTION\nPROJECT", sub: "Build & Develop Assets", icon: "🏗️" },
  { step: "5", title: "BACK TO\nINVESTMENT", sub: "Reinvest Profits & Scale", icon: "🔄" },
];

const bottomNav = ["AI AGENTS", "WORKFLOWS", "INTEGRATIONS", "AUTOMATION", "ANALYTICS", "REVENUE"];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.015]">
        <motion.div
          animate={{ y: ["0%", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-8">

        {/* ── TOP HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-mono mb-2">VERTICALLY INTEGRATED AUTOMATION ECOSYSTEM</p>
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-mono">ONE CLIENT. END-TO-END VALUE. CONTINUOUS GROWTH.</p>
        </motion.div>

        {/* ── MAIN 3-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 items-start mb-10">

          {/* LEFT — Tech Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hud-corner p-5 rounded-xl neon-border bg-card/60 backdrop-blur-sm order-2 lg:order-1"
          >
            <p className="text-primary text-[10px] tracking-[0.25em] uppercase font-mono mb-4 opacity-70">BUSINESS AUTOMATION ARCHITECT</p>

            <div className="space-y-3 mb-6">
              {techBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 neon-border flex items-center justify-center text-sm">{b.icon}</span>
                  <span className="text-foreground/80 text-sm font-mono">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-mono mb-2">STATUS</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary pulse-cyan" />
                <span className="text-primary text-xs font-mono font-semibold tracking-wider">AUTOMATION ACTIVE</span>
              </div>
            </div>

            {/* Code snippet */}
            <div className="mt-4 p-3 rounded-lg bg-background/80 border border-border font-mono text-[9px] text-muted-foreground leading-relaxed overflow-hidden">
              <span className="text-primary/60">let</span> parsed;<br />
              <span className="text-primary/60">try</span> {"{"}<br />
              {"  "}<span className="text-accent/80">const</span> match = raw.match(...);<br />
              {"  "}parsed = JSON.parse(match[0]);<br />
              {"}"} <span className="text-primary/60">catch</span> (e) {"{"}<br />
              {"  "}parsed = {"{ status: 'follow_up' }"};<br />
              {"}"}
            </div>
          </motion.div>

          {/* CENTER — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 lg:order-2 flex flex-col items-center"
          >
            {/* Name + Title above photo */}
            <div className="text-center mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.0] mb-2"
              >
                <span className="text-foreground">Vladimir</span><br />
                <span className="text-gradient-cyan">Napigkit</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-primary text-sm font-mono tracking-[0.2em] uppercase"
              >
                AI Automation Architect
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-2 mt-2 text-muted-foreground text-xs"
              >
                <MapPin size={12} className="text-primary" />
                <span>Zamboanga City, Philippines · UTC+8</span>
              </motion.div>
            </div>

            {/* Photo */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-primary/20"
              />
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-accent/10 blur-sm" />

              <div className="relative rounded-2xl overflow-hidden neon-border shadow-2xl" style={{ boxShadow: '0 0 40px hsl(191 100% 42% / 0.15)' }}>
                <img
                  src={profileImg}
                  alt="Vladimir Napigkit — AI Automation Architect"
                  className="w-full max-w-[320px] lg:max-w-[380px] h-[420px] lg:h-[480px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="text-foreground font-bold text-sm">Vladimir C. Napigkit</p>
                  <p className="text-primary text-xs font-mono tracking-wider">AI AUTOMATION ARCHITECT</p>
                </div>
              </div>

              {/* Floating status badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 bg-card neon-border rounded-xl px-3 py-2 text-xs font-mono"
              >
                <span className="text-primary">⚡</span> <span className="text-foreground/80">KS-WF6 Running</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-3 -right-6 bg-card neon-border rounded-xl px-3 py-2 text-xs font-mono"
              >
                <span className="text-accent">🔥</span> <span className="text-foreground/80">Hot Lead Routed</span>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-3 mt-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -3, boxShadow: "0 8px 30px -6px hsl(191 100% 42% / 0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-cyan"
              >
                View My Work <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full neon-border text-foreground font-semibold text-sm hover:bg-primary/10 transition-colors"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Ecosystem Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-3 hud-corner p-5 rounded-xl neon-border bg-card/60 backdrop-blur-sm"
          >
            <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-mono mb-4 opacity-70">AUTOMATION PIPELINE</p>

            <div className="space-y-2">
              {pipeline.map((item, i) => (
                <div key={i} className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm shrink-0 group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground text-xs font-semibold leading-tight whitespace-pre-line">{item.title}</p>
                      <p className="text-muted-foreground text-[10px] font-mono truncate">{item.sub}</p>
                    </div>
                    <div className="ml-auto shrink-0">
                      <CheckCircle size={12} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                  {i < pipeline.length - 1 && (
                    <div className="flex justify-center my-1">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        className="text-primary text-xs font-mono"
                      >↓ AUTOMATED HANDOFF</motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
              {[
                { n: "4", l: "Revenue Streams" },
                { n: "8", l: "AI Agents" },
                { n: "15+", l: "Workflows" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-primary font-bold text-lg leading-none">{s.n}</p>
                  <p className="text-muted-foreground text-[10px] font-mono">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM NAV BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex items-center justify-center gap-1 flex-wrap"
        >
          {bottomNav.map((item, i) => (
            <span key={item} className="flex items-center gap-1">
              <span className="px-4 py-1.5 rounded-full border border-border bg-card/40 text-muted-foreground text-[10px] font-mono tracking-widest hover:border-primary/40 hover:text-primary transition-colors cursor-default">
                {item}
              </span>
              {i < bottomNav.length - 1 && <span className="text-border text-xs">|</span>}
            </span>
          ))}
        </motion.div>

        {/* ── TAGLINE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8 pb-4"
        >
          <p className="text-foreground/60 text-sm font-mono">One Client. Four Revenue Streams.</p>
          <p className="text-accent font-bold text-xl tracking-wide">Fully Automated.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
