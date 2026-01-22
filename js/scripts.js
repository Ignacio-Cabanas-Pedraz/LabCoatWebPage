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
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should fade in
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Add fade-in class to elements on page load
window.addEventListener('DOMContentLoaded', () => {
    // Feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });
    
    // CTA cards
    document.querySelectorAll('.cta-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ================================
// FORM HANDLING
// ================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your backend
        // For now, we'll just show the success message
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Log form data (remove in production)
            console.log('Form submitted:', data);
            
            // Optional: Send to Netlify Forms
            // The form will automatically work with Netlify if you add:
            // - name="contact" attribute to the form
            // - data-netlify="true" attribute to the form
            // - a hidden input: <input type="hidden" name="form-name" value="contact">
            
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
console.log('Interested in joining our mission? Contact: ignacio.cabanas.p@gmail.com');
