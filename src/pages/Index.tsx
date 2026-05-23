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
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
