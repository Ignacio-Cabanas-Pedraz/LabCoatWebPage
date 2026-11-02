// LabCoat Modern-Minimalist Interactive State Drivers & Hero Grid Animation
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. HERO MUTED GRID WITH ANIMATED NODES & TEXT VIGNETTE
    // ==========================================
    const canvas = document.getElementById('hero-grid-canvas');
    const heroSection = document.getElementById('hero');

    if (canvas && heroSection) {
        const ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let width = 0;
        let height = 0;
        const GRID_SIZE = 48; // Grid cell spacing in px
        let maxGridX = 0;
        let maxGridY = 0;

        function resizeCanvas() {
            dpr = window.devicePixelRatio || 1;
            width = document.documentElement.clientWidth || window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            maxGridX = Math.floor(width / GRID_SIZE);
            maxGridY = Math.floor(height / GRID_SIZE);
        }

        resizeCanvas();

        // Muted, Elegant Node Palette (Soft slate, muted indigo - no loud neons)
        const NODE_COUNT = 20;
        const nodeColors = [
            'rgba(148, 163, 184, 0.55)', // Muted slate 400
            'rgba(100, 116, 139, 0.45)', // Muted slate 500
            'rgba(71, 85, 105, 0.40)',  // Deep slate 600
            'rgba(203, 213, 225, 0.60)', // Slate 300
            'rgba(115, 125, 145, 0.45)'  // Subtle pewter slate
        ];

        class GridNode {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.gx = Math.floor(Math.random() * (maxGridX + 1));
                this.gy = Math.floor(Math.random() * (maxGridY + 1));
                this.pickNextTarget();
                this.progress = initial ? Math.random() : 0;
                this.speed = 0.010 + Math.random() * 0.014; // smooth, steady travel
                this.color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
                this.radius = 2.2 + Math.random() * 1.2;
                this.history = [];
            }

            pickNextTarget() {
                const directions = [
                    { dx: 1, dy: 0 },
                    { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 },
                    { dx: 0, dy: -1 }
                ];
                const validDirs = directions.filter(d => {
                    const nx = this.gx + d.dx;
                    const ny = this.gy + d.dy;
                    return nx >= 0 && nx <= maxGridX && ny >= 0 && ny <= maxGridY;
                });

                if (validDirs.length > 0) {
                    const chosen = validDirs[Math.floor(Math.random() * validDirs.length)];
                    this.tx = this.gx + chosen.dx;
                    this.ty = this.gy + chosen.dy;
                } else {
                    this.tx = this.gx;
                    this.ty = this.gy;
                }
            }

            update() {
                this.progress += this.speed;

                const curX = (this.gx + (this.tx - this.gx) * this.progress) * GRID_SIZE;
                const curY = (this.gy + (this.ty - this.gy) * this.progress) * GRID_SIZE;

                this.history.push({ x: curX, y: curY });
                if (this.history.length > 5) {
                    this.history.shift();
                }

                if (this.progress >= 1) {
                    this.gx = this.tx;
                    this.gy = this.ty;
                    this.progress = 0;
                    this.pickNextTarget();
                }
            }

            draw(context) {
                const curX = (this.gx + (this.tx - this.gx) * this.progress) * GRID_SIZE;
                const curY = (this.gy + (this.ty - this.gy) * this.progress) * GRID_SIZE;

                // Subtle muted trail
                if (this.history.length > 1) {
                    context.beginPath();
                    context.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        context.lineTo(this.history[i].x, this.history[i].y);
                    }
                    context.strokeStyle = this.color.replace('0.55', '0.15').replace('0.65', '0.15').replace('0.45', '0.12').replace('0.50', '0.12');
                    context.lineWidth = 1.75;
                    context.stroke();
                }

                // Node marker
                context.beginPath();
                context.arc(curX, curY, this.radius, 0, Math.PI * 2);
                context.fillStyle = this.color;
                context.shadowColor = this.color;
                context.shadowBlur = 4;
                context.fill();
                context.shadowBlur = 0;
            }
        }

        const nodes = Array.from({ length: NODE_COUNT }, () => new GridNode());

        let animationFrameId = null;
        let isVisible = true;

        function render() {
            if (!isVisible) return;

            // Paint clean white background base
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // 1. Draw Thicker, Crisp Light Grey Grid
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(210, 218, 228, 0.95)'; // Thicker slate grid line
            ctx.lineWidth = 2.5;

            // Vertical lines
            for (let x = 0; x <= width; x += GRID_SIZE) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, height);
            }
            // Horizontal lines
            for (let y = 0; y <= height; y += GRID_SIZE) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(width, y + 0.5);
            }
            ctx.stroke();

            // 2. Draw subtle intersection dots
            ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
            for (let x = 0; x <= width; x += GRID_SIZE) {
                for (let y = 0; y <= height; y += GRID_SIZE) {
                    ctx.beginPath();
                    ctx.arc(x + 0.5, y + 0.5, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 3. Update & Draw Moving Muted Nodes
            nodes.forEach(node => {
                node.update();
                node.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        }

        animationFrameId = requestAnimationFrame(render);

        // Pause animation and hide canvas when scrolled off-screen
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            canvas.style.visibility = isVisible ? 'visible' : 'hidden';
            if (isVisible) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(render);
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        }, { threshold: 0.01 });

        observer.observe(heroSection);

        // Handle window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                nodes.forEach(node => node.reset());
            }, 150);
        });
    }

    // ==========================================
    // 0.5. VERTICAL PROBLEM SHOWCASE WITH SHIFTING TIMER
    // ==========================================
    const problemShowcase = document.getElementById('problem-showcase');
    const problemItems = document.querySelectorAll('.problem-point-item');
    const problemImages = document.querySelectorAll('.problem-image');
    const problemBadgeText = document.getElementById('problem-badge-text');

    if (problemShowcase && problemItems.length > 0) {
        const badgeTitles = [
            "01 • Manual Paper Binders & Logbooks",
            "02 • Isolated Operator & Disconnected Instruments",
            "03 • The Degloving Penalty at Wall Kiosks",
            "04 • Paper Batch Records & ALCOA+ Audit Risks"
        ];

        let currentIndex = 0;
        const STEP_DURATION = 7500; // 7500ms per point (increased 50% for comfortable reading)
        let timerStart = null;
        let isHovered = false;
        let lastProgress = 0;

        function setProblemPoint(index) {
            currentIndex = index;
            timerStart = performance.now();
            lastProgress = 0;

            problemItems.forEach((item, i) => {
                const bar = item.querySelector('.timer-bar');
                const num = item.querySelector('.point-num');
                const title = item.querySelector('.point-title');

                if (i === index) {
                    item.classList.add('is-active', 'opacity-100', 'bg-white', 'shadow-sm', 'border-slate-200/80', 'p-4', 'sm:p-5', 'flex-1');
                    item.classList.remove('opacity-70', 'bg-white/50', 'border-transparent', 'shadow-none', 'px-4', 'py-3.5', 'sm:px-5', 'sm:py-4', 'min-h-[64px]', 'sm:min-h-[68px]', 'flex-none');
                    if (num) {
                        num.classList.remove('text-slate-400');
                        num.classList.add('text-indigo-600');
                    }
                    if (title) {
                        title.classList.remove('text-slate-700', 'font-semibold');
                        title.classList.add('text-slate-900', 'font-bold');
                    }
                } else {
                    item.classList.remove('is-active', 'opacity-100', 'bg-white', 'shadow-sm', 'border-slate-200/80', 'p-4', 'sm:p-5', 'flex-1');
                    item.classList.add('opacity-70', 'bg-white/50', 'border-transparent', 'shadow-none', 'px-4', 'py-3.5', 'sm:px-5', 'sm:py-4', 'min-h-[64px]', 'sm:min-h-[68px]', 'flex-none');
                    if (bar) bar.style.width = '0%';
                    if (num) {
                        num.classList.add('text-slate-400');
                        num.classList.remove('text-indigo-600');
                    }
                    if (title) {
                        title.classList.add('text-slate-700', 'font-semibold');
                        title.classList.remove('text-slate-900', 'font-bold');
                    }
                }
            });

            // Smooth crossfade images
            problemImages.forEach((img, i) => {
                if (i === index) {
                    img.classList.remove('opacity-0', 'z-0');
                    img.classList.add('opacity-100', 'z-10');
                } else {
                    img.classList.remove('opacity-100', 'z-10');
                    img.classList.add('opacity-0', 'z-0');
                }
            });

            if (problemBadgeText && badgeTitles[index]) {
                problemBadgeText.textContent = badgeTitles[index];
            }
        }

        // Click interaction on any point
        problemItems.forEach((item, idx) => {
            item.addEventListener('click', () => {
                setProblemPoint(idx);
            });
        });

        // Hover pause - only stop progress bar when hovering over the text outline, not the images
        const problemList = document.getElementById('problem-list');
        const hoverPauseTarget = problemList || problemShowcase;

        hoverPauseTarget.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        hoverPauseTarget.addEventListener('mouseleave', () => {
            isHovered = false;
            timerStart = performance.now() - (lastProgress * STEP_DURATION);
        });

        function runTimer(now) {
            if (!timerStart) timerStart = now;

            if (!isHovered) {
                const elapsed = now - timerStart;
                lastProgress = Math.min(elapsed / STEP_DURATION, 1);

                const currentItem = problemItems[currentIndex];
                if (currentItem) {
                    const bar = currentItem.querySelector('.timer-bar');
                    if (bar) bar.style.width = (lastProgress * 100) + '%';
                }

                if (lastProgress >= 1) {
                    const nextIndex = (currentIndex + 1) % problemItems.length;
                    setProblemPoint(nextIndex);
                }
            }

            requestAnimationFrame(runTimer);
        }

        // Initialize state
        setProblemPoint(0);
        requestAnimationFrame(runTimer);
    }


    // ==========================================
    // 1. "TIME-EVENTS" SYNCHRONIZED 15-SECOND VIDEO & TIMELINE CONTROLLER
    // ==========================================
    const timeStepButtons = document.querySelectorAll('.time-step-btn');
    const stepPanes = {
        1: document.getElementById('step-pane-1'),
        2: document.getElementById('step-pane-2'),
        3: document.getElementById('step-pane-3')
    };

    const timeVideos = {
        1: document.getElementById('time-video-1'),
        2: document.getElementById('time-video-2'),
        3: document.getElementById('time-video-3')
    };

    const STEP_DURATION = 15.0; // Strictly 15.0 seconds per pill button
    const POINT_INTERVAL = 5.0; // 5.0 seconds per point (0s-5s, 5s-10s, 10s-15s)
    let currentStep = 1;
    let playbackTime = 0.0;
    let isHoverPaused = false;
    let lastAnimFrameTime = null;

    function getActiveVideo() {
        return timeVideos[currentStep];
    }

    function updateCardViews(stepIndex, time) {
        const pane = stepPanes[stepIndex];
        if (!pane) return;

        const cards = pane.querySelectorAll('.event-card-item');
        // Active card: 1 for [0-5s), 2 for [5-10s), 3 for [10-15s]
        const activeCardNum = time < 5.0 ? 1 : (time < 10.0 ? 2 : 3);

        cards.forEach(card => {
            const cardNum = parseInt(card.getAttribute('data-card'));
            const numSpan = card.querySelector('.event-card-num');
            const titleEl = card.querySelector('.event-card-title') || card.querySelector('h4');
            const descEl = card.querySelector('.event-card-desc') || card.querySelector('p');
            const bar = card.querySelector('.card-progress-bar');

            if (cardNum === activeCardNum) {
                // UN-SHADED: Only the selected cell is un-shaded and active
                card.classList.add('is-active', 'border-2', 'border-indigo-600', 'bg-white', 'shadow-sm', 'opacity-100');
                card.classList.remove('border', 'border-slate-200/80', 'border-slate-200/90', 'border-slate-200/60', 'bg-slate-100/70', 'bg-slate-100/80', 'bg-slate-100/90', 'bg-white/80', 'bg-white/40', 'bg-white/90', 'shadow-none', 'shadow-xs', 'opacity-40', 'opacity-45', 'opacity-50', 'opacity-60', 'opacity-90');
                
                if (numSpan) {
                    numSpan.classList.add('text-indigo-600');
                    numSpan.classList.remove('text-slate-400', 'text-slate-500', 'text-slate-600');
                }
                if (titleEl) {
                    titleEl.classList.add('text-slate-900');
                    titleEl.classList.remove('text-slate-500', 'text-slate-400');
                }
                if (descEl) {
                    descEl.classList.add('text-slate-600');
                    descEl.classList.remove('text-slate-400', 'text-slate-500');
                }

                // Progress for active card's 5s window
                const cardStart = (cardNum - 1) * POINT_INTERVAL;
                const progress = Math.min(Math.max((time - cardStart) / POINT_INTERVAL, 0), 1);
                if (bar) {
                    bar.style.width = (progress * 100) + '%';
                }
            } else {
                // GREYED OUT: The other 2 non-selected cells are greyed out
                card.classList.remove('is-active', 'border-2', 'border-indigo-600', 'bg-white', 'shadow-sm', 'opacity-100');
                card.classList.add('border', 'border-slate-200/80', 'bg-slate-100/70', 'shadow-none', 'opacity-45');

                if (numSpan) {
                    numSpan.classList.remove('text-indigo-600', 'text-slate-600');
                    numSpan.classList.add('text-slate-400');
                }
                if (titleEl) {
                    titleEl.classList.remove('text-slate-900');
                    titleEl.classList.add('text-slate-500');
                }
                if (descEl) {
                    descEl.classList.remove('text-slate-600');
                    descEl.classList.add('text-slate-400');
                }
                if (bar) {
                    bar.style.width = '0%';
                }
            }
        });
    }

    function switchStep(step, resetTime = true) {
        currentStep = step;
        if (resetTime) {
            playbackTime = 0.0;
            lastAnimFrameTime = performance.now();
        }

        // Update Pill Buttons
        timeStepButtons.forEach(btn => {
            const btnStep = parseInt(btn.getAttribute('data-step'));
            if (btnStep === currentStep) {
                btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                btn.classList.remove('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
            } else {
                btn.classList.remove('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                btn.classList.add('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
            }
        });

        // Show active pane, hide other panes
        [1, 2, 3].forEach(s => {
            const pane = stepPanes[s];
            const video = timeVideos[s];

            if (pane) {
                if (s === currentStep) {
                    pane.classList.remove('hidden');
                    pane.classList.add('block');
                } else {
                    pane.classList.remove('block');
                    pane.classList.add('hidden');
                }
            }

            if (video) {
                if (s === currentStep) {
                    if (resetTime) {
                        try { video.currentTime = 0; } catch (e) {}
                    }
                    if (!isHoverPaused) {
                        video.play().catch(() => {});
                    }
                } else {
                    try {
                        video.pause();
                        video.currentTime = 0;
                    } catch (e) {}
                }
            }
        });

        updateCardViews(currentStep, playbackTime);
    }

    // Attach click listeners to Scrubber Pills
    timeStepButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const step = parseInt(btn.getAttribute('data-step'));
            switchStep(step, true);
        });
    });

    // Attach click listeners to cards across all panes for instant scrubbing
    [1, 2, 3].forEach(s => {
        const pane = stepPanes[s];
        if (!pane) return;

        const cards = pane.querySelectorAll('.event-card-item');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const cardNum = parseInt(card.getAttribute('data-card'));
                const targetTime = (cardNum - 1) * POINT_INTERVAL;
                playbackTime = targetTime;
                lastAnimFrameTime = performance.now();

                const video = timeVideos[s];
                if (video) {
                    try {
                        video.currentTime = targetTime;
                        if (!isHoverPaused) {
                            video.play().catch(() => {});
                        }
                    } catch (err) {}
                }

                updateCardViews(currentStep, playbackTime);
            });
        });

        // Hover pause on card stacks: allow unlimited comfortable reading
        const cardsStack = pane.querySelector('.step-cards-stack');
        if (cardsStack) {
            cardsStack.addEventListener('mouseenter', () => {
                isHoverPaused = true;
                const video = getActiveVideo();
                if (video && !video.paused) {
                    video.pause();
                }
            });
            cardsStack.addEventListener('mouseleave', () => {
                isHoverPaused = false;
                lastAnimFrameTime = performance.now();
                const video = getActiveVideo();
                if (video && video.paused) {
                    video.play().catch(() => {});
                }
            });
        }
    });

    // Auto-detect when real video file is present and hide placeholder
    Object.values(timeVideos).forEach(video => {
        if (!video) return;
        video.addEventListener('playing', () => {
            const container = video.parentElement;
            const placeholder = container ? container.querySelector('.video-placeholder') : null;
            if (placeholder) placeholder.classList.add('opacity-0');
        });
        video.addEventListener('pause', () => {
            if (video.currentTime === 0 || video.ended) {
                const container = video.parentElement;
                const placeholder = container ? container.querySelector('.video-placeholder') : null;
                if (placeholder) placeholder.classList.remove('opacity-0');
            }
        });
    });

    // Main animation & sync ticker
    function tickShowcase(now) {
        if (!lastAnimFrameTime) lastAnimFrameTime = now;
        // Cap max delta at 0.1s to avoid jump if tab lost focus
        const delta = Math.min((now - lastAnimFrameTime) / 1000.0, 0.1);
        lastAnimFrameTime = now;

        if (!isHoverPaused) {
            const video = getActiveVideo();

            // Only sync to video timecode if valid video is playing and has duration >= 14.5s
            if (video && !video.paused && !video.ended && video.duration >= 14.5 && video.currentTime > 0) {
                playbackTime = video.currentTime;
            } else {
                // Reliable virtual clock running at exactly 1.0x speed
                playbackTime += delta;
            }

            // Exactly 15.0 seconds per pill button before advancing
            if (playbackTime >= STEP_DURATION) {
                const nextStep = (currentStep % 3) + 1;
                switchStep(nextStep, true);
            } else {
                updateCardViews(currentStep, playbackTime);
            }
        }

        requestAnimationFrame(tickShowcase);
    }

    // Initialize showcase
    switchStep(1, true);
    requestAnimationFrame(tickShowcase);


    // ==========================================
    // 2. STATSIG-STYLE METRICS CATEGORY SWITCHER
    // ==========================================
    const metricButtons = document.querySelectorAll('.metric-tab-btn');
    const metricBadge = document.getElementById('metric-badge');
    const metricValue = document.getElementById('metric-value');
    const metricTitle = document.getElementById('metric-title');
    const metricDesc = document.getElementById('metric-desc');

    const metricsData = {
        throughput: {
            badge: 'Cleanroom Throughput',
            value: '+40%',
            title: 'Increase in Active Bench Throughput',
            desc: 'By eliminating the constant degloving penalty and keyboard transcription inside laminar hoods, operators execute protocols smoothly without stepping away from biosafety cabinets.'
        },
        audit: {
            badge: 'Audit Defense Speed',
            value: '< 1 min',
            title: 'Instantaneous Audit Readiness',
            desc: 'Reduce 2 to 3 weeks of grueling paper logbook forensics to instantaneous digital proof. Pull up complete batch records, synchronized video evidence, and electronic signatures with one click.'
        },
        batch: {
            badge: 'Batch Release Speed',
            value: 'Same-Day',
            title: 'Accelerated Batch Release Cycles',
            desc: 'Eliminate multi-day manual QA reconciliation queues. With real-time error detection, immediate deviation alerts, and automated PDF batch records, release cycles shrink from 14 days to same-day.'
        },
        integrity: {
            badge: 'ALCOA+ Data Integrity',
            value: 'Zero-Defect',
            title: 'Cryptographic Compliance by Design',
            desc: 'Every recorded entry is contemporaneously hashed at the edge using SHA-256 and locked to validated NTP timestamps, eliminating FDA Form 483 risk and ensuring unassailable data integrity.'
        }
    };

    if (metricButtons.length > 0) {
        metricButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const metricKey = btn.getAttribute('data-metric');
                const data = metricsData[metricKey];
                if (!data) return;

                metricButtons.forEach(b => {
                    b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                    b.classList.add('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
                });
                btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                btn.classList.remove('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');

                if (metricBadge) metricBadge.textContent = data.badge;
                if (metricValue) metricValue.textContent = data.value;
                if (metricTitle) metricTitle.textContent = data.title;
                if (metricDesc) metricDesc.textContent = data.desc;
            });
        });
    }


    // ==========================================
    // 3. WORKOS-STYLE ELEVATED TESTIMONIAL SWITCHER
    // ==========================================
    const segmentButtons = document.querySelectorAll('.segment-btn');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteRole = document.getElementById('quote-role');

    const quotesData = {
        cdmo: {
            text: '“Before LabCoat, our cleanroom operators spent a third of their shifts degloving to type into stationary computers. LabCoat gave our team their hands back, eliminated paper logbooks, and made our batch records 100% audit-proof on day one.”',
            author: 'Dr. Marcus Vance',
            role: 'VP of Quality Assurance & Manufacturing, Resilience Bio'
        },
        biopharma: {
            text: '“In monoclonal antibody production, a missed signature or undocumented step can scrap a $500,000 batch. LabCoat gives our scientists heads-up protocol certainty and our QA team mathematical proof of compliance.”',
            author: 'Elena Rostova, Ph.D.',
            role: 'Head of Bioprocess Operations, Genentech'
        },
        cellgene: {
            text: '“Autologous cell therapy demands flawless chain of custody. LabCoat’s personal glasses integration binds the operator, patient sample, and reagent lot together with zero cognitive overhead.”',
            author: 'David Kim',
            role: 'Director of Cell Therapy Manufacturing, ElevateBio'
        },
        diagnostics: {
            text: '“We process 10,000 high-complexity clinical assays daily. LabCoat completely eliminated sample transcription errors and cut our technician training ramp time in half.”',
            author: 'Sarah Jenkins, MLS',
            role: 'Laboratory Director, Quest Diagnostics'
        }
    };

    if (segmentButtons.length > 0) {
        segmentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const segmentKey = btn.getAttribute('data-segment');
                const data = quotesData[segmentKey];
                if (!data) return;

                segmentButtons.forEach(b => {
                    b.classList.remove('active', 'border-indigo-600', 'opacity-100', 'text-slate-900');
                    b.classList.add('border-transparent', 'opacity-40', 'hover:opacity-80', 'text-slate-500');
                });
                btn.classList.add('active', 'border-indigo-600', 'opacity-100', 'text-slate-900');
                btn.classList.remove('border-transparent', 'opacity-40', 'hover:opacity-80', 'text-slate-500');

                if (quoteText) quoteText.textContent = data.text;
                if (quoteAuthor) quoteAuthor.textContent = data.author;
                if (quoteRole) quoteRole.textContent = data.role;
            });
        });
    }


    // ==========================================
    // 4. COOKIE CONSENT BANNER & GA4 INTEGRATION
    // ==========================================
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    const MEASUREMENT_ID = 'G-DWBMGLYEZS';

    function initGA() {
        if (!window.gaInitialized) {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', MEASUREMENT_ID);
            window.gaInitialized = true;

            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
            document.head.appendChild(script);
        }
    }

    const consentStatus = localStorage.getItem('cookie_consent');
    if (consentStatus === 'granted') {
        initGA();
    } else if (consentStatus === null && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1200);
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

});
