/**
 * IceWorld – Main JavaScript
 * Handles: Shopping Cart, Search, Filters, Mobile Nav, Hero Slider,
 *          Product Carousel, Wishlist, Smooth Scroll, Form Validation,
 *          Hover Animations, Toast Notifications, Preloader, Scroll-to-Top.
 */

'use strict';

/* ============================================================
   PRODUCT DATA  (mirrors HTML data attributes)
   ============================================================ */
const PRODUCTS = [
  { id: 1,  name: 'Double Vanilla Dream',      price: 419,  category: 'classic',    popularity: 98, img: 'images/prod-vanilla.svg',       desc: 'Rich double-churned vanilla with Madagascar vanilla bean specks.' },
  { id: 2,  name: 'Fresh Strawberry Swirl',    price: 459,  category: 'classic',    popularity: 95, img: 'images/prod-strawberry.svg',    desc: 'Real strawberry pieces swirled into creamy vanilla base.' },
  { id: 3,  name: 'Chocolate Fudge Sundae',    price: 749,  category: 'sundae',     popularity: 92, img: 'images/prod-choc-sundae.svg',   desc: 'Three scoops, hot fudge, whipped cream, nuts, and a cherry.' },
  { id: 4,  name: 'Oreo Crunch Milkshake',     price: 579,  category: 'milkshake',  popularity: 88, img: 'images/prod-milkshake.svg',     desc: 'Thick creamy milkshake blended with whole Oreo cookies.' },
  { id: 5,  name: 'Pistachio Gelato',          price: 499,  category: 'gelato',     popularity: 85, img: 'images/prod-pistachio.svg',     desc: 'Authentic Sicilian-style pistachio gelato with real nuts.' },
  { id: 6,  name: 'Mango Tango Sorbet',        price: 379,  category: 'sorbet',     popularity: 80, img: 'images/prod-mango-sorbet.svg',  desc: 'Dairy-free sorbet made with 100% real Alphonso mangoes.' },
  { id: 7,  name: 'Belgian Waffle Stack',      price: 919, category: 'waffle',     popularity: 78, img: 'images/prod-waffle-stack.svg', desc: 'Two crispy waffles, three scoops, and your choice of sauces.' },
  { id: 8,  name: 'Triple Choco Blast',        price: 499,  category: 'classic',    popularity: 75, img: 'images/prod-chocolate.svg',     desc: 'Dark, milk, and white chocolate blended into every scoop.' },
  { id: 9,  name: 'Mint Choc Chip',            price: 439,  category: 'classic',    popularity: 70, img: 'images/prod-mint.svg',          desc: 'Cool peppermint cream loaded with rich chocolate chips.' },
  { id: 10, name: 'Rainbow Sprinkle Sundae',   price: 789,  category: 'sundae',     popularity: 83, img: 'images/prod-rainbow-sundae.svg',desc: 'A colourful explosion of flavours, toppings and sprinkles.' },
  { id: 11, name: 'Banana Split Classic',      price: 659,  category: 'sundae',     popularity: 76, img: 'images/prod-banana-split.svg', desc: 'Fresh banana, three ice cream flavours, sauces and toppings.' },
  { id: 12, name: 'Strawberry Bliss Shake',    price: 619,  category: 'milkshake',  popularity: 72, img: 'images/prod-straw-shake.svg',  desc: 'Fresh strawberries whipped into a silky smooth shake.' },
  { id: 13, name: 'Hazelnut Espresso Gelato',  price: 539,  category: 'gelato',     popularity: 68, img: 'images/prod-hazelnut.svg',      desc: 'Bold espresso meets creamy hazelnut in every spoonful.' },
  { id: 14, name: 'Raspberry Lemon Sorbet',    price: 359,  category: 'sorbet',     popularity: 65, img: 'images/prod-raspberry.svg',     desc: 'Tangy raspberries with a hint of zesty lemon. Dairy-free.' },
  { id: 15, name: 'Nutella Crepe Delight',     price: 829,  category: 'waffle',     popularity: 60, img: 'images/prod-crepe.svg',         desc: 'Thin French crepe filled with Nutella and a scoop of gelato.' },
];

/* ============================================================
   UTILITIES
   ============================================================ */
/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a number as Indian Rupee string.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Debounce a function.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
const toastContainer = document.getElementById('toast-container');

/**
 * Show a toast notification.
 * @param {string} message - Message text.
 * @param {'success'|'error'|'info'|'warning'} [type='success']
 * @param {number} [duration=3000] - Auto-dismiss after ms.
 */
