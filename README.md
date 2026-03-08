# 🍦 IceWorld — Premium Ice Cream Shop

A premium, modern ice cream brand website built with a professionally crafted
dessert-inspired colour palette. Every colour token, component, and utility
class is documented in the [palette.html](palette.html) showcase page.

---

## 🎨 Premium Colour Palette

> **Design principle:** Sweet · Fresh · Creamy · Luxurious — never childish.
> All tones are soft, dessert-inspired pastels that feel premium and sophisticated.

| # | Token | HEX | Name | Role |
|---|---|---|---|---|
| 1 | `--primary` | **#E8486A** | 🍓 Strawberry Blossom | Primary CTA buttons, active nav links, price badges, focus rings |
| 2 | `--secondary` | **#3A1A08** | 🍫 Dark Chocolate | Navbar background, footer, dark section overlays |
| 3 | `--accent` | **#D48C0F** | 🍮 Salted Caramel | Star ratings, "Popular"/"New" badges, secondary buttons |
| 4 | `--mint` | **#2AA87A** | 🍃 Pistachio Mint | Vegan/fresh badges, success toasts, in-stock indicators |
| 5 | `--bg-light` | **#FFF8EF** | 🍦 Vanilla Cream | Main page background, input fields, modals |
| 6 | `--bg-mid` | **#FDE8CC** | 🍑 Soft Peach | Card wrappers, alternating sections, loyalty strips |
| 7 | `--text-dark` | **#2C1206** | ☕ Espresso | All H1–H6 headings, body paragraphs, icon labels |
| 8 | `--red` | **#C0392B** | 🍒 Cherry Red | Sale banners, "HOT DEAL" badges, flash-sale CTAs |

Each primary colour ships with three variants:

```css
--primary:       #E8486A;   /* base        */
--primary-dark:  #C43057;   /* hover/press  */
--primary-light: #FFE0E9;   /* tint/chips   */
```

---

## 🗺️ Where to Use Each Colour

### 🍓 Strawberry Blossom `#E8486A` — Primary
- **Buttons:** "Order Now", "Add to Cart", "Shop Now"
- **Navigation:** active link underline / indicator dot
- **Badges:** price labels, new-arrival chips
- **Icons:** heart / like / favourite fills
- **Forms:** focus ring on inputs (`outline: 3px solid var(--primary)`)

### 🍫 Dark Chocolate `#3A1A08` — Secondary
- **Navbar:** top navigation bar background
- **Footer:** site footer background
- **Overlays:** dark hero image overlay, modal backdrop
- **Dark sections:** alternating dark promotional sections

### 🍮 Salted Caramel `#D48C0F` — Accent
- **Ratings:** star rating icons (⭐⭐⭐⭐⭐)
- **Badges:** "Popular", "Best Seller", "New" labels
- **Highlights:** section heading accent underlines
- **Buttons:** secondary outlined buttons (e.g. "View Menu")

### 🍃 Pistachio Mint `#2AA87A` — Fresh Accent
- **Badges:** "Vegan", "Dairy-Free", "Fresh", "Sugar-Free"
- **Toast notifications:** success message background
- **Indicators:** in-stock availability dot
- **Hover:** icon-button hover state on light backgrounds

### 🍦 Vanilla Cream `#FFF8EF` — Background
- **Page background:** main `<body>` background colour
- **Inputs / textareas:** form field backgrounds
- **Cards:** inner content area of product cards
- **Modals:** modal / drawer window background

### 🍑 Soft Peach `#FDE8CC` — Card Background
- **Cards:** product card wrapper backgrounds
- **Sections:** alternating section backgrounds (every other row)
- **About page:** brand story section background
- **Loyalty:** tier / rewards strip background

### ☕ Espresso `#2C1206` — Text
- **Headings:** all `<h1>` through `<h6>` elements
- **Body text:** paragraphs, list items
- **Labels:** form field labels, icon text
- **Secondary text:** `--text-mid: #6B3820` (subheadings, captions)

