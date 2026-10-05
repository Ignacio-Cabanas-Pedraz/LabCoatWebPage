# LabCoat: Modern-Minimalist Website Specification & Layout Guide
> **Design Influences:** Benchling (Scientific Hero Split) • Claude Product Overview (Numbered Editorial Pillars) • Statsig (Tabbed Data Metrics & Masonry Proof) • WorkOS (Elevated Floating Cards & Logo Switcher) • Clay (High-Density Multi-Window Event Flows)  
> **Core Concept:** Modern-Minimalist with synchronized "Time-Events" across multiple product windows.  
> **Replaces:** All previous versions of `LABCOAT-CONTENT-GUIDE.md` in their entirety.

---

## 1. Design Philosophy & Aesthetic Blueprint

The new LabCoat website is engineered for sophisticated pharmaceutical and biotechnology leaders (VPs of Manufacturing, Heads of QA, and Lab Directors). It rejects visual clutter, generic illustrations, and frantic animations in favor of **clinical authority, generous whitespace, and purposeful micro-interactions**.

### Core Aesthetic Rules
1. **Clinical Light-Mode Canvas:** Pristine `bg-slate-50` backdrop with crisp `bg-white` card containers, subtle `border-slate-200` dividers, and high-contrast `text-slate-900` typography.
2. **Restrained Color Hierarchy:**
   - **Base:** Slate grays (`slate-900` for headings, `slate-500` for secondary copy).
   - **Accent:** Deep Indigo (`indigo-600` / `#4F46E5`) for key branding and primary action pills.
   - **Semantic Signals:** Emerald-600 for verified/compliant states, Amber-600 for calibration/warnings.
3. **Typography Standard:**
   - **Display Headings:** `Outfit` (Semibold 600 / Bold 700 with `tracking-tight`).
   - **Body & Microcopy:** `Inter` (Regular 400 / Medium 500 / Semibold 600).
4. **"Time-Events" Interaction Model:**
   - Rather than decorative motion, animations are strictly **functional and synchronized**. 
   - They demonstrate the real-time event flow between the physical operator at the bench and the digital records in the cloud across coordinated windows.

---

## 2. Page Architecture & Section Wireframes

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. GLASSMORPHIC TOPBAR: Logo • Navigation Anchors • [Request Demo]     │
├────────────────────────────────────────────────────────────────────────┤
│ 2. BENCHLING-STYLE HERO SPLIT                                          │
│    Left: Bold Headline, Subtitle, Key Metrics, [Schedule Demo] Pill   │
│    Right: Cropped Floating UI Window (Real Lab Procedure in Action)    │
├────────────────────────────────────────────────────────────────────────┤
│ 3. THE "TIME-EVENTS" SHOWCASE (CLAY / MULTI-WINDOW SYNC)               │
│    Step-by-step interactive time scrubber showing:                     │
│    [Window A: Scientist AR POV] ──► [Window B: 21 CFR Part 11 Ledger]  │
│                                 └──► [Window C: Live LIMS & Facility] │
├────────────────────────────────────────────────────────────────────────┤
│ 4. THE 4 PAIN POINTS (CLAUDE-STYLE NUMBERED 01-04 EDITORIAL GRID)      │
│    Hairline dividers, quiet editorial elegance:                        │
│    01 Outdated Paradigm │ 02 Missing Link │ 03 Productivity │ 04 ALCOA │
├────────────────────────────────────────────────────────────────────────┤
│ 5. THE 4 CORE SOLUTION PILLARS (HIGH-DENSITY BENTO CARDS)              │
│    Pillar 1: Hands-Free AR    │ Pillar 2: E-Signatures & Integrity    │
│    Pillar 3: Global Network   │ Pillar 4: Real-Time LIMS Integration   │
├────────────────────────────────────────────────────────────────────────┤
│ 6. DATA-BACKED PROOF & WORKOS-STYLE ELEVATED TESTIMONIAL CARD          │
│    Statsig Metrics Tabs (Throughput, Audit Defense, Batch Release)    │
│    Floating Elevated Story Card with Underlined Customer Switcher      │
├────────────────────────────────────────────────────────────────────────┤
│ 7. US REGULATORY INTEGRITY CHECKLIST (FDA 21 CFR PART 11 & ALCOA+)     │
│    Attributable • Legible • Contemporaneous • Original • Accurate      │
├────────────────────────────────────────────────────────────────────────┤
│ 8. CONVERSION CARD & MINIMALIST FOOTER                                 │
│    Enterprise Demo Booking Card • Clean Regulatory & Navigation Links  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Deep-Dive Section Specifications & Copywriting

### Section 1: Glassmorphic Sticky Topbar
* **Pattern:** WorkOS / Benchling clean header.
* **Styling:** `fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-8`.
* **Elements:**
  - **Brand:** LabCoat logo with clean clinical icon mark + text `LabCoat`.
  - **Nav Anchors:** `Problem`, `Platform`, `Time-Events`, `Compliance`, `Impact`.
  - **Action Pill:** Dark Indigo button: `Request Demo` (`bg-slate-900 text-white hover:bg-indigo-600 transition-colors px-4 py-2 rounded-full text-sm font-medium`).

