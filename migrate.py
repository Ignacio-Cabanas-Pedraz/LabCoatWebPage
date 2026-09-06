import os
import re

header_html = """    <!-- Glassmorphic Banner -->
    <header class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-50 transition-all duration-300">
        <div class="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 text-slate-900 font-display font-bold text-xl hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 3H15M10 9H14M3 21H21M5 21V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V21" />
                </svg>
                <span>LabCoat</span>
            </a>

            <div class="flex items-center gap-6">
                <nav class="hidden md:flex items-center gap-6">
                    <a href="index.html#features" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1">Product</a>
                    <a href="index.html#students" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1">Features</a>
                    <a href="index.html#teachers" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1">Teachers</a>
                    <a href="index.html#technology" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1">Architecture</a>
                    <a href="company.html" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1">Company</a>
                </nav>

                <div class="flex items-center">
                    <a href="index.html#contact" class="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Get Started</a>
                </div>
            </div>
        </div>
    </header>"""

footer_html = """    <!-- Footer -->
    <footer class="bg-slate-50 py-12 border-t border-slate-200">
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                <div class="flex flex-col gap-4 max-w-xs">
                    <div class="flex items-center gap-2 text-slate-900">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 3H15M10 9H14M3 21H21M5 21V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V21" />
                        </svg>
                        <span class="text-xl font-display font-bold">LabCoat AI</span>
                    </div>
                    <p class="text-slate-500 font-sans text-sm">Your personal laboratory teacher.</p>
                    <div class="flex items-center gap-4 mt-2">
                        <a href="https://www.linkedin.com/in/ignacio-cabañas-9422762a8/" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-indigo-600 transition-colors" title="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="flex flex-wrap gap-12 md:gap-24">
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-semibold text-slate-900 tracking-wide text-sm uppercase">Product</h4>
                        <ul class="flex flex-col gap-2">
                            <li><a href="index.html#contact" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Book a Demo</a></li>
                            <li><a href="index.html#contact" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Inquire</a></li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="font-display font-semibold text-slate-900 tracking-wide text-sm uppercase">Legal</h4>
                        <ul class="flex flex-col gap-2">
                            <li><a href="terms.html" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Terms & Conditions</a></li>
                            <li><a href="privacy_policy.html" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Privacy Policy</a></li>
                            <li><a href="cookie_policy.html" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Cookie Policy</a></li>
                            <li><a href="dpa.html" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Data Processing Agreement</a></li>
                            <li><a href="data_deletion.html" class="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-sans">Data Deletion Request</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-slate-400 text-sm font-sans">
                    &copy; 2026 LabCoat AI. All rights reserved.
                </div>
                <div class="flex flex-wrap gap-4 md:gap-6 text-sm">
                    <a href="privacy_policy.html" class="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
                    <a href="cookie_policy.html" class="text-slate-400 hover:text-indigo-600 transition-colors">Cookies</a>
                    <a href="terms.html" class="text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
                    <a href="dpa.html" class="text-slate-400 hover:text-indigo-600 transition-colors">DPA</a>
                    <a href="data_deletion.html" class="text-slate-400 hover:text-indigo-600 transition-colors">Data Deletion</a>
                </div>
            </div>
        </div>
    </footer>"""

cookie_html = """    <!-- Cookie Consent Banner -->
    <div id="cookie-consent-banner" class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-200 z-[100] transform translate-y-full transition-transform duration-300 hidden">
        <div class="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="text-sm text-slate-600 font-sans max-w-3xl">
                <p>We use optional cookies (Google Analytics) to understand how visitors use our site so we can improve the experience. We do not use cookies for advertising. Please let us know if you accept these tracking cookies.</p>
                <p class="text-xs mt-1">Read our <a href="cookie_policy.html" class="text-indigo-600 hover:underline">Cookie Policy</a> for more details.</p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <button id="decline-cookies" class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">Decline</button>
                <button id="accept-cookies" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">Accept All</button>
            </div>
        </div>
    </div>"""

files_to_update = ['company.html', 'privacy_policy.html', 'terms.html', 'cookie_policy.html', 'dpa.html', 'data_deletion.html']

