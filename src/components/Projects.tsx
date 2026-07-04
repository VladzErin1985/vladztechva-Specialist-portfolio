import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cyberpunkWorkstation from "@/assets/cyberpunk_workstation.jpeg";
import { ExternalLink, Bot, Workflow, Mail, Database, FileText, BarChart3, ArrowUpRight, Building2, Zap, LayoutGrid, Repeat, Settings, Circle, CheckCircle, Network, ZoomIn, X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useInView } from "react-intersection-observer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import imgAIContent from "@/assets/AI_Content_Repurposing.png";
import imgFinancialExport from "@/assets/make_Automated_Financial_Export_Pipeline.png";
import imgGmailRouting from "@/assets/make_Gmail_Attachment_Routing.png";
import imgN8nGmail from "@/assets/n8n_Gmail_Attachments.png";
import imgFBAgent from "@/assets/n8n_FB_AI_Agent.png";
import imgCustomerOrders from "@/assets/n8n_Customer_Orders.png";
import imgRAGSupabase from "@/assets/n8n_RAG_Supabase.png";
import imgJoeyPhase1 from "@/assets/joey_phase1.png";
import imgJoeyPhase2 from "@/assets/joey_phase2.png";

// Bulk-load every Konsier system screenshot — avoids 33 individual import lines
const konsierAssets = import.meta.glob("@/assets/konsier/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const ks = (slug: string): string => {
  const entry = Object.entries(konsierAssets).find(([path]) => path.endsWith(`/${slug}.png`));
  return entry ? entry[1] : "";
};

type KonsierItem = { slug: string; label: string; nodes: string; description: string };
type KonsierLane = { name: string; items: KonsierItem[] };

