import { motion } from "framer-motion";
import { Building2, Bot, Zap, Target, Globe, Brain, ArrowUpRight, Network, Phone } from "lucide-react";
import robotHolographic from "@/assets/robot_holographic.jpeg";
import { useTilt } from "@/hooks/useTilt";
import { useInView } from "react-intersection-observer";

const services = [
  { icon: Network, title: "Multi-Agent Orchestration", description: "Design and build multi-agent AI systems — Outbound Operator, Reply Triage, Qualification Analyzer, Tier Routing, and Prompt QA agents coordinated via n8n workflows." },
  { icon: Phone, title: "Voice AI Integration", description: "Retell AI end-to-end: outbound caller setup, dynamic variables, call analysis webhooks, tier routing logic, and Pipedrive CRM sync from every call." },
  { icon: Zap, title: "n8n Workflow Architecture", description: "Production-grade n8n workflows: Apollo outbound pipelines, webhook handlers, multi-branch Switch routing, ICP scoring, and Notion/Slack integrations." },
  { icon: Bot, title: "AI Agent Development", description: "Claude API agent prompts for lead qualification, email drafting, reply triage, call QA, and onboarding — each agent purpose-built with structured output parsing." },
  { icon: Building2, title: "CRM Pipeline Engineering", description: "Pipedrive multi-pipeline setup with stage routing, custom field mapping, API v2 webhooks, cross-pipeline handoffs, and native automation triggers." },
  { icon: Target, title: "Outbound Lead Systems", description: "Apollo + Instantly outbound stacks: ICP filtering, Clay enrichment, warmup sequences, spintax email copy, reply webhook processing, and Notion dedup." },
  { icon: Brain, title: "RAG & Knowledge Pipelines", description: "Retrieval-Augmented Generation using Supabase vector databases and Notion as a live knowledge base for context-aware AI agent responses." },
  { icon: Globe, title: "GHL Systems & Funnels", description: "Complete GoHighLevel CRM setups — 5-stage pipelines, funnels, quiz builders, A2P 10DLC, sub-account snapshots, and round-robin workflows." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(15);
  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={isCoarse ? undefined : handleMouseMove}
      onMouseLeave={isCoarse ? undefined : handleMouseLeave}
      style={{
        transformPerspective: 1000,
        rotateX: isCoarse ? 0 : tilt.rotateX,
        rotateY: isCoarse ? 0 : tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group p-6 rounded-2xl bg-card border border-border relative overflow-hidden cursor-default hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-shadow"
    >
      <div className="flex items-start justify-between mb-5">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300"
        >
          <motion.div whileHover={{ y: [0, -8, 0] }} transition={{ duration: 0.4 }}>
            <service.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
          </motion.div>
        </motion.div>
        <ArrowUpRight size={18} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  );
};

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Decorative holographic robot — right side watermark */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: "50%", right: "-60px", transform: "translateY(-50%)", zIndex: 0 }}
      >
        <img
          src={robotHolographic}
          alt=""
          aria-hidden="true"
          style={{
            width: "480px",
            opacity: 0.055,
            maskImage: "radial-gradient(ellipse 70% 80% at 40% 42%, black 25%, rgba(0,0,0,0.5) 58%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 40% 42%, black 25%, rgba(0,0,0,0.5) 58%, transparent 85%)",
            filter: "grayscale(0.3) brightness(2) saturate(1.8)",
          }}
        />
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
