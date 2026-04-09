import { motion } from 'framer-motion';
import { Cube, FilePdf, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angelica-andreasson-400837234/?originalSubdomain=se',
    icon: LinkedinLogo,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/studioandreasson',
    icon: InstagramLogo,
  },
  {
    label: 'Sketchfab',
    href: 'https://sketchfab.com/Angelica_Andreasson',
    icon: Cube,
  },
  {
    label: 'CV',
    href: '/docs/Angelica_Andreasson_CV.pdf',
    icon: FilePdf,
  },
] as const;

export const HomeFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl shadow-[0_-1px_0_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 sm:pt-10 pb-[max(2rem,calc(1rem+env(safe-area-inset-bottom,0px)))] sm:pb-[max(2.5rem,calc(1rem+env(safe-area-inset-bottom,0px)))] flex flex-col sm:flex-row gap-5 sm:gap-8 items-center justify-between">
        <p className="text-sm text-zinc-700 dark:text-zinc-400">
          Angelica Andreasson © 2026
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-3.5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-white dark:hover:bg-white/10"
            >
              <Icon size={18} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
              <span>{label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};