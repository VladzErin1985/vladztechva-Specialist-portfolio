import { useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import robotHolographic from "@/assets/robot_holographic.jpeg";
import robotLaptop from "@/assets/robot_laptop.jpeg";
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

        {/* ── ROBOT DIVIDER — two robots side by side, 100% visible ── */}
        <div className="relative overflow-hidden" style={{ height: "92vh" }}>

          {/* LEFT — holographic robot (Ai applications) */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <img
              src={robotHolographic}
              alt="" aria-hidden="true"
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: "30% 20%" }}
            />
            {/* Seam fade toward center */}
            <div className="absolute inset-y-0 right-0 w-2/5" style={{
              background: "linear-gradient(to right, transparent, hsl(222 47% 4%))",
            }} />
          </div>

          {/* RIGHT — laptop robot (dark background, full body) */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <img
              src={robotLaptop}
              alt="" aria-hidden="true"
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: "40% center" }}
            />
            {/* Seam fade toward center */}
            <div className="absolute inset-y-0 left-0 w-2/5" style={{
              background: "linear-gradient(to left, transparent, hsl(222 47% 4%))",
            }} />
          </div>

          {/* Top fade — blends with Services */}
          <div className="absolute inset-x-0 top-0 z-10" style={{
            height: "28%",
            background: "linear-gradient(to bottom, hsl(222 47% 4%) 0%, hsl(222 47% 4% / 0.6) 50%, transparent 100%)",
          }} />
          {/* Bottom fade — blends with Tools */}
          <div className="absolute inset-x-0 bottom-0 z-10" style={{
            height: "28%",
            background: "linear-gradient(to top, hsl(222 47% 4%) 0%, hsl(222 47% 4% / 0.6) 50%, transparent 100%)",
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