for filename in files_to_update:
    filepath = os.path.join(os.getcwd(), filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace CSS links
    content = re.sub(r'<link rel="stylesheet" href="css/styles\.css">', '<link rel="stylesheet" href="css/tailwind.css">', content)
    content = re.sub(r'<link rel="stylesheet" href="css/tabs\.css">\s*<link rel="stylesheet" href="css/bento\.css">', '', content)

    # Replace header
    content = re.sub(r'<!-- Transparent Banner -->\s*<header.*?</header>', header_html, content, flags=re.DOTALL)
    content = re.sub(r'<!-- Glassmorphic Banner -->\s*<header.*?</header>', header_html, content, flags=re.DOTALL)

    # Replace footer
    content = re.sub(r'<!-- Footer -->\s*<footer.*?</header>', footer_html, content, flags=re.DOTALL)
    content = re.sub(r'<!-- Footer -->\s*<footer.*?</footer>', footer_html, content, flags=re.DOTALL)
    
    # Replace cookie banner
    content = re.sub(r'<!-- Cookie Consent Banner -->\s*<div id="cookie-consent-banner".*?</div>\s*</div>', cookie_html, content, flags=re.DOTALL)
    
    # Fix body class if needed
    if '<body class="' not in content:
        content = content.replace('<body>', '<body class="bg-slate-50 font-sans text-slate-900">')
    
    # Fix main class
    if '<main>' in content:
        content = content.replace('<main>', '<main class="pt-24 pb-16">')

    # Fix favicons
    content = content.replace('href="../assets/favicon-', 'href="assets/favicon-')
    
    # Rewrite legal content styling
    if filename in ['privacy_policy.html', 'terms.html', 'cookie_policy.html', 'dpa.html', 'data_deletion.html']:
        # Container class for legal pages
        content = re.sub(r'<section class="bg-step-1"[^>]*>\s*<div class="container">', '<section class="py-12 bg-white border-b border-slate-200">\n            <div class="container mx-auto px-6 max-w-4xl">', content)
        content = re.sub(r'<section class="bg-step-2"[^>]*>\s*<div class="container">', '<section class="py-12 bg-slate-50">\n            <div class="container mx-auto px-6 max-w-4xl">', content)
        
        # Replace hero title
        content = re.sub(r'<h1 class="hero-title"[^>]*>', '<h1 class="text-4xl font-display font-bold text-slate-900 mb-4">', content)
        content = re.sub(r'<p class="hero-subtitle"[^>]*>', '<p class="text-lg text-slate-500 font-sans">', content)
        
        # Remove bento-card wrapping inside main content
        content = re.sub(r'<div class="bento-card bento-large"[^>]*>\s*<div class="bento-content"[^>]*>', '<div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">', content)
        content = re.sub(r'</div>\s*</div>\s*</div>\s*</section>', '</div>\n            </div>\n        </section>', content)
        
        # Style h2
        content = re.sub(r'<h2[^>]*>', '<h2 class="text-2xl font-display font-bold text-slate-900 mt-8 mb-4">', content)
        
        # Style p inside legal docs
        content = re.sub(r'<p style="margin-bottom: 2rem; color: var\(--muted-foreground\); line-height: 1\.6;">', '<p class="text-slate-600 font-sans mb-6 leading-relaxed">', content)
        content = re.sub(r'<p style="margin-bottom: 1rem; color: var\(--muted-foreground\); line-height: 1\.6;">', '<p class="text-slate-600 font-sans mb-4 leading-relaxed">', content)
        
        # Style lists
        content = re.sub(r'<ul[^>]*>', '<ul class="list-disc pl-6 text-slate-600 font-sans mb-6 space-y-2">', content)
        content = re.sub(r'<ol[^>]*>', '<ol class="list-decimal pl-6 text-slate-600 font-sans mb-6 space-y-2">', content)
        
        # Extra inline styles cleanup
        content = re.sub(r'style="[^"]*"', '', content)
        # Restore some basic ones if accidently removed but above is mostly enough since Tailwind replaces it all

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filename}")
