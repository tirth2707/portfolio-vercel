import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Hero from "./components/sections/Hero";
import ImpactStrip from "./components/sections/ImpactStrip";
import AudiencePanel from "./components/sections/AudiencePanel";
import About from "./components/sections/About";

const Experience = lazy(() => import("./components/sections/Experience"));
const ArchitectureLab = lazy(() => import("./components/sections/ArchitectureLab"));
const ArchitectureSimulator = lazy(() => import("./components/sections/ArchitectureSimulator"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Skills = lazy(() => import("./components/sections/Skills"));
const PortfolioAssistant = lazy(() => import("./components/sections/PortfolioAssistant"));
const ResearchHighlight = lazy(() => import("./components/sections/ResearchHighlight"));
const Education = lazy(() => import("./components/sections/Education"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Blog = lazy(() => import("./components/sections/Blog"));
const Certifications = lazy(() => import("./components/sections/Certifications"));
const BlogDetail = lazy(() => import("./components/sections/BlogDetail"));
const BeyondTech = lazy(() => import("./components/pages/BeyondTech"));

const SectionFallback = () => (
  <div className="min-h-32 border-y border-white/10 bg-slate-950" aria-hidden="true" />
);

function App() {
  useEffect(() => {
    // Analytics: Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Portfolio Home",
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <div className="min-h-screen" id="home-hero">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <ImpactStrip />
              <AudiencePanel />
              <About />
              <Suspense fallback={<SectionFallback />}>
                <ArchitectureLab />
                <ArchitectureSimulator />
                <Skills />
                <Projects />
                <ResearchHighlight />
                <PortfolioAssistant />
                <Experience />
                <Certifications />
                <Education />
                <Blog />
                <Contact />
              </Suspense>
            </div>
          }
        />

        <Route
          path="/blog"
          element={
            <Suspense fallback={<SectionFallback />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={<SectionFallback />}>
              <BlogDetail />
            </Suspense>
          }
        />
        <Route
          path="/beyond-tech"
          element={
            <Suspense fallback={<SectionFallback />}>
              <BeyondTech />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
