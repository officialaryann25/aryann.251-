/* ====================================================
   IceWorld - Products Database
   Shared across all JS files
   ==================================================== */

/* Resolve image base path: root pages vs pages/ sub-directory */
const IMG_BASE = (function() {
  try {
    return window.location.pathname.includes('/pages/') ? '../images/' : 'images/';
  } catch(e) { return 'images/'; }
}());

const PRODUCTS = [
  // Classic Ice Cream
  { id:1,  name:"Vanilla Dream",        category:"classic",  price:149, oldPrice:179, rating:4.8, reviews:245, emoji:"🍦", badge:"",      image:"classic/vanilla.png",          desc:"Rich Madagascar vanilla with creamy texture",       tags:["vanilla","classic","sweet"] },
  { id:2,  name:"Strawberry Delight",   category:"classic",  price:159, oldPrice:189, rating:4.7, reviews:198, emoji:"🍓", badge:"best",  image:"classic/strawberry.png",        desc:"Fresh strawberry chunks in premium cream",          tags:["strawberry","fruit","classic"] },
  { id:3,  name:"Chocolate Fudge",      category:"classic",  price:169, oldPrice:199, rating:4.9, reviews:312, emoji:"🍫", badge:"best",  image:"classic/chocolate.png",         desc:"Dark Belgian chocolate with fudge swirls",         tags:["chocolate","fudge","classic"] },
  { id:4,  name:"Mango Magic",          category:"classic",  price:159, oldPrice:189, rating:4.6, reviews:167, emoji:"🥭", badge:"new",   image:"classic/mango.png",             desc:"Alphonso mango with a tropical twist",             tags:["mango","tropical","fruit"] },
  { id:5,  name:"Blueberry Cream",      category:"classic",  price:169, oldPrice:199, rating:4.5, reviews:143, emoji:"🫐", badge:"",      image:"classic/blueberry.png",         desc:"Wild blueberries in silky vanilla cream",           tags:["blueberry","fruit","cream"] },
  { id:6,  name:"Caramel Swirl",        category:"classic",  price:179, oldPrice:209, rating:4.7, reviews:221, emoji:"🍮", badge:"",      image:"classic/caramel.png",           desc:"Buttery caramel ribbons in smooth ice cream",       tags:["caramel","sweet","classic"] },
  { id:7,  name:"Pistachio Royal",      category:"classic",  price:199, oldPrice:229, rating:4.8, reviews:189, emoji:"🌿", badge:"",      image:"classic/pistachio.png",         desc:"Real pistachio nuts in a premium cream base",       tags:["pistachio","nuts","classic"] },
  { id:8,  name:"Cookies & Cream",      category:"classic",  price:169, oldPrice:199, rating:4.9, reviews:287, emoji:"🍪", badge:"best",  image:"classic/cookies-cream.png",     desc:"Oreo cookies crushed into dreamy vanilla cream",    tags:["oreo","cookies","classic"] },
  { id:9,  name:"Butterscotch Bliss",   category:"classic",  price:159, oldPrice:189, rating:4.6, reviews:156, emoji:"🧈", badge:"",      image:"classic/butterscotch.png",      desc:"Classic butterscotch with toffee bits",            tags:["butterscotch","toffee","classic"] },
  { id:10, name:"Mint Choco Chip",      category:"classic",  price:169, oldPrice:199, rating:4.7, reviews:203, emoji:"🌱", badge:"",      image:"classic/mint-choco.png",        desc:"Refreshing mint with chocolate chips",             tags:["mint","chocolate","classic"] },
  { id:11, name:"Rose Gulkand",         category:"classic",  price:179, oldPrice:209, rating:4.5, reviews:132, emoji:"🌹", badge:"new",   image:"classic/rose-gulkand.png",      desc:"Fragrant rose petals with Indian gulkand",          tags:["rose","gulkand","floral"] },
  { id:12, name:"Kesar Pista",          category:"classic",  price:199, oldPrice:249, rating:4.8, reviews:178, emoji:"🌟", badge:"",      image:"classic/kesar-pista.png",       desc:"Saffron and pistachio, the Indian classic",         tags:["kesar","pista","indian"] },

  // Premium Ice Cream
  { id:13, name:"Truffle Heaven",       category:"premium",  price:299, oldPrice:349, rating:5.0, reviews:145, emoji:"🍫", badge:"best",  image:"premium/truffle.png",           desc:"Belgian truffle and dark chocolate ganache",        tags:["truffle","chocolate","premium"] },
  { id:14, name:"Salted Caramel Gold",  category:"premium",  price:279, oldPrice:329, rating:4.9, reviews:167, emoji:"🥇", badge:"",      image:"premium/salted-caramel.png",    desc:"Sea salt flakes in golden caramel gelato",          tags:["caramel","salted","premium"] },
  { id:15, name:"Matcha Zen",           category:"premium",  price:269, oldPrice:319, rating:4.8, reviews:134, emoji:"🍵", badge:"new",   image:"premium/matcha.png",            desc:"Premium Japanese matcha with white chocolate",      tags:["matcha","japanese","premium"] },
  { id:16, name:"Lavender Honey",       category:"premium",  price:289, oldPrice:339, rating:4.7, reviews:121, emoji:"💜", badge:"",      image:"premium/lavender.png",          desc:"French lavender with wild honey swirls",           tags:["lavender","honey","floral"] },
  { id:17, name:"Champagne Sorbet",     category:"premium",  price:319, oldPrice:379, rating:4.8, reviews:98,  emoji:"🥂", badge:"",      image:"premium/champagne.png",         desc:"Light champagne and citrus sorbet",                tags:["champagne","sorbet","premium"] },
  { id:18, name:"Black Sesame Royale",  category:"premium",  price:299, oldPrice:349, rating:4.9, reviews:112, emoji:"⚫", badge:"new",   image:"premium/black-sesame.png",      desc:"Nutty black sesame in velvety cream",              tags:["sesame","nutty","premium"] },
  { id:19, name:"Tahitian Vanilla",     category:"premium",  price:329, oldPrice:389, rating:5.0, reviews:89,  emoji:"✨", badge:"best",  image:"premium/tahitian-vanilla.png",  desc:"Rare Tahitian vanilla pods gelato",                tags:["vanilla","tahitian","premium"] },
  { id:20, name:"Hazelnut Praline",     category:"premium",  price:299, oldPrice:349, rating:4.8, reviews:145, emoji:"🌰", badge:"",      image:"premium/hazelnut.png",          desc:"Roasted hazelnuts and praline in cream",           tags:["hazelnut","praline","premium"] },
  { id:21, name:"Tiramisu Dream",       category:"premium",  price:289, oldPrice:339, rating:4.9, reviews:178, emoji:"☕", badge:"best",  image:"premium/tiramisu.png",          desc:"Italian tiramisu in a frozen gelato form",          tags:["tiramisu","coffee","premium"] },
  { id:22, name:"Raspberry Coulis",     category:"premium",  price:279, oldPrice:329, rating:4.7, reviews:134, emoji:"🫙", badge:"",      image:"premium/raspberry.png",         desc:"Fresh raspberry coulis swirled in cream",          tags:["raspberry","fruit","premium"] },
  { id:23, name:"Coconut Lychee",       category:"premium",  price:269, oldPrice:319, rating:4.6, reviews:109, emoji:"🥥", badge:"",      image:"premium/coconut-lychee.png",    desc:"Tropical coconut cream with lychee pieces",        tags:["coconut","lychee","tropical"] },
  { id:24, name:"Saffron Rose",         category:"premium",  price:339, oldPrice:399, rating:4.9, reviews:97,  emoji:"🌺", badge:"",      image:"premium/saffron-rose.png",      desc:"Premium saffron with rose water gelato",           tags:["saffron","rose","indian"] },

  // Ice Cream Cones
  { id:25, name:"Classic Waffle Cone",  category:"cones",    price:129, oldPrice:149, rating:4.7, reviews:234, emoji:"🍦", badge:"best",  image:"cone/waffle-cone.png",          desc:"Crispy waffle cone with vanilla soft serve",       tags:["waffle","vanilla","cone"] },
  { id:26, name:"Choco Dip Cone",       category:"cones",    price:149, oldPrice:179, rating:4.8, reviews:198, emoji:"🍫", badge:"",      image:"cone/choco-dip-cone.png",       desc:"Belgian chocolate dipped waffle cone",             tags:["chocolate","dip","cone"] },
  { id:27, name:"Strawberry Cone",      category:"cones",    price:139, oldPrice:169, rating:4.6, reviews:167, emoji:"🍓", badge:"",      image:"cone/strawberry-cone.png",      desc:"Strawberry swirl in a crunchy cone",               tags:["strawberry","cone","fruit"] },
  { id:28, name:"Rainbow Cone",         category:"cones",    price:159, oldPrice:189, rating:4.9, reviews:289, emoji:"🌈", badge:"best",  image:"cone/rainbow-cone.png",         desc:"Five colorful flavors in one tall cone",           tags:["rainbow","mixed","cone"] },
  { id:29, name:"Nutty Buddy Cone",     category:"cones",    price:169, oldPrice:199, rating:4.7, reviews:156, emoji:"🥜", badge:"",      image:"cone/nutty-cone.png",           desc:"Mixed nuts and caramel in waffle cone",            tags:["nuts","caramel","cone"] },
  { id:30, name:"Mango Kulfi Cone",     category:"cones",    price:149, oldPrice:179, rating:4.8, reviews:212, emoji:"🥭", badge:"new",   image:"cone/mango-kulfi.png",          desc:"Indian mango kulfi in a crispy cone",              tags:["mango","kulfi","cone"] },

  // Ice Cream Cups
  { id:31, name:"Gelato Cup",           category:"cups",     price:119, oldPrice:149, rating:4.6, reviews:187, emoji:"🍨", badge:"",      image:"cup/gelato-cup.png",            desc:"Italian-style gelato in a charming cup",           tags:["gelato","cup","italian"] },
  { id:32, name:"Brownie Cup",          category:"cups",     price:179, oldPrice:209, rating:4.9, reviews:234, emoji:"🍫", badge:"best",  image:"cup/brownie-cup.png",           desc:"Warm brownie with cold ice cream cup",             tags:["brownie","chocolate","cup"] },
  { id:33, name:"Fruit Parfait Cup",    category:"cups",     price:159, oldPrice:189, rating:4.7, reviews:167, emoji:"🍑", badge:"",      image:"cup/fruit-parfait-cup.png",     desc:"Layered fresh fruits and cream in a cup",          tags:["fruit","parfait","cup"] },
  { id:34, name:"Choco Volcano Cup",    category:"cups",     price:189, oldPrice:219, rating:4.9, reviews:198, emoji:"🌋", badge:"new",   image:"cup/choco-volcano-cup.png",     desc:"Chocolate lava with ice cream topping",            tags:["chocolate","lava","cup"] },
  { id:35, name:"Berry Blast Cup",      category:"cups",     price:149, oldPrice:179, rating:4.7, reviews:145, emoji:"🫐", badge:"",      image:"cup/berry-blast-cup.png",       desc:"Mixed berries and sorbet in a cup",                tags:["berries","sorbet","cup"] },
  { id:36, name:"Peanut Butter Cup",    category:"cups",     price:169, oldPrice:199, rating:4.8, reviews:178, emoji:"🥜", badge:"",      image:"cup/peanut-butter-cup.png",     desc:"Creamy peanut butter with chocolate cup",          tags:["peanut","butter","cup"] },

  // Ice Cream Sundaes
  { id:37, name:"Classic Hot Fudge",    category:"sundae",   price:219, oldPrice:259, rating:4.9, reviews:312, emoji:"🍫", badge:"best",  image:"sundae/hot-fudge-sundae.png",   desc:"Hot fudge sauce over vanilla scoops",              tags:["hot fudge","classic","sundae"] },
  { id:38, name:"Banana Split",         category:"sundae",   price:229, oldPrice:269, rating:4.8, reviews:267, emoji:"🍌", badge:"best",  image:"sundae/banana-split.png",       desc:"Classic banana split with 3 flavors",              tags:["banana","split","sundae"] },
  { id:39, name:"Strawberry Supreme",   category:"sundae",   price:219, oldPrice:259, rating:4.7, reviews:189, emoji:"🍓", badge:"",      image:"sundae/strawberry-supreme.png", desc:"Strawberry compote over creamy scoops",            tags:["strawberry","sundae","fruit"] },
  { id:40, name:"Rainbow Sundae",       category:"sundae",   price:249, oldPrice:289, rating:4.9, reviews:234, emoji:"🌈", badge:"new",   image:"sundae/rainbow-sundae.png",     desc:"Colorful sprinkles and rainbow toppings",          tags:["rainbow","colorful","sundae"] },
  { id:41, name:"Caramel Crunch",       category:"sundae",   price:229, oldPrice:269, rating:4.8, reviews:198, emoji:"🍮", badge:"",      image:"sundae/caramel-crunch-sundae.png", desc:"Salted caramel with praline crunch sundae",     tags:["caramel","crunch","sundae"] },
  { id:42, name:"Choco Peanut Butter",  category:"sundae",   price:239, oldPrice:279, rating:4.9, reviews:223, emoji:"🥜", badge:"",      image:"sundae/choco-pb-sundae.png",    desc:"Chocolate sauce meets peanut butter sundae",       tags:["chocolate","peanut","sundae"] },
  { id:43, name:"Tropical Sundae",      category:"sundae",   price:239, oldPrice:279, rating:4.7, reviews:156, emoji:"🏝️", badge:"",      image:"sundae/tropical-sundae.png",    desc:"Mango, coconut and passionfruit sundae",           tags:["tropical","mango","sundae"] },
  { id:44, name:"Monster Sundae",       category:"sundae",   price:349, oldPrice:399, rating:4.9, reviews:145, emoji:"👾", badge:"new",   image:"sundae/monster-sundae.png",     desc:"6 scoops, 4 toppings, 2 sauces - massive!",        tags:["big","loaded","sundae"] },
];

