import { ProjectGrid } from '../modules/work/ProjectGrid';
import { useEffect } from 'react';

export const WorkPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-[1400px] mx-auto px-4 md:px-8 relative pb-12 pt-8">
      <ProjectGrid title="All Works" />
    </main>
  );
};
