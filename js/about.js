/**
 * IT Training Center — About Page Interactive Animations & Styles
 * Pure JavaScript using Web Animations API and CSS-in-JS dynamic injection
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Dynamic Animation Styles directly via JS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Smooth Scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Animation Keyframes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.92);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 4px 14px 0 rgba(124, 62, 129, 0.39);
            }
            50% {
                box-shadow: 0 6px 20px 0 rgba(124, 62, 129, 0.6);
            }
        }

        /* Classes added dynamically by Observer */
        .js-animate-hidden {
            opacity: 0;
            will-change: transform, opacity;
        }

        .js-animate-fade-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .js-animate-scale {
            animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Dynamic hover glow on back to top button */
        .back-to-top-glow {
            animation: pulseGlow 3s infinite ease-in-out;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .back-to-top-glow:hover {
            transform: translateY(-4px) scale(1.08);
        }

        /* Smooth card hover lift effect */
        .interactive-card {
            transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
        }

        .interactive-card:hover {
            transform: translateY(-6px);
        }
    `;
    document.head.appendChild(styleSheet);

    // 2. Target Elements for Animations
    const heroContent = document.querySelector('main > div:first-child > div');
    const heroImage = document.querySelector('main > div:first-child > img');
    const missionVisionCards = document.querySelectorAll('main > div.grid-cols-2 > div');
    const learningApproachCards = document.querySelectorAll('main > div.grid-cols-3 > div');
    const facilitySection = document.querySelector('section.bg-white');
    const ctaBanner = document.querySelector('section.bg-\\[\\#01366F\\]');
    const backToTopBtn = document.querySelector('a[href="#top"]');
    const header = document.querySelector('header');

    // 3. Scroll Header Shadow Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        // Toggle Back-To-Top visibility smoothly
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        }
    });

    // Style Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.classList.add('back-to-top-glow');
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // 4. Scroll-Triggered Reveal Animation Engine
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const animationType = target.dataset.animation || 'js-animate-fade-up';
                const delay = target.dataset.delay || 0;

                setTimeout(() => {
                    target.classList.remove('js-animate-hidden');
                    target.classList.add(animationType);
                }, delay);

                observer.unobserve(target); // Animate only once
            }
        });
    }, observerOptions);

    // Helper to register elements with observers
    const animateElement = (el, animationType = 'js-animate-fade-up', delay = 0) => {
        if (!el) return;
        el.classList.add('js-animate-hidden');
        el.dataset.animation = animationType;
        el.dataset.delay = delay;
        revealOnScroll.observe(el);
    };

    // 5. Apply Animations to Sections
    animateElement(heroContent, 'js-animate-fade-up', 0);
    animateElement(heroImage, 'js-animate-scale', 200);

    missionVisionCards.forEach((card, index) => {
        card.classList.add('interactive-card');
        animateElement(card, 'js-animate-fade-up', index * 150);
    });

    learningApproachCards.forEach((card, index) => {
        card.classList.add('interactive-card');
        animateElement(card, 'js-animate-fade-up', index * 150);
    });

    animateElement(facilitySection, 'js-animate-scale', 100);
    animateElement(ctaBanner, 'js-animate-fade-up', 100);

    // 6. Fix for HTML mobile menu toggle close on link click
    const mobileMenuLinks = document.querySelectorAll('header nav a, header .md\\:hidden a');
    const menuToggle = document.getElementById('menu-toggle');

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
});