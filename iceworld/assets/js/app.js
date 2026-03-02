const PRODUCTS = [
  { id: 1, name: 'Velvet Vanilla Tub', price: 299, rating: 5, category: 'Premium Ice Cream Tubs', image: 'https://picsum.photos/seed/ice1/600/600', description: 'Silky vanilla bean ice cream with premium cream.' },
  { id: 2, name: 'Choco Truffle Sundae', price: 349, rating: 5, category: 'Sundaes', image: 'https://picsum.photos/seed/ice2/600/600', description: 'Chocolate fudge sundae topped with truffle crumble.' },
  { id: 3, name: 'Strawberry Bliss Cake', price: 899, rating: 4, category: 'Ice Cream Cakes', image: 'https://picsum.photos/seed/ice3/600/600', description: 'Layered strawberry ice cream cake for celebrations.' },
  { id: 4, name: 'Hazelnut Party Pack', price: 1199, rating: 4, category: 'Party Packs', image: 'https://picsum.photos/seed/ice4/600/600', description: 'Family-size party pack with rich hazelnut swirl.' },
  { id: 5, name: 'Caramel Crunch Delight', price: 399, rating: 5, category: 'Chocolate Desserts', image: 'https://picsum.photos/seed/ice5/600/600', description: 'Caramelized crunch and smooth cream combo.' },
  { id: 6, name: 'Mango Seasonal Scoop', price: 279, rating: 4, category: 'Seasonal Specials', image: 'https://picsum.photos/seed/ice6/600/600', description: 'Refreshing alphonso mango seasonal special.' },
  { id: 7, name: 'Dark Cocoa Tub', price: 329, rating: 5, category: 'Premium Ice Cream Tubs', image: 'https://picsum.photos/seed/ice7/600/600', description: 'Deep dark cocoa crafted for true chocolate lovers.' },
  { id: 8, name: 'Blueberry Cheesecake Scoop', price: 359, rating: 4, category: 'Seasonal Specials', image: 'https://picsum.photos/seed/ice8/600/600', description: 'Blueberry compote with cheesecake-inspired creaminess.' }
];

const BRAND = {
  owners: [
    { name: 'MAHI SEHRAWAT', contact: '+91 8750141860', email: 'MAHISEHRAWAT2006@GMAIL.COM' },
    { name: 'Priyanshi', contact: '+91 8368573180', email: 'priyadaksh007@gmail.com' }
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (v) => String(v).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

function updateCounters() {
  const cart = store.get('iceworld_cart', []);
  const wishlist = store.get('iceworld_wishlist', []);
  $$('.cart-count').forEach((n) => (n.textContent = cart.reduce((a, b) => a + (b.qty || 1), 0)));
  $$('.wishlist-count').forEach((n) => (n.textContent = wishlist.length));
}

function addToCart(productId, qty = 1) {
  const cart = store.get('iceworld_cart', []);
  const found = cart.find((i) => i.id === productId);
  if (found) found.qty += qty;
  else cart.push({ id: productId, qty });
  store.set('iceworld_cart', cart);
  updateCounters();
  showToast('Added to cart');
}

function toggleWishlist(productId) {
  const wishlist = store.get('iceworld_wishlist', []);
  const idx = wishlist.indexOf(productId);
  if (idx >= 0) wishlist.splice(idx, 1);
  else wishlist.push(productId);
  store.set('iceworld_wishlist', wishlist);
  updateCounters();
  renderWishlistState();
}

function renderWishlistState() {
  const wishlist = store.get('iceworld_wishlist', []);
  $$('[data-wishlist]').forEach((btn) => {
    const active = wishlist.includes(Number(btn.dataset.wishlist));
    btn.classList.toggle('text-pink-600', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 1800);
}

function initSearch() {
  const input = $('#searchInput');
  const dropdown = $('#searchDropdown');
  if (!input || !dropdown) return;
  input.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    dropdown.innerHTML = '';
    if (!term) return dropdown.classList.add('hidden');
    PRODUCTS.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 5).forEach((p) => {
      const item = document.createElement('button');
      item.className = 'w-full px-3 py-2 text-left hover:bg-pink-50 dark:hover:bg-slate-700';
      item.type = 'button';
      item.textContent = p.name;
      item.onclick = () => (window.location.href = `product.html?id=${p.id}`);
      dropdown.appendChild(item);
    });
    dropdown.classList.remove('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap')) dropdown.classList.add('hidden');
  });
}

