document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Text Animation Logic ---
    const textWrapper = document.querySelector('.animated-word-wrapper');
    const textTrack = document.querySelector('.animated-word-track');
    const words = document.querySelectorAll('.animated-word-track .word');

    if (textWrapper && textTrack && words.length > 0) {
        let currentWordIndex = 0;
        const totalWords = words.length;

        // Initialize width to the first word
        function updateWordWidth() {
            const currentWord = words[currentWordIndex];
            // Get precise width of the current word now that CSS flex-start prevents stretching
            const width = currentWord.getBoundingClientRect().width;
            textWrapper.style.width = `${width}px`;
        }

        // Initial setup - Wait briefly for fonts to render before measuring
        setTimeout(() => {
            updateWordWidth();
            textWrapper.style.visibility = 'visible'; // Prevent FOUC if hidden in CSS
        }, 100);

        setInterval(() => {
            currentWordIndex++;

            // If we've reached the duplicated first word (the last element)
            if (currentWordIndex === totalWords) {
                // Instantly jump back to the REAL first word without animation
                textTrack.style.transition = 'none';
                textTrack.style.transform = `translateY(0)`;
                currentWordIndex = 0;
                updateWordWidth();

                // Force reflow
                void textTrack.offsetWidth;

                // Move to the second word naturally with animation
                currentWordIndex = 1;
                textTrack.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            }

            const percentOffset = (currentWordIndex / totalWords) * 100;
            textTrack.style.transform = `translateY(-${percentOffset}%)`;
            updateWordWidth();

        }, 1500); // Change word every 1.5 seconds
    }


    // --- Tab switching auto-progress logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    let tabTimer;
    const TAB_DURATION = 5000;

    function activateTab(index) {
        // Remove active class from all buttons and panels, force reflow to restart CSS transitions
        tabBtns.forEach(b => {
            b.classList.remove('active');
            void b.offsetWidth; // force reflow
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to newly selected tab
        if (tabBtns[index]) {
            const btn = tabBtns[index];
            btn.classList.add('active');

            // Find and show the target panel
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Reset and start timer for next tab
            clearTimeout(tabTimer);
            tabTimer = setTimeout(() => {
                const nextIndex = (index + 1) % tabBtns.length;
                activateTab(nextIndex);
            }, TAB_DURATION);
        }
    }

    if (tabBtns.length > 0) {
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                activateTab(index);
            });
        });

        // Start rotation with the first tab
        activateTab(0);
    }

    // --- Cookie Consent Logic ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    const MEASUREMENT_ID = 'G-DWBMGLYEZS'; // Live GA4 ID

    // Initialize Google Analytics if consent was previously given
    function initGA() {
        if (!window.gaInitialized) {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', MEASUREMENT_ID);
            window.gaInitialized = true;

            // Inject script tag
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
            document.head.appendChild(script);
        }
    }

    // Check localStorage for previous consent
    const consentStatus = localStorage.getItem('cookie_consent');

    if (consentStatus === 'granted') {
        initGA();
    } else if (consentStatus === null && cookieBanner) {
        // Show banner if no choice has been made yet, with a small delay for smooth intro
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'granted');
            if (cookieBanner) cookieBanner.classList.remove('show');
            initGA();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'denied');
            if (cookieBanner) cookieBanner.classList.remove('show');
        });
    }

    // --- Custom GA4 Event Tracking ---
    // Helper function to safely send events only if GA is initialized
    function sendGAEvent(eventName, eventParams) {
        if (window.gaInitialized && typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        }
    }

    // 1. Track Tab Clicks (Audience Intent)
    if (tabBtns.length > 0) {
        tabBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                // Ensure it was a manual click by checking `isTrusted` (true for user clicks, false for JS simulated clicks)
                if (e.isTrusted) {
                    const tabName = btn.textContent.trim();
                    sendGAEvent('tab_click', {
                        'tab_name': tabName,
                        'event_category': 'Engagement',
                        'event_label': 'Audience Intent Tab'
                    });
                }
            });
        });
    }

    // 2. Track Form Submissions (Lead Generation)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            const interestField = form.querySelector('select[name="interest"]');
            const interestValue = interestField ? interestField.value : 'unknown';

            sendGAEvent('form_submission', {
                'form_interest': interestValue,
                'event_category': 'Conversion',
                'event_label': 'Letter of Intent Form'
            });
        });
    });

    // 3. Track CTA Clicks (Button Clicks)
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(btn => {
        // Exclude the cookie banner buttons from this general tracking
        if (btn.id !== 'accept-cookies' && btn.id !== 'decline-cookies' && btn.type !== 'submit') {
            btn.addEventListener('click', () => {
                const buttonText = btn.textContent.trim();
                const buttonHref = btn.getAttribute('href') || 'No Link';

                sendGAEvent('cta_click', {
                    'button_text': buttonText,
                    'button_link': buttonHref,
                    'event_category': 'Engagement',
                    'event_label': 'Call to Action'
                });
            });
        }
    });

});
