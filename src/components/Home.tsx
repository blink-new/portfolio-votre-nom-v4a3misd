import React, { useEffect, useState } from 'react';
import VideoBackground from './VideoBackground';
import Navigation from './Navigation';
import IntroSection from './IntroSection';
import TechnologiesSection from './TechnologiesSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <VideoBackground />
      <Navigation />
      
      <main>
        <IntroSection scrollY={scrollY} />
        <TechnologiesSection scrollY={scrollY} />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Home;