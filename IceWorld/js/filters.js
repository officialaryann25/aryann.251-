/* ===================================================================
   IceWorld - Filters JavaScript
   Product search, category, price, sort filters
   =================================================================== */

'use strict';

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 'p1', name: 'Strawberry Swirl Cone', category: 'cones', price: 89, originalPrice: 120, rating: 4.8, reviews: 234, image: '🍦', tags: ['popular', 'bestseller'], isNew: false, isHot: true },
  { id: 'p2', name: 'Chocolate Fudge Sundae', category: 'sundaes', price: 149, originalPrice: 180, rating: 4.9, reviews: 567, image: '🍫', tags: ['bestseller'], isNew: false, isHot: true },
  { id: 'p3', name: 'Mango Tango Scoop', category: 'scoops', price: 69, originalPrice: 85, rating: 4.6, reviews: 189, image: '🥭', tags: ['seasonal'], isNew: true, isHot: false },
  { id: 'p4', name: 'Mint Chip Bliss', category: 'scoops', price: 79, originalPrice: 99, rating: 4.7, reviews: 312, image: '🌿', tags: ['popular'], isNew: false, isHot: false },
  { id: 'p5', name: 'Rainbow Sherbet Cup', category: 'cups', price: 59, originalPrice: 75, rating: 4.5, reviews: 145, image: '🌈', tags: ['popular'], isNew: true, isHot: false },
  { id: 'p6', name: 'Vanilla Dream Waffle', category: 'waffles', price: 129, originalPrice: 160, rating: 4.8, reviews: 423, image: '🧇', tags: ['bestseller'], isNew: false, isHot: true },
  { id: 'p7', name: 'Blueberry Cheesecake', category: 'premium', price: 199, originalPrice: 250, rating: 4.9, reviews: 198, image: '🫐', tags: ['premium', 'new'], isNew: true, isHot: false },
  { id: 'p8', name: 'Cookies & Cream Sundae', category: 'sundaes', price: 139, originalPrice: 170, rating: 4.7, reviews: 356, image: '🍪', tags: ['popular', 'bestseller'], isNew: false, isHot: true },
  { id: 'p9', name: 'Pistachio Kulfi Bar', category: 'bars', price: 49, originalPrice: 60, rating: 4.6, reviews: 267, image: '🟢', tags: ['popular'], isNew: false, isHot: false },
  { id: 'p10', name: 'Butterscotch Ripple', category: 'scoops', price: 89, originalPrice: 110, rating: 4.8, reviews: 412, image: '🍯', tags: ['bestseller'], isNew: false, isHot: true },
  { id: 'p11', name: 'Paan Ice Cream', category: 'specialty', price: 99, originalPrice: 120, rating: 4.5, reviews: 178, image: '🌿', tags: ['specialty'], isNew: true, isHot: false },
  { id: 'p12', name: 'Gulab Jamun Sundae', category: 'sundaes', price: 159, originalPrice: 200, rating: 4.9, reviews: 534, image: '🟤', tags: ['bestseller', 'popular'], isNew: false, isHot: true },
  { id: 'p13', name: 'Rose Kulfi Stick', category: 'bars', price: 45, originalPrice: 55, rating: 4.4, reviews: 156, image: '🌹', tags: ['specialty'], isNew: false, isHot: false },
  { id: 'p14', name: 'Tender Coconut Scoop', category: 'scoops', price: 79, originalPrice: 95, rating: 4.7, reviews: 289, image: '🥥', tags: ['popular'], isNew: false, isHot: false },
  { id: 'p15', name: 'Chocolate Lava Waffle', category: 'waffles', price: 169, originalPrice: 210, rating: 4.9, reviews: 623, image: '🌋', tags: ['bestseller', 'premium'], isNew: false, isHot: true },
  { id: 'p16', name: 'Litchi Sorbet Cup', category: 'cups', price: 65, originalPrice: 80, rating: 4.5, reviews: 134, image: '🍈', tags: ['seasonal', 'new'], isNew: true, isHot: false },
  { id: 'p17', name: 'Alphonso Mango Gelato', category: 'premium', price: 219, originalPrice: 280, rating: 4.9, reviews: 445, image: '🥭', tags: ['premium', 'seasonal'], isNew: false, isHot: true },
  { id: 'p18', name: 'Kesar Pista Sandwich', category: 'bars', price: 55, originalPrice: 70, rating: 4.6, reviews: 210, image: '🟡', tags: ['popular'], isNew: false, isHot: false },
  { id: 'p19', name: 'Caramel Crunch Cone', category: 'cones', price: 95, originalPrice: 120, rating: 4.7, reviews: 378, image: '🍮', tags: ['popular', 'bestseller'], isNew: false, isHot: true },
  { id: 'p20', name: 'Triple Berry Parfait', category: 'premium', price: 249, originalPrice: 320, rating: 5.0, reviews: 189, image: '🫐', tags: ['premium', 'new'], isNew: true, isHot: false },
  { id: 'p21', name: 'Choco Chip Cookie Dough', category: 'cups', price: 115, originalPrice: 145, rating: 4.8, reviews: 512, image: '🍪', tags: ['bestseller'], isNew: false, isHot: true },
  { id: 'p22', name: 'Saffron Milk Bar', category: 'bars', price: 65, originalPrice: 80, rating: 4.6, reviews: 167, image: '🌼', tags: ['specialty'], isNew: true, isHot: false },
  { id: 'p23', name: 'Dark Chocolate Gelato', category: 'premium', price: 199, originalPrice: 250, rating: 4.8, reviews: 334, image: '🍫', tags: ['premium', 'popular'], isNew: false, isHot: false },
  { id: 'p24', name: 'Strawberry Cheesecake Cup', category: 'cups', price: 125, originalPrice: 160, rating: 4.7, reviews: 278, image: '🍓', tags: ['popular', 'new'], isNew: true, isHot: false }
];

