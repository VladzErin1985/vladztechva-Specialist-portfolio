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

        {/* ── ROBOT DIVIDER — sits at the boundary between Services and Tools ── */}
        <div className="relative hidden lg:block" style={{ height: 0, zIndex: 1 }}>
          <img
            src={robotHolographic}
            alt=""
            aria-hidden="true"
            className="pointer-events-none"
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              transform: "translate(-50%, -50%)",
              height: "75vh",
              width: "auto",
              opacity: 0.22,
              filter: "brightness(2.0) saturate(1.8) contrast(0.85)",
              maskImage: "radial-gradient(ellipse 68% 78% at 50% 50%, black 22%, rgba(0,0,0,0.6) 55%, transparent 82%)",
              WebkitMaskImage: "radial-gradient(ellipse 68% 78% at 50% 50%, black 22%, rgba(0,0,0,0.6) 55%, transparent 82%)",
            }}
          />
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
