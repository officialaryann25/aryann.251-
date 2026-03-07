/* ==================== FLORIA - Premium Flower Delivery ====================
   script.js — All JavaScript functionality
   ================================================================= */

/* ================================================================= 
   DATA — Product catalog
   ================================================================= */

// Flower image seeds from picsum (deterministic, varied)
const IMG_BASE = 'https://picsum.photos/seed/';
const UNSPLASH = 'https://source.unsplash.com/400x400/?flower,bouquet,';

// Generate a plausible flower image URL using picsum with a seed
function flowerImg(seed, w = 400, h = 400) {
  // Use a deterministic picsum image
  return `${IMG_BASE}${seed}/${w}/${h}`;
}

// Flower names pool
const FLOWER_NAMES_BEST = [
  'The Violet Letter', "Isn't She Lovely", 'Queen of Violets', 'Rosette Charm',
  'Petal Bliss', 'Ivory Elegance', 'Crimson Dreams', 'Lavender Kiss',
  'Garden Reverie', 'Bloom Couture', 'Pastel Paradise', 'Blushing in Love',
  'Sweet Sunshine', 'Sweetheart Charm', 'Ivory Symphony', 'Mauve Surprise',
  'Golden Affair', 'Whispering Petals', 'Rose Cascade', 'Floral Serenade'
];

const PRICES_RANGE = [
  1295, 1595, 1895, 2195, 2395, 2895, 3295, 3895, 4095, 4595,
  4845, 5195, 5595, 5995, 6495, 6995, 7345, 7895, 8295, 8995,
  9395, 9895, 10495, 10995, 11495, 11995, 12495, 12995, 13495, 14045
];

const RATINGS = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
const REVIEW_COUNTS = [3, 7, 12, 15, 20, 26, 30, 45, 64, 78, 101, 149, 200, 361];
const DELIVERY_TYPES = ['Same Day', 'Same Day', 'Same Day', 'Next Day'];

const COLLECTION_NAMES = [
  'Birthday Collection', 'Anniversary Collection', 'Grand Gestures',
  'Vase Arrangements', 'Hand Tied Collection', 'Wedding Flowers'
];

const COLLECTION_SUBTITLES = [
  'Make their day extra special with fresh blooms',
  'Celebrate love with stunning floral arrangements',
  'Bold, lavish arrangements that make a statement',
  'Elegantly displayed in premium glass vases',
  'Beautifully hand-crafted bouquets for every occasion',
  'Create magical memories with wedding-perfect flowers'
];

// Name prefixes/suffixes for generated names
const FLOWER_NAME_PARTS = [
  ['Blushing', 'Rosy', 'Golden', 'Ivory', 'Pink', 'Purple', 'Scarlet', 'Lavender', 'Peach', 'White',
   'Royal', 'Silky', 'Velvet', 'Pastel', 'Crimson', 'Azure', 'Coral', 'Rustic', 'Dreamy', 'Sweet'],
  ['Rose', 'Lily', 'Orchid', 'Tulip', 'Daisy', 'Carnation', 'Hydrangea', 'Peony', 'Iris', 'Marigold',
   'Bloom', 'Petal', 'Garden', 'Bouquet', 'Blossom', 'Charm', 'Dream', 'Kiss', 'Affair', 'Serenade']
];

function generateFlowerName(idx) {
  if (idx < FLOWER_NAMES_BEST.length) return FLOWER_NAMES_BEST[idx];
  const a = FLOWER_NAME_PARTS[0][idx % FLOWER_NAME_PARTS[0].length];
  const b = FLOWER_NAME_PARTS[1][(idx * 3 + 7) % FLOWER_NAME_PARTS[1].length];
  return `${a} ${b}`;
}

function getPrice(idx) { return PRICES_RANGE[idx % PRICES_RANGE.length]; }
function getRating(idx) { return RATINGS[idx % RATINGS.length]; }
function getReviews(idx) { return REVIEW_COUNTS[idx % REVIEW_COUNTS.length]; }
function getDelivery(idx) { return DELIVERY_TYPES[idx % DELIVERY_TYPES.length]; }

