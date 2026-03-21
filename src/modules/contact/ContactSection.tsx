import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('angelica.andreasson1@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 w-full relative">
      <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-12 sm:mb-24"></div>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">Get in Touch</h2>
          <p className="text-zinc-500 text-lg">Available for collaborations.</p>
        </motion.div>

        <motion.form 
          action="https://api.web3forms.com/submit" 
          method="POST"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full flex flex-col gap-6"
        >
          <input type="hidden" name="access_key" value="1a7cd653-9f0f-484d-bf81-65b691f89579" />
          <input type="hidden" name="redirect" value="https://angelicavisuals.github.io/" />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
              <input id="name" type="text" name="name" autoComplete="name" required placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[var(--color-brand)] focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all placeholder:text-zinc-400" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
              <input id="email" type="email" name="email" autoComplete="email" required placeholder="your@email.com" className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[var(--color-brand)] focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all placeholder:text-zinc-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
            <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project..." className="w-full px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[var(--color-brand)] focus:bg-white dark:focus:bg-zinc-950 outline-none transition-all placeholder:text-zinc-400 resize-none"></textarea>
          </div>

          <button type="submit" className="mt-4 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-[var(--color-brand)] dark:hover:bg-[var(--color-brand)] hover:text-white transition-all scale-100 active:scale-95 duration-200 w-full md:w-max mx-auto">
            Send Message
          </button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 mb-4">Or email me directly at</p>
          <button 
            onClick={handleCopy}
            className="text-base sm:text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 hover:text-[var(--color-brand)] dark:hover:text-[var(--color-brand)] transition-colors relative break-all"
          >
            angelica.andreasson1@gmail.com
            <AnimatePresence>
              {copied && (
                <motion.span 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-xl pointer-events-none shadow-xl whitespace-nowrap"
                >
                  Copied to clipboard!
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-zinc-900 dark:border-t-white"></div>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
