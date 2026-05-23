import { motion } from "framer-motion";
import { Linkedin, Mail, ExternalLink, Heart, Code2 } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/vladimir-napigkit-82589074", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vladimirnapigkit@gmail.com", label: "Email" },
  { icon: ExternalLink, href: "#projects", label: "Portfolio" },
];

const Footer = () => (
  <footer className="border-t border-border py-10 px-6 bg-card">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">V</span>
        </div>
        <span className="text-foreground font-bold text-sm tracking-tight">Vladimir</span>
      </div>

      <div className="flex items-center gap-6">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative text-muted-foreground hover:text-primary transition-colors text-xs font-medium group"
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ type: "spring" }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <link.icon size={16} />
          </motion.a>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="text-muted-foreground text-xs flex items-center gap-1">
        © {new Date().getFullYear()} Vladimir Napigkit. Made with
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 2 }}
          className="inline-flex"
        >
          <Heart size={12} className="text-destructive fill-destructive" />
        </motion.span>
        and AI.
      </p>
      <p className="text-muted-foreground text-xs flex items-center gap-1">
        <Code2 size={12} />
        Built with React & Tailwind
      </p>
    </div>
  </footer>
);

export default Footer;
