// IceWorld - Main JavaScript (Shared across all pages)

// ===== DARK MODE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');

function applyDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  updateDarkModeIcons(isDark);
}

function updateDarkModeIcons(isDark) {
  [darkModeToggle, darkModeToggleMobile].forEach(btn => {
    if (!btn) return;
    btn.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
  });
}

// Init dark mode
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  applyDarkMode(isDark);
})();

[darkModeToggle, darkModeToggleMobile].forEach(btn => {
  if (btn) btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyDarkMode(!isDark);
  });
});

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('iw_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('iw_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, size = null, qty = 1) {
  const cart = getCart();
  const key = `${product.id}-${size || 'default'}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id: product.id, name: product.name, price: product.price, image: product.image, size: size || (product.sizes && product.sizes[0]) || 'Regular', qty });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart! 🛒`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ===== WISHLIST =====
function getWishlist() {
  return JSON.parse(localStorage.getItem('iw_wishlist') || '[]');
}

function saveWishlist(list) {
  localStorage.setItem('iw_wishlist', JSON.stringify(list));
  updateWishlistCount();
}

function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx === -1) {
    list.push(productId);
    showToast('Added to wishlist ❤️');
  } else {
    list.splice(idx, 1);
    showToast('Removed from wishlist');
  }
  saveWishlist(list);
  updateWishlistButtons();
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistCount() {
  const count = getWishlist().length;
  document.querySelectorAll('.wishlist-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function updateWishlistButtons() {
  document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
    const id = parseInt(btn.dataset.wishlistId);
    if (isInWishlist(id)) {
      btn.classList.add('text-pink-500');
      btn.classList.remove('text-gray-400');
    } else {
      btn.classList.remove('text-pink-500');
      btn.classList.add('text-gray-400');
    }
  });
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  const existing = document.getElementById('iw-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'iw-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.className = `fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-2xl shadow-lg text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
    type === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
  }`;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ===== STICKY HEADER =====
const header = document.getElementById('mainHeader');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('opacity-0', window.scrollY < 400);
    backToTop.classList.toggle('pointer-events-none', window.scrollY < 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SEARCH AUTOCOMPLETE =====
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

if (searchInput && searchDropdown && typeof PRODUCTS !== 'undefined') {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (q.length < 2) { searchDropdown.classList.add('hidden'); return; }
    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 6);
    if (!matches.length) { searchDropdown.classList.add('hidden'); return; }
    searchDropdown.innerHTML = matches.map(p => `
      <a href="product.html?id=${p.id}" class="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors" role="option">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover">
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-white">${p.name}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">₹${p.price}</p>
        </div>
      </a>`).join('');
    searchDropdown.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchDropdown.classList.add('hidden');
  });
}

// ===== SCROLL FADE-IN =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate-fade-in-up');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));

// ===== QUICK VIEW MODAL =====
const quickViewModal = document.getElementById('quickViewModal');
const quickViewClose = document.getElementById('quickViewClose');

function openQuickView(productId) {
  if (!quickViewModal || typeof PRODUCTS === 'undefined') return;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('qvImage').src = product.image;
  document.getElementById('qvImage').alt = product.name;
  document.getElementById('qvName').textContent = product.name;
  document.getElementById('qvPrice').textContent = `₹${product.price}`;
  document.getElementById('qvDesc').textContent = product.shortDescription;
  document.getElementById('qvCategory').textContent = product.category;
  document.getElementById('qvRating').innerHTML = getStarsSVG(product.rating) + `<span class="ml-1 text-sm text-gray-600 dark:text-gray-400">(${product.reviews})</span>`;
  document.getElementById('qvAddToCart').onclick = () => { addToCart(product); closeQuickView(); };
  document.getElementById('qvViewProduct').href = `product.html?id=${productId}`;

  quickViewModal.classList.remove('hidden');
  quickViewModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  if (!quickViewModal) return;
  quickViewModal.classList.add('hidden');
  quickViewModal.classList.remove('flex');
  document.body.style.overflow = '';
}

if (quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
if (quickViewModal) {
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });
}

// ===== HELPERS =====
function getStarsSVG(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += `<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  if (half) stars += `<svg class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="#FBBF24"/><stop offset="50%" stop-color="#D1D5DB"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  return `<div class="flex items-center">${stars}</div>`;
}

function renderProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  return `
    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group fade-on-scroll">
      <div class="relative overflow-hidden h-56">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 lazy-img" loading="lazy">
        ${product.badge ? `<span class="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">${product.badge}</span>` : ''}
        ${discount > 0 ? `<span class="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">-${discount}%</span>` : ''}
        <button onclick="openQuickView(${product.id})" class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-pink-500 hover:text-white" aria-label="Quick view ${product.name}">Quick View</button>
      </div>
      <div class="p-4">
        <p class="text-xs text-pink-500 font-medium mb-1">${product.category}</p>
        <h3 class="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-1">${product.name}</h3>
        <div class="flex items-center gap-1 mb-3">
          ${getStarsSVG(product.rating)}
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">(${product.reviews})</span>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-lg font-bold text-gray-800 dark:text-white">₹${product.price}</span>
            ${product.originalPrice ? `<span class="text-xs text-gray-400 line-through ml-1">₹${product.originalPrice}</span>` : ''}
          </div>
          <div class="flex items-center gap-2">
            <button onclick="toggleWishlist(${product.id})" data-wishlist-id="${product.id}" class="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors ${inWishlist ? 'text-pink-500' : 'text-gray-400'}" aria-label="Toggle wishlist for ${product.name}">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            ${product.inStock
              ? `<button onclick="addToCart(PRODUCTS.find(p=>p.id===${product.id}))" class="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200" aria-label="Add ${product.name} to cart">Add to Cart</button>`
              : `<span class="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-semibold px-3 py-2 rounded-xl">Out of Stock</span>`
            }
          </div>
        </div>
      </div>
    </div>`;
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateWishlistCount();
  updateWishlistButtons();
});