function showToast(message, type = 'success', duration = 3000) {
  if (!toastContainer) return;

  const iconMap = {
    success: 'fa-check-circle',
    error:   'fa-exclamation-circle',
    info:    'fa-info-circle',
    warning: 'fa-exclamation-triangle',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<i class="fas ${iconMap[type] || iconMap.info}"></i><span>${message}</span>`;

  toastContainer.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(dismiss, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
}

/* ============================================================
   PRELOADER
   ============================================================ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hide = () => preloader.classList.add('hidden');

  if (document.readyState === 'complete') {
    setTimeout(hide, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 300), { once: true });
  }
}());

/* ============================================================
   HEADER SCROLL BEHAVIOUR
   ============================================================ */
(function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}());

/* ============================================================
   SMOOTH SCROLLING
   ============================================================ */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerOffset = document.getElementById('main-header')?.offsetHeight || 0;
    const elementTop = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementTop - headerOffset - 12;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === targetId);
      link.removeAttribute('aria-current');
    });
    const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (activeLink) activeLink.setAttribute('aria-current', 'page');

    // Close mobile menu if open
    closeMobileMenu();
  });
}());

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks     = document.getElementById('nav-links');

function openMobileMenu() {
  if (!navLinks || !hamburgerBtn) return;
  navLinks.classList.add('mobile-open');
  hamburgerBtn.classList.add('active');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMobileMenu() {
  if (!navLinks || !hamburgerBtn) return;
  navLinks.classList.remove('mobile-open');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

(function initMobileNav() {
  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('mobile-open') &&
      !navLinks.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Dropdown toggle on mobile
  navLinks.querySelectorAll('.has-dropdown > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const parent = link.closest('.has-dropdown');
        const isOpen = parent.classList.contains('dropdown-open');
        // Close all others
        navLinks.querySelectorAll('.has-dropdown').forEach((d) => d.classList.remove('dropdown-open'));
        if (!isOpen) parent.classList.add('dropdown-open');
      }
    });
  });

  // Close on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
}());

/* ============================================================
   SEARCH TOGGLE (mobile icon)
   ============================================================ */
(function initSearchToggle() {
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const navSearch       = document.getElementById('nav-search');
  if (!searchToggleBtn || !navSearch) return;

  searchToggleBtn.addEventListener('click', () => {
    const isOpen = navSearch.classList.contains('mobile-search-open');
    navSearch.classList.toggle('mobile-search-open', !isOpen);
    searchToggleBtn.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) {
      navSearch.querySelector('.search-input')?.focus();
    }
  });
}());

/* ============================================================
   PRODUCT SEARCH
   ============================================================ */
(function initSearch() {
  const searchForm    = document.getElementById('search-form');
  const searchInput   = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchForm || !searchInput || !searchResults) return;

  const renderResults = (query) => {
    const q = query.trim().toLowerCase();

    if (!q) {
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      return;
    }

    const matches = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    searchResults.hidden = false;

    if (!matches.length) {
      searchResults.innerHTML = `<p class="search-no-results">No results for "<strong>${escapeHtml(query)}</strong>"</p>`;
      return;
    }

    searchResults.innerHTML = matches
      .slice(0, 8)
      .map(
        (p) => `
      <div class="search-result-item" role="option" data-id="${p.id}" tabindex="0" aria-label="${p.name}, ${formatCurrency(p.price)}">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <div>
          <div class="result-name">${highlightMatch(p.name, q)}</div>
          <div style="font-size:0.78rem;color:var(--text-light);text-transform:capitalize">${p.category}</div>
        </div>
        <span class="result-price">${formatCurrency(p.price)}</span>
      </div>`
      )
      .join('');

    // Click handler for results
    searchResults.querySelectorAll('.search-result-item').forEach((item) => {
      const addClickOrKey = (e) => {
        if (e.type === 'keydown' && e.key !== 'Enter') return;
        const id = parseInt(item.dataset.id, 10);
        const product = PRODUCTS.find((p) => p.id === id);
        if (product) {
          cartAdd(product);
          searchResults.hidden = true;
          searchInput.value = '';
        }
      };
      item.addEventListener('click', addClickOrKey);
      item.addEventListener('keydown', addClickOrKey);
    });
  };

  searchInput.addEventListener('input', debounce((e) => renderResults(e.target.value), 250));

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderResults(searchInput.value);
    // Filter main product grid too
    const q = searchInput.value.trim().toLowerCase();
    if (q) applyFilters({ searchQuery: q });
  });

  // Hide results on outside click
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.hidden = true;
    }
  });

  // Keyboard navigation within results
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      const firstItem = searchResults.querySelector('.search-result-item');
      if (firstItem) { e.preventDefault(); firstItem.focus(); }
    }
    if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
  });

  searchResults.addEventListener('keydown', (e) => {
    const items = Array.from(searchResults.querySelectorAll('.search-result-item'));
    const idx   = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown' && idx < items.length - 1) { e.preventDefault(); items[idx + 1].focus(); }
    if (e.key === 'ArrowUp')  {
      e.preventDefault();
      if (idx > 0) items[idx - 1].focus();
      else searchInput.focus();
    }
    if (e.key === 'Escape') { searchResults.hidden = true; searchInput.focus(); }
  });
}());

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Wrap matched substring in <mark>.
 * @param {string} text
 * @param {string} query
 * @returns {string}
 */
function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escapeHtml(text).replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

/* ============================================================
   PRODUCT FILTERS
   ============================================================ */
const filterCategory = document.getElementById('filter-category');
const filterPrice    = document.getElementById('filter-price');
const filterSort     = document.getElementById('filter-sort');
const priceDisplay   = document.getElementById('price-display');
const filterResetBtn = document.getElementById('filter-reset-btn');
const noResultsPanel = document.getElementById('no-results');
const noResultsResetBtn = document.getElementById('no-results-reset-btn');
const resultsInfo    = document.getElementById('filter-results-info');

/** Current filter state */
const filterState = {
  category:    'all',
  maxPrice:    2000,
  sort:        'popularity',
  searchQuery: '',
};

/**
 * Apply current filter state to the product grid.
 * @param {Partial<typeof filterState>} [overrides]
 */
function applyFilters(overrides = {}) {
  Object.assign(filterState, overrides);

  const cards = document.querySelectorAll('#products-grid .product-card');
  if (!cards.length) return;

  const { category, maxPrice, sort, searchQuery } = filterState;
  let visibleCount = 0;

  // Collect visible cards for sorting
  const cardDataArray = [];

  cards.forEach((card) => {
    const cat  = card.dataset.category || '';
    const price = parseFloat(card.dataset.price) || 0;
    const name  = (card.dataset.name || card.querySelector('.product-name')?.textContent || '').toLowerCase();
    const pop   = parseInt(card.dataset.popularity, 10) || 0;

    const matchCat   = category === 'all' || cat === category;
    const matchPrice = price <= maxPrice;
    const matchQuery = !searchQuery || name.includes(searchQuery.toLowerCase()) || cat.includes(searchQuery.toLowerCase());

    const visible = matchCat && matchPrice && matchQuery;
    card.classList.toggle('hidden', !visible);

    if (visible) {
      visibleCount++;
      cardDataArray.push({ card, price, pop, name });
    }
  });

  // Sort visible cards
  cardDataArray.sort((a, b) => {
    switch (sort) {
      case 'price-asc':  return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc':   return a.name.localeCompare(b.name);
      case 'name-desc':  return b.name.localeCompare(a.name);
      default:           return b.pop - a.pop; // popularity
    }
  });

  // Re-insert in sorted order (skip section headings)
  const grid = document.getElementById('products-grid');
  if (grid) {
    const headings = Array.from(grid.querySelectorAll('.product-section-heading'));
    cardDataArray.forEach(({ card }) => grid.appendChild(card));
    // Keep headings at the end so they don't mess up the grid (hide them when filtering)
    headings.forEach((h) => {
      const showing = category === 'all' && !searchQuery;
      h.style.display = showing ? '' : 'none';
    });
  }

  // Show/hide no-results
  if (noResultsPanel) noResultsPanel.hidden = visibleCount > 0;

  // Results info
  if (resultsInfo) {
    if (category !== 'all' || searchQuery || maxPrice < 2000) {
      resultsInfo.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
    } else {
      resultsInfo.textContent = '';
    }
  }
}

(function initFilters() {
  if (!filterCategory || !filterPrice || !filterSort) return;

  filterCategory.addEventListener('change', () => applyFilters({ category: filterCategory.value }));

  filterPrice.addEventListener('input', () => {
    const val = parseFloat(filterPrice.value);
    if (priceDisplay) priceDisplay.textContent = formatCurrency(val);
    applyFilters({ maxPrice: val });
  });

  filterSort.addEventListener('change', () => applyFilters({ sort: filterSort.value }));

  const resetFilters = () => {
    filterCategory.value = 'all';
    filterPrice.value    = 2000;
    filterSort.value     = 'popularity';
    if (priceDisplay) priceDisplay.textContent = '₹2,000';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    applyFilters({ category: 'all', maxPrice: 2000, sort: 'popularity', searchQuery: '' });
  };

  if (filterResetBtn) filterResetBtn.addEventListener('click', resetFilters);
  if (noResultsResetBtn) noResultsResetBtn.addEventListener('click', resetFilters);
}());

/* ============================================================
   SHOPPING CART  (localStorage persistent)
   ============================================================ */
const CART_KEY = 'iceworld_cart';
const TAX_RATE = 0.08;

/** @type {Array<{id:number, name:string, price:number, img:string, qty:number}>} */
let cart = [];

/** Load cart from localStorage */
function cartLoad() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) cart = [];
  } catch {
    cart = [];
  }
}

/** Persist cart to localStorage */
function cartSave() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // localStorage may be unavailable (e.g., private mode quota)
  }
}

/**
 * Add a product to the cart (or increment quantity).
 * @param {{id:number, name:string, price:number|string, img:string}} product
 */
function cartAdd(product) {
  const id    = parseInt(product.id, 10);
  const price = parseFloat(product.price);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty = clamp(existing.qty + 1, 1, 99);
    showToast(`${product.name} quantity updated (${existing.qty})`, 'info');
  } else {
    cart.push({ id, name: product.name, price, img: product.img || '', qty: 1 });
    showToast(`${product.name} added to cart! 🛒`, 'success');
  }

  cartSave();
  cartRender();
}

/**
 * Remove a cart item by product id.
 * @param {number} id
 */
function cartRemove(id) {
  const idx = cart.findIndex((item) => item.id === id);
  if (idx === -1) return;
  const name = cart[idx].name;
  cart.splice(idx, 1);
  cartSave();
  cartRender();
  showToast(`${name} removed from cart.`, 'info');
}

/**
 * Update quantity of a cart item.
 * @param {number} id
 * @param {number} delta  (+1 or -1)
 */
function cartChangeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) {
    cartRemove(id);
    return;
  }
  item.qty = clamp(newQty, 1, 99);
  cartSave();
  cartRender();
}

/** Clear entire cart */
function cartClear() {
  cart = [];
  cartSave();
  cartRender();
  showToast('Cart cleared.', 'info');
}

/** Render cart sidebar UI */
function cartRender() {
  const itemsList  = document.getElementById('cart-items-list');
  const emptyMsg   = document.getElementById('cart-empty-msg');
  const cartFooter = document.getElementById('cart-footer');
  const countBadge = document.getElementById('cart-count');

  if (!itemsList) return;

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal   = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax        = subtotal * TAX_RATE;
  const total      = subtotal + tax;

  // Badge
  if (countBadge) {
    countBadge.textContent = totalItems;
    countBadge.classList.toggle('badge-zero', totalItems === 0);
  }

  // Empty state
  if (emptyMsg) emptyMsg.style.display = cart.length ? 'none' : 'block';
  if (cartFooter) cartFooter.style.display = cart.length ? 'block' : 'none';

  // Items
  itemsList.innerHTML = cart
    .map(
      (item) => `
    <li class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${escapeHtml(item.name)}" loading="lazy" />
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">${formatCurrency(item.price)} each</div>
        <div class="cart-item-qty">
          <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">−</button>
          <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Increase quantity of ${escapeHtml(item.name)}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${escapeHtml(item.name)} from cart">
        <i class="fas fa-trash" aria-hidden="true"></i>
      </button>
    </li>`
    )
    .join('');

  // Totals
  const subEl   = document.getElementById('cart-subtotal-price');
  const taxEl   = document.getElementById('cart-tax-amount');
  const totalEl = document.getElementById('cart-total-price');
  if (subEl)   subEl.textContent   = formatCurrency(subtotal);
  if (taxEl)   taxEl.textContent   = formatCurrency(tax);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

/** Open cart sidebar */
function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  const toggleBtn = document.getElementById('cart-toggle-btn');
  if (sidebar) { sidebar.classList.add('open'); sidebar.setAttribute('aria-hidden', 'false'); }
  if (overlay) overlay.classList.add('visible');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

/** Close cart sidebar */
function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  const toggleBtn = document.getElementById('cart-toggle-btn');
  if (sidebar) { sidebar.classList.remove('open'); sidebar.setAttribute('aria-hidden', 'true'); }
  if (overlay) overlay.classList.remove('visible');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

(function initCart() {
  cartLoad();
  cartRender();

  // Toggle cart open
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);

  // Close cart
  const cartCloseBtn   = document.getElementById('cart-close-btn');
  const cartOverlay    = document.getElementById('cart-overlay');
  const continueBtn    = document.getElementById('cart-continue-btn');
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);
  if (continueBtn)  continueBtn.addEventListener('click', closeCart);

  // Clear cart
  const cartClearBtn = document.getElementById('cart-clear-btn');
  if (cartClearBtn) {
    cartClearBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      if (window.confirm('Remove all items from your cart?')) cartClear();
    });
  }

  // Delegated events on cart items list (qty / remove)
  const itemsList = document.getElementById('cart-items-list');
  if (itemsList) {
    itemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-id]');
      if (!btn) return;
      const id = parseInt(btn.dataset.id, 10);
      if (btn.classList.contains('qty-increase')) cartChangeQty(id, 1);
      else if (btn.classList.contains('qty-decrease')) cartChangeQty(id, -1);
      else if (btn.classList.contains('cart-item-remove')) cartRemove(id);
    });
  }

  // "Add to Cart" buttons in the product grid / carousel
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn, .add-to-cart-overlay-btn');
    if (!btn) return;
    const id      = parseInt(btn.dataset.id, 10);
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      cartAdd(product);
      // Animate button briefly
      btn.classList.add('btn-clicked');
      setTimeout(() => btn.classList.remove('btn-clicked'), 600);
    }
  });

  // Keyboard escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
}());

/* ============================================================
   WISHLIST  (localStorage persistent)
   ============================================================ */
const WISHLIST_KEY = 'iceworld_wishlist';
/** @type {number[]} */
let wishlist = [];

/** Load wishlist from localStorage */
function wishlistLoad() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    wishlist = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch {
    wishlist = [];
  }
}

/** Persist wishlist */
function wishlistSave() {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch { /* noop */ }
}

/**
 * Toggle a product in the wishlist.
 * @param {number} id
 */
function wishlistToggle(id) {
  const numId = parseInt(id, 10);
  const idx   = wishlist.indexOf(numId);
  if (idx === -1) {
    wishlist.push(numId);
    showToast('Added to wishlist ❤️', 'info');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  }
  wishlistSave();
  wishlistRender();
  wishlistSyncButtons();
}

/** Sync heart button active state across the page */
function wishlistSyncButtons() {
  document.querySelectorAll('.add-to-wishlist-btn').forEach((btn) => {
    const id = parseInt(btn.dataset.id, 10);
    const inList = wishlist.includes(id);
    btn.classList.toggle('active-wishlist', inList);
    btn.setAttribute('aria-pressed', String(inList));
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = inList ? 'fas fa-heart' : 'far fa-heart';
    }
  });

  const countBadge = document.getElementById('wishlist-count');
  if (countBadge) {
    countBadge.textContent = wishlist.length;
    countBadge.classList.toggle('badge-zero', wishlist.length === 0);
  }
}

/** Render wishlist modal items */
function wishlistRender() {
  const list     = document.getElementById('wishlist-items-list');
  const emptyMsg = document.getElementById('wishlist-empty-msg');
  if (!list) return;

  if (emptyMsg) emptyMsg.style.display = wishlist.length ? 'none' : 'block';

  list.innerHTML = wishlist
    .map((id) => {
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (!p) return '';
      return `
      <li class="wishlist-item" data-id="${p.id}">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
        <div>
          <div class="wishlist-item-name">${escapeHtml(p.name)}</div>
          <div class="wishlist-item-price">${formatCurrency(p.price)}</div>
        </div>
        <div class="wishlist-item-actions">
          <button class="wishlist-add-cart-btn" data-id="${p.id}" aria-label="Add ${escapeHtml(p.name)} to cart">
            <i class="fas fa-cart-plus" aria-hidden="true"></i> Add
          </button>
          <button class="wishlist-remove-btn" data-id="${p.id}" aria-label="Remove ${escapeHtml(p.name)} from wishlist">
            <i class="fas fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </li>`;
    })
    .join('');

  // Events
  list.querySelectorAll('.wishlist-add-cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const p  = PRODUCTS.find((prod) => prod.id === id);
      if (p) cartAdd(p);
    });
  });

  list.querySelectorAll('.wishlist-remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      wishlistToggle(parseInt(btn.dataset.id, 10));
    });
  });
}

