import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative w-full h-dvh flex flex-col justify-center items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/media/Hero-Green-Ball/Hero-Green-Ball.webm"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 px-4 translate-y-10 sm:translate-y-14 lg:translate-y-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] tracking-tighter leading-[0.88] font-medium mb-5 text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            Angelica <br /> Andreasson.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-100 font-light max-w-[34ch] leading-relaxed mx-auto drop-shadow-lg">
            Computer Graphics Designer focusing on texturing and product modeling.
          </p>
        </motion.div>

        <motion.a
          href="work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white hover:text-black hover:bg-white transition-all drop-shadow-md border border-white/50 rounded-full px-6 py-3 backdrop-blur-sm"
        >
          View Projects
        </motion.a>
      </div>
    </section>
  );
};
