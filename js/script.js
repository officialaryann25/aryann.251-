/* ====================================
   FLORIA - Premium Flower Delivery
   Main JavaScript
   ==================================== */

'use strict';

/* ====================================
   DATA - Flower Products
   ==================================== */
const FLOWER_COLORS = ['#f8c8c8','#fde8e8','#f5d5cc','#e8c4d4','#d4b8e0','#c8daf8','#b8e4c8','#f8e4b8','#e4f8b8','#b8f8e4'];
const CATEGORIES = ['Birthday','Anniversary','Grand Gestures','Vase Arrangements','Hand Tied','Wedding','Same Day','Bestselling'];

// Real flower images provided by the store
const FLOWER_IMAGES = [
  'https://github.com/user-attachments/assets/a82c5805-c15e-4e9f-9483-133acb33c096',
  'https://github.com/user-attachments/assets/b6ab65b6-ae6a-4bdc-a80a-7e2b4a1d9117',
  'https://github.com/user-attachments/assets/f10be619-29ba-469f-911c-7f08cfed37eb',
];
const FLOWER_IMAGE_ALTS = [
  'Purple orchid arrangement in white bowl',
  'Purple orchid in dark square pot',
  'White orchid with pink centres in stone pot',
];

const FLOWER_NAMES = [
  'The Violet Letter','Isn\'t She Lovely','Queen of Violets','Rosette Charm',
  'Blush Romance','Petal Dreams','Garden of Love','Crimson Kiss',
  'Ivory Elegance','Pink Whisper','Lavender Haze','Sunset Bloom',
  'Golden Hour','Morning Dew','Midnight Rose','Summer Serenade',
  'Pastel Perfection','Wild at Heart','Pure Bliss','Secret Garden',
  'Eternal Love','Forever Young','Sweet Nothings','Tender Touch',
  'Enchanted Forest','Fairy Tale','Royal Flush','Diamond Dust',
  'Velvet Dream','Silk Road','Pearl Essence','Crystal Clear',
  'Coral Fantasy','Ocean Breeze','Desert Rose','Tropical Bloom',
  'Spring Awakening','Autumn Harvest','Winter Wonderland','Cherry Blossom',
  'Magnolia Mist','Jasmine Breeze','Lotus Dance','Orchid Affair',
  'Tulip Time','Daisy Chain','Poppy Fields','Lily of the Valley',
  'Carnation Song','Sunflower Days'
];

const PRICES = [
  1595, 4095, 2395, 9395, 2195, 3295, 1895, 4595, 2895, 5995,
  1495, 3795, 2695, 6995, 1995, 4295, 3095, 7495, 2495, 5495,
  1695, 3595, 2295, 8995, 1795, 4795, 2995, 6495, 2095, 5195,
  1595, 3495, 2595, 7995, 1895, 4495, 3195, 8495, 2795, 5695,
  1695, 3695, 2495, 9995, 2195, 4195, 2895, 6995, 1995, 4895
];

const BADGES = ['Bestseller', 'New', 'Sale', 'Popular', null, null, 'Editor\'s Pick', null, null, 'Trending'];

