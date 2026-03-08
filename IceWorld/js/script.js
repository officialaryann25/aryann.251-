/* ===================================================================
   IceWorld - Main JavaScript
   Core UI: preloader, navbar, dark mode, scroll, cursor, 3D tilt,
   animations, form validation, toast notifications, confetti, etc.
   =================================================================== */

'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
      initAnimations();
    }, 2200);
  } else {
    initAnimations();
  }
});

// ===== TOAST SYSTEM =====
const IceWorldToast = {
  container: null,

  init() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
    window.IceWorldToast = this;
  },

  show(message, type = 'success', duration = 3500) {
    const icons = {
      success: '🍦',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '✅'}</span>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close">×</button>
    `;

    this.container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });

    const close = toast.querySelector('.toast-close');
    close.addEventListener('click', () => this.dismiss(toast));

    const timer = setTimeout(() => this.dismiss(toast), duration);
    toast._timer = timer;

    toast.addEventListener('mouseenter', () => clearTimeout(toast._timer));
    toast.addEventListener('mouseleave', () => {
      toast._timer = setTimeout(() => this.dismiss(toast), 1500);
    });

    return toast;
  },

  dismiss(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }
};

// ===== NAVBAR =====
const Navbar = {
  el: null,
  hamburger: null,
  mobileMenu: null,
  overlay: null,
  isOpen: false,

  init() {
    this.el = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.overlay = document.querySelector('.menu-overlay');

    if (!this.el) return;

    // Scroll listener
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll();

    // Hamburger
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobile());
    }

    // Overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobile());
    }

    // Close on nav link click
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => this.closeMobile());
    });

    // Active link
    this.setActiveLink();
  },

  onScroll() {
    if (!this.el) return;
    if (window.scrollY > 50) {
      this.el.classList.add('scrolled');
    } else {
      this.el.classList.remove('scrolled');
    }
  },

  toggleMobile() {
    this.isOpen ? this.closeMobile() : this.openMobile();
  },

  openMobile() {
    this.isOpen = true;
    if (this.hamburger) this.hamburger.classList.add('active');
    if (this.mobileMenu) this.mobileMenu.classList.add('open');
    if (this.overlay) this.overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  },

  closeMobile() {
    this.isOpen = false;
    if (this.hamburger) this.hamburger.classList.remove('active');
    if (this.mobileMenu) this.mobileMenu.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('visible');
    document.body.style.overflow = '';
  },

  setActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
};

// ===== DARK MODE =====
const DarkMode = {
  isDark: false,

  init() {
    const saved = localStorage.getItem('iceworld_theme');
    if (saved === 'dark') {
      this.enable(false);
    }

    document.querySelectorAll('.dark-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
      this.updateIcon(btn);
    });
  },

  toggle() {
    this.isDark ? this.disable() : this.enable();
  },

  enable(save = true) {
    this.isDark = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    if (save) localStorage.setItem('iceworld_theme', 'dark');
    document.querySelectorAll('.dark-toggle').forEach(btn => this.updateIcon(btn));
  },

  disable() {
    this.isDark = false;
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('iceworld_theme', 'light');
    document.querySelectorAll('.dark-toggle').forEach(btn => this.updateIcon(btn));
  },

  updateIcon(btn) {
    const icon = btn.querySelector('i') || btn;
    if (this.isDark) {
      btn.innerHTML = '<i class="fas fa-sun"></i>';
      btn.title = 'Switch to light mode';
    } else {
      btn.innerHTML = '<i class="fas fa-moon"></i>';
      btn.title = 'Switch to dark mode';
    }
  }
};

// ===== SCROLL PROGRESS =====
const ScrollProgress = {
  bar: null,

  init() {
    this.bar = document.getElementById('scroll-progress');
    if (!this.bar) return;
    window.addEventListener('scroll', () => this.update(), { passive: true });
  },

  update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (this.bar) this.bar.style.width = `${Math.min(100, progress)}%`;
  }
};

// ===== BACK TO TOP =====
const BackToTop = {
  btn: null,

  init() {
    this.btn = document.getElementById('back-to-top');
    if (!this.btn) return;

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  onScroll() {
    if (!this.btn) return;
    if (window.scrollY > 500) {
      this.btn.classList.add('visible');
    } else {
      this.btn.classList.remove('visible');
    }
  }
};

// ===== CUSTOM CURSOR =====
const Cursor = {
  cursor: null,
  follower: null,
  mouseX: 0,
  mouseY: 0,
  followerX: 0,
  followerY: 0,

  init() {
    if (window.matchMedia('(hover: none)').matches) return;

    this.cursor = document.querySelector('.cursor');
    this.follower = document.querySelector('.cursor-follower');

    if (!this.cursor || !this.follower) return;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.cursor.style.left = `${this.mouseX}px`;
      this.cursor.style.top = `${this.mouseY}px`;
    });

    this.animateFollower();

    // Hover effects
    document.querySelectorAll('a, button, .product-card, .category-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
        this.follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
        this.follower.classList.remove('hover');
      });
    });
  },

  animateFollower() {
    this.followerX += (this.mouseX - this.followerX) * 0.12;
    this.followerY += (this.mouseY - this.followerY) * 0.12;

    if (this.follower) {
      this.follower.style.left = `${this.followerX}px`;
      this.follower.style.top = `${this.followerY}px`;
    }

    requestAnimationFrame(() => this.animateFollower());
  }
};

// ===== SCROLL REVEAL =====
const ScrollReveal = {
  observer: null,

  init() {
    const options = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed', 'in-view');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children, .fade-up, .fade-left, .fade-right, .zoom-in, .image-reveal').forEach(el => {
      this.observer.observe(el);
    });
  }
};

// ===== COUNTER ANIMATION =====
const CounterAnimation = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter[data-target]').forEach(el => {
      observer.observe(el);
    });
  },

  animateCounter(el) {
    const target = parseInt(el.dataset.target) || 0;
    const duration = parseInt(el.dataset.duration) || 2000;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const start = performance.now();
    const startVal = 0;

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeOutCubic(progress);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = prefix + this.formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  },

  formatNumber(n) {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return n.toLocaleString();
  }
};

// ===== 3D TILT EFFECT =====
const TiltEffect = {
  init() {
    document.querySelectorAll('.tilt-card, .product-card').forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
      card.addEventListener('mouseleave', () => this.resetTilt(card));
    });
  },

  handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease';
  },

  resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.4s ease';
  }
};

// ===== PARALLAX EFFECT =====
const Parallax = {
  elements: [],

  init() {
    this.elements = Array.from(document.querySelectorAll('[data-parallax]'));
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  },

  update() {
    const scrollY = window.scrollY;
    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) - scrollY;
      const translateY = scrollY * speed;
      el.style.transform = `translateY(${translateY}px)`;
    });
  }
};

// ===== HERO SECTION FLOATING ELEMENTS =====
function initHeroFloatingElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const emojis = ['🍦', '🍧', '🍨', '🍡', '🧁', '🍰', '🎂', '🍩', '🍪'];
  const container = hero.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'floating-item';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${4 + Math.random() * 3}s;
      font-size: ${1.5 + Math.random() * 1.5}rem;
      opacity: ${0.3 + Math.random() * 0.4};
      position: absolute;
    `;
    container.appendChild(el);
  }
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 12);
  endTime.setMinutes(endTime.getMinutes() + 34);
  endTime.setSeconds(endTime.getSeconds() + 56);

  function update() {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      document.querySelectorAll('.countdown-number').forEach(el => el.textContent = '00');
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const ids = ['countdown-hours', 'countdown-minutes', 'countdown-seconds'];
    const vals = [hours, minutes, seconds];

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(vals[i]).padStart(2, '0');
    });
  }

  update();
  setInterval(update, 1000);
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input, input[type="email"]');
      const email = input ? input.value.trim() : '';

      if (!email || !isValidEmail(email)) {
        IceWorldToast.show('Please enter a valid email address', 'error');
        if (input) input.focus();
        return;
      }

      IceWorldToast.show('🎉 Thank you for subscribing! Check your inbox.', 'success');
      if (input) input.value = '';
    });
  });
}