(function initWishlist() {
  wishlistLoad();
  wishlistSyncButtons();
  wishlistRender();

  // Delegated toggle on heart buttons anywhere on the page
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-wishlist-btn');
    if (!btn) return;
    wishlistToggle(parseInt(btn.dataset.id, 10));
  });

  // Open wishlist modal
  const wishlistBtn = document.getElementById('wishlist-btn');
  const modal       = document.getElementById('wishlist-modal');
  if (wishlistBtn && modal) {
    wishlistBtn.addEventListener('click', () => {
      wishlistRender();
      modal.hidden = false;
      document.body.classList.add('no-scroll');
    });
  }

  // Close wishlist modal
  const closeBtn  = document.getElementById('wishlist-close-btn');
  const overlay   = document.getElementById('wishlist-overlay');
  const closeModal = () => {
    if (modal) modal.hidden = true;
    document.body.classList.remove('no-scroll');
  };
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', closeModal);
}());

/* ============================================================
   HERO BANNER SLIDER
   ============================================================ */
(function initHeroSlider() {
  const slider   = document.getElementById('hero-slider');
  if (!slider) return;

  const slides   = slider.querySelectorAll('.hero-slide');
  const dots     = slider.querySelectorAll('.slider-dot');
  const prevBtn  = document.getElementById('hero-prev');
  const nextBtn  = document.getElementById('hero-next');

  if (!slides.length) return;

  let current      = 0;
  let autoplayTimer = null;
  const INTERVAL   = 5000;

  /** Activate a specific slide */
  const goTo = (index) => {
    const prev = current;
    current = ((index % slides.length) + slides.length) % slides.length;

    slides[prev].classList.remove('active');
    slides[prev].classList.add('exit');
    setTimeout(() => slides[prev].classList.remove('exit'), 800);

    slides[current].classList.add('active');

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });

    slider.setAttribute('aria-label', `Slide ${current + 1} of ${slides.length}`);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(next, INTERVAL);
  };
  const stopAutoplay = () => clearInterval(autoplayTimer);
  const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

  if (prevBtn) { prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); }); }
  if (nextBtn) { nextBtn.addEventListener('click', () => { next(); resetAutoplay(); }); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
  });

  // Swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); resetAutoplay(); }
  }, { passive: true });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });

  // Pause on hover / focus
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin',    stopAutoplay);
  slider.addEventListener('focusout',   startAutoplay);

  // Reduce motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) startAutoplay();
}());

