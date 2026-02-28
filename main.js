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
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=280&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=280&fit=crop&auto=format",
    tag: "popular",
    tagLabel: "Popular",
    rating: 4,
    reviews: 74,
    category: "classic",
  },
  {
    id: 9,
    name: "Espresso Crunch",
    desc: "Bold single-origin espresso ice cream laced with dark chocolate shards and a caramel drizzle.",
    price: 369,
    oldPrice: 409,
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=400&h=280&fit=crop&auto=format",
    tag: "bestseller",
    tagLabel: "Best Seller",
    rating: 5,
    reviews: 89,
    category: "coffee",
  },
  {
    id: 10,
    name: "Mocha Velvet",
    desc: "Silky mocha ice cream swirled with fudge ribbons and topped with cocoa nibs.",
    price: 349,
    oldPrice: null,
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=280&fit=crop&auto=format",
    tag: "new",
    tagLabel: "New",
    rating: 5,
    reviews: 52,
    category: "coffee",
  },
  {
    id: 11,
    name: "Cold Brew Caramel",
    desc: "Smooth cold-brew coffee ice cream ribbon-swirled with salted caramel sauce.",
    price: 389,
    oldPrice: 429,
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=280&fit=crop&auto=format",
    tag: "popular",
    tagLabel: "Popular",
    rating: 4,
    reviews: 66,
    category: "coffee",
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
   WISHLIST MODULE
   =========================== */
const Wishlist = (() => {
  const STORAGE_KEY = "icecream_wishlist";

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
    return getItems().length;
  }

  function has(id) {
    return getItems().some((i) => i.id === id);
  }

  function toggle(product) {
    const items = getItems();
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx > -1) {
      items.splice(idx, 1);
    } else {
      items.push(product);
    }
    saveItems(items);
    return idx === -1; // true = just added (was not in list); false = just removed (was in list)
  }

  return { getItems, getCount, has, toggle };
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
   WISHLIST UI
   =========================== */
function updateWishlistCounter() {
  const count = Wishlist.getCount();
  document.querySelectorAll(".wishlist__counter").forEach((el) => {
    el.textContent = count;
    el.style.display = count === 0 ? "none" : "flex";
  });
}

function renderWishlistDrawer() {
  const container = document.getElementById("wishlist-items");
  if (!container) return;

  const items = Wishlist.getItems();
  const footer = document.querySelector(".wishlist-drawer__footer");

  if (items.length === 0) {
    container.innerHTML = `
      <div class="wishlist-empty">
        <div class="wishlist-empty-icon">🤍</div>
        <p>Your wishlist is empty.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;">Heart your favourites!</p>
      </div>`;
    if (footer) footer.style.display = "none";
  } else {
    container.innerHTML = items
      .map((item) => {
        const imgHtml = item.image
          ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />`
          : item.emoji;
        return `
          <div class="wishlist-item">
            <div class="wishlist-item__img">${imgHtml}</div>
            <div class="wishlist-item__info">
              <div class="wishlist-item__name">${escapeHtml(item.name)}</div>
              <div class="wishlist-item__price">₹${item.price.toLocaleString()}</div>
            </div>
            <div class="wishlist-item__actions">
              <button class="wishlist-item__cart" onclick='addToCart(${JSON.stringify(item)})' title="Add to Cart">
                <i class="ri-shopping-bag-line"></i>
              </button>
              <button class="wishlist-item__remove" onclick='removeFromWishlist(${JSON.stringify(item)})' title="Remove">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>`;
      })
      .join("");
    if (footer) footer.style.display = "block";
  }
}

function openWishlist() {
  renderWishlistDrawer();
  document.getElementById("wishlist-drawer")?.classList.add("open");
  document.getElementById("wishlist-overlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWishlist() {
  document.getElementById("wishlist-drawer")?.classList.remove("open");
  document.getElementById("wishlist-overlay")?.classList.remove("open");
  document.body.style.overflow = "";
}

function toggleWishlist(product) {
  const added = Wishlist.toggle(product);
  updateWishlistCounter();
  showToast(added ? `${product.name} added to wishlist! ❤️` : `${product.name} removed from wishlist.`);
  document.querySelectorAll(`.btn--wishlist[data-id="${product.id}"]`).forEach((btn) => {
    btn.classList.toggle("active", added);
    const icon = btn.querySelector("i");
    if (icon) icon.className = added ? "ri-heart-fill" : "ri-heart-line";
    btn.title = added ? "Remove from Wishlist" : "Add to Wishlist";
  });
}

function removeFromWishlist(product) {
  Wishlist.toggle(product); // already in list — toggle removes it
  updateWishlistCounter();
  renderWishlistDrawer();
  showToast(`${product.name} removed from wishlist.`);
  document.querySelectorAll(`.btn--wishlist[data-id="${product.id}"]`).forEach((btn) => {
    btn.classList.remove("active");
    const icon = btn.querySelector("i");
    if (icon) icon.className = "ri-heart-line";
    btn.title = "Add to Wishlist";
  });
}

function addAllToCart() {
  const items = Wishlist.getItems();
  if (!items.length) return;
  items.forEach((item) => Cart.addItem(item));
  updateCartCounter();
  closeWishlist();
  showToast(`${items.length} item${items.length > 1 ? "s" : ""} added to cart! 🛒`);
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
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createProductCard(product) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < Math.floor(product.rating) ? "ri-star-fill" : "ri-star-line"}"></i>`
  ).join("");

  const imageContent = product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />`
    : `<div class="product__card-emoji">${product.emoji}</div>`;

  const isWishlisted = Wishlist.has(product.id);

  return `
    <div class="product__card" data-category="${product.category}" data-aos="fade-up">
      <div class="product__card-image">
        <span class="product__tag product__tag--${product.tag}">${product.tagLabel}</span>
        <button class="btn--wishlist ${isWishlisted ? "active" : ""}" data-id="${product.id}"
          onclick='toggleWishlist(${JSON.stringify(product)})'
          title="${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}">
          <i class="ri-heart-${isWishlisted ? "fill" : "line"}"></i>
        </button>
        ${imageContent}
      </div>
      <div class="product__card-body">
        <h3 class="product__card-name">${escapeHtml(product.name)}</h3>
        <p class="product__card-desc">${escapeHtml(product.desc)}</p>
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
   MENU PAGE STATE & RENDER
   =========================== */
const MenuState = { filter: "all", query: "", sort: "default" };

function getFilteredProducts() {
  let result = [...products];
  if (MenuState.filter !== "all") {
    result = result.filter((p) => p.category === MenuState.filter);
  }
  if (MenuState.query) {
    const q = MenuState.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (MenuState.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (MenuState.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (MenuState.sort === "rating") result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return result;
}

function renderMenuProducts() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  const filtered = getFilteredProducts();

  const countEl = document.getElementById("result-count");
  if (countEl) {
    countEl.textContent =
      MenuState.query || MenuState.filter !== "all"
        ? `${filtered.length} flavor${filtered.length !== 1 ? "s" : ""} found`
        : "";
  }

  grid.innerHTML = filtered.length
    ? filtered.map(createProductCard).join("")
    : `<div class="menu__empty">
        <div class="menu__empty-icon">🔍</div>
        <p>No flavors found.</p>
        <p>Try adjusting your search or filter.</p>
       </div>`;

  initMagneticButtons();
  if (typeof AOS !== "undefined") AOS.refresh();
}

/* ===========================
   FILTER TABS (menu.html)
   =========================== */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter__tab");
  const grid = document.getElementById("menu-grid");
  if (!tabs.length || !grid) return;

  renderMenuProducts();

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      MenuState.filter = tab.dataset.filter;
      renderMenuProducts();
    });
  });
}

/* ===========================
   SEARCH & SORT (menu.html)
   =========================== */
function initSearch() {
  const searchInput = document.getElementById("product-search");
  if (!searchInput) return;
  searchInput.addEventListener("input", () => {
    MenuState.query = searchInput.value.trim();
    renderMenuProducts();
  });
}

function initSort() {
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) return;
  sortSelect.addEventListener("change", () => {
    MenuState.sort = sortSelect.value;
    renderMenuProducts();
  });
}

/* ===========================
   BACK TO TOP
   =========================== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  updateWishlistCounter();
  updateNavAuth();
  initScrollReveal();
  initSubscribeForm();
  initFilterTabs();
  initSearch();
  initSort();
  initBackToTop();
  initMagneticButtons();

  // Cart & wishlist drawer events
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("wishlist-overlay")?.addEventListener("click", closeWishlist);

  // AOS init
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }
});