/* ---- Helpers ---- */
function generateStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatPrice(p) { return '₹' + p; }

function createProductCard(product, size = 'normal') {
  const badgeHtml = product.badge
    ? `<span class="card-badge ${product.badge}">${product.badge === 'best' ? '🏆 Best Seller' : product.badge === 'new' ? '✨ New' : product.badge}</span>`
    : '';
  const imgBase = product.image ? IMG_BASE + product.image : '';
  const imgHtml = imgBase
    ? `<picture>
        <source srcset="${imgBase.replace(/\.png$/, '.webp')}" type="image/webp">
        <source srcset="${imgBase.replace(/\.png$/, '.jpg')}" type="image/jpeg">
        <img class="card-img" src="${imgBase}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
      </picture>`
    : '';
  return `
    <div class="product-card reveal tilt-card" data-id="${product.id}" data-category="${product.category}" data-tags="${product.tags.join(',')}">
      <div class="card-img-wrap zoom-wrap">
        ${imgHtml}
        <span class="card-emoji">${product.emoji}</span>
        ${badgeHtml}
        <button class="card-wishlist" onclick="toggleWishlist(this, ${product.id})" title="Wishlist">♡</button>
      </div>
      <div class="card-body">
        <p class="card-category">${product.category.replace('-',' ')}</p>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.desc}</p>
        <div class="card-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="rating-count">${product.rating} (${product.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart btn-ripple" onclick="addToCart(${product.id})">
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleWishlist(btn, id) {
  const saved = JSON.parse(localStorage.getItem('iceworld_wishlist') || '[]');
  const idx = saved.indexOf(id);
  if (idx === -1) {
    saved.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('Added to wishlist! ♥', 'success');
  } else {
    saved.splice(idx, 1);
    btn.textContent = '♡';
    btn.classList.remove('active');
    showToast('Removed from wishlist', 'info');
  }
  localStorage.setItem('iceworld_wishlist', JSON.stringify(saved));
}

/* Restore wishlist state for cards on page */
function restoreWishlistState() {
  const saved = JSON.parse(localStorage.getItem('iceworld_wishlist') || '[]');
  document.querySelectorAll('.card-wishlist').forEach(btn => {
    const card = btn.closest('.product-card');
    if (card) {
      const id = parseInt(card.dataset.id);
      if (saved.includes(id)) {
        btn.textContent = '♥';
        btn.classList.add('active');
      }
    }
  });
}
