/* ===========================
   PRODUCTS DATA
   =========================== */
const products = [
  {
    id: 1,
    name: "Strawberry Dream",
    desc: "Fresh strawberries blended into velvety soft-serve with a raspberry swirl.",
    price: 299,
    oldPrice: 349,
    emoji: "🍓",
    tag: "bestseller",
    tagLabel: "Best Seller",
    rating: 5,
    reviews: 128,
    category: "fruity",
  },
  {
    id: 2,
    name: "Choco Fudge Royale",
    desc: "Belgian dark chocolate swirled with salted caramel fudge pieces.",
    price: 349,
    oldPrice: null,
    emoji: "🍫",
    tag: "popular",
    tagLabel: "Popular",
    rating: 5,
    reviews: 96,
    category: "chocolate",
  },
  {
    id: 3,
    name: "Mango Tango Sorbet",
    desc: "Sun-ripened Alphonso mangoes churned into a refreshing dairy-free sorbet.",
    price: 279,
    oldPrice: 319,
    emoji: "🥭",
    tag: "new",
    tagLabel: "New",
    rating: 4,
    reviews: 42,
    category: "fruity",
  },
  {
    id: 4,
    name: "Mint Glacier",
    desc: "Cool mint ice-cream with real chocolate chunks for that satisfying crunch.",
    price: 329,
    oldPrice: null,
    emoji: "🌿",
    tag: "seasonal",
    tagLabel: "Seasonal",
    rating: 4,
    reviews: 67,
    category: "classic",
  },
  {
    id: 5,
    name: "Pistachio Bliss",
    desc: "Authentic Iranian pistachios ground into a silky, aromatic frozen dessert.",
    price: 399,
    oldPrice: 449,
    emoji: "🌰",
    tag: "bestseller",
    tagLabel: "Best Seller",
    rating: 5,
    reviews: 113,
    category: "nuts",
  },
  {
    id: 6,
    name: "Vanilla Cloud",
    desc: "Madagascar bourbon vanilla in a light, airy soft-serve with honey drizzle.",
    price: 249,
    oldPrice: null,
    emoji: "🍦",
    tag: "classic",
    tagLabel: "Classic",
    rating: 4,
    reviews: 88,
    category: "classic",
  },
  {
    id: 7,
    name: "Blueberry Cheesecake",
    desc: "Creamy New York cheesecake base topped with blueberry compote swirl.",
    price: 379,
    oldPrice: 419,
    emoji: "🫐",
    tag: "new",
    tagLabel: "New",
    rating: 5,
    reviews: 31,
    category: "fruity",
  },
  {
    id: 8,
    name: "Butterscotch Galaxy",
    desc: "Rich butterscotch with caramelised biscuit crumbles and a toffee core.",
    price: 319,
    oldPrice: null,
    emoji: "🍬",
    tag: "popular",
    tagLabel: "Popular",
    rating: 4,
    reviews: 74,
    category: "classic",
  },
];

/* ===========================
   CART MODULE
   =========================== */
