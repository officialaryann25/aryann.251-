/* ====================================================
   IceWorld - Cart System (cart.js)
   ==================================================== */

/* ---- State ---- */
let cart = JSON.parse(localStorage.getItem('iceworld_cart') || '[]');

/* ---- Persist ---- */
function saveCart() {
  localStorage.setItem('iceworld_cart', JSON.stringify(cart));
}

/* ---- Add to Cart ---- */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartUI();
  updateCartCount();
  showToast(`🍦 ${product.name} added to cart!`, 'success');

  // Animate the button
  const btn = document.querySelector(`.product-card[data-id="${productId}"] .btn-add-cart`);
  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓ Added';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '🛒 Add';
    }, 1500);
  }
}

/* ---- Remove from Cart ---- */
function removeFromCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartUI();
  updateCartCount();
  if (product) showToast(`${product.name} removed from cart`, 'info');
}

/* ---- Update Quantity ---- */
function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
    updateCartCount();
  }
}

/* ---- Cart Count Badge ---- */
function updateCartCount() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* ---- Render Cart Sidebar ---- */
function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:0.82rem;margin-top:0.5rem;color:var(--text-light)">Add some delicious ice creams!</p>
      </div>
    `;
    if (cartTotal) cartTotal.textContent = '₹0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    html += `
      <div class="cart-item" data-cart-id="${product.id}">
        <div class="cart-item-img">${product.emoji}</div>
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <div class="item-price">₹${product.price}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${product.id}, +1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${product.id})" title="Remove">✕</button>
      </div>
    `;
  });

  cartItems.innerHTML = html;
  if (cartTotal) cartTotal.textContent = '₹' + total;
}

/* ---- Open / Close Cart Sidebar ---- */
function openCart() {
  const sidebar  = document.getElementById('cart-sidebar');
  const overlay  = document.getElementById('cart-overlay');
  if (sidebar)  sidebar.classList.add('active');
  if (overlay)  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateCartUI();
}

function closeCart() {
  const sidebar  = document.getElementById('cart-sidebar');
  const overlay  = document.getElementById('cart-overlay');
  if (sidebar)  sidebar.classList.remove('active');
  if (overlay)  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ---- Toast Notification ---- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartUI();

  // Cart open button
  document.querySelectorAll('[data-open-cart]').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  // Cart close button
  const closeBtn  = document.getElementById('cart-close');
  const overlay   = document.getElementById('cart-overlay');
  if (closeBtn)  closeBtn.addEventListener('click', closeCart);
  if (overlay)   overlay.addEventListener('click', closeCart);

  // Checkout
  const checkoutBtn = document.getElementById('btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
      }
      showToast('🎉 Order placed! Thank you for choosing IceWorld!', 'success');
      cart = [];
      saveCart();
      updateCartUI();
      updateCartCount();
      closeCart();
    });
  }
});
