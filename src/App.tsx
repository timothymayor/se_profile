import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import AiAssistant from './components/AiAssistant';
import ServicesGrid from './components/ServicesGrid';
import CaseStudies from './components/CaseStudies';
import SkillsStack from './components/SkillsStack';
import BlogInsights from './components/BlogInsights';
import Testimonials from './components/Testimonials';
import ContactBooking from './components/ContactBooking';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const cached = localStorage.getItem('alex_portfolio_theme');
    return cached ? cached === 'dark' : true; // Default to premium dark-first!
  });

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (darkMode) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
    localStorage.setItem('alex_portfolio_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Smooth scroll handler across sections
  const handleScrollToSection = (sectionId: string) => {
    const selectorMap: { [key: string]: string } = {
      'cases': 'cases',
      'services': 'services',
      'ai-agent': 'ai-agent',
      'skills': 'skills',
      'insights': 'insights',
      'testimonials': 'testimonials',
      'booking': 'booking',
      'about': 'about'
    };

    const targetId = selectorMap[sectionId] || sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-350 ${
      darkMode 
        ? 'bg-[#121214] text-[#E4E4E7] selection:bg-teal-950 selection:text-teal-200' 
        : 'bg-[#FCFBF9] text-[#1E1E20] selection:bg-teal-100 selection:text-teal-900'
    }`}>
      {/* Header Navigation with theme core state */}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onNavClick={handleScrollToSection} 
      />

      {/* Main Single Page Frame container */}
      <main className="relative overflow-x-hidden">
        
        {/* 1. Hero / welcome board section */}
        <Hero onNavClick={handleScrollToSection} />

        {/* 2. About section */}
        <About />

        {/* 3. Services horizontal grid panel */}
        <ServicesGrid />

        {/* 4. Shipped Case Studies portal (loaded with 10 items + architectural SVG diagram canvas) */}
        <CaseStudies />

        {/* 5. Autonomous consult chatbot (Gemini-powered consultation representative) */}
        <AiAssistant />

        {/* 6. Technical Stack metrics matrix */}
        <SkillsStack />

        {/* 7. Writing & Insights playbooks */}
        <BlogInsights />

        {/* 8. Partner testimonials & Logos metrics proof */}
        <Testimonials />

        {/* 9. Booking Calendar selector & custom validated Inquiry intake */}
        <ContactBooking />

      </main>

      {/* Footer copyright coordinates */}
      <Footer onNavClick={handleScrollToSection} />
      
    </div>
  );
}