function generateProducts(collection, count = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${collection}-${i + 1}`,
    name: FLOWER_NAMES[i % FLOWER_NAMES.length],
    price: PRICES[i % PRICES.length],
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    reviews: Math.floor(50 + Math.random() * 450),
    collection,
    badge: BADGES[i % BADGES.length],
    color: FLOWER_COLORS[i % FLOWER_COLORS.length],
    image: FLOWER_IMAGES[i % FLOWER_IMAGES.length],
    imageAlt: FLOWER_IMAGE_ALTS[i % FLOWER_IMAGE_ALTS.length]
  }));
}

// All product collections
const PRODUCTS = {
  bestselling: generateProducts('Bestselling', 50),
  birthday: generateProducts('Birthday', 50),
  anniversary: generateProducts('Anniversary', 50),
  grandgestures: generateProducts('Grand Gestures', 50),
  vase: generateProducts('Vase Arrangements', 50),
  handtied: generateProducts('Hand Tied', 50),
  wedding: generateProducts('Wedding', 50),
};

// Flat array for search
const ALL_PRODUCTS = Object.values(PRODUCTS).flat();

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */
function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
  if (half) html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < empty; i++) html += '<i class="far fa-star"></i>';
  return html;
}


function createProductCardHTML(product, showFooter = true) {
  const badgeHTML = product.badge
    ? `<span class="product-card-badge">${product.badge}</span>` : '';

  const flowerEmoji = getFlowerEmoji(product.collection);
  const imgAlt = product.imageAlt || product.name;
  const imgContent = product.image
    ? `<img src="${product.image}" alt="${imgAlt}" loading="lazy" class="product-card-real-img" />`
    : `<div class="product-card-placeholder" style="background:linear-gradient(135deg,${product.color} 0%,${lightenColor(product.color)} 100%);">${flowerEmoji}</div>`;

  return `
    <div class="product-card" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-collection="${product.collection}">
      <div class="product-card-img-wrap">
        ${imgContent}
        ${badgeHTML}
        <div class="product-card-actions">
          <button class="action-btn wishlist-btn" title="Wishlist" onclick="toggleWishlist('${product.id}', this)">
            <i class="far fa-heart"></i>
          </button>
          <button class="action-btn quick-view-btn" title="Quick View" onclick="openProductPage('${product.id}')">
            <i class="far fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">${formatPrice(product.price)}</div>
        <div class="star-rating">
          ${renderStars(parseFloat(product.rating))}
          <span>(${product.reviews})</span>
        </div>
      </div>
      ${showFooter ? `
      <div class="product-card-footer">
        <button class="btn-cart" onclick="addToCart('${product.id}')">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
        <button class="btn-view" onclick="openProductPage('${product.id}')">View</button>
      </div>` : ''}
    </div>
  `;
}

function lightenColor(hex) {
  // Simple lightening - increase each component toward white
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  const lr = Math.min(255, r + 40);
  const lg = Math.min(255, g + 40);
  const lb = Math.min(255, b + 40);
  return `#${lr.toString(16).padStart(2,'0')}${lg.toString(16).padStart(2,'0')}${lb.toString(16).padStart(2,'0')}`;
}

function getFlowerEmoji(collection) {
  const map = {
    'Bestselling': '🌸', 'Birthday': '🌼', 'Anniversary': '🌹',
    'Grand Gestures': '💐', 'Vase Arrangements': '🏵️',
    'Hand Tied': '🌺', 'Wedding': '🤍', 'Same Day': '🌷'
  };
  return map[collection] || '🌸';
}

/* ====================================
   TOAST NOTIFICATION
   ==================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-bell', cart: 'fas fa-shopping-bag' };
  toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ====================================
   CART SYSTEM
   ==================================== */
