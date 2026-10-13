# 🌸 How to Add New Products to Giftgram

With Giftgram's new 100% static architecture, you **never have to touch or edit any HTML code** to add products!

---

## 🌟 Method 1: The Visual Product Manager (Easiest — No Coding at All)

1. **Open `manage-products.html`** in your web browser (simply double-click it).
2. **Step 1: Upload Photo** — Click the upload box and select your product picture from your computer or phone.
3. **Step 2: Enter Product Name** — e.g., `Personalized Couple Acrylic Frame`
4. **Step 3: Enter Price** — e.g., `699`
5. **Step 4: Select Category** — Pick one of the 3 simple categories:
   - `Photo Frames`
   - `Handmade Gifts`
   - `Custom Keepsakes`
6. Click **"🌸 Add Product to Website"**!

> **Result:** The product appears **instantly on your website**!

### To make it permanent for everyone on the internet (when hosted on GitHub/Netlify):
1. On the `manage-products.html` page, click the button: **"📥 Download products-data.js"**.
2. Replace the file inside your project's `js/` folder with the newly downloaded `products-data.js`.
3. (If using your own photos, put your picture file in the `assets/images/products/` folder).

---

## ⚡ Method 2: Direct Edit in `js/products-data.js` (Takes 30 Seconds)

If you prefer adding products via Notepad or text editor:

1. Put your product photo into `assets/images/products/` (e.g., `my-gift.jpg`).
2. Open `js/products-data.js` in Notepad.
3. Add your product to the list like this:

```javascript
{
  id: 6,
  name: "My New Personalized Gift",
  category: "Photo Frames", // Choose: "Photo Frames", "Handmade Gifts", or "Custom Keepsakes"
  price: 499,
  image: "assets/images/products/my-gift.jpg",
  description: "Handcrafted personalized keepsake made with love.",
  bestseller: false
},
```

Save the file — and your new product is live across the whole website!

---

## 💬 WhatsApp Integration

Every product on the website is automatically linked to your WhatsApp number: **`6362003060`**.
When a customer clicks:
- **WhatsApp Button on any Product Card**
- **Order on WhatsApp Button on Product Details**
- **Floating WhatsApp Widget on the bottom right**

Their WhatsApp automatically opens with a pre-filled message asking about that exact product and its price.
