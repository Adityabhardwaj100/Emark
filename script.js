/* ============================================
   EMARK AI SOLUTIONS - INTERACTIVE JAVASCRIPT
   Gen Z Aesthetic Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules

    initHeaderScroll();
    initCounterAnimation();
    initRevealAnimations();
    initMagneticButtons();
    initSmoothScroll();
    initBarAnimations();
    initTiltEffect();
});



/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ============================================
   REVEAL ANIMATIONS ON SCROLL
   ============================================ */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .service-card, .impact-card, .process-step, .pricing-card, .industry-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   BAR FILL ANIMATIONS
   ============================================ */
function initBarAnimations() {
    const bars = document.querySelectorAll('.bar-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
                barObserver.unobserve(bar);
            }
        });
    }, observerOptions);

    bars.forEach(bar => barObserver.observe(bar));
}

/* ============================================
   3D TILT EFFECT
   ============================================ */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ============================================
   PARALLAX EFFECT FOR ORBS
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.orb');

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        // Toggle mobile menu visibility
        if (navLinks) {
            navLinks.classList.toggle('mobile-open');
        }
    });
}

/* ============================================
   TYPING EFFECT (Optional Enhancement)
   ============================================ */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ============================================
   PRELOADER (Optional)
   ============================================ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero .animate-slide-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

/* ============================================
   EASTER EGG: Konami Code
   ============================================ */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