/* ============================================================
   PRODUCT CAROUSEL (Best Sellers)
   ============================================================ */
(function initProductCarousel() {
  const track    = document.getElementById('bs-carousel-track');
  const prevBtn  = document.getElementById('bs-carousel-prev');
  const nextBtn  = document.getElementById('bs-carousel-next');
  if (!track || !prevBtn || !nextBtn) return;

  let position   = 0;
  const CARD_GAP = 24;

  const getCardWidth = () => {
    const card = track.querySelector('.product-card');
    return card ? card.offsetWidth + CARD_GAP : 304;
  };

  const getMaxPosition = () => {
    const visibleWidth = track.parentElement.offsetWidth;
    const totalWidth   = track.scrollWidth;
    return Math.max(0, totalWidth - visibleWidth);
  };

  const updateButtons = () => {
    prevBtn.disabled = position <= 0;
    nextBtn.disabled = position >= getMaxPosition() - 1;
  };

  const slideBy = (delta) => {
    const step = getCardWidth();
    position = clamp(position + delta * step, 0, getMaxPosition());
    track.style.transform = `translateX(-${position}px)`;
    updateButtons();
  };

  prevBtn.addEventListener('click', () => slideBy(-1));
  nextBtn.addEventListener('click', () => slideBy(1));

  // Swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) slideBy(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Reset on resize
  const onResize = debounce(() => {
    position = 0;
    track.style.transform = 'translateX(0)';
    updateButtons();
  }, 300);
  window.addEventListener('resize', onResize);

  updateButtons();
}());