function initDarkMode() {
  const toggle = $('#darkToggle');
  const root = document.documentElement;
  const current = localStorage.getItem('iceworld_theme') || 'light';
  root.classList.toggle('dark', current === 'dark');
  if (!toggle) return;
  toggle.setAttribute('aria-pressed', current === 'dark');
  toggle.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    localStorage.setItem('iceworld_theme', dark ? 'dark' : 'light');
    toggle.setAttribute('aria-pressed', dark);
  });
}

function initCommonUI() {
  const mobileBtn = $('#mobileMenuBtn');
  const mobileMenu = $('#mobileMenu');
  mobileBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));

  window.addEventListener('scroll', () => {
    const header = $('#siteHeader');
    header?.classList.toggle('shadow-lg', window.scrollY > 10);
    $('#backToTop')?.classList.toggle('hidden', window.scrollY < 400);
  });
  $('#backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add('opacity-100', 'translate-y-0'));
  }, { threshold: 0.15 });
  $$('.fade-in').forEach((el) => observer.observe(el));

  window.addEventListener('load', () => $('#loader')?.classList.add('hidden'));
}

function initQuickView() {
  const modal = $('#quickViewModal');
  if (!modal) return;
  $$('.quick-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.productId));
      if (!product) return;
      $('#qvImage').src = product.image;
      $('#qvImage').alt = product.name;
      $('#qvName').textContent = product.name;
      $('#qvPrice').textContent = `₹${product.price}`;
      $('#qvDesc').textContent = product.description;
      $('#qvAdd').onclick = () => addToCart(product.id);
      modal.classList.remove('hidden');
    });
  });
  $('#qvClose')?.addEventListener('click', () => modal.classList.add('hidden'));
}

function renderCards(target, items) {
  const host = $(target);
  if (!host) return;
  host.innerHTML = items.map((p) => `
    <article class="rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur p-4 shadow hover:-translate-y-1 transition">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" class="w-full h-48 object-cover rounded-xl" />
      <div class="mt-3 flex justify-between items-start gap-2"><h3 class="font-semibold">${esc(p.name)}</h3><button aria-label="Toggle wishlist" data-wishlist="${p.id}" class="text-slate-500">❤</button></div>
      <p class="text-sm text-slate-600 dark:text-slate-300">₹${p.price}</p>
      <div class="flex gap-2 mt-3"><button data-product-id="${p.id}" class="quick-view-btn px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border">Quick View</button><button data-add-cart="${p.id}" class="px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-400 text-white">Add to Cart</button></div>
    </article>`).join('');
}

function initProductButtons() {
  document.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('[data-add-cart]');
    const wlBtn = e.target.closest('[data-wishlist]');
    if (cartBtn) addToCart(Number(cartBtn.dataset.addCart));
    if (wlBtn) toggleWishlist(Number(wlBtn.dataset.wishlist));
  });
}

function initHeroSlider() {
  const slides = $$('.hero-slide');
  if (!slides.length) return;
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.add('hidden');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.remove('hidden');
  }, 4000);
}

function renderShop() {
  const page = document.body.dataset.page;
  if (page !== 'shop') return;
  let items = [...PRODUCTS];
  const grid = '#shopGrid';
  const sort = $('#sortSelect');
  const category = $('#categoryFilter');
  const price = $('#priceRange');
  function apply() {
    items = [...PRODUCTS].filter((p) => (category.value ? p.category === category.value : true)).filter((p) => p.price <= Number(price.value));
    if (sort.value === 'priceAsc') items.sort((a,b) => a.price-b.price);
    if (sort.value === 'priceDesc') items.sort((a,b) => b.price-a.price);
    renderCards(grid, items.slice(0, 6));
    renderWishlistState();
    initQuickView();
  }
  [sort, category, price].forEach((el) => el?.addEventListener('change', apply));
  apply();
}

