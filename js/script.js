/* =============================================
   IceWorld - Premium Ice Cream Shop
   Main JavaScript File
   ============================================= */

'use strict';

// -----------------------------------------------
// PRODUCT DATA
// -----------------------------------------------
const products = [
    // Best Sellers / Featured
    { id: 1,  name: 'Chocolate Cone',        category: 'cones',    price: 149, oldPrice: 199, rating: 4.8, reviews: 234, emoji: '🍦', badge: 'Best Seller', desc: 'Rich dark chocolate ice cream in a crispy waffle cone.' },
    { id: 2,  name: 'Strawberry Delight',    category: 'classic',  price: 129, oldPrice: 169, rating: 4.7, reviews: 189, emoji: '🍓', badge: 'Popular',     desc: 'Fresh strawberry ice cream with real fruit chunks.' },
    { id: 3,  name: 'Vanilla Dream',         category: 'classic',  price: 119, oldPrice: null, rating: 4.6, reviews: 312, emoji: '🍨', badge: null,          desc: 'Creamy Madagascar vanilla bean ice cream.' },
    { id: 4,  name: 'Mango Magic',           category: 'premium',  price: 159, oldPrice: 199, rating: 4.9, reviews: 278, emoji: '🥭', badge: 'New',          desc: 'Exotic Alphonso mango sorbet bursting with flavor.' },
    { id: 5,  name: 'Butterscotch Bliss',    category: 'premium',  price: 169, oldPrice: 219, rating: 4.7, reviews: 156, emoji: '🍮', badge: 'Popular',      desc: 'Golden butterscotch with caramel swirls.' },
    // Classic
    { id: 6,  name: 'Mint Choco Chip',       category: 'classic',  price: 139, oldPrice: null, rating: 4.5, reviews: 201, emoji: '🌿', badge: null,           desc: 'Cool peppermint with dark chocolate chips.' },
    { id: 7,  name: 'Coffee Caramel',        category: 'classic',  price: 149, oldPrice: 179, rating: 4.6, reviews: 143, emoji: '☕', badge: null,            desc: 'Espresso ice cream with salted caramel drizzle.' },
    { id: 8,  name: 'Blue Blueberry',        category: 'classic',  price: 129, oldPrice: null, rating: 4.4, reviews: 98,  emoji: '🫐', badge: null,           desc: 'Sweet wild blueberry ice cream.' },
    { id: 9,  name: 'Lemon Sorbet',          category: 'classic',  price: 119, oldPrice: null, rating: 4.3, reviews: 167, emoji: '🍋', badge: null,           desc: 'Tangy fresh lemon sorbet, dairy-free.' },
    { id: 10, name: 'Pistachio Royale',      category: 'premium',  price: 179, oldPrice: 229, rating: 4.8, reviews: 134, emoji: '🌰', badge: 'Premium',      desc: 'Authentic pistachio ice cream with real nuts.' },
    // Premium
    { id: 11, name: 'Black Forest',          category: 'premium',  price: 189, oldPrice: 239, rating: 4.9, reviews: 245, emoji: '🍒', badge: 'Premium',      desc: 'Cherry, dark chocolate & whipped cream.' },
    { id: 12, name: 'Salted Caramel',        category: 'premium',  price: 169, oldPrice: 199, rating: 4.7, reviews: 198, emoji: '🍬', badge: null,            desc: 'Rich caramel with a hint of sea salt.' },
    { id: 13, name: 'Rose Gulkand',          category: 'premium',  price: 179, oldPrice: 219, rating: 4.6, reviews: 112, emoji: '🌹', badge: 'New',          desc: 'Traditional rose petal & gulkand ice cream.' },
    { id: 14, name: 'Tiramisu Dream',        category: 'premium',  price: 199, oldPrice: 249, rating: 4.8, reviews: 167, emoji: '🎂', badge: 'Premium',      desc: 'Italian tiramisu inspired ice cream.' },
    { id: 15, name: 'Matcha Green Tea',      category: 'premium',  price: 189, oldPrice: 229, rating: 4.7, reviews: 143, emoji: '🍵', badge: null,            desc: 'Japanese matcha with white chocolate chunks.' },
    // Cones
    { id: 16, name: 'Double Scoop Cone',     category: 'cones',    price: 159, oldPrice: 199, rating: 4.6, reviews: 289, emoji: '🍦', badge: 'Popular',      desc: 'Two scoops of your favorite flavors in waffle cone.' },
    { id: 17, name: 'Nutty Cone',            category: 'cones',    price: 169, oldPrice: null, rating: 4.5, reviews: 134, emoji: '🥜', badge: null,           desc: 'Mixed nuts & ice cream in chocolate-dipped cone.' },
    { id: 18, name: 'Rainbow Cone',          category: 'cones',    price: 179, oldPrice: 209, rating: 4.8, reviews: 378, emoji: '🌈', badge: 'Kids Fav',     desc: 'Colorful five-flavor rainbow striped ice cream cone.' },
    { id: 19, name: 'Choco Dipped Cone',     category: 'cones',    price: 189, oldPrice: 229, rating: 4.7, reviews: 201, emoji: '🍫', badge: null,            desc: 'Vanilla scoop in a dark chocolate dipped waffle cone.' },
    { id: 20, name: 'Oreo Crunch Cone',      category: 'cones',    price: 199, oldPrice: 239, rating: 4.9, reviews: 312, emoji: '🖤', badge: 'Best Seller',  desc: 'Cookies & cream ice cream loaded with Oreo crumbs.' },
    // Cups
    { id: 21, name: 'Classic Vanilla Cup',   category: 'cups',     price: 99,  oldPrice: null, rating: 4.4, reviews: 456, emoji: '🍨', badge: null,           desc: 'Pure vanilla ice cream in a serving cup.' },
    { id: 22, name: 'Choco Fudge Cup',       category: 'cups',     price: 129, oldPrice: 159, rating: 4.7, reviews: 234, emoji: '🍫', badge: null,            desc: 'Rich chocolate fudge ice cream cup.' },
    { id: 23, name: 'Mango Sorbet Cup',      category: 'cups',     price: 119, oldPrice: null, rating: 4.6, reviews: 178, emoji: '🥭', badge: null,           desc: 'Fresh Alphonso mango sorbet in a cup.' },
    { id: 24, name: 'Mixed Berry Cup',       category: 'cups',     price: 139, oldPrice: 169, rating: 4.5, reviews: 143, emoji: '🍓', badge: 'New',          desc: 'Strawberry, blueberry & raspberry blend.' },
    { id: 25, name: 'Butterscotch Cup',      category: 'cups',     price: 119, oldPrice: null, rating: 4.6, reviews: 198, emoji: '🍮', badge: null,           desc: 'Classic butterscotch ice cream cup.' },
    // Sundaes
    { id: 26, name: 'Hot Fudge Sundae',      category: 'sundaes',  price: 249, oldPrice: 299, rating: 4.9, reviews: 312, emoji: '🍨', badge: 'Premium',      desc: 'Vanilla ice cream, hot fudge, nuts & cherry on top.' },
    { id: 27, name: 'Banana Split',          category: 'sundaes',  price: 279, oldPrice: 349, rating: 4.8, reviews: 267, emoji: '🍌', badge: 'Best Seller',  desc: 'Classic banana split with 3 scoops & toppings.' },
    { id: 28, name: 'Strawberry Sundae',     category: 'sundaes',  price: 229, oldPrice: 279, rating: 4.7, reviews: 189, emoji: '🍓', badge: null,            desc: 'Fresh strawberry sauce with vanilla ice cream.' },
    { id: 29, name: 'Rainbow Sundae',        category: 'sundaes',  price: 259, oldPrice: 299, rating: 4.8, reviews: 234, emoji: '🌈', badge: 'Popular',      desc: 'Colorful layered ice cream sundae with sprinkles.' },
    { id: 30, name: 'Caramel Walnut Sundae', category: 'sundaes',  price: 269, oldPrice: 319, rating: 4.9, reviews: 156, emoji: '🥜', badge: 'New',          desc: 'Caramel drizzle, candied walnuts & cream.' },
    { id: 31, name: 'Pineapple Delight',     category: 'classic',  price: 129, oldPrice: null, rating: 4.3, reviews: 98,  emoji: '🍍', badge: null,           desc: 'Tropical pineapple ice cream with coconut flakes.' },
    { id: 32, name: 'Coconut Bliss',         category: 'premium',  price: 159, oldPrice: 189, rating: 4.5, reviews: 134, emoji: '🥥', badge: null,            desc: 'Creamy coconut ice cream with toasted flakes.' },
    { id: 33, name: 'Rocky Road',            category: 'premium',  price: 169, oldPrice: 209, rating: 4.7, reviews: 178, emoji: '🍫', badge: 'Popular',      desc: 'Chocolate ice cream with marshmallows & almonds.' },
    { id: 34, name: 'Grape Fantasy',         category: 'classic',  price: 119, oldPrice: null, rating: 4.2, reviews: 87,  emoji: '🍇', badge: null,           desc: 'Sweet Concord grape ice cream.' },
    { id: 35, name: 'Kesar Pista Special',   category: 'premium',  price: 199, oldPrice: 249, rating: 4.9, reviews: 289, emoji: '🌼', badge: 'New',          desc: 'Premium saffron & pistachio ice cream.' },
];