// Generate products for a given collection
function generateProducts(count, collectionId, offset = 0) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const idx = i + offset;
    const seed = `${collectionId}-${idx}`;
    products.push({
      id: `${collectionId}-${idx}`,
      name: generateFlowerName(idx),
      price: getPrice(idx),
      rating: getRating(idx),
      reviews: getReviews(idx),
      delivery: getDelivery(idx),
      image: flowerImg(seed),
      collection: collectionId,
      category: collectionId.replace(/-/g, ' ')
    });
  }
  return products;
}

// All product data
const PRODUCTS = {
  bestselling: generateProducts(50, 'bestselling'),
  birthday: generateProducts(50, 'birthday', 50),
  anniversary: generateProducts(50, 'anniversary', 100),
  grandgestures: generateProducts(50, 'grandgestures', 150),
  vase: generateProducts(50, 'vase', 200),
  handtied: generateProducts(50, 'handtied', 250),
  wedding: generateProducts(50, 'wedding', 300)
};

// Flat all-products array for search
const ALL_PRODUCTS = Object.values(PRODUCTS).flat();

/* ================================================================= 
   CART STATE
   ================================================================= */
let cart = JSON.parse(localStorage.getItem('floria-cart') || '[]');

function saveCart() {
  localStorage.setItem('floria-cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`✓ "${product.name}" added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count');
  countEls.forEach(el => { el.textContent = getCartCount(); });
}

/* ================================================================= 
   RENDER PRODUCT CARD
   ================================================================= */
