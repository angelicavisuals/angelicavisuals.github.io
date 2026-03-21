export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  video?: string;
  gallery: string[];
}

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'Sony WH-1000XM5', 
    category: 'Modeling - Blender / After Effects / Substance 3D Sampler', 
    image: '/media/SonyHeadphones/BlackHeadphones.png', 
    description: 'Digital asset of a commerical headphone product, modeled in Blender and textured using Substance 3D Sampler. The final presentation was rendered in Blender and animated in After Effects.',
    video: '/media/SonyHeadphones/SonyHeadphones.mp4',
    gallery: [
      '/media/SonyHeadphones/WhiteHeadphones.png',
      '/media/SonyHeadphones/BlackHeadphones.png',
      '/media/SonyHeadphones/BlackHeadphonesWireframe.png'
    ]
  },
  { 
    id: 2, 
    title: 'Creality Drill', 
    category: 'Modeling - Blender / Fusion 360 / Photoshop', 
    image: '/media/CrealityDrill/DrillOverview.jpg', 
    description: 'Drill modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop. A study in hard-surface modeling.',
    video: '/media/CrealityDrill/DrillTurntable.mp4',
    gallery: [
      '/media/CrealityDrill/DrillOverview.jpg',
      '/media/CrealityDrill/DrillDetail.jpg',
      '/media/CrealityDrill/DrillOrto.jpg'
    ]
  },
  { 
    id: 3, 
    title: 'High Heels', 
    category: 'Modeling - Blender / Substance 3D Sampler / Photoshop', 
    image: '/media/HighHeels/WhiteHeel.png', 
    description: 'High heels modeled and rendered in Blender, textured in Substance 3D Sampler, with final images composed in Photoshop.',
    video: '/media/HighHeels/HeelTurntable.mp4',
    gallery: [
      '/media/HighHeels/BrownHeel.png',
      '/media/HighHeels/BlackHeel.png',
      '/media/HighHeels/WhiteHeel.png',
      '/media/HighHeels/GreenHeel.png'
    ]
  },
  { 
    id: 4, 
    title: 'Perfume Bottle', 
    category: 'Modeling - Blender / Fusion 360 / Photoshop', 
    image: '/media/PerfumeBottle/Perfume3.png', 
    description: 'Perfume bottle with packaging modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop.',
    gallery: [
      '/media/PerfumeBottle/Perfume1.png',
      '/media/PerfumeBottle/Perfume2.png',
      '/media/PerfumeBottle/Perfume3.png'
    ]
  },
  { 
    id: 5, 
    title: 'Impala Rollerskate', 
    category: 'Modeling - Blender / Fusion 360 / Photoshop', 
    image: '/media/ImpalaRollerskate/Rollerskate.png', 
    description: 'Rollerskate modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop.',
    gallery: [
      '/media/ImpalaRollerskate/Rollerskate2.png',
      '/media/ImpalaRollerskate/RollerskateBack.png',
      '/media/ImpalaRollerskate/RollerskateFront.png',
      '/media/ImpalaRollerskate/RollerskateWireframe.png'
    ]
  },
  { 
    id: 6, 
    title: 'Crosley Turntable', 
    category: 'Animation - Blender / Fusion 360', 
    image: '/media/Vinyl/Vinyl2.png', 
    description: 'A stylistic vinyl record animation featuring dynamic lighting and precise material tracking.',
    video: '/media/Vinyl/Vinyl.mp4',
    gallery: [
      '/media/Vinyl/Vinyl1.png',
      '/media/Vinyl/Vinyl2.png',
      '/media/Vinyl/Vinyl3.png'
    ]
  },
  { 
    id: 7, 
    title: 'Sony WH-1000XM5 Product Showcase', 
    category: 'Animation - Blender / Premiere Pro', 
    image: '/media/SonyViz/SonyVizCover.jpg', 
    description: 'Cinematic product animation showcasing the Sony WH-1000XM5 headphones with sleek motion design.',
    video: '/media/SonyViz/SonyVizVideo.mp4',
    gallery: []
  },
];
