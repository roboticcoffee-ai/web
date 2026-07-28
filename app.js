/* Interactive Logic for Adam & Eve Robotic Coffee Landing Page */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- HEADER SCROLL ACTION ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Burger animation
      const bars = mobileToggle.querySelectorAll('.bar');
      if (!isExpanded) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        const bars = mobileToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  });


  // --- LEAD FORM SUBMISSION ---
  const leadForm = document.getElementById('leadForm');
  const formFeedback = document.getElementById('formFeedback');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      
      // Visual feedback
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Clear inputs
        leadForm.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (formFeedback) {
          formFeedback.textContent = 'Thank you! Our partnership team will contact you shortly.';
          formFeedback.className = 'form-feedback success';
          
          // Clear message after 5 seconds
          setTimeout(() => {
            formFeedback.textContent = '';
          }, 5000);
        }
      }, 1500);
    });
  }

  // --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
  const animElements = document.querySelectorAll('.scroll-anim');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer is not supported
    animElements.forEach(el => el.classList.add('active'));
  }

  // --- GALLERY CAROUSEL SYSTEM ---
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryWrapper = document.querySelector('.gallery-wrapper');

  if (galleryPrev && galleryNext && galleryWrapper) {
    const scrollOffset = 504; // 480px item width + 24px gap
    galleryPrev.addEventListener('click', () => {
      galleryWrapper.scrollBy({
        left: -scrollOffset,
        behavior: 'smooth'
      });
    });
    galleryNext.addEventListener('click', () => {
      galleryWrapper.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    });
  }

  // --- HERO VIDEO BACKGROUND SOUND TOGGLE ---
  const heroVideo = document.getElementById('heroVideo');
  const soundToggle = document.getElementById('soundToggle');
  const soundIconOn = document.querySelector('.sound-icon-on');
  const soundIconOff = document.querySelector('.sound-icon-off');
  const soundText = document.querySelector('.sound-text');

  if (heroVideo && soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        if (soundText) soundText.textContent = 'Sound On';
      } else {
        heroVideo.muted = true;
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
        if (soundText) soundText.textContent = 'Sound Off';
      }
    });
  }
});