function renderProductCard(product, slim = false) {
  const stars = renderStars(product.rating);
  const deliveryColor = product.delivery === 'Same Day' ? '#2e7d32' : '#f57c00';
  return `
    <div class="product-card" data-id="${product.id}" onclick="goToProduct('${product.id}')">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/fallback${product.id}/400/400'">
        <button class="product-wish" onclick="event.stopPropagation(); toggleWishlist(this)" aria-label="Add to wishlist">♡</button>
        <div class="product-overlay-btns">
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')">Add to Cart</button>
          <button class="btn-quick-view" onclick="event.stopPropagation(); openQuickView('${product.id}')">Quick View</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹ ${product.price.toLocaleString('en-IN')}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-val">${product.rating}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="delivery-tag" style="color:${deliveryColor}">
          ${product.delivery === 'Same Day' ? '🚚' : '📦'} ${product.delivery} Delivery
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  let stars = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  for (let i = full + (half ? 1 : 0); i < 5; i++) stars += '☆';
  return stars;
}

/* ================================================================= 
   RENDER BESTSELLING SLIDER
   ================================================================= */
let bestsellingOffset = 0;
const SLIDER_VISIBLE = 4;

function renderBestsellingSlider() {
  const slider = document.getElementById('bestselling-slider');
  if (!slider) return;
  slider.innerHTML = PRODUCTS.bestselling.map(p => renderProductCard(p)).join('');
}

function scrollBestselling(dir) {
  const slider = document.getElementById('bestselling-slider');
  if (!slider) return;
  const cardWidth = 240 + 20; // card + gap
  slider.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
}

/* ================================================================= 
   RENDER COLLECTION GRIDS
   ================================================================= */
function renderCollectionGrid(containerId, productsKey, initialCount = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const products = PRODUCTS[productsKey];
  const shown = products.slice(0, initialCount);
  container.innerHTML = shown.map(p => renderProductCard(p)).join('');

  const loadMoreBtn = document.getElementById(`load-more-${productsKey}`);
  if (loadMoreBtn) {
    loadMoreBtn.dataset.offset = initialCount;
    loadMoreBtn.dataset.key = productsKey;
    if (initialCount >= products.length) loadMoreBtn.style.display = 'none';
  }
}

function loadMore(btn) {
  const key = btn.dataset.key;
  const offset = parseInt(btn.dataset.offset);
  const container = document.getElementById(`${key}-grid`);
  if (!container) return;
  const products = PRODUCTS[key];
  const nextBatch = products.slice(offset, offset + 8);
  container.innerHTML += nextBatch.map(p => renderProductCard(p)).join('');
  btn.dataset.offset = offset + 8;
  if (offset + 8 >= products.length) btn.style.display = 'none';
  observeAnimations();
}

/* ================================================================= 
   HERO SLIDER
   ================================================================= */
const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1487530811015-780ef13a3fce?w=1400&q=80',
    tag: 'Same-Day Delivery',
    title: 'Flowers In Hours',
    subtitle: 'Same-day delivery, wrapped in elegance.',
    btn: 'ORDER NOW',
    link: '#bestselling'
  },
  {
    bg: 'https://images.unsplash.com/photo-1490750967868-88df5691cc7a?w=1400&q=80',
    tag: 'Birthday Special',
    title: 'Birthdays Call For Blooms',
    subtitle: 'Send the most beautiful birthday arrangements.',
    btn: 'SHOP BIRTHDAY',
    link: '#birthday-section'
  },
  {
    bg: 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=1400&q=80',
    tag: 'Premium Collections',
    title: 'Luxury Flower Arrangements',
    subtitle: 'Exquisite blooms crafted by master florists.',
    btn: 'EXPLORE NOW',
    link: '#collections'
  },
  {
    bg: 'https://images.unsplash.com/photo-1562516710-26a90ad68d14?w=1400&q=80',
    tag: 'Express Your Love',
    title: 'Send Love Anywhere',
    subtitle: 'Worldwide delivery with care and elegance.',
    btn: 'SEND NOW',
    link: '#anniversary-section'
  }
];

let currentSlide = 0;
let sliderInterval = null;

function initHeroSlider() {
  const wrapper = document.getElementById('slides-wrapper');
  const dotsContainer = document.getElementById('slider-dots');
  if (!wrapper || !dotsContainer) return;

  wrapper.innerHTML = SLIDES.map((slide, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}">
      <div class="slide-bg" style="background-image:url('${slide.bg}')"></div>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <span class="slide-tag">${slide.tag}</span>
        <h1 class="slide-title">${slide.title}</h1>
        <p class="slide-subtitle">${slide.subtitle}</p>
        <a href="${slide.link}" class="slide-btn">${slide.btn}</a>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = SLIDES.map((_, i) => `
    <button class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})" aria-label="Go to slide ${i+1}"></button>
  `).join('');

  startSliderAuto();
}

function goToSlide(index) {
  const wrapper = document.getElementById('slides-wrapper');
  const dots = document.querySelectorAll('.dot');
  const slides = document.querySelectorAll('.slide');
  if (!wrapper) return;

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  currentSlide = (index + SLIDES.length) % SLIDES.length;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  slides[currentSlide] && slides[currentSlide].classList.add('active');
  dots[currentSlide] && dots[currentSlide].classList.add('active');
}

function prevSlide() { clearInterval(sliderInterval); goToSlide(currentSlide - 1); startSliderAuto(); }
function nextSlide() { clearInterval(sliderInterval); goToSlide(currentSlide + 1); startSliderAuto(); }

function startSliderAuto() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

/* ================================================================= 
   SIDE MENU
   ================================================================= */
function openMenu() {
  document.getElementById('side-menu').classList.add('open');
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  document.getElementById('side-menu').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ================================================================= 
   CART SIDEBAR
   ================================================================= */
function openCartSidebar() {
  renderCartSidebar();
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCartSidebar() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartSidebar() {
  const listEl = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-sidebar-total');
  const subtotalEl = document.getElementById('cart-sidebar-subtotal');
  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:0.82rem;margin-top:0.5rem">Add some beautiful flowers!</p>
      </div>
    `;
  } else {
    listEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹ ${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove">✕</button>
      </div>
    `).join('');
  }

  const total = getCartTotal();
  const shipping = total > 0 ? (total > 3000 ? 0 : 199) : 0;
  if (subtotalEl) subtotalEl.textContent = `₹ ${total.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹ ${(total + shipping).toLocaleString('en-IN')}`;

  const shippingEl = document.getElementById('cart-shipping');
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹ ${shipping}`;
}

/* ================================================================= 
   SEARCH
   ================================================================= */
let searchTimeout = null;

function handleSearch(query) {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;
  query = query.trim().toLowerCase();

  if (!query) {
    resultsEl.classList.remove('open');
    return;
  }

  const matches = ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  ).slice(0, 8);

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div style="padding:1rem;color:#888;font-size:0.88rem">No results for "${query}"</div>`;
  } else {
    resultsEl.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="goToProduct('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="sri-info">
          <div class="sri-name">${p.name}</div>
          <div class="sri-price">₹ ${p.price.toLocaleString('en-IN')}</div>
        </div>
      </div>
    `).join('');
  }
  resultsEl.classList.add('open');
}

