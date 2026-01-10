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

  // Highlight current page in navigation
  function initActiveNav(){
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a.nav-item');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Check if the link matches the current page
      if (currentPath.includes('/work/') && href.includes('/work/')) {
        link.classList.add('active');
      } else if (currentPath.includes('/about/') && href.includes('/about/')) {
        link.classList.add('active');
      } else if (currentPath.includes('/contact/') && href.includes('/contact/')) {
        link.classList.add('active');
      } else if ((currentPath.includes('/pages/home/') || currentPath.endsWith('Portfolio/') || currentPath.endsWith('Portfolio/index.html')) && href.includes('/home/')) {
        link.classList.add('active');
      }
    });
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
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    
    if(!form || !formMessage || !submitBtn) return;

    // Cooldown time in milliseconds (60 seconds)
    const COOLDOWN_TIME = 60000;
    let lastSubmitTime = localStorage.getItem('lastFormSubmit') ? parseInt(localStorage.getItem('lastFormSubmit')) : 0;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Check if form is valid
      if (!form.checkValidity()) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        formMessage.style.color = '#c82333';
        formMessage.style.display = 'block';
        return;
      }

      // Check cooldown
      const now = Date.now();
      const timeSinceLastSubmit = now - lastSubmitTime;
      
      if (timeSinceLastSubmit < COOLDOWN_TIME) {
        const secondsRemaining = Math.ceil((COOLDOWN_TIME - timeSinceLastSubmit) / 1000);
        formMessage.textContent = `Please wait ${secondsRemaining} seconds before sending another message.`;
        formMessage.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
        formMessage.style.color = '#ffc107';
        formMessage.style.display = 'block';
        return;
      }

      // Confirmation dialog
      const isConfirmed = confirm('Send this message?\n\nPlease review your message before confirming.');
      if (!isConfirmed) {
        formMessage.textContent = '';
        formMessage.style.display = 'none';
        return;
      }

      // Disable button to prevent multiple clicks
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.style.cursor = 'not-allowed';

      // Show sending message
      formMessage.textContent = '⏳ Sending your message...';
      formMessage.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
      formMessage.style.color = '#0056b3';
      formMessage.style.display = 'block';

      // Update last submit time
      localStorage.setItem('lastFormSubmit', now.toString());
      lastSubmitTime = now;

      // Use FormData to capture all form data
      const formData = new FormData(form);
      
      // Submit via fetch to Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          formMessage.textContent = '✓ Message sent successfully! Redirecting...';
          formMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
          formMessage.style.color = '#28a745';
          formMessage.style.display = 'block';
          
          // Redirect to custom thank-you page
          setTimeout(() => {
            window.location.href = 'https://angelicavisuals.github.io/pages/contact/thanks.html';
          }, 1500);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        formMessage.textContent = '❌ Error sending message. Please try again.';
        formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        formMessage.style.color = '#c82333';
        formMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
      });
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
      initActiveNav();
    });
  };

  // Initialize when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', runAllInits);
  } else {
    runAllInits();
  }
})();