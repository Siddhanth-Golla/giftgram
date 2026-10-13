/**
 * =========================================================================
 * 🌸 GIFTCRAM - PRODUCTS MANAGER & WHATSAPP ENGINE
 * =========================================================================
 * Manages product storage, retrieval, WhatsApp redirection to 6362003060,
 * and allows adding new products without modifying HTML.
 */

const WHATSAPP_PHONE = "916362003060"; // 6362003060
const STORAGE_KEY = "giftgram_catalog_products";

const ProductsManager = {
  /**
   * Get all active products (from localStorage or default list)
   */
  getAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using default catalog:", e);
    }
    return [...DEFAULT_PRODUCTS];
  },

  /**
   * Find product by ID
   */
  getById(id) {
    const products = this.getAll();
    return products.find(p => String(p.id) === String(id)) || null;
  },

  /**
   * Filter products by category
   */
  getByCategory(category) {
    const products = this.getAll();
    if (!category || category === "all" || category === "All Gifts") {
      return products;
    }
    const cleanCat = category.toLowerCase().trim();
    return products.filter(p => {
      const pCat = (p.category || "").toLowerCase().trim();
      return pCat === cleanCat || pCat.includes(cleanCat);
    });
  },

  /**
   * Add a new product (saves to localStorage for instant live view)
   */
  add(productData) {
    const products = this.getAll();
    const nextId = products.length > 0 ? Math.max(...products.map(p => Number(p.id) || 0)) + 1 : 1;
    
    const newProduct = {
      id: nextId,
      name: productData.name.trim(),
      category: productData.category || "Photo Frames",
      price: Number(productData.price) || 0,
      image: productData.image || "assets/images/products/polaroid-mini-frame.jpg",
      description: productData.description ? productData.description.trim() : "Handcrafted personalized keepsake made with love.",
      bestseller: !!productData.bestseller
    };

    products.unshift(newProduct);
    this.save(products);
    return newProduct;
  },

  /**
   * Delete a product by ID
   */
  delete(id) {
    let products = this.getAll();
    products = products.filter(p => String(p.id) !== String(id));
    this.save(products);
    return products;
  },

  /**
   * Reset to original factory products
   */
  resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return [...DEFAULT_PRODUCTS];
  },

  /**
   * Save products list into localStorage
   */
  save(products) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  },

  /**
   * Generate WhatsApp link directed to 6362003060 for any product
   */
  getWhatsAppLink(product, customMessage = "") {
    if (!product) {
      const generalText = "Hi Giftgram! 🌸 I would like to enquire about your personalized handcrafted gifts.";
      return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(generalText)}`;
    }

    let message = `Hi Giftgram! 🌸 I am interested in "${product.name}" (Price: ₹${product.price}).\nCan you please share more details and photos?`;
    
    if (customMessage && customMessage.trim()) {
      message += `\n\nMy Message / Request:\n${customMessage.trim()}`;
    }

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Format Indian Rupee currency
   */
  formatPrice(price) {
    return `₹${Number(price || 0).toLocaleString('en-IN')}`;
  },

  /**
   * Export the current product catalog as a downloadable `products-data.js` file
   */
  exportJsFile() {
    const products = this.getAll();
    const jsContent = `/**
 * =========================================================================
 * 🌸 GIFTCRAM - CENTRAL PRODUCT CATALOG DATA
 * Generated from Product Manager on ${new Date().toLocaleDateString()}
 * =========================================================================
 */

const GIFTCRAM_CATEGORIES = [
  { id: "all", name: "All Gifts" },
  { id: "frames", name: "Photo Frames" },
  { id: "handmade", name: "Handmade Gifts" },
  { id: "keepsakes", name: "Custom Keepsakes" }
];

const DEFAULT_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

    const blob = new Blob([jsContent], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products-data.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
