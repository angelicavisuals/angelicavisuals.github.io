import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from './project-data';
import { ProjectModal } from './ProjectModal';

export interface ProjectGridProps {
  projectIds?: number[];
  title?: string;
  showFilters?: boolean;
  fixedAspectRatio?: boolean;
  layoutScope?: string;
  deferInitialReveal?: boolean;
}

export const ProjectGrid = ({ projectIds, title = 'Selected Work', showFilters = true, fixedAspectRatio = false, layoutScope = 'work', deferInitialReveal = false }: ProjectGridProps = {}) => {
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(!deferInitialReveal);

  useEffect(() => {
    if (!deferInitialReveal) {
      return;
    }

    let cancelled = false;

    const preloadCoverImages = async () => {
      const promises = orderedBaseProjects.map(project => new Promise<void>(resolve => {
        const image = new Image();
        image.src = project.image;
        image.onload = () => resolve();
        image.onerror = () => resolve();

        if (image.complete) {
          resolve();
        }
      }));

      await Promise.all(promises);

      if (!cancelled) {
        setIsReady(true);
      }
    };

    void preloadCoverImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const preloadGalleryImages = () => {
      PROJECTS.forEach(project => {
        project.gallery.forEach(imgUrl => {
          const image = new Image();
          image.src = imgUrl;
        });
      });
    };

    const timeoutId = window.setTimeout(preloadGalleryImages, deferInitialReveal ? 500 : 0);
    return () => window.clearTimeout(timeoutId);
  }, [deferInitialReveal]);

  const baseProjects = projectIds ? PROJECTS.filter(p => projectIds.includes(p.id)) : PROJECTS;

  // Preserve the order of projectIds if provided
  const orderedBaseProjects = projectIds
    ? projectIds.map(id => baseProjects.find(p => p.id === id)).filter((p): p is typeof PROJECTS[0] => p !== undefined)
    : baseProjects;

  const filtered = filter === 'All' 
    ? orderedBaseProjects
    : orderedBaseProjects.filter(p => {
        if (filter === 'Animation') return p.category.includes('Animation');
        if (filter === 'Modeling') return p.category.includes('Modeling');
        if (filter === 'Other') return p.category.includes('Other') || (!p.category.includes('Animation') && !p.category.includes('Modeling'));
        return false;
      });
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <motion.section
      id="work"
      initial={deferInitialReveal ? { opacity: 0, y: 10 } : false}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={deferInitialReveal ? { duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 relative block"
      style={{ visibility: deferInitialReveal && !isReady ? 'hidden' : 'visible' }}
    >
      <div className={`mb-8 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 ${showFilters ? 'border-b border-zinc-200 dark:border-zinc-800' : ''} pb-4 sm:pb-6`}>
        <h2 className="text-2xl sm:text-3xl tracking-tight">
          {title === 'All Works' ? (filter === 'All' ? 'All Works' : `${filter} Works`) : title}
        </h2>
        {showFilters && (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
            {['All', 'Modeling', 'Animation', 'Other'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm tracking-wide uppercase transition-colors ${filter === f ? 'text-[var(--color-brand)] font-medium' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            return (
            <motion.div
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 }, duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="group cursor-pointer flex flex-col gap-3 relative w-full break-inside-avoid mb-6"
            >
              <motion.div
                layoutId={`${layoutScope}-image-${item.id}`} 
                className={`w-full relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 shadow-sm ${fixedAspectRatio ? 'aspect-[4/3]' : ''}`}
              >
                <img src={item.image} alt={item.title} className={`w-full block transition-transform duration-700 ease-out group-hover:scale-105 ${fixedAspectRatio ? 'h-full object-cover' : 'h-auto'}`} loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </motion.div>
              <div className="px-1 pb-2">
                <motion.h3 layoutId={`${layoutScope}-title-${item.id}`} className="text-lg font-medium tracking-tight group-hover:text-brand transition-colors">{item.title}</motion.h3>
                <motion.p layoutId={`${layoutScope}-cat-${item.id}`} className="text-zinc-500 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.category}</motion.p>
              </div>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedId(null)} layoutScope={layoutScope} />
        )}
      </AnimatePresence>
    </motion.section>
  );
};
