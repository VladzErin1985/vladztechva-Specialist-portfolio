import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Rocket, Briefcase, Monitor, Circle, CheckCircle } from "lucide-react";

const experiences = [
  {
    role: "AI Automation & Technical VA Specialist",
    company: "Freelance / Self-Directed",
    period: "2025 – Present",
    location: "Philippines",
    icon: Rocket,
    highlights: [
      "Built and deployed full GHL CRM systems including pipelines, funnels, quiz builders, and membership sites",
      "Integrated Claude API and ChatGPT into n8n automation workflows via HTTP requests and webhooks",
      "Practiced prompt engineering for Claude Code, ChatGPT, and Grok",
    ],
    current: true,
  },
  {
    role: "Sales Specialist",
    company: "Samsung",
    period: "Sept 2014 – Jun 2019",
    location: "Kuwait",
    icon: Briefcase,
    highlights: [
      "Achieved 100% of monthly sales targets and perfect product knowledge scores",
      "Conducted market research and competitor product analysis",
      "Managed sales and stock reporting using Excel",
    ],
  },
  {
    role: "Sales Representative",
    company: "Sony",
    period: "Oct 2011 – Jul 2014",
    location: "Kuwait",
    icon: Monitor,
    highlights: [
      "Promoted VAIO laptops and provided on-site technical support",
      "Created Sales, Competitor, and Inventory Reports using Microsoft Excel",
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
    <section id="experience" className="section-padding relative">
      <div className="max-w-7xl mx-auto relative">
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

              <div className="ml-14 md:ml-0 md:w-1/2 p-5 rounded-2xl bg-card border border-border card-3d group">
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
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl bg-card border border-border card-3d max-w-xl mx-auto flex items-center gap-5"
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