/* ============================================================
   QUICK VIEW MODAL
   ============================================================ */
(function initQuickView() {
  const modal   = document.getElementById('quick-view-modal');
  const body    = document.getElementById('quick-view-body');
  const overlay = document.getElementById('quick-view-overlay');
  const closeBtn = document.getElementById('quick-view-close-btn');

  if (!modal) return;

  const openQuickView = (id) => {
    const p = PRODUCTS.find((prod) => prod.id === parseInt(id, 10));
    if (!p || !body) return;

    const inWishlist = wishlist.includes(p.id);
    const heartClass = inWishlist ? 'fas fa-heart' : 'far fa-heart';

    body.innerHTML = `
      <div>
        <img src="${p.img}" alt="${escapeHtml(p.name)}" class="qv-img" loading="lazy" />
      </div>
      <div>
        <span class="product-category-tag">${escapeHtml(p.category)}</span>
        <h2 class="qv-name">${escapeHtml(p.name)}</h2>
        <div class="qv-price">${formatCurrency(p.price)}</div>
        <p class="qv-desc">${escapeHtml(p.desc)}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary add-to-cart-btn" data-id="${p.id}" data-name="${escapeHtml(p.name)}" data-price="${p.price}" data-img="${p.img}">
            <i class="fas fa-cart-plus" aria-hidden="true"></i> Add to Cart
          </button>
          <button class="btn btn-outline add-to-wishlist-btn" data-id="${p.id}" aria-pressed="${inWishlist}" aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="${heartClass}" aria-hidden="true"></i> Wishlist
          </button>
        </div>
      </div>`;

    modal.hidden = false;
    document.body.classList.add('no-scroll');
    closeBtn?.focus();
  };

  const closeQuickView = () => {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
  if (overlay)  overlay.addEventListener('click', closeQuickView);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-view-btn');
    if (btn) openQuickView(btn.dataset.id);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeQuickView();
  });
}());

