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
    const problemTimerIndicator = document.getElementById('problem-timer-indicator');

    if (problemShowcase && problemItems.length > 0) {
        const badgeTitles = [
            "01 • Manual Paper Binders & Logbooks",
            "02 • Isolated Operator & Disconnected Instruments",
            "03 • The Degloving Penalty at Wall Kiosks",
            "04 • Paper Batch Records & ALCOA+ Audit Risks"
        ];

        let currentIndex = 0;
        const STEP_DURATION = 5000; // 5000ms per point
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
                const desc = item.querySelector('.point-desc');

                if (i === index) {
                    item.classList.remove('opacity-50', 'bg-white/40');
                    item.classList.add('opacity-100', 'bg-white', 'shadow-sm', 'border-slate-200/80');
                    if (num) {
                        num.classList.remove('text-slate-400');
                        num.classList.add('text-indigo-600');
                    }
                    if (title) {
                        title.classList.remove('text-slate-700', 'font-semibold');
                        title.classList.add('text-slate-900', 'font-bold');
                    }
                    if (desc) {
                        desc.classList.remove('text-slate-500');
                        desc.classList.add('text-slate-600');
                    }
                } else {
                    item.classList.add('opacity-50', 'bg-white/40');
                    item.classList.remove('opacity-100', 'bg-white', 'shadow-sm', 'border-slate-200/80');
                    if (bar) bar.style.width = '0%';
                    if (num) {
                        num.classList.add('text-slate-400');
                        num.classList.remove('text-indigo-600');
                    }
                    if (title) {
                        title.classList.add('text-slate-700', 'font-semibold');
                        title.classList.remove('text-slate-900', 'font-bold');
                    }
                    if (desc) {
                        desc.classList.add('text-slate-500');
                        desc.classList.remove('text-slate-600');
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
            if (problemTimerIndicator) problemTimerIndicator.textContent = "Paused";
        });

        hoverPauseTarget.addEventListener('mouseleave', () => {
            isHovered = false;
            timerStart = performance.now() - (lastProgress * STEP_DURATION);
            if (problemTimerIndicator) problemTimerIndicator.textContent = "Auto-cycling";
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
    // 1. "TIME-EVENTS" MULTI-WINDOW STATE CONTROLLER
    // ==========================================
    const timeStepButtons = document.querySelectorAll('.time-step-btn');
    const arHud = document.getElementById('ar-hud-content');
    const ledger = document.getElementById('ledger-content');
    const lims = document.getElementById('lims-content');

    const timeEventStates = {
        1: {
            ar: `
                <div class="flex items-center justify-between text-indigo-900 pb-2 border-b border-slate-200 font-semibold">
                    <span>STEP 04: BUFFER ADDITION</span>
                    <span class="text-emerald-600 font-bold">TARGET LOCKED</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg border border-emerald-500/40 space-y-1.5">
                    <div class="flex justify-between text-emerald-800 font-semibold">
                        <span>[QR: LOT-4491-B]</span>
                        <span class="text-emerald-700">PASS (EXP: 2027-11)</span>
                    </div>
                    <div class="text-slate-600 text-[11px]">Reagent: High-Affinity Elution Buffer B</div>
                    <div class="text-slate-500 text-[11px]">Vol: 50.0 mL • Storage: 4°C Verified</div>
                </div>
                <div class="text-slate-500 text-xs flex items-center justify-between pt-1">
                    <span>Reticle: Stable on Workstation</span>
                    <span class="text-indigo-600 font-medium animate-pulse">Ready for trigger</span>
                </div>
            `,
            ledger: `
                <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div class="flex justify-between font-semibold text-slate-800">
                        <span>EVT-90412-A</span>
                        <span class="text-slate-500">10:14:02.102 UTC</span>
                    </div>
                    <div class="text-slate-600">ACTION: SCAN_VERIFIED</div>
                    <div class="text-slate-500 text-[10px]">LOT-4491-B verified against approved SOP recipe.</div>
                    <div class="text-[10px] text-indigo-600 truncate">HASH: 4b29c910fa8e018a...</div>
                </div>
                <div class="p-3 bg-white rounded-lg border border-dashed border-slate-300 text-slate-400 text-center py-4">
                    Awaiting operator wristband sign-off...
                </div>
            `,
            lims: `
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold text-slate-800">Inventory Status</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-700 font-semibold border border-amber-200">HOLD APPLIED</span>
                    </div>
                    <div class="text-slate-600 text-xs">Reagent B (500mL Bottle #12) marked in active use by Dr. Thorne in Cleanroom A.</div>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div class="font-semibold text-slate-800">Room Status: Cleanroom A</div>
                    <div class="text-slate-500 text-xs">ISO 7 • Temp: 20.4°C • Differential: 18.2 Pa</div>
                </div>
            `
        },
        2: {
            ar: `
                <div class="flex items-center justify-between text-indigo-900 pb-2 border-b border-slate-200 font-semibold">
                    <span>STEP 04: E-SIGNATURE</span>
                    <span class="text-emerald-600 font-bold">HASH COMMITTED</span>
                </div>
                <div class="p-3 bg-indigo-50/70 rounded-lg border border-indigo-400 space-y-1.5">
                    <div class="flex justify-between text-indigo-950 font-semibold">
                        <span>OPERATOR PIN: [****]</span>
                        <span class="text-emerald-600 font-bold">AUTHENTICATED</span>
                    </div>
                    <div class="text-slate-700 text-[11px]">Wristband click confirmed. E-Signature stamped.</div>
                    <div class="text-indigo-700 text-[11px] font-medium">5s Pre/Post Dashcam Clip Cached.</div>
                </div>
                <div class="text-slate-500 text-xs flex items-center justify-between pt-1">
                    <span>Local PGlite: Written (&lt;0.8ms)</span>
                    <span class="text-indigo-600 font-medium">Syncing to Cloud...</span>
                </div>
            `,
            ledger: `
                <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div class="flex justify-between font-semibold text-slate-800">
                        <span>EVT-90412-A</span>
                        <span class="text-slate-500">10:14:02.102 UTC</span>
                    </div>
                    <div class="text-slate-600">ACTION: SCAN_VERIFIED</div>
                    <div class="text-[10px] text-indigo-600 truncate">HASH: 4b29c910fa8e018a...</div>
                </div>
                <div class="p-3 bg-indigo-50/70 rounded-lg border-2 border-indigo-500 space-y-1">
                    <div class="flex justify-between font-semibold text-indigo-950">
                        <span>EVT-90413-B</span>
                        <span class="text-indigo-700">10:14:03.204 UTC</span>
                    </div>
                    <div class="text-indigo-900 font-bold">ACTION: 21_CFR_PART_11_SIGNOFF</div>
                    <div class="text-slate-600 text-[10px]">Reason: "Step completed in sterile biosafety hood"</div>
                    <div class="text-[10px] text-indigo-700 font-bold truncate">SHA-256: 8f4a102c91b8a7f4...</div>
                </div>
            `,
            lims: `
                <div class="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold text-indigo-950">Central LIMS Bridge</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-semibold">EVENT RECEIVED</span>
                    </div>
                    <div class="text-slate-700 text-xs">Batch Record #BTH-2026-09 Step 04 marked COMPLETED with dual-factor verification.</div>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div class="font-semibold text-slate-800">Evidence S3 Video Pipeline</div>
                    <div class="text-slate-500 text-xs">Streaming WebM chunk: <code>video_bth_step04.webm</code></div>
                </div>
            `
        },
        3: {
            ar: `
                <div class="flex items-center justify-between text-emerald-800 pb-2 border-b border-slate-200 font-semibold">
                    <span>STEP 04: VERIFIED</span>
                    <span class="text-white bg-emerald-600 px-2 py-0.5 rounded text-[10px] font-semibold">NEXT STEP READY</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <div class="text-slate-700 font-semibold">Advancing to Step 05:</div>
                    <div class="text-indigo-600 text-xs font-bold">"Incubate reaction vessel at 37°C for 45 min"</div>
                    <div class="text-slate-500 text-[11px]">Timer and incubator telemetry auto-synced.</div>
                </div>
                <div class="text-emerald-600 text-xs font-medium flex items-center justify-between pt-1">
                    <span>Global Sync: 100% Up to Date</span>
                    <span class="font-semibold">Zero Data Loss</span>
                </div>
            `,
            ledger: `
                <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex justify-between">
                    <span>EVT-90412-A • SCAN_VERIFIED</span>
                    <span class="text-emerald-600 font-semibold">SYNCHRONIZED</span>
                </div>
                <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex justify-between">
                    <span>EVT-90413-B • E-SIGNATURE</span>
                    <span class="text-emerald-600 font-semibold">SYNCHRONIZED</span>
                </div>
                <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-300 space-y-1">
                    <div class="flex justify-between font-semibold text-emerald-950">
                        <span>EVT-90414-C</span>
                        <span class="text-emerald-700">10:14:03.882 UTC</span>
                    </div>
                    <div class="text-emerald-900 font-bold">ACTION: BATCH_GENEALOGY_LINKED</div>
                    <div class="text-[10px] text-slate-600">Lot LOT-4491-B permanently bound to Batch #BTH-2026-09.</div>
                </div>
            `,
            lims: `
                <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold text-emerald-950">LIMS Inventory Updated</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-600 text-white font-semibold">RECONCILED</span>
                    </div>
                    <div class="text-emerald-900 text-xs">Bottle #12 deducted: <strong>-50.0 mL</strong>. Current balance: 450.0 mL.</div>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div class="font-semibold text-slate-800">Locked PDF Audit Record</div>
                    <div class="text-slate-500 text-xs">Batch certificate compiled with 21 CFR Part 11 electronic seal.</div>
                </div>
            `
        }
    };

    function updateTimeState(step) {
        if (!timeEventStates[step]) return;

        timeStepButtons.forEach(btn => {
            const btnStep = parseInt(btn.getAttribute('data-step'));
            if (btnStep === step) {
                btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                btn.classList.remove('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
            } else {
                btn.classList.remove('bg-slate-900', 'text-white', 'shadow-sm', 'border-slate-900');
                btn.classList.add('bg-white', 'text-slate-600', 'hover:text-slate-900', 'border-slate-200');
            }
        });

        if (arHud) arHud.innerHTML = timeEventStates[step].ar;
        if (ledger) ledger.innerHTML = timeEventStates[step].ledger;
        if (lims) lims.innerHTML = timeEventStates[step].lims;
    }

    if (timeStepButtons.length > 0) {
        timeStepButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const step = parseInt(btn.getAttribute('data-step'));
                updateTimeState(step);
            });
        });

        updateTimeState(1);
    }


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
