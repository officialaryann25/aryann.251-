/* =====================================================
   BloomLux — Main JavaScript
   Features: Dark Mode, Hero Slider, Cart (localStorage),
             Wishlist (localStorage), Search Autocomplete,
             Quick View Modal, Toast Notifications,
             Mobile Menu, Back to Top, Loading Anim
   ===================================================== */

/* ── Product Data ── */
const PRODUCTS = [
  { id: 1, name: "Romantic Red Roses", price: 799, originalPrice: 999, category: "roses", occasion: "anniversary", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80", description: "A stunning bouquet of 12 fresh red roses, symbolising deep love and passion.", badge: "Best Seller", rating: 5 },
  { id: 2, name: "Pink Lily Delight", price: 649, originalPrice: 849, category: "lilies", occasion: "birthday", image: "https://images.unsplash.com/photo-1490750967868-88df5691cc1c?w=600&q=80", description: "Elegant pink lilies arranged in a premium vase for a graceful gifting experience.", badge: "New", rating: 4 },
  { id: 3, name: "Orchid Elegance", price: 1199, originalPrice: 1499, category: "orchids", occasion: "luxury", image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600&q=80", description: "Exotic purple orchids in a designer pot — a luxurious statement of sophistication.", badge: "Premium", rating: 5 },
  { id: 4, name: "Rainbow Bouquet", price: 549, originalPrice: 699, category: "bouquets", occasion: "birthday", image: "https://images.unsplash.com/photo-1487530811015-780aab43b23b?w=600&q=80", description: "A vibrant mix of seasonal flowers in a rainbow arrangement to brighten any day.", badge: "Popular", rating: 4 },
  { id: 5, name: "Sunflower Sunshine", price: 499, originalPrice: 649, category: "bouquets", occasion: "birthday", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80", description: "Fresh sunflowers bundled with seasonal greens — the perfect cheerful gift.", badge: "", rating: 4 },
  { id: 6, name: "White Carnation Bliss", price: 399, originalPrice: 499, category: "bouquets", occasion: "sympathy", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80", description: "Pure white carnations representing admiration and undying love.", badge: "", rating: 4 },
  { id: 7, name: "Premium Hamper Box", price: 1599, originalPrice: 1999, category: "hampers", occasion: "anniversary", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80", description: "Luxury hamper with roses, chocolates, and a scented candle for a complete gifting experience.", badge: "Trending", rating: 5 },
  { id: 8, name: "Cake & Flower Combo", price: 899, originalPrice: 1099, category: "cakes", occasion: "birthday", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80", description: "A delightful combo of a fresh cream cake and a bunch of colourful flowers.", badge: "Combo", rating: 4 },
  { id: 9, name: "Mixed Seasonal Bunch", price: 349, originalPrice: 449, category: "bouquets", occasion: "everyday", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80", description: "A cheerful mix of seasonal blooms — perfect for any occasion or no occasion at all.", badge: "", rating: 3 },
  { id: 10, name: "Yellow Rose Bliss", price: 599, originalPrice: 749, category: "roses", occasion: "friendship", image: "https://images.unsplash.com/photo-1548198471-e2e86b6c6e56?w=600&q=80", description: "Bright yellow roses symbolising friendship, joy, and new beginnings.", badge: "", rating: 4 },
  { id: 11, name: "Lavender Dream", price: 749, originalPrice: 949, category: "orchids", occasion: "luxury", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80", description: "Fragrant lavender stems paired with white daisies in an artisan wrap.", badge: "New", rating: 5 },
  { id: 12, name: "Tulip Tower", price: 699, originalPrice: 899, category: "bouquets", occasion: "anniversary", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", description: "A tall arrangement of Dutch tulips in pastel shades — timeless and refined.", badge: "", rating: 4 },
];

/* ── Hero Slider Images ── */
const HERO_SLIDES = [
  { image: "https://images.unsplash.com/photo-1490750967868-88df5691cc1c?w=1400&q=80", heading: "Luxury Flowers Delivered with Love", sub: "Same-day delivery across India", cta: "Shop Now", href: "shop.html" },
  { image: "https://images.unsplash.com/photo-1487530811015-780aab43b23b?w=1400&q=80", heading: "Celebrate Every Moment", sub: "Handcrafted bouquets for every occasion", cta: "Explore", href: "shop.html" },
  { image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1400&q=80", heading: "Roses That Speak Your Heart", sub: "Premium roses, delivered fresh", cta: "Order Today", href: "shop.html" },
];

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const qs = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const ss = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* ── Toast ── */
function showToast(msg, type = "success") {
  let container = $("#toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed bottom-6 right-6 z-[9999] flex flex-col gap-2";
    document.body.appendChild(container);
  }
  const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-blue-600", warning: "bg-yellow-500" };
  const toast = document.createElement("div");
  toast.className = `${colors[type] || colors.success} text-white px-5 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2 translate-x-20 opacity-0 transition-all duration-300`;
  toast.innerHTML = `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { toast.classList.remove("translate-x-20", "opacity-0"); });
  setTimeout(() => {
    toast.classList.add("translate-x-20", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ── Dark Mode ── */
function initDarkMode() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) document.documentElement.classList.add("dark");

  $$("[data-dark-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateDarkIcons();
    });
  });
  updateDarkIcons();
}

function updateDarkIcons() {
  const isDark = document.documentElement.classList.contains("dark");
  $$("[data-dark-icon]").forEach(el => {
    el.innerHTML = isDark
      ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>`
      : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  });
}

/* ── Cart ── */
function getCart() { return qs("cart"); }
function saveCart(c) { ss("cart", c); updateCartBadge(); }

function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx > -1) cart[idx].qty += qty;
  else cart.push({ ...product, qty });
  saveCart(cart);
  showToast(`${product.name} added to cart 🌸`);
}

function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  $$("[data-cart-badge]").forEach(el => {
    el.textContent = total;
    el.classList.toggle("hidden", total === 0);
  });
}

/* ── Wishlist ── */
function getWishlist() { return qs("wishlist"); }
function saveWishlist(w) { ss("wishlist", w); updateWishlistBadge(); }

function toggleWishlist(productId) {
  const wl = getWishlist();
  const idx = wl.indexOf(productId);
  if (idx > -1) { wl.splice(idx, 1); showToast("Removed from wishlist", "info"); }
  else { wl.push(productId); showToast("Added to wishlist ❤️", "success"); }
  saveWishlist(wl);
  $$(`[data-wish-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle("text-rose-500", wl.includes(productId));
    btn.classList.toggle("fill-rose-500", wl.includes(productId));
  });
}

function updateWishlistBadge() {
  const total = getWishlist().length;
  $$("[data-wishlist-badge]").forEach(el => {
    el.textContent = total;
    el.classList.toggle("hidden", total === 0);
  });
}

function syncWishlistIcons() {
  const wl = getWishlist();
  $$("[data-wish-id]").forEach(btn => {
    const id = parseInt(btn.dataset.wishId);
    btn.classList.toggle("text-rose-500", wl.includes(id));
    btn.classList.toggle("fill-rose-500", wl.includes(id));
  });
}

/* ── Search Autocomplete ── */
function initSearch() {
  const inputs = $$("[data-search-input]");
  inputs.forEach(input => {
    const dropdown = input.nextElementSibling;
    if (!dropdown) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.classList.add("hidden"); return; }
      const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
      if (!matches.length) { dropdown.classList.add("hidden"); return; }
      dropdown.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="flex items-center gap-3 px-4 py-2 hover:bg-rose-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
          <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-cover rounded-lg">
          <div>
            <p class="text-sm font-medium text-gray-800 dark:text-white">${p.name}</p>
            <p class="text-xs text-rose-500">₹${p.price}</p>
          </div>
        </a>`).join("");
      dropdown.classList.remove("hidden");
    });

    document.addEventListener("click", e => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.add("hidden");
    });
  });
}

