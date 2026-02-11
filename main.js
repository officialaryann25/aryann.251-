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
// Sticky Header on Scroll
// ========================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.7)';
      header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
  }
});

// ========================================
// ScrollReveal Animations
// ========================================
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
  });

  // Home page animations
  sr.reveal('.hero-text', { origin: 'left', delay: 300 });
  sr.reveal('.hero-image', { origin: 'right', delay: 400 });
  
  // Section headers
  sr.reveal('.section-header', { delay: 200 });
  
  // Cards with stagger effect
  sr.reveal('.card', { interval: 200 });
  sr.reveal('.product-card', { interval: 200 });
  sr.reveal('.gallery-item', { interval: 100 });
  sr.reveal('.contact-card', { interval: 200 });
  sr.reveal('.owner-card', { interval: 300 });
  
  // Stats
  sr.reveal('.stat-item', { interval: 150 });
  
  // Forms
  sr.reveal('.form-group', { interval: 100 });
  
  // Footer
  sr.reveal('.footer-section', { interval: 200 });
}

// ========================================
// Gallery Lightbox
// ========================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;
  
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <div class="lightbox-content">
      <img src="" alt="Gallery Image">
    </div>
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  
  // Open lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

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
