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
        {/* Services + Tools share a giant robot background */}
        <div className="relative overflow-hidden">
          <img
            src={robotHolographic}
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none hidden lg:block"
            style={{
              right: "-2%",
              top: "50%",
              transform: "translateY(-50%)",
              height: "92%",
              width: "auto",
              zIndex: 0,
              opacity: 0.11,
              filter: "brightness(1.7) saturate(1.6) contrast(0.88)",
              maskImage: "radial-gradient(ellipse 62% 72% at 48% 50%, black 18%, rgba(0,0,0,0.55) 52%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 62% 72% at 48% 50%, black 18%, rgba(0,0,0,0.55) 52%, transparent 80%)",
            }}
          />
          <Services />
          <Tools />
        </div>
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