const Cart = (() => {
  const STORAGE_KEY = "icecream_cart";

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function getCount() {
    return getItems().reduce((sum, item) => sum + item.qty, 0);
  }

  function addItem(product) {
    const items = getItems();
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx > -1) {
      items[idx].qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    saveItems(items);
    return items;
  }

  function removeItem(id) {
    const items = getItems().filter((i) => i.id !== id);
    saveItems(items);
    return items;
  }

  function updateQty(id, delta) {
    const items = getItems();
    const idx = items.findIndex((i) => i.id === id);
    if (idx > -1) {
      items[idx].qty = Math.max(0, items[idx].qty + delta);
      if (items[idx].qty === 0) items.splice(idx, 1);
    }
    saveItems(items);
    return items;
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getSubtotal() {
    return getItems().reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  return { getItems, getCount, addItem, removeItem, updateQty, clear, getSubtotal };
})();

/* ===========================
   AUTH MODULE
   =========================== */
const Auth = (() => {
  const STORAGE_KEY = "icecream_user";

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function login(email, password) {
    // Simulated authentication — accepts any valid email/password pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;
    if (!emailRegex.test(email) || !passwordRegex.test(password)) return false;
    const user = { email, name: email.split("@")[0] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function isLoggedIn() {
    return !!getUser();
  }

  return { getUser, login, logout, isLoggedIn };
})();

/* ===========================
   TOAST UTILITY
   =========================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " toast--error" : ""}`;
  toast.innerHTML = `<i class="${
    type === "success"
      ? "ri-checkbox-circle-fill"
      : "ri-error-warning-fill"
  }"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3100);
}

/* ===========================
   CART COUNTER UPDATER
   =========================== */
function updateCartCounter() {
  const counters = document.querySelectorAll(".cart__counter");
  const count = Cart.getCount();
  counters.forEach((el) => {
    el.textContent = count;
    el.style.display = count === 0 ? "none" : "flex";
    el.classList.remove("bump");
    void el.offsetWidth; // reflow to re-trigger animation
    el.classList.add("bump");
  });
}

/* ===========================
   CART DRAWER
   =========================== */
function renderCartDrawer() {
  const itemsContainer = document.getElementById("cart-items");
  if (!itemsContainer) return;

  const items = Cart.getItems();
  const subtotal = Cart.getSubtotal();
  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal + delivery;

  // Render items
  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🍦</div>
        <p>Your cart is empty.</p>
        <p style="margin-top:0.5rem;font-size:0.8rem;">Add some delicious scoops!</p>
      </div>`;
  } else {
    itemsContainer.innerHTML = items
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__emoji">${item.emoji}</div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">₹${(item.price * item.qty).toLocaleString()}</div>
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="cart-item__qty-num">${item.qty}</span>
            <button class="cart-item__qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item__remove" onclick="removeCartItem(${item.id})" title="Remove">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>`
      )
      .join("");
  }

  // Update totals
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const totalEl = document.getElementById("cart-total");
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
  if (deliveryEl) deliveryEl.textContent = subtotal > 0 ? `₹${delivery}` : "Free";
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
}

function openCart() {
  renderCartDrawer();
  document.getElementById("cart-drawer")?.classList.add("open");
  document.getElementById("cart-overlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-drawer")?.classList.remove("open");
  document.getElementById("cart-overlay")?.classList.remove("open");
  document.body.style.overflow = "";
}

function changeQty(id, delta) {
  Cart.updateQty(id, delta);
  renderCartDrawer();
  updateCartCounter();
}

function removeCartItem(id) {
  Cart.removeItem(id);
  renderCartDrawer();
  updateCartCounter();
  showToast("Item removed from cart.", "error");
}

/* ===========================
   ADD TO CART ACTION
   =========================== */
function addToCart(product) {
  Cart.addItem(product);
  updateCartCounter();
  showToast(`${product.name} added to cart! 🍦`);
}

/* ===========================
   CHECKOUT FLOW
   =========================== */
function openCheckout() {
  if (!Auth.isLoggedIn()) {
    showToast("Please login to checkout.", "error");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }
  closeCart();
  const overlay = document.getElementById("checkout-modal");
  if (overlay) {
    overlay.classList.add("open");
  }
}

function closeCheckout() {
  document.getElementById("checkout-modal")?.classList.remove("open");
}

function placeOrder() {
  Cart.clear();
  updateCartCounter();
  closeCheckout();
  showToast("Order placed! Thank you for your purchase. 🎉");
}

/* ===========================
   AUTH NAVBAR STATE
   =========================== */
function updateNavAuth() {
  const navBtns = document.querySelectorAll(".nav__btns");
  navBtns.forEach((container) => {
    const cartBtn = container.querySelector(".nav__cart");
    if (Auth.isLoggedIn()) {
      const user = Auth.getUser();
      const existingProfile = container.querySelector(".profile-menu");
      if (!existingProfile) {
        const loginBtn = container.querySelector(".btn--primary, .login-nav-btn");
        if (loginBtn) loginBtn.remove();

        const profileMenu = document.createElement("div");
        profileMenu.className = "profile-menu";
        profileMenu.innerHTML = `
          <button class="profile-menu__trigger">
            👤 ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            <i class="ri-arrow-down-s-line"></i>
          </button>
          <div class="profile-menu__dropdown">
            <div class="profile-menu__item"><i class="ri-user-line"></i> Profile</div>
            <div class="profile-menu__item"><i class="ri-shopping-bag-line"></i> Orders</div>
            <div class="profile-menu__item profile-menu__item--danger" onclick="logout()">
              <i class="ri-logout-box-r-line"></i> Logout
            </div>
          </div>`;
        const insertRef = container.querySelector(".nav__cart") || container.querySelector(".nav__menu-btn");
        if (insertRef) {
          container.insertBefore(profileMenu, insertRef);
        } else {
          container.appendChild(profileMenu);
        }
      }
    }
  });
}

function logout() {
  Auth.logout();
  showToast("Logged out successfully.");
  setTimeout(() => location.reload(), 1000);
}

/* ===========================
   MOBILE NAVIGATION
   =========================== */
function initNav() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  if (!menuBtn || !navLinks) return;

  const icon = menuBtn.querySelector("i");
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    icon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
  });

  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    icon.className = "ri-menu-3-line";
  });

  // Sticky nav scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Active link highlighting
  const links = navLinks.querySelectorAll("a");
  const currentPage = location.pathname.split("/").pop() || "index.html";
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ===========================
   ANIMATED COUNTER
   =========================== */