function closeSearch() {
  const resultsEl = document.getElementById('search-results');
  if (resultsEl) setTimeout(() => resultsEl.classList.remove('open'), 150);
}

/* ================================================================= 
   QUICK VIEW MODAL
   ================================================================= */
function openQuickView(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-box" style="position:relative">
      <button class="modal-close-btn" onclick="closeQuickView()">✕</button>
      <div class="modal-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-info">
        <div style="font-size:0.75rem;color:#888;letter-spacing:1px;text-transform:uppercase;margin-bottom:0.5rem">${product.category}</div>
        <h2 style="font-family:var(--font-head);font-size:1.5rem;margin-bottom:0.6rem">${product.name}</h2>
        <div class="product-detail-rating" style="margin-bottom:0.75rem">
          <span class="stars">${renderStars(product.rating)}</span>
          <span style="font-size:0.85rem;color:#555">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div style="font-size:1.6rem;font-weight:700;margin-bottom:1rem">₹ ${product.price.toLocaleString('en-IN')}</div>
        <p style="font-size:0.875rem;color:#666;line-height:1.7;margin-bottom:1.5rem">
          A stunning floral arrangement crafted with the freshest blooms, perfect for any special occasion. 
          Our expert florists ensure every arrangement is made with care and elegance.
        </p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <button onclick="addToCart('${product.id}');closeQuickView()" 
            style="flex:1;padding:0.85rem 1rem;background:var(--primary);color:#fff;border:none;font-weight:700;font-size:0.85rem;letter-spacing:1px;cursor:pointer;transition:background 0.3s">
            ADD TO CART
          </button>
          <button onclick="goToProduct('${product.id}')" 
            style="padding:0.85rem 1.25rem;background:transparent;border:2px solid var(--primary);color:var(--primary);font-weight:700;font-size:0.85rem;cursor:pointer;transition:all 0.3s">
            VIEW DETAILS
          </button>
        </div>
        <div style="margin-top:1rem;font-size:0.8rem;color:#2e7d32">🚚 ${product.delivery} Delivery Available</div>
      </div>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ================================================================= 
   WISHLIST
   ================================================================= */
let wishlist = JSON.parse(localStorage.getItem('floria-wishlist') || '[]');

function toggleWishlist(btn) {
  const card = btn.closest('.product-card');
  const id = card ? card.dataset.id : null;
  if (!id) return;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(i => i !== id);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    wishlist.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('♥ Added to wishlist');
  }
  localStorage.setItem('floria-wishlist', JSON.stringify(wishlist));
}

/* ================================================================= 
   TOAST NOTIFICATION
   ================================================================= */
let toastTimeout = null;

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ================================================================= 
   NAVIGATE TO PRODUCT PAGE
   ================================================================= */
function goToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

/* ================================================================= 
   OVERLAY CLICK
   ================================================================= */
function handleOverlayClick() {
  closeMenu();
  closeCartSidebar();
  closeQuickView();
}

/* ================================================================= 
   SCROLL TO TOP
   ================================================================= */
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ================================================================= 
   ANIMATE ON SCROLL (Intersection Observer)
   ================================================================= */
function observeAnimations() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in:not(.visible)').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
  }
}

/* ================================================================= 
   CATEGORY NAVIGATION
   ================================================================= */