/* ── Hero Slider ── */
function initHeroSlider() {
  const container = $("#hero-slider");
  if (!container) return;

  let current = 0;
  let timer;

  container.innerHTML = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide absolute inset-0 transition-opacity duration-700 ${i === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}">
      <img src="${s.image}" alt="${s.heading}" class="w-full h-full object-cover" loading="${i === 0 ? 'eager' : 'lazy'}">
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex items-center justify-center text-center px-4">
        <div class="text-white max-w-2xl">
          <h1 class="font-playfair text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">${s.heading}</h1>
          <p class="text-lg md:text-xl mb-8 opacity-90">${s.sub}</p>
          <a href="${s.href}" class="inline-block bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">${s.cta}</a>
        </div>
      </div>
    </div>`).join("");

  // Dots
  const dotsContainer = $("#hero-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = HERO_SLIDES.map((_, i) => `
      <button class="hero-dot w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? "bg-white w-8" : "bg-white/50"}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`).join("");
    dotsContainer.addEventListener("click", e => {
      const dot = e.target.closest("[data-dot]");
      if (dot) goToSlide(parseInt(dot.dataset.dot));
    });
  }

  function goToSlide(n) {
    const slides = $$(".hero-slide", container);
    slides[current].classList.remove("opacity-100", "z-10");
    slides[current].classList.add("opacity-0", "z-0");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("opacity-100", "z-10");
    slides[current].classList.remove("opacity-0", "z-0");
    updateDots();
  }

  function updateDots() {
    $$(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === current);
      dot.classList.toggle("w-8", i === current);
      dot.classList.toggle("bg-white/50", i !== current);
      dot.classList.toggle("w-3", i !== current);
    });
  }

  function next() { goToSlide(current + 1); }
  function startTimer() { timer = setInterval(next, 5000); }
  function resetTimer() { clearInterval(timer); startTimer(); }

  $("#hero-prev")?.addEventListener("click", () => { goToSlide(current - 1); resetTimer(); });
  $("#hero-next")?.addEventListener("click", () => { goToSlide(current + 1); resetTimer(); });
  startTimer();
}

