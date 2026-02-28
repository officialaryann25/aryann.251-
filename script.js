const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn?.querySelector("i");

if (menuBtn && navLinks && menuBtnIcon) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-3-line");
  });

  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-3-line");
  });
}

document.getElementById("footer-copy")?.append(`© ${new Date().getFullYear()} IceWorld. Crafted by Mahi Sehrawat & Priyanshi.`);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((block) => {
    block.style.backgroundPositionY = `${window.scrollY * 0.1}px`;
  });
});

const authStateArea = document.querySelector(".nav__btns");
const currentSession = JSON.parse(localStorage.getItem("iceworldSession") || "null");

function renderAuthState() {
  if (!authStateArea) return;
  if (currentSession?.email) {
    authStateArea.innerHTML = `<button class="btn" id="logout-btn">Logout</button>`;
    document.getElementById("logout-btn")?.addEventListener("click", logout);
  } else {
    authStateArea.innerHTML = `<a class="btn btn--chip" href="login.html">Login</a><a class="btn" href="signup.html">Sign Up</a>`;
  }
}

function logout() {
  localStorage.removeItem("iceworldSession");
  location.reload();
}

renderAuthState();

const products = document.querySelectorAll(".product");
document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.filter;
    products.forEach((item) => {
      item.style.display = category === "all" || item.dataset.category === category ? "block" : "none";
    });
  });
});

const cartKey = "iceworldCart";
const getCart = () => JSON.parse(localStorage.getItem(cartKey) || "[]");
const setCart = (cart) => localStorage.setItem(cartKey, JSON.stringify(cart));
async function hashPassword(value) {
  const encoded = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function notify(message) {
  const notice = document.createElement("div");
  notice.textContent = message;
  notice.style.cssText = "position:fixed;bottom:1rem;left:1rem;background:#2f1d1c;color:#fff;padding:.65rem .9rem;border-radius:999px;z-index:60;box-shadow:0 10px 20px rgba(0,0,0,.2)";
  document.body.appendChild(notice);
  setTimeout(() => notice.remove(), 1800);
}

function addToCart(product) {
  const session = JSON.parse(localStorage.getItem("iceworldSession") || "null");
  if (!session?.email) {
    notify("Please login first");
    return;
  }
  const cart = getCart();
  cart.push(product);
  setCart(cart);
  renderCart();
  notify("Added to cart");
}

document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    addToCart({
      name: card.dataset.name,
      price: Number(card.dataset.price)
    });
  });
});

const cartSidebar = document.getElementById("cart-sidebar");
document.getElementById("open-cart")?.addEventListener("click", () => cartSidebar?.classList.add("open"));
document.getElementById("close-cart")?.addEventListener("click", () => cartSidebar?.classList.remove("open"));

function renderCart() {
  const cart = getCart();
  const list = document.getElementById("cart-items");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (list) {
    list.innerHTML = cart.map((item, i) => `<li>${item.name}<button class="icon-btn" data-remove="${i}">×</button></li>`).join("");
  }
  const totalNode = document.getElementById("cart-total");
  const countNode = document.getElementById("cart-count");
  if (totalNode) totalNode.textContent = total.toString();
  if (countNode) countNode.textContent = cart.length.toString();
  document.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const updated = getCart();
      updated.splice(Number(btn.dataset.remove), 1);
      setCart(updated);
      renderCart();
    });
  });
}

renderCart();

let checkoutStep = 1;
const checkout = document.getElementById("checkout");
const checkoutContent = document.getElementById("checkout-content");

function renderStep() {
  if (!checkoutContent) return;
  const views = {
    1: `<p>Step 1: Enter address details at payment confirmation.</p>`,
    2: `<p>Step 2: Choose secure payment mode.</p>`,
    3: `<p>Step 3: Review and place order.</p>`
  };
  checkoutContent.innerHTML = views[checkoutStep];
  document.querySelectorAll(".steps span").forEach((dot, idx) => {
    dot.classList.toggle("active", idx + 1 === checkoutStep);
  });
}

document.getElementById("start-checkout")?.addEventListener("click", () => {
  checkout?.classList.remove("hidden");
  checkoutStep = 1;
  renderStep();
});

document.getElementById("next-step")?.addEventListener("click", () => {
  checkoutStep = checkoutStep >= 3 ? 1 : checkoutStep + 1;
  renderStep();
});

document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = Object.fromEntries(data.entries());
  const users = JSON.parse(localStorage.getItem("iceworldUsers") || "[]");
  if (users.some((u) => u.email === user.email)) {
    document.getElementById("signup-status").textContent = "Account already exists.";
    return;
  }
  users.push({ ...user, password: await hashPassword(user.password) });
  localStorage.setItem("iceworldUsers", JSON.stringify(users));
  localStorage.setItem("iceworldSession", JSON.stringify({ email: user.email, name: user.name }));
  location.href = "index.html";
});

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const users = JSON.parse(localStorage.getItem("iceworldUsers") || "[]");
  const hashedInput = await hashPassword(data.password);
  const found = users.find((u) => u.email === data.email && (u.password === hashedInput || u.password === data.password));
  if (!found) {
    document.getElementById("login-status").textContent = "Invalid credentials.";
    return;
  }
  localStorage.setItem("iceworldSession", JSON.stringify({ email: found.email, name: found.name }));
  location.href = "index.html";
});

document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("contact-status").textContent = "Thanks for contacting IceWorld. We'll reach out soon.";
  e.target.reset();
});
