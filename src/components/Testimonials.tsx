import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { useInView } from "react-intersection-observer";

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
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors group relative"
    >
      {/* Quote icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 right-4"
      >
        <Quote size={32} className="text-primary-foreground" />
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
            <Star size={14} className="fill-primary-foreground text-primary-foreground" />
          </motion.span>
        ))}
      </div>

      <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-dashed border-primary-foreground/30"
          />
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center relative">
            <span className="text-primary-foreground font-bold text-sm">{t.initials}</span>
          </div>
        </div>
        <div>
          <p className="text-primary-foreground font-semibold text-sm">{t.name}</p>
          <p className="text-primary-foreground/60 text-xs">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="testimonials" className="section-padding relative bg-primary text-primary-foreground overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative">
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