// -----------------------------------------------
// GLOBAL STATE
// -----------------------------------------------
let cart    = JSON.parse(localStorage.getItem('iceworld_cart'))    || [];
let wishlist = JSON.parse(localStorage.getItem('iceworld_wishlist')) || [];
let isDarkMode = localStorage.getItem('iceworld_dark') === 'true';

// -----------------------------------------------
// UTILITY FUNCTIONS
// -----------------------------------------------
function saveCart()    { localStorage.setItem('iceworld_cart',    JSON.stringify(cart)); }
function saveWishlist(){ localStorage.setItem('iceworld_wishlist', JSON.stringify(wishlist)); }
function saveDarkMode(){ localStorage.setItem('iceworld_dark', isDarkMode); }

function formatPrice(p) { return '₹' + p; }

function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '<i class="fas fa-star star"></i>';
    if (half) html += '<i class="fas fa-star-half-alt star half"></i>';
    for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="far fa-star star"></i>';
    return html;
}

// -----------------------------------------------
// TOAST NOTIFICATIONS
// -----------------------------------------------
function showToast(message, icon = '🍦') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// -----------------------------------------------
// LOADING SCREEN
// -----------------------------------------------
function initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 800);
    });
}

// -----------------------------------------------
// DARK MODE
// -----------------------------------------------
function initDarkMode() {
    const body = document.body;
    if (isDarkMode) body.classList.add('dark-mode');

    document.querySelectorAll('.dark-toggle').forEach(btn => {
        btn.setAttribute('title', 'Toggle Dark Mode');
        btn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        btn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            body.classList.toggle('dark-mode', isDarkMode);
            document.querySelectorAll('.dark-toggle').forEach(b => {
                b.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
            saveDarkMode();
        });
    });
}