/* ── Quick View Modal ── */
function initQuickView() {
  const modal = $("#quick-view-modal");
  if (!modal) return;

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-quick-view]");
    if (!btn) return;
    const id = parseInt(btn.dataset.quickView);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    openQuickView(product);
  });

  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.closest("[data-modal-close]")) closeQuickView();
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeQuickView(); });
}

function openQuickView(product) {
  const modal = $("#quick-view-modal");
  const body = $("#quick-view-body");
  if (!modal || !body) return;
  const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  body.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-xl">
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-2">${product.name}</h3>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-yellow-400 text-lg">${stars}</span>
            <span class="text-sm text-gray-500">(${product.rating * 12} reviews)</span>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl font-bold text-rose-500">₹${product.price}</span>
            <span class="text-gray-400 line-through text-lg">₹${product.originalPrice}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">${product.description}</p>
        </div>
        <div class="flex gap-3">
          <button onclick="addToCart(PRODUCTS.find(p=>p.id===${product.id})); closeQuickView();" class="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">Add to Cart</button>
          <button onclick="toggleWishlist(${product.id})" data-wish-id="${product.id}" class="p-3 border border-gray-200 dark:border-gray-600 rounded-full hover:border-rose-400 transition-colors text-gray-600 dark:text-gray-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>
      </div>
    </div>`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  syncWishlistIcons();
}

function closeQuickView() {
  const modal = $("#quick-view-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const btn = $("#mobile-menu-btn");
  const menu = $("#mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const isOpen = !menu.classList.contains("hidden");
    btn.setAttribute("aria-expanded", isOpen);
  });
}

/* ── Sticky Header ── */
function initStickyHeader() {
  const header = $("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("shadow-lg", window.scrollY > 10);
  });
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = $("#back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("opacity-0", window.scrollY < 400));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ── Scroll Animations ── */
function initScrollAnimations() {
  const els = $$("[data-animate]");
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("animated"); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

/* ── Newsletter ── */
function initNewsletter() {
  $$("[data-newsletter-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      showToast("Thank you for subscribing! 🌸", "success");
      form.reset();
    });
  });
}

/* ── Loading Screen ── */
function hideLoader() {
  const loader = $("#page-loader");
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add("opacity-0");
    setTimeout(() => loader.remove(), 500);
  }, 400);
}

/* ── Cart Page ── */
function initCartPage() {
  const container = $("#cart-items");
  if (!container) return;
  renderCart();
}

function renderCart() {
  const container = $("#cart-items");
  const summary = $("#cart-summary");
  if (!container) return;
  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `<div class="text-center py-20"><div class="text-6xl mb-4">🌸</div><p class="text-gray-500 text-xl mb-6">Your cart is empty</p><a href="shop.html" class="inline-block bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors">Continue Shopping</a></div>`;
    if (summary) summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm" data-cart-item="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-gray-900 dark:text-white truncate">${item.name}</h4>
        <p class="text-rose-500 font-bold mt-1">₹${item.price}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="changeQty(${item.id}, -1)" class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-rose-400 transition-colors font-bold text-gray-600 dark:text-gray-300">-</button>
        <span class="w-8 text-center font-semibold text-gray-900 dark:text-white">${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)" class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-rose-400 transition-colors font-bold text-gray-600 dark:text-gray-300">+</button>
      </div>
      <p class="text-gray-900 dark:text-white font-bold w-20 text-right">₹${item.price * item.qty}</p>
      <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500 transition-colors ml-2" aria-label="Remove item">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>`).join("");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal + delivery;

  if (summary) summary.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
      <h3 class="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>₹${subtotal}</span></div>
        <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Delivery</span><span class="${delivery === 0 ? "text-green-500" : ""}">${delivery === 0 ? "FREE" : "₹" + delivery}</span></div>
        <div class="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white"><span>Total</span><span>₹${total}</span></div>
      </div>
      ${delivery > 0 ? `<p class="text-xs text-green-600 mb-4">Add ₹${999 - subtotal} more for free delivery</p>` : `<p class="text-xs text-green-600 mb-4">🎉 You have free delivery!</p>`}
      <a href="checkout.html" class="block text-center bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md">Proceed to Checkout →</a>
    </div>`;
}

function changeQty(id, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  showToast("Item removed from cart", "info");
}

/* ── Product Page ── */
function initProductPage() {
  const container = $("#product-detail");
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  renderProductDetail(product);
  renderRelated(product);
}

function renderProductDetail(product) {
  const el = $("#product-detail");
  if (!el) return;
  const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  el.innerHTML = `
    <div class="grid md:grid-cols-2 gap-10">
      <div>
        <div class="relative overflow-hidden rounded-2xl shadow-lg mb-4">
          <img id="main-product-img" src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover transition-transform duration-500 hover:scale-105">
          ${product.badge ? `<span class="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">${product.badge}</span>` : ""}
        </div>
        <div class="grid grid-cols-4 gap-2">
          ${PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p =>
            `<img src="${p.image}" alt="${p.name}" onclick="document.getElementById('main-product-img').src='${p.image}'" class="h-20 w-full object-cover rounded-xl cursor-pointer hover:ring-2 hover:ring-rose-400 transition-all">`
          ).join("")}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h1 class="font-playfair text-3xl font-bold text-gray-900 dark:text-white">${product.name}</h1>
        <div class="flex items-center gap-2">
          <span class="text-yellow-400 text-xl">${stars}</span>
          <span class="text-sm text-gray-500">(${product.rating * 12} reviews)</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-3xl font-bold text-rose-500">₹${product.price}</span>
          <span class="text-gray-400 line-through text-xl">₹${product.originalPrice}</span>
          <span class="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">${discount}% OFF</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${product.description}</p>
        <div>
          <p class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Size</p>
          <div class="flex gap-3">
            ${["Small", "Medium", "Large", "Extra Large"].map((s, i) =>
              `<label class="cursor-pointer">
                <input type="radio" name="size" value="${s}" ${i === 1 ? "checked" : ""} class="sr-only peer">
                <span class="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 text-sm peer-checked:border-rose-500 peer-checked:bg-rose-50 dark:peer-checked:bg-rose-900 peer-checked:text-rose-600 transition-all hover:border-rose-400">${s}</span>
              </label>`
            ).join("")}
          </div>
        </div>
        <div>
          <p class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Delivery Date</p>
          <input type="date" class="border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400" min="${new Date().toISOString().split('T')[0]}" value="${new Date(Date.now()+86400000).toISOString().split('T')[0]}">
        </div>
        <div class="flex gap-3 mt-2">
          <button onclick="addToCart(PRODUCTS.find(p=>p.id===${product.id}))" class="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-md">🛒 Add to Cart</button>
          <button onclick="toggleWishlist(${product.id})" data-wish-id="${product.id}" class="p-4 border border-gray-200 dark:border-gray-600 rounded-full hover:border-rose-400 transition-colors text-gray-600 dark:text-gray-300" aria-label="Add to wishlist">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>
        <div class="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Same Day Delivery</span>
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> 100% Fresh</span>
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Easy Returns</span>
        </div>
      </div>
    </div>`;
  syncWishlistIcons();
}

function renderRelated(product) {
  const el = $("#related-products");
  if (!el) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  el.innerHTML = related.map(p => buildProductCard(p)).join("");
  syncWishlistIcons();
}

/* ── Shop Page ── */
function initShopPage() {
  const grid = $("#shop-grid");
  if (!grid) return;
  renderShopGrid(PRODUCTS);
  initFilters();
}

function renderShopGrid(products) {
  const grid = $("#shop-grid");
  if (!grid) return;
  if (!products.length) {
    grid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-500">No products found. Try adjusting filters.</div>`;
    return;
  }
  grid.innerHTML = products.map(p => buildProductCard(p)).join("");
  syncWishlistIcons();
}

