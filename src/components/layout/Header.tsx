import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, Moon, Sun } from '@phosphor-icons/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync theme on mount
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
        <header
          className={`pointer-events-auto flex items-center justify-between overflow-hidden backdrop-blur-xl border-b w-full transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-white/0 dark:bg-zinc-950/0 h-14 border-transparent shadow-none hover:bg-zinc-50 hover:dark:bg-zinc-950' 
              : 'bg-zinc-50 dark:bg-zinc-950 h-16 border-zinc-200 dark:border-white/10 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between w-full h-full px-4 sm:px-6 md:px-12 mx-auto max-w-[1920px]">
            <div className="hover:opacity-80 transition-opacity min-w-max">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/AALogo.png" alt="Angelica Andreasson" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-6 md:gap-8">
              <Link to="/work" className="text-sm font-medium hover:text-[var(--color-brand)] transition-colors">Work</Link>
              <Link to="/#about" className="text-sm font-medium hover:text-[var(--color-brand)] transition-colors">About</Link>
              <button
                onClick={toggleTheme}
                className="text-zinc-600 dark:text-zinc-300 hover:text-brand dark:hover:text-brand transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} weight="bold" /> : <Sun size={20} weight="bold" />}
              </button>
              <button
                onClick={handleContactClick}
                className="text-sm font-medium px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-light)] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Mobile Nav Toggle & Theme */}
            <div className="sm:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-zinc-600 dark:text-zinc-300 hover:text-brand transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={24} weight="bold" /> : <Sun size={24} weight="bold" />}
              </button>
              <button 
                className="p-2 -mr-2 text-zinc-800 dark:text-zinc-200 hover:text-[var(--color-brand)] transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[40] bg-white/95 dark:bg-zinc-950/95 flex flex-col items-center justify-center gap-8 sm:hidden pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link 
                to="/work" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-semibold tracking-tight hover:text-brand transition-colors text-zinc-900 dark:text-zinc-100"
              >
                Work
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-semibold tracking-tight hover:text-[var(--color-brand)] transition-colors text-zinc-900 dark:text-zinc-100"
              >
                About
              </Link>
            </motion.div>
            <motion.button
              onClick={handleContactClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-medium px-10 py-4 mt-6 rounded-full bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-light)] transition-colors cursor-pointer"
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
