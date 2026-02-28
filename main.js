const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", () => navLinks.classList.remove("open"));
}

const cartKey = "iceworldCart";
const getCart = () => JSON.parse(localStorage.getItem(cartKey) || "[]");
const setCart = (items) => localStorage.setItem(cartKey, JSON.stringify(items));
const hashValue = async (value) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
};

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = getCart().reduce((t, i) => t + i.qty, 0);
  });
}

function addToCart(name, price) {
  const cart = getCart();
  const found = cart.find((i) => i.name === name);
  if (found) found.qty += 1;
  else cart.push({ name, price, qty: 1 });
  setCart(cart);
  updateCartCount();
  showToast(`${name} added to cart`);
}

window.addToCart = addToCart;

function renderCheckout() {
  const list = document.getElementById("checkoutList");
  const total = document.getElementById("checkoutTotal");
  if (!list || !total) return;
  const cart = getCart();
  list.innerHTML = cart.length
    ? cart.map((i) => `<li>${i.name} x${i.qty} - ₹${i.price * i.qty}</li>`).join("")
    : "<li>Your cart is empty.</li>";
  total.textContent = `₹${cart.reduce((t, i) => t + i.price * i.qty, 0)}`;
}

const cartBtn = document.getElementById("cartBtn");
const modal = document.getElementById("cartModal");
if (cartBtn && modal) {
  cartBtn.addEventListener("click", () => {
    renderCheckout();
    modal.classList.add("open");
  });
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") modal.classList.remove("open");
  });
}

const placeOrder = document.getElementById("placeOrder");
if (placeOrder) {
  placeOrder.addEventListener("click", () => {
    setCart([]);
    updateCartCount();
    renderCheckout();
    showToast("Order placed successfully ✨");
  });
}

function getSession() {
  return JSON.parse(localStorage.getItem("userSession") || "null");
}

function setSession(user) {
  localStorage.setItem("userSession", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("userSession");
  location.replace("login.html");
}
window.logoutUser = logoutUser;

function bindAuthUI() {
  const authSlot = document.getElementById("authSlot");
  if (!authSlot) return;
  const session = getSession();
  authSlot.replaceChildren();
  if (session) {
    const greeting = document.createElement("span");
    greeting.textContent = `Hi, ${session.name}`;
    const logoutBtn = document.createElement("button");
    logoutBtn.className = "btn btn--ghost";
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", logoutUser);
    authSlot.append(greeting, logoutBtn);
    return;
  }
  const loginLink = document.createElement("a");
  loginLink.href = "login.html";
  loginLink.className = "btn btn--ghost";
  loginLink.textContent = "Login";
  const signupLink = document.createElement("a");
  signupLink.href = "signup.html";
  signupLink.className = "btn btn--primary";
  signupLink.textContent = "Signup";
  authSlot.append(loginLink, signupLink);
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const button = loginForm.querySelector("button[type='submit']");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span> Signing in...`;
    setTimeout(async () => {
      const passwordHash = await hashValue(password);
      const user = users.find((u) => u.email === email && u.passwordHash === passwordHash);
      if (!user) {
        showToast("Invalid credentials");
        button.disabled = false;
        button.textContent = "Login";
        return;
      }
      setSession({ name: user.name, email: user.email });
      showToast(`Welcome Back, ${user.name}`);
      location.href = "index.html";
    }, 800);
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();
    if (password.length < 6) return showToast("Password must be at least 6 characters");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) return showToast("Email already registered");
    users.push({ name, email, passwordHash: await hashValue(password) });
    localStorage.setItem("users", JSON.stringify(users));
    setSession({ name, email });
    location.href = "index.html";
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent. We'll contact you soon!");
    contactForm.reset();
  });
}

const heroVisual = document.getElementById("heroVisual");
if (heroVisual) {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      heroVisual.style.setProperty("--parallax", `${Math.min(window.scrollY * 0.2, 70)}px`);
      ticking = false;
    });
  });
}

if (window.gsap) {
  gsap.utils.toArray("[data-fade]").forEach((el, i) => {
    gsap.from(el, {
      y: 18,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

updateCartCount();
bindAuthUI();
