// Theme toggle script: persists selection in localStorage and respects system preference
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = stored || (prefersDark ? 'dark' : 'light');

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
      description: 'This project was an exploration of light refraction and procedural geometry using Geometry Nodes to create floating elements.',
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
      subtitle: 'Visualization / Blender',
      coverImg: '../../media/DrillOverview.jpg',
      description: 'A visualization of a modern Scandinavian home. This project focused on real-time lighting using UE5\'s Lumen system. I modeled the structure in 3ds Max and assembled the scene in Unreal.',
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
      subtitle: 'Visualization / Blender',
      coverImg: '../../media/CoverHeels.png',
      description: 'A motion design project exploring neon color palettes and kinetic typography in looping sequences.',
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
      subtitle: 'Visualization / Blender',
      coverImg: '../../media/Perfume3.png',
      description: 'A focused material exploration testing subsurface scattering and micro-surface detail for clay materials.',
      gallery: [
        '../../media/Perfume1.png',
        '../../media/Perfume2.png',
        '../../media/Perfume3.png',
      ]
    },
    {
      id: 'modal-5',
      title: 'Impala Rollerskate',
      subtitle: 'Visualization / Blender',
      coverImg: '../../media/Rollerskate.png',
      description: 'A study in daylighting and real-time rendering techniques for an open pavilion concept.',
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
                ${project.gallery.map(img => `<img src="${img}" alt="Gallery image">`).join('')}
              </div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

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
    const pageCache = new Map();
    
    // Wait for components to load, then attach preload listeners
    const attachPreloadListeners = () => {
      const navLinks = document.querySelectorAll('a[href*="pages/"]');
      console.log(`Found ${navLinks.length} page links to preload`);
      
      navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          
          // Skip if already cached
          if(pageCache.has(href)) {
            console.log(`↻ Already cached: ${href}`);
            return;
          }
          
          // Fetch and cache the page HTML
          fetch(href)
            .then(response => response.text())
            .then(html => {
              pageCache.set(href, html);
              console.log(`✓ Preloaded: ${href}`);
            })
            .catch(err => console.warn(`✗ Preload failed for ${href}:`, err));
        });
        
        // Intercept clicks to load from cache instantly
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          const cachedHTML = pageCache.get(href);
          
          if(cachedHTML) {
            e.preventDefault();
            console.log(`⚡ Loading from cache: ${href}`);
            
            // Replace page content instantly
            document.documentElement.innerHTML = cachedHTML;
            
            // Update URL without reload
            window.history.pushState({}, '', href);
            
            // Re-initialize scripts on new page
            setTimeout(() => {
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
                attachPreloadListeners(); // Re-attach for new page links
              });
            }, 50);
          }
        });
      });
    };
    
    // Attach listeners when components are loaded
    setTimeout(attachPreloadListeners, 100);
    
    // Store cache in window for inspection
    window.pageCache = pageCache;
  }

  // Update Copyright
  function initCopyright(){
    document.querySelectorAll('.copyright').forEach(el => {
      el.textContent = '© ' + new Date().getFullYear() + ' Angelica Andreasson.';
    });
  }

  // Apply stored/default theme
  applyTheme(defaultTheme);

  // Initialize when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
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
      });
    });
  } else {
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
      initPreload();
    });
  }
})();