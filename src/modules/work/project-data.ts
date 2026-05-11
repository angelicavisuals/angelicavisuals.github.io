export interface Project {
  id: number;
  title: string;
  categories: string[];
  image: string;
  description: string;
  video?: string;
  gallery: string[];
  showInAllOnly?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Show Reel',
    categories: ['Animation', 'Modeling', 'Texturing', 'Lighting'],
    image: '/media/Angelica_Andreasson_Showreel.webm',
    description: 'A compilation of recent work showcasing animation, modeling, texturing, and lighting projects.',
    video: '/media/Angelica_Andreasson_Showreel.webm',
    gallery: [],
    showInAllOnly: true
  },
  {
    id: 2,
    title: 'Sony WH-1000XM5',
    categories: ['Animation', 'Texturing'],
    image: '/media/thumbnails/SonyHeadphones_1.webp',
    description: 'Programs: Blender / Substance 3d sampler / Premiere Pro / After effects.\n\nThis project focused on creating an optimized digital asset, with particular emphasis on clean topology and tileable materials to ensure efficient use across different platforms and workflows. For this model I also made a product animation, with a focus on calm, smooth camera movements and carefully balanced lighting to achieve a professional and polished presentation.\n\nThe headphone model was created in Blender, with extra attention given to maintaining a clean and efficient mesh topology. Textures and materials were developed in Adobe Substance 3D Sampler, providing full control over the material creation process and helping achieve a realistic surface quality closely matching the physical product.\n\nReflection:\nOne of the main challenges during this project was maintaining a clean and optimized mesh topology throughout the modeling process. I had to continuously refine and rebuild parts of the mesh to ensure it remained efficient, well-structured, and suitable for further texturing, rendering, and potential real-time use, while still preserving the overall shape and visual quality of the product.\n\nBalancing optimization with aesthetics proved to be one of the more technically demanding aspects of the project, as small adjustments to the topology could significantly affect the final appearance of the model. Through this process, I developed a stronger understanding of efficient topology workflows, edge flow management, and the importance of planning geometry carefully from the beginning of a project. It also improved my ability to identify and solve modeling issues in a more structured and methodical way.',
    video:  '/media/SonyHeadphones/SonyVizVideo.webm',
    gallery: [
      '/media/SonyHeadphones/Headphones_1.webp',
      '/media/SonyHeadphones/Headphones_2.webp',
      '/media/SonyHeadphones/SonyHeadphones.webm',
      '/media/SonyHeadphones/BlackHeadphonesWireframe.webp'
    ]
  },
  {
    id: 3,
    title: 'Crosley Turntable',
    categories: ['Animation', 'Modeling'],
    image: '/media/thumbnails/Crosley_turntable_Vinyl2.webp',
    description: 'Programs: Blender / Fusion 360\n\nThis assignment focused on creating a product visualization through both modeling and animation, with an emphasis on realistic detailing and slow, controlled camera movements to highlight the design and craftsmanship of the model.\n\nThe product was modeled using a combination of Blender and Autodesk Fusion 360. The internal electronic components of the turntable were created in Fusion 360 to achieve greater precision and control over the technical details, while the outer casing and surrounding elements were modeled in Blender. The textures used throughout the project were a combination of procedural and downloaded materials. Any downloaded textures were further adjusted and refined to better match the lighting, mood, and overall visual style of the scene.\n\nAll post-production was completed in Blender using the Video Sequence Editor, where the clips were edited together and music was added to create a cohesive final presentation.\n\nReflection:\nFor this assignment, one of the main challenges was deciding on the overall layout and composition of the animation. I was initially torn between a vertical and horizontal presentation, as different shots worked better depending on the orientation. Some scenes felt more visually striking in a vertical format, while others benefited from a horizontal layout, creating a more grounded and stable composition.\n\nTo resolve this, I decided to combine both approaches within the final animation. I layered the vertical footage on top of the horizontal base and synchronized the timing with the music. This approach allowed me to retain the strengths of both compositions while creating a more dynamic and visually engaging final result that better matched the rhythm and energy of the sound design.',
    video: '/media/Crosley turntable/Vinyl.webm',
    gallery: [
      '/media/Crosley turntable/Vinyl1.webp',
      '/media/Crosley turntable/Vinyl2.webp',
      '/media/Crosley turntable/Vinyl3.webp',
      '/media/Crosley turntable/Turntable_1.webp',
    ]
  },
    {
    id: 4,
    title: 'Pastry Contest',
    categories: ['Lighting'],
    image: '/media/thumbnails/Pastry_Contest_Pastry_1.webp',
    description: 'Programs: Blender / Photoshop\n\nThis assignment involved designing a promotional poster for an imaginary pastry competition, with a strong emphasis on lighting, composition, and visual storytelling. The goal was to create an appetizing and visually engaging scene that conveys both a sense of hunger and the excitement of competition.\n\nThe final scene combines a variety of 3D assets sourced from platforms such as Blenderkit and Sketchfab, alongside several original models created specifically for the project.\n\nWhile the pancake models included pre-existing textures, these were reworked and refined to better match the overall artistic direction and lighting of the composition. All remaining textures in the scene were created from scratch to ensure a cohesive and personalized visual style.\n\nReflection:\nI found the project especially enjoyable because it gave me the opportunity to experiment with lighting across a variety of materials, each interacting differently with light. The glossy surfaces of the diamonds and pearls responded in a very different way compared to the softer, matte texture of the pancakes, which made the process both creatively interesting and technically challenging.\n\nOne of the main challenges was achieving the right balance of contrast and highlights. To create enough depth and visual impact, I needed to work with multiple light sources, which required careful adjustment to avoid overlighting the scene or losing important details. This process helped me develop a better understanding of how lighting can influence mood, realism, and the overall composition of an image.',
    gallery: [
      '/media/Pastry Contest/Pastry_1.webp',
      '/media/Pastry Contest/Pastry_2.webp',
      '/media/Pastry Contest/Pastry_wireframe.webp',
      '/media/Pastry Contest/Pastry_3.webp'
    ]
  },
  {
    id: 5,
    title: 'Lipstick and Lighter',
    categories: ['Lighting'],
    image: '/media/Lipstick and lighter/Fire_1.webp',
    description: 'Programs: Blender / Photoshop\n\nThis assignment focused on creating a product visualization that incorporated fire as a central element, with particular emphasis on lighting and the interaction between light, heat, and the surrounding materials. The goal was to create a dramatic and visually cohesive composition that highlighted the relationship between the product and the fire effects within the scene.\n\nAll primary models were self-created in Blender. The smoke effect rising above the lipstick was sourced from BlenderKit and integrated into the composition to enhance the atmosphere and realism of the scene. The fire effect itself was created using a plane with transmission and emission properties to simulate the glow and intensity of flames.\n\nThe final image was further refined in Adobe Photoshop, where additional contrast adjustments were made to strengthen the overall cohesion, depth, and dramatic mood of the composition.\n\nReflection:\nFor this project, I wanted to explore the idea that the fire had physically affected the product, in this case, causing the lipstick to melt. I aimed to create a stronger connection between the two central elements of the composition by showing how they interact with and influence one another. This helped add more storytelling and realism to the final image.\n\nOne of the more challenging aspects of the project was creating the melted lipstick itself. I wanted the red lipstick material to appear as though it had naturally softened and deformed from the heat. After experimenting with several different techniques and approaches, I ultimately achieved the desired result through sculpting, which allowed for a more organic and realistic appearance.',
    video: '/media/Lipstick and lighter/Fire_2.webm',
    gallery: [
      '/media/Lipstick and lighter/Fire_1.webp',
      '/media/Lipstick and lighter/Fire_3.webp',
      '/media/Lipstick and lighter/Fire_4.webp'
    ]
  },
    {
    id: 6,
    title: 'Chanel N°5',
    categories: ['Lighting'],
    image: '/media/thumbnails/Chanel_no5_Chanel_1.webp',
    description: 'Programs: Blender / Photoshop\n\nThis project focused on creating a product visualization in which water played a central role in the composition. The aim was to explore how lighting interacts with reflective and transparent surfaces while enhancing the connection between the product and the surrounding water elements.\n\nThe primary model and its textures were entirely self-created, allowing for full creative control over the appearance and style of the scene. The condensation effect visible on the glass surface in the foreground was achieved using a condensation shader sourced from Gumroad, which was further customized and adjusted to better fit the lighting and mood of the composition. The caustic light patterns projected onto the ground were created using a plane with transmission and emission properties, helping to simulate the way light behaves when passing through transparent materials.\n\nThe final image was refined in Adobe Photoshop, where text elements were added and color and contrast adjustments were made to strengthen the depth and cohesive atmosphere of the scene.\n\nReflection:\nOne of the main challenges during the creation of this render was achieving a realistic condensation effect on the glass surface. Initially, the condensation shader caused the glass to appear too opaque, making it difficult to see through and reducing the overall realism of the composition. To solve this, I experimented with and adjusted a variety of shader settings and material properties until I achieved a result that felt more natural and visually convincing.',
    gallery: [
      '/media/Chanel no5/Chanel_1.webp',
      '/media/Chanel no5/Chanel_2.webp',
      '/media/Chanel no5/Chanel_3.webp'
    ]
  },
  {
    id: 7,
    title: 'Rotational Motion Study',
    categories: ['Animation'],
    image: '/media/thumbnails/Rotational_Motion_Study_Spinny_2.webp',
    description: 'Programs: Blender / Premiere Pro\n\nThis project involved creating a looping animation featuring metal balls rolling across wooden planks, with a focus on developing a simple yet visually engaging composition. The goal was to produce a calming and satisfying animation through the use of smooth motion, balanced pacing, and cohesive visual design.\n\nBoth the modeling and animation were created in Blender, where attention was given to the movement and interaction of the objects to achieve a natural and seamless loop.\n\nPost-production was completed in Adobe Premiere Pro, where sound design was added to enhance the viewing experience. The inclusion of the metal balls rolling sound effects helped reinforce the realism of the animation and contributed to the calming and immersive atmosphere of the final piece.\n\nReflection:\nDuring this project, I aimed to explore the creation of a seamless looping animation combined with sound design. My inspiration came from short-form content on various social media platforms, where I was drawn to smooth, repetitive motion paired with satisfying audio, and I wanted to recreate a similar experience.\n\nI also experimented with different material combinations to find a visual style that suited the animation. I ultimately chose a hammered metal finish paired with an oak wood texture. The contrast between the warm, natural wood and the cool, industrial metal created a balanced visual composition that enhanced the calm and satisfying feel of the loop.\n\nThrough this process, I learned the importance of iteration when developing both materials and motion in an animation. Testing different textures helped me understand how surface detail and material contrast can strongly influence mood and perception. I also improved my understanding of creating seamless loops and how timing and sound design work together to reinforce the overall rhythm and visual satisfaction of an animation.',
    video: '/media/Rotational Motion Study/Spinny_1.webm',
    gallery: [
      '/media/Rotational Motion Study/Spinny_2.webp',
      '/media/Rotational Motion Study/Spinny_3.webp'
    ]
  },
{ 
    id: 8, 
    title: 'High Heel', 
    categories: ['Modeling', 'Texturing'], 
    image: '/media/thumbnails/High_heel_Heel_1.webp', 
    description: 'Programs: Blender / Substance 3D Sampler / Photoshop\n\nTogether with two other programs at Yrgo, Digital Design and Web Development, we collaborated on creating a complete website experience for the fictional brand Kinforma. The project focused on combining branding, web design, and 3D visualization into a cohesive digital identity. Working across multiple disciplines required close collaboration and communication to ensure that the visual style, user experience, and technical implementation aligned consistently throughout the project.\n\nMy role focused on creating the visual product content for the website, with an emphasis on realistic rendering, material work, and maintaining a premium fashion aesthetic that matched the brand identity.\n\nThe design, 3D model, and textures were fully self-created. The high heels were modeled and rendered in Blender, textured in Adobe Substance 3d Sampler, and the final compositions were refined in Adobe Photoshop.\n\nReflection:\nDuring this process, I gained valuable insight into how collaborative work functions in a real-world production environment. Working in a group required continuous communication, regular updates, and ongoing alignment with other team members throughout the project. We consistently reviewed each other\'s progress, which helped ensure that the work stayed cohesive and on track.\n\nThis experience made me more aware of the importance of structure, feedback, and clear communication in group-based projects, and it has helped me feel more prepared for working in a professional team setting in the future.', 
    gallery: [
      '/media/High heel/Heel_2.webp',
      '/media/High heel/Heel_1.webp',
      '/media/High heel/Heel_3.webp'
    ]
  },
  {
    id: 9,
    title: 'Impala Roller Skate',
    categories: ['Modeling'],
    image: '/media/Impala Rollerskate/Rollerskate_1.webp',
    description: 'Programs: Blender / Fusion 360 / Photoshop\n\nThis project focused on combining hard-surface and soft-surface modeling techniques within a product visualization workflow, with the goal of creating a visually cohesive and balanced design. The project explored the contrast between structured mechanical forms and softer organic surfaces while maintaining a realistic and functional appearance.\n\nThe lower structural frame of the shoe was created in Autodesk Fusion 360 to achieve precise hard-surface details, while the upper fabric section was modeled in Blender. The texturing process combined procedural materials with textures sourced from BlenderKit, which were further adjusted to better fit the overall style and presentation of the model.\n\nA key focus throughout the project was refining the silhouette, proportions, and transitions between the different materials and forms to create a cohesive and visually balanced final design.\n\nReflection:\nDuring this project, I found myself wanting to move into fine detail work too early in the process, often focusing on elements that were not clearly visible in the final model. This made it challenging to maintain an efficient workflow and prioritize what was actually necessary for the end result.\n\nI had to learn to step back and restrain that tendency, focusing instead on the most important forms, proportions, and defining details that contribute to the overall readability and quality of the model. This shift in approach helped me manage my time more effectively and ensure that I could complete the project within the given timeframe of four workdays.',
    gallery: [
      '/media/Impala Rollerskate/Rollerskate_1.webp',
      '/media/Impala Rollerskate/Rollerskate_2.webp',
      '/media/Impala Rollerskate/Rollerskate_3.webp',
      '/media/Impala Rollerskate/Rollerskate_4.webp'
    ]
  },
];