const Cart = {
  items: [],

  load() {
    try {
      this.items = JSON.parse(localStorage.getItem('floria_cart') || '[]');
    } catch (e) {
      this.items = [];
    }
    this.updateBadge();
  },

  save() {
    localStorage.setItem('floria_cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  add(productId) {
    const product = ALL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    showToast(`${product.name} added to cart!`, 'cart');
    this.renderSidebar();
  },

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    this.renderSidebar();
    this.renderPage && this.renderPage();
  },

  updateQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.remove(productId);
      return;
    }
    this.save();
    this.renderSidebar();
    if (typeof renderCartPage === 'function') renderCartPage();
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  renderSidebar() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;
    if (this.items.length === 0) {
      list.innerHTML = `<div class="cart-empty"><i class="far fa-shopping-bag"></i><p>Your cart is empty</p><a href="index.html" class="btn-primary" style="margin-top:16px;display:inline-block;">Shop Now</a></div>`;
    } else {
      list.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-img" style="background:linear-gradient(135deg,${item.color},${lightenColor(item.color)});display:flex;align-items:center;justify-content:center;font-size:1.6rem;">${getFlowerEmoji(item.collection)}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', -1)"><i class="fas fa-minus"></i></button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', 1)"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="Cart.remove('${item.id}')"><i class="fas fa-times"></i></button>
        </div>
      `).join('');
    }
    // Update total
    const totalEl = document.getElementById('cart-sidebar-total');
    if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
  }
};

/* ====================================
   CART SIDEBAR TOGGLE
   ==================================== */
function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('active');
  Cart.renderSidebar();
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

function addToCart(productId) {
  Cart.add(productId);
  openCart();
}

/* ====================================
   SIDE MENU
   ==================================== */
function openMenu() {
  document.getElementById('side-menu')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('active');
}

function closeMenu() {
  document.getElementById('side-menu')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

/* ====================================
   OVERLAY CLOSE
   ==================================== */
function setupOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMenu();
      closeCart();
    });
  }
}

/* ====================================
   HERO SLIDER
   ==================================== */
function setupHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let interval;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    interval = setInterval(next, 4500);
  }
  function stopAuto() { clearInterval(interval); }

  document.getElementById('hero-next')?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  document.getElementById('hero-prev')?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Touch support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
  });

  goTo(0);
  startAuto();
}

/* ====================================
   PRODUCT HORIZONTAL SLIDER
   ==================================== */
function setupHorizontalSlider(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!track || !prevBtn || !nextBtn) return;

  let position = 0;
  const cardWidth = 260; // card + gap

  function getMaxScroll() {
    return track.scrollWidth - track.parentElement.clientWidth;
  }

  function slideTo(pos) {
    const maxScroll = getMaxScroll();
    position = Math.max(0, Math.min(pos, maxScroll));
    track.style.transform = `translateX(-${position}px)`;
  }

  nextBtn.addEventListener('click', () => slideTo(position + cardWidth * 3));
  prevBtn.addEventListener('click', () => slideTo(position - cardWidth * 3));
}

/* ====================================
   SEARCH SYSTEM
   ==================================== */
function setupSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-results-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) {
      dropdown.classList.remove('show');
      dropdown.innerHTML = '';
      return;
    }

    const results = ALL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.collection.toLowerCase().includes(query)
    ).slice(0, 8);

    if (results.length === 0) {
      dropdown.innerHTML = '<div class="no-results">No flowers found for "' + input.value + '"</div>';
    } else {
      dropdown.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="openProductPage('${p.id}'); document.getElementById('search-results-dropdown').classList.remove('show');">
          <div style="width:40px;height:40px;border-radius:8px;background:linear-gradient(135deg,${p.color},${lightenColor(p.color)});display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">${getFlowerEmoji(p.collection)}</div>
          <div class="item-info">
            <div class="item-name">${p.name}</div>
            <div class="item-price">${formatPrice(p.price)} &bull; ${p.collection}</div>
          </div>
        </div>
      `).join('');
    }
    dropdown.classList.add('show');
  });

  // Search on Enter
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      dropdown.classList.remove('show');
      const query = input.value.trim();
      if (query) showToast(`Showing results for "${query}"`, 'info');
    }
    if (e.key === 'Escape') {
      dropdown.classList.remove('show');
    }
  });

  // Click outside to close
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

/* ====================================
   WISHLIST
   ==================================== */
const Wishlist = {
  items: [],
  load() {
    try { this.items = JSON.parse(localStorage.getItem('floria_wishlist') || '[]'); }
    catch (e) { this.items = []; }
  },
  save() { localStorage.setItem('floria_wishlist', JSON.stringify(this.items)); },
  toggle(id) {
    const idx = this.items.indexOf(id);
    if (idx > -1) { this.items.splice(idx, 1); return false; }
    else { this.items.push(id); return true; }
  },
  has(id) { return this.items.includes(id); }
};

function toggleWishlist(id, btn) {
  Wishlist.load();
  const added = Wishlist.toggle(id);
  Wishlist.save();
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = added ? 'fas fa-heart' : 'far fa-heart';
    icon.style.color = added ? '#b5494a' : '';
  }
  showToast(added ? 'Added to wishlist!' : 'Removed from wishlist', added ? 'success' : 'info');
}

/* ====================================
   PRODUCT PAGE NAVIGATION
   ==================================== */
function openProductPage(productId) {
  window.location.href = `product.html?id=${productId}`;
}

/* ====================================
   CATEGORY NAV
   ==================================== */
function setupCategoryNav() {
  const items = document.querySelectorAll('.category-nav-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const target = item.dataset.target;
      if (target) {
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ====================================
   RENDER COLLECTIONS ON INDEX PAGE
   ==================================== */
function renderBestsellingSlider() {
  const track = document.getElementById('bestselling-track');
  if (!track) return;
  track.innerHTML = PRODUCTS.bestselling.map(p => createProductCardHTML(p, true)).join('');
}

function renderCollection(containerId, products, initialCount = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const visibleProducts = products.slice(0, initialCount);
  container.innerHTML = visibleProducts.map(p => createProductCardHTML(p, true)).join('');
}

function setupShowMore(btnId, containerId, products) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  let shown = 8;
  btn.addEventListener('click', () => {
    shown = Math.min(shown + 8, products.length);
    renderCollection(containerId, products, shown);
    if (shown >= products.length) btn.style.display = 'none';
    showToast(`Showing ${shown} of ${products.length} products`, 'info');
  });
}

/* ====================================
   LAZY LOADING (IntersectionObserver)
   ==================================== */
function setupLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.lazy) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
          observer.unobserve(el);
        }
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-lazy]').forEach(el => observer.observe(el));
}