// ===== FILTER STATE =====
let filterState = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 500,
  sort: 'popularity',
  tags: [],
  rating: 0
};

let displayedProducts = [...PRODUCTS];

// ===== FILTER MANAGER =====
const IceWorldFilters = {
  init() {
    this.bindEvents();
    this.renderProducts();
    this.updatePriceDisplay();
  },

  bindEvents() {
    // Search
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        filterState.search = e.target.value.trim().toLowerCase();
        this.applyFilters();
      }, 300));

      // Clear search
      const clearSearch = document.getElementById('clear-search');
      if (clearSearch) {
        clearSearch.addEventListener('click', () => {
          searchInput.value = '';
          filterState.search = '';
          this.applyFilters();
        });
        searchInput.addEventListener('input', () => {
          clearSearch.style.display = searchInput.value ? 'flex' : 'none';
        });
      }
    }

    // Category filter pills
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterState.category = pill.dataset.category || 'all';
        this.applyFilters();
      });
    });

    // Price range slider
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
      priceRange.addEventListener('input', (e) => {
        filterState.maxPrice = parseInt(e.target.value);
        this.updatePriceDisplay();
        this.applyFilters();
      });
    }

    const minPriceInput = document.getElementById('min-price-input');
    const maxPriceInput = document.getElementById('max-price-input');

    if (minPriceInput) {
      minPriceInput.addEventListener('change', (e) => {
        filterState.minPrice = parseInt(e.target.value) || 0;
        this.applyFilters();
      });
    }

    if (maxPriceInput) {
      maxPriceInput.addEventListener('change', (e) => {
        filterState.maxPrice = parseInt(e.target.value) || 500;
        this.applyFilters();
      });
    }

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        filterState.sort = e.target.value;
        this.applyFilters();
      });
    }

    // Tag filters
    document.querySelectorAll('.tag-filter').forEach(tag => {
      tag.addEventListener('change', (e) => {
        const tagValue = e.target.value;
        if (e.target.checked) {
          filterState.tags.push(tagValue);
        } else {
          filterState.tags = filterState.tags.filter(t => t !== tagValue);
        }
        this.applyFilters();
      });
    });

    // Rating filter
    document.querySelectorAll('.rating-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseFloat(btn.dataset.rating) || 0;
        filterState.rating = filterState.rating === rating ? 0 : rating;
        document.querySelectorAll('.rating-filter').forEach(b => b.classList.remove('active'));
        if (filterState.rating > 0) btn.classList.add('active');
        this.applyFilters();
      });
    });

    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // View toggle (grid/list)
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        const grid = document.querySelector('.products-grid');
        if (grid) {
          grid.classList.toggle('list-view', view === 'list');
        }
      });
    });
  },

  applyFilters() {
    let filtered = [...PRODUCTS];

    // Search
    if (filterState.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filterState.search) ||
        p.category.toLowerCase().includes(filterState.search) ||
        p.tags.some(t => t.includes(filterState.search))
      );
    }

    // Category
    if (filterState.category && filterState.category !== 'all') {
      filtered = filtered.filter(p => p.category === filterState.category);
    }

    // Price range
    filtered = filtered.filter(p =>
      p.price >= filterState.minPrice && p.price <= filterState.maxPrice
    );

    // Tags
    if (filterState.tags.length > 0) {
      filtered = filtered.filter(p =>
        filterState.tags.some(tag => p.tags.includes(tag))
      );
    }

    // Rating
    if (filterState.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filterState.rating);
    }

    // Sort
    filtered = this.sortProducts(filtered, filterState.sort);

    displayedProducts = filtered;
    this.renderProducts();
    this.updateResultCount(filtered.length);
  },

  sortProducts(products, sort) {
    const sorted = [...products];
    switch (sort) {
      case 'popularity':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'discount':
        return sorted.sort((a, b) => {
          const discA = (a.originalPrice - a.price) / a.originalPrice;
          const discB = (b.originalPrice - b.price) / b.originalPrice;
          return discB - discA;
        });
      default:
        return sorted;
    }
  },

  updatePriceDisplay() {
    const display = document.getElementById('max-price-display');
    if (display) {
      display.textContent = `₹${filterState.maxPrice}`;
    }
    const minDisplay = document.getElementById('min-price-display');
    if (minDisplay) {
      minDisplay.textContent = `₹${filterState.minPrice}`;
    }
  },

  updateResultCount(count) {
    const resultCount = document.getElementById('result-count');
    if (resultCount) {
      resultCount.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
  },

  resetFilters() {
    filterState = {
      search: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 500,
      sort: 'popularity',
      tags: [],
      rating: 0
    };

    // Reset UI
    const searchInput = document.getElementById('product-search');
    if (searchInput) searchInput.value = '';

    const priceRange = document.getElementById('price-range');
    if (priceRange) priceRange.value = 500;

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'popularity';

    document.querySelectorAll('.category-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'all');
    });

    document.querySelectorAll('.tag-filter').forEach(t => t.checked = false);
    document.querySelectorAll('.rating-filter').forEach(b => b.classList.remove('active'));

    this.updatePriceDisplay();
    this.applyFilters();
    
    showFiltersToast('Filters reset', 'info');
  },

  renderProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    const noResults = document.querySelector('.no-results');

    if (displayedProducts.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = displayedProducts.map((product, index) =>
      renderProductCard(product, index)
    ).join('');

    // Animate new products
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });

    // Re-bind cart and wishlist events
    if (window.IceWorldCart) window.IceWorldCart.updateBadges();
    if (window.IceWorldWishlist) window.IceWorldWishlist.updateWishlistButtons();

    // Bind add-to-cart buttons
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;
        const product = PRODUCTS.find(p => p.id === productId);
        if (product && window.IceWorldCart) {
          window.IceWorldCart.addItem(product);
        }
      });
    });

    // Bind wishlist buttons
    grid.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.wishlistId;
        const product = PRODUCTS.find(p => p.id === productId);
        if (product && window.IceWorldWishlist) {
          const added = window.IceWorldWishlist.toggle(product);
          const icon = btn.querySelector('i');
          if (icon) {
            icon.classList.toggle('fas', added);
            icon.classList.toggle('far', !added);
          }
          btn.classList.toggle('wishlisted', added);
        }
      });
    });
  }
};

