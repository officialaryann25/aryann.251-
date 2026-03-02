/**
 * Bloom Haven – script.js
 * Luxury Floral Shop | Interactive Features
 * Handles: Loader, Navbar, Cart, Modal, Testimonials, Order Form, Scroll Animations
 */

/* ================================================================
   PRODUCTS DATA
   ================================================================ */
const products = [
  {
    id: 1,
    name: 'Romantic Roses',
    price: 3500,
    img: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=500&auto=format&fit=crop&q=80',
    description:
      'A classic arrangement of velvety red roses, perfect for expressing deep love and affection. Handcrafted with the freshest blooms.',
  },
  {
    id: 2,
    name: 'Spring Blossom',
    price: 2800,
    img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc8f?w=500&auto=format&fit=crop&q=80',
    description:
      'A vibrant mix of seasonal spring flowers bursting with colour and fragrance. Ideal for celebrations and gifting.',
  },
  {
    id: 3,
    name: 'White Elegance',
    price: 4200,
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
    description:
      'Pure white blooms arranged in a sophisticated style for weddings, anniversaries, and formal occasions.',
  },
  {
    id: 4,
    name: 'Pastel Dream',
    price: 3900,
    img: 'https://images.unsplash.com/photo-1471943038886-d71e89cb8a8c?w=500&auto=format&fit=crop&q=80',
    description:
      'A dreamy pastel bouquet with soft pinks, lilacs, and creams — the perfect romantic gift for someone special.',
  },
  {
    id: 5,
    name: 'Classic Love',
    price: 2500,
    img: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500&auto=format&fit=crop&q=80',
    description:
      'Timeless mixed flowers in warm tones that speak the universal language of love and appreciation.',
  },
  {
    id: 6,
    name: 'Royal Garden',
    price: 5000,
    img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&auto=format&fit=crop&q=80',
    description:
      'A grand, lush arrangement inspired by English gardens. Premium blooms for premium moments.',
  },
];

/* ================================================================
   CART STATE (backed by localStorage)
   ================================================================ */
let cart = JSON.parse(localStorage.getItem('bloomHavenCart') || '[]');

/** Persist cart to localStorage */
function saveCart() {
  localStorage.setItem('bloomHavenCart', JSON.stringify(cart));
}

/** Return total item count in cart */
function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Return total price */
function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ================================================================
   PAGE LOADER
   ================================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Minimum 800ms so the animation is visible
  setTimeout(() => {
    loader.classList.add('hidden');
    // Remove from DOM after fade-out so it doesn't interfere
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 800);
});

/* ================================================================
   NAVBAR – sticky + scroll behaviour
   ================================================================ */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Scroll-to-top button visibility
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================================
   HAMBURGER MENU
   ================================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ================================================================
   SMOOTH SCROLL for anchor links (fallback for older browsers)
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ================================================================
   SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ================================================================ */
(function initScrollAnimations() {
  // Trigger hero elements immediately on load
  document.querySelectorAll('.hero .fade-in-up, .hero .fade-in-right').forEach((el) => {
    el.classList.add('animated');
  });

  const animatedEls = document.querySelectorAll(
    '.fade-in-up:not(.hero *), .fade-in-left, .fade-in-right:not(.hero *)'
  );

  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach((el) => observer.observe(el));
})();

/* ================================================================
   CATALOG – render product cards
   ================================================================ */
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (p) => `
    <article class="product-card fade-in-up" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name} bouquet" loading="lazy" />
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">₹${p.price.toLocaleString('en-IN')}</p>
        <div class="product-actions">
          <button class="btn btn-primary ripple add-to-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i> Add to Cart
          </button>
          <button class="btn btn-sm-outline ripple view-details-btn" data-id="${p.id}" aria-label="View details for ${p.name}">
            <i class="fa-solid fa-eye" aria-hidden="true"></i> Details
          </button>
        </div>
      </div>
    </article>`
    )
    .join('');

  // Re-observe newly added cards for scroll animations
  const newCards = grid.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  newCards.forEach((card) => observer.observe(card));

  // Event delegation for catalog buttons
  grid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart-btn');
    const detailBtn = e.target.closest('.view-details-btn');

    if (addBtn) {
      const productId = parseInt(addBtn.dataset.id, 10);
      addToCart(productId, 1);
    }

    if (detailBtn) {
      const productId = parseInt(detailBtn.dataset.id, 10);
      openModal(productId);
    }
  });
}

renderCatalog();

/* ================================================================
   CART LOGIC
   ================================================================ */
/** Add a product to the cart */
function addToCart(productId, qty = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, img: product.img, qty });
  }

  saveCart();
  updateCartUI();
  showToast(`🌸 "${product.name}" added to cart!`);
}

/** Update cart badge, items list, and total */
function updateCartUI() {
  // Badge
  const badge = document.getElementById('cartBadge');
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count === 0 ? 'none' : 'flex';

  // Items list
  const cartItemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>
        <p>Your cart is empty</p>
        <p>Add some beautiful bouquets!</p>
      </div>`;
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="cart-qty-minus" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">−</button>
            <span aria-label="Quantity: ${item.qty}">${item.qty}</span>
            <button class="cart-qty-plus" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
          </div>
          <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
            <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
          </button>
        </div>
      </div>`
      )
      .join('');
  }

  // Total
  document.getElementById('cartTotal').textContent =
    '₹' + cartTotal().toLocaleString('en-IN');
}