function animateCounter(el, target, duration = 2000, suffix = "") {
  const startTime = performance.now();
  const startVal = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(startVal + eased * (target - startVal));
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || "";
          animateCounter(el, target, 2000, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ===========================
   PRODUCT CARD RENDERER
   =========================== */
function createProductCard(product) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < Math.floor(product.rating) ? "ri-star-fill" : "ri-star-line"}"></i>`
  ).join("");

  return `
    <div class="product__card" data-category="${product.category}" data-aos="fade-up">
      <div class="product__card-image">
        <span class="product__tag product__tag--${product.tag}">${product.tagLabel}</span>
        <div class="product__card-emoji">${product.emoji}</div>
      </div>
      <div class="product__card-body">
        <h3 class="product__card-name">${product.name}</h3>
        <p class="product__card-desc">${product.desc}</p>
        <div class="product__rating">
          ${stars}
          <span>(${product.reviews})</span>
        </div>
        <div class="product__card-footer">
          <div>
            <span class="product__price">₹${product.price}</span>
            ${product.oldPrice ? `<span class="product__price-old">₹${product.oldPrice}</span>` : ""}
          </div>
          <button class="btn--add-cart" onclick='addToCart(${JSON.stringify(product)})'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>`;
}

/* ===========================
   SCROLL REVEAL (ScrollReveal.js)
   =========================== */
function initScrollReveal() {
  if (typeof ScrollReveal === "undefined") return;

  const opts = { distance: "50px", origin: "bottom", duration: 1000 };

  ScrollReveal().reveal(".hero__content h1", { ...opts, delay: 200 });
  ScrollReveal().reveal(".hero__content .hero__tag", { ...opts, delay: 100 });
  ScrollReveal().reveal(".hero__content .hero__description", { ...opts, delay: 400 });
  ScrollReveal().reveal(".hero__actions", { ...opts, delay: 600 });
  ScrollReveal().reveal(".hero__stats", { ...opts, delay: 800 });
  ScrollReveal().reveal(".hero__image-container", { duration: 1200, delay: 300, scale: 0.9 });

  ScrollReveal().reveal(".product__card", { ...opts, interval: 200 });
  ScrollReveal().reveal(".banner__card", { ...opts, interval: 200, delay: 400 });
  ScrollReveal().reveal(".discover__card", { ...opts, interval: 300 });
  ScrollReveal().reveal(".team__card", { ...opts, interval: 300 });
  ScrollReveal().reveal(".value__card", { ...opts, interval: 200 });
  ScrollReveal().reveal(".section__header", opts);
  ScrollReveal().reveal(".section__description", { ...opts, delay: 200 });
  ScrollReveal().reveal(".subscribe__content form", { ...opts, delay: 400 });
  ScrollReveal().reveal(".contact__info-card", { ...opts, interval: 200 });
  ScrollReveal().reveal(".contact__form-card", { ...opts, origin: "right" });
}

/* ===========================
   PRELOADER
   =========================== */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      preloader.addEventListener("transitionend", () => preloader.remove(), {
        once: true,
      });
    }, 800);
  });
}

/* ===========================
   MAGNETIC BUTTON EFFECT
   =========================== */
function initMagneticButtons() {
  document.querySelectorAll(".btn--primary, .btn--add-cart").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ===========================
   SUBSCRIBE FORM
   =========================== */
function initSubscribeForm() {
  const form = document.querySelector(".subscribe__form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input && emailRegex.test(input.value.trim())) {
      showToast("You've subscribed! Get ready for sweet deals. 🎉");
      input.value = "";
    } else {
      showToast("Please enter a valid email address.", "error");
      input?.classList.add("error");
      setTimeout(() => input?.classList.remove("error"), 2000);
    }
  });
}

/* ===========================
   FILTER TABS (menu.html)
   =========================== */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter__tab");
  const grid = document.getElementById("menu-grid");
  if (!tabs.length || !grid) return;

  // Render all products initially
  grid.innerHTML = products.map(createProductCard).join("");
  initMagneticButtons();

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      const filtered =
        filter === "all" ? products : products.filter((p) => p.category === filter);

      grid.innerHTML = filtered.length
        ? filtered.map(createProductCard).join("")
        : `<div style="text-align:center;padding:3rem;color:var(--color-text-light);">
            No products in this category yet. 🍦
           </div>`;

      initMagneticButtons();

      // Re-init AOS if available
      if (typeof AOS !== "undefined") AOS.refresh();
    });
  });
}

/* ===========================
   INIT
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNav();
  initCounters();
  updateCartCounter();
  updateNavAuth();
  initScrollReveal();
  initSubscribeForm();
  initFilterTabs();
  initMagneticButtons();

  // Cart drawer events
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);

  // AOS init
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }
});
