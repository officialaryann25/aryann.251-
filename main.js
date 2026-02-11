/*=============== NAVIGATION TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

/*=============== CLOSE MENU ON LINK CLICK ===============*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/*=============== CART MANAGEMENT SYSTEM ===============*/
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const savedCart = localStorage.getItem('iceworld_cart');
        return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
    }

    saveCart() {
        localStorage.setItem('iceworld_cart', JSON.stringify(this.cart));
    }

    addItem(product) {
        const existingItem = this.cart.cartItems.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const newItem = {
                id: Date.now().toString(),
                name: product.name,
                price: parseFloat(product.price),
                quantity: 1,
                image: product.image
            };
            this.cart.cartItems.push(newItem);
        }
        
        this.saveCart();
        this.updateCartCount();
        return true;
    }

    removeItem(itemId) {
        this.cart.cartItems = this.cart.cartItems.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(itemId, quantity) {
        const item = this.cart.cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartCount();
        }
    }

    getCart() {
        return this.cart;
    }

    getItemCount() {
        return this.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.cart.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * 0.08; // 8% tax
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    clearCart() {
        this.cart = { cartItems: [] };
        this.saveCart();
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const count = this.getItemCount();
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'block' : 'none';
        }
    }
}

// Initialize cart manager
const cartManager = new CartManager();

/*=============== NAVIGATION BUTTONS ===============*/
const cartButton = document.getElementById('cart-button');
const notificationButton = document.getElementById('notification-button');

if (cartButton) {
    cartButton.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

if (notificationButton) {
    notificationButton.addEventListener('click', () => {
        window.location.href = 'notifications.html';
    });
}

/*=============== BUY NOW BUTTONS ===============*/
const buyNowButtons = document.querySelectorAll('.buy-now-btn');

buyNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image');
        
        const product = {
            name: productName,
            price: productPrice,
            image: productImage
        };
        
        cartManager.addItem(product);
        
        // Show feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 500);
    });
});

/*=============== SUBSCRIBE FORM ===============*/
const subscribeForm = document.getElementById('subscribe-form');
const subscribeMessage = document.getElementById('subscribe-message');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('subscribe-email');
        const email = emailInput.value.trim();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            subscribeMessage.textContent = '❌ Please enter a valid email address';
            subscribeMessage.style.color = '#e74c3c';
            return;
        }
        
        // Save to localStorage (simulated backend)
        const subscribers = JSON.parse(localStorage.getItem('iceworld_subscribers') || '[]');
        
        if (subscribers.includes(email)) {
            subscribeMessage.textContent = 'ℹ️ This email is already subscribed';
            subscribeMessage.style.color = '#f39c12';
        } else {
            subscribers.push(email);
            localStorage.setItem('iceworld_subscribers', JSON.stringify(subscribers));
            subscribeMessage.textContent = '✅ Successfully subscribed! Thank you!';
            subscribeMessage.style.color = '#27ae60';
        }
        
        // Clear form
        emailInput.value = '';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            subscribeMessage.textContent = '';
        }, 5000);
    });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: false
    });

    sr.reveal('.hero__content, .hero__image', { origin: 'left', interval: 100 });
    sr.reveal('.section__title, .section__subtitle', { origin: 'top' });
    sr.reveal('.product__card', { origin: 'bottom', interval: 100 });
    sr.reveal('.category__card', { origin: 'bottom', interval: 150 });
    sr.reveal('.subscribe__form', { origin: 'bottom' });
    sr.reveal('.footer__content', { origin: 'bottom' });
}

/*=============== CART PAGE SPECIFIC ===============*/
if (window.location.pathname.includes('cart.html')) {
    // Use DOMContentLoaded to ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCart);
    } else {
        renderCart();
    }
}

function renderCart() {
    const cart = cartManager.getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return;
    
    if (cart.cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="ri-shopping-cart-line cart-empty-icon"></i>
                <p class="cart-empty-text">Your cart is empty</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartSummaryContainer) {
            cartSummaryContainer.style.display = 'none';
        }
        return;
    }
    
    // Render cart items
    let cartHTML = '<div class="cart-items">';
    cart.cartItems.forEach(item => {
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <i class="ri-ice-cream-fill"></i>
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-id="${item.id}">
                        <i class="ri-subtract-line"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-id="${item.id}">
                        <i class="ri-add-line"></i>
                    </button>
                </div>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;
    });
    cartHTML += '</div>';
    
    cartItemsContainer.innerHTML = cartHTML;
    
    // Render cart summary
    if (cartSummaryContainer) {
        const subtotal = cartManager.getSubtotal();
        const tax = cartManager.getTax();
        const total = cartManager.getTotal();
        
        cartSummaryContainer.innerHTML = `
            <div class="cart-summary">
                <h3 class="section-title">Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (8%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <a href="index.html" class="btn btn-secondary">Continue Shopping</a>
                    <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
                </div>
            </div>
        `;
    }
    
    // Add event listeners
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.currentTarget.getAttribute('data-id');
            const item = cart.cartItems.find(i => i.id === itemId);
            if (item) {
                cartManager.updateQuantity(itemId, item.quantity + 1);
                renderCart();
            }
        });
    });
    
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.currentTarget.getAttribute('data-id');
            const item = cart.cartItems.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                cartManager.updateQuantity(itemId, item.quantity - 1);
                renderCart();
            }
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.currentTarget.getAttribute('data-id');
            if (confirm('Are you sure you want to remove this item?')) {
                cartManager.removeItem(itemId);
                renderCart();
            }
        });
    });
}

