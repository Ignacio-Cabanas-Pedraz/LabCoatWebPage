# LabCoat AI Landing Page

A sleek, modern product landing page for LabCoat AI - the personal AI + AR laboratory teacher for biotech and chemistry students.

## 🎯 Purpose

This landing page serves as the primary touchpoint for:
- **Educational Institutions**: Discover LabCoat AI's capabilities and express interest for their programs
- **Investors**: Learn about the technology, market opportunity, and express partnership interest
- **General Audience**: Understand the product value proposition and development roadmap

## ✨ Product Overview

LabCoat AI is an AI + AR personal laboratory teacher that provides:
- **Step-by-step procedure guidance** through Meta Ray-Ban smart glasses
- **Automatic lab notebook generation** for comprehensive documentation
- **Procedural error catching** with real-time safety supervision
- **Laboratory equipment library** with proper usage information
- **Deterministic AI architecture** to eliminate hallucinations
- **Modular, customizable system** adaptable to any institution

**Launch Timeline**: Mid 2027-2028 academic year  
**Pricing**: €2,500-€3,500 per year (institution license, glasses included)

## ✨ Website Features

- **Modern Design**: Clean, professional aesthetic inspired by leading tech companies
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading times and smooth scrolling
- **SEO Ready**: Proper meta tags and semantic HTML
- **Netlify Ready**: Configured for seamless deployment
- **Form Integration**: Contact form ready for Netlify Forms or custom backend
- **Real Content**: Updated with actual LabCoat AI features and information

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone [your-repo-url]
cd labvision-landing
```

2. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or simply open index.html in your browser
```

### Deploy to Netlify

#### Option 1: Drag and Drop
1. Zip the entire project folder
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop your zip file
4. Your site is live!

#### Option 2: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Netlify will auto-detect settings (no build command needed)
6. Deploy!

## 📝 Content Replacement Guide

### Where to Replace Placeholder Content

#### 1. **Hero Section** (`index.html` lines ~45-65)
Replace:
- `"Redefining Laboratory Excellence"` - Your main headline
- Hero subtitle paragraph - Your value proposition
- Hero visual placeholder - Add your product image/video

**How to add your hero image:**
```html
<!-- Replace this -->
<div class="hero-placeholder">
    <div class="placeholder-content">...</div>
</div>

<!-- With this -->
<img src="images/hero-product.jpg" alt="LabVision Product" class="hero-image">
```

#### 2. **Stats Section** (`index.html` lines ~70-90)
Update the statistics:
- `10x` - Your performance metric
- `99.9%` - Your accuracy/reliability metric
- `50+` - Number of partners/clients
- `24/7` - Your service metric

#### 3. **Features Section** (`index.html` lines ~95-170)
Replace feature content:
- Feature titles and descriptions
- Feature icons (SVGs included)
- Feature visuals/screenshots

**To add feature images:**
```html
<!-- Replace placeholder-content div -->
<div class="feature-visual">
    <img src="images/feature-automation.jpg" alt="Automation Feature">
</div>
```

#### 4. **Technology Section** (`index.html` lines ~175-210)
Update:
- Technology description
- Tech feature points
- Technology diagram/visual

#### 5. **Testimonials** (`index.html` lines ~215-280)
Replace with real testimonials:
- Quote text
- Author name, title, and organization
- Consider adding author photos

#### 6. **Partner Logos** (`index.html` lines ~285-300)
Replace placeholder text with:
- Real partner institution logos
- Or remove this section if not applicable yet

#### 7. **Contact Form** (`index.html` lines ~305-350)
The form is ready to use! To enable Netlify Forms:

Add these attributes to the `<form>` tag:
```html
<form class="form" id="contactForm" name="contact" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- rest of form -->
</form>
```

#### 8. **Footer** (`index.html` lines ~355-400)
Update:
- Company information
- Links to documentation, pricing, etc.
- Legal pages (privacy policy, terms of service)
- Social media links (add if needed)