function renderCartPage() {
  if (document.body.dataset.page !== 'cart') return;
  const host = $('#cartItems');
  const subtotalEl = $('#cartSubtotal');
  function draw() {
    const cart = store.get('iceworld_cart', []);
    const enriched = cart.map((i) => ({ ...PRODUCTS.find((p) => p.id === i.id), qty: i.qty })).filter((i) => i.id);
    host.innerHTML = enriched.length ? enriched.map((i) => `<div class="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800"><img src="${esc(i.image)}" alt="${esc(i.name)}" class="w-20 h-20 rounded-lg object-cover"/><div class="flex-1"><h3 class="font-semibold">${esc(i.name)}</h3><p>₹${i.price}</p><div class="flex items-center gap-2 mt-2"><button data-qty="${i.id}" data-op="dec" class="px-2 border rounded">-</button><span>${i.qty}</span><button data-qty="${i.id}" data-op="inc" class="px-2 border rounded">+</button><button data-remove="${i.id}" class="ml-4 text-red-500">Remove</button></div></div></div>`).join('') : '<p>Your cart is empty.</p>';
    subtotalEl.textContent = `₹${enriched.reduce((t, i) => t + i.price * i.qty, 0)}`;
    updateCounters();
  }
  host.addEventListener('click', (e) => {
    const cart = store.get('iceworld_cart', []);
    const qty = e.target.closest('[data-qty]');
    const remove = e.target.closest('[data-remove]');
    if (qty) {
      const item = cart.find((i) => i.id === Number(qty.dataset.qty));
      if (item) item.qty += qty.dataset.op === 'inc' ? 1 : -1;
      store.set('iceworld_cart', cart.filter((i) => i.qty > 0));
      draw();
    }
    if (remove) {
      store.set('iceworld_cart', cart.filter((i) => i.id !== Number(remove.dataset.remove)));
      draw();
    }
  });
  draw();
}

function initCheckout() {
  if (document.body.dataset.page !== 'checkout') return;
  const summary = $('#orderSummary');
  const items = store.get('iceworld_cart', []).map((i) => ({ ...PRODUCTS.find((p) => p.id === i.id), qty: i.qty })).filter((i) => i.id);
  const total = items.reduce((t, i) => t + i.price * i.qty, 0);
  summary.innerHTML = items.map((i) => `<p class="flex justify-between"><span>${esc(i.name)} x${i.qty}</span><span>₹${i.price * i.qty}</span></p>`).join('') + `<hr class="my-3"/><p class="flex justify-between font-semibold"><span>Total</span><span>₹${total}</span></p>`;
  $('#placeOrderBtn')?.addEventListener('click', () => $('#orderModal')?.classList.remove('hidden'));
  $('#closeOrderModal')?.addEventListener('click', () => $('#orderModal')?.classList.add('hidden'));
  $('#applyPromo')?.addEventListener('click', () => showToast('Promo applied (demo)'));
}

function initProductPage() {
  if (document.body.dataset.page !== 'product') return;
  const id = Number(new URLSearchParams(location.search).get('id')) || 1;
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  $('#productName').textContent = p.name;
  $('#productPrice').textContent = `₹${p.price}`;
  $('#productDesc').textContent = p.description;
  $('#mainProductImage').src = p.image;
  $('#mainProductImage').alt = p.name;
  $$('.thumb').forEach((t) => t.addEventListener('click', () => { $('#mainProductImage').src = t.src; }));
  $('#productAddCart')?.addEventListener('click', () => addToCart(p.id, Number($('#qtyInput').value || 1)));
  $('#productWish')?.addEventListener('click', () => toggleWishlist(p.id));
  renderCards('#relatedProducts', PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4));
  renderWishlistState();
  initQuickView();
}

function initNewsletter() {
  $('#newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Subscribed successfully!');
    e.target.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initCommonUI();
  initSearch();
  initHeroSlider();
  initProductButtons();
  renderShop();
  renderCartPage();
  initCheckout();
  initProductPage();
  initQuickView();
  initNewsletter();
  updateCounters();
  renderWishlistState();
  if ($('#bestSellerGrid')) renderCards('#bestSellerGrid', PRODUCTS.slice(0, 6));
});
