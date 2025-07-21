# 🚀 Deployment Guide - Daniel Schacht Photography

## Quick Start
1. **Preview locally:** `npm start` or open `index.html` in browser
2. **Edit content:** Open `admin.html` in browser
3. **Deploy:** Upload files to your web hosting

## 📁 File Structure
```
daniel-schacht-photography/
├── index.html          # Main website
├── styles.css          # All styling
├── script.js           # Interactive features
├── content.json        # Easy-to-edit content
├── admin.html          # Content management interface
├── package.json        # Project info
└── DEPLOYMENT.md       # This guide
```

## 🎨 Easy Content Updates

### Method 1: Admin Panel (Recommended)
1. Open `admin.html` in your browser
2. Edit content in the user-friendly interface
3. Click "Save" to download updated `content.json`
4. Upload the new `content.json` to your website

### Method 2: Direct File Editing
1. Edit `content.json` directly
2. Follow the JSON structure
3. Upload to your website

## 🌐 Deployment Options

### Option 1: Traditional Web Hosting (Bluehost, GoDaddy, etc.)
1. **Upload files via FTP/cPanel File Manager**
2. **Files to upload:**
   - `index.html`
   - `styles.css`
   - `script.js` 
   - `content.json`
   - `admin.html` (optional - for content editing)
3. **Add your photos to `/images/` folder**

### Option 2: Netlify (Free hosting)
1. **Drag and drop** your project folder to netlify.com
2. **Auto-deploys** when you upload new files
3. **Free SSL certificate** included

### Option 3: GitHub Pages (Free)
1. **Create GitHub repository**
2. **Upload your files**
3. **Enable GitHub Pages** in settings
4. **Auto-deploys** from repository

## 📸 Adding Your Photos

### Image Organization
```
images/
├── portfolio/
│   ├── portrait-1.jpg
│   ├── realestate-1.jpg
│   ├── graduation-1.jpg
│   └── drone-1.jpg
├── about/
│   └── daniel-headshot.jpg
└── hero/
    └── hero-image.jpg
```

### Image Optimization
- **Size:** Max 1920px wide for web
- **Format:** JPG for photos, PNG for graphics
- **Compression:** 70-80% quality for web
- **Alt text:** Update in `content.json` for SEO

## 🔧 Customization

### Colors (in `styles.css`)
```css
:root {
    --primary-color: #2EA3F2;    /* Main blue */
    --secondary-color: #1a202c;  /* Dark text */
    --accent-color: #4A90E2;     /* Hover blue */
}
```

### Typography
- **Primary font:** Raleway (headings)
- **Secondary font:** Inter (body text)
- **Change in:** `styles.css` Google Fonts import

### Layout
- **Responsive:** Works on all devices
- **Grid-based:** Easy to modify sections
- **Modern:** Clean, professional design

## 📧 Contact Form Setup

### Current Setup (Default)
- **Method:** Opens user's email client
- **Pro:** Works immediately, no server needed
- **Con:** Requires user to have email app

### Upgrade Options
1. **Netlify Forms** (if using Netlify hosting)
2. **Formspree** (works with any hosting)
3. **EmailJS** (sends directly to your inbox)

## 🎯 SEO Optimization

### Already Included
- ✅ **Meta tags** for search engines
- ✅ **Structured data** for local business
- ✅ **Fast loading** optimized code
- ✅ **Mobile responsive** design
- ✅ **Clean URLs** and navigation

### Next Steps
1. **Google Search Console:** Add your website
2. **Google Business Profile:** Claim your listing
3. **Analytics:** Add Google Analytics tracking
4. **Social Media:** Link Instagram/Facebook

## 🛠️ Maintenance

### Regular Updates
1. **Photos:** Add new portfolio items monthly
2. **Content:** Update services and descriptions
3. **SEO:** Monitor Google rankings
4. **Backup:** Keep copies of your files

### Monitoring
- **Performance:** Check loading speed
- **Mobile:** Test on different devices
- **Forms:** Verify contact form works
- **Links:** Check all navigation works

## 🆘 Troubleshooting

### Common Issues

**Content not updating?**
- Clear browser cache (Ctrl+F5)
- Check `content.json` format with validator
- Verify file uploaded to correct location

**Images not showing?**
- Check file paths in `content.json`
- Verify images uploaded to `/images/` folder
- Check image file names match exactly

**Contact form not working?**
- Verify email address in `content.json`
- Test with different email clients
- Consider upgrading to server-based form

**Mobile issues?**
- Test on actual devices
- Use browser developer tools
- Check responsive breakpoints

## 📞 Support

Need help? Contact Daniel for:
- Technical support
- Custom modifications  
- SEO optimization
- Photo organization

---

**Remember:** This is your website! Feel free to customize colors, fonts, and layout to match your brand perfectly. The admin panel makes content updates easy, so you can focus on photography while keeping your website fresh and current.