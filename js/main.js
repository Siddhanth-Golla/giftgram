/**
 * =========================================================================
 * 🌸 GIFTCRAM - GLOBAL UI UTILITIES & WHATSAPP FLOATING BUTTON
 * =========================================================================
 */

// Format Currency in Indian Rupee format
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return '₹' + num.toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });
}

// Fallback for missing/broken images
function handleImageError(img) {
  img.onerror = null;
  img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23FFF2F5"/><rect x="20" y="20" width="360" height="360" rx="16" fill="%23FFE4EC" stroke="%23FFAEC0" stroke-width="2"/><text x="50%" y="48%" font-family="Playfair Display,serif" font-size="22" font-weight="bold" fill="%23FF5A84" text-anchor="middle">Giftgram</text><text x="50%" y="58%" font-family="Plus Jakarta Sans,sans-serif" font-size="13" fill="%236B4E5B" text-anchor="middle">Handcrafted Keepsake</text></svg>';
}

// Open WhatsApp for a product directly
function openWhatsAppForProduct(productId, customMessage = "") {
  if (typeof ProductsManager !== 'undefined') {
    const product = ProductsManager.getById(productId);
    const url = ProductsManager.getWhatsAppLink(product, customMessage);
    window.open(url, '_blank');
  } else {
    const defaultMsg = encodeURIComponent("Hi Giftgram! 🌸 I would like to enquire about your personalized handcrafted gifts.");
    window.open(`https://wa.me/916362003060?text=${defaultMsg}`, '_blank');
  }
}

// Toast Notifications System
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🌸';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `
    <span style="font-weight: bold; font-size: 1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.classList.toggle('nav-links-mobile-open');
      if (isVisible) {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = '';
      }
    });
  }

  // Broken image protection
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => handleImageError(img));
  });

  // Inject Floating WhatsApp Button (6362003060) if not present
  if (!document.getElementById('floating-whatsapp-widget')) {
    const waWidget = document.createElement('aside');
    waWidget.id = 'floating-whatsapp-widget';
    waWidget.innerHTML = `
      <a href="https://wa.me/916362003060?text=${encodeURIComponent("Hi Giftgram! 🌸 I'm interested in ordering/customizing a gift. Can you help me?")}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="floating-wa-btn" 
         aria-label="Chat on WhatsApp" 
         title="Chat on WhatsApp (6362003060)">
        <div class="floating-wa-pulse"></div>
        <svg class="floating-wa-icon" viewBox="0 0 32 32" width="28" height="28" fill="#FFFFFF">
          <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.45.69 4.74 1.88 6.7L3.6 28.4l5.88-1.25A12.9 12.9 0 0 0 16 29c7.18 0 13.01-5.82 13.01-13S23.19 3 16.01 3zm7.61 18.23c-.32.9-1.85 1.74-2.58 1.81-.68.07-1.57.1-4.73-1.21-3.79-1.57-6.22-5.43-6.41-5.69-.19-.25-1.55-2.07-1.55-3.95 0-1.88.98-2.8 1.33-3.18.35-.38.77-.48 1.03-.48.26 0 .51.01.74.02.24.01.56-.09.87.66.32.77 1.09 2.66 1.19 2.85.1.19.16.42.03.67-.13.26-.2.41-.39.63-.19.22-.41.49-.59.66-.2.19-.41.4-.18.79.23.39 1.02 1.68 2.18 2.72 1.5 1.33 2.76 1.74 3.15 1.93.39.19.62.16.85-.1.23-.26.98-1.14 1.24-1.53.26-.39.51-.32.86-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.74.45.09.16.09.93-.23 1.83z"/>
        </svg>
        <span class="floating-wa-label">Order on WhatsApp</span>
      </a>
    `;
    document.body.appendChild(waWidget);
  }
});
