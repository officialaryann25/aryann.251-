/* ===================================================================
   IceWorld - Slider JavaScript
   Hero slider + product carousel
   =================================================================== */

'use strict';

// ===== HERO SLIDER =====
class HeroSlider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.dots = this.container.querySelectorAll('.slider-dot');
    this.prevBtn = this.container.querySelector('.slider-arrow.prev');
    this.nextBtn = this.container.querySelector('.slider-arrow.next');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    this.isAnimating = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.totalSlides > 0) {
      this.init();
    }
  }

  init() {
    // Show first slide
    this.goTo(0);

    // Bind events
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Touch events
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.play());

    // Start autoplay
    this.play();
  }

  goTo(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.isAnimating = true;

    // Remove active from current
    if (this.slides[this.currentIndex]) {
      this.slides[this.currentIndex].classList.remove('active');
      this.slides[this.currentIndex].classList.add('prev');
    }

    this.currentIndex = (index + this.totalSlides) % this.totalSlides;

    // Add active to new
    if (this.slides[this.currentIndex]) {
      this.slides[this.currentIndex].classList.remove('prev');
      this.slides[this.currentIndex].classList.add('active');
    }

    // Remove prev class after transition
    setTimeout(() => {
      this.slides.forEach(slide => slide.classList.remove('prev'));
      this.isAnimating = false;
    }, 800);

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });

    // Animate slide content
    this.animateSlideContent();
  }

  next() {
    this.goTo(this.currentIndex + 1);
    this.resetAutoPlay();
  }

  prev() {
    this.goTo(this.currentIndex - 1);
    this.resetAutoPlay();
  }

  play() {
    this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
  }

  pause() {
    clearInterval(this.autoPlayInterval);
  }

  resetAutoPlay() {
    this.pause();
    this.play();
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.next();
      else this.prev();
    }
  }

  animateSlideContent() {
    const activeSlide = this.slides[this.currentIndex];
    if (!activeSlide) return;

    const elements = activeSlide.querySelectorAll('.animate-fadeInUp, .animate-fadeInDown, .animate-slideInLeft');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150 + 100);
    });
  }
}

// ===== PRODUCT CAROUSEL =====
class ProductCarousel {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.track = this.container.querySelector('.carousel-track');
    this.items = this.container.querySelectorAll('.carousel-item');
    this.prevBtn = this.container.querySelector('.carousel-btn.prev-btn');
    this.nextBtn = this.container.querySelector('.carousel-btn.next-btn');

    this.options = {
      itemsVisible: options.itemsVisible || 4,
      gap: options.gap || 24,
      autoPlay: options.autoPlay || false,
      autoPlayDelay: options.autoPlayDelay || 3000,
      loop: options.loop !== false,
      ...options
    };

    this.currentIndex = 0;
    this.totalItems = this.items.length;
    this.maxIndex = Math.max(0, this.totalItems - this.options.itemsVisible);
    this.autoPlayInterval = null;
    this.isDragging = false;
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;