/*=============== CHECKOUT PAGE SPECIFIC ===============*/
if (window.location.pathname.includes('checkout.html')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderCheckout();
            handleCheckoutForm();
        });
    } else {
        renderCheckout();
        handleCheckoutForm();
    }
}

function renderCheckout() {
    const orderSummaryContainer = document.getElementById('order-summary');
    if (!orderSummaryContainer) return;
    
    const cart = cartManager.getCart();
    
    if (cart.cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let summaryHTML = '<h3 class="section-title">Order Summary</h3>';
    cart.cartItems.forEach(item => {
        summaryHTML += `
            <div class="summary-row">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    const subtotal = cartManager.getSubtotal();
    const tax = cartManager.getTax();
    const total = cartManager.getTotal();
    
    summaryHTML += `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (8%):</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    orderSummaryContainer.innerHTML = summaryHTML;
}

function handleCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('customer-address').value,
            paymentMethod: document.querySelector('.payment-method.active')?.getAttribute('data-method') || 'credit-card'
        };
        
        // Validate
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Generate order number
        const orderNumber = 'ICE' + Date.now().toString().slice(-8);
        
        // Save order to localStorage
        const order = {
            orderNumber: orderNumber,
            customer: formData,
            items: cartManager.getCart().cartItems,
            subtotal: cartManager.getSubtotal(),
            tax: cartManager.getTax(),
            total: cartManager.getTotal(),
            date: new Date().toISOString()
        };
        
        localStorage.setItem('iceworld_last_order', JSON.stringify(order));
        
        // Clear cart
        cartManager.clearCart();
        
        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    });
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
        });
    });
}

/*=============== ORDER CONFIRMATION PAGE ===============*/
if (window.location.pathname.includes('order-confirmation.html')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderOrderConfirmation);
    } else {
        renderOrderConfirmation();
    }
}

function renderOrderConfirmation() {
    const orderDetailsContainer = document.getElementById('order-details');
    if (!orderDetailsContainer) return;
    
    const lastOrder = localStorage.getItem('iceworld_last_order');
    
    if (!lastOrder) {
        window.location.href = 'index.html';
        return;
    }
    
    const order = JSON.parse(lastOrder);
    
    let detailsHTML = `
        <p class="order-number">Order Number: <strong>#${order.orderNumber}</strong></p>
        <div class="order-summary">
            <h3 class="section-title">Order Details</h3>
    `;
    
    order.items.forEach(item => {
        detailsHTML += `
            <div class="summary-row">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    detailsHTML += `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax:</span>
                <span>$${order.tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${order.total.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="cart-actions">
            <button class="btn btn-secondary" onclick="trackOrder()">Track Order</button>
            <a href="index.html" class="btn btn-primary">Continue Shopping</a>
        </div>
    `;
    
    orderDetailsContainer.innerHTML = detailsHTML;
}

function trackOrder() {
    alert('Order tracking feature will be available soon! You will receive an email with tracking information.');
}

/*=============== NOTIFICATIONS PAGE ===============*/
if (window.location.pathname.includes('notifications.html')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderNotifications);
    } else {
        renderNotifications();
    }
}

function renderNotifications() {
    const notificationsContainer = document.getElementById('notifications-container');
    if (!notificationsContainer) return;
    
    // Sample notifications
    const notifications = [
        {
            id: 1,
            icon: 'ri-ice-cream-fill',
            title: 'New Flavor Alert! 🎉',
            message: 'Try our new Salted Caramel Swirl - Available now for a limited time!',
            time: '2 hours ago',
            unread: true
        },
        {
            id: 2,
            icon: 'ri-discount-percent-fill',
            title: 'Special Discount',
            message: 'Get 20% off on your next purchase! Use code: SWEET20',
            time: '1 day ago',
            unread: true
        },
        {
            id: 3,
            icon: 'ri-truck-fill',
            title: 'Order Update',
            message: 'Your recent order has been delivered successfully!',
            time: '2 days ago',
            unread: false
        },
        {
            id: 4,
            icon: 'ri-star-fill',
            title: 'Rate Your Experience',
            message: 'We would love to hear about your recent purchase. Share your feedback!',
            time: '3 days ago',
            unread: false
        },
        {
            id: 5,
            icon: 'ri-gift-fill',
            title: 'Birthday Month Special',
            message: 'Celebrate with us! Get a free scoop on your birthday 🎂',
            time: '1 week ago',
            unread: false
        }
    ];
    
    let notificationsHTML = '<div class="notifications-list">';
    
    notifications.forEach(notification => {
        notificationsHTML += `
            <div class="notification-card ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
                <div class="notification-icon">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <h3 class="notification-title">${notification.title}</h3>
                    <p class="notification-message">${notification.message}</p>
                    <span class="notification-time">${notification.time}</span>
                </div>
                ${notification.unread ? `
                <div class="notification-actions">
                    <button class="mark-read-btn" data-id="${notification.id}">
                        Mark as Read
                    </button>
                </div>
                ` : ''}
            </div>
        `;
    });
    
    notificationsHTML += '</div>';
    notificationsHTML += '<div style="text-align: center; margin-top: 2rem;"><a href="index.html" class="btn btn-primary">Back to Home</a></div>';
    
    notificationsContainer.innerHTML = notificationsHTML;
    
    // Add event listeners for mark as read
    document.querySelectorAll('.mark-read-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const notificationCard = e.target.closest('.notification-card');
            notificationCard.classList.remove('unread');
            e.target.remove();
        });
    });
}
