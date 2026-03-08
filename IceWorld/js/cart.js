/* ===================================================================
   IceWorld - Cart JavaScript
   Shopping cart with localStorage persistence
   =================================================================== */

'use strict';

// ===== CART STATE =====
const IceWorldCart = {
  items: [],
  
  // Initialize cart from localStorage
  init() {
    this.load();
    this.updateUI();
    this.bindEvents();
  },

  // Load cart from localStorage
  load() {
    try {
      const saved = localStorage.getItem('iceworld_cart');
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart:', e);
      this.items = [];
    }
  },

  // Save cart to localStorage
  save() {
    try {
      localStorage.setItem('iceworld_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  },

  // Add item to cart
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, existing.stock || 99);
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image || '🍦',
        imageUrl: product.imageUrl || '',
        category: product.category || 'Ice Cream',
        quantity: 1,
        stock: product.stock || 10,
        addedAt: Date.now()
      });
    }
    this.save();
    this.updateUI();
    showToast(`${product.name} added to cart! 🛒`, 'success');
    animateCartIcon();
  },

  // Remove item from cart
  removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      this.items = this.items.filter(i => i.id !== productId);
      this.save();
      this.updateUI();
      showToast(`${item.name} removed from cart`, 'info');
    }
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      item.quantity = Math.min(quantity, item.stock || 99);
      this.save();
      this.updateUI();
    }
  },

  // Increment quantity
  incrementQuantity(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  },

  // Decrement quantity
  decrementQuantity(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  },

  // Clear all items
  clearCart() {
    this.items = [];
    this.save();
    this.updateUI();
    showToast('Cart cleared', 'info');
  },

  // Get total items count
  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Get subtotal
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Get savings
  getSavings() {
    return this.items.reduce((sum, item) => {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }, 0);
  },

  // Get discount amount
  getDiscount(couponCode) {
    const coupons = {
      'ICYWORLD10': { type: 'percent', value: 10 },
      'SWEET20': { type: 'percent', value: 20 },
      'MAHI50': { type: 'flat', value: 50 },
      'FIRST15': { type: 'percent', value: 15 },
      'PRIYANSHI25': { type: 'percent', value: 25 }
    };
    
    const coupon = coupons[couponCode?.toUpperCase()];
    if (!coupon) return { valid: false, discount: 0, message: 'Invalid coupon code' };
    
    const subtotal = this.getSubtotal();
    let discount = 0;
    
    if (coupon.type === 'percent') {
      discount = (subtotal * coupon.value) / 100;
    } else {
      discount = Math.min(coupon.value, subtotal);
    }
    
    return {
      valid: true,
      discount: discount,
      message: `Coupon applied! You saved ₹${discount.toFixed(2)}`
    };
  },

  // Calculate delivery charge
  getDelivery() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 500) return 0; // Free delivery above 500
    return 49;
  },

  // Get total
  getTotal(couponDiscount = 0) {
    return Math.max(0, this.getSubtotal() + this.getDelivery() - couponDiscount);
  },

  // Update all cart UI elements
  updateUI() {
    this.updateBadges();
    if (document.querySelector('.cart-page')) {
      this.renderCartPage();
    }
  },

  // Update cart count badges
  updateBadges() {
    const count = this.getTotalItems();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Bind event listeners on cart page
  bindEvents() {
    // Delegate click events on cart page
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-cart-action]');
      if (!target) return;

      const action = target.dataset.cartAction;
      const productId = target.dataset.id;

      switch (action) {
        case 'remove':
          this.removeItem(productId);
          break;
        case 'increment':
          this.incrementQuantity(productId);
          break;
        case 'decrement':
          this.decrementQuantity(productId);
          break;
        case 'clear':
          if (confirm('Clear all items from cart?')) {
            this.clearCart();
          }
          break;
      }
    });

    // Coupon form
    const couponForm = document.getElementById('coupon-form');
    if (couponForm) {
      couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.applyCoupon();
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }
  },

  // Apply coupon
  applyCoupon() {
    const input = document.getElementById('coupon-input');
    if (!input) return;
    
    const code = input.value.trim();
    if (!code) {
      showToast('Please enter a coupon code', 'warning');
      return;
    }

    const result = this.getDiscount(code);
    const messageEl = document.getElementById('coupon-message');
    
    if (result.valid) {
      this.currentDiscount = result.discount;
      this.appliedCoupon = code;
      if (messageEl) {
        messageEl.textContent = result.message;
        messageEl.className = 'coupon-message success';
      }
      showToast(result.message, 'success');
      this.renderOrderSummary(result.discount);
    } else {
      this.currentDiscount = 0;
      this.appliedCoupon = null;
      if (messageEl) {
        messageEl.textContent = result.message;
        messageEl.className = 'coupon-message error';
      }
      showToast(result.message, 'error');
    }
  },

  // Checkout
  checkout() {
    if (this.items.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }

    // Show success modal
    const modal = document.getElementById('order-success-modal');
    if (modal) {
      modal.classList.add('open');
      launchConfetti();
      
      // Clear cart after order
      setTimeout(() => {
        this.clearCart();
      }, 1000);
    } else {
      launchConfetti();
      showToast('Order placed successfully! 🎉', 'success');
      setTimeout(() => {
        this.clearCart();
      }, 2000);
    }
  },

  // Render the cart page content
  renderCartPage() {
    const cartContainer = document.querySelector('.cart-items-container');
    const emptyState = document.querySelector('.cart-empty');
    const cartContent = document.querySelector('.cart-content');

    if (!cartContainer) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    cartContainer.innerHTML = this.items.map(item => this.renderCartItem(item)).join('');
    this.renderOrderSummary(this.currentDiscount || 0);
  },

  // Render a single cart item
  renderCartItem(item) {
    const imageEl = item.imageUrl
      ? `<img src="${item.imageUrl}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
      : '';
    
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          ${imageEl}
          <div class="cart-item-emoji">${item.image}</div>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-info">
            <span class="cart-item-category">${item.category}</span>
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">
              <span class="cart-current-price">₹${item.price}</span>
              ${item.originalPrice > item.price ? `<span class="cart-original-price">₹${item.originalPrice}</span>` : ''}
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-controls">
              <button class="qty-btn" data-cart-action="decrement" data-id="${item.id}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-cart-action="increment" data-id="${item.id}">+</button>
            </div>
            <span class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-remove-btn" data-cart-action="remove" data-id="${item.id}" title="Remove item">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Render order summary
  renderOrderSummary(discount = 0) {
    const summaryEl = document.querySelector('.order-summary-details');
    if (!summaryEl) return;

    const subtotal = this.getSubtotal();
    const savings = this.getSavings();
    const delivery = this.getDelivery();
    const total = this.getTotal(discount);

    summaryEl.innerHTML = `
      <div class="summary-row">
        <span>Subtotal (${this.getTotalItems()} items)</span>
        <span>₹${subtotal.toFixed(2)}</span>
      </div>
      ${savings > 0 ? `
      <div class="summary-row savings">
        <span>Product Savings</span>
        <span class="text-green">-₹${savings.toFixed(2)}</span>
      </div>` : ''}
      ${discount > 0 ? `
      <div class="summary-row savings">
        <span>Coupon Discount</span>
        <span class="text-green">-₹${discount.toFixed(2)}</span>
      </div>` : ''}
      <div class="summary-row">
        <span>Delivery</span>
        <span class="${delivery === 0 ? 'text-green' : ''}">${delivery === 0 ? 'FREE' : '₹' + delivery}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-row total">
        <span>Total</span>
        <span>₹${total.toFixed(2)}</span>
      </div>
      ${delivery === 0 && subtotal > 0 ? '<p class="free-delivery-note">🎉 You\'re getting FREE delivery!</p>' : 
        subtotal > 0 ? `<p class="delivery-note">Add ₹${(500 - subtotal).toFixed(2)} more for FREE delivery</p>` : ''}
    `;
  }
};

// ===== HELPER FUNCTIONS =====

function showToast(message, type = 'success') {
  if (typeof window.IceWorldToast !== 'undefined') {
    window.IceWorldToast.show(message, type);
  } else {
    // Fallback
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '✅'}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

function animateCartIcon() {
  const cartBtns = document.querySelectorAll('.cart-icon-btn, .nav-icon-btn[href*="cart"]');
  cartBtns.forEach(btn => {
    btn.classList.add('cart-added');
    setTimeout(() => btn.classList.remove('cart-added'), 400);
  });
}

function launchConfetti() {
  if (typeof window.launchConfetti === 'function') {
    window.launchConfetti();
    return;
  }
  
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  
  const colors = ['#ff6b9d', '#ffa07a', '#a8edea', '#fed9b7', '#e8c4f0', '#fff3a3'];
  
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      animation-duration: ${Math.random() * 2 + 2}s;
      animation-delay: ${Math.random() * 0.5}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
  }
  
  setTimeout(() => container.remove(), 4000);
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  IceWorldCart.init();
  window.IceWorldCart = IceWorldCart;
});