    this.init();
  }

  init() {
    this.updateItemsVisible();
    this.updateCarousel();

    // Prev/Next buttons
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    // Touch events
    if (this.track) {
      this.track.addEventListener('touchstart', (e) => this.dragStart(e.touches[0].clientX), { passive: true });
      this.track.addEventListener('touchmove', (e) => this.dragMove(e.touches[0].clientX), { passive: true });
      this.track.addEventListener('touchend', () => this.dragEnd());

      // Mouse drag
      this.track.addEventListener('mousedown', (e) => this.dragStart(e.clientX));
      this.track.addEventListener('mousemove', (e) => { if (this.isDragging) this.dragMove(e.clientX); });
      this.track.addEventListener('mouseup', () => this.dragEnd());
      this.track.addEventListener('mouseleave', () => { if (this.isDragging) this.dragEnd(); });
    }

    // Resize handler
    window.addEventListener('resize', () => {
      this.updateItemsVisible();
      this.updateCarousel();
    });

    // Autoplay
    if (this.options.autoPlay) {
      this.startAutoPlay();
      if (this.container) {
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
      }
    }
  }

  updateItemsVisible() {
    const width = window.innerWidth;
    if (width < 576) this.options.itemsVisible = 1;
    else if (width < 768) this.options.itemsVisible = 2;
    else if (width < 992) this.options.itemsVisible = 2;
    else if (width < 1200) this.options.itemsVisible = 3;
    else this.options.itemsVisible = 4;

    this.maxIndex = Math.max(0, this.totalItems - this.options.itemsVisible);
    if (this.currentIndex > this.maxIndex) this.currentIndex = this.maxIndex;
  }

  next() {
    if (this.options.loop && this.currentIndex >= this.maxIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = Math.min(this.currentIndex + 1, this.maxIndex);
    }
    this.updateCarousel();
  }

  prev() {
    if (this.options.loop && this.currentIndex <= 0) {
      this.currentIndex = this.maxIndex;
    } else {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
    this.updateCarousel();
  }

  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateCarousel();
  }

  updateCarousel() {
    if (!this.track) return;

    const itemWidth = this.getItemWidth();
    const translateX = -(this.currentIndex * (itemWidth + this.options.gap));
    this.track.style.transform = `translateX(${translateX}px)`;

    // Update button states
    if (this.prevBtn) {
      this.prevBtn.style.opacity = (this.currentIndex === 0 && !this.options.loop) ? '0.5' : '1';
      this.prevBtn.style.pointerEvents = (this.currentIndex === 0 && !this.options.loop) ? 'none' : 'auto';
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = (this.currentIndex >= this.maxIndex && !this.options.loop) ? '0.5' : '1';
      this.nextBtn.style.pointerEvents = (this.currentIndex >= this.maxIndex && !this.options.loop) ? 'none' : 'auto';
    }
  }

  getItemWidth() {
    if (this.items[0]) {
      return this.items[0].offsetWidth;
    }
    return 0;
  }

  dragStart(x) {
    this.isDragging = true;
    this.startX = x;
    if (this.track) this.track.style.transition = 'none';
  }

  dragMove(x) {
    if (!this.isDragging) return;
    const diff = x - this.startX;
    const itemWidth = this.getItemWidth();
    const baseTranslate = -(this.currentIndex * (itemWidth + this.options.gap));
    if (this.track) {
      this.track.style.transform = `translateX(${baseTranslate + diff}px)`;
    }
  }

  dragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.track) this.track.style.transition = 'transform 0.5s ease';
    this.updateCarousel();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), this.options.autoPlayDelay);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// ===== REVIEWS CAROUSEL =====
class ReviewsCarousel extends ProductCarousel {
  constructor() {
    super('.reviews-carousel', {
      itemsVisible: 3,
      autoPlay: true,
      autoPlayDelay: 4000,
      loop: true
    });
  }
}

// ===== AUTO MARQUEE =====
class AutoMarquee {
  constructor(selector) {
    this.track = document.querySelector(selector);
    if (!this.track) return;
    this.init();
  }

  init() {
    // Clone items for seamless loop
    const items = this.track.innerHTML;
    this.track.innerHTML = items + items;
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  // Hero slider
  window.heroSlider = new HeroSlider('.hero-slider-container');

  // Bestsellers carousel
  window.bestsellersCarousel = new ProductCarousel('.bestsellers-carousel', {
    itemsVisible: 4,
    autoPlay: true,
    autoPlayDelay: 3500,
    loop: true
  });

  // Related products carousel
  window.relatedCarousel = new ProductCarousel('.related-carousel', {
    itemsVisible: 4,
    loop: true
  });

  // Reviews carousel
  window.reviewsCarousel = new ProductCarousel('.reviews-carousel-container', {
    itemsVisible: 3,
    autoPlay: true,
    autoPlayDelay: 4000,
    loop: true
  });

  // Marquee
  window.marquee = new AutoMarquee('.marquee-track');
});
