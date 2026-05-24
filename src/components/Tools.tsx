import { motion } from "framer-motion";
import robotLaptop from "@/assets/robot_laptop.jpeg";
import { useInView } from "react-intersection-observer";
import {
  SiN8N, SiAnthropic, SiNotion, SiSlack, SiZapier,
  SiMake, SiOpenai, SiGoogle, SiSupabase,
  SiFigma, SiVercel,
} from "react-icons/si";
import { Mic, Send, BarChart3, Link2, Target, Workflow } from "lucide-react";

type ToolIcon =
  | { type: "si"; component: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }> }
  | { type: "lucide"; component: React.ComponentType<{ size?: number; className?: string; color?: string }>; color: string };

interface Tool {
  name: string;
  icon: ToolIcon;
  category: string;
  color: string;
}

const tools: Tool[] = [
  { name: "n8n", icon: { type: "si", component: SiN8N }, category: "Automation", color: "#EA4B71" },
  { name: "Pipedrive", icon: { type: "lucide", component: Workflow, color: "#25CA3E" }, category: "CRM", color: "#25CA3E" },
  { name: "Retell AI", icon: { type: "lucide", component: Mic, color: "#818CF8" }, category: "Voice AI", color: "#818CF8" },
  { name: "Claude API", icon: { type: "si", component: SiAnthropic }, category: "AI", color: "#D97706" },
  { name: "Apollo.io", icon: { type: "lucide", component: Target, color: "#3B82F6" }, category: "Lead Gen", color: "#3B82F6" },
  { name: "Instantly", icon: { type: "lucide", component: Send, color: "#F97316" }, category: "Outreach", color: "#F97316" },
  { name: "Notion", icon: { type: "si", component: SiNotion }, category: "Knowledge Base", color: "#E2E8F0" },
  { name: "Slack", icon: { type: "si", component: SiSlack }, category: "Notifications", color: "#4A154B" },
  { name: "GoHighLevel", icon: { type: "lucide", component: BarChart3, color: "#2563EB" }, category: "CRM", color: "#2563EB" },
  { name: "Zapier", icon: { type: "si", component: SiZapier }, category: "Automation", color: "#FF4A00" },
  { name: "Make.com", icon: { type: "si", component: SiMake }, category: "Automation", color: "#9B4DCA" },
  { name: "ChatGPT", icon: { type: "si", component: SiOpenai }, category: "AI", color: "#10A37F" },
  { name: "Webhooks", icon: { type: "lucide", component: Link2, color: "#06B6D4" }, category: "Integration", color: "#06B6D4" },
  { name: "Google Workspace", icon: { type: "si", component: SiGoogle }, category: "Productivity", color: "#4285F4" },
  { name: "Supabase", icon: { type: "si", component: SiSupabase }, category: "Database", color: "#3ECF8E" },
{ name: "Figma", icon: { type: "si", component: SiFigma }, category: "Design", color: "#F24E1E" },
  { name: "Vercel", icon: { type: "si", component: SiVercel }, category: "Deploy", color: "#E2E8F0" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

const marqueeTools = [...tools, ...tools, ...tools];

const ToolIcon = ({ icon, color, size = 28 }: { icon: ToolIcon; color: string; size?: number }) => {
  if (icon.type === "si") {
    const Icon = icon.component;
    return <Icon size={size} style={{ color }} />;
  }
  const Icon = icon.component as React.ComponentType<{ size?: number; color?: string }>;
  return <Icon size={size} color={color} />;
};

const Tools = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="tools" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Giant laptop robot — left side background, full height */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={robotLaptop}
          alt="" aria-hidden="true"
          className="absolute h-full w-auto"
          style={{ left: "-5%", top: 0, objectFit: "cover", objectPosition: "60% top" }}
        />
        <div className="absolute inset-y-0 right-0" style={{
          width: "65%",
          background: "linear-gradient(to left, hsl(222 47% 4%) 55%, hsl(222 47% 4%/0.85) 75%, transparent 100%)",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-primary text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full bg-primary/10">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Tools & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-base">
            The platforms and technologies I use daily to build powerful automations and systems.
          </p>
        </motion.div>

        {/* Icon grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.06, rotateY: 360, boxShadow: "0 16px 40px hsl(191 100% 42% / 0.22), 0 0 0 1px hsl(191 100% 42% / 0.5)" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl glass-card cursor-default"
              style={{ perspective: 1000 }}
            >
              <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <ToolIcon icon={tool.icon} color={tool.color} size={28} />
              </span>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{tool.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
            {marqueeTools.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card shrink-0"
              >
                <ToolIcon icon={tool.icon} color={tool.color} size={16} />
                <span className="text-sm font-medium text-foreground whitespace-nowrap">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