function initCategoryNav() {
  const items = document.querySelectorAll('.cat-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const target = item.dataset.target;
      if (target) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ================================================================= 
   MOBILE SEARCH TOGGLE
   ================================================================= */
function toggleMobileSearch() {
  const bar = document.getElementById('mobile-search-bar');
  if (bar) {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) {
      const input = bar.querySelector('input');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }
}

/* ================================================================= 
   PRODUCT PAGE — Load product details
   ================================================================= */
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const product = ALL_PRODUCTS.find(p => p.id === id);
  if (!product) return;

  // Set title
  document.title = `${product.name} — Floria`;

  // Populate main product
  const imgEl = document.getElementById('product-main-img');
  if (imgEl) imgEl.src = product.image;

  const nameEl = document.getElementById('product-detail-name');
  if (nameEl) nameEl.textContent = product.name;

  const priceEl = document.getElementById('product-detail-price');
  if (priceEl) priceEl.textContent = `₹ ${product.price.toLocaleString('en-IN')}`;

  const ratingEl = document.getElementById('product-detail-rating');
  if (ratingEl) ratingEl.innerHTML = `<span class="stars">${renderStars(product.rating)}</span> ${product.rating} (${product.reviews} reviews)`;

  const descEl = document.getElementById('product-detail-desc');
  if (descEl) descEl.textContent = `A breathtaking floral arrangement featuring the finest seasonal blooms, 
    hand-selected and expertly arranged by our master florists. 
    Perfect for expressing love, gratitude, or celebrating life's special moments. 
    Each arrangement is carefully wrapped and delivered fresh to your door.`;

  // Thumbnails
  const thumbsEl = document.getElementById('product-thumbs');
  if (thumbsEl) {
    const altImages = [
      flowerImg(`${product.id}-a`),
      flowerImg(`${product.id}-b`),
      flowerImg(`${product.id}-c`),
      flowerImg(`${product.id}-d`)
    ];
    thumbsEl.innerHTML = [product.image, ...altImages].map((src, i) => `
      <img class="product-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="View ${i+1}" 
           onclick="switchProductImg('${src}', this)" loading="lazy">
    `).join('');
  }

  // Quantity controls
  const qtyEl = document.getElementById('product-qty');
  if (qtyEl) {
    document.getElementById('qty-minus') && (document.getElementById('qty-minus').onclick = () => {
      let val = parseInt(qtyEl.textContent);
      if (val > 1) qtyEl.textContent = val - 1;
    });
    document.getElementById('qty-plus') && (document.getElementById('qty-plus').onclick = () => {
      let val = parseInt(qtyEl.textContent);
      qtyEl.textContent = val + 1;
    });
  }

  // Add to cart button
  const atcBtn = document.getElementById('add-to-cart-main');
  if (atcBtn) {
    atcBtn.onclick = () => {
      const qty = parseInt(document.getElementById('product-qty')?.textContent || 1);
      for (let i = 0; i < qty; i++) addToCart(product.id);
      openCartSidebar();
    };
  }

  // Related products
  const relatedEl = document.getElementById('related-products-grid');
  if (relatedEl) {
    const related = ALL_PRODUCTS.filter(p => p.id !== id).slice(0, 4);
    relatedEl.innerHTML = related.map(p => renderProductCard(p)).join('');
  }

  updateCartUI();
}

function switchProductImg(src, thumbEl) {
  const mainImg = document.getElementById('product-main-img');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

/* ================================================================= 
   CART PAGE
   ================================================================= */
function initCartPage() {
  renderCartPage();
  updateCartUI();
}

function renderCartPage() {
  const tableEl = document.getElementById('cart-table');
  const summaryEl = document.getElementById('cart-page-summary');
  if (!tableEl) return;

  if (cart.length === 0) {
    tableEl.innerHTML = `
      <div style="text-align:center;padding:4rem 1rem;color:#888">
        <div style="font-size:4rem;margin-bottom:1rem">🛒</div>
        <p style="font-size:1.1rem;margin-bottom:1rem">Your cart is empty</p>
        <a href="index.html" style="padding:0.75rem 2rem;background:#2c2c2c;color:#fff;font-size:0.85rem;letter-spacing:1px;text-transform:uppercase">Continue Shopping</a>
      </div>
    `;
    return;
  }

  tableEl.innerHTML = `
    <div class="cart-table-header">
      <div>Product</div>
      <div class="col-price">Price</div>
      <div>Quantity</div>
      <div class="col-total">Total</div>
    </div>
    ${cart.map(item => `
      <div class="cart-table-item">
        <div class="item-product">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div>
            <div style="font-weight:500;font-size:0.9rem">${item.name}</div>
            <button onclick="removeFromCart('${item.id}');renderCartPage()" 
              style="background:none;border:none;color:#e53935;font-size:0.78rem;cursor:pointer;padding:0;margin-top:0.3rem">Remove</button>
          </div>
        </div>
        <div class="item-price-col" style="font-size:0.9rem">₹ ${item.price.toLocaleString('en-IN')}</div>
        <div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${item.id}',-1);renderCartPage()">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}',1);renderCartPage()">+</button>
          </div>
        </div>
        <div class="item-total" style="font-weight:600">₹ ${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>
    `).join('')}
  `;

  if (summaryEl) {
    const subtotal = getCartTotal();
    const shipping = subtotal > 3000 ? 0 : 199;
    const total = subtotal + shipping;
    summaryEl.innerHTML = `
      <div class="cart-summary-box">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>₹ ${subtotal.toLocaleString('en-IN')}</span></div>
        <div class="summary-row"><span>Delivery</span><span>${shipping === 0 ? '<span style="color:#2e7d32">FREE</span>' : `₹ ${shipping}`}</span></div>
        ${shipping > 0 ? `<div style="font-size:0.78rem;color:#888;margin-top:-0.5rem;margin-bottom:0.75rem">Add ₹ ${(3000-subtotal).toLocaleString('en-IN')} more for free delivery</div>` : ''}
        <div class="summary-total"><span>Total</span><span>₹ ${total.toLocaleString('en-IN')}</span></div>
        <button class="checkout-btn" onclick="showToast('🎉 Checkout coming soon!')">PROCEED TO CHECKOUT</button>
        <a href="index.html" class="continue-shopping">Continue Shopping</a>
      </div>
    `;
  }
}

/* ================================================================= 
   LOGIN PAGE LOGIC
   ================================================================= */
function initLoginPage() {
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginTab) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab && registerTab.classList.remove('active');
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
    });
  }
  if (registerTab) {
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab && loginTab.classList.remove('active');
      if (registerForm) registerForm.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
    });
  }

  // Login form validation
  const loginFormEl = document.getElementById('login-form-el');
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const email = loginFormEl.querySelector('#login-email');
      const password = loginFormEl.querySelector('#login-password');
      const emailError = loginFormEl.querySelector('#login-email-error');
      const passError = loginFormEl.querySelector('#login-pass-error');

      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        emailError && emailError.classList.add('show');
        valid = false;
      } else {
        emailError && emailError.classList.remove('show');
      }

      if (!password.value || password.value.length < 6) {
        passError && passError.classList.add('show');
        valid = false;
      } else {
        passError && passError.classList.remove('show');
      }

      if (valid) {
        showToast('✓ Login successful! Welcome to Floria.');
        setTimeout(() => window.location.href = 'index.html', 1500);
      }
    });
  }

  // Register form validation
  const registerFormEl = document.getElementById('register-form-el');
  if (registerFormEl) {
    registerFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = registerFormEl.querySelector('#reg-name');
      const email = registerFormEl.querySelector('#reg-email');
      const password = registerFormEl.querySelector('#reg-password');
      const confirmPass = registerFormEl.querySelector('#reg-confirm');

      const nameError = registerFormEl.querySelector('#reg-name-error');
      const emailError = registerFormEl.querySelector('#reg-email-error');
      const passError = registerFormEl.querySelector('#reg-pass-error');
      const confirmError = registerFormEl.querySelector('#reg-confirm-error');

      if (!name || !name.value.trim()) {
        nameError && nameError.classList.add('show');
        valid = false;
      } else { nameError && nameError.classList.remove('show'); }

      if (!email || !email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        emailError && emailError.classList.add('show');
        valid = false;
      } else { emailError && emailError.classList.remove('show'); }

      if (!password || !password.value || password.value.length < 6) {
        passError && passError.classList.add('show');
        valid = false;
      } else { passError && passError.classList.remove('show'); }

      if (!confirmPass || confirmPass.value !== (password ? password.value : '')) {
        confirmError && confirmError.classList.add('show');
        valid = false;
      } else { confirmError && confirmError.classList.remove('show'); }

      if (valid) {
        showToast('✓ Account created! Welcome to Floria.');
        setTimeout(() => window.location.href = 'index.html', 1500);
      }
    });
  }
}