// ===== PRODUCT CARD RENDERER =====
function renderProductCard(product, index) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  
  const stars = generateStarsHtml(product.rating);
  
  const badgeHtml = product.isHot
    ? `<span class="product-card-badge hot">🔥 Hot</span>`
    : product.isNew
    ? `<span class="product-card-badge new">✨ New</span>`
    : discount > 0
    ? `<span class="product-card-badge">${discount}% OFF</span>`
    : '';

  const isWishlisted = window.IceWorldWishlist && window.IceWorldWishlist.isWishlisted(product.id);

  return `
    <div class="product-card tilt-card" data-id="${product.id}">
      <div class="product-card-image">
        <div class="product-emoji-display" style="font-size:5rem;display:flex;align-items:center;justify-content:center;height:100%;min-height:180px;">
          ${product.image}
        </div>
        ${badgeHtml}
        <div class="product-card-actions">
          <button class="product-action-btn wishlist-btn ${isWishlisted ? 'wishlisted' : ''}" 
            data-wishlist-id="${product.id}"
            title="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
          <button class="product-action-btn" onclick="openQuickView('${product.id}')" title="Quick view">
            <i class="far fa-eye"></i>
          </button>
        </div>
        <div class="product-card-overlay">
          <button class="btn-add-cart btn btn-white btn-sm" data-product-id="${product.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-category">${formatCategory(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="stock-indicator">
          <span class="stock-dot in-stock"></span>
          <span style="color:#2ecc71;font-size:0.75rem;font-weight:600;">In Stock</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${product.price}</span>
          ${product.originalPrice > product.price ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
          ${discount > 0 ? `<span class="price-discount">${discount}% off</span>` : ''}
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn-add-cart" data-product-id="${product.id}">
          <i class="fas fa-cart-plus"></i>
          Add to Cart
        </button>
        <button class="product-action-btn wishlist-btn ${isWishlisted ? 'wishlisted' : ''}" 
          data-wishlist-id="${product.id}">
          <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
    </div>
  `;
}