// ===== CONTACT FORM VALIDATION =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { required: true, minLength: 2, errorEl: '#name-error' },
    email: { required: true, type: 'email', errorEl: '#email-error' },
    phone: { required: false, type: 'phone', errorEl: '#phone-error' },
    message: { required: true, minLength: 10, errorEl: '#message-error' }
  };

  // Real-time validation
  Object.keys(fields).forEach(fieldName => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input) return;

    input.addEventListener('blur', () => {
      validateField(input, fields[fieldName]);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input, fields[fieldName]);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input && !validateField(input, fields[fieldName])) {
        isValid = false;
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      setTimeout(() => {
        IceWorldToast.show('✅ Message sent successfully! We\'ll respond within 24 hours.', 'success', 5000);
        form.reset();
        form.querySelectorAll('.form-control').forEach(el => {
          el.classList.remove('success', 'error');
        });
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
        launchConfetti();
      }, 1500);
    }
  });
}

function validateField(input, rules) {
  const value = input.value.trim();
  const errorEl = rules.errorEl ? document.querySelector(rules.errorEl) : null;
  let error = '';

  if (rules.required && !value) {
    error = 'This field is required';
  } else if (value && rules.minLength && value.length < rules.minLength) {
    error = `Must be at least ${rules.minLength} characters`;
  } else if (value && rules.type === 'email' && !isValidEmail(value)) {
    error = 'Please enter a valid email address';
  } else if (value && rules.type === 'phone' && !isValidPhone(value)) {
    error = 'Please enter a valid phone number';
  }

  if (error) {
    input.classList.add('error');
    input.classList.remove('success');
    if (errorEl) {
      errorEl.textContent = error;
      errorEl.style.display = 'flex';
    }
    return false;
  } else {
    input.classList.remove('error');
    if (value) input.classList.add('success');
    if (errorEl) errorEl.style.display = 'none';
    return true;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, ''));
}