/* ================================================================= 
   BLOG DATA & RENDER
   ================================================================= */
const BLOGS = [
  {
    id: 1,
    tag: 'Gifting Guide',
    title: 'Best Flowers For Your Girlfriend',
    excerpt: 'Choosing the perfect flowers for your girlfriend can be a beautiful gesture. Discover the most romantic blooms that will make her heart flutter.',
    image: 'https://picsum.photos/seed/blog-1/600/400',
    date: 'March 2, 2026'
  },
  {
    id: 2,
    tag: 'Birthday Ideas',
    title: 'Top 10 Birthday Flowers to Send',
    excerpt: 'Make every birthday unforgettable with the right flowers. From vibrant sunflowers to elegant roses, here are our top picks for birthday bouquets.',
    image: 'https://picsum.photos/seed/blog-2/600/400',
    date: 'February 28, 2026'
  },
  {
    id: 3,
    tag: 'Plant Guide',
    title: 'The Complete Money Plant Care Guide',
    excerpt: 'Money plants are not just lucky — they\'re beautiful too. Learn how to care for your money plant and keep it thriving all year round.',
    image: 'https://picsum.photos/seed/blog-3/600/400',
    date: 'February 20, 2026'
  },
  {
    id: 4,
    tag: 'Seasonal',
    title: 'Spring Flowers: A Complete Guide',
    excerpt: 'Spring brings an abundance of gorgeous blooms. Explore the most stunning spring flowers and how to incorporate them into your home decor.',
    image: 'https://picsum.photos/seed/blog-4/600/400',
    date: 'February 15, 2026'
  },
  {
    id: 5,
    tag: 'Wedding',
    title: 'Choosing Wedding Flowers: Expert Tips',
    excerpt: 'Your wedding flowers set the tone for your entire celebration. Our expert florists share their top tips for choosing the perfect wedding flowers.',
    image: 'https://picsum.photos/seed/blog-5/600/400',
    date: 'February 10, 2026'
  },
  {
    id: 6,
    tag: 'Flowers & Wellness',
    title: 'How Flowers Improve Your Mood',
    excerpt: 'Science confirms what we\'ve always known — flowers make us happy! Discover how surrounding yourself with fresh blooms can transform your mental wellbeing.',
    image: 'https://picsum.photos/seed/blog-6/600/400',
    date: 'February 5, 2026'
  }
];