/* ====================================
   CART PAGE RENDER
   ==================================== */
function renderCartPage() {
  const container = document.getElementById('cart-page-items');
  const summaryContainer = document.getElementById('cart-page-summary');
  if (!container) return;

  Cart.load();

  if (Cart.items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="padding: 80px 20px;">
        <i class="far fa-shopping-bag" style="font-size:4rem;color:#e0d8d4;display:block;margin-bottom:16px;"></i>
        <h3 style="font-family:var(--font-main);font-size:1.6rem;margin-bottom:8px;">Your cart is empty</h3>
        <p style="color:var(--gray);margin-bottom:24px;">Add some beautiful flowers to your cart</p>
        <a href="index.html" class="btn-primary">Shop Now</a>
      </div>`;
    if (summaryContainer) summaryContainer.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="cart-items-table-header">
      <span>Product</span><span>Price</span><span>Qty</span><span>Total</span><span></span>
    </div>
    ${Cart.items.map(item => `
      <div class="cart-page-item">
        <div class="cart-product-info">
          <div class="cart-product-img" style="background:linear-gradient(135deg,${item.color},${lightenColor(item.color)});display:flex;align-items:center;justify-content:center;font-size:2rem;">${getFlowerEmoji(item.collection)}</div>
          <div>
            <div class="cart-product-name">${item.name}</div>
            <div class="cart-product-variant">${item.collection} Collection</div>
          </div>
        </div>
        <div class="cart-product-unit-price">${formatPrice(item.price)}</div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', -1); renderCartPage();">-</button>
          <span class="cart-qty-display">${item.qty}</span>
          <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', 1); renderCartPage();">+</button>
        </div>
        <div class="cart-product-total">${formatPrice(item.price * item.qty)}</div>
        <button class="cart-item-del-btn" onclick="Cart.remove('${item.id}'); renderCartPage();"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('')}`;

  const subtotal = Cart.getTotal();
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping;

  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="cart-summary-title">Order Summary</div>
      <div class="summary-row"><span class="label">Subtotal (${Cart.getCount()} items)</span><span class="value">${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span class="label">Delivery Charges</span><span class="value ${shipping === 0 ? 'free' : ''}">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
      <div class="summary-row total"><span class="label">Total</span><span class="value">${formatPrice(total)}</span></div>
      <div class="coupon-row">
        <input type="text" class="coupon-input" placeholder="Enter coupon code" id="coupon-code-input">
        <button class="coupon-btn" onclick="applyCoupon()">Apply</button>
      </div>
      <button class="btn-proceed-checkout" onclick="proceedToCheckout()">
        <i class="fas fa-lock"></i> Proceed to Checkout
      </button>
      <a href="index.html" class="btn-continue-shopping">← Continue Shopping</a>`;
  }
}

