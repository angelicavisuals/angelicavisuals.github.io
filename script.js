// Theme toggle script: persists selection in localStorage and respects system preference
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = stored || (prefersDark ? 'dark' : 'light');

  // Load shared navbar and footer from components.html
  function loadComponents(){
    return fetch('components.html')
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
      title: 'Ethereal Shapes',
      subtitle: 'Blender Cycles / Geometry Nodes',
      coverImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      description: 'This project was an exploration of light refraction and procedural geometry. I used Geometry Nodes to create the floating elements and simulated the glass material using a custom shader in Cycles. The goal was to create a calming, abstract loop.',
      video: 'media/SonyHeadphones.mp4',
      gallery: [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      id: 'modal-2',
      title: 'Modern Villa',
      subtitle: 'Unreal Engine 5 / Lumen',
      coverImg: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=1000&auto=format&fit=crop',
      description: 'A visualization of a modern Scandinavian home. This project focused on real-time lighting using UE5\'s Lumen system. I modeled the structure in 3ds Max and assembled the scene in Unreal.',
      gallery: [
        'https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      id: 'modal-3',
      title: 'Neon Flux',
      subtitle: 'Motion Design',
      coverImg: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
      description: 'A motion design project exploring neon color palettes and kinetic typography in looping sequences.'
    },
    {
      id: 'modal-4',
      title: 'Clay Study',
      subtitle: 'Material Study',
      coverImg: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
      description: 'A focused material exploration testing subsurface scattering and micro-surface detail for clay materials.'
    },
    {
      id: 'modal-5',
      title: 'Modern Pavilion',
      subtitle: 'Architectural Visualization',
      coverImg: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1000&auto=format&fit=crop',
      description: 'A study in daylighting and real-time rendering techniques for an open pavilion concept.'
    },
    {
      id: 'modal-6',
      title: 'Glass Forms',
      subtitle: 'Procedural Modeling',
      coverImg: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1000&auto=format&fit=crop',
      description: 'Procedural generation of glass-like geometry with focus on refractive performance and composition.'
    }
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
              <h3>Process & Wireframes</h3>
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
    });
  }
})();