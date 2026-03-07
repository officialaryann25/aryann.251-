/**
 * IceWorld – Main Script
 * Handles: cart, wishlist, search, filters, hero slider,
 * product carousel, form validation, mobile nav, smooth scroll,
 * menu tabs, product gallery, toast notifications.
 */

'use strict';

/* ═══════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════ */

function $(selector, context) {
  return (context || document).querySelector(selector);
}

function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

function showToast(message, type) {
  var existing = $('.toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'toast ' + (type || '');
  var icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
  toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add('show'); });
  });
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 350);
  }, 3000);
}

/* ═══════════════════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════════════════ */
$$('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

/* ═══════════════════════════════════════════════
   CART
═══════════════════════════════════════════════ */

var Cart = (function () {
  var STORAGE_KEY = 'iceworld_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function count() {
    return load().reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function add(id, name, price, image) {
    var items = load();
    var existing = items.find(function (i) { return i.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ id: id, name: name, price: parseFloat(price), image: image, qty: 1 });
    }
    save(items);
    updateBadges();
    showToast(name + ' added to cart!', 'success');
  }

  function remove(id) {
    var items = load().filter(function (i) { return i.id !== id; });
    save(items);
    updateBadges();
    renderCartPage();
  }

  function updateQty(id, delta) {
    var items = load();
    var item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    save(items);
    updateBadges();
    renderCartPage();
  }

  function clear() {
    save([]);
    updateBadges();
    renderCartPage();
  }

  function subtotal() {
    return load().reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  return { load: load, save: save, count: count, add: add, remove: remove, updateQty: updateQty, clear: clear, subtotal: subtotal };
})();

/* Cart badge update */
function updateBadges() {
  $$('#cartCount').forEach(function (el) { el.textContent = Cart.count(); });
}

/* Attach add-to-cart buttons */
function bindAddToCart() {
  $$('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id = btn.dataset.id;
      var name = btn.dataset.name;
      var price = btn.dataset.price;
      var image = btn.dataset.image || '';
      Cart.add(id, name, price, image);
    });
  });
}

/* Render cart page */
function renderCartPage() {
  var list = $('#cartItemsList');
  var emptyMsg = $('#cartEmpty');
  var couponSection = $('#couponSection');
  var continueBtn = $('.cart-continue');
  if (!list) return;

  var items = Cart.load();
  var count = items.length;

  if ($('#cartItemsCount')) $('#cartItemsCount').textContent = Cart.count();

  if (count === 0) {
    list.innerHTML = '';
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    if (couponSection) couponSection.classList.add('hidden');
    if (continueBtn) continueBtn.style.display = 'none';
  } else {
    if (emptyMsg) emptyMsg.classList.add('hidden');
    if (couponSection) couponSection.classList.remove('hidden');
    if (continueBtn) continueBtn.style.display = '';

    list.innerHTML = items.map(function (item) {
      return '<div class="cart-item">' +
        '<div class="cart-item__image"><img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '" /></div>' +
        '<div class="cart-item__details"><div class="cart-item__name">' + escapeHtml(item.name) + '</div>' +
        '<div class="cart-item__price">$' + item.price.toFixed(2) + ' each</div></div>' +
        '<div class="cart-item__qty">' +
        '<button class="cart-qty-btn" data-id="' + escapeHtml(item.id) + '" data-delta="-1">–</button>' +
        '<span>' + item.qty + '</span>' +
        '<button class="cart-qty-btn" data-id="' + escapeHtml(item.id) + '" data-delta="1">+</button>' +
        '</div>' +
        '<div class="cart-item__total">$' + (item.price * item.qty).toFixed(2) + '</div>' +
        '<button class="cart-item__remove cart-remove-btn" data-id="' + escapeHtml(item.id) + '" aria-label="Remove"><i class="fas fa-trash-alt"></i></button>' +
        '</div>';
    }).join('');

    $$('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        Cart.updateQty(btn.dataset.id, parseInt(btn.dataset.delta, 10));
      });
    });
    $$('.cart-remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { Cart.remove(btn.dataset.id); });
    });
  }
  updateSummary();
}

/* Escape HTML to prevent XSS */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

var appliedDiscount = 0;

