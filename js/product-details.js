/**
 * =========================================================================
 * 🌸 GIFTCRAM - PRODUCT DETAILS & WHATSAPP ORDERING ENGINE
 * =========================================================================
 * Loads product details and directs customers to WhatsApp (6362003060).
 */

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    const all = ProductsManager.getAll();
    if (all.length > 0) {
      loadProduct(all[0].id);
    } else {
      window.location.href = 'products.html';
    }
    return;
  }

  loadProduct(id);
});

function loadProduct(id) {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  currentProduct = ProductsManager.getById(id);

  if (!currentProduct) {
    container.innerHTML = `
      <div style="text-align: center; padding: 80px 20px; background: #FFFFFF; border-radius: 24px; margin: 40px auto; max-width: 600px; border: 1.5px solid var(--border-color);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🌸</div>
        <h2 style="font-family: var(--font-serif); margin-bottom: 12px; color: var(--text-primary);">Gift Keepsake Not Found</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The gift you are looking for may have been updated or moved.</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="products.html" class="btn btn-primary">Browse All Gifts</a>
          <a href="https://wa.me/916362003060" target="_blank" class="btn btn-secondary">Chat on WhatsApp</a>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${currentProduct.name} (₹${currentProduct.price}) | Giftgram`;

  // Update Breadcrumbs
  const breadcrumb = document.getElementById('breadcrumb-product-name');
  if (breadcrumb) breadcrumb.textContent = currentProduct.name;

  // Main Image
  const mainImg = document.getElementById('main-product-image');
  if (mainImg) {
    mainImg.src = currentProduct.image;
    mainImg.alt = currentProduct.name;
    mainImg.onerror = () => handleImageError(mainImg);
  }

  // Text Meta
  const title = document.getElementById('product-title');
  if (title) title.textContent = currentProduct.name;

  const category = document.getElementById('product-category');
  if (category) category.textContent = currentProduct.category || 'Handmade Keepsake';

  const price = document.getElementById('product-price');
  if (price) price.textContent = ProductsManager.formatPrice(currentProduct.price);

  const priceBadge = document.getElementById('form-product-price-badge');
  if (priceBadge) priceBadge.textContent = ProductsManager.formatPrice(currentProduct.price);

  const desc = document.getElementById('product-description');
  if (desc) {
    desc.innerHTML = `<p>${(currentProduct.description || '').replace(/\n/g, '<br>')}</p>`;
  }

  // Setup WhatsApp Action Button
  setupWhatsAppAction();
}

function setupWhatsAppAction() {
  const waBtn = document.getElementById('product-whatsapp-submit-btn');
  const customNotesInput = document.getElementById('custom-notes-input');

  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const customNotes = customNotesInput ? customNotesInput.value.trim() : '';
      const url = ProductsManager.getWhatsAppLink(currentProduct, customNotes);
      window.open(url, '_blank');
    });
  }
}