function initFilters() {
  const filterBtns = $$("[data-filter-cat]");
  const sortSelect = $("#sort-select");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("bg-rose-500", "text-white", "border-rose-500"));
      btn.classList.add("bg-rose-500", "text-white", "border-rose-500");
      applyFilters();
    });
  });

  sortSelect?.addEventListener("change", applyFilters);

  $$("[data-price-min], [data-price-max]").forEach(el => {
    el.addEventListener("input", () => {
      const min = $("#price-min");
      const max = $("#price-max");
      if (min && max) {
        const minLabel = $("#price-min-label");
        const maxLabel = $("#price-max-label");
        if (minLabel) minLabel.textContent = "₹" + min.value;
        if (maxLabel) maxLabel.textContent = "₹" + max.value;
      }
      applyFilters();
    });
  });
}

function applyFilters() {
  const catBtn = $("[data-filter-cat].bg-rose-500");
  const cat = catBtn?.dataset.filterCat || "all";
  const sortSelect = $("#sort-select");
  const sort = sortSelect?.value || "default";
  const minEl = $("#price-min");
  const maxEl = $("#price-max");
  const min = minEl ? parseInt(minEl.value) : 0;
  const max = maxEl ? parseInt(maxEl.value) : 9999;

  let filtered = PRODUCTS.filter(p => (cat === "all" || p.category === cat) && p.price >= min && p.price <= max);

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  renderShopGrid(filtered);
}