function renderBlogs() {
  const container = document.getElementById('blog-grid');
  if (!container) return;
  container.innerHTML = BLOGS.map(blog => `
    <article class="blog-card animate-in">
      <div class="blog-img-wrap">
        <img src="${blog.image}" alt="${blog.title}" loading="lazy">
      </div>
      <div class="blog-body">
        <div class="blog-tag">${blog.tag}</div>
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-excerpt">${blog.excerpt}</p>
        <button class="blog-read-btn" onclick="showToast('📖 Blog coming soon!')">Keep Reading →</button>
      </div>
    </article>
  `).join('');
}

/* ================================================================= 
   INIT — Main entry point
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  // Always update cart count
  updateCartUI();

  if (page === 'home') {
    // Init hero slider
    initHeroSlider();

    // Render bestselling
    renderBestsellingSlider();

    // Render collection grids
    renderCollectionGrid('birthday-grid', 'birthday');
    renderCollectionGrid('anniversary-grid', 'anniversary');
    renderCollectionGrid('grandgestures-grid', 'grandgestures');
    renderCollectionGrid('vase-grid', 'vase');
    renderCollectionGrid('handtied-grid', 'handtied');
    renderCollectionGrid('wedding-grid', 'wedding');

    // Render blogs
    renderBlogs();

    // Category nav
    initCategoryNav();

    // Overlay click
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.addEventListener('click', handleOverlayClick);

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => handleSearch(e.target.value), 200);
      });
      searchInput.addEventListener('blur', closeSearch);
    }

    // Mobile search
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => handleSearch(e.target.value), 200);
      });
    }

    // Animations
    setTimeout(observeAnimations, 300);
  }

  if (page === 'product') {
    initProductPage();
    observeAnimations();
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.addEventListener('click', handleOverlayClick);
  }

  if (page === 'cart') {
    initCartPage();
  }

  if (page === 'login') {
    initLoginPage();
  }

  // Scroll to top
  initScrollTop();
});
