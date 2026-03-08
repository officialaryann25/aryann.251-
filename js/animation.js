/* ====================================================
   IceWorld - Animation Engine (animation.js)
   ==================================================== */

/* ---- Scroll Progress Bar ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
}

/* ---- Scroll Reveal Observer ---- */
let revealObserver;
function initRevealObserver() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ---- Navbar Scroll Effect ---- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ---- Scroll To Top ---- */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- 3D Mouse Parallax on Hero ---- */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const floatingItems = document.querySelectorAll('.floating-item');
  const mainImg = document.querySelector('.hero-main-img');
  if (!hero || floatingItems.length === 0) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / rect.width;
    const dy   = (e.clientY - cy) / rect.height;

    floatingItems.forEach((item, i) => {
      const depth  = (i % 3 + 1) * 8;
      const moveX  = dx * depth;
      const moveY  = dy * depth;
      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    if (mainImg) {
      const rx = dy * 12;
      const ry = -dx * 12;
      mainImg.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(var(--float-offset, 0))`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    floatingItems.forEach(item => {
      item.style.transform = '';
    });
    if (mainImg) mainImg.style.transform = '';
  });
}

/* ---- Tilt Card Effect ---- */
function initTiltCards() {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const inCard = (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      );
      if (inCard) {
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const rx = ((e.clientY - cy) / (rect.height / 2)) * 4;
        const ry = -((e.clientX - cx) / (rect.width  / 2)) * 4;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

/* ---- Counter Animation ---- */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target   = parseInt(el.dataset.count);
    const duration = 2000;
    const start    = performance.now();
    const suffix   = el.dataset.suffix || '';

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOutQuart(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

/* ---- Particle Background (light) ---- */
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const emojis = ['🍦', '🍨', '🍧', '🍫', '🌟', '✨', '🎀', '🍓'];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle parallax-layer';
    p.style.cssText = `
      position:absolute;
      font-size:${Math.random() * 1.5 + 0.8}rem;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      opacity:${Math.random() * 0.15 + 0.05};
      animation: floatRandom ${Math.random()*4+4}s ease-in-out infinite;
      animation-delay:${Math.random()*3}s;
      pointer-events:none;
      z-index:0;
    `;
    p.textContent = emojis[i % emojis.length];
    hero.appendChild(p);
  }
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---- Counter trigger on scroll ---- */
function initCounterObserver() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounters();
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(statsEl);
}

/* ---- Loader Hide ---- */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }
}

/* ---- Mobile Nav Toggle ---- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }
  });
}

/* ---- Active Nav Link ---- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || href.includes(path))) {
      link.classList.add('active');
    }
  });
}

/* ---- Auto Slider ---- */
function initAutoSlider() {
  const track  = document.getElementById('slider-track');
  if (!track) return;
  let current  = 0;
  const items  = track.children;
  const total  = items.length;
  if (total === 0) return;

  const itemW  = () => items[0].offsetWidth + 24; // gap

  function slide(dir) {
    const visible = Math.floor(track.parentElement.offsetWidth / itemW());
    const max     = Math.max(0, total - visible);
    current = Math.min(Math.max(current + dir, 0), max);
    track.style.transform = `translateX(-${current * itemW()}px)`;
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  document.getElementById('slider-prev')?.addEventListener('click', () => slide(-1));
  document.getElementById('slider-next')?.addEventListener('click', () => slide(+1));
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      track.style.transform = `translateX(-${current * itemW()}px)`;
      updateDots();
    });
  });

  // Auto slide every 4s
  let autoTimer = setInterval(() => {
    const visible = Math.floor(track.parentElement.offsetWidth / itemW());
    const max     = Math.max(0, total - visible);
    current = (current + 1) > max ? 0 : current + 1;
    track.style.transform = `translateX(-${current * itemW()}px)`;
    updateDots();
  }, 4000);

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => {
      const visible = Math.floor(track.parentElement.offsetWidth / itemW());
      const max     = Math.max(0, total - visible);
      current = (current + 1) > max ? 0 : current + 1;
      track.style.transform = `translateX(-${current * itemW()}px)`;
      updateDots();
    }, 4000);
  });
}

/* ---- Gallery Hover Effect ---- */
function initGallery() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05)';
      item.style.zIndex = '10';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.zIndex = '';
    });
  });
}

/* ---- Ripple Effect for Buttons ---- */
function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-ripple');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--ry', `${e.clientY - rect.top}px`);
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.textContent = '⏳ Sending…';
      btn.disabled = true;
    }
    setTimeout(() => {
      showToast('🎉 Message sent! We will get back to you soon.', 'success');
      form.reset();
      if (btn) {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    }, 1500);
  });
}

/* ---- Newsletter Form ---- */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('🍦 Subscribed! Sweet deals coming your way.', 'success');
        input.value = '';
      }
    });
  });
}

/* ---- Init All ---- */
document.addEventListener('DOMContentLoaded', () => {
  hideLoader();
  initScrollProgress();
  initRevealObserver();
  initNavbarScroll();
  initScrollTop();
  initHeroParallax();
  initTiltCards();
  initCounterObserver();
  initSmoothScroll();
  initParticles();
  initMobileNav();
  initActiveNav();
  initAutoSlider();
  initGallery();
  initRipple();
  initContactForm();
  initNewsletter();
});
