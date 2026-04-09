import { Hero } from '../modules/home/Hero';
import { ProjectGrid } from '../modules/work/ProjectGrid';
import { ToolkitMarquee } from '../components/ui/ToolkitMarquee';
import { AboutSection } from '../modules/about/AboutSection';
import { ContactSection } from '../modules/contact/ContactSection';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Hero />
      <ToolkitMarquee />
      
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <ProjectGrid projectIds={[6, 7, 5]} title="Selected Work" showFilters={false} fixedAspectRatio={true} layoutScope="home" />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
};