function generateStarsHtml(rating) {
  const full = Math.floor(rating);
  const half = (rating % 1) >= 0.5;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= full) html += '<i class="fas fa-star" style="color:#ffc107;font-size:0.8rem;"></i>';
    else if (i === full + 1 && half) html += '<i class="fas fa-star-half-alt" style="color:#ffc107;font-size:0.8rem;"></i>';
    else html += '<i class="far fa-star" style="color:#ffc107;font-size:0.8rem;"></i>';
  }
  return html;
}

function formatCategory(cat) {
  const categories = {
    cones: '🍦 Cones',
    sundaes: '🍨 Sundaes',
    scoops: '🥄 Scoops',
    cups: '🥤 Cups',
    bars: '🧊 Bars',
    waffles: '🧇 Waffles',
    premium: '⭐ Premium',
    specialty: '✨ Specialty'
  };
  return categories[cat] || cat;
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const content = modal.querySelector('.quick-view-content');
  if (content) {
    const discount = product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    content.innerHTML = `
      <div class="quick-view-layout">
        <div class="quick-view-image">
          <div style="font-size:8rem;text-align:center;padding:2rem;">${product.image}</div>
        </div>
        <div class="quick-view-info">
          <span class="product-category">${formatCategory(product.category)}</span>
          <h2>${product.name}</h2>
          <div class="product-rating" style="margin:1rem 0;">
            <div class="stars">${generateStarsHtml(product.rating)}</div>
            <span class="rating-count">(${product.reviews} reviews)</span>
          </div>
          <div class="product-price" style="margin:1rem 0;">
            <span class="price-current" style="font-size:1.8rem;">₹${product.price}</span>
            ${product.originalPrice > product.price ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
            ${discount > 0 ? `<span class="price-discount">${discount}% off</span>` : ''}
          </div>
          <div class="quick-view-actions" style="display:flex;gap:1rem;margin-top:1.5rem;">
            <button class="btn btn-primary" onclick="addToCartFromModal('${product.id}')">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button class="btn btn-secondary" onclick="toggleWishlistFromModal('${product.id}')">
              <i class="far fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
}

function addToCartFromModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product && window.IceWorldCart) {
    window.IceWorldCart.addItem(product);
  }
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.remove('open');
}

function toggleWishlistFromModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product && window.IceWorldWishlist) {
    window.IceWorldWishlist.toggle(product);
  }
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.remove('open');
}

// ===== UTILITIES =====
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function showFiltersToast(message, type) {
  if (window.IceWorldToast) {
    window.IceWorldToast.show(message, type);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.menu-page')) {
    IceWorldFilters.init();
    window.IceWorldFilters = IceWorldFilters;
  }

  // Expose product data and helpers globally
  window.PRODUCTS = PRODUCTS;
  window.renderProductCard = renderProductCard;
  window.openQuickView = openQuickView;
  window.addToCartFromModal = addToCartFromModal;
  window.toggleWishlistFromModal = toggleWishlistFromModal;
});