/* ── Build Product Card ── */
function buildProductCard(p) {
  const stars = "★".repeat(p.rating) + "☆".repeat(5 - p.rating);
  const discount = Math.round((1 - p.price / p.originalPrice) * 100);
  return `
    <div class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-animate>
      <div class="relative overflow-hidden">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
        </a>
        ${p.badge ? `<span class="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">${p.badge}</span>` : ""}
        <span class="absolute top-3 right-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">${discount}% OFF</span>
        <button onclick="toggleWishlist(${p.id})" data-wish-id="${p.id}" class="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-gray-700/80 rounded-full hover:bg-white transition-colors text-gray-500" aria-label="Add to wishlist">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
        <div class="absolute inset-x-0 bottom-0 flex gap-2 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
          <button onclick="addToCart(PRODUCTS.find(p=>p.id===${p.id}))" class="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-full text-sm font-semibold transition-colors">Add to Cart</button>
          <button data-quick-view="${p.id}" class="bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">Quick View</button>
        </div>
      </div>
      <div class="p-4">
        <a href="product.html?id=${p.id}" class="font-semibold text-gray-900 dark:text-white hover:text-rose-500 transition-colors block truncate">${p.name}</a>
        <div class="text-yellow-400 text-sm my-1">${stars}</div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-rose-500">₹${p.price}</span>
          <span class="text-gray-400 line-through text-sm">₹${p.originalPrice}</span>
        </div>
      </div>
    </div>`;
}