---

### Section 2: Hero Section (Benchling-Inspired Asymmetric Split)
* **Pattern:** Benchling hero layout. Heavy, confident typography on the left; a cropped, real product UI window floating on the right.
* **Left Column (Typography & Call to Action):**
  - **Eyebrow:** `span` pill with `bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider`:  
    *The World's First Personal & Intelligent Laboratory Audit Platform*
  - **Headline (H1):**  
    `Audit-Proof Science.`  
    `<span class="text-indigo-600 block underline decoration-indigo-200 underline-offset-8">Personally Integrated.</span>`
  - **Sub-headline:**  
    *"Empower your scientists with standalone AR smart glasses that integrate directly with their workflow. Hands-free protocol guidance, zero-latency edge capture, and instant FDA 21 CFR Part 11 compliance—without touching a keyboard or removing gloves."*
  - **Action Button:** Large rounded pill `bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-full font-medium transition-all shadow-sm` with text **"Request a Demo"** paired with a quiet text link **"Explore the Architecture →"**.
  - **Quick Stats Bar:**
    - **< 1 ms** *Local Write Latency*
    - **+40%** *Bench Throughput*
    - **100%** *FDA Part 11 Compliant*
* **Right Column (Cropped Product Window):**
  - Floating high-density card (`bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden`).
  - Header: Window pill controls (`red, yellow, green` dots) with a breadcrumb: `Procedures / Batch #BTH-2026-09 / Step 04`.
  - Content: A crisp table showing an active procedure step being verified, showing an operator badge, live step status (`In Progress` -> `Verified`), and an embedded sensor stream (pH 7.21, 24.1°C).

---

### Section 3: The Multi-Window "Time-Events" Showcase (Clay / Synchronized State Engine)
* **Core Concept:** This is the visual centerpiece of the website. It proves how LabCoat connects the physical human to the digital enterprise in real time through synchronized, coordinated windows.
* **Layout:** A clean, horizontal timeline scrubber at the top with 3 time states:
  - **State 1 (00:00:01):** *Physical Interaction & Reagent Scan*
  - **State 2 (00:00:02):** *Cryptographic Edge Capture & E-Signature*
  - **State 3 (00:00:03):** *Real-Time LIMS & Central Ledger Sync*
* **The 3 Coordinated Windows Below:**
  1. **Window A (The Edge AR HUD / Scientist POV):**  
     - Stylized dark glass card representing the smart glasses field of view.
     - Displays: Active SOP step (`"Add 50μL Reagent B"`), live green bounding box locking onto a QR code (`LOT-4491-B`), and a wristband trigger confirmation (`"Click to Sign"`).
  2. **Window B (The Central Audit Ledger / 21 CFR Part 11):**  
     - Clean white data table window.
     - Shows the immutable row being created in real time: `event_id`, `timestamp_utc`, `operator_id`, `action_type: COMPOUND_MOVED`, and the cryptographic `SHA-256 hash`.
  3. **Window C (Facility & LIMS Inventory):**  
     - Displays the live facility map floorplan showing operator presence in Cleanroom Suite A, alongside the automatic lot balance deduction in the central LIMS database.
* **Interactive Control:** Clicking any step in the scrubber smoothly highlights the corresponding state across all 3 windows with crisp micro-transitions.

---