// -----------------------------------------------
// NAVBAR
// -----------------------------------------------
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!navbar) return;

    // Sticky scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Hamburger toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Highlight active link
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// -----------------------------------------------
// SCROLL TO TOP
// -----------------------------------------------
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// -----------------------------------------------
// ANIMATE ON SCROLL
// -----------------------------------------------
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

// -----------------------------------------------
// COUNTER ANIMATION
// -----------------------------------------------
function animateCounter(el, target, duration = 1800) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const update = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current) + (el.dataset.suffix || '');
            requestAnimationFrame(update);
        } else {
            el.textContent = target + (el.dataset.suffix || '');
        }
    };

    update();
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = true;
                animateCounter(entry.target, parseInt(entry.target.dataset.counter));
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// -----------------------------------------------
// HERO SLIDER
// -----------------------------------------------
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');

    if (!slides.length) return;

    let current = 0;
    let autoSlide;

    function goTo(index) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    function startAuto() {
        autoSlide = setInterval(() => goTo(current + 1), 4500);
    }

    function resetAuto() {
        clearInterval(autoSlide);
        startAuto();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    });

    startAuto();

    // Touch/swipe support
    let touchStartX = 0;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        hero.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goTo(diff > 0 ? current + 1 : current - 1);
                resetAuto();
            }
        }, { passive: true });
    }
}

