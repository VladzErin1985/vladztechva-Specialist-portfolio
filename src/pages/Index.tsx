import { useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import robotHolographic from "@/assets/robot_holographic.jpeg";
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

        {/* ── ROBOT DIVIDER — full-visible image between Services and Tools ── */}
        <div className="relative overflow-hidden" style={{ height: "85vh" }}>
          <img
            src={robotHolographic}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: "center 20%" }}
          />
          {/* Fade top into Services */}
          <div className="absolute inset-x-0 top-0 z-10" style={{
            height: "30%",
            background: "linear-gradient(to bottom, hsl(222 47% 4%) 0%, hsl(222 47% 4% / 0.7) 40%, transparent 100%)",
          }} />
          {/* Fade bottom into Tools */}
          <div className="absolute inset-x-0 bottom-0 z-10" style={{
            height: "30%",
            background: "linear-gradient(to top, hsl(222 47% 4%) 0%, hsl(222 47% 4% / 0.7) 40%, transparent 100%)",
          }} />
          {/* Fade left edge */}
          <div className="absolute inset-y-0 left-0 z-10" style={{
            width: "12%",
            background: "linear-gradient(to right, hsl(222 47% 4%), transparent)",
          }} />
          {/* Fade right edge */}
          <div className="absolute inset-y-0 right-0 z-10" style={{
            width: "12%",
            background: "linear-gradient(to left, hsl(222 47% 4%), transparent)",
          }} />
        </div>

        <Tools />
        <Projects />
        <WorkExperience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
