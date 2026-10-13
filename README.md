# 🌸 Giftgram — Boutique Custom & Handmade Gifting Website

**"Gifts made personal."**

Giftgram is a modern, responsive, aesthetic e-commerce storefront for a custom gifting brand.
Built with a luxurious **baby pink aesthetic**, responsive mobile-first layout, **1-click WhatsApp ordering** (`6362003060`), and a **zero-coding product addition system**.

---

## ✨ Key Highlights

- 🚀 **100% Static Frontend**: No backend server, Java, Spring Boot, or MySQL required! Can be launched freely anywhere (GitHub Pages, Netlify, Vercel, or simply opened locally by double-clicking `index.html`).
- 💬 **Direct WhatsApp Ordering (`6362003060`)**: Clicking any product directly directs the customer to WhatsApp with a pre-filled, personalized inquiry message including the exact product name and price.
- 🖼️ **3 Clean & Simplified Categories**:
  1. **Photo Frames** (Polaroid keepsakes, collage frames, magazine frames)
  2. **Handmade Gifts** (Miniature keepsake boxes, love tins, handcrafted tokens)
  3. **Custom Keepsakes** (3D acrylic milestone standees, couple keepsakes)
- 📸 **Add Products Without HTML Editing**:
  - Open `manage-products.html` in your browser.
  - Upload the photo, enter the product name, price, and category.
  - Done! The product appears instantly on the website!
  - Also includes a 1-click **"Download products-data.js"** button to publish updates for everyone on the web.

---

## 📂 Project Directory Structure

```text
Giftgram/
├── index.html                  # Homepage (Hero, collections, bestsellers, reviews)
├── products.html               # Boutique catalog (Filter by 3 categories, search, sort)
├── product-details.html        # Single product view & direct WhatsApp order box
├── manage-products.html        # Visual product manager (upload photo & add products)
├── HOW_TO_ADD_PRODUCTS.md      # Beginner-friendly guide on adding products
├── css/
│   └── style.css               # Signature Baby Pink styling & animations
├── js/
│   ├── products-data.js        # Central product catalog data
│   ├── products-manager.js     # Storage sync, WhatsApp engine (6362003060)
│   ├── products.js             # Catalog filtering & card rendering
│   ├── product-details.js      # Details page logic
│   └── main.js                 # Global utilities & floating WhatsApp widget
└── assets/
    └── images/
        ├── logo.png            # Brand logo
        └── products/           # Product photography
```

---

## 🚀 How to Launch and Host for Free

### Option 1: View Locally on Your Computer
Simply double-click `index.html` in your file explorer. It will open in your default browser (Chrome, Edge, Safari, Firefox) and work completely offline!

### Option 2: Deploy Free on GitHub Pages
1. Push this folder to a GitHub repository.
2. In GitHub, go to **Settings > Pages**.
3. Under **Branch**, select `main` (root) and click **Save**.
4. Your website is live worldwide with a free HTTPS address!

### Option 3: Deploy Free on Netlify or Vercel
1. Go to [netlify.com](https://www.netlify.com/) or [vercel.com](https://vercel.com/).
2. Drag and drop the `Giftgram` folder.
3. Your site is instantly live with custom domain support.

---

## 💬 WhatsApp Configuration

All customer actions connect directly to:
- **Phone Number**: `6362003060` (Country Code: `+91`)
- **Direct Link**: `https://wa.me/916362003060`
- To update this number in the future, simply change the `WHATSAPP_PHONE` constant in [`js/products-manager.js`](file:///c:/Users/Dell/OneDrive/Desktop/Giftgram/js/products-manager.js#L9).

---

## 🎨 Design System

- **Background**: Soft warm baby pink `#FFF2F5` / `#FFF8FA`
- **Primary Brand Rose**: `#FF5A84` / Hover: `#E83E6A`
- **Blush Accents**: `#FFE4EC` / Borders: `#FFD9E2`
- **Contrast Text**: Deep espresso `#2B1720`
- **Typography**: Playfair Display (Serif headers) + Plus Jakarta Sans (Clean body)
