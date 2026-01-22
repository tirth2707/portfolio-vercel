import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import Certifications from './components/sections/Certifications';
import BlogDetail from './components/sections/BlogDetail';

function App() {
  useEffect(() => {
    // Analytics: Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Portfolio Home',
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <div className="min-h-screen" id="home">
      <Header />
      <Routes>
        <Route path="/" element={
          <div>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Certifications />
            <Skills />
            <Education />
            <Blog />
            <Contact />
          </div>
        } />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