// -----------------------------------------------
// PRODUCT CAROUSEL (Best Sellers)
// -----------------------------------------------
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');

    if (!track) return;

    let currentIndex = 0;
    const cardWidth = 296; // 280px + 16px gap
    const visibleCount = () => Math.floor(track.closest('.carousel-track-container').offsetWidth / cardWidth);
    const maxIndex = () => track.children.length - visibleCount();

    function updateCarousel() {
        const max = maxIndex();
        currentIndex = Math.max(0, Math.min(currentIndex, max));
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= max;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => { currentIndex--; updateCarousel(); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { currentIndex++; updateCarousel(); });
    }

    updateCarousel();

    // Auto scroll
    let autoCarousel = setInterval(() => {
        if (currentIndex >= maxIndex()) currentIndex = 0;
        else currentIndex++;
        updateCarousel();
    }, 3500);

    track.addEventListener('mouseenter', () => clearInterval(autoCarousel));
    track.addEventListener('mouseleave', () => {
        autoCarousel = setInterval(() => {
            if (currentIndex >= maxIndex()) currentIndex = 0;
            else currentIndex++;
            updateCarousel();
        }, 3500);
    });

    window.addEventListener('resize', updateCarousel);
}

// -----------------------------------------------
// CART SYSTEM
// -----------------------------------------------
function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.querySelectorAll('.cart-total-price').forEach(el => {
        el.textContent = formatPrice(total);
    });
}

