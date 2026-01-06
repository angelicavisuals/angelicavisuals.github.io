// Theme toggle script: persists selection in localStorage and respects system preference
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = stored || (prefersDark ? 'dark' : 'light');

  // Global cache for pages and assets (persists across navigations)
  const pageCache = new Map();
  const assetCache = new Map();

  // Load shared navbar and footer from components.html
  function loadComponents(){
    // Detect if we're in a subdirectory by checking the current path
    const isSubdirectory = window.location.pathname.includes('/pages/');
    const componentsPath = isSubdirectory ? '../../components.html' : 'components.html';
    
    return fetch(componentsPath)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Insert navbar at the beginning of body
        const navbar = doc.querySelector('#navbar-component');
        if(navbar && !document.querySelector('nav')){
          document.body.insertBefore(navbar, document.body.firstChild);
        }
        
        // Insert footer at the end of body
        const footer = doc.querySelector('#footer-component');
        if(footer && !document.querySelector('footer')){
          document.body.appendChild(footer);
        }
        
        // Insert clipboard notification
        const notification = doc.querySelector('#clipboard-notification');
        if(notification && !document.querySelector('#clipboard-notification')){
          document.body.appendChild(notification);
        }
      })
      .catch(err => console.log('Components loaded from HTML'));
  }

  function applyTheme(theme){
    const btn = document.getElementById('theme-toggle');
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      if(btn){ document.querySelectorAll('#theme-toggle .fa-moon, #theme-toggle .fa-sun').forEach(i => i.remove());
        const icon = document.createElement('i'); icon.className = 'fas fa-sun';
        btn.appendChild(icon);
        btn.setAttribute('aria-pressed','true'); }
    } else {
      root.removeAttribute('data-theme');
      if(btn){ document.querySelectorAll('#theme-toggle .fa-moon, #theme-toggle .fa-sun').forEach(i => i.remove());
        const icon = document.createElement('i'); icon.className = 'fas fa-moon';
        btn.appendChild(icon);
        btn.setAttribute('aria-pressed','false'); }
    }
    localStorage.setItem('theme', theme);
  }

  // Initialize toggle button (if present)
  function initToggle(){
    const btn = document.getElementById('theme-toggle');
    if(!btn) return;
    // Clean any existing icon and set icon according to current theme
    btn.innerHTML = '';
    const icon = document.createElement('i');
    icon.className = (root.getAttribute('data-theme') === 'dark') ? 'fas fa-sun' : 'fas fa-moon';
    btn.appendChild(icon);
    btn.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
      // flip icon handled in applyTheme
    });
  }

  // Initialize menu toggle for mobile
  function initMenu(){
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if(navLinks.classList.contains('active')){
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = '';
      });
    });
  }

  // Unified Modal Logic
  const projectData = [
    {
      id: 'modal-1',
      title: 'Sony WH-1000XM5',
      subtitle: 'Blender / After Effects / Substance 3D Sampler',
      coverImg: '../../media/BlackHeadphones.png',
      description: 'Digital asset of a commerical headphone product, modeled in Blender and textured using Substance 3D Sampler. The final presentation was rendered in Blender and animated in After Effects.',
      video: '../../media/SonyHeadphones.mp4',
      gallery: [
        '../../media/WhiteHeadphones.png',
        '../../media/BlackHeadphones.png',
        '../../media/BlackHeadphonesWireframe.png'
      ]
    },
    {
      id: 'modal-2',
      title: 'Creality Drill',
      subtitle: 'Blender / Fusion 360 / Photoshop',
      coverImg: '../../media/DrillOverview.jpg',
      description: 'Drill modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop. A study in hard-surface modeling.',
      video: '../../media/DrillTurntable.mp4',
      gallery: [
        '../../media/DrillOverview.jpg',
        '../../media/DrillDetail.jpg',
        '../../media/DrillOrto.jpg'
      ]
    },
    {
      id: 'modal-3',
      title: 'High Heels',
      subtitle: 'Blender / Substance 3D Sampler / Photoshop',
      coverImg: '../../media/CoverHeels.png',
      description: 'High heels modeled and rendered in Blender, textured in Substance 3D Sampler, with final images composed in Photoshop.',
      video: '../../media/HeelTurntable.mp4',
      gallery: [
        '../../media/BrownHeel.png',
        '../../media/BlackHeel.png',
        '../../media/WhiteHeel.png',
        '../../media/GreenHeel.png'
      ]
    },
    {
      id: 'modal-4',
      title: 'Perfume Bottle',
      subtitle: 'Blender / Fusion 360 / Photoshop',
      coverImg: '../../media/Perfume3.png',
      description: 'Perfume bottle with packaging modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop.',
      gallery: [
        '../../media/Perfume1.png',
        '../../media/Perfume2.png',
        '../../media/Perfume3.png',
      ]
    },
    {
      id: 'modal-5',
      title: 'Impala Rollerskate',
      subtitle: 'Blender / Fusion 360 / Photoshop',
      coverImg: '../../media/Rollerskate.png',
      description: 'Rollerskate modeled in Fusion 360, textured and rendered in Blender, with final images composed in Photoshop.',
      gallery: [
        '../../media/Rollerskate2.png',
        '../../media/RollerskateBack.png',
        '../../media/RollerskateFront.png',
        '../../media/RollerskateWireframe.png'
      ]
    },
    {
      id: 'modal-6',
      title: 'Placeholder',
      subtitle: 'Animation ',
      coverImg: '../../media/WIP.jpg',
      description: 'COMING SOON: This project is currently in development and will be available soon. Stay tuned for updates!',
      gallery: [
      ]
    },
  ];

  function createModalHTML(project){
    return `
      <div id="${project.id}" class="modal">
        <div class="modal-content">
          <span class="close-btn" onclick="closeModal('${project.id}')">&times;</span>
          <div class="modal-header">
            <img src="${project.coverImg}" class="modal-cover-img" alt="${project.title} cover">
          </div>
          <div class="modal-body">
            <h2>${project.title}</h2>
            <span class="modal-subtitle">${project.subtitle}</span>
            <p class="modal-text">${project.description}</p>
            ${project.video ? `
              <div class="video-container">
                <video controls muted loop>
                  <source src="${project.video}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>` : ''}
            ${project.gallery ? `
              <h3>Renders & Wireframes</h3>
              <div class="modal-gallery">
                ${project.gallery.map((img, idx) => `<img src="${img}" alt="Gallery image" class="gallery-img" onclick="openImageViewer('${img}')">`).join('')}
              </div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Global Image Viewer for fullscreen gallery images
  window.openImageViewer = function(imageSrc) {
    const viewer = document.getElementById('image-viewer') || createImageViewer();
    const viewerImg = viewer.querySelector('.viewer-image');
    viewerImg.src = imageSrc;
    viewer.classList.add('active');
    viewer.dataset.modalId = getActiveModalId(); // Store current modal
    document.body.style.overflow = 'hidden';
  };

  window.closeImageViewer = function() {
    const viewer = document.getElementById('image-viewer');
    if(viewer) {
      viewer.classList.remove('active');
      viewer.dataset.modalId = ''; // Clear modal reference
      document.body.style.overflow = 'auto';
    }
  };

  // Get the currently active modal's ID
  function getActiveModalId() {
    const activeModal = document.querySelector('.modal.active');
    return activeModal ? activeModal.id : null;
  }

  function createImageViewer() {
    const viewer = document.createElement('div');
    viewer.id = 'image-viewer';
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
      <div class="viewer-backdrop" onclick="closeImageViewer()"></div>
      <div class="viewer-container">
        <img src="" alt="Fullscreen image" class="viewer-image">
        <button class="viewer-close" onclick="closeImageViewer()">&times;</button>
        <button class="viewer-nav prev" onclick="event.stopPropagation(); navigateImage(-1)">❮</button>
        <button class="viewer-nav next" onclick="event.stopPropagation(); navigateImage(1)">❯</button>
      </div>
    `;
    document.body.appendChild(viewer);
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && viewer.classList.contains('active')) {
        closeImageViewer();
      }
    });
    
    return viewer;
  }

  window.navigateImage = function(direction) {
    const viewer = document.getElementById('image-viewer');
    const modalId = viewer.dataset.modalId;
    
    // Only look for images in the current modal
    const activeModal = document.getElementById(modalId);
    if(!activeModal) return;
    
    const currentSrc = viewer.querySelector('.viewer-image').src;
    const modalGalleryImages = Array.from(activeModal.querySelectorAll('.gallery-img'));
    
    if(modalGalleryImages.length === 0) return;
    
    const currentIndex = modalGalleryImages.findIndex(img => img.src === currentSrc);
    const nextIndex = (currentIndex + direction + modalGalleryImages.length) % modalGalleryImages.length;
    openImageViewer(modalGalleryImages[nextIndex].src);
  };

  function initModals(){
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    projectData.forEach(p => {
      modalContainer.innerHTML += createModalHTML(p);
    });
    document.body.appendChild(modalContainer);

    // Global Modal Functions
    window.openModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if(!modal) return;
      modal.style.display = "block";
      setTimeout(() => modal.classList.add('active'), 10);
      document.body.style.overflow = 'hidden';
    };

    window.closeModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if(!modal) return;
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = "none", 300);
      document.body.style.overflow = 'auto';
    };

    // Close on click outside
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id));
      }
    });
  }

  // Filter Logic (Specific to work.html)
  function initFilters(){
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.work-gallery .project-card');
    
    if(filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize Scroll Reveal
  function initReveal(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
  }

  // Clipboard functionality with notification
  function initClipboard(){
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const contactEmailBtn = document.getElementById('contact-email-copy');
    const notification = document.getElementById('clipboard-notification');
    
    if(!notification) return;

    const copyToClipboard = (e) => {
      e.preventDefault();
      const email = 'angelica.andreasson1@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        // Show notification
        notification.classList.add('show');
        
        // Auto hide after 2 seconds
        setTimeout(() => {
          notification.classList.remove('show');
        }, 2000);
      }).catch(() => {
        console.log('Fallback: Could not copy to clipboard');
      });
    };

    if(copyEmailBtn){
      copyEmailBtn.addEventListener('click', copyToClipboard);
    }

    if(contactEmailBtn){
      contactEmailBtn.addEventListener('click', copyToClipboard);
    }
  }

  // Button click feedback - add clicked state to primary buttons
  function initButtonFeedback(){
    document.querySelectorAll('.primary-btn, button[type="submit"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Only add visual feedback for actual buttons (not form submits which have their own feedback)
        if(btn.classList.contains('primary-btn')){
          btn.classList.add('clicked');
          setTimeout(() => {
            btn.classList.remove('clicked');
          }, 200);
        }
      });
    });
  }

  // Contact form validation feedback
  function initContactForm(){
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if(!form || !formMessage) return;

    form.addEventListener('submit', (e) => {
      // Check if form is valid
      if (!form.checkValidity()) {
        e.preventDefault();
        formMessage.textContent = '❌ Please fill in all required fields.';
        formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        formMessage.style.color = '#c82333';
        formMessage.style.display = 'block';
        return;
      }

      // Show success message
      e.preventDefault();
      formMessage.textContent = '✓ Opening your email client... Your message is ready to send.';
      formMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
      formMessage.style.color = '#28a745';
      formMessage.style.display = 'block';

      // Delay to let user see message, then submit
      setTimeout(() => {
        form.submit();
      }, 1500);
    });
  }

  // Preload pages on hover for instant navigation with cache-on-click
  function initPreload(){
    // Prevent re-initializing listeners on every page swap
    if(window.preloadInitialized) return;
    window.preloadInitialized = true;
    
    // Preload all media assets from HTML
    const preloadAssets = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Preload all images
      doc.querySelectorAll('img').forEach(img => {
        const src = img.src;
        if(src && !assetCache.has(src)) {
          fetch(src)
            .then(response => {
              if(response.ok) {
                assetCache.set(src, true);
                console.log(`  🖼️ Preloaded image: ${src}`);
              }
            })
            .catch(() => {}); // Silently fail for assets
        }
      });
      
      // Preload all video sources
      doc.querySelectorAll('video source').forEach(source => {
        const src = source.src;
        if(src && !assetCache.has(src)) {
          fetch(src, { method: 'HEAD' })
            .then(response => {
              if(response.ok) {
                assetCache.set(src, true);
                console.log(`  🎬 Preloaded video: ${src}`);
              }
            })
            .catch(() => {}); // Silently fail for assets
        }
      });
      
      // Preload background images from CSS
      doc.querySelectorAll('[style*="background-image"]').forEach(el => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
        if(match && match[1]) {
          const src = match[1];
          if(!assetCache.has(src)) {
            fetch(src)
              .then(response => {
                if(response.ok) {
                  assetCache.set(src, true);
                  console.log(`  🎨 Preloaded bg image: ${src}`);
                }
              })
              .catch(() => {}); // Silently fail for assets
          }
        }
      });
    };
    
    // Wait for components to load, then attach preload listeners
    const attachPreloadListeners = () => {
      // Better selector: all internal links (not http/https, not anchors)
      const navLinks = document.querySelectorAll('a:not([href^="http"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
      console.log(`Found ${navLinks.length} internal links to preload`);
      
      navLinks.forEach((link) => {
        // Normalize relative href to absolute URL for consistent cache keys
        const rawHref = link.getAttribute('href');
        const absoluteURL = new URL(rawHref, window.location.href).href;
        
        // Hover to preload
        link.addEventListener('mouseenter', () => {
          // Check if already cached or currently preloading
          if(pageCache.has(absoluteURL) || link.dataset.preloading === 'true') return;
          
          link.dataset.preloading = 'true'; // Flag to prevent concurrent fetches

          fetch(rawHref)
            .then(response => {
              if (!response.ok) throw new Error();
              return response.text();
            })
            .then(html => {
              pageCache.set(absoluteURL, html); // Store under normalized key
              console.log(`✓ Preloaded (Normalized): ${absoluteURL}`);
              
              // Preload all assets from this page
              preloadAssets(html);
            })
            .catch(err => console.warn(`✗ Preload failed: ${absoluteURL}`, err))
            .finally(() => {
              delete link.dataset.preloading;
            });
        }, { once: true }); // Only trigger once per page load
        
        // Click to load from cache
        link.addEventListener('click', (e) => {
          const cachedHTML = pageCache.get(absoluteURL);
          
          if(cachedHTML) {
            e.preventDefault(); // Stop the browser from navigating
            console.log(`⚡ Loading from cache: ${absoluteURL}`);
            
            // Replace entire document with cached HTML
            document.documentElement.innerHTML = cachedHTML;
            
            // Update URL so back button works (use original href, not absoluteURL)
            window.history.pushState({}, '', rawHref);
            
            // Re-initialize all scripts on the new page
            runAllInits();
          }
        });
      });
    };
    
    // Attach listeners when components are loaded
    setTimeout(attachPreloadListeners, 100);
    
    // Store caches in window for inspection
    window.pageCache = pageCache;
    window.assetCache = assetCache;
  }

  // Update Copyright
  function initCopyright(){
    document.querySelectorAll('.copyright').forEach(el => {
      el.textContent = '© ' + new Date().getFullYear() + ' Angelica Andreasson.';
    });
  }

  // Apply stored/default theme
  applyTheme(defaultTheme);

  // Consolidated initialization function
  const runAllInits = () => {
    loadComponents().then(() => {
      initToggle();
      initMenu();
      initModals();
      initReveal();
      initFilters();
      initCopyright();
      initContactForm();
      initClipboard();
      initButtonFeedback();
      initPreload(); // Ensure this always runs
    });
  };

  // Initialize when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', runAllInits);
  } else {
    runAllInits();
  }
})();