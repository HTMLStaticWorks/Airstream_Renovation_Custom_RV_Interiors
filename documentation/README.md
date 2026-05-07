# Airstream Renovation & Custom RV Interiors
## Premium Website Template — v1.0.0

---

## 📋 Table of Contents
1. [Installation Guide](#installation)
2. [File Structure](#file-structure)
3. [Customization Guide](#customization)
4. [Page Descriptions](#pages)
5. [Integrations](#integrations)
6. [Credits](#credits)
7. [Changelog](#changelog)
8. [Support](#support)

---

## 1. Installation Guide <a name="installation"></a>

### Quick Start
1. Unzip the downloaded file
2. Open `pages/index.html` in your browser to preview locally
3. To deploy: upload all files to your web host maintaining the folder structure

### Deploying to Netlify (Free)
1. Drag the `airstream-rv/` folder into [netlify.com/drop](https://app.netlify.com/drop)
2. Your site is live instantly with a free `.netlify.app` URL
3. Connect a custom domain in Netlify settings

### Deploying to GitHub Pages
1. Push all files to a GitHub repository
2. Go to Settings → Pages → set source to `main` branch `/root`
3. Your site will be live at `https://yourusername.github.io/repo-name`

---

## 2. File Structure <a name="file-structure"></a>

```
airstream-rv/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet (design system + all styles)
│   │   ├── dark-mode.css      # Dark mode overrides
│   │   └── rtl.css            # Right-to-left layout support
│   ├── js/
│   │   └── main.js            # All JavaScript (theme, forms, calculator etc.)
│   ├── images/                # Add your project images here
│   └── fonts/                 # Local fonts (if needed)
├── pages/
│   ├── index.html             # Homepage (main landing page)
│   ├── home2.html             # Alternate homepage design
│   ├── about.html             # About us page
│   ├── services.html          # Services & pricing page
│   ├── blog.html              # Blog listing page
│   ├── contact.html           # Contact & booking page
│   ├── login.html             # Client login page
│   ├── register.html          # Account registration page
│   ├── 404.html               # Custom 404 error page
│   └── coming-soon.html       # Pre-launch / maintenance page
├── documentation/
│   └── README.md              # This file
├── sitemap.xml                # SEO sitemap
└── robots.txt                 # Search engine directives
```

---

## 3. Customization Guide <a name="customization"></a>

### Changing Colors
Open `assets/css/style.css` and edit the CSS variables at the top:
```css
:root {
  --color-primary: #1A1A1A;    /* Change to your brand's dark color */
  --color-secondary: #D6C3A3;  /* Change to your brand's light color */
  --color-accent: #C47A2C;     /* Change to your brand's accent color */
}
```

### Changing Fonts
1. Go to [fonts.google.com](https://fonts.google.com) and select your fonts
2. Replace the Google Fonts `<link>` in each HTML `<head>`
3. Update CSS variables in `style.css`:
```css
--font-heading: 'Your Heading Font', sans-serif;
--font-body: 'Your Body Font', sans-serif;
```

### Updating Brand Name & Logo
1. Find all instances of `Airstream RV` in HTML files and replace
2. Replace the `<i class="ri-roadster-line">` icons with your own SVG logo
3. Update the `brand-sub` text below the logo name

### Adding Real Images
1. Place your images in `assets/images/`
2. Replace placeholder `<div>` elements with `<img>` tags:
```html
<!-- Replace this: -->
<div class="service-img-placeholder"><i class="ri-home-heart-line"></i></div>

<!-- With this: -->
<img src="../assets/images/your-image.jpg" alt="Descriptive alt text" loading="lazy" />
```

### Updating Contact Information
Search all HTML files for these placeholders and replace:
- `1-800-RV-DREAM` → your phone number
- `hello@airstreamrv.com` → your email
- `123 Renovation Way, Austin TX 78701` → your address

---

## 4. Page Descriptions <a name="pages"></a>

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Main landing page with hero, services, gallery, calculator, testimonials |
| Home 2 | `home2.html` | Alternate landing page with split-screen hero, case studies, features |
| About | `about.html` | Company story, mission, values, team profiles, statistics |
| Services | `services.html` | Detailed service descriptions, pricing packages, cost calculator |
| Blog | `blog.html` | Blog listing with sidebar, filters, recent posts, newsletter |
| Contact | `contact.html` | Tabbed contact/booking/quote forms, map placeholder, FAQ |
| Login | `login.html` | Client portal login (no header, centered card, OAuth buttons) |
| Register | `register.html` | Account creation with password strength meter, terms checkbox |
| 404 | `404.html` | Custom error page with navigation options and animated RV |
| Coming Soon | `coming-soon.html` | Pre-launch page with countdown timer, progress bar, waitlist |

---

## 5. Integrations <a name="integrations"></a>

### Contact Form → Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. In `contact.html`, update the form tag:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Contact Form → Netlify Forms
Add `netlify` attribute to the form tag:
```html
<form name="contact" netlify>
  <input type="hidden" name="form-name" value="contact" />
  ...
</form>
```

### Newsletter → Mailchimp
Replace the newsletter form action with your Mailchimp embed URL from your Mailchimp account's Embedded Forms section.

### Google Maps
Replace the `.map-placeholder` div in `contact.html` with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%" height="200" style="border:0;border-radius:12px"
  allowfullscreen="" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

### Calendar Booking → Calendly
Replace the calendar placeholder div in `contact.html` with:
```html
<div class="calendly-inline-widget"
  data-url="https://calendly.com/YOUR_USERNAME/consultation"
  style="min-width:320px;height:400px;">
</div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Stripe Payment Button
Replace the disabled Stripe button with your actual Stripe payment link:
```html
<a href="https://buy.stripe.com/YOUR_PAYMENT_LINK" class="btn btn-light btn-lg">
  <i class="ri-secure-payment-line"></i> Pay Deposit
</a>
```

---

## 6. Credits <a name="credits"></a>

| Resource | Usage | License |
|----------|-------|---------|
| [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins) | Headings | Open Font License |
| [Google Fonts – Inter](https://fonts.google.com/specimen/Inter) | Body text | Open Font License |
| [Remix Icons](https://remixicon.com) | UI icons | Apache 2.0 |
| Custom CSS & JS | All other code | Your license |

---

## 7. Changelog <a name="changelog"></a>

### v1.0.0 (2024-11-01)
- Initial release
- 10 complete HTML pages
- Full responsive design (360px–1440px)
- Dark/light mode with system preference detection
- RTL layout support
- JavaScript cost calculator
- Form validation with error messages
- File upload with drag & drop
- Countdown timer
- Scroll animations
- Counter animations
- Password strength meter
- Tab-based contact forms
- Back-to-top button
- Toast notifications
- SEO meta tags on all pages
- JSON-LD structured data
- sitemap.xml + robots.txt
- WCAG 2.1 AA accessibility

---

## 8. Support <a name="support"></a>

### Getting Help
- Check this README for setup and customization guidance
- For integration questions, refer to the official docs of each third-party service

### Customization Tips
- Always test on multiple screen sizes after making changes
- Use browser DevTools (F12) to inspect and tweak CSS in real time
- Keep a backup before making major changes

### Performance Tips
- Compress your images using [Squoosh](https://squoosh.app) before adding them
- Convert images to WebP format for better performance
- Use `loading="lazy"` on all `<img>` tags below the fold
