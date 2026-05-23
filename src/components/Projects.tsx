import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Bot, Workflow, Mail, Database, FileText, BarChart3, ArrowUpRight, Building2, Zap, LayoutGrid, Repeat, Settings, Circle, CheckCircle, GitMerge, Phone, Network } from "lucide-react";
import { useInView } from "react-intersection-observer";

import imgAIContent from "@/assets/AI_Content_Repurposing.png";
import imgFinancialExport from "@/assets/make_Automated_Financial_Export_Pipeline.png";
import imgGmailRouting from "@/assets/make_Gmail_Attachment_Routing.png";
import imgN8nGmail from "@/assets/n8n_Gmail_Attachments.png";
import imgFBAgent from "@/assets/n8n_FB_AI_Agent.png";
import imgCustomerOrders from "@/assets/n8n_Customer_Orders.png";
import imgRAGSupabase from "@/assets/n8n_RAG_Supabase.png";
import imgKsWf6 from "@/assets/ks_wf6.png";
import imgKsWf2 from "@/assets/ks_wf2.png";
import imgKsA2 from "@/assets/ks_a2.png";
import imgKsWf1 from "@/assets/ks_wf1.png";

const filters = [
  { label: "All", value: "all", icon: LayoutGrid },
  { label: "Konsier", value: "konsier", icon: Network },
  { label: "GHL", value: "ghl", icon: Building2 },
  { label: "n8n", value: "n8n", icon: Zap },
  { label: "AI", value: "ai", icon: Bot },
  { label: "Zapier", value: "zapier", icon: Repeat },
  { label: "Make.com", value: "make", icon: Settings },
];

