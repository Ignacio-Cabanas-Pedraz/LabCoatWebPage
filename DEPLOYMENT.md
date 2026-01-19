# LabVision Deployment Guide

## 🎯 Overview

This guide will walk you through deploying your LabVision landing page to Netlify and connecting it to your Namecheap domain.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Git installed on your computer
- [ ] A GitHub/GitLab/Bitbucket account
- [ ] A Netlify account (free tier is fine)
- [ ] Your Namecheap domain purchased
- [ ] All content replaced (see README.md for content replacement guide)
- [ ] Images added to the `images/` folder
- [ ] Tested the site locally

---

## 🚀 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: LabVision landing page"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon → **"New repository"**
3. Repository settings:
   - **Name**: `labvision-landing` (or your preferred name)
   - **Description**: "LabVision product landing page"
   - **Visibility**: Public or Private (your choice)
   - **Don't** initialize with README (we already have one)
4. Click **"Create repository"**

### 1.3 Push to GitHub

GitHub will show you commands. Copy and run them in your terminal:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/labvision-landing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Tip**: Replace `YOUR-USERNAME` with your actual GitHub username.

---

## 🌐 Step 2: Deploy to Netlify

### 2.1 Sign Up / Log In to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Sign up or log in (use your GitHub account for easier integration)

### 2.2 Create New Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub account
4. Select your repository: `labvision-landing`

### 2.3 Configure Build Settings

Netlify will auto-detect your site as static HTML:

- **Build command**: Leave empty (no build needed)
- **Publish directory**: `.` (root directory)
- **Branch to deploy**: `main`

Click **"Deploy site"**

### 2.4 Wait for Deployment

- Netlify will deploy your site (usually takes 30-60 seconds)
- You'll get a random URL like: `random-name-123456.netlify.app`
- Click on it to view your live site!

### 2.5 Customize Netlify Subdomain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Options"** next to your `.netlify.app` domain
3. Click **"Edit site name"**
4. Change to: `labvision` (if available)
5. Your site is now at: `labvision.netlify.app`

---

## 🔗 Step 3: Connect Your Namecheap Domain

### 3.1 Add Custom Domain in Netlify

1. In Netlify dashboard, go to **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `yourdomain.com`
4. Click **"Verify"** → **"Add domain"**
5. Netlify will show DNS configuration instructions

### 3.2 Option A: Use Netlify DNS (Recommended)

**Pros**: Easier setup, automatic SSL, better performance  
**Cons**: Namecheap won't manage your DNS anymore

1. In Netlify, click **"Set up Netlify DNS"**
2. Netlify will give you nameserver addresses like:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

