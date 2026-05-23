import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const tools = [
  { name: "n8n", emoji: "⚙️", category: "Automation" },
  { name: "Pipedrive", emoji: "📈", category: "CRM" },
  { name: "Retell AI", emoji: "📞", category: "Voice AI" },
  { name: "Claude API", emoji: "🤖", category: "AI" },
  { name: "Apollo.io", emoji: "🎯", category: "Lead Gen" },
  { name: "Instantly", emoji: "✉️", category: "Outreach" },
  { name: "Notion", emoji: "📋", category: "Knowledge Base" },
  { name: "Slack", emoji: "💬", category: "Notifications" },
  { name: "GoHighLevel", emoji: "🏗️", category: "CRM" },
  { name: "Zapier", emoji: "🔄", category: "Automation" },
  { name: "Make.com", emoji: "🔧", category: "Automation" },
  { name: "ChatGPT", emoji: "🧠", category: "AI" },
  { name: "Webhooks", emoji: "🔗", category: "Integration" },
  { name: "Google Workspace", emoji: "📊", category: "Productivity" },
  { name: "Supabase", emoji: "🗄️", category: "Database" },
  { name: "Lovable", emoji: "🎨", category: "Dev" },
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

const Tools = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="tools" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto relative">
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
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
              style={{ perspective: 1000 }}
            >
              <span className="text-3xl group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300">
                {tool.emoji}
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
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shrink-0"
              >
                <span className="text-lg">{tool.emoji}</span>
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