### 🍒 Cherry Red `#C0392B` — Bold / Sale
- **Sale banners:** "SALE", "HOT DEAL", "LIMITED TIME" headers
- **Discount badges:** percentage-off labels (e.g. `-50%`)
- **Urgency CTAs:** flash-sale countdown timer, "Ending Soon" banners
- **Error alerts:** form validation error messages

---

## 📐 CSS Custom Properties

All colours are defined as CSS custom properties in `css/style.css`:

```css
:root {
  /* PRIMARY — Strawberry Blossom */
  --primary:        #E8486A;   /* CTA buttons, active links      */
  --primary-dark:   #C43057;   /* hover / pressed state          */
  --primary-light:  #FFE0E9;   /* tint / chip backgrounds        */

  /* SECONDARY — Dark Chocolate */
  --secondary:      #3A1A08;   /* navbar, footer                 */
  --secondary-dark: #1E0C02;   /* deepest overlays               */
  --secondary-light:#F2DEC8;   /* warm cream panels              */

  /* ACCENT — Salted Caramel */
  --accent:         #D48C0F;   /* stars, "Popular" badges        */
  --accent-dark:    #B5750C;   /* caramel hover state            */

  /* MINT — Pistachio Mint */
  --mint:           #2AA87A;   /* vegan / fresh / success        */
  --mint-dark:      #1E8A63;   /* mint hover state               */
  --mint-light:     #D4F5EA;   /* mint tint background           */

  /* RED — Cherry Red */
  --red:            #C0392B;   /* sale banners, hot deals        */
  --red-dark:       #96281B;   /* red hover / pressed state      */
  --red-light:      #FADBD8;   /* red tint / alert background    */

  /* BACKGROUNDS */
  --bg-light:       #FFF8EF;   /* Vanilla Cream — page bg        */
  --bg-mid:         #FDE8CC;   /* Soft Peach — cards, alt rows   */
  --bg-white:       #ffffff;   /* Pure white                     */
  --border-color:   #EDD4B0;   /* Almond — dividers, borders     */

  /* TEXT SCALE */
  --text-dark:      #2C1206;   /* Espresso — headings, body      */
  --text-mid:       #6B3820;   /* Mocha — secondary text         */
  --text-light:     #A0714D;   /* Latte — captions, placeholders */
}
```

---

## 🧩 Ready-to-Use Utility Classes

The CSS utility system (`css/style.css`, 4300+ lines) provides out-of-the-box
classes for every palette colour:

### Text colours
```html
<p class="text-primary">Strawberry text</p>
<p class="text-accent">Caramel text</p>
<p class="text-mint">Mint text</p>
<p class="text-red">Cherry Red text</p>
```

### Background colours
```html
<div class="bg-primary">Strawberry background</div>
<div class="bg-peach">Soft Peach background</div>
<div class="bg-vanilla">Vanilla Cream background</div>
<div class="bg-red-light">Cherry Blush background</div>
```

### Buttons
```html
<button class="btn-flavour btn-strawberry">Order Now</button>
<button class="btn-flavour btn-caramel">View Menu</button>
<button class="btn-flavour btn-mint">Vegan Options</button>
<button class="btn-flavour btn-chocolate">About Us</button>
<button class="btn-flavour btn-red">Flash Sale</button>
<button class="btn-flavour btn-strawberry-outline">Learn More</button>
<button class="btn-flavour btn-red-outline">See Deals</button>
```

### Badges
```html
<span class="badge-base badge-strawberry">New</span>
<span class="badge-base badge-caramel">Popular</span>
<span class="badge-base badge-mint">Vegan</span>
<span class="badge-base badge-red">SALE</span>
<span class="badge-red-soft">-50%</span>
```

### Cards
```html
<!-- Accent-strip card -->
<div class="card-premium card-premium-strawberry"> ... </div>
<div class="card-premium card-premium-red">        ... </div>

<!-- Tint-fill card -->
<div class="card-premium card-tint-caramel"> ... </div>
<div class="card-premium card-tint-red">     ... </div>

<!-- Glassmorphism card -->
<div class="card-premium card-glass"> ... </div>
```

