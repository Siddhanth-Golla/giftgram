/**
 * =========================================================================
 * 🌸 GIFTCRAM - PRODUCTS CATALOG PAGE LOGIC
 * =========================================================================
 * Clean 3-category filtering, instant search, and 1-click WhatsApp inquiry.
 */

let activeCategory = 'all';
let currentSearch = '';
let currentSort = 'newest';

document.addEventListener('DOMContentLoaded', () => {
  // Read category & search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    if (catParam.includes('frame')) activeCategory = 'frames';
    else if (catParam.includes('hand') || catParam.includes('tin')) activeCategory = 'handmade';
    else if (catParam.includes('keep') || catParam.includes('grad') || catParam.includes('couple') || catParam.includes('birth')) activeCategory = 'keepsakes';
    else activeCategory = catParam;
  }

  const searchParam = urlParams.get('search');
  if (searchParam) {
    currentSearch = searchParam;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = currentSearch;
  }

  renderCategoryPills();
  renderProducts();
  setupFilterListeners();
});

/**
 * Render the 3 simplified categories + All Gifts
 */
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  const categories = [
    { slug: 'all', name: 'All Gifts', icon: '✨' },
    { slug: 'frames', name: 'Photo Frames', icon: '🖼️' },
    { slug: 'handmade', name: 'Handmade Gifts', icon: '🎀' },
    { slug: 'keepsakes', name: 'Custom Keepsakes', icon: '💫' }
  ];

  container.innerHTML = categories.map(cat => `
    <button class="category-pill ${activeCategory === cat.slug ? 'active' : ''}" data-slug="${cat.slug}">
      <span>${cat.icon}</span> ${cat.name}
    </button>
  `).join('');

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.slug;
      renderProducts();
    });
  });
}

/**
 * Filter, sort, and render products grid
 */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countElem = document.getElementById('product-count');
  if (!grid) return;

  let products = ProductsManager.getAll();

  // 1. Filter by Category
  if (activeCategory === 'frames') {
    products = products.filter(p => (p.category || '').toLowerCase().includes('frame'));
  } else if (activeCategory === 'handmade') {
    products = products.filter(p => (p.category || '').toLowerCase().includes('handmade') || (p.category || '').toLowerCase().includes('tin'));
  } else if (activeCategory === 'keepsakes') {
    products = products.filter(p => (p.category || '').toLowerCase().includes('keepsake') || (p.category || '').toLowerCase().includes('standee') || (p.category || '').toLowerCase().includes('custom'));
  }

  // 2. Filter by Search Query
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    products = products.filter(p => 
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  }

  // 3. Sort
  if (currentSort === 'price-low') {
    products.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (currentSort === 'price-high') {
    products.sort((a, b) => Number(b.price) - Number(a.price));
  } else {
    // Newest / Featured: Best sellers first
    products.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
  }

  // Update count indicator
  if (countElem) {
    countElem.textContent = `Showing ${products.length} gift${products.length === 1 ? '' : 's'}`;
  }

  // Empty state
  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 70px 20px; background: #FFFFFF; border-radius: 24px; border: 1.5px dashed var(--border-color);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🌸</div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 8px;">No matching gifts found</h3>
        <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px;">We couldn't find anything matching your search. Chat with our artisan directly for custom creation requests!</p>
        <a href="https://wa.me/916362003060?text=${encodeURIComponent("Hi Giftgram! 🌸 I'm looking for a custom personalized gift. Can you make something special for me?")}" target="_blank" class="btn btn-primary">
          <span>💬</span> Chat on WhatsApp (6362003060)
        </a>
      </div>
    `;
    return;
  }

  // Render Product Cards
  grid.innerHTML = products.map(p => {
    const waUrl = ProductsManager.getWhatsAppLink(p);
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-card-image-wrap">
          <a href="product-details.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" onerror="handleImageError(this)" loading="lazy">
          </a>
          <div class="product-badge-group">
            ${p.bestseller ? '<span class="badge badge-bestseller">Best Seller</span>' : ''}
            <span class="badge badge-custom">Personalized</span>
          </div>
        </div>

        <div class="product-card-body">
          <span class="product-category-label">${p.category || 'Handmade Gift'}</span>
          <h3 class="product-title">
            <a href="product-details.html?id=${p.id}">${p.name}</a>
          </h3>
          <p class="product-short-desc">${p.description || 'Personalized handcrafted keepsake made with love.'}</p>
          
          <div class="product-card-footer" style="flex-wrap: wrap; gap: 8px; margin-top: 14px;">
            <span class="product-price">${ProductsManager.formatPrice(p.price)}</span>
            <div style="display: flex; gap: 6px; width: 100%; margin-top: 6px;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex: 1; justify-content: center; font-size: 0.82rem; padding: 9px 10px; background: #25D366; border-color: #25D366; color: #FFFFFF;" title="Ask questions or order this product on WhatsApp">
                <span style="font-size: 1rem;">💬</span> WhatsApp
              </a>
              <a href="product-details.html?id=${p.id}" class="btn btn-secondary btn-sm" style="flex: 1; justify-content: center; font-size: 0.82rem; padding: 9px 10px;">
                View Details
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Setup search and sort controls
 */
function setupFilterListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }
}
