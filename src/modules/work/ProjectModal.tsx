import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { ImageViewer } from './ImageViewer';
import type { Project } from './project-data';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && viewerIndex === null) onClose();
  }, [onClose, viewerIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => { 
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl pointer-events-auto"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-zinc-50 dark:bg-zinc-950 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-white/10 pointer-events-auto mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-brand)] origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />
        <div 
          ref={scrollRef}
          className="overflow-y-auto overflow-x-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        >
          <button 
            className="sticky top-6 self-end mr-6 z-10 p-2 md:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md cursor-pointer flex items-center justify-center"
            onClick={onClose}
          >
            <X size={20} weight="bold" />
          </button>
          
          <div className="w-full flex-shrink-0 relative h-[30vh] sm:h-[40vh] md:h-[60vh] bg-zinc-100 dark:bg-zinc-900/50 border-b border-zinc-200/50 dark:border-white/5 flex items-center justify-center p-4 sm:p-8 -mt-12">
            <motion.img
              layoutId={`image-${project.id}`}
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-full object-contain rounded-2xl drop-shadow-2xl"
              decoding="async"
            />
          </div>
          
          <div className="w-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col max-w-4xl mx-auto">
            <motion.h3
              layoutId={`title-${project.id}`}
              className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight mb-3 sm:mb-4"
            >
              {project.title}
            </motion.h3>
            <motion.p
              layoutId={`cat-${project.id}`}
              className="text-[var(--color-brand)] font-semibold text-sm tracking-widest uppercase mb-10"
            >
              {project.category}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 sm:mb-16 max-w-3xl"
            >
              {project.description}
            </motion.p>

            {project.video && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-16 bg-zinc-900 aspect-video"
              >
                <video controls muted preload="metadata" className="w-full h-full object-contain">
                  <source src={project.video} type="video/mp4" />
                </video>
              </motion.div>
            )}
            
            {project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 sm:mb-8">Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 cursor-pointer group ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}
                      onClick={() => setViewerIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} gallery ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {viewerIndex !== null && project.gallery.length > 0 && (
          <ImageViewer
            images={project.gallery}
            currentIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
            onNavigate={setViewerIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
