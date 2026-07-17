import { useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const onLoaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <PageLoader onComplete={onLoaderComplete} />}
      <div className={`min-h-screen bg-background overflow-x-hidden scroll-smooth ${loaded ? "" : "opacity-0"}`}>
        <CustomCursor />
        <Navbar />
        <motion.div style={{ y: heroY }}>
          <Hero />
        </motion.div>
        <Services />
        <Tools />
        <Projects />
        <WorkExperience />
        <div className="relative overflow-hidden">
          {/* Single shared hologram video background spanning both sections */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          >
            <source src="/video/testimonials-hologram.mp4" type="video/mp4" />
          </video>
          <Testimonials />
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
