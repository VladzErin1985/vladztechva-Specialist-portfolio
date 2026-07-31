import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";

// ── Tech badges (left panel) ──────────────────────────────────────────────────
const techBadges = [
  { icon: "🤖", label: "OpenAI + Claude" },
  { icon: "⚙️", label: "n8n Workflows" },
  { icon: "🔌", label: "Make + APIs" },
  { icon: "</>", label: "Python / JavaScript" },
];

// ── Pipeline (right panel) ────────────────────────────────────────────────────
const pipeline = [
  { title: "AI + Apollo",       sub: "Lead Gen · n8n Automation",   icon: "🎯", color: "#00f0ff" },
  { title: "AI Qualification",  sub: "Retell AI · Claude",          icon: "🤖", color: "#818cf8" },
  { title: "CRM Routing",       sub: "Pipedrive · n8n",             icon: "📊", color: "#34d399" },
  { title: "Auto Nurture",      sub: "Reply Handler · Slack",       icon: "✉️", color: "#f59e0b" },
];

// ── Bottom nav ────────────────────────────────────────────────────────────────
const bottomNav = ["AI AGENTS", "WORKFLOWS", "INTEGRATIONS", "AUTOMATION", "ANALYTICS", "REVENUE"];

// ── Floating particles config ─────────────────────────────────────────────────
const PARTICLE_COUNT = 22;

