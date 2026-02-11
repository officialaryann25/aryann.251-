/* ========================================
   IceWorld - Main JavaScript
   Mobile Menu, ScrollReveal, and Interactions
   ======================================== */

// ========================================
// Mobile Menu Toggle
// ========================================
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and times
    if (navLinks.classList.contains('active')) {
      menuBtn.classList.remove('fa-bars');
      menuBtn.classList.add('fa-times');
    } else {
      menuBtn.classList.remove('fa-times');
      menuBtn.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('fa-times');
      menuBtn.classList.add('fa-bars');
    });
  });
}

// ========================================
// Active Navigation Link
// ========================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksElements = document.querySelectorAll('#nav-links a');
  
  navLinksElements.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// Enhanced Sticky Header on Scroll
// ========================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ========================================
// Enhanced ScrollReveal Animations
// ========================================
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false,
    mobile: true,
    opacity: 0,
    scale: 0.98
  });

  // Hero animations - sequential and elegant
  sr.reveal('.hero-text', { 
    origin: 'left', 
    delay: 200,
    distance: '60px',
    duration: 1200
  });
  
  sr.reveal('.hero-image', { 
    origin: 'right', 
    delay: 400,
    distance: '60px',
    duration: 1200
  });
  
  // Section headers - fade in from bottom
  sr.reveal('.section-header', { 
    delay: 100,
    distance: '30px'
  });
  
  // Cards with elegant stagger effect
  sr.reveal('.card', { 
    interval: 150,
    distance: '30px',
    scale: 0.95
  });
  
  sr.reveal('.product-card', { 
    interval: 150,
    distance: '30px',
    scale: 0.96
  });
  
  sr.reveal('.contact-card', { 
    interval: 200,
    distance: '30px'
  });
  
  sr.reveal('.owner-card', { 
    interval: 250,
    distance: '40px'
  });
  
  // Stats with slight scale
  sr.reveal('.stat-item', { 
    interval: 120,
    scale: 0.9
  });
  
  // Forms - subtle entrance
  sr.reveal('.form-group', { 
    interval: 80,
    distance: '20px'
  });
  
  // Footer sections
  sr.reveal('.footer-section', { 
    interval: 150,
    distance: '30px'
  });
}

// ========================================
// Category Filter (Menu Page)
// ========================================
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const category = btn.dataset.category;
      
      // Filter products
      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = 'block';
          product.style.animation = 'fadeInUp 0.6s ease';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

// Initialize filter when DOM is ready
document.addEventListener('DOMContentLoaded', initCategoryFilter);

// ========================================
// Form Validation
// ========================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('.form-input, .form-textarea');
      
      inputs.forEach(input => {
        input.classList.remove('form-error', 'form-success');
        
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('form-error');
          isValid = false;
        } else if (input.type === 'email' && input.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value)) {
            input.classList.add('form-error');
            isValid = false;
          } else {
            input.classList.add('form-success');
          }
        } else if (input.value.trim()) {
          input.classList.add('form-success');
        }
      });
      
      if (isValid) {
        // Show success message - inline instead of alert
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background: #28a745; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;';
        successMsg.textContent = 'Thank you! Your message has been sent successfully.';
        form.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
          form.reset();
          inputs.forEach(input => input.classList.remove('form-success'));
        }, 3000);
      } else {
        // Show error message - inline instead of alert
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = 'background: #dc3545; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;';
        errorMsg.textContent = 'Please fill in all required fields correctly.';
        form.appendChild(errorMsg);
        
        setTimeout(() => errorMsg.remove(), 3000);
      }
    });
  });
}

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', initFormValidation);

// ========================================
// Lazy Loading Images
// ========================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ========================================
// Add to Cart Animation
// ========================================
function initAddToCart() {
  const cartBtns = document.querySelectorAll('.product-btn, .btn-cart');
  
  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.classList.contains('btn-primary')) return;
      
      e.preventDefault();
      
      // Add animation class
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 150);
      
      // Show success message
      const originalText = btn.textContent;
      btn.textContent = 'Added!';
      btn.style.background = '#28a745';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1500);
    });
  });
}

// Initialize add to cart when DOM is ready
document.addEventListener('DOMContentLoaded', initAddToCart);

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// Newsletter Form
// ========================================
function initNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input.value.trim();
      
      // Remove any existing messages
      const existingMsg = newsletterForm.querySelector('.newsletter-msg');
      if (existingMsg) existingMsg.remove();
      
      const msg = document.createElement('div');
      msg.className = 'newsletter-msg';
      msg.style.cssText = 'padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem; text-align: center; font-size: 0.9rem;';
      
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.style.background = '#28a745';
        msg.style.color = 'white';
        msg.textContent = 'Thank you for subscribing!';
        newsletterForm.appendChild(msg);
        input.value = '';
        setTimeout(() => msg.remove(), 3000);
      } else {
        msg.style.background = '#dc3545';
        msg.style.color = 'white';
        msg.textContent = 'Please enter a valid email address.';
        newsletterForm.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
      }
    });
  }
}

// Initialize newsletter when DOM is ready
document.addEventListener('DOMContentLoaded', initNewsletter);

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🍦 Welcome to IceWorld! 🍦', 'font-size: 24px; color: #ed8613; font-weight: bold;');
console.log('%cCrafting Premium Ice Cream Experiences', 'font-size: 14px; color: #767268;');

// ========================================
// Smooth Page Load Animation (CSS-based)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Remove the loading class after DOM is ready
  document.body.classList.remove('page-loading');
});

// ========================================
// Add to Cart Button Animation
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtns = document.querySelectorAll('.product-btn, [class*="btn"][class*="cart"]');
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Add animation class
      this.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Show accessible feedback
      const originalText = this.textContent;
      const originalAriaLabel = this.getAttribute('aria-label') || originalText;
      
      this.textContent = '✓ Added!';
      this.setAttribute('aria-label', 'Item added to cart');
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = 'Item added to cart';
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        this.textContent = originalText;
        this.setAttribute('aria-label', originalAriaLabel);
        document.body.removeChild(announcement);
      }, 1500);
    });
  });
});