const projects = [
  // ── Konsier / Velocity Capital Projects ──
  {
    title: "KS-WF6 — Daily Outbound Pipeline (Merged V1 POC + V2 Production)",
    icon: GitMerge,
    tags: ["n8n", "Apollo", "Claude AI", "Instantly", "Notion", "Pipedrive"],
    categories: ["konsier", "n8n", "ai"],
    description: "16-node production pipeline: Apollo lead scrape → ICP scoring → Notion dedup check → batch-50 Claude AGENT-01 email generation → Instantly delivery → Notion Lead Log → Slack alert. Merged V1 POC with V2 production logic for a clean, single-workflow outbound engine.",
    highlight: "16 nodes · Production",
    status: "live" as const,
    image: imgKsWf6,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "KS-WF2 — Retell AI Call Processing + AGENT-PQA",
    icon: Phone,
    tags: ["n8n", "Retell AI", "Claude AI", "Pipedrive", "Notion", "Slack"],
    categories: ["konsier", "n8n", "ai"],
    description: "Processes inbound/outbound Retell AI call events. Dual-branch: outbound calls → AGENT-03 qualification analysis → Pipedrive stage update → Notion call log. Inbound replies → AGENT-PQA (Prompt QA Agent) fires when red_flags detected, writes one Claude Haiku fix → Notion QA Queue for VA review.",
    highlight: "Published · Dual-branch",
    status: "live" as const,
    image: imgKsWf2,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "KS-A2 — AI Tier Routing Agent",
    icon: Network,
    tags: ["n8n", "Pipedrive", "Slack", "Claude AI"],
    categories: ["konsier", "n8n", "ai"],
    description: "11-node tier routing agent: webhook receives call volume data → Code node calculates tier score (daily_calls × 22) → IF node checks manual override → HTTP PATCH Pipedrive stage → HTTP POST Pipedrive note → Switch routes to 4 Slack branches (Starter / Professional / Enterprise / Not Qualified).",
    highlight: "11 nodes · Built",
    status: "live" as const,
    image: imgKsA2,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "KS-WF1 — Email Reply Handler",
    icon: Mail,
    tags: ["n8n", "Instantly", "Claude AI", "Pipedrive"],
    categories: ["konsier", "n8n", "ai"],
    description: "Published 6-branch reply handler: webhook receives Instantly reply events → Claude AGENT-02 (Reply Triage) classifies intent → Code parses JSON → Switch routes to Hot Lead (Pipedrive stage update), Objection, Question, Unsubscribe, Auto-Reply, or Needs Review branches.",
    highlight: "Published · 6-branch",
    status: "live" as const,
    image: imgKsWf1,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  // ── GHL / Earlier Projects ──
  {
    title: "GHL Pinas — Complete CRM & AI Automation System",
    icon: Building2,
    tags: ["GoHighLevel", "n8n", "Claude API", "Webhooks"],
    categories: ["ghl", "n8n", "ai"],
    description: "End-to-end GHL system with 5-stage sales pipeline, lead qualification quiz with automated scoring, lead nurture workflows, 3 membership products, and custom funnel landing page.",
    highlight: "100% automated pipeline",
    status: "live" as const,
    image: null as string | null,
    loomEmbed: "https://www.loom.com/embed/20af4ca4efb44248bdd88ad45953adbf",
    externalLink: null as string | null,
  },
  {
    title: "GHL Automation Workflow Suite",
    icon: Building2,
    tags: ["GoHighLevel", "Workflow Automation", "CRM", "Pipeline Management", "Tag-Based Triggers"],
    categories: ["ghl"],
    description: "Complete GHL automation suite: intelligent lead follow-up sequence, automated reply handler that stops follow-up on inbound replies, multi-stage pipeline management, and round-robin contact assignment. All workflows are tag-triggered, fully automated, and production-ready.",
    highlight: "Full automation suite",
    status: "live" as const,
    image: null as string | null,
    loomEmbed: "https://www.loom.com/embed/f13ba5175d4e47e99131d5230729119b",
    externalLink: null as string | null,
  },
  {
    title: "Funnel Design & GHL Integration",
    icon: Workflow,
    tags: ["Claude", "Retell AI", "n8n", "GHL CRM", "Vercel"],
    categories: ["ghl", "ai"],
    description: "Complete AI-powered sales funnel with embedded lead forms, quiz, membership tiers, and a live AI voice agent (Maya) powered by Retell AI. Integrated with GHL via n8n — voice calls are analyzed by Claude API and contacts are auto-created in GHL with HOT/COLD tags.",
    highlight: "AI-assisted design",
    status: "live" as const,
    image: null as string | null,
    loomEmbed: "https://www.loom.com/embed/3db7327ad1f4425ea84c096e13f77e73",
    externalLink: "https://ghl-pinas-masterclass-git-main-vnapigkit-1222s-projects.vercel.app/",
  },
  {
    title: "Facebook AI Chat Agent",
    icon: Bot,
    tags: ["n8n", "Facebook Messenger", "AI"],
    categories: ["n8n", "ai"],
    description: "AI-powered chat agent integrated with Facebook Messenger that automatically handles business inquiries.",
    highlight: "Automated support",
    status: "complete" as const,
    image: imgFBAgent,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "RAG Supabase Pipeline",
    icon: Database,
    tags: ["n8n", "Supabase", "Vector DB", "RAG"],
    categories: ["n8n", "ai"],
    description: "Retrieval-Augmented Generation pipeline using n8n and Supabase as the vector database.",
    highlight: "Context-aware AI",
    status: "complete" as const,
    image: imgRAGSupabase,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "Gmail Attachment Processor",
    icon: Mail,
    tags: ["n8n", "Google Drive", "AI"],
    categories: ["n8n", "ai"],
    description: "AI-powered workflow that detects, classifies, and routes email attachments to correct Google Drive folders.",
    highlight: "Smart routing",
    status: "complete" as const,
    image: imgN8nGmail,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "Customer Orders Processing",
    icon: BarChart3,
    tags: ["n8n", "AI Agent", "Google Sheets"],
    categories: ["n8n", "ai"],
    description: "Automation that receives orders, generates AI-powered summaries, and delivers structured reports.",
    highlight: "AI summaries",
    status: "complete" as const,
    image: imgCustomerOrders,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "Gmail Attachment Intelligence Routing",
    icon: Mail,
    tags: ["Make.com", "Google Gemini AI", "Google Drive"],
    categories: ["make", "ai"],
    description: "Make.com workflow using Google Gemini AI to intelligently classify and route Gmail attachments.",
    highlight: "AI classification",
    status: "complete" as const,
    image: imgGmailRouting,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "Automated Financial Export Pipeline",
    icon: BarChart3,
    tags: ["Make.com", "Xero", "Google Sheets", "Asana"],
    categories: ["make"],
    description: "Make.com scenario that extracts financial data from Xero and exports to Google Sheets and Asana.",
    highlight: "Scheduled exports",
    status: "complete" as const,
    image: imgFinancialExport,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "AI Content Repurposing",
    icon: FileText,
    tags: ["Zapier", "AI", "Multi-platform"],
    categories: ["zapier", "ai"],
    description: "Zapier workflow that converts single content pieces into multiple formats using AI.",
    highlight: "Multi-format output",
    status: "complete" as const,
    image: imgAIContent,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="inline-block text-primary text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full bg-primary/10">
            What I've Built
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Real working systems — every project here is live, tested, and production-ready.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f.value)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-secondary"
              }`}
            >
              {activeFilter === f.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <f.icon size={14} />
                {f.label}
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                layout
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, boxShadow: "0 16px 40px -12px hsl(var(--primary) / 0.15)" }}
                transition={{ type: "spring" }}
                className="group rounded-2xl bg-card border border-border relative overflow-hidden"
              >
                {project.loomEmbed && (
                  <div className="border-b border-border">
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                      <iframe
                        src={project.loomEmbed}
                        frameBorder="0"
                        allowFullScreen
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                )}

                {project.image && (
                  <div className="border-b border-border overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <project.icon size={18} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {project.highlight}
                      </span>
                      <motion.span
                        animate={project.status === "live" ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex items-center gap-1"
                      >
                        {project.status === "live" ? (
                          <Circle size={8} className="fill-primary text-primary" />
                        ) : (
                          <CheckCircle size={12} className="text-muted-foreground" />
                        )}
                      </motion.span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink size={14} />
                      View Live
                      <ArrowUpRight size={12} />
                    </a>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
