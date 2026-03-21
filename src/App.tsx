import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { WorkPage } from './pages/WorkPage';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-[var(--color-brand)] selection:text-white pb-12 relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block" aria-hidden="true">
          {/* Animated breathing gradients */}
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-[30vh] -right-[10vw] w-[60vw] h-[60vw] rounded-full bg-[var(--color-brand)] opacity-[0.06] blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-[40vh] -left-[15vw] w-[50vw] h-[50vw] rounded-full bg-[var(--color-brand-light)] opacity-[0.08] blur-[100px]" 
          />
          <motion.div 
            animate={{ x: [0, 30, 0], y: [0, 40, 0], scale: [1, 1.05, 1] }} 
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-[10vh] right-[5vw] w-[40vw] h-[40vw] rounded-full bg-[var(--color-brand-dark)] opacity-[0.06] blur-[80px]" 
          />
          
        </div>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-brand)] origin-left z-[60] pointer-events-none"
          style={{ scaleX }}
        />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>
    </Router>
  );
}