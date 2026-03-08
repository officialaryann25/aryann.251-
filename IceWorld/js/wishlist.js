/* ===================================================================
   IceWorld - Wishlist JavaScript
   Wishlist with localStorage persistence
   =================================================================== */

'use strict';

const IceWorldWishlist = {
  items: [],

  init() {
    this.load();
    this.updateUI();
    this.bindEvents();
  },

  load() {
    try {
      const saved = localStorage.getItem('iceworld_wishlist');
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem('iceworld_wishlist', JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  },

  // Check if product is in wishlist
  isWishlisted(productId) {
    return this.items.some(item => item.id === productId);
  },

  // Toggle wishlist
  toggle(product) {
    if (this.isWishlisted(product.id)) {
      this.removeItem(product.id);
      return false;
    } else {
      this.addItem(product);
      return true;
    }
  },

  // Add item
  addItem(product) {
    if (!this.isWishlisted(product.id)) {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image || '🍦',
        imageUrl: product.imageUrl || '',
        category: product.category || 'Ice Cream',
        rating: product.rating || 4.5,
        reviews: product.reviews || 100,
        addedAt: Date.now()
      });
      this.save();
      this.updateUI();
      showWishlistToast(`${product.name} added to wishlist! ❤️`, 'success');
    }
  },

  // Remove item
  removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      this.items = this.items.filter(i => i.id !== productId);
      this.save();
      this.updateUI();
      showWishlistToast(`${item.name} removed from wishlist`, 'info');
    }
  },

  // Clear all items
  clearWishlist() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  // Get total count
  getCount() {
    return this.items.length;
  },

  // Update all wishlist UI elements
  updateUI() {
    this.updateBadges();
    this.updateWishlistButtons();
    if (document.querySelector('.wishlist-page')) {
      this.renderWishlistPage();
    }
  },

  // Update wishlist count badges
  updateBadges() {
    const count = this.getCount();
    document.querySelectorAll('.wishlist-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Update all wishlist buttons on page
  updateWishlistButtons() {
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.dataset.wishlistId;
      const icon = btn.querySelector('i');
      if (this.isWishlisted(id)) {
        btn.classList.add('wishlisted');
        if (icon) {
          icon.classList.remove('far');
          icon.classList.add('fas');
        }
        btn.title = 'Remove from wishlist';
      } else {
        btn.classList.remove('wishlisted');
        if (icon) {
          icon.classList.remove('fas');
          icon.classList.add('far');
        }
        btn.title = 'Add to wishlist';
      }
    });
  },

  // Bind events
  bindEvents() {
    document.addEventListener('click', (e) => {
      const wishlistBtn = e.target.closest('[data-wishlist-action]');
      if (!wishlistBtn) return;

      const action = wishlistBtn.dataset.wishlistAction;
      const productId = wishlistBtn.dataset.id;

      if (action === 'remove') {
        this.removeItem(productId);
      } else if (action === 'clear') {
        if (confirm('Clear your entire wishlist?')) {
          this.clearWishlist();
        }
      } else if (action === 'add-to-cart') {
        // Move to cart
        const item = this.items.find(i => i.id === productId);
        if (item && window.IceWorldCart) {
          window.IceWorldCart.addItem(item);
          this.removeItem(productId);
        }
      }
    });
  },

  // Render wishlist page
  renderWishlistPage() {
    const container = document.querySelector('.wishlist-grid');
    const emptyState = document.querySelector('.wishlist-empty');
    const wishlistContent = document.querySelector('.wishlist-content');

    if (!container) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (wishlistContent) wishlistContent.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (wishlistContent) wishlistContent.style.display = 'block';

    // Sort by date added (most recent first)
    const sortedItems = [...this.items].sort((a, b) => b.addedAt - a.addedAt);

    container.innerHTML = sortedItems.map(item => this.renderWishlistItem(item)).join('');

    // Animate items
    container.querySelectorAll('.wishlist-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.1}s`;
      card.classList.add('card-enter');
    });
  },

  // Render a single wishlist item
  renderWishlistItem(item) {
    const stars = generateStars(item.rating);
    const discount = item.originalPrice > item.price
      ? Math.round((1 - item.price / item.originalPrice) * 100)
      : 0;

    return `
      <div class="wishlist-card product-card" data-id="${item.id}">
        <div class="product-card-image">
          ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" loading="lazy">` : ''}
          <div class="product-emoji-fallback">${item.image}</div>
          ${discount > 0 ? `<span class="product-card-badge">${discount}% OFF</span>` : ''}
          <div class="product-card-actions">
            <button class="product-action-btn" 
              data-wishlist-action="remove" 
              data-id="${item.id}" 
              title="Remove from wishlist">
              <i class="fas fa-heart" style="color: #e74c3c;"></i>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-category">${item.category}</span>
          <h3 class="product-name">${item.name}</h3>
          <div class="product-rating">
            <div class="stars">${stars}</div>
            <span class="rating-count">(${item.reviews})</span>
          </div>
          <div class="product-price">
            <span class="price-current">₹${item.price}</span>
            ${item.originalPrice > item.price ? `<span class="price-original">₹${item.originalPrice}</span>` : ''}
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn-add-cart" data-wishlist-action="add-to-cart" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i>
            Move to Cart
          </button>
          <button class="product-action-btn" data-wishlist-action="remove" data-id="${item.id}" title="Remove">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  }
};

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fas fa-star" style="color:#ffc107;font-size:0.8rem;"></i>';
  if (half) html += '<i class="fas fa-star-half-alt" style="color:#ffc107;font-size:0.8rem;"></i>';
  for (let i = 0; i < empty; i++) html += '<i class="far fa-star" style="color:#ffc107;font-size:0.8rem;"></i>';
  return html;
}

function showWishlistToast(message, type) {
  if (window.IceWorldToast) {
    window.IceWorldToast.show(message, type);
  } else {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '❤️', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '✅'}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  IceWorldWishlist.init();
  window.IceWorldWishlist = IceWorldWishlist;
});