/* ============================================================
   FORM VALIDATION  (Login, Register, Contact, Newsletter)
   ============================================================ */

/** Validation rules */
const VALIDATORS = {
  required:   (v) => v.trim() !== '' || 'This field is required.',
  email:      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
  minLength:  (min) => (v) => v.length >= min || `Must be at least ${min} characters.`,
  phone:      (v) => v === '' || /^[+\d\s\-().]{7,20}$/.test(v.trim()) || 'Please enter a valid phone number.',
  checked:    (v, el) => (el.type === 'checkbox' ? el.checked : v !== '') || 'Please check this box to continue.',
  match:      (otherId) => (v) => {
    const other = document.getElementById(otherId);
    return !other || v === other.value || 'Passwords do not match.';
  },
};

/**
 * Validate a single field and show/clear error.
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
 * @param {Array<Function>} rules
 * @returns {boolean}
 */
function validateField(field, rules) {
  const errorEl = document.getElementById(`${field.id}-error`);
  for (const rule of rules) {
    const result = rule(field.value, field);
    if (result !== true) {
      field.classList.add('error');
      field.classList.remove('success');
      if (errorEl) errorEl.textContent = result;
      field.setAttribute('aria-invalid', 'true');
      return false;
    }
  }
  field.classList.remove('error');
  field.classList.add('success');
  if (errorEl) errorEl.textContent = '';
  field.setAttribute('aria-invalid', 'false');
  return true;
}

