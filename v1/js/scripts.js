// ================================
// NAVIGATION SCROLL EFFECT
// ================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ================================
// MOBILE NAVIGATION TOGGLE
// ================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Skip if it's just "#"
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.05, // Trigger sooner
    rootMargin: '0px 0px -20px 0px' // Slightly less restrictive
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);



// Add fade-in class to elements on page load
window.addEventListener('DOMContentLoaded', () => {
    // Feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    // CTA cards
    document.querySelectorAll('.cta-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// ================================
// FORM HANDLING
// ================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    // Handle Auto-fill buttons
    document.querySelectorAll('[data-interest]').forEach(button => {
        button.addEventListener('click', (e) => {
            const interestType = button.getAttribute('data-interest');
            const interestSelect = document.getElementById('interest');

            if (interestSelect) {
                // Determine target ID based on href or default to contact field
                // But we mainly just want to focus the select box
                interestSelect.value = interestType;

                // Optional: Flash the field to indicate change
                interestSelect.style.borderColor = 'var(--color-primary)';
                setTimeout(() => {
                    interestSelect.style.borderColor = '';
                }, 1000);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    });
}

// ================================
// PARALLAX EFFECT FOR HERO
// ================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ================================
// STATS COUNTER ANIMATION
// ================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat numbers when visible
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const text = stat.textContent;
                    const hasMultiplier = text.includes('x');
                    const hasPercentage = text.includes('%');
                    const hasPlus = text.includes('+');

                    // Extract number
                    let number = parseFloat(text.replace(/[^0-9.]/g, ''));

                    if (!isNaN(number) && number > 0 && number < 100) {
                        stat.textContent = '0';

                        setTimeout(() => {
                            const duration = 2000;
                            const increment = number / (duration / 16);
                            let current = 0;

                            const timer = setInterval(() => {
                                current += increment;

                                if (current >= number) {
                                    let finalText = hasPercentage ? number + '%' :
                                        hasMultiplier ? number + 'x' :
                                            hasPlus ? number + '+' : number;
                                    stat.textContent = finalText;
                                    clearInterval(timer);
                                } else {
                                    let displayText = Math.floor(current * 10) / 10;
                                    stat.textContent = hasPercentage ? displayText + '%' :
                                        hasMultiplier ? displayText + 'x' :
                                            hasPlus ? Math.floor(displayText) + '+' :
                                                displayText;
                                }
                            }, 16);
                        }, 200);
                    }
                });

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ================================
// DUPLICATE MARQUEE CONTENT FOR INFINITE SCROLL
// ================================
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
}

// ================================
// FORM INPUT ANIMATIONS
// ================================
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    // Remove placeholder to enable label animation
    input.setAttribute('placeholder', ' ');

    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });

// Lazy load images when implemented
// document.addEventListener('DOMContentLoaded', () => {
//     const lazyImages = document.querySelectorAll('img[data-src]');
//     
//     const imageObserver = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.src = img.dataset.src;
//                 img.removeAttribute('data-src');
//                 imageObserver.unobserve(img);
//             }
//         });
//     });
//     
//     lazyImages.forEach(img => imageObserver.observe(img));
// });

// ================================
// CONSOLE MESSAGE (Optional)
// ================================
console.log('%cLabCoat AI', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cYour Personal Laboratory Teacher', 'font-size: 14px; color: #64748b;');
console.log('%cYour Personal Laboratory Teacher', 'font-size: 14px; color: #64748b;');
// console.log('Interested in joining our mission? Contact us via the form.');

// ================================
// LIGHTBOX FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.getElementById('lightbox-media-container');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (!lightbox || !triggers.length) return;

    // Open Lightbox
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const type = trigger.getAttribute('data-type');
            const src = trigger.getAttribute('data-src');

            lightboxContainer.innerHTML = ''; // Clear previous content

            if (type === 'video') {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '90vh';
                lightboxContainer.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                lightboxContainer.appendChild(img);
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightboxContainer.innerHTML = ''; // Clear content to stop video
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close on click outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