function updateSummary() {
  var sub = Cart.subtotal();
  var delivery = sub >= 30 ? 0 : (sub > 0 ? 3.99 : 0);
  var total = sub - appliedDiscount + delivery;
  var amountToFree = Math.max(0, 30 - sub);

  if ($('#summarySubtotal')) $('#summarySubtotal').textContent = '$' + sub.toFixed(2);
  if ($('#summaryDiscount')) $('#summaryDiscount').textContent = '-$' + appliedDiscount.toFixed(2);
  if ($('#summaryDelivery')) $('#summaryDelivery').textContent = delivery === 0 && sub > 0 ? 'FREE' : '$' + delivery.toFixed(2);
  if ($('#summaryTotal')) $('#summaryTotal').textContent = '$' + Math.max(0, total).toFixed(2);

  var deliveryMsg = $('#freeDeliveryMsg');
  if (deliveryMsg) {
    if (sub >= 30) {
      deliveryMsg.innerHTML = '<strong>🎉 You qualify for free delivery!</strong>';
    } else {
      deliveryMsg.innerHTML = 'Add <strong>$' + amountToFree.toFixed(2) + '</strong> more for free delivery!';
    }
  }
  if ($('#amountToFreeDelivery')) $('#amountToFreeDelivery').textContent = '$' + amountToFree.toFixed(2);
}

/* Coupon code */
var COUPONS = { 'SWEET10': 0.10, 'ICE20': 0.20, 'SUMMER15': 0.15 };

var couponForm = $('#couponForm');
if (couponForm) {
  couponForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#couponInput');
    var msg = $('#couponMsg');
    var code = (input.value || '').trim().toUpperCase();
    if (COUPONS[code]) {
      var discount = Cart.subtotal() * COUPONS[code];
      appliedDiscount = discount;
      if (msg) { msg.textContent = '✓ Code applied! ' + (COUPONS[code] * 100) + '% off.'; msg.className = 'coupon-msg success'; }
      updateSummary();
    } else {
      appliedDiscount = 0;
      if (msg) { msg.textContent = '✗ Invalid or expired code.'; msg.className = 'coupon-msg error'; }
      updateSummary();
    }
  });
}

var clearCartBtn = $('#clearCart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', function () {
    if (confirm('Remove all items from your cart?')) { Cart.clear(); }
  });
}

/* ═══════════════════════════════════════════════
   WISHLIST
═══════════════════════════════════════════════ */

var Wishlist = (function () {
  var KEY = 'iceworld_wishlist';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(items) { localStorage.setItem(KEY, JSON.stringify(items)); }
  function has(id) { return load().indexOf(String(id)) !== -1; }
  function toggle(id) {
    var items = load();
    var idx = items.indexOf(String(id));
    if (idx === -1) { items.push(String(id)); save(items); return true; }
    items.splice(idx, 1); save(items); return false;
  }
  function count() { return load().length; }
  return { has: has, toggle: toggle, count: count };
})();

function updateWishlistBadges() {
  $$('#wishlistCount').forEach(function (el) { el.textContent = Wishlist.count(); });
}

function syncWishlistButtons() {
  $$('.wishlist-toggle').forEach(function (btn) {
    var id = btn.dataset.id;
    if (Wishlist.has(id)) { btn.classList.add('wishlisted'); }
    else { btn.classList.remove('wishlisted'); }
  });
}

function bindWishlistToggles() {
  $$('.wishlist-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id = btn.dataset.id;
      var added = Wishlist.toggle(id);
      if (added) { btn.classList.add('wishlisted'); showToast('Added to wishlist!', 'success'); }
      else { btn.classList.remove('wishlisted'); showToast('Removed from wishlist.', ''); }
      updateWishlistBadges();
    });
  });
}

/* ═══════════════════════════════════════════════
   MOBILE NAVIGATION
═══════════════════════════════════════════════ */

