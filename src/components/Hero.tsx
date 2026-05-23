import { motion } from "framer-motion";
import { ArrowDown, MapPin, ArrowRight, Zap, Bot, CheckCircle, Network } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";
import profileImg from "@/assets/profile.jpeg";

const floatingBadges = [
  { text: "⚡ KS-WF6 Running", delay: 0, duration: 2.5, y: -10 },
  { text: "🔥 Hot Lead Qualified", delay: 0.5, duration: 3, y: -8 },
  { text: "✅ Tier Routed → Slack", delay: 1, duration: 2, y: -12 },
];

const ecosystem = [
  { label: "Lead Generation", icon: "🎯" },
  { label: "AI Qualification", icon: "🤖" },
  { label: "CRM Routing", icon: "📊" },
  { label: "Voice AI Calls", icon: "📞" },
  { label: "Auto-Nurture", icon: "✉️" },
];

const StatItem = ({ target, label, icon: Icon }: { target: number; label: string; icon: React.ElementType }) => {
  const { ref, count } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Icon size={16} className="text-primary" />
        <span className="text-foreground font-bold text-xl">{count}+</span>
      </div>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 hero-blob" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="order-2 lg:order-1 z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold tracking-wider uppercase">🇵🇭 Open to Clients</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.1] mb-2 text-foreground">
                Hi, I'm <span className="text-primary">Vladimir</span>
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.1] mb-2 text-foreground">
                AI Automation
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
                <span className="text-primary">Architect</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="text-muted-foreground text-base md:text-lg max-w-lg mb-6 leading-relaxed"
            >
              Building vertically integrated AI automation systems — from outbound lead generation to voice AI qualification, CRM routing, and multi-agent orchestration using n8n, Pipedrive, Retell AI, and Claude API.
            </motion.p>

            {/* Ecosystem pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {ecosystem.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">
                  <span>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="flex items-center gap-2 mb-8 text-muted-foreground text-sm"
            >
              <MapPin size={16} className="text-primary" />
              <span>Zamboanga City, Philippines · UTC+8</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -3, boxShadow: "0 8px 30px -6px hsl(var(--primary) / 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all glow-primary"
              >
                View My Work
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex gap-8"
            >
              <StatItem target={15} label="n8n Workflows" icon={Zap} />
              <StatItem target={8} label="AI Agents" icon={Bot} />
              <StatItem target={3} label="Active Pipelines" icon={Network} />
              <StatItem target={100} label="Tested" icon={CheckCircle} />
            </motion.div>
          </div>

          {/* Right — Profile */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20"
              />

              {/* Floating photo */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
                  <img
                    src={profileImg}
                    alt="Vladimir Napigkit — AI Automation Architect"
                    className="w-72 h-80 sm:w-80 sm:h-96 lg:w-[26rem] lg:h-[32rem] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-primary-foreground font-bold text-lg">Vladimir Napigkit</p>
                    <p className="text-primary-foreground/80 text-sm">AI Automation Architect</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, badge.y, 0] }}
                  transition={{ duration: badge.duration, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                  whileHover={{ rotateX: 10, rotateY: 10 }}
                  className={`absolute bg-card border border-border rounded-2xl px-4 py-2 shadow-lg text-xs font-medium text-foreground ${
                    i === 0 ? "-bottom-4 -left-4" : i === 1 ? "-top-3 -right-3" : "top-1/2 -left-8"
                  }`}
                  style={{ perspective: 1000 }}
                >
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
