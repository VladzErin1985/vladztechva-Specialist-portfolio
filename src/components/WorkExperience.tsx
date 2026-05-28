import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Rocket, Briefcase, Monitor, Circle, CheckCircle, Network } from "lucide-react";
import miniEditors from "@/assets/mini_editors.jpeg";

const experiences = [
  {
    role: "AI Automation Architect",
    company: "Velocity Capital LLC · Konsier.AI",
    period: "May 2026 – Present",
    location: "Philippines · Remote",
    icon: Network,
    highlights: [
      "Architecting a full AI receptionist agency system from greenfield: 9+ n8n workflows, 8 Claude AI agents, and 3 Pipedrive pipelines (OUTBOUND, INBOUND, CUSTOMER LIFECYCLE)",
      "Built KS-WF6 Daily Outbound Pipeline — Apollo lead scrape → ICP scoring → Notion dedup → batch-50 Claude email generation → Instantly delivery, fully automated end-to-end",
      "Integrated Retell AI voice qualification with real-time call_analyzed webhooks — KS-A2 Tier Routing agent auto-stages deals and fires Slack alerts across 3 pipelines",
      "Owns all AI agent development (Claude API, structured JSON output), Pipedrive CRM engineering, and team architecture — builder and future trainer of 2 operations VAs",
    ],
    current: true,
  },
  {
    role: "GHL & AI Automation Specialist",
    company: "Freelance / Self-Directed",
    period: "Feb 2026 – Apr 2026",
    location: "Philippines",
    icon: Rocket,
    highlights: [
      "Built AI Lead Gen System Phase 1 (Joey Elaty — Real Estate): Google Drive trigger → SOP auto-ingestion → Pinecone vector store with OpenAI embeddings — fully automated RAG knowledge base across 4 companies",
      "Built AI Lead Gen System Phase 2: autonomous AI Agent (Claude + Pinecone RAG) querying live Google Sheets leads and updating GHL CRM via API — zero human intervention",
      "Deployed complete GHL CRM systems — multi-stage pipelines, quiz-based lead scoring funnels, Retell AI inbound voice lead capture, and AI-personalized email sequences via n8n",
    ],
    current: false,
  },
  {
    role: "Sales Specialist",
    company: "Samsung",
    period: "Sept 2014 – Jun 2025",
    location: "Kuwait",
    icon: Briefcase,
    highlights: [
      "Achieved 100% of monthly sales targets and perfect product knowledge scores",
      "Conducted market research and competitor product analysis",
      "Managed sales and stock reporting using Excel",
    ],
  },
  {
    role: "Tech Support Specialist",
    company: "Sony",
    period: "Oct 2011 – Jul 2014",
    location: "Kuwait",
    icon: Monitor,
    highlights: [
      "Diagnosed and repaired hardware and software issues across Sony VAIO laptops and the full IT product range",
      "Built, configured, and upgraded PC hardware from components — RAM, storage, motherboards, and peripherals",
      "Maintained expert-level knowledge of competitor products to accurately compare specs and guide technical recommendations",
      "Provided on-site troubleshooting and end-user support, resolving issues efficiently with minimal downtime",
    ],
  },
  {
    role: "Data Encoder",
    company: "Philippine Ports Authority",
    period: "Sept 2008 – Aug 2010",
    location: "Philippines",
    icon: Briefcase,
    highlights: [
      "Encoded data from receipts into digital systems and Microsoft Excel",
      "Generated Invoice Reports and supported office operations",
    ],
  },
  {
    role: "Logistics Data Encoder",
    company: "Coca-Cola Bottlers Philippines",
    period: "Aug 2007 – Jul 2008",
    location: "Zamboanga City",
    icon: Briefcase,
    highlights: [
      "Entered logistics and transaction data into SAP system",
      "Managed inventory reports and retrieved data via SAP tools",
    ],
  },
];

const WorkExperience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Mini Editors — full-section background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={miniEditors}
          alt="" aria-hidden="true"
          className="absolute w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center center", opacity: 1 }}
        />
        {/* Dark center overlay so timeline cards stay readable */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, hsl(222 47% 4% / 0.80) 25%, hsl(222 47% 4% / 0.60) 60%, hsl(222 47% 4% / 0.35) 100%)",
        }} />
        <div className="absolute inset-x-0 top-0" style={{
          height: "20%",
          background: "linear-gradient(to bottom, hsl(222 47% 4%), transparent)",
        }} />
        <div className="absolute inset-x-0 bottom-0" style={{
          height: "20%",
          background: "linear-gradient(to top, hsl(222 47% 4%), transparent)",
        }} />
        <div className="absolute inset-y-0 left-0" style={{
          width: "10%",
          background: "linear-gradient(to right, hsl(222 47% 4%), transparent)",
        }} />
        <div className="absolute inset-y-0 right-0" style={{
          width: "10%",
          background: "linear-gradient(to left, hsl(222 47% 4%), transparent)",
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
            Where I've Been
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px origin-top"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot with pulse */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1.5 mt-6 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="relative"
                >
                  {exp.current ? (
                    <>
                      <Circle size={12} className="fill-primary text-primary" />
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-3 h-3 rounded-full border border-primary"
                      />
                    </>
                  ) : (
                    <CheckCircle size={12} className="text-primary" />
                  )}
                </motion.div>
              </div>

              <div className="hidden md:block md:w-1/2" />

              <motion.div
                whileHover={{ y: -6, scale: 1.01, boxShadow: "0 16px 48px hsl(191 100% 42% / 0.20), 0 0 0 1px hsl(191 100% 42% / 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="ml-14 md:ml-0 md:w-1/2 p-5 rounded-2xl glass-card card-3d group"
              >
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Current
                  </span>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring" }}>
                    <exp.icon size={18} className="text-primary" />
                  </motion.div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                    <span className="text-border">·</span>
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground">{exp.role}</h3>
                <p className="text-primary text-sm font-medium mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl glass-card card-3d max-w-xl mx-auto flex items-center gap-5"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <GraduationCap size={26} className="text-primary" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold">BS Information Technology</h3>
            <p className="text-muted-foreground text-sm">Ateneo de Zamboanga University · 2002 – 2007</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