const konsierLanes: KonsierLane[] = [
  {
    name: "Core Infrastructure",
    items: [
      { slug: "ks-err", label: "KS-ERR — Error Handler", nodes: "4 nodes", description: "Catches every workflow failure system-wide and posts the details straight to Slack." },
      { slug: "ks-pd-events", label: "KS-PD-EVENTS — Pipedrive Webhook Receiver", nodes: "15 nodes", description: "The silent router — every Pipedrive stage change gets read here and sent to whichever workflow should handle it next." },
    ],
  },
  {
    name: "Entry Lanes — Lead Capture",
    items: [
      { slug: "ks-wf3", label: "KS-WF3 — Website Contact Form", nodes: "12 nodes", description: "A site form submission creates the Person + Deal in Pipedrive and alerts the team in Slack." },
      { slug: "ks-wf-cal", label: "KS-WF-CAL — Calendly → Pipedrive", nodes: "29 nodes", description: "A 4-branch booking router that handles demo, kickoff, check-in, and 30-day review calls differently." },
      { slug: "ks-wf6", label: "KS-WF6 — Daily Outbound Pipeline (Apollo)", nodes: "29 nodes", description: "Scrapes Apollo across 5 verticals nightly, scores each lead, drafts a Claude email, and sends it through Instantly." },
      { slug: "ks-wf1", label: "KS-WF1 — Email Reply Handler", nodes: "18 nodes", description: "Every Instantly reply gets classified by Claude and routed to one of 6 outcomes — hot lead, objection, unsubscribe, and more." },
      { slug: "ks-wf5", label: "KS-WF5 — LinkedIn Reply Handler", nodes: "11 nodes", description: "The same reply-classification pattern as WF1, applied to LinkedIn replies coming in through HeyReach." },
    ],
  },
  {
    name: "Qualification & Voice",
    items: [
      { slug: "ks-wf2", label: "KS-WF2 — Retell Voice Qualify", nodes: "31 nodes", description: "A Retell AI call event triggers the qualification agent, which updates Pipedrive and logs the call to Notion." },
      { slug: "ks-a2", label: "KS-A2 — Tier Routing", nodes: "11 nodes", description: "Turns call volume into a tier score, updates the deal's stage, and alerts the matching Slack channel." },
      { slug: "ks-wf20", label: "KS-WF20 — Speed-to-Lead Callback", nodes: "13 nodes", description: "Detects a missed inbound call and fires an automatic callback attempt right away." },
    ],
  },
  {
    name: "Closer Copilot Suite",
    items: [
      { slug: "ks-a4", label: "KS-A4 — Stalled Deal Alert", nodes: "6 nodes", description: "Flags any deal that's gone more than 7 days with no activity." },
      { slug: "ks-a4a", label: "KS-A4a — Pre-Call Brief", nodes: "12 nodes", description: "Builds a briefing document ahead of every strategy call so the closer walks in prepared." },
      { slug: "ks-a4b", label: "KS-A4b — Post-Call Summary", nodes: "11 nodes", description: "Auto-summarizes the call the moment it ends, no manual note-taking required." },
      { slug: "ks-a4c", label: "KS-A4c — Objection Mining", nodes: "9 nodes", description: "Surfaces recurring objection patterns across recent calls so the pitch keeps improving." },
    ],
  },
  {
    name: "Onboarding & Billing",
    items: [
      { slug: "ks-wf4", label: "KS-WF4 — Stripe → Onboarding Chain", nodes: "14 nodes", description: "A successful Stripe payment sets the billing cadence and kicks off the onboarding sequence." },
      { slug: "ks-wf4b", label: "KS-WF4B — Closed-Won Handoff", nodes: "9 nodes", description: "Continues the handoff from a closed-won deal straight into the onboarding intake." },
      { slug: "ks-a6", label: "KS-A6 — Onboarding Drafter", nodes: "7 nodes", description: "Drafts the client's onboarding document automatically from their intake data." },
      { slug: "ks-wf17", label: "KS-WF17 — Deliverability Monitor", nodes: "15 nodes", description: "Watches email sending health across every mailbox and flags deliverability risk early." },
      { slug: "ks-wf18", label: "KS-WF18 — Dunning Recovery", nodes: "34 nodes", description: "A cadence-aware failed-payment recovery sequence that escalates in stages instead of one blunt retry." },
    ],
  },
  {
    name: "Post-Call & Customer Ops",
    items: [
      { slug: "ks-wf7", label: "KS-WF7 — Customer Call QA", nodes: "12 nodes", description: "An AI agent reads every call transcript and flags red-flag calls for human review." },
      { slug: "ks-wf22", label: "KS-WF22 — Review Request SMS", nodes: "13 nodes", description: "Sends a review-request text automatically once service is completed." },
      { slug: "ks-a10", label: "KS-A10 — Review Response Drafter", nodes: "9 nodes", description: "Drafts a response to an incoming customer review, ready for a quick human approval." },
      { slug: "ks-a5", label: "KS-A5 — Hot Lead Trigger", nodes: "7 nodes", description: "Flags a lead as hot the instant it qualifies, so follow-up happens in real time, not the next day." },
    ],
  },
  {
    name: "Reporting & Ops",
    items: [
      { slug: "ks-a7", label: "KS-A7 — Bookkeeping Reconciler", nodes: "13 nodes", description: "Runs a weekly reconciliation between Stripe payments and QuickBooks records." },
      { slug: "ks-a8", label: "KS-A8 — Founder Brief Writer", nodes: "11 nodes", description: "Writes a weekly founder brief and delivers it straight to Notion and a Slack DM." },
      { slug: "ks-wf-usage", label: "KS-WF-USAGE — Call Usage Metering", nodes: "9 nodes", description: "Meters call usage against every client's plan for accurate billing." },
      { slug: "ks-wf-meter-reset", label: "KS-WF-METER-RESET — Monthly Reset", nodes: "6 nodes", description: "Resets usage counters at the start of every billing month." },
      { slug: "ks-agent-11", label: "KS-AGENT-11 — Expansion Spotter", nodes: "15 nodes", description: "Flags existing accounts that look ready for an upsell or expansion conversation." },
    ],
  },
  {
    name: "Growth & Reactivation",
    items: [
      { slug: "ks-wf21", label: "KS-WF21 — Reactivation Campaign", nodes: "19 nodes", description: "Drafts win-back SMS scripts for lapsed clients — gated behind a hard compliance approval step, no exceptions." },
      { slug: "ks-wf19", label: "KS-WF19 — SAM.gov Watch", nodes: "13 nodes", description: "Watches federal contract notices for GovCon-adjacent opportunities worth flagging." },
    ],
  },
];