(function () {
  var hamburger = $('#hamburger');
  var nav = $('#nav');
  if (!hamburger || !nav) return;

  // Overlay
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    nav.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  $$('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

/* ═══════════════════════════════════════════════
   STICKY HEADER
═══════════════════════════════════════════════ */

(function () {
  var header = $('#header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════
   SEARCH TOGGLE
═══════════════════════════════════════════════ */

(function () {
  var toggle = $('#searchToggle');
  var bar = $('#searchBar');
  var input = $('#searchInput');
  if (!toggle || !bar) return;

  toggle.addEventListener('click', function () {
    bar.classList.toggle('open');
    if (bar.classList.contains('open') && input) { input.focus(); }
  });

  var btn = $('#searchBtn');
  if (btn && input) {
    btn.addEventListener('click', runSearch);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') runSearch(); });
  }

  function runSearch() {
    var q = (input ? input.value : '').trim();
    if (!q) return;
    // Filter shop products if on shop page
    filterProducts();
  }
})();

/* ═══════════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════════ */

(function () {
  var slides = $$('.hero__slide');
  var dots = $$('.hero__dot');
  if (!slides.length) return;

  var current = 0;
  var total = slides.length;
  var autoTimer = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function startAuto() { autoTimer = setInterval(function () { goTo(current + 1); }, 5000); }
  function stopAuto() { clearInterval(autoTimer); }

  var prev = $('#heroPrev');
  var next = $('#heroNext');
  if (prev) prev.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
  });

  startAuto();
})();

/* ═══════════════════════════════════════════════
   PRODUCT CAROUSEL
═══════════════════════════════════════════════ */

(function () {
  var track = $('#carouselTrack');
  var prevBtn = $('#carouselPrev');
  var nextBtn = $('#carouselNext');
  if (!track || !prevBtn || !nextBtn) return;

  var cards = $$('.product-card', track);
  var visibleCount = getVisible();
  var position = 0;

  function getVisible() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  function update() {
    visibleCount = getVisible();
    var max = Math.max(0, cards.length - visibleCount);
    position = Math.min(position, max);
    var pct = (100 / visibleCount) * position;
    track.style.transform = 'translateX(-' + pct + '%)';
    prevBtn.disabled = position === 0;
    nextBtn.disabled = position >= max;
  }

  prevBtn.addEventListener('click', function () { position = Math.max(0, position - 1); update(); });
  nextBtn.addEventListener('click', function () {
    var max = Math.max(0, cards.length - getVisible());
    position = Math.min(max, position + 1);
    update();
  });

  window.addEventListener('resize', update, { passive: true });
  update();
})();

/* ═══════════════════════════════════════════════
   MENU TABS (Home page)
═══════════════════════════════════════════════ */

(function () {
  var tabs = $$('.menu__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.dataset.tab;
      $$('.menu__panel').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === 'tab-' + target);
      });
    });
  });
})();

/* ═══════════════════════════════════════════════
   PRODUCT PAGE – GALLERY THUMBNAILS & QTY
═══════════════════════════════════════════════ */

/* Thumbnail switcher (inline onclick also supported) */
function changeMainImage(thumb) {
  var mainImg = $('#mainProductImage');
  if (mainImg && thumb.dataset.src) {
    mainImg.src = thumb.dataset.src;
  }
  $$('.thumb').forEach(function (t) { t.classList.remove('active'); });
  thumb.classList.add('active');
}

(function () {
  var minusBtn = $('#qtyMinus');
  var plusBtn  = $('#qtyPlus');
  var qtyInput = $('#quantity');
  if (!minusBtn || !plusBtn || !qtyInput) return;

  minusBtn.addEventListener('click', function () {
    var v = parseInt(qtyInput.value, 10);
    if (v > 1) qtyInput.value = v - 1;
  });
  plusBtn.addEventListener('click', function () {
    var v = parseInt(qtyInput.value, 10);
    var max = parseInt(qtyInput.max, 10) || 20;
    if (v < max) qtyInput.value = v + 1;
  });
})();

/* Product detail tab switching */
(function () {
  var tabBtns = $$('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.dataset.tab;
      $$('.tab-panel').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === 'tab-' + target);
      });
    });
  });
})();

/* Password toggle */
(function () {
  $$('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input');
      if (!input) return;
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      var icon = btn.querySelector('i');
      if (icon) { icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye'; }
    });
  });
})();

/* ═══════════════════════════════════════════════
   SHOP FILTERS
═══════════════════════════════════════════════ */