const Hero = () => {
  // Generate stable particle positions (no random per-render)
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: (i * 4.7 + 3) % 100,
      y: (i * 7.3 + 10) % 100,
      size: (i % 3) + 1.5,
      dur: 3 + (i % 4),
      delay: (i * 0.31) % 2.5,
      opacity: 0.25 + (i % 3) * 0.15,
    })), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── BACKGROUND: hero video + layered overlays ───────────────────────── */}
      <div className="absolute inset-0 z-0" style={{ background: "hsl(222 47% 4%)" }}>
        {/* object-cover — fills the full container with zero letterbox gaps.
            (object-contain was tried but left a visible seam/line on some viewport
            aspect ratios where the fit was just slightly off — cover avoids that
            failure mode entirely by never leaving any unfilled edge.) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        >
          <source src="/video/hero-ai-system.mp4" type="video/mp4" />
        </video>

        {/* Uniform dark wash — lightened so the video reads clearly instead of
            washing out; the directional gradient below still darkens the text
            side enough for the panels to stay legible */}
        <div className="absolute inset-0" style={{ background: "hsl(222 47% 4% / 0.15)" }} />

        {/* Main directional gradient — left open, right sealed. Lightened across
            the board vs. the original pass so the video stays visible everywhere,
            still darkening progressively toward the right where the pipeline card sits. */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to right,
            hsl(222 47% 4% / 0.02) 0%,
            hsl(222 47% 4% / 0.12) 25%,
            hsl(222 47% 4% / 0.25) 48%,
            hsl(222 47% 4% / 0.55) 68%,
            hsl(222 47% 4% / 0.80) 80%)`
        }} />

        {/* Top seal — hides baked-in image text */}
        <div className="absolute inset-x-0 top-0 h-44" style={{
          background: "linear-gradient(to bottom, hsl(222 47% 4%) 0%, hsl(222 47% 4%/0.88) 35%, transparent 100%)"
        }} />

        {/* Bottom seal */}
        <div className="absolute inset-x-0 bottom-0 h-52" style={{
          background: "linear-gradient(to top, hsl(222 47% 4%) 0%, hsl(222 47% 4%/0.9) 35%, transparent 100%)"
        }} />

        {/* Subtle cyan vignette on far right edge */}
        <div className="absolute inset-y-0 right-0 w-px"
          style={{ background: "hsl(191 100% 42% / 0.15)", boxShadow: "0 0 80px 40px hsl(191 100% 42% / 0.04)" }}
        />

        {/* Fine grid overlay */}
        <div className="absolute inset-0 opacity-[0.028]" style={{
          backgroundImage: `linear-gradient(hsl(191 100% 42%) 1px,transparent 1px),
                            linear-gradient(90deg,hsl(191 100% 42%) 1px,transparent 1px)`,
          backgroundSize: "56px 56px"
        }} />
      </div>

      {/* ── FLOATING PARTICLES ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              background: "hsl(191 100% 60%)",
              boxShadow: `0 0 ${p.size * 3}px hsl(191 100% 60% / 0.7)`,
              opacity: p.opacity,
            }}
            animate={{ y: [0, -18, 0], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── SCAN LINE ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.015] z-[2]">
        <motion.div
          animate={{ y: ["0%", "100vh"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-8">

        {/* ── TOP SUBTITLE ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary/75 text-[11px] tracking-[0.38em] uppercase font-mono mb-1.5 drop-shadow-[0_0_8px_hsl(191_100%_42%/0.4)]">
            VERTICALLY INTEGRATED AUTOMATION ECOSYSTEM
          </p>
          <p className="text-foreground/40 text-[10px] tracking-[0.25em] uppercase font-mono">
            ONE CLIENT. END-TO-END VALUE. CONTINUOUS GROWTH.
          </p>
        </motion.div>

        {/* ── 3-COLUMN "COMMAND CENTER" LAYOUT ────────────────────────────── */}
        {/* Deliberate composition, not a random 3-card scatter: skills (left) and
            pipeline output (right) flank the centered name — reads left-to-right
            as "inputs → operator → results". Small animated beams at each card's
            inner edge reinforce that flow, echoing the pipeline's own AUTO HANDOFF
            connector motif. Full width now (no max-w cap) so the two side cards
            sit near their own edges and the video's subject stays clear in the middle. */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-6 lg:gap-4 items-center mb-10">

          {/* LEFT — Tech stack card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div
              style={{
                background: "rgba(6, 10, 22, 0.72)",
                border: "1px solid hsl(191 100% 42% / 0.22)",
                boxShadow: "0 0 0 1px hsl(191 100% 42% / 0.08), 0 8px 40px hsl(191 100% 42% / 0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              className="rounded-2xl p-5 w-[228px] relative overflow-hidden"
            >
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />

              <p className="text-primary/60 text-[9px] tracking-[0.28em] uppercase font-mono mb-4">
                BUSINESS AUTOMATION ARCHITECT
              </p>

              <div className="space-y-3 mb-5">
                {techBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] shrink-0"
                      style={{
                        background: "hsl(191 100% 42% / 0.1)",
                        border: "1px solid hsl(191 100% 42% / 0.2)",
                        boxShadow: "0 0 8px hsl(191 100% 42% / 0.12)",
                      }}
                    >{b.icon}</span>
                    <span className="text-foreground text-xs font-mono" style={{ textShadow: "0 0 1px #000, 0 1px 6px #000" }}>{b.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid hsl(191 100% 42% / 0.15)" }} className="pt-3">
                <p className="text-foreground/30 text-[9px] tracking-[0.22em] uppercase font-mono mb-2">STATUS</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-cyan shrink-0" />
                  <span className="text-primary text-[10px] font-mono font-semibold tracking-widest drop-shadow-[0_0_6px_hsl(191_100%_42%/0.6)]">
                    AUTOMATION ACTIVE
                  </span>
                </div>
              </div>

              {/* Outbound beam — signals this feeds toward the center */}
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden lg:block absolute top-1/2 -right-6 w-6 h-px"
                style={{ background: "linear-gradient(to right, hsl(191 100% 42% / 0.8), transparent)" }}
              />
            </div>
          </motion.div>

          {/* CENTER — Name (one line) + subtitle + location + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2 flex flex-col items-center text-center gap-4 px-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-bold tracking-normal whitespace-nowrap"
              style={{ fontSize: "clamp(1.6rem, 5.5vw, 4.4rem)", lineHeight: 1 }}
            >
              <span style={{
                background: "linear-gradient(90deg, #ffffff 0%, #e2f8ff 30%, #00f0ff 65%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 28px hsl(191 100% 42% / 0.70)) drop-shadow(0 0 60px hsl(191 100% 42% / 0.35)) drop-shadow(2px 4px 0px rgba(0,0,0,0.9))",
              }}>VLADIMIR NAPIGKIT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-[13px] font-mono tracking-[0.3em] uppercase"
              style={{
                color: "#00f0ff",
                textShadow: "0 0 18px hsl(191 100% 42% / 0.65), 0 0 40px hsl(191 100% 42% / 0.25)",
              }}
            >
              AI AUTOMATION ARCHITECT
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2 text-foreground/40 text-xs font-mono"
            >
              <MapPin size={11} style={{ color: "#00f0ff" }} />
              <span>Zamboanga City, Philippines · UTC+8</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="flex gap-3 mt-1"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(191 100% 42%) 0%, hsl(210 100% 55%) 100%)",
                  color: "hsl(222 47% 4%)",
                  boxShadow: "0 0 24px hsl(191 100% 42% / 0.4), 0 4px 16px hsl(191 100% 42% / 0.2)",
                }}
              >
                View My Work <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -3, background: "hsl(191 100% 42% / 0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground font-semibold text-sm transition-colors"
                style={{
                  border: "1px solid hsl(191 100% 42% / 0.3)",
                  boxShadow: "0 0 12px hsl(191 100% 42% / 0.08), inset 0 0 12px hsl(191 100% 42% / 0.04)",
                }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Automation Pipeline card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-3 flex justify-center lg:justify-end"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid hsl(191 100% 42% / 0.20)",
                boxShadow: "0 0 0 1px hsl(191 100% 42% / 0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              className="rounded-2xl p-5 relative overflow-hidden w-full max-w-[300px]"
            >
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />

              {/* Inbound beam — mirrors the left card's outbound beam */}
              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="hidden lg:block absolute top-1/2 -left-6 w-6 h-px"
                style={{ background: "linear-gradient(to left, hsl(191 100% 42% / 0.8), transparent)" }}
              />

              <p className="text-primary/55 text-[10px] tracking-[0.28em] uppercase font-mono mb-4">
                AUTOMATION PIPELINE
              </p>

              <div className="space-y-1.5">
                {pipeline.map((item, i) => (
                  <div key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl group transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                      whileHover={{
                        background: "rgba(0,240,255,0.05)",
                        borderColor: "hsl(191 100% 42% / 0.3)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                        style={{
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}30`,
                          boxShadow: `0 0 10px ${item.color}15`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground text-xs font-semibold tracking-wide" style={{ textShadow: "0 0 1px #000, 0 1px 6px #000, 0 2px 12px #000" }}>{item.title}</p>
                        <p className="text-foreground/70 text-[10px] font-mono" style={{ textShadow: "0 0 1px #000, 0 1px 4px #000" }}>{item.sub}</p>
                      </div>
                      <CheckCircle size={12} style={{ color: item.color, opacity: 0.5 }} className="shrink-0" />
                    </motion.div>

                    {i < pipeline.length - 1 && (
                      <div className="flex items-center justify-center gap-1.5 my-1">
                        <motion.div
                          animate={{ opacity: [0.25, 0.9, 0.25] }}
                          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
                          className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"
                        />
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
                          className="text-primary text-[9px] font-mono tracking-widest"
                        >
                          AUTO HANDOFF
                        </motion.span>
                        <motion.div
                          animate={{ opacity: [0.25, 0.9, 0.25] }}
                          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
                          className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div
                className="mt-4 pt-4 grid grid-cols-3 gap-2 text-center"
                style={{ borderTop: "1px solid hsl(191 100% 42% / 0.12)" }}
              >
                {[
                  { n: "30+", l: "Workflows" },
                  { n: "10", l: "AI Agents" },
                  { n: "3", l: "Pipelines" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-bold text-lg leading-none"
                      style={{ color: "#00f0ff", textShadow: "0 0 10px hsl(191 100% 42% / 0.5)" }}>
                      {s.n}
                    </p>
                    <p className="text-foreground/35 text-[10px] font-mono mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM NAV PILLS ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex items-center justify-center gap-1 flex-wrap"
        >
          {bottomNav.map((item, i) => (
            <span key={item} className="flex items-center gap-1">
              <span
                className="px-4 py-1.5 rounded-full text-foreground/40 text-[10px] font-mono tracking-widest hover:text-primary cursor-default transition-colors duration-200"
                style={{
                  border: "1px solid hsl(215 30% 35% / 0.25)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {item}
              </span>
              {i < bottomNav.length - 1 && (
                <span className="text-foreground/15 text-xs">|</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* ── TAGLINE ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8 pb-4"
        >
          <p className="text-foreground/45 text-sm font-mono tracking-wide">
            One Client. Four Revenue Streams.
          </p>
          <p
            className="font-bold text-xl tracking-wide"
            style={{
              color: "#f59e0b",
              textShadow: "0 0 20px hsl(43 100% 55% / 0.45), 0 0 48px hsl(43 100% 55% / 0.2)",
            }}
          >
            Fully Automated.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
