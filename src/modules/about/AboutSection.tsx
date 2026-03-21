import { motion } from 'framer-motion';

const SKILLS: { name: string; url: string; icon: string; hoverAnim: any }[] = [
  { 
    name: 'Blender', 
    url: 'https://www.blender.org/', 
    icon: 'https://cdn.simpleicons.org/blender/white',
    // 3D rotation for a 3D modeling tool
    hoverAnim: { 
      scale: 1.15, 
      rotateY: 360,
      transition: { rotateY: { repeat: Infinity, duration: 1.5, ease: "linear" }, scale: { duration: 0.2 } }
    }
  },
  { 
    name: 'Fusion 360', 
    url: 'https://www.autodesk.com/products/fusion-360/', 
    icon: 'https://cdn.simpleicons.org/autodesk/white',
    // Mechanical forward rotation on X axis
    hoverAnim: { 
      scale: 1.15,
      rotateX: -360,
      transition: { rotateX: { repeat: Infinity, duration: 1.5, ease: "linear" }, scale: { duration: 0.2 } }
    }
  },
  { 
    name: 'Photoshop', 
    url: 'https://www.adobe.com/products/photoshop.html', 
    icon: 'https://api.iconify.design/devicon-plain:photoshop.svg?color=white',
    // Tilting gently side-to-side like a photo print
    hoverAnim: { 
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: { rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }, scale: { duration: 0.2 } }
    }
  },
  { 
    name: 'Autodesk Inventor', 
    url: 'https://www.autodesk.com/products/inventor/', 
    icon: 'https://cdn.simpleicons.org/autodesk/white',
    // Spinning like a mechanical gear
    hoverAnim: { 
      scale: 1.15,
      rotate: 360,
      transition: { rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { duration: 0.2 } }
    }
  },
  { 
    name: 'DaVinci Resolve', 
    url: 'https://www.blackmagicdesign.com/products/davinciresolve', 
    icon: 'https://cdn.simpleicons.org/davinciresolve/white',
    // Sliding back and forth like scrubbing a video timeline
    hoverAnim: { 
      scale: 1.15,
      x: [0, 8, -8, 0],
      transition: { x: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }, scale: { duration: 0.2 } }
    }
  },
  { 
    name: 'After Effects', 
    url: 'https://www.adobe.com/products/aftereffects.html', 
    icon: 'https://api.iconify.design/devicon-plain:aftereffects.svg?color=white',
    // Exaggerated bouncy motion for motion graphics
    hoverAnim: { 
      scale: 1.15,
      y: [0, -10, 0],
      transition: { y: { repeat: Infinity, duration: 0.6, ease: "easeOut" }, scale: { duration: 0.2 } }
    }
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32 w-full">
      <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-12 sm:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative w-full aspect-3/4 rounded-[2.5rem] overflow-hidden group">
          <img 
            src="/media/Site/portrait.jpg" 
            alt="Angelica Andreasson" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2.5rem]" />
        </div>
        
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-tighter leading-none mb-4 sm:mb-6">Bridging the gap between the surreal & the tangible.</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I am a Computer Graphics Designer student based in Gothenburg, focusing on product and design modeling. Having always been interested in arts and design, I am passionate about creating visually compelling and meaningful experiences.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm tracking-widest uppercase font-semibold text-zinc-900 dark:text-zinc-100">Toolkit</h3>
            <div className="flex flex-wrap gap-3" style={{ perspective: '1000px' }}>
              {SKILLS.map((skill, i) => (
                <motion.a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.9, y: 10, rotateY: 0, rotateX: 0, skewX: 0, x: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={skill.hoverAnim}
                  whileTap={{ scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl sm:rounded-full border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md text-sm font-medium hover:bg-brand dark:hover:bg-brand hover:text-white dark:hover:text-white hover:border-transparent dark:hover:border-transparent transition-colors duration-300"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-4 h-4 object-contain invert dark:invert-0 group-hover:invert-0 dark:group-hover:invert-0 transition-[filter] duration-300" 
                  />
                  <span>{skill.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="pt-8">
             <a href="/docs/Angelica_Andreasson_CV.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium tracking-wide hover:bg-[var(--color-brand)] dark:hover:bg-[var(--color-brand)] hover:text-white transition-all transform hover:scale-[0.98] active:scale-95 duration-200 shadow-xl">
               Download Resume
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};