function filterProducts() {
  var cards = $$('.product-card', $('#productsGrid'));
  if (!cards.length) return;

  var categoryRadio = $('input[name="category"]:checked');
  var ratingRadio = $('input[name="rating"]:checked');
  var priceRange = $('#priceRange');
  var searchInput = $('#searchInput');
  var sortBy = $('#sortBy');

  var catFilter = categoryRadio ? categoryRadio.value : 'all';
  var ratingFilter = ratingRadio ? parseFloat(ratingRadio.value) : 0;
  var maxPrice = priceRange ? parseFloat(priceRange.value) : 9999;
  var search = searchInput ? searchInput.value.trim().toLowerCase() : '';
  var sort = sortBy ? sortBy.value : 'popular';

  var visible = [];
  cards.forEach(function (card) {
    var cat = card.dataset.category || '';
    var price = parseFloat(card.dataset.price) || 0;
    var rating = parseFloat(card.dataset.rating) || 0;
    var name = (card.dataset.name || '').toLowerCase();

    var matchCat = catFilter === 'all' || cat === catFilter;
    var matchPrice = price <= maxPrice;
    var matchRating = rating >= ratingFilter;
    var matchSearch = !search || name.includes(search);

    var show = matchCat && matchPrice && matchRating && matchSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible.push(card);
  });

  // Sort
  var grid = $('#productsGrid');
  if (grid && sort !== 'popular') {
    visible.sort(function (a, b) {
      if (sort === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      if (sort === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
      if (sort === 'rating') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      if (sort === 'newest') return parseFloat(b.dataset.id) - parseFloat(a.dataset.id);
      return 0;
    });
    visible.forEach(function (card) { grid.appendChild(card); });
  }

  var count = visible.length;
  if ($('#resultsCount')) $('#resultsCount').textContent = count;
  var noResults = $('#noResults');
  if (noResults) noResults.classList.toggle('hidden', count > 0);
}

(function () {
  // Category URL param
  var params = new URLSearchParams(window.location.search);
  var catParam = params.get('category');
  if (catParam) {
    var radio = $('input[name="category"][value="' + catParam + '"]');
    if (radio) radio.checked = true;
  }

  $$('input[name="category"]').forEach(function (r) { r.addEventListener('change', filterProducts); });
  $$('input[name="rating"]').forEach(function (r) { r.addEventListener('change', filterProducts); });

  var priceRange = $('#priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', function () {
      if ($('#priceRangeValue')) $('#priceRangeValue').textContent = '$' + priceRange.value;
      filterProducts();
    });
  }

  var sortBy = $('#sortBy');
  if (sortBy) sortBy.addEventListener('change', filterProducts);

  var applyFilters = $('#applyFilters');
  if (applyFilters) applyFilters.addEventListener('click', filterProducts);

  var resetFilters = $('#resetFilters');
  if (resetFilters) {
    resetFilters.addEventListener('click', function () {
      $$('input[name="category"]').forEach(function (r) { r.checked = r.value === 'all'; });
      $$('input[name="rating"]').forEach(function (r) { r.checked = r.value === '0'; });
      if (priceRange) { priceRange.value = 50; if ($('#priceRangeValue')) $('#priceRangeValue').textContent = '$50'; }
      if ($('#searchInput')) $('#searchInput').value = '';
      filterProducts();
    });
  }

  var clearFilters = $('#clearFilters');
  if (clearFilters) clearFilters.addEventListener('click', function () { $('#resetFilters') && $('#resetFilters').click(); });

  // View toggle
  $$('.view-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.view-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var grid = $('#productsGrid');
      if (grid) grid.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });

  // Initial filter from URL
  if (catParam) filterProducts();
})();

/* ═══════════════════════════════════════════════
   FORM VALIDATION – LOGIN
═══════════════════════════════════════════════ */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(errorId, message) {
  var el = $('#' + errorId);
  if (el) el.textContent = message;
}

function clearError(errorId) {
  var el = $('#' + errorId);
  if (el) el.textContent = '';
}

/* Auth tabs */
(function () {
  var authTabs = $$('.auth-tab');
  authTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      authTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.dataset.form;
      $$('.auth-form-wrapper').forEach(function (form) {
        form.classList.toggle('active', form.id === target + 'Form');
      });
    });
  });

  // Switch links
  var toSignup = $('.switch-to-signup');
  var toLogin = $('.switch-to-login');
  if (toSignup) toSignup.addEventListener('click', function (e) {
    e.preventDefault();
    var tab = $('[data-form="signup"]');
    if (tab) tab.click();
  });
  if (toLogin) toLogin.addEventListener('click', function (e) {
    e.preventDefault();
    var tab = $('[data-form="login"]');
    if (tab) tab.click();
  });
})();

/* Login form validation */
var loginFormEl = $('#loginFormEl');
if (loginFormEl) {
  loginFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = ($('#loginEmail') || {}).value || '';
    var password = ($('#loginPassword') || {}).value || '';
    var valid = true;

    if (!email || !validateEmail(email)) {
      setError('loginEmailError', 'Please enter a valid email address.');
      valid = false;
    } else { clearError('loginEmailError'); }

    if (!password || password.length < 6) {
      setError('loginPasswordError', 'Password must be at least 6 characters.');
      valid = false;
    } else { clearError('loginPasswordError'); }

    if (valid) {
      showToast('Login successful! Welcome back.', 'success');
      setTimeout(function () { window.location.href = 'index.html'; }, 1500);
    }
  });
}