function renderCartItems() {
    const container = document.querySelector('.cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <span class="empty-icon">🛒</span>
                <h4>Your cart is empty</h4>
                <p>Add some delicious ice creams!</p>
            </div>`;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-img">
                <span style="font-size:2.2rem">${item.emoji}</span>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-qty-controls">
                    <button class="qty-btn qty-dec" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn qty-inc" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" title="Remove">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    // Event delegation for qty and remove
    container.querySelectorAll('.qty-dec').forEach(btn => {
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), -1));
    });
    container.querySelectorAll('.qty-inc').forEach(btn => {
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), 1));
    });
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
    }

    saveCart();
    updateCartBadge();
    updateCartTotal();
    renderCartItems();
    showToast(`${product.name} added to cart!`, product.emoji);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    updateCartTotal();
    renderCartItems();
    showToast('Item removed from cart', '🗑️');
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartBadge();
    updateCartTotal();
    renderCartItems();
}

function initCart() {
    updateCartBadge();
    updateCartTotal();

    // Open / close cart sidebar
    document.querySelectorAll('.cart-open-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCart();
        });
    });

    const overlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-sidebar .cart-close');

    if (overlay) overlay.addEventListener('click', closeCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
}

function openCart() {
    const overlay = document.querySelector('.cart-overlay');
    const sidebar = document.querySelector('.cart-sidebar');
    if (!overlay || !sidebar) return;

    renderCartItems();
    updateCartTotal();
    overlay.classList.add('open');
    sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const overlay = document.querySelector('.cart-overlay');
    const sidebar = document.querySelector('.cart-sidebar');
    if (!overlay || !sidebar) return;

    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    document.body.style.overflow = '';
}

// -----------------------------------------------
// WISHLIST SYSTEM
// -----------------------------------------------
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = wishlist.findIndex(w => w.id === productId);
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showToast(`${product.name} removed from wishlist`, '💔');
    } else {
        wishlist.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji });
        showToast(`${product.name} added to wishlist!`, '❤️');
    }

    saveWishlist();
    updateWishlistBadge();
    updateWishlistButtons();
}

function updateWishlistBadge() {
    document.querySelectorAll('.wishlist-badge').forEach(badge => {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
}

function updateWishlistButtons() {
    document.querySelectorAll('[data-wish-id]').forEach(btn => {
        const id = parseInt(btn.dataset.wishId);
        btn.classList.toggle('active', wishlist.some(w => w.id === id));
    });
}

function initWishlist() {
    updateWishlistBadge();

    document.querySelectorAll('.wishlist-open-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openWishlist();
        });
    });

    const wishlistModal = document.querySelector('.wishlist-page');
    if (wishlistModal) {
        wishlistModal.addEventListener('click', (e) => {
            if (e.target === wishlistModal) closeWishlist();
        });

        const closeBtn = wishlistModal.querySelector('.wishlist-close');
        if (closeBtn) closeBtn.addEventListener('click', closeWishlist);
    }
}

function openWishlist() {
    const modal = document.querySelector('.wishlist-page');
    if (!modal) return;

    renderWishlistItems();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeWishlist() {
    const modal = document.querySelector('.wishlist-page');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function renderWishlistItems() {
    const container = document.querySelector('.wishlist-items');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `<div class="cart-empty"><span class="empty-icon">❤️</span><h4>Your wishlist is empty</h4><p>Save your favorites!</p></div>`;
        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <span class="wishlist-item-emoji">${item.emoji}</span>
            <div>
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">${formatPrice(item.price)}</div>
            </div>
            <button class="wishlist-item-remove" data-id="${item.id}" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    container.querySelectorAll('.wishlist-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleWishlist(parseInt(btn.dataset.id));
            renderWishlistItems();
        });
    });
}

// -----------------------------------------------
// PRODUCT CARD GENERATOR
// -----------------------------------------------
function createProductCard(product) {
    const isWishlisted = wishlist.some(w => w.id === product.id);
    const priceHTML = product.oldPrice
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>${formatPrice(product.price)}`
        : formatPrice(product.price);

    return `
        <div class="product-card animate-on-scroll" data-product-id="${product.id}" data-category="${product.category}">
            <div class="product-img-wrap">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-wish-btn ${isWishlisted ? 'active' : ''}" data-wish-id="${product.id}" title="Wishlist">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <span class="product-emoji">${product.emoji}</span>
                <div class="product-overlay">
                    <button class="quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-desc">${product.desc}</p>
                <div class="product-stars">
                    ${generateStars(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">${priceHTML}</div>
                    <button class="add-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getCategoryLabel(cat) {
    const labels = {
        classic: 'Classic Flavor',
        premium: 'Premium',
        cones: 'Ice Cream Cone',
        cups: 'Ice Cream Cup',
        sundaes: 'Sundae'
    };
    return labels[cat] || cat;
}

function bindCardEvents(container) {
    container.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add';
            }, 1500);
        });
    });

    container.querySelectorAll('.product-wish-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.wishId);
            toggleWishlist(id);
            const isWishlisted = wishlist.some(w => w.id === id);
            btn.classList.toggle('active', isWishlisted);
            btn.innerHTML = `<i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>`;
        });
    });

    container.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = products.find(p => p.id === parseInt(btn.dataset.id));
            if (product) showQuickView(product);
        });
    });
}

// -----------------------------------------------
// QUICK VIEW MODAL
// -----------------------------------------------
function showQuickView(product) {
    const existing = document.getElementById('quick-view-modal');
    if (existing) existing.remove();

    const priceHTML = product.oldPrice
        ? `<span class="old-price">${formatPrice(product.oldPrice)}</span> ${formatPrice(product.price)}`
        : formatPrice(product.price);

    const modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:9000;
        display:flex; align-items:center; justify-content:center;
        padding:1rem; backdrop-filter:blur(6px);
        animation: fadeInUp 0.3s ease;
    `;
    modal.innerHTML = `
        <div style="
            background:var(--white); border-radius:var(--border-radius);
            padding:2.5rem; max-width:480px; width:100%;
            position:relative; box-shadow:var(--shadow-hover);
            animation: scaleIn 0.3s ease;
        ">
            <button id="qv-close" style="
                position:absolute; top:1rem; right:1rem;
                width:36px; height:36px; background:var(--bg-light);
                border-radius:50%; cursor:pointer; font-size:1.1rem;
                color:var(--text-dark); display:flex; align-items:center;
                justify-content:center; border:none; transition:var(--transition);
            ">✕</button>
            <div style="text-align:center; margin-bottom:1.5rem;">
                <div style="font-size:7rem; line-height:1; margin-bottom:1rem;">${product.emoji}</div>
                <span style="
                    background:rgba(255,126,179,0.12); color:var(--primary);
                    font-size:0.78rem; font-weight:700; padding:4px 14px;
                    border-radius:50px; text-transform:uppercase; letter-spacing:1.5px;
                ">${getCategoryLabel(product.category)}</span>
            </div>
            <h3 style="font-size:1.6rem; margin-bottom:0.5rem; color:var(--text-dark);">${product.name}</h3>
            <div style="display:flex; gap:4px; margin-bottom:0.8rem;">
                ${generateStars(product.rating)}
                <span style="color:var(--text-muted); font-size:0.8rem; margin-left:4px;">(${product.reviews} reviews)</span>
            </div>
            <p style="color:var(--text-muted); font-size:0.92rem; line-height:1.7; margin-bottom:1.3rem;">${product.desc}</p>
            <div style="font-size:1.6rem; font-weight:700; color:var(--secondary); margin-bottom:1.5rem; font-family:var(--font-heading);">
                ${priceHTML}
            </div>
            <div style="display:flex; gap:1rem;">
                <button id="qv-cart" style="
                    flex:1; padding:13px; background:var(--gradient-primary);
                    color:white; border-radius:50px; font-size:0.95rem;
                    font-weight:700; cursor:pointer; border:none; display:flex;
                    align-items:center; justify-content:center; gap:8px;
                    transition:var(--transition);
                "><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                <button id="qv-wish" style="
                    width:50px; height:50px; background:var(--bg-light);
                    border:1.5px solid var(--glass-border); border-radius:50%;
                    font-size:1.2rem; cursor:pointer; display:flex;
                    align-items:center; justify-content:center; transition:var(--transition);
                    color:${wishlist.some(w => w.id === product.id) ? '#ff4d6d' : 'var(--text-muted)'};
                "><i class="${wishlist.some(w => w.id === product.id) ? 'fas' : 'far'} fa-heart"></i></button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#qv-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    modal.querySelector('#qv-cart').addEventListener('click', () => {
        addToCart(product.id);
        modal.remove();
    });

    modal.querySelector('#qv-wish').addEventListener('click', () => {
        toggleWishlist(product.id);
        modal.remove();
    });
}

// -----------------------------------------------
// SEARCH (NAVBAR)
// -----------------------------------------------
function initNavSearch() {
    const searchInput = document.querySelector('.nav-search input');
    const searchBtn = document.querySelector('.nav-search button');
    const navSearch = document.querySelector('.nav-search');
    if (!searchInput || !navSearch) return;

    // Create results dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    navSearch.style.position = 'relative';
    navSearch.appendChild(dropdown);

    function doSearch(q) {
        if (!q.trim()) {
            dropdown.classList.remove('open');
            dropdown.innerHTML = '';
            return;
        }

        const results = products.filter(p =>
            p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.desc.toLowerCase().includes(q.toLowerCase()) ||
            getCategoryLabel(p.category).toLowerCase().includes(q.toLowerCase())
        ).slice(0, 8);

        if (!results.length) {
            dropdown.innerHTML = '<p style="padding:1rem; color:var(--text-muted); font-size:0.88rem;">No results found</p>';
        } else {
            dropdown.innerHTML = results.map(p => `
                <div class="search-result-item" data-id="${p.id}">
                    <span class="search-result-emoji">${p.emoji}</span>
                    <span class="search-result-name">${p.name}</span>
                    <span class="search-result-price">${formatPrice(p.price)}</span>
                </div>
            `).join('');

            dropdown.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const product = products.find(p => p.id === parseInt(item.dataset.id));
                    if (product) showQuickView(product);
                    dropdown.classList.remove('open');
                    searchInput.value = '';
                });
            });
        }

        dropdown.classList.add('open');
    }

    searchInput.addEventListener('input', (e) => doSearch(e.target.value));

    if (searchBtn) {
        searchBtn.addEventListener('click', () => doSearch(searchInput.value));
    }

    document.addEventListener('click', (e) => {
        if (!navSearch.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

// -----------------------------------------------
// HOME PAGE – RENDER BEST SELLERS
// -----------------------------------------------
function initBestSellers() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const bestSellers = products.filter(p => p.badge === 'Best Seller' || p.badge === 'Popular').slice(0, 8);
    if (!bestSellers.length) return;

    track.innerHTML = bestSellers.map(p => createProductCard(p)).join('');
    bindCardEvents(track);
    initScrollAnimations();
}

// -----------------------------------------------
// HOME PAGE – RENDER POPULAR PRODUCTS (GRID)
// -----------------------------------------------
function initPopularProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    let currentCategory = 'all';

    function renderGrid(category) {
        const filtered = category === 'all'
            ? products.slice(0, 12)
            : products.filter(p => p.category === category).slice(0, 12);

        grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
        bindCardEvents(grid);
        initScrollAnimations();
    }

    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderGrid(currentCategory);
        });
    });

    renderGrid('all');
}

// -----------------------------------------------
// MENU PAGE
// -----------------------------------------------
function initMenuPage() {
    const menuGrids = document.querySelectorAll('.menu-grid');
    if (!menuGrids.length) return;

    function renderAllMenuGrids(filterCategory = 'all', searchQuery = '', sortBy = 'default') {
        // The categories array must match the order of .menu-grid elements in the DOM
        const categories = ['classic', 'premium', 'cones', 'cups', 'sundaes'];
        const categoriesToShow = filterCategory === 'all' ? categories : [filterCategory];

        menuGrids.forEach((grid, i) => {
            const cat = categories[i]; // always resolve category by grid position
            if (!cat) return;

            const section = grid.closest('.menu-category-section');

            if (!categoriesToShow.includes(cat)) {
                // Hide sections not in current filter
                if (section) section.style.display = 'none';
                return;
            }

            if (section) section.style.display = '';

            let filtered = products.filter(p => {
                const matchCat = p.category === cat;
                const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchCat && matchSearch;
            });

            if (sortBy === 'price-asc')   filtered.sort((a, b) => a.price - b.price);
            if (sortBy === 'price-desc')  filtered.sort((a, b) => b.price - a.price);
            if (sortBy === 'popular')     filtered.sort((a, b) => b.reviews - a.reviews);
            if (sortBy === 'rating')      filtered.sort((a, b) => b.rating - a.rating);

            if (!filtered.length) {
                grid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center; padding:2rem;">No products found</p>';
            } else {
                grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
                bindCardEvents(grid);
            }
        });

        initScrollAnimations();
    }

    // Full re-render: all 5 grids by category
    function renderMenuFull() {
        const categories = ['classic', 'premium', 'cones', 'cups', 'sundaes'];
        menuGrids.forEach((grid, i) => {
            const cat = categories[i];
            if (!cat) return;
            const filtered = products.filter(p => p.category === cat);
            grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
            bindCardEvents(grid);
        });
        initScrollAnimations();
    }

    renderMenuFull();

    // Search
    const menuSearch = document.querySelector('.menu-search input');
    if (menuSearch) {
        menuSearch.addEventListener('input', () => {
            const q = menuSearch.value;
            const cat = document.querySelector('.category-nav-item.active')?.dataset.category || 'all';
            const sort = document.querySelector('#sort-select')?.value || 'default';
            renderAllMenuGrids(cat, q, sort);
        });
    }

    // Category nav
    document.querySelectorAll('.category-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Sync select dropdown
            const catSelect = document.querySelector('#cat-select');
            if (catSelect) catSelect.value = item.dataset.category;
            const q = document.querySelector('.menu-search input')?.value || '';
            const sort = document.querySelector('#sort-select')?.value || 'default';
            renderAllMenuGrids(item.dataset.category, q, sort);

            // Scroll to first section
            const firstGrid = document.querySelector('.menu-category-section:not([style*="none"])');
            if (firstGrid) firstGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Sort
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const cat = document.querySelector('.category-nav-item.active')?.dataset.category || 'all';
            const q = document.querySelector('.menu-search input')?.value || '';
            renderAllMenuGrids(cat, q, sortSelect.value);
        });
    }

    // Category select dropdown sync
    const catSelect = document.querySelector('#cat-select');
    if (catSelect) {
        catSelect.addEventListener('change', () => {
            const cat = catSelect.value;
            // Sync category nav
            document.querySelectorAll('.category-nav-item').forEach(i => {
                i.classList.toggle('active', i.dataset.category === cat);
            });
            const q = document.querySelector('.menu-search input')?.value || '';
            const sort = document.querySelector('#sort-select')?.value || 'default';
            renderAllMenuGrids(cat, q, sort);
        });
    }
}

// -----------------------------------------------
// FORM VALIDATION
// -----------------------------------------------
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[+\d\s\-()]{7,15}$/.test(phone);
}

function setFieldState(field, isValid, message = '') {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.toggle('error', !isValid);
    group.classList.toggle('success', isValid);
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = message;
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameField = form.querySelector('[name="name"]');
        const emailField = form.querySelector('[name="email"]');
        const phoneField = form.querySelector('[name="phone"]');
        const messageField = form.querySelector('[name="message"]');

        if (nameField && nameField.value.trim().length < 2) {
            setFieldState(nameField, false, 'Please enter your full name (min 2 characters)');
            isValid = false;
        } else if (nameField) {
            setFieldState(nameField, true);
        }

        if (emailField && !validateEmail(emailField.value)) {
            setFieldState(emailField, false, 'Please enter a valid email address');
            isValid = false;
        } else if (emailField) {
            setFieldState(emailField, true);
        }

        if (phoneField && phoneField.value && !validatePhone(phoneField.value)) {
            setFieldState(phoneField, false, 'Please enter a valid phone number');
            isValid = false;
        } else if (phoneField) {
            setFieldState(phoneField, true);
        }

        if (messageField && messageField.value.trim().length < 10) {
            setFieldState(messageField, false, 'Please enter a message (min 10 characters)');
            isValid = false;
        } else if (messageField) {
            setFieldState(messageField, true);
        }

        if (isValid) {
            showToast('Message sent successfully! 🎉', '✅');
            form.reset();
            form.querySelectorAll('.form-group').forEach(g => {
                g.classList.remove('success', 'error');
            });
        }
    });

    // Live validation
    form.querySelectorAll('.form-control').forEach(field => {
        field.addEventListener('blur', () => {
            const name = field.getAttribute('name');
            if (name === 'name' && field.value.trim().length < 2) {
                setFieldState(field, false, 'Name must be at least 2 characters');
            } else if (name === 'email' && !validateEmail(field.value)) {
                setFieldState(field, false, 'Invalid email format');
            } else if (name === 'phone' && field.value && !validatePhone(field.value)) {
                setFieldState(field, false, 'Invalid phone number');
            } else if (name === 'message' && field.value.trim().length < 10) {
                setFieldState(field, false, 'Message is too short');
            } else {
                setFieldState(field, true);
            }
        });
    });
}

// Newsletter form
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !validateEmail(input.value)) {
            showToast('Please enter a valid email!', '⚠️');
            return;
        }
        showToast('Subscribed successfully! 🎉', '🍦');
        input.value = '';
    });
}

// -----------------------------------------------
// SMOOTH SCROLL FOR ANCHOR LINKS
// -----------------------------------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// -----------------------------------------------
// PAGE TRANSITION
// -----------------------------------------------
function initPageTransition() {
    const curtain = document.createElement('div');
    curtain.className = 'page-transition';
    document.body.appendChild(curtain);

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                curtain.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        }
    });
}

// -----------------------------------------------
// MAIN INIT
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initDarkMode();
    initNavbar();
    initScrollTop();
    initScrollAnimations();
    initCounters();
    initCart();
    initWishlist();
    initNavSearch();
    initSmoothScroll();
    initNewsletter();
    initContactForm();
    initPageTransition();

    // Page-specific
    if (document.querySelector('.hero')) {
        initHeroSlider();
        initBestSellers();
        initPopularProducts();
        initCarousel();
    }

    if (document.querySelector('.menu-grid')) {
        initMenuPage();
    }

    // Wishlist buttons state
    updateWishlistButtons();
});
