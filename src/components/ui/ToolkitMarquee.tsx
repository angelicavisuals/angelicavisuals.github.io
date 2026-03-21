export const TOOLKITS = [
  { name: 'Blender', icon: 'https://cdn.simpleicons.org/blender/white' },
  { name: 'Fusion 360', icon: 'https://cdn.simpleicons.org/autodesk/white' },
  { name: 'Photoshop', icon: 'https://api.iconify.design/devicon-plain:photoshop.svg?color=white' },
  { name: 'Autodesk Inventor', icon: 'https://cdn.simpleicons.org/autodesk/white' },
  { name: 'DaVinci Resolve', icon: 'https://cdn.simpleicons.org/davinciresolve/white' },
  { name: 'After Effects', icon: 'https://api.iconify.design/devicon-plain:aftereffects.svg?color=white' },
];

export const ToolkitMarquee = () => {
  // Duplicate array enough to cover a 4K screen at minimum natively
  // 6 array items * 15 repetitions = 90 items total per sequence container
  const duplicatedToolkits = Array(15).fill(TOOLKITS).flat();

  return (
    <div className="w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 py-4 sm:py-5 border-y border-zinc-200/50 dark:border-white/5 relative flex items-center">
      {/* Left/Right fading gradients to blend the marquee */}
      <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-zinc-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-zinc-100 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Track - Scrolls Left */}
      <div className="flex w-max min-w-full relative group">
        {[0, 1].map((n) => (
          <div
            key={`top-group-${n}`}
            className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] space-x-8 sm:space-x-12 pr-8 sm:pr-12"
            aria-hidden={n === 1 ? "true" : "false"}
          >
            {duplicatedToolkits.map((toolkit, i) => (
              <div
                key={`top-${n}-${i}`}
                className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
              >
                <img
                  src={toolkit.icon}
                  alt={toolkit.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain dark:invert-0 invert"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                  {toolkit.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