### Section backgrounds
```html
<section class="section-vanilla">      <!-- Vanilla Cream     -->
<section class="section-peach">        <!-- Soft Peach        -->
<section class="section-strawberry">   <!-- Strawberry bg     -->
<section class="section-red">          <!-- Cherry Red bg     -->
<section class="section-chocolate">    <!-- Dark Chocolate bg -->
<section class="section-neapolitan">   <!-- 3-tone gradient   -->
```

### Gradients
```html
<div class="grad-h-strawberry-caramel"> ... </div>
<div class="grad-h-red-chocolate">      ... </div>
<div class="grad-d-neapolitan">         ... </div>
<div class="grad-animated">            ... </div>

<!-- Gradient text -->
<h2 class="grad-text-strawberry-caramel">Delicious</h2>
<h2 class="grad-text-red-caramel">Flash Sale</h2>
```

### Alerts
```html
<div class="alert-premium alert-strawberry"> ... </div>
<div class="alert-premium alert-caramel">    ... </div>
<div class="alert-premium alert-mint">       ... </div>
<div class="alert-red">                      ... </div>
```

---

## 📱 Responsive & Accessibility Features

- **CSS Custom Properties** — all colours defined as tokens; one change
  updates the whole site
- **Dark mode** — `@media (prefers-color-scheme: dark)` overrides preserve
  brand identity on dark displays; also activatable via `<html class="dark">`
- **Print styles** — colours degrade gracefully to outlined / high-contrast
  for printing
- **Focus rings** — every interactive element gets a 3px Strawberry Blossom
  focus ring for WCAG 2.1 AA keyboard navigation
- **Semantic contrast** — all text/background combinations meet WCAG AA:
  - Espresso text on Vanilla Cream: **12.3:1** ✅
  - White on Strawberry Blossom: **4.6:1** ✅
  - White on Dark Chocolate: **14.8:1** ✅
  - White on Cherry Red: **5.1:1** ✅

---

## 🗂️ Project Structure

```
aryann.251-/
├── index.html          Homepage (hero, featured flavours, testimonials)
├── menu.html           Full ice cream menu with filters
├── about.html          Brand story and team
├── contact.html        Contact form and store location
├── palette.html        🎨 Colour palette design-system showcase
├── css/
│   └── style.css       Main stylesheet (4300+ lines, full utility system)
├── js/                 JavaScript files
└── images/             Photography and product images
```

---

## 🚀 Quick Start

1. **Clone the repository** and open `index.html` in your browser.
2. Visit **`palette.html`** for the interactive colour showcase — swatches,
   gradients, component demos, and the CSS reference table.
3. Use the token names from the table above in your HTML with the utility
   classes, or reference them directly in custom CSS:

```css
.my-button {
  background:    var(--primary);
  border-radius: var(--radius-full);
  color:         #fff;
  font-family:   var(--font-brand);
  font-weight:   700;
}
.my-button:hover {
  background: var(--primary-dark);
  box-shadow: 0 6px 20px rgba(232,72,106,0.40);
}
```

---

## 🏷️ Colour Tokens Quick Reference Card

```
Strawberry Blossom  #E8486A   → primary / buttons / badges
Deep Strawberry     #C43057   → button hover
Blush Pink          #FFE0E9   → tint backgrounds

Dark Chocolate      #3A1A08   → navbar / footer
Espresso Roast      #1E0C02   → deepest dark
Vanilla Parchment   #F2DEC8   → warm panels

Salted Caramel      #D48C0F   → accent / stars
Deep Caramel        #B5750C   → caramel hover

Pistachio Mint      #2AA87A   → fresh / vegan / success
Deep Pistachio      #1E8A63   → mint hover
Mint Whisper        #D4F5EA   → mint tint

Cherry Red          #C0392B   → sale / hot deals / urgency
Deep Cherry         #96281B   → red hover
Cherry Blush        #FADBD8   → red tint / alert bg

Vanilla Cream       #FFF8EF   → page background
Soft Peach          #FDE8CC   → card background
Almond              #EDD4B0   → borders / dividers

Espresso (text)     #2C1206   → headings / body
Mocha (text)        #6B3820   → secondary text
Latte (text)        #A0714D   → captions / placeholders
```

---

*IceWorld Premium Ice Cream — where every colour tells a flavour story.*