const konsierTools: KonsierItem[] = [
  { slug: "tool-apollo", label: "Apollo.io — Lead Gen Geography", nodes: "Tool", description: "The ICP/geography targeting configuration that sources the 5-vertical outbound list." },
  { slug: "tool-notion", label: "Notion — Konsier Database", nodes: "Tool", description: "The Notion databases behind the QA queues, founder briefs, and onboarding docs." },
  { slug: "tool-pipedrive", label: "Pipedrive — Pipeline Stages", nodes: "Tool", description: "The pipeline and stage structure every workflow above reads from and writes back to." },
];

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
    title: "Konsier — AI Receptionist Agency System",
    icon: Network,
    tags: ["n8n", "Pipedrive", "Retell AI", "Claude AI", "Instantly", "HeyReach", "Notion", "Stripe"],
    categories: ["konsier", "n8n", "ai"],
    description: "A full AI-receptionist agency backend, built end to end: 30 production workflows across 8 functional lanes — lead capture, AI voice qualification, a sales closer-copilot suite, onboarding/billing, customer QA, and reactivation — running on 9 Claude agents and 3 Retell voice agents against one Pipedrive CRM.",
    highlight: "30 workflows · 8 systems",
    status: "live" as const,
    image: ks("ks-wf6"),
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
  const [systemDialogOpen, setSystemDialogOpen] = useState(false);
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
      {/* Only for the regular card grid — inside the breakdown dialog, zooming uses
          the in-dialog overlay below instead, since a full-viewport sibling overlay
          gets treated as an "outside click" by Radix and fights with the dialog. */}
      {lightbox && !systemDialogOpen && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      <Dialog open={systemDialogOpen} onOpenChange={setSystemDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto relative">
          {/* In-dialog zoom overlay — a real DOM descendant of DialogContent, so
              Radix treats every click on it (including Close) as "inside" the
              dialog. Positioned absolute to fill the dialog's own box rather than
              the full viewport, since DialogContent's transform breaks position:fixed
              children anyway. */}
          {lightbox && systemDialogOpen && (
            <div
              className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm rounded-lg"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
              >
                <X size={18} /> Close
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <DialogHeader>
            <DialogTitle>Konsier — Full System Breakdown</DialogTitle>
            <DialogDescription>
              30 workflows across 8 functional lanes, in the order a lead actually moves through them. Click any screenshot to zoom.
            </DialogDescription>
          </DialogHeader>

          <Accordion type="single" collapsible defaultValue="lane-0" className="w-full">
            {konsierLanes.map((lane, i) => (
              <AccordionItem key={lane.name} value={`lane-${i}`}>
                <AccordionTrigger className="text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {lane.name}
                    <span className="text-xs text-muted-foreground font-normal">({lane.items.length})</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {lane.items.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => setLightbox({ src: ks(item.slug), alt: item.label })}
                        className="group text-left rounded-lg border border-border overflow-hidden hover:border-primary/60 transition-colors cursor-zoom-in"
                      >
                        <div className="relative overflow-hidden bg-secondary/40">
                          <img
                            src={ks(item.slug)}
                            alt={item.label}
                            loading="lazy"
                            className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-medium text-foreground leading-snug">{item.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{item.nodes}</p>
                          <p className="text-[11px] text-muted-foreground/80 mt-1.5 leading-snug">{item.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            <AccordionItem value="tools">
              <AccordionTrigger className="text-sm">
                <span className="flex items-center gap-2">
                  <Settings size={13} className="text-primary" />
                  Supporting Tools
                  <span className="text-xs text-muted-foreground font-normal">({konsierTools.length})</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {konsierTools.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => setLightbox({ src: ks(item.slug), alt: item.label })}
                      className="group text-left rounded-lg border border-border overflow-hidden hover:border-primary/60 transition-colors cursor-zoom-in"
                    >
                      <div className="relative overflow-hidden bg-secondary/40">
                        <img
                          src={ks(item.slug)}
                          alt={item.label}
                          loading="lazy"
                          className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-medium text-foreground leading-snug">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground/80 mt-1.5 leading-snug">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

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
          <div className="relative px-16 md:px-20">

            {/* Prev arrow — left edge */}
            <motion.button
              whileHover={{ scale: 1.12, backgroundColor: "hsl(191 100% 42% / 0.15)" }}
              whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              disabled={page === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center neon-border glass-card transition-all ${
                page === 0 ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:border-primary/70"
              }`}
            >
              <ChevronLeft size={22} className="text-primary" />
            </motion.button>

            {/* Next arrow — right edge */}
            <motion.button
              whileHover={{ scale: 1.12, backgroundColor: "hsl(191 100% 42% / 0.15)" }}
              whileTap={{ scale: 0.9 }}
              onClick={goNext}
              disabled={page >= totalPages - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center neon-border glass-card transition-all ${
                page >= totalPages - 1 ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:border-primary/70"
              }`}
            >
              <ChevronRight size={22} className="text-primary" />
            </motion.button>

            {/* Sliding card area — drag/swipe enabled */}
            <motion.div
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -50) goNext();
                else if (info.offset.x > 50) goPrev();
              }}
            >
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
                  {visibleCards.map((project) => {
                    const isKonsierSystem = project.title === "Konsier — AI Receptionist Agency System";
                    return (
                    <motion.div
                      key={project.title}
                      whileHover={{ y: -6, boxShadow: "0 16px 40px -12px hsl(var(--primary) / 0.18)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`group rounded-2xl glass-card relative overflow-hidden ${isKonsierSystem ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" : ""}`}
                      {...(isKonsierSystem ? {
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Open Konsier full system breakdown",
                        onClick: () => setSystemDialogOpen(true),
                        onKeyDown: (e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSystemDialogOpen(true);
                          }
                        },
                      } : {})}
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
                          onClick={(e) => {
                            if (isKonsierSystem) {
                              e.stopPropagation();
                              setSystemDialogOpen(true);
                            } else {
                              setLightbox({ src: project.image as string, alt: project.title });
                            }
                          }}
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

                        {isKonsierSystem && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSystemDialogOpen(true); }}
                            className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-primary hover:underline"
                          >
                            <Layers size={14} />
                            View Full System Breakdown
                            <ArrowUpRight size={12} />
                          </button>
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
                  );})}
                </motion.div>
              </AnimatePresence>
            </motion.div>

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