### Section 4: The 4 Pain Points (Claude-Style Numbered 01-04 Editorial Grid)
* **Pattern:** Claude Product Overview style. Quiet, restrained, editorial elegance with subtle horizontal hairline borders and numbered markers.
* **Grid:** 4-column layout on desktop, single-column on mobile.
* **Content:**
  - **01 / The Outdated Paradigm:** Decades-old paper binders, clipboards, and retroactive manual transcription at shift end that introduce fatal human transcription errors.
  - **02 / The Missing Personal Link:** The human interacts with dangerous reagents and million-dollar instruments, but remains completely isolated from the digital system—causing cognitive friction and stressful investigations.
  - **03 / Severe Lost Productivity:** The "degloving penalty" (up to 35% of an operator's shift lost to removing gloves, typing at kiosks, and re-sterilizing) plus administrative documentation backlog.
  - **04 / ALCOA+ Violations:** Post-hoc manual entry fails FDA contemporaneous and original data integrity requirements, leaving laboratories exposed to Form 483 warning letters.

---

### Section 5: The 4 Core Solution Pillars (High-Density Bento Cards)
* **Pattern:** 2x2 asymmetric bento grid with crisp white card containers (`bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow`).
* **Pillars:**
  1. **Pillar 1: Hands-Free AR & Edge Vision (Wearable Intelligence)**  
     - Lightweight smart glasses (Meta Ray-Ban form factor), eyes-up protocol guidance, and a passive 5-second circular "dashcam" buffer that stores video proof only when milestones occur.
  2. **Pillar 2: Regulatory Integrity & 21 CFR Part 11 Electronic Signatures**  
     - Dual-factor electronic signatures, append-only immutable event streams, formal revision workflows with QA signoff, and client-side SHA-256 cryptographic hashing.
  3. **Pillar 3: The Interconnected Network & Global Record of Every Lab**  
     - Real-time 2D/3D spatial lab map, live batch monitoring, end-to-end batch genealogy trees linking every lot to finished vials, and automated calibration lockouts.
  4. **Pillar 4: Real-Time LIMS Integration & Continuous Data Flow**  
     - Seamless bidirectional synchronization with existing LIMS, ELN, and MES platforms—eliminating the manual data bridge and generating locked, auditor-ready PDF batch records.

---

## 6. Data-Backed Proof & WorkOS-Style Elevated Testimonial Card
* **Pattern:** Statsig interactive metrics tabs paired with a WorkOS-style floating testimonial card with an interactive logo switcher underneath.
* **Top Component (Statsig Metrics Tabs):**
  - Clickable category tabs: `[Cleanroom Throughput]` • `[Audit Defense]` • `[Batch Release Speed]` • `[Data Integrity]`.
  - Active tab reveals bold numbers:
    - **+40% Bench Throughput:** Zero degloving, hands-free protocol execution.
    - **Instant Audit Defense:** 2–3 weeks of paper forensics reduced to one click.
    - **Same-Day Batch Release:** Real-time QA signoffs without manual record review.
    - **Zero-Defect ALCOA+:** 100% contemporaneous digital records with cryptographic edge hashing.
* **Bottom Component (WorkOS-Style Elevated Story Card):**
  - A clean, elevated white card (`shadow-xl border border-slate-200 rounded-2xl p-10 max-w-4xl mx-auto -mb-6 relative z-10 bg-white`):
    - *"Before LabCoat, our operators spent a third of their cleanroom shifts degloving to type into stationary computers. LabCoat gave our team their hands back, eliminated paper logbooks, and made our batch records 100% audit-proof on day one."*
    - Author: *VP of Quality Assurance & Manufacturing, Leading US CDMO*
  - **Underlined Customer Logo Switcher (Below Card):**
    - A row of 4 facility profile tabs: `[Biopharmaceuticals]` • `[Cell & Gene Therapy]` • `[CDMO / CMO]` • `[Clinical Diagnostics]`.
    - Active tab has a prominent dark underline (`border-b-2 border-slate-900`). Clicking a tab updates the elevated quote above.

---

## 7. US Regulatory Rigor (FDA 21 CFR Part 11 & ALCOA+)
* **Pattern:** Clean, high-contrast compliance assurance checklist.
* **Framing:** Exclusively focused on US federal compliance standards.
* **Checklist Items:**
  - **Attributable:** Unique biometrically gated glasses ID and employee badge binding.
  - **Legible:** Standardized, digital, machine-readable records with zero handwriting ambiguity.
  - **Contemporaneous:** Sub-millisecond edge timestamping via embedded PGlite WASM storage.
  - **Original:** Primary record captured directly at point of origin at the bench.
  - **Accurate:** Zero manual transcription errors with client-side SHA-256 cryptographic verification.
  - **FDA 21 CFR § 11.10(e):** Time-stamped, computer-generated, immutable audit trails.

---

## 8. Minimalist Conversion Card & Footer
* **Pattern:** WorkOS / Benchling clean conversion container.
* **Container:** High-contrast card with `bg-slate-900 text-white rounded-3xl p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8`.
* **Content:**
  - Left: `text-3xl font-display font-bold`: *Ready to eliminate paper binders and empower your scientists?*  
    Subtext: *Schedule a 20-minute tailored demonstration with our lab execution engineers.*
  - Right: Clean form or action button: `[Schedule Audit Demo]` (Indigo button `bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-medium`).
* **Footer:**
  - Minimalist 4-column layout on `bg-slate-50 border-t border-slate-200 py-12`:
    - Column 1: LabCoat mark, *The World's First Personal & Intelligent Laboratory Audit Platform*, copyright.
    - Column 2: Platform (Hands-Free AR, Local-First Engine, LIMS Integration, 2D/3D Spatial Map).
    - Column 3: Regulatory (FDA 21 CFR Part 11, GAMP 5, ALCOA+ Integrity).
    - Column 4: Company (About, Careers, Contact, Security & Privacy).

---

## 9. Technical Implementation Notes (Netlify / Static HTML)

1. **Lightweight & Static:** The entire website remains 100% static HTML, Tailwind CSS, and vanilla JavaScript—ensuring lightning-fast global delivery on Netlify without heavy frameworks.
2. **Vanilla JS State Drivers:**
   - A single, compact JavaScript file (`js/app.js`) manages:
     - The 3-state "Time-Events" scrubber.
     - The Statsig-style metrics category switcher.
     - The WorkOS-style elevated testimonial logo bar.
3. **No Heavy Animation Libraries:** Zero bloated JS physics engines or heavy three.js runtimes. All motion is implemented via pure CSS transitions (`transition-all duration-300 ease-in-out`), maintaining a sub-1-second First Contentful Paint.