#### 9. **Meta Tags** (`index.html` lines ~1-10)
Update SEO information:
```html
<meta name="description" content="Your actual product description">
<title>LabVision - Your Actual Tagline</title>
```

## 🎨 Design Customization

### Colors

Edit CSS variables in `css/styles.css` (lines 7-28):

```css
:root {
    --color-primary: #0071e3;        /* Main brand color */
    --color-text: #1d1d1f;           /* Text color */
    --color-background: #ffffff;      /* Background */
    /* ... */
}
```

### Typography

The site uses system fonts for optimal performance. To change:

```css
:root {
    --font-primary: "Your Font", -apple-system, sans-serif;
}
```

Don't forget to add the font link in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Animations

All animations are defined in `css/styles.css`. To adjust:
- Animation duration: Search for `animation:` or `transition:`
- Scroll effects: Edit `js/scripts.js` intersection observer settings

## 📁 Project Structure

```
labvision-landing/
├── index.html           # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── scripts.js      # Interactions & animations
├── images/             # Your images go here
├── netlify.toml        # Netlify configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🖼️ Adding Images

1. Create/use the `images/` folder
2. Optimize images before adding:
   - Use WebP format for modern browsers
   - Compress images (TinyPNG, ImageOptim)
   - Recommended sizes:
     - Hero image: 1920x1080px, <500KB
     - Feature images: 800x600px, <200KB
     - Logos: SVG preferred, or PNG <50KB

3. Update HTML image tags with proper paths:
```html
<img src="images/your-image.jpg" alt="Descriptive alt text">
```

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

Test on multiple devices before deploying!

## 🔧 Technical Details

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile: iOS Safari 12+, Chrome Android 90+

### Performance
- Optimized CSS with minimal animations
- Lazy loading ready (commented in JS)
- Efficient scroll handlers
- No external dependencies (except fonts)

### SEO
- Semantic HTML5
- Proper heading hierarchy
- Alt text placeholders
- Meta tags ready for customization

## 🌐 Domain Connection (Namecheap → Netlify)

### After deploying to Netlify:

1. **In Netlify Dashboard:**
   - Go to Site Settings > Domain Management
   - Click "Add custom domain"
   - Enter your domain name

2. **In Namecheap:**
   - Go to Domain List > Manage > Advanced DNS
   - Add/Update records:
     - **A Record**: Host `@`, Value `75.2.60.5`
     - **CNAME Record**: Host `www`, Value `your-site.netlify.app`

3. **Wait for DNS propagation** (usually 15 minutes - 48 hours)

4. **Enable HTTPS in Netlify** (automatic after domain verification)

## 📧 Form Submissions

The contact form is configured to work with Netlify Forms. Once deployed:

1. Form submissions appear in Netlify dashboard
2. Set up email notifications in Netlify
3. Or integrate with Zapier/webhooks for custom workflows

**Alternative**: Replace form action with your own backend API endpoint.

## 🚨 Before Launch Checklist

- [ ] Replace all placeholder content
- [ ] Add real images and optimize them
- [ ] Update meta tags and page title
- [ ] Test on multiple devices and browsers
- [ ] Verify all links work
- [ ] Test form submission
- [ ] Add Google Analytics (optional)
- [ ] Set up Netlify Forms notifications
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Test final live site

## 💡 Tips for Success

1. **Keep it Simple**: Don't overcomplicate the content
2. **Strong CTA**: Make it easy for visitors to take action
3. **Fast Loading**: Keep images optimized
4. **Mobile First**: Most visitors will be on mobile
5. **A/B Test**: Try different headlines and CTAs
6. **Analytics**: Add Google Analytics to track performance

## 🆘 Support & Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Forms Guide](https://docs.netlify.com/forms/setup/)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [MDN Web Docs](https://developer.mozilla.org)

## 📄 License

[Add your license information here]

---

**Built with ❤️ for LabVision**

*For questions or support, contact [your-email@domain.com]*