// Cart sidebar open/close
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  cartSidebar.setAttribute('aria-hidden', 'false');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  cartSidebar.setAttribute('aria-hidden', 'true');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Cart item interactions (event delegation)
document.getElementById('cartItems').addEventListener('click', (e) => {
  const minusBtn = e.target.closest('.cart-qty-minus');
  const plusBtn = e.target.closest('.cart-qty-plus');
  const removeBtn = e.target.closest('.remove-item');

  if (minusBtn) {
    const id = parseInt(minusBtn.dataset.id, 10);
    const item = cart.find((i) => i.id === id);
    if (item && item.qty > 1) {
      item.qty -= 1;
    } else if (item) {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart();
    updateCartUI();
  }

  if (plusBtn) {
    const id = parseInt(plusBtn.dataset.id, 10);
    const item = cart.find((i) => i.id === id);
    if (item) item.qty += 1;
    saveCart();
    updateCartUI();
  }

  if (removeBtn) {
    const id = parseInt(removeBtn.dataset.id, 10);
    cart = cart.filter((i) => i.id !== id);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart.');
  }
});

// Checkout button (demo)
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  closeCart();
  showToast('Redirecting to checkout… 🛍️');
});

// Initial UI sync (e.g. after page reload with saved cart)
updateCartUI();

/* ================================================================
   PRODUCT MODAL
   ================================================================ */
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
let currentModalProduct = null;
let currentQty = 1;

function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  currentQty = 1;

  document.getElementById('modalImg').src = product.img;
  document.getElementById('modalImg').alt = product.name + ' bouquet';
  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalPrice').textContent =
    '₹' + product.price.toLocaleString('en-IN');
  document.getElementById('modalDesc').textContent = product.description;
  document.getElementById('qtyValue').textContent = currentQty;

  modal.classList.add('open');
  modalOverlay.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('closeModal').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modalOverlay.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

document.getElementById('closeModal').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Keyboard close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('open')) closeModal();
    if (cartSidebar.classList.contains('open')) closeCart();
    if (document.getElementById('successPopup').classList.contains('open')) closeSuccess();
  }
});

// Quantity selector inside modal
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (currentQty > 1) currentQty -= 1;
  document.getElementById('qtyValue').textContent = currentQty;
});

document.getElementById('qtyPlus').addEventListener('click', () => {
  currentQty += 1;
  document.getElementById('qtyValue').textContent = currentQty;
});

// Add to cart from modal
document.getElementById('modalAddToCart').addEventListener('click', () => {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id, currentQty);
    closeModal();
  }
});

/* ================================================================
   TESTIMONIAL SLIDER
   ================================================================ */
(function initSlider() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.dot');
  const total = dots.length;
  let currentIndex = 0;
  let autoSlideTimer;

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-selected', String(i === currentIndex));
    });
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  document.getElementById('prevBtn').addEventListener('click', () => {
    stopAutoSlide();
    goTo(currentIndex - 1);
    startAutoSlide();
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    stopAutoSlide();
    goTo(currentIndex + 1);
    startAutoSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goTo(parseInt(dot.dataset.index, 10));
      startAutoSlide();
    });
  });

  // Pause auto-slide on hover
  track.parentElement.addEventListener('mouseenter', stopAutoSlide);
  track.parentElement.addEventListener('mouseleave', startAutoSlide);

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoSlide();
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? currentIndex + 1 : currentIndex - 1);
    startAutoSlide();
  }, { passive: true });

  startAutoSlide();
})();

/* ================================================================
   ORDER FORM – Validation & Submission
   ================================================================ */
(function initOrderForm() {
  const form = document.getElementById('orderForm');

  /**
   * Validate a single field.
   * Returns true if valid, false otherwise, and sets error message.
   */
  function validateField(field) {
    const errorEl = document.getElementById(field.id + 'Error');
    let message = '';

    if (field.required && !field.value.trim()) {
      message = 'This field is required.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        message = 'Please enter a valid email address.';
      }
    } else if (field.type === 'tel' && field.value.trim()) {
      const phonePattern = /^[0-9+\-\s()]{7,15}$/;
      if (!phonePattern.test(field.value.trim())) {
        message = 'Please enter a valid phone number.';
      }
    } else if (field.type === 'date' && field.value) {
      const selected = new Date(field.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        message = 'Delivery date must be today or in the future.';
      }
    }

    if (errorEl) errorEl.textContent = message;
    field.classList.toggle('error-field', !!message);
    return !message;
  }

  // Live validation on blur
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error-field')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const fieldsToValidate = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    fieldsToValidate.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error-field');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show success
    form.reset();
    // Clear all error messages after reset
    form.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
    openSuccess();
  });
})();

/* ================================================================
   SUCCESS POPUP
   ================================================================ */
function openSuccess() {
  const popup = document.getElementById('successPopup');
  const overlay = document.getElementById('successOverlay');
  popup.classList.add('open');
  overlay.classList.add('active');
  popup.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSuccess() {
  const popup = document.getElementById('successPopup');
  const overlay = document.getElementById('successOverlay');
  popup.classList.remove('open');
  overlay.classList.remove('active');
  popup.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('closeSuccess').addEventListener('click', closeSuccess);
document.getElementById('successOverlay').addEventListener('click', closeSuccess);

/* ================================================================
   TOAST NOTIFICATION
   ================================================================ */
let toastTimer;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ================================================================
   FOOTER – Dynamic year
   ================================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================================================================
   RIPPLE EFFECT (enhanced via JS for dynamic buttons)
   ================================================================ */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;

  const rippleEl = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  Object.assign(rippleEl.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.35)',
    left: `${x}px`,
    top: `${y}px`,
    transform: 'scale(0)',
    animation: 'rippleAnim 0.55s linear',
    pointerEvents: 'none',
  });

  // Inject keyframes once
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent =
      '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
    document.head.appendChild(style);
  }

  btn.appendChild(rippleEl);
  rippleEl.addEventListener('animationend', () => rippleEl.remove(), { once: true });
});