/**
 * Validate all fields in a form definition.
 * @param {Array<{id:string, rules:Array<Function>}>} fields
 * @returns {boolean}
 */
function validateForm(fields) {
  let valid = true;
  let firstInvalid = null;
  for (const { id, rules } of fields) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (!validateField(el, rules)) {
      valid = false;
      if (!firstInvalid) firstInvalid = el;
    }
  }
  if (firstInvalid) firstInvalid.focus();
  return valid;
}

/* --- Login Form --- */
(function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const fields = [
    { id: 'login-email',    rules: [VALIDATORS.required, VALIDATORS.email] },
    { id: 'login-password', rules: [VALIDATORS.required, VALIDATORS.minLength(8)] },
  ];

  // Live validation on blur
  fields.forEach(({ id, rules }) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(el, rules));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(fields)) {
      showToast('Signed in successfully! 🎉', 'success');
      const modal = document.getElementById('login-modal');
      if (modal) {
        modal.hidden = true;
        document.body.classList.remove('no-scroll');
      }
    }
  });
}());

/* --- Register Form --- */
(function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  const fields = [
    { id: 'reg-name',             rules: [VALIDATORS.required, VALIDATORS.minLength(2)] },
    { id: 'reg-email',            rules: [VALIDATORS.required, VALIDATORS.email] },
    { id: 'reg-phone',            rules: [VALIDATORS.phone] },
    { id: 'reg-password',         rules: [VALIDATORS.required, VALIDATORS.minLength(8)] },
    { id: 'reg-confirm-password', rules: [VALIDATORS.required, VALIDATORS.match('reg-password')] },
    { id: 'reg-terms',            rules: [VALIDATORS.checked] },
  ];

  fields.forEach(({ id, rules }) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(el, rules));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(fields)) {
      showToast('Account created! Welcome to IceWorld 🍦', 'success');
      const modal = document.getElementById('login-modal');
      if (modal) {
        modal.hidden = true;
        document.body.classList.remove('no-scroll');
      }
    }
  });
}());

