/* ====================================================
   IceWorld - Main Script (script.js)
   Populates homepage sections from products.js data
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Featured Products (6 cards) ---- */
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const featured = [1, 3, 8, 13, 37, 38].map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    featuredGrid.innerHTML = featured.map(p => createProductCard(p)).join('');
    restoreWishlistState();
  }

  /* ---- Best Selling Slider ---- */
  const sliderTrack = document.getElementById('slider-track');
  if (sliderTrack) {
    const bestSelling = PRODUCTS.filter(p => p.badge === 'best').concat(
      PRODUCTS.filter(p => p.reviews > 200 && p.badge !== 'best')
    ).slice(0, 10);
    sliderTrack.innerHTML = bestSelling.map(p => createProductCard(p)).join('');

    // Slider dots
    const dotsContainer = document.getElementById('slider-dots');
    if (dotsContainer) {
      const count = Math.ceil(bestSelling.length / 3);
      dotsContainer.innerHTML = Array.from({length: count}, (_, i) =>
        `<div class="slider-dot ${i===0?'active':''}" data-idx="${i}"></div>`
      ).join('');
    }
    restoreWishlistState();
  }

  /* ---- Lazy load reveal items ---- */
  setTimeout(() => {
    if (typeof revealObserver !== 'undefined' && revealObserver) {
      document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
        revealObserver.observe(el);
      });
    }
  }, 200);
});