/* Signup form validation */
var signupFormEl = $('#signupFormEl');
if (signupFormEl) {
  signupFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstName = ($('#signupFirstName') || {}).value || '';
    var lastName  = ($('#signupLastName') || {}).value || '';
    var email     = ($('#signupEmail') || {}).value || '';
    var password  = ($('#signupPassword') || {}).value || '';
    var confirm   = ($('#signupConfirm') || {}).value || '';
    var agreed    = ($('#agreeTerms') || {}).checked;
    var valid = true;

    if (!firstName.trim()) { setError('signupFirstNameError', 'First name is required.'); valid = false; }
    else { clearError('signupFirstNameError'); }

    if (!lastName.trim()) { setError('signupLastNameError', 'Last name is required.'); valid = false; }
    else { clearError('signupLastNameError'); }

    if (!validateEmail(email)) { setError('signupEmailError', 'Please enter a valid email address.'); valid = false; }
    else { clearError('signupEmailError'); }

    if (password.length < 8) { setError('signupPasswordError', 'Password must be at least 8 characters.'); valid = false; }
    else { clearError('signupPasswordError'); }

    if (password !== confirm) { setError('signupConfirmError', 'Passwords do not match.'); valid = false; }
    else { clearError('signupConfirmError'); }

    if (!agreed) { setError('agreeTermsError', 'You must agree to the Terms & Conditions.'); valid = false; }
    else { clearError('agreeTermsError'); }

    if (valid) {
      showToast('Account created! Welcome to IceWorld.', 'success');
      setTimeout(function () { window.location.href = 'index.html'; }, 1500);
    }
  });
}

/* ═══════════════════════════════════════════════
   FORM VALIDATION – CONTACT
═══════════════════════════════════════════════ */

var contactFormEl = $('#contactFormEl');
if (contactFormEl) {
  contactFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = ($('#contactName') || {}).value || '';
    var email   = ($('#contactEmail') || {}).value || '';
    var subject = ($('#contactSubject') || {}).value || '';
    var message = ($('#contactMessage') || {}).value || '';
    var valid = true;

    if (!name.trim()) { setError('contactNameError', 'Please enter your name.'); valid = false; }
    else { clearError('contactNameError'); }

    if (!validateEmail(email)) { setError('contactEmailError', 'Please enter a valid email address.'); valid = false; }
    else { clearError('contactEmailError'); }

    if (!subject) { setError('contactSubjectError', 'Please select a subject.'); valid = false; }
    else { clearError('contactSubjectError'); }

    if (message.trim().length < 10) { setError('contactMessageError', 'Message must be at least 10 characters.'); valid = false; }
    else { clearError('contactMessageError'); }

    if (valid) {
      var success = $('#contactSuccess');
      if (success) success.classList.remove('hidden');
      contactFormEl.reset();
      showToast('Message sent! We will get back to you soon.', 'success');
    }
  });
}

/* Newsletter form */
var newsletterForm = $('#newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = $('#newsletterEmail');
    var email = emailInput ? emailInput.value.trim() : '';
    if (validateEmail(email)) {
      showToast('Subscribed! Check your inbox for your 15% off code.', 'success');
      newsletterForm.reset();
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  });
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════ */

document.addEventListener('click', function (e) {
  var target = e.target.closest('a[href^="#"]');
  if (!target) return;
  var id = target.getAttribute('href').slice(1);
  if (!id) return;
  var dest = document.getElementById(id);
  if (!dest) return;
  e.preventDefault();
  dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVER – ANIMATION ON SCROLL
═══════════════════════════════════════════════ */

(function () {
  if (!('IntersectionObserver' in window)) return;
  var elements = $$('.product-card, .category-card, .offer-card, .review-card, .value-card, .team-card, .stat-card, .contact-info-card');
  elements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  elements.forEach(function (el) { observer.observe(el); });
})();

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

(function init() {
  updateBadges();
  updateWishlistBadges();
  syncWishlistButtons();
  bindAddToCart();
  bindWishlistToggles();
  renderCartPage();

  // Initial filter run for shop page
  if ($('#productsGrid')) filterProducts();
})();