// ===== CONFETTI =====
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#ff6b9d', '#ffa07a', '#a8edea', '#fed9b7', '#e8c4f0', '#fff3a3', '#c2e9fb'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 12 + 5;
    const duration = Math.random() * 2 + 2;
    const delay = Math.random() * 0.8;

    piece.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation: confetti-fall ${duration}s ease-out ${delay}s forwards;
      transform: rotate(${Math.random() * 360}deg);
      opacity: 1;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 4000);
}

// ===== LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // Native support

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    if (img.dataset.src) observer.observe(img);
  });
}

// ===== SMOOTH SCROLL LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ===== PROMO BANNER =====
function initPromoBanner() {
  const closeBtn = document.querySelector('.promo-banner-close');
  const banner = document.querySelector('.promo-banner');
  
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.transform = 'translateY(-100%)';
      banner.style.transition = '0.3s ease';
      setTimeout(() => { banner.style.display = 'none'; }, 300);
    });
  }
}

// ===== MODAL =====
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('open');
    });
  });

  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        const modal = el.closest('.modal-overlay') || el.querySelector('.modal-overlay');
        if (modal) modal.classList.remove('open');
        // Also close any open modal-overlay
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
    });
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// ===== OFFER CODE COPY =====
function initOfferCodes() {
  document.querySelectorAll('.offer-code').forEach(code => {
    code.addEventListener('click', () => {
      const text = code.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        IceWorldToast.show(`Coupon code "${text}" copied! 🎉`, 'success');
        code.textContent = '✅ Copied!';
        setTimeout(() => { code.textContent = text; }, 2000);
      }).catch(() => {
        IceWorldToast.show(`Use code: ${text}`, 'info');
      });
    });
  });
}

// ===== BUTTON RIPPLE =====
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== ADD TO CART BUTTONS (on home/menu pages) =====
function initAddToCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.dataset.addCart;
      if (window.PRODUCTS && window.IceWorldCart) {
        const product = window.PRODUCTS.find(p => p.id === productId);
        if (product) {
          window.IceWorldCart.addItem(product);
        }
      } else {
        IceWorldToast.show('Added to cart! 🛒', 'success');
      }
    });
  });
}

// ===== WISHLIST BUTTONS =====
function initWishlistButtons() {
  document.querySelectorAll('[data-add-wishlist]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.dataset.addWishlist;
      if (window.PRODUCTS && window.IceWorldWishlist) {
        const product = window.PRODUCTS.find(p => p.id === productId);
        if (product) {
          const added = window.IceWorldWishlist.toggle(product);
          btn.classList.toggle('wishlisted', added);
          const icon = btn.querySelector('i');
          if (icon) {
            icon.classList.toggle('fas', added);
            icon.classList.toggle('far', !added);
          }
        }
      }
    });
  });
}

// ===== RATING STARS (interactive) =====
function initRatingStars() {
  document.querySelectorAll('.rating-stars-input').forEach(container => {
    const stars = container.querySelectorAll('.star-input');
    let currentRating = 0;

    stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => {
        highlightStars(stars, index);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(stars, currentRating - 1);
      });

      star.addEventListener('click', () => {
        currentRating = index + 1;
        highlightStars(stars, currentRating - 1);
        const input = container.querySelector('input[name="rating"]');
        if (input) input.value = currentRating;
      });
    });
  });
}

function highlightStars(stars, upToIndex) {
  stars.forEach((star, i) => {
    star.style.color = i <= upToIndex ? '#ffc107' : '#dee2e6';
  });
}

// ===== INITIALIZE ANIMATIONS =====
function initAnimations() {
  ScrollReveal.init();
  CounterAnimation.init();
}

// ===== MAIN INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Core UI
  IceWorldToast.init();
  Navbar.init();
  DarkMode.init();
  ScrollProgress.init();
  BackToTop.init();
  Cursor.init();

  // Interactive
  TiltEffect.init();
  Parallax.init();
  initSmoothScroll();
  initLazyLoading();
  initRipple();
  initModals();

  // Page specific
  initHeroFloatingElements();
  initCountdown();
  initNewsletterForm();
  initContactForm();
  initPromoBanner();
  initOfferCodes();
  initAddToCartButtons();
  initWishlistButtons();
  initRatingStars();

  // Body loading class
  document.body.classList.add('loading');

  // Expose globally
  window.launchConfetti = launchConfetti;
  window.IceWorldToast = IceWorldToast;
});