/* ── Checkout Page ── */
function initCheckoutPage() {
  const form = $("#checkout-form");
  if (!form) return;

  // Populate order summary
  renderCheckoutSummary();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const modal = $("#success-modal");
    if (modal) { modal.classList.remove("hidden"); modal.classList.add("flex"); }
    ss("cart", []);
    updateCartBadge();
  });

  // Promo code
  const promoBtn = $("#apply-promo");
  promoBtn?.addEventListener("click", () => {
    const input = $("#promo-input");
    if (input?.value.trim().toUpperCase() === "BLOOM10") {
      showToast("Promo code applied! 10% discount added 🎉", "success");
    } else {
      showToast("Invalid promo code", "error");
    }
  });

  // Close success modal
  $("#close-success")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function renderCheckoutSummary() {
  const el = $("#checkout-summary");
  if (!el) return;
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 999 ? 0 : 99;
  el.innerHTML = `
    <div class="space-y-3">
      ${cart.map(i => `
        <div class="flex items-center gap-3">
          <img src="${i.image}" alt="${i.name}" class="w-14 h-14 object-cover rounded-lg">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">${i.name}</p>
            <p class="text-xs text-gray-500">Qty: ${i.qty}</p>
          </div>
          <p class="text-sm font-bold text-gray-900 dark:text-white">₹${i.price * i.qty}</p>
        </div>`).join("")}
      <div class="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2 text-sm">
        <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>₹${subtotal}</span></div>
        <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Delivery</span><span>${delivery === 0 ? '<span class="text-green-500">FREE</span>' : "₹" + delivery}</span></div>
        <div class="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-700 pt-2"><span>Total</span><span>₹${subtotal + delivery}</span></div>
      </div>
    </div>`;
}

/* ── Render Best Sellers on Home ── */
function initHomePage() {
  const grid = $("#best-sellers-grid");
  if (!grid) return;
  const bestSellers = PRODUCTS.filter(p => p.badge === "Best Seller" || p.rating === 5).slice(0, 8);
  grid.innerHTML = bestSellers.map(p => buildProductCard(p)).join("");
  syncWishlistIcons();
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  hideLoader();
  initDarkMode();
  updateCartBadge();
  updateWishlistBadge();
  initStickyHeader();
  initMobileMenu();
  initSearch();
  initBackToTop();
  initScrollAnimations();
  initNewsletter();
  initHeroSlider();
  initQuickView();
  initHomePage();
  initShopPage();
  initProductPage();
  initCartPage();
  initCheckoutPage();
});
