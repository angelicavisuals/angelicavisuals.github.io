import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-auto"
    >
      <div className="absolute inset-0 bg-black/95 cursor-pointer" onClick={onClose} />
      
      <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[currentIndex]}
          alt=""
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg select-none"
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
      >
        <X size={20} weight="bold" className="sm:hidden" />
        <X size={24} weight="bold" className="hidden sm:block" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/15 sm:bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/15 sm:bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60 w-2'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
