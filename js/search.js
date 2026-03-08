/* ====================================================
   IceWorld - Search System (search.js)
   ==================================================== */

/* ---- Global Search Overlay ---- */
function openSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      const input = overlay.querySelector('input');
      if (input) input.focus();
    }, 100);
  }
  document.body.style.overflow = 'hidden';
}

function closeSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ---- Render Search Results ---- */
function renderSearchResults(query) {
  const container = document.getElementById('search-results');
  if (!container) return;

  if (!query.trim()) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.5);text-align:center;padding:1rem">Type to search ice creams…</p>';
    return;
  }

  const q = query.toLowerCase();
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.desc.toLowerCase().includes(q)
  ).slice(0, 8);

  if (results.length === 0) {
    container.innerHTML = `<p style="color:rgba(255,255,255,0.5);text-align:center;padding:1rem">No results for "<em>${query}</em>"</p>`;
    return;
  }

  container.innerHTML = results.map(p => `
    <div class="search-result-item" onclick="searchSelectProduct(${p.id})">
      <span class="result-emoji">${p.emoji}</span>
      <div class="result-info">
        <h4>${highlightMatch(p.name, q)}</h4>
        <p>${p.category} · ${p.desc.slice(0, 50)}…</p>
      </div>
      <span class="result-price">₹${p.price}</span>
    </div>
  `).join('');
}

function highlightMatch(text, q) {
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.slice(0, idx) + `<mark style="background:rgba(255,179,198,0.4);border-radius:2px">${text.slice(idx, idx+q.length)}</mark>` + text.slice(idx + q.length);
}

function searchSelectProduct(id) {
  closeSearchOverlay();
  const product = PRODUCTS.find(p => p.id === id);
  if (product) {
    showToast(`Viewing: ${product.name}`, 'info');
    // Add to cart directly on select
    addToCart(id);
  }
}

/* ---- Menu Page Live Filter ---- */
function initMenuSearch() {
  const searchInput  = document.getElementById('menu-search');
  const filterFlavor = document.getElementById('filter-flavor');
  const filterPrice  = document.getElementById('filter-price');
  const filterPop    = document.getElementById('filter-popularity');
  const tagsContainer = document.getElementById('filter-tags');
  const grid         = document.getElementById('products-grid');
  const countEl      = document.getElementById('products-count');

  if (!grid) return;

  let activeCategory = 'all';

  // Category tag filter
  if (tagsContainer) {
    tagsContainer.querySelectorAll('.filter-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        tagsContainer.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeCategory = tag.dataset.cat || 'all';
        applyFilters();
      });
    });
  }

  function applyFilters() {
    const query     = searchInput  ? searchInput.value.toLowerCase()  : '';
    const flavor    = filterFlavor ? filterFlavor.value               : '';
    const maxPrice  = filterPrice  ? parseInt(filterPrice.value) || 9999 : 9999;
    const sortBy    = filterPop    ? filterPop.value                  : '';

    let filtered = PRODUCTS.filter(p => {
      const matchCat  = activeCategory === 'all' || p.category === activeCategory;
      const matchQ    = !query || p.name.toLowerCase().includes(query) || p.tags.some(t => t.includes(query)) || p.desc.toLowerCase().includes(query);
      const matchFlav = !flavor || p.category === flavor || p.tags.includes(flavor);
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchQ && matchFlav && matchPrice;
    });

    // Sort
    if (sortBy === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     filtered.sort((a,b) => b.rating - a.rating);
    if (sortBy === 'popular')    filtered.sort((a,b) => b.reviews - a.reviews);
    if (sortBy === 'new')        filtered.sort((a,b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));

    // Render
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column:1/-1">
          <div class="icon">🍦</div>
          <h3>No ice creams found</h3>
          <p>Try a different search or filter</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
      revealObserver.observe && grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      restoreWishlistState();
    }

    if (countEl) countEl.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
  }

  if (searchInput)  searchInput.addEventListener('input', applyFilters);
  if (filterFlavor) filterFlavor.addEventListener('change', applyFilters);
  if (filterPrice)  filterPrice.addEventListener('change', applyFilters);
  if (filterPop)    filterPop.addEventListener('change', applyFilters);

  // Initial render
  applyFilters();
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Search overlay open
  document.querySelectorAll('[data-open-search]').forEach(btn => {
    btn.addEventListener('click', openSearchOverlay);
  });

  // Search overlay close
  const searchClose = document.getElementById('search-close');
  const searchOverlay = document.getElementById('search-overlay');
  if (searchClose) searchClose.addEventListener('click', closeSearchOverlay);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) closeSearchOverlay();
    });
  }

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearchOverlay();
      closeCart();
    }
  });

  // Search input in overlay
  const overlayInput = document.getElementById('search-input-overlay');
  if (overlayInput) {
    overlayInput.addEventListener('input', e => renderSearchResults(e.target.value));
    overlayInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) {
          closeSearchOverlay();
          window.location.href = `menu.html?q=${encodeURIComponent(q)}`;
        }
      }
    });
  }

  // Check for URL query on menu page
  if (window.location.pathname.includes('menu')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      const searchInput = document.getElementById('menu-search');
      if (searchInput) {
        searchInput.value = q;
      }
    }
    initMenuSearch();
  }
});
