import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cyberpunkWorkstation from "@/assets/cyberpunk_workstation.jpeg";
import { ExternalLink, Bot, Workflow, Mail, Database, FileText, BarChart3, ArrowUpRight, Building2, Zap, LayoutGrid, Repeat, Settings, Circle, CheckCircle, GitMerge, Phone, Network, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
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
import imgJoeyPhase1 from "@/assets/joey_phase1.png";
import imgJoeyPhase2 from "@/assets/joey_phase2.png";

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
    description: "Processes inbound/outbound Retell AI call events. Dual-branch: outbound calls → AGENT-03 qualification analysis → Pipedrive stage update → Notion call log. Inbound replies → AGENT-PQA fires when red_flags detected, writes Claude Haiku fix → Notion QA Queue.",
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
    description: "11-node tier routing agent: webhook receives call volume data → Code node calculates tier score → IF node checks manual override → HTTP PATCH Pipedrive stage → Switch routes to 4 Slack branches (Starter / Professional / Enterprise / Not Qualified).",
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
    description: "Published 6-branch reply handler: webhook receives Instantly reply events → Claude AGENT-02 classifies intent → Switch routes to Hot Lead, Objection, Question, Unsubscribe, Auto-Reply, or Needs Review branches.",
    highlight: "Published · 6-branch",
    status: "live" as const,
    image: imgKsWf1,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "AI Lead Gen System Phase 1 — RAG Pinecone Knowledge Base",
    icon: Database,
    tags: ["n8n", "Google Drive", "Pinecone", "OpenAI", "RAG"],
    categories: ["n8n", "ai"],
    description: "Fully automated RAG ingestion pipeline for Joey Elaty (Real Estate): Google Drive trigger → SOP auto-ingestion → text chunking → OpenAI embeddings → Pinecone vector store. Covers 4 companies with zero manual uploads — every new SOP document is auto-indexed.",
    highlight: "Automated RAG pipeline",
    status: "complete" as const,
    image: imgJoeyPhase1,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
  {
    title: "AI Lead Gen System Phase 2 — Autonomous AI Agent",
    icon: Bot,
    tags: ["n8n", "Claude API", "Pinecone", "Google Sheets", "GHL CRM"],
    categories: ["n8n", "ai"],
    description: "Autonomous AI agent built on Phase 1 RAG knowledge base: Claude queries Pinecone for company context → reads live Google Sheets leads → generates personalized outreach → updates GHL CRM contacts via API. Zero human intervention — lead data flows through to CRM automatically.",
    highlight: "Zero-touch lead system",
    status: "complete" as const,
    image: imgJoeyPhase2,
    loomEmbed: null as string | null,
    externalLink: null as string | null,
  },
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
    description: "Complete GHL automation suite: intelligent lead follow-up sequence, automated reply handler that stops follow-up on inbound replies, multi-stage pipeline management, and round-robin contact assignment.",
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
    description: "Complete AI-powered sales funnel with embedded lead forms, quiz, membership tiers, and a live AI voice agent (Maya) powered by Retell AI. Integrated with GHL via n8n — voice calls analyzed by Claude API, contacts auto-created with HOT/COLD tags.",
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

const CARDS_PER_PAGE = 2;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.32, ease: "easeIn" },
  }),
};

const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          <X size={18} /> Close
        </button>
        <img src={src} alt={alt} className="w-full h-auto rounded-2xl shadow-2xl border border-white/10" />
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter));

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const visibleCards = filtered.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  // Reset to first page when filter changes
  useEffect(() => {
    setPage(0);
    setDir(1);
  }, [activeFilter]);

  const goNext = () => {
    if (page < totalPages - 1) { setDir(1); setPage(p => p + 1); }
  };
  const goPrev = () => {
    if (page > 0) { setDir(-1); setPage(p => p - 1); }
  };
  const goToPage = (i: number) => {
    setDir(i > page ? 1 : -1);
    setPage(i);
  };

  return (
    <>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      <section id="projects" className="section-padding relative overflow-hidden" ref={ref}>
        {/* Cyberpunk workstation — full-section background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={cyberpunkWorkstation}
            alt="" aria-hidden="true"
            className="absolute w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center top", opacity: 1 }}
          />
          {/* Dark overlay so cards stay readable — heavy center fade */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, hsl(222 47% 4% / 0.82) 30%, hsl(222 47% 4% / 0.65) 60%, hsl(222 47% 4% / 0.45) 100%)",
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
            width: "12%",
            background: "linear-gradient(to right, hsl(222 47% 4%), transparent)",
          }} />
          <div className="absolute inset-y-0 right-0" style={{
            width: "12%",
            background: "linear-gradient(to left, hsl(222 47% 4%), transparent)",
          }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
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

          {/* ── CAROUSEL ── */}
          <div className="relative">

            {/* Prev arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              disabled={page === 0}
              className={`absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center neon-border glass-card transition-all ${
                page === 0 ? "opacity-25 cursor-not-allowed" : "hover:bg-primary/20 hover:border-primary/60"
              }`}
            >
              <ChevronLeft size={20} className="text-primary" />
            </motion.button>

            {/* Next arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goNext}
              disabled={page >= totalPages - 1}
              className={`absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center neon-border glass-card transition-all ${
                page >= totalPages - 1 ? "opacity-25 cursor-not-allowed" : "hover:bg-primary/20 hover:border-primary/60"
              }`}
            >
              <ChevronRight size={20} className="text-primary" />
            </motion.button>

            {/* Sliding card area */}
            <div className="overflow-hidden px-1">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={`${activeFilter}-${page}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate={inView ? "center" : "enter"}
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {visibleCards.map((project) => (
                    <motion.div
                      key={project.title}
                      whileHover={{ y: -6, boxShadow: "0 16px 40px -12px hsl(var(--primary) / 0.18)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group rounded-2xl glass-card relative overflow-hidden"
                    >
                      {/* Loom embed */}
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

                      {/* Screenshot image with zoom */}
                      {project.image && (
                        <div
                          className="border-b border-border overflow-hidden relative cursor-zoom-in"
                          onClick={() => setLightbox({ src: project.image as string, alt: project.title })}
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                          </div>
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

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators + page counter */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 mt-8">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === page
                          ? "w-6 h-2 bg-primary"
                          : "w-2 h-2 bg-border hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs font-mono">
                  {page + 1} / {totalPages} — {filtered.length} projects
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
