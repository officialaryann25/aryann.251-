# IceWorld - Deployment Guide

This guide provides instructions for deploying the IceWorld website to various hosting platforms.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] All HTML files (index.html, menu.html, gallery.html, about.html, contact.html)
- [x] CSS file (styles.css)
- [x] JavaScript file (main.js)
- [x] Assets folder with images (or SVG placeholders in place)
- [x] README.md documentation
- [ ] Custom domain (optional)
- [ ] SSL certificate (most hosts provide free ones)

## Quick Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

**Pros**: Free, automatic HTTPS, easy to set up
**Cons**: Static sites only (no backend)

#### Steps:

1. **Ensure your repository is public** (or have GitHub Pro for private repo hosting)

2. **Enable GitHub Pages**:
   ```bash
   # Your code is already on GitHub
   # Go to: Settings → Pages
   # Source: Deploy from a branch
   # Branch: Select 'copilot/upgrade-ice-cream-website' or 'main'
   # Folder: / (root)
   # Click Save
   ```

3. **Access your site**:
   - URL will be: `https://officialaryann25.github.io/aryann.251-/`
   - Wait 2-5 minutes for initial deployment

4. **Custom Domain (Optional)**:
   - Add a `CNAME` file with your domain
   - Update DNS records at your domain provider
   - Enable "Enforce HTTPS" in GitHub Pages settings

#### GitHub Pages Deployment Commands:
```bash
# If you need to push to main branch
git checkout main
git merge copilot/upgrade-ice-cream-website
git push origin main

# GitHub Pages will auto-deploy from main branch
```

---

### Option 2: Netlify

**Pros**: Easy drag-and-drop, form handling, automatic HTTPS, custom domains
**Cons**: Limited free tier

#### Steps:

1. **Create Netlify Account**: Visit [netlify.com](https://netlify.com)

2. **Deploy via Git**:
   - New site from Git
   - Connect to GitHub
   - Select repository: `officialaryann25/aryann.251-`
   - Branch: `copilot/upgrade-ice-cream-website` or `main`
   - Build command: (leave empty)
   - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Configure**:
   - Site name: `iceworld` (changes URL to iceworld.netlify.app)
   - Custom domain: Add your domain if you have one
   - HTTPS: Automatically enabled

#### Netlify CLI Deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
cd /path/to/aryann.251-
netlify init
netlify deploy --prod
```

---

### Option 3: Vercel

**Pros**: Fast global CDN, automatic HTTPS, excellent performance
**Cons**: Overkill for simple sites

#### Steps:

1. **Create Vercel Account**: Visit [vercel.com](https://vercel.com)

2. **Deploy via Git**:
   - Import Project
   - Connect GitHub
   - Select repository
   - Framework: None (static site)
   - Deploy

3. **Custom Domain**:
   - Settings → Domains
   - Add your domain

#### Vercel CLI Deployment:
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /path/to/aryann.251-
vercel --prod
```

---

### Option 4: Traditional Web Hosting (cPanel/FTP)

**Pros**: Full control, can add backend later
**Cons**: Costs money, requires more setup

#### Steps:

1. **Choose a Host**: 
   - Hostinger
   - Bluehost
   - SiteGround
   - GoDaddy
   - NameCheap

2. **Upload Files via FTP**:
   ```
   Using FileZilla or similar:
   - Host: your-domain.com
   - Username: provided by host
   - Password: provided by host
   - Port: 21 (or 22 for SFTP)
   
   Upload all files to public_html/ or www/
   ```

3. **Or use cPanel File Manager**:
   - Login to cPanel
   - File Manager
   - Upload ZIP of your project
   - Extract in public_html/

4. **Set Permissions**:
   - Files: 644
   - Folders: 755

5. **Configure Domain**:
   - Point domain to hosting nameservers
   - Set up SSL certificate (Let's Encrypt via cPanel)

---

### Option 5: Firebase Hosting

**Pros**: Google infrastructure, free tier, fast CDN
**Cons**: Requires Firebase setup

#### Steps:

1. **Create Firebase Project**: [console.firebase.google.com](https://console.firebase.google.com)

2. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   cd /path/to/aryann.251-
   firebase init hosting
   
   # Configure:
   # Public directory: . (current directory)
   # Single-page app: No
   # GitHub CI/CD: Optional
   ```

4. **Deploy**:
   ```bash
   firebase deploy --only hosting
   ```

5. **Access**: `https://your-project.web.app`

---

## Post-Deployment Tasks

### 1. Verify Functionality
- [ ] Test all 5 pages load correctly
- [ ] Check navigation between pages
- [ ] Test mobile menu toggle
- [ ] Verify forms work
- [ ] Check all images display
- [ ] Test responsive design on mobile

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Verify meta tags are correct
- [ ] Test Open Graph tags with Facebook debugger

### 3. Performance Optimization
- [ ] Run Google PageSpeed Insights
- [ ] Enable caching (if using traditional hosting)
- [ ] Minimize CSS/JS (create minified versions)
- [ ] Optimize images further if needed

### 4. Security
- [ ] Ensure HTTPS is enabled
- [ ] Add security headers (if hosting allows)
- [ ] Keep domain and hosting credentials secure

### 5. Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, etc.)
- [ ] Configure error tracking (optional)
- [ ] Set up Google Analytics (optional)

---

## Continuous Deployment (CI/CD)

### GitHub Actions (for GitHub Pages)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Netlify (Automatic)
- Automatically deploys on every push to connected branch
- No additional configuration needed

---

## Domain Configuration

### DNS Records

For custom domain (e.g., iceworld.com):

**For GitHub Pages:**
```
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    officialaryann25.github.io
```

**For Netlify/Vercel:**
```
CNAME @      your-site.netlify.app
CNAME www    your-site.netlify.app
```

**SSL Certificate:**
- Most platforms provide free SSL via Let's Encrypt
- Enable HTTPS redirection

---

## Troubleshooting

### Images Not Loading
- Check file paths are correct
- Verify images are in assets/ folder
- Ensure filenames match exactly (case-sensitive on Linux)

### Styles Not Applied
- Clear browser cache
- Check styles.css is loading (browser dev tools)
- Verify path in HTML `<link>` tag

### 404 Errors
- Check all links use relative paths
- Ensure all files are uploaded
- Verify folder structure is maintained

### Mobile Menu Not Working
- Ensure main.js is loading
- Check browser console for errors
- Verify Font Awesome icons load

### Forms Not Submitting
- Forms use preventDefault() - no backend needed
- Inline messages should appear
- Check browser console for errors

---

## Maintenance

### Regular Tasks:
1. **Weekly**: Check website is online and functional
2. **Monthly**: Review analytics, update content
3. **Quarterly**: Update dependencies, check for broken links
4. **Annually**: Renew domain, review hosting plan

### Backup Strategy:
- GitHub repository serves as backup
- Download production files monthly
- Keep backup of any custom images

---

## Support & Resources

### Documentation:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

### Contact:
- MAHI SEHRAWAT: MAHISEHRAWAT2006@GMAIL.COM
- Priyanshi: priyadaksh007@gmail.com

---

## Quick Start (Recommended)

**For fastest deployment:**

1. Push code to GitHub main branch
2. Enable GitHub Pages
3. Visit `https://officialaryann25.github.io/aryann.251-/`

**Total time: 5 minutes**

---

**Last Updated**: February 2025
**Version**: 1.0.0
