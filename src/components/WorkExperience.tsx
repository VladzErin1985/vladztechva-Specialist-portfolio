import { useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Rocket, Briefcase, Monitor, Network, Shield, Users, ChevronLeft, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "AI Automation Architect",
    company: "Shield Point Risk Advisors, LLC",
    period: "July 2026 – Present",
    location: "Missouri, USA · Remote",
    icon: Shield,
    highlights: [
      "Architecting AI-driven automation on top of Momentum AMS (NowCerts) and its native Automation Center (MAC) for a full-service independent insurance agency",
      "Built a full 30-day new-client onboarding sequence (11 trigger-driven touchpoints) and an Annual Review cross-sell workflow, both firing directly off policy and CRM stage changes",
      "Extended the platform's own no-code builder past its native limits by engineering custom fields and record tagging directly through its REST API",
      "Diagnosed a live automation that had run error-free for weeks while its real logic silently never executed, then fixed and proved it end-to-end against real data",
    ],
    current: true,
  },
  {
    role: "AI Automation Architect",
    company: "Velocity Capital LLC · Konsier.AI",
    period: "May 2026 – Present",
    location: "San Diego, CA · Remote",
    icon: Network,
    highlights: [
      "Architecting a full AI receptionist agency system from greenfield: 30+ n8n workflows, 10 Claude AI agents, and 3 Pipedrive pipelines (OUTBOUND, INBOUND, CUSTOMER LIFECYCLE)",
      "Built KS-WF6 Daily Outbound Pipeline — Apollo lead scrape → ICP scoring → Notion dedup → batch-50 Claude email generation → Instantly delivery, fully automated end-to-end",
      "Integrated Retell AI voice qualification with real-time call_analyzed webhooks — KS-A2 Tier Routing agent auto-stages deals and fires Slack alerts across 3 pipelines",
      "Owns all AI agent development (Claude API, structured JSON output), Pipedrive CRM engineering, and team architecture — builder and future trainer of 2 operations VAs",
    ],
    current: true,
  },
  {
    role: "AI Automation Specialist / GHL Specialist",
    company: "OutsourceAid (Agency)",
    period: "May 2026 – Present",
    location: "Remote · Multiple US Clients",
    icon: Users,
    highlights: [
      "Part-time GHL contractor placed through OutsourceAid's staffing model — matched to individual client projects across different industries rather than one single employer",
      "Finding Nirvana Wellness (wellness/biohacking studio, Venice FL): built a 5-tier credit-balance booking enforcement system spanning 22 services, fixed equipment double-booking conflicts, and resolved a shared-staff cross-calendar bug by scripting 21 calendars onto dedicated profiles via the GHL API",
      "Movement Clinic / Haven Wellness (peptide clinic B2B lead-gen funnel): built the full quiz-based lead capture, tagged SMS/email nurture sequence, and booked-call confirmation flow end-to-end in GHL",
    ],
    current: true,
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-exp-card]");
    const step = card ? card.offsetWidth + 32 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* AI hologram video — smaller, left-side, vertically centered, faded into content */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          src="/video/experience-hologram.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute w-full h-full"
          style={{ left: 0, top: 0, objectFit: "cover", objectPosition: "50% top" }}
        />
        {/* Lightened wash — keeps the hologram screen visible while timeline cards stay readable */}
        <div className="absolute inset-0" style={{ background: "hsl(222 47% 4% / 0.4)" }} />
        <div className="absolute inset-y-0 left-0" style={{
          width: "10%",
          background: "linear-gradient(to right, hsl(222 47% 4%), transparent)",
        }} />
        <div className="absolute inset-y-0 right-0" style={{
          width: "10%",
          background: "linear-gradient(to left, hsl(222 47% 4%), transparent)",
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
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="inline-block text-primary text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full bg-primary/10">
            Where I've Been
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm">Drag, scroll, or use the arrows to explore the timeline →</p>
        </motion.div>

        <div className="relative">
          {/* Nav arrows — hidden on touch devices, native swipe handles it there */}
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous experience"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next experience"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto pb-10 pt-6 px-1 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                data-exp-card
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                className="relative shrink-0 snap-center w-[85vw] sm:w-[380px]"
              >
                {/* Timeline dot + connecting line, horizontal */}
                <div className="flex items-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="relative shrink-0"
                  >
                    {exp.current ? (
                      <>
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <motion.div
                          animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 w-3 h-3 rounded-full border border-primary"
                        />
                      </>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-primary/40" />
                    )}
                  </motion.div>
                  {i < experiences.length - 1 && (
                    <div className="h-px flex-1 bg-border ml-2" />
                  )}
                </div>

                <motion.div
                  whileHover={{ y: -6, scale: 1.01, boxShadow: "0 16px 48px hsl(191 100% 42% / 0.20), 0 0 0 1px hsl(191 100% 42% / 0.5)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="p-5 rounded-2xl glass-card card-3d group h-full"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl glass-card card-3d max-w-xl mx-auto flex items-center gap-5"
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
