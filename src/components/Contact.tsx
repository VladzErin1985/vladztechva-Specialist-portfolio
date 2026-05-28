import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import contactBg from "@/assets/contact_bg.jpg";

const contactItems = [
  { icon: Mail, label: "Email", value: "vladimirnapigkit@gmail.com", href: "mailto:vladimirnapigkit@gmail.com" },
  { icon: Phone, label: "Phone", value: "+63 965 034 9713", href: "tel:+639650349713" },
  { icon: MapPin, label: "Location", value: "Zamboanga City, PH", href: "#" },
  { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: "https://linkedin.com/in/vladimir-napigkit-82589074" },
];

const FloatingLabelInput = ({ label, type = "text", name, textarea = false }: { label: string; type?: string; name: string; textarea?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isActive = focused || hasValue;
  const Component = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isActive ? -24 : 0,
          scale: isActive ? 0.85 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 text-sm pointer-events-none origin-left"
        style={{ color: "rgba(0,240,255,0.8)", textShadow: "0 0 8px rgba(0,240,255,0.4)" }}
      >
        {label}
      </motion.label>
      <Component
        ref={inputRef as any}
        type={type}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e: any) => setHasValue(e.target.value.length > 0)}
        style={{
          background: "rgba(8, 18, 32, 0.75)",
          border: "1px solid rgba(0,240,255,0.25)",
          color: "#e8f4ff",
          backdropFilter: "blur(8px)",
        }}
        className={`w-full px-4 pt-3.5 pb-3 rounded-xl text-sm outline-none transition-all placeholder:text-transparent ${
          textarea ? "min-h-[120px] resize-none" : ""
        }`}
        rows={textarea ? 4 : undefined}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full origin-left"
      />
    </div>
  );
};

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>

      {/* YouTube video background — Blue Technology Loop, no copyright */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Oversized iframe to cover all aspect ratios */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "120vh",
          minWidth: "120%",
          minHeight: "120%",
        }}>
          <iframe
            src="https://www.youtube.com/embed/NfiJwKpxH6s?autoplay=1&mute=1&loop=1&playlist=NfiJwKpxH6s&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            allow="autoplay; encrypted-media"
            title="bg-video"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              opacity: 0.55,
            }}
          />
        </div>
        {/* Dark overlay to blend and keep text readable */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 90% at 50% 45%, hsl(220 60% 5% / 0.50) 10%, hsl(220 60% 4% / 0.65) 55%, hsl(222 47% 4% / 0.90) 100%)",
        }} />
        <div className="absolute inset-x-0 top-0" style={{ height: "15%", background: "linear-gradient(to bottom, hsl(222 47% 4%), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: "15%", background: "linear-gradient(to top, hsl(222 47% 4%), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 rounded-full" style={{ color: "#00f0ff", background: "rgba(0,240,255,0.12)", border: "1px solid rgba(0,240,255,0.3)", textShadow: "0 0 10px rgba(0,240,255,0.6)" }}>
            Let's Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,240,255,0.15)" }}>
            Ready to <span style={{ color: "#00f0ff", textShadow: "0 0 20px rgba(0,240,255,0.5)" }}>Automate</span>?
          </h2>
          <p className="text-base" style={{ color: "rgba(200,230,255,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>
            Available for freelance projects, VA roles, GHL specialist roles, AI automation consulting, and long-term retainer arrangements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact items */}
          <div className="space-y-4">
            {contactItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -5, scale: 1.01, boxShadow: "0 14px 40px hsl(191 100% 42% / 0.18), 0 0 0 1px hsl(191 100% 42% / 0.5)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 22 }}
                className="flex items-center gap-4 p-4 rounded-2xl group"
                style={{ background: "rgba(8,18,32,0.65)", border: "1px solid rgba(0,240,255,0.2)", backdropFilter: "blur(10px)" }}
              >
                <motion.div
                  whileInView={{ y: [0, -10, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300"
                >
                  <item.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </motion.div>
                <div>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(0,240,255,0.7)" }}>{item.label}</span>
                  <p className="text-sm font-medium" style={{ color: "#e8f4ff", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <FloatingLabelInput label="Your Name" name="name" />
            <FloatingLabelInput label="Your Email" type="email" name="email" />
            <FloatingLabelInput label="Your Message" name="message" textarea />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-primary group"
            >
              Send Message
              <motion.span
                className="inline-block"
                whileHover={{ x: 4, rotate: -15 }}
                transition={{ type: "spring" }}
              >
                <Send size={16} />
              </motion.span>
            </motion.button>
          </motion.form>
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{ background: "rgba(8,18,32,0.70)", border: "1px solid rgba(0,240,255,0.2)", backdropFilter: "blur(10px)" }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>Let's build something amazing together</h3>
          <p className="text-sm mb-6" style={{ color: "rgba(200,230,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>Ready to automate your business? Let's chat.</p>
          <motion.a
            href="https://linkedin.com/in/vladimir-napigkit-82589074"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-primary"
          >
            <Linkedin size={18} />
            Connect on LinkedIn
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
