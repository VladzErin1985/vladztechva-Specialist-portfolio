import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Bot, Zap, Globe, Network, Phone, Layers, Clapperboard, Code2, Volume2, VolumeX } from "lucide-react";
import robotHolographic from "@/assets/robot_holographic.jpeg";
import { useInView } from "react-intersection-observer";

const services = [
  { icon: Network, title: "Multi-Agent Orchestration", description: "Multi-agent AI systems — Outbound Operator, Reply Triage, Qualification Analyzer, and Tier Routing agents coordinated via n8n. Also powers Apollo + Instantly outbound: ICP filtering, warmup sequences, and reply automation." },
  { icon: Phone, title: "Voice AI Integration", description: "Retell AI end-to-end: outbound caller setup, dynamic variables, call analysis webhooks, tier routing logic, and Pipedrive CRM sync from every call." },
  { icon: Zap, title: "n8n Workflow Architecture", description: "Production-grade n8n workflows: Apollo outbound pipelines, webhook handlers, multi-branch Switch routing, ICP scoring, and Notion/Slack integrations." },
  { icon: Bot, title: "AI Agent Development", description: "Claude API agent prompts for lead qualification, email drafting, reply triage, call QA, and onboarding — each agent purpose-built with structured output parsing." },
  { icon: Building2, title: "CRM Pipeline Engineering", description: "Pipedrive multi-pipeline setup with stage routing, custom field mapping, API v2 webhooks, cross-pipeline handoffs, and native automation triggers. Also builds Momentum AMS workflows — task and email automations across sales, onboarding, renewal, and claims pipelines, opportunity-stage triggers, and custom field architecture for insurance agencies." },
  { icon: Globe, title: "GHL Systems & Funnels", description: "Complete GoHighLevel CRM setups — 5-stage pipelines, funnels, quiz builders, A2P 10DLC, sub-account snapshots, and round-robin workflows." },
  { icon: Layers, title: "Funnel Design & Integration", description: "Custom sales funnels designed for conversion — landing pages, quiz lead scoring, and upsell flows. Fully integrated: form submit → n8n → AI qualification → CRM stage update → automated drip sequence." },
  { icon: Code2, title: "Custom Website Design", description: "Bespoke business websites with an embedded AI voice assistant — visitors can talk to your site, not just read it, with every conversation synced back to your CRM." },
  { icon: Clapperboard, title: "AI Video Generation", description: "Cinematic AI-generated video — brand pieces, product demos, and avatar-driven sales content produced end-to-end with AI, no camera crew or filming schedule required." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceItem = ({ service }: { service: typeof services[0] }) => (
  <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 flex items-start gap-4">
    <div
      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
      style={{ border: "1px solid hsl(191 100% 42% / 0.2)" }}
    >
      <service.icon size={22} className="text-primary" />
    </div>
    <div className="min-w-0">
      <p className="text-sm leading-relaxed">
        <span
          className="text-foreground text-lg font-semibold"
          style={{ textShadow: "0 1px 3px #000, 0 2px 12px rgba(0,0,0,0.8)" }}
        >
          {service.title}:{" "}
        </span>
        <span
          className="text-muted-foreground"
          style={{ textShadow: "0 1px 3px #000, 0 2px 10px rgba(0,0,0,0.7)" }}
        >
          {service.description}
        </span>
      </p>
    </div>
  </motion.div>
);

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>

      {/* Giant holographic robot — right side background, full height */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={robotHolographic}
          alt="" aria-hidden="true"
          className="absolute h-full w-auto opacity-40"
          style={{ right: "-5%", top: 0, objectFit: "cover", objectPosition: "30% top" }}
        />
        {/* Uniform dark wash on top of the whole image — since the bullet text has no
            card background of its own now, the image needs to sit further back overall,
            not just fade at the left edge, or titles/descriptions become unreadable
            wherever they cross a bright part of the image (the robot's face, the charts). */}
        <div className="absolute inset-0" style={{ background: "hsl(222 47% 4% / 0.55)" }} />
        {/* Fade inward so the bullet text stays readable */}
        <div className="absolute inset-y-0 left-0" style={{
          width: "60%",
          background: "linear-gradient(to right, hsl(222 47% 4%) 45%, hsl(222 47% 4%/0.8) 70%, transparent 100%)",
        }} />
        <div className="absolute inset-x-0 top-0" style={{
          height: "18%",
          background: "linear-gradient(to bottom, hsl(222 47% 4%), transparent)",
        }} />
        <div className="absolute inset-x-0 bottom-0" style={{
          height: "18%",
          background: "linear-gradient(to top, hsl(222 47% 4%), transparent)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-primary text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full bg-primary/10">
            What I Do
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Services & <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Whether you need CRM systems, AI automation, or workflow optimization — I build solutions that run themselves.
          </p>
        </motion.div>

        {/* Video on top (wide landscape), services below split into 3 columns
            so the list stays compact instead of running long. */}
        <div className="flex flex-col gap-12">

          {/* TOP — profile-style intro video, wide landscape */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div
              className="relative rounded-3xl overflow-hidden glass-card"
              style={{ aspectRatio: "16 / 9" }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              >
                <source src="/video/automation-architect-intro.mp4" type="video/mp4" />
              </video>

              {/* Bottom scrim so the caption + button stay legible over any frame */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(222 47% 4% / 0.85) 0%, transparent 100%)" }}
              />

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-16">
                <p className="text-foreground text-sm font-semibold" style={{ textShadow: "0 2px 8px #000" }}>
                  Vladimir Napigkit
                </p>
                <p className="text-primary text-xs font-mono tracking-wide">AI Automation Architect</p>
              </div>

              {/* Volume toggle */}
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                style={{
                  background: "rgba(6, 10, 22, 0.75)",
                  border: "1px solid hsl(191 100% 42% / 0.4)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {muted ? (
                  <VolumeX size={18} className="text-primary" />
                ) : (
                  <Volume2 size={18} className="text-primary" />
                )}
              </button>

              <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
              <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl" />
            </div>
          </motion.div>

          {/* BELOW — services as plain icon + text rows, no cards, 3 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8"
          >
            {services.map((service) => (
              <ServiceItem key={service.title} service={service} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
