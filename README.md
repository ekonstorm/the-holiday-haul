# The Holiday Haul — Minimalist Seasonal Affiliate Storefront

A fast, mobile-first, single-page affiliate shopping storefront for seasonal decor and curated gift ideas. Built with vanilla HTML5, CSS3, and modern JavaScript — zero external dependencies, no heavy frameworks, and optimized for free hosting on **Cloudflare Pages**.

---

## 📁 Project Structure

| File | Purpose |
|---|---|
| `index.html` | Semantic storefront markup with decluttered layout and preserved product grid |
| `styles.css` | Complete design system (warm palette, fluid grid, modals, toasts, responsive) |
| `script.js` | Dynamic product grid rendering, dual filtering, live search, mobile nav, modals |
| `products.js` | **Your product inventory data** — edit this file to add or replace products |
| `_headers` | Cloudflare Pages security & immutable asset caching headers |
| `404.html` | Custom branded error page for Cloudflare Pages |
| `favicon.svg` | Browser tab icon |
| `og-image.svg` | High-resolution Open Graph preview card for social sharing & Pinterest |
| `sitemap.xml` | SEO sitemap (update domain before launch) |
| `robots.txt` | Search engine crawler instructions |
| `README.md` | Storefront documentation and deployment guide |

---

## 🚀 Quick Start — Local Testing

### Option A — Double-Click (No Server Needed)
Double-click `index.html` in File Explorer. It opens directly in your browser. All cards render cleanly with inline SVG fallbacks even when offline.

### Option B — Local HTTP Server (Recommended)
```bash
# Python:
python -m http.server 8080

# Or Node:
npx serve .
```
Visit `http://localhost:8080`.

---

## ✏️ Replacing Demo Products With Real Amazon Affiliate Products

All product data is configured in **`products.js`**. Each product object represents one card in the grid:

```javascript
{
  id: 1,                                       // Unique numeric ID (e.g. 1, 2, 3...)
  title: "Lodge Cast Iron Skillet (10.25 Inch)", // Official, concise title from Amazon/Manufacturer
  description: "Pre-seasoned cookware with silicone handle holder for autumn baking and holiday cooking.", // Honest 10-20 word factual summary
  category: "everyday",                        // halloween | christmas | newyear | valentines | everyday
  collection: "everyday",                      // Matching collection key
  giftGuide: ["under25", "hostess"],           // Associated gift guides (or empty array [])
  image: "images/cast-iron-skillet.jpg",       // Local asset or hosted compliant photo
  price: "",                                   // Leave empty "" unless verified regularly
  amazonUrl: "https://www.amazon.com/dp/B00006JSUA?tag=YOUR_TAG-20", // Official SiteStripe affiliate link
  featured: true,                              // true = shown in featured filters
}
```

### Critical Amazon Associates Rules:
1. **Never invent specs, reviews, or star ratings**: Amazon strictly prohibits displaying false social proof.
2. **Handle pricing responsibly**: Amazon product prices fluctuate constantly. Per the Amazon Operating Agreement, static prices must not be shown unless updated programmatically via PA-API with a recent timestamp. Leaving `price: ""` is the cleanest, fully compliant practice.
3. **Do not scrape or hotlink images directly from Amazon CDN**: Download high-resolution merchant/press kit photos into an `images/` directory or use SiteStripe image codes.
4. **Always include affiliate disclaimers**: The storefront automatically includes the required FTC statement: *"As an Amazon Associate I earn from qualifying purchases."*

---

## 🌐 Deploying to Cloudflare Pages

### Deployment Settings:

| Setting | Value |
|---|---|
| **Framework preset** | `None` |
| **Build command** | *(Leave empty)* |
| **Build output directory** | `.` (or `/`) |
| **Root directory** | `/` |
| **Environment variables** | None required |

### Deployment Steps (Git Integration):
1. Push your repository to GitHub or GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
3. Click **Create Application** → **Pages** → **Connect to Git**.
4. Select your repository.
5. In **Build Settings**, set Framework Preset to **None** and Build Output Directory to `.`.
6. Click **Save and Deploy**. Your site will be live across Cloudflare's global edge network in seconds.