3. Go to [Namecheap](https://www.namecheap.com)
4. Log in → **Domain List** → Click **"Manage"** on your domain
5. Scroll to **"Nameservers"**
6. Select **"Custom DNS"**
7. Enter Netlify's nameservers (all 4)
8. Click **"Save"**

**Wait 24-48 hours for DNS propagation** (usually faster, 15 min - 6 hours)

### 3.2 Option B: Use Namecheap DNS with A Records

**Pros**: Keep Namecheap as DNS manager  
**Cons**: Slightly more complex, manual SSL setup

1. In Namecheap, go to **Domain List** → **"Manage"** → **"Advanced DNS"**

2. **Delete** any existing A or CNAME records for `@` and `www`

3. **Add new records**:

   **A Record:**
   - Type: `A Record`
   - Host: `@`
   - Value: `75.2.60.5`
   - TTL: `Automatic`

   **CNAME Record:**
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `your-site.netlify.app` (your Netlify subdomain)
   - TTL: `Automatic`

4. Click **"Save all changes"**

5. **In Netlify**, go back to Domain management and wait for verification

**Wait 15 minutes to 48 hours for DNS propagation**

---

## 🔒 Step 4: Enable HTTPS

### If Using Netlify DNS:
- HTTPS is **automatic**
- Netlify will provision an SSL certificate within minutes
- You'll see "HTTPS" with a green checkmark in Domain settings

### If Using Namecheap DNS:
1. In Netlify, go to **Domain management** → **HTTPS**
2. Wait for DNS verification (check mark appears)
3. Click **"Provision certificate"**
4. Wait a few minutes for SSL certificate to be issued
5. Enable **"Force HTTPS"** to redirect all HTTP traffic to HTTPS

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Your Website

Visit your domain: `https://yourdomain.com`

**Check:**
- [ ] Site loads correctly
- [ ] All pages/sections are accessible
- [ ] Images load properly
- [ ] Forms work (test the contact form)
- [ ] Mobile responsive (test on phone)
- [ ] HTTPS is working (green padlock in browser)
- [ ] Both `yourdomain.com` and `www.yourdomain.com` work

### 5.2 Test Form Submissions (Netlify Forms)

1. Fill out and submit the contact form
2. Go to Netlify dashboard → **Forms**
3. Check if submission appears
4. Set up **Form notifications**:
   - Go to **Site settings** → **Forms** → **Form notifications**
   - Add email notification
   - Enter your email address
   - Test again to receive notifications

---

## 🔄 Step 6: Making Updates

### To update your website:

1. **Make changes** to your local files
2. **Test locally** to ensure everything works
3. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
4. **Netlify automatically rebuilds** and deploys your site (takes 30-60 seconds)
5. **Verify changes** on your live site

---

## 🛠️ Troubleshooting

### DNS Not Propagating?

**Check DNS status**:
```bash
# macOS/Linux
dig yourdomain.com

# Windows
nslookg yourdomain.com
```

**Common issues**:
- Wait longer (up to 48 hours in rare cases)
- Clear browser cache: `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete`)
- Try incognito/private mode
- Check [whatsmydns.net](https://www.whatsmydns.net) to see propagation status

### SSL Certificate Not Provisioning?

- Ensure DNS is fully propagated first
- Make sure both `@` and `www` records are correct
- Try clicking "Provision certificate" again after DNS verification
- Contact Netlify support if issues persist

### Form Not Working?

**If using Netlify Forms**, ensure you added:
```html
<form name="contact" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- rest of form -->
</form>
```

Deploy after adding these attributes.

### Images Not Loading?

- Check file paths are correct: `images/filename.jpg`
- Ensure images are in the `images/` folder
- Check image file names are exact (case-sensitive)
- Verify images were committed and pushed to Git

### Site Not Updating?

1. Check Netlify deploys: Go to **Deploys** tab
2. Look for failed builds (red X)
3. Click on failed build to see error logs
4. Fix errors and push again

---

## 📊 Step 7: Add Analytics (Optional)

### Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Get your Measurement ID: `G-XXXXXXXXXX`
4. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

5. Commit and push changes

---

## 🎉 Congratulations!

Your LabVision landing page is now live!

### Next Steps:

1. **Share the link** with your team
2. **Monitor form submissions** in Netlify dashboard
3. **Track analytics** (if you added Google Analytics)
4. **Gather feedback** from users
5. **Iterate and improve** based on feedback

---

## 📞 Support Resources

- **Netlify Documentation**: https://docs.netlify.com
- **Netlify Support**: https://www.netlify.com/support/
- **Namecheap Support**: https://www.namecheap.com/support/
- **DNS Checker**: https://www.whatsmydns.net
- **SSL Checker**: https://www.ssllabs.com/ssltest/

---

## 💡 Pro Tips

1. **Use Netlify's Deploy Previews**: Every pull request gets a preview URL
2. **Set up branch deploys**: Test changes on staging before going live
3. **Enable automatic deploys**: Push to `main` branch to auto-deploy
4. **Monitor site performance**: Use Lighthouse in Chrome DevTools
5. **Keep backups**: Your Git repository IS your backup!

---

**Need help?** Contact your development team or refer to the README.md file.

Good luck with LabVision! 🚀