function applyCoupon() {
  const input = document.getElementById('coupon-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  const validCodes = { 'FLORIA10': 10, 'BLOOM20': 20, 'LOVE15': 15 };
  if (validCodes[code]) {
    showToast(`Coupon "${code}" applied! ${validCodes[code]}% off`, 'success');
  } else {
    showToast('Invalid coupon code', 'error');
  }
}

function proceedToCheckout() {
  showToast('Redirecting to checkout...', 'info');
  setTimeout(() => alert('Checkout functionality coming soon! Thank you for choosing Floria 🌸'), 1000);
}

/* ====================================
   PRODUCT DETAIL PAGE
   ==================================== */
function renderProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = productId ? ALL_PRODUCTS.find(p => p.id === productId) : ALL_PRODUCTS[0];

  const container = document.getElementById('product-detail-content');
  if (!container || !product) return;

  const mainImgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" />`
    : `<div style="background:linear-gradient(135deg,${product.color},${lightenColor(product.color)});display:flex;align-items:center;justify-content:center;font-size:6rem;width:100%;height:100%;position:absolute;inset:0;">${getFlowerEmoji(product.collection)}</div>`;
  const oldPrice = Math.floor(product.price * 1.2);

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <a href="index.html">${product.collection}</a>
      <i class="fas fa-chevron-right"></i>
      <span>${product.name}</span>
    </div>
    <div class="product-detail-layout">
      <div class="product-gallery">
        <div class="gallery-main" id="gallery-main" style="position:relative;">
          ${mainImgContent}
        </div>
        <div class="gallery-thumbs" id="gallery-thumbs">
          ${FLOWER_IMAGES.map((imgUrl, i) => `
            <img class="gallery-thumb ${i===0?'active':''}" src="${imgUrl}" alt="${FLOWER_IMAGE_ALTS[i]}" loading="lazy" onclick="selectThumbImg(this, '${imgUrl}', '${FLOWER_IMAGE_ALTS[i]}')" />
          `).join('')}
        </div>
      </div>
      <div class="product-detail-info">
        <div class="product-detail-category">${product.collection} Collection</div>
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="product-detail-rating">
          <div class="stars">${renderStars(parseFloat(product.rating))}</div>
          <span class="count">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="product-detail-price">
          ${formatPrice(product.price)}
          <span class="old-price">${formatPrice(oldPrice)}</span>
        </div>
        <div class="product-delivery-badge">
          <i class="fas fa-truck"></i> Same Day Delivery Available
        </div>
        <p class="product-detail-desc">
          Experience the beauty of nature with our exquisitely curated ${product.name} arrangement.
          Hand-crafted by our expert floral designers, this arrangement is perfect for ${product.collection.toLowerCase()} occasions.
          Each bloom is carefully selected for freshness and longevity, ensuring your gift stays beautiful for days.
        </p>
        <div class="product-options-label">Select Size</div>
        <div class="size-options">
          <div class="size-option active">Small</div>
          <div class="size-option">Medium</div>
          <div class="size-option">Large</div>
          <div class="size-option">Extra Large</div>
        </div>
        <div class="detail-qty-row">
          <div class="detail-qty-controls">
            <button class="detail-qty-btn" onclick="changeDetailQty(-1)"><i class="fas fa-minus"></i></button>
            <span class="detail-qty-display" id="detail-qty">1</span>
            <button class="detail-qty-btn" onclick="changeDetailQty(1)"><i class="fas fa-plus"></i></button>
          </div>
          <span style="font-size:0.85rem;color:var(--gray);">In Stock</span>
        </div>
        <div class="detail-add-btns">
          <button class="btn-add-cart-detail" onclick="addToCartFromDetail('${product.id}')">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn-wishlist-detail" id="detail-wishlist-btn" onclick="toggleWishlistDetail('${product.id}', this)">
            <i class="far fa-heart"></i>
          </button>
        </div>
        <div class="product-features">
          <div class="product-feature"><i class="fas fa-leaf"></i> Fresh Flowers</div>
          <div class="product-feature"><i class="fas fa-truck"></i> Same Day Delivery</div>
          <div class="product-feature"><i class="fas fa-undo"></i> Easy Returns</div>
          <div class="product-feature"><i class="fas fa-shield-alt"></i> Quality Assured</div>
          <div class="product-feature"><i class="fas fa-box"></i> Elegant Packaging</div>
          <div class="product-feature"><i class="fas fa-phone"></i> 24/7 Support</div>
        </div>
      </div>
    </div>
  `;

  // Render related products
  const relatedContainer = document.getElementById('related-products-grid');
  if (relatedContainer) {
    const related = ALL_PRODUCTS.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 4);
    relatedContainer.innerHTML = related.map(p => createProductCardHTML(p, true)).join('');
  }

  // Setup size option clicks
  container.querySelectorAll('.size-option').forEach(opt => {
    opt.addEventListener('click', () => {
      container.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
}

let detailQty = 1;
function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  const display = document.getElementById('detail-qty');
  if (display) display.textContent = detailQty;
}

function addToCartFromDetail(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = Cart.items.find(i => i.id === productId);
  if (existing) {
    existing.qty = detailQty;
  } else {
    Cart.items.push({ ...product, qty: detailQty });
  }
  Cart.save();
  showToast(`Added ${detailQty} item(s) to cart!`, 'success');
  Cart.renderSidebar();
  openCart();
}

function toggleWishlistDetail(id, btn) {
  Wishlist.load();
  const added = Wishlist.toggle(id);
  Wishlist.save();
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = added ? 'fas fa-heart' : 'far fa-heart';
    icon.style.color = added ? '#b5494a' : '';
  }
  showToast(added ? 'Added to wishlist!' : 'Removed from wishlist', added ? 'success' : 'info');
}

function selectThumb(el, color) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function selectThumbImg(el, imgUrl, imgAlt) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const mainWrap = document.getElementById('gallery-main');
  if (mainWrap) {
    const existing = mainWrap.querySelector('img');
    if (existing) {
      existing.src = imgUrl;
      existing.alt = imgAlt || existing.alt;
    }
  }
}

/* ====================================
   LOGIN / REGISTER PAGE
   ==================================== */
function setupAuthPage() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Login form validation
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');
      const emailError = document.getElementById('login-email-error');
      const passError = document.getElementById('login-pass-error');

      emailError.classList.remove('show');
      passError.classList.remove('show');

      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        valid = false;
      }
      if (!password.value || password.value.length < 6) {
        passError.textContent = 'Password must be at least 6 characters';
        passError.classList.add('show');
        valid = false;
      }

      if (valid) {
        showToast('Login successful! Welcome back 🌸', 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);
      }
    });
  }

  // Register form validation
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('reg-name');
      const email = document.getElementById('reg-email');
      const password = document.getElementById('reg-password');
      const confirm = document.getElementById('reg-confirm');
      const nameError = document.getElementById('reg-name-error');
      const emailError = document.getElementById('reg-email-error');
      const passError = document.getElementById('reg-pass-error');
      const confirmError = document.getElementById('reg-confirm-error');

      [nameError, emailError, passError, confirmError].forEach(e => e.classList.remove('show'));

      if (!name.value || name.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameError.classList.add('show');
        valid = false;
      }
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        valid = false;
      }
      if (!password.value || password.value.length < 6) {
        passError.textContent = 'Password must be at least 6 characters';
        passError.classList.add('show');
        valid = false;
      }
      if (password.value !== confirm.value) {
        confirmError.textContent = 'Passwords do not match';
        confirmError.classList.add('show');
        valid = false;
      }

      if (valid) {
        showToast('Account created successfully! Welcome to Floria 🌸', 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);
      }
    });
  }
}

/* ====================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ==================================== */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ====================================
   SCROLL HEADER SHADOW
   ==================================== */
function setupScrollHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 2px 12px rgba(0,0,0,0.06)';
  });
}

/* ====================================
   INIT
   ==================================== */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';

  // Universal
  Cart.load();
  Wishlist.load();
  setupOverlay();
  setupScrollHeader();

  if (page === 'index') {
    setupSearch();
    setupHeroSlider();
    setupCategoryNav();
    renderBestsellingSlider();
    setupHorizontalSlider('bestselling-track', 'best-prev', 'best-next');

    renderCollection('birthday-grid', PRODUCTS.birthday);
    setupShowMore('birthday-show-more', 'birthday-grid', PRODUCTS.birthday);

    renderCollection('anniversary-grid', PRODUCTS.anniversary);
    setupShowMore('anniversary-show-more', 'anniversary-grid', PRODUCTS.anniversary);

    renderCollection('grandgestures-grid', PRODUCTS.grandgestures);
    setupShowMore('grandgestures-show-more', 'grandgestures-grid', PRODUCTS.grandgestures);

    renderCollection('vase-grid', PRODUCTS.vase);
    setupShowMore('vase-show-more', 'vase-grid', PRODUCTS.vase);

    renderCollection('handtied-grid', PRODUCTS.handtied);
    setupShowMore('handtied-show-more', 'handtied-grid', PRODUCTS.handtied);

    renderCollection('wedding-grid', PRODUCTS.wedding);
    setupShowMore('wedding-show-more', 'wedding-grid', PRODUCTS.wedding);

    setupLazyLoading();
    setupSmoothScroll();
  }

  if (page === 'cart') {
    renderCartPage();
  }

  if (page === 'product') {
    renderProductPage();
  }

  if (page === 'login') {
    setupAuthPage();
  }
});