/* --- Contact Form --- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = [
    { id: 'contact-name',    rules: [VALIDATORS.required, VALIDATORS.minLength(2)] },
    { id: 'contact-email',   rules: [VALIDATORS.required, VALIDATORS.email] },
    { id: 'contact-phone',   rules: [VALIDATORS.phone] },
    { id: 'contact-subject', rules: [VALIDATORS.required] },
    { id: 'contact-message', rules: [VALIDATORS.required, VALIDATORS.minLength(20)] },
    { id: 'contact-consent', rules: [VALIDATORS.checked] },
  ];

  fields.forEach(({ id, rules }) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(el, rules));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(fields)) {
      showToast("Message sent! We'll get back to you soon. 📧", 'success');
      form.reset();
      form.querySelectorAll('.form-control').forEach((el) => {
        el.classList.remove('success', 'error');
      });
    }
  });
}());

/* --- Newsletter Form --- */
(function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  const emailInput = document.getElementById('newsletter-email');
  const errorEl    = document.getElementById('newsletter-email-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!emailInput) return;

    const result = VALIDATORS.email(emailInput.value);
    if (result !== true) {
      if (errorEl) errorEl.textContent = result;
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }
    if (errorEl) errorEl.textContent = '';
    emailInput.classList.remove('error');
    showToast('Subscribed! Watch your inbox for sweet deals. 🍦', 'success');
    form.reset();
  });
}());

/* ============================================================
   AUTH MODAL  (Login Button + Tabs)
   ============================================================ */
(function initAuthModal() {
  const loginBtn  = document.getElementById('login-btn');
  const modal     = document.getElementById('login-modal');
  const closeBtn  = document.getElementById('login-close-btn');
  const overlay   = document.getElementById('login-overlay');
  const tabs      = document.querySelectorAll('.auth-tab');
  const contents  = document.querySelectorAll('.auth-tab-content');

  if (!modal) return;

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    document.getElementById('login-email')?.focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  };

  if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', closeModal);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      contents.forEach((c) => c.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}());

/* ============================================================
   PASSWORD VISIBILITY TOGGLE
   ============================================================ */
(function initPasswordToggles() {
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input || input.tagName !== 'INPUT') return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const icon = btn.querySelector('i');
      if (icon) icon.className = isPassword ? 'far fa-eye-slash' : 'far fa-eye';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });
}());

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
(function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  const onScroll = () => {
    btn.hidden = window.scrollY < 400;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

/* ============================================================
   FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}());

/* ============================================================
   ACTIVE NAV LINK ON SCROLL  (Intersection Observer)
   ============================================================ */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach((link) => {
            const match = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', match);
            if (match) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}());

/* ============================================================
   FADE-IN-UP SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
(function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.product-card, .category-card, .testimonial-card, .feature-item, .promo-card, .gallery-item, .about-images, .about-content'
  );

  if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  elements.forEach((el) => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}());

/* ============================================================
   ANIMATED COUNTERS (Hero Stats)
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const steps    = 60;
    const increment = target / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, duration / steps);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}());

/* ============================================================
   PRODUCT CARD HOVER ANIMATIONS
   ============================================================ */
(function initCardHoverAnimations() {
  // Add tilt effect on mouse move for product cards
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}());

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const q = other.querySelector('.faq-question');
        const a = other.querySelector('.faq-answer');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.hidden = true;
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
}());

/* ============================================================
   MARQUEE PAUSE ON HOVER (CSS handles it; JS fallback)
   ============================================================ */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  // Double content for seamless loop (CSS animation covers this via width:max-content)
  // No extra JS needed — handled by CSS animation.
}());
