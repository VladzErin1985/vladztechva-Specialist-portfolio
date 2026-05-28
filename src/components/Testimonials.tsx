import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { useInView } from "react-intersection-observer";
import clientBg from "@/assets/client_testimonials_bg.jpeg";

const testimonials = [
  {
    quote: "Vladimir built our entire GHL automation system from scratch. The AI-powered email sequences he set up have saved us hours of manual work every week. Highly recommended!",
    name: "Alex M.",
    initials: "AM",
    role: "Agency Owner",
    rating: 5,
  },
  {
    quote: "His n8n workflows are incredibly well thought-out. The Facebook AI agent he built handles 80% of our inquiries automatically. A true automation specialist.",
    name: "Sarah K.",
    initials: "SK",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "What impressed me most was his attention to detail. Every system he builds comes with documentation and is thoroughly tested. A reliable partner for any automation project.",
    name: "James R.",
    initials: "JR",
    role: "Business Consultant",
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(10);
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
        background: "rgba(10, 28, 35, 0.35)",
        boxShadow: "0 4px 32px -4px rgba(0,0,0,0.7), inset 0 1px 0 rgba(0,240,255,0.08)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,240,255,0.18)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 rounded-2xl hover:border-cyan-400/40 transition-colors group relative"
    >
      {/* Quote icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 right-4"
      >
        <Quote size={32} style={{ color: "rgba(0,240,255,0.6)" }} />
      </motion.div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(t.rating)].map((_, j) => (
          <motion.span
            key={j}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 500, delay: index * 0.12 + j * 0.1 }}
          >
            <Star size={14} style={{ fill: "#fbbf24", color: "#fbbf24", filter: "drop-shadow(0 0 4px rgba(251,191,36,0.6))" }} />
          </motion.span>
        ))}
      </div>

      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(220,245,255,0.95)", textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)" }}>
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-dashed border-cyan-400/40"
          />
          <div className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: "rgba(0,240,255,0.15)", border: "1px solid rgba(0,240,255,0.3)" }}>
            <span className="font-bold text-sm" style={{ color: "#00f0ff", textShadow: "0 0 8px rgba(0,240,255,0.8)" }}>{t.initials}</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "#ffffff", textShadow: "0 1px 6px rgba(0,0,0,1)" }}>{t.name}</p>
          <p className="text-xs" style={{ color: "rgba(0,240,255,0.75)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="testimonials" className="section-padding relative text-primary-foreground overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={clientBg}
          alt=""
          aria-hidden="true"
          className="absolute w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        {/* Teal-to-dark overlay blending with image palette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, hsl(186 60% 6% / 0.72) 20%, hsl(186 60% 6% / 0.85) 65%, hsl(186 60% 6% / 0.95) 100%)",
        }} />
        <div className="absolute inset-x-0 top-0" style={{ height: "18%", background: "linear-gradient(to bottom, hsl(222 47% 4%), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: "18%", background: "linear-gradient(to top, hsl(222 47% 4%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-primary-foreground/80 text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
            What They Say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Client Testimonials
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
