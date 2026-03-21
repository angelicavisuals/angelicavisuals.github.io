import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from './project-data';
import { ProjectModal } from './ProjectModal';

export interface ProjectGridProps {
  projectIds?: number[];
  title?: string;
  showFilters?: boolean;
}

export const ProjectGrid = ({ projectIds, title = 'Selected Work', showFilters = true }: ProjectGridProps = {}) => {
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    // Preload gallery images and cover images to prevent lag when modal opens
    PROJECTS.forEach(p => {
      // It's possible the cover image isn't the same file size, preload just in case
      const cover = new Image();
      cover.src = p.image;
      p.gallery.forEach(imgUrl => {
        const img = new Image();
        img.src = imgUrl;
      });
    });
  }, []);

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
    <section id="work" className="py-24 relative block">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 }, duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="group cursor-pointer flex flex-col gap-3 relative w-full break-inside-avoid mb-6"
            >
              <motion.div
                layoutId={`image-${item.id}`} 
                className="w-full relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 shadow-sm"
              >
                <img src={item.image} alt={item.title} className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </motion.div>
              <div className="px-1 pb-2">
                <motion.h3 layoutId={`title-${item.id}`} className="text-lg font-medium tracking-tight group-hover:text-brand transition-colors">{item.title}</motion.h3>
                <motion.p layoutId={`cat-${item.id}`} className="text-zinc-500 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.category}</motion.p>
              </div>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
