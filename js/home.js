/**
 * Main Animation & Interaction Script
 * Operates purely on the existing HTML structure.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DYNAMIC STYLES & ANIMATION KEYFRAMES
  // Inject required CSS rules dynamically
  // ==========================================
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* Initial state for scroll reveal elements */
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    /* Visible state for scroll reveal elements */
    .reveal-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* Smooth scroll behavior for the back-to-top button and anchor links */
    html {
      scroll-behavior: smooth;
    }

    /* Floating / Pulsing effect for interactive elements */
    @keyframes subtlePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }

    /* Ripple effect animation for buttons */
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.35);
      transform: scale(0);
      animation: rippleAnimation 0.6s linear;
      pointer-events: none;
    }

    @keyframes rippleAnimation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // ==========================================
  // 2. SCROLL REVEAL ANIMATIONS
  // Attaches IntersectionObserver to cards & headers
  // ==========================================
  const revealTargets = Array.from(document.querySelectorAll(`
    main section h2,
    main section > div > p,
    main section .grid > div,
    main section img
  `));

  revealTargets.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger entrance delay for grid items
        const delay = (index % 4) * 120;
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealTargets.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 3. ANIMATED NUMBER COUNTERS
  // Animates stats numbers (1200+, 6, 30) on reveal
  // ==========================================
  const statElements = document.querySelectorAll('main section b.text-3xl');

  const animateCounter = (el) => {
    const rawText = el.innerText.trim();
    const targetNumber = parseInt(rawText.replace(/\D/g, ''), 10);
    const hasPlus = rawText.includes('+');

    if (isNaN(targetNumber)) return;

    let start = 0;
    const duration = 1800; // Total animation duration in ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetNumber / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        el.innerText = `${targetNumber}${hasPlus ? '+' : ''}`;
        clearInterval(timer);
      } else {
        el.innerText = `${Math.floor(start)}${hasPlus ? '+' : ''}`;
      }
    }, stepTime);
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => statObserver.observe(el));

  // ==========================================
  // 4. BUTTON RIPPLE EFFECT ON CLICK
  // Applies a click ripple to action buttons
  // ==========================================
  const buttons = document.querySelectorAll('a[class*="bg-[#"], a[class*="bg-white"]');
  
  buttons.forEach(button => {
    // Ensure relative positioning for ripple containment
    const currentStyle = window.getComputedStyle(button);
    if (currentStyle.position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = button.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);
    });
  });

  // ==========================================
  // 5. SMOOTH BACK-TO-TOP BUTTON BEHAVIOR
  // Fades back-to-top button in/out based on scroll
  // ==========================================
  const backToTopBtn = document.querySelector('a[href="#top"]');
  if (backToTopBtn) {
    backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
        backToTopBtn.style.transform = 'translateY(10px)';
      }
    });
  }
});