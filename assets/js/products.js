// IceWorld - Static Product Data
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Vanilla Dream",
    category: "Premium Ice Cream Tubs",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=600&fit=crop"
    ],
    description: "Rich, creamy vanilla ice cream made from fresh Madagascar vanilla beans. A timeless classic that never goes out of style.",
    shortDescription: "Rich creamy vanilla with Madagascar vanilla beans.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "Bestseller",
    featured: true
  },
  {
    id: 2,
    name: "Strawberry Bliss",
    category: "Premium Ice Cream Tubs",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop"
    ],
    description: "Bursting with the flavour of fresh strawberries, this ice cream is a perfect summer treat. Made with real strawberry pieces.",
    shortDescription: "Fresh strawberries blended into creamy perfection.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "New",
    featured: true
  },
  {
    id: 3,
    name: "Chocolate Fudge Supreme",
    category: "Chocolate Desserts",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop"
    ],
    description: "Indulge in the deepest, richest chocolate experience. Made with premium Belgian chocolate and swirls of fudge.",
    shortDescription: "Premium Belgian chocolate with luscious fudge swirls.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "Popular",
    featured: true
  },
  {
    id: 4,
    name: "Rainbow Sundae",
    category: "Sundaes",
    price: 249,
    originalPrice: 329,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop"
    ],
    description: "A fun and colourful sundae topped with rainbow sprinkles, caramel drizzle, and a cherry on top. Perfect for kids!",
    shortDescription: "Colourful sundae with rainbow toppings.",
    sizes: ["Regular", "Large"],
    inStock: true,
    badge: "",
    featured: false
  },
  {
    id: 5,
    name: "Birthday Cake Ice Cream",
    category: "Ice Cream Cakes",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop"
    ],
    description: "Make every birthday magical with our custom ice cream cake. Layers of your favourite flavours, decorated to perfection.",
    shortDescription: "Custom layered ice cream cake for every occasion.",
    sizes: ["500g", "1kg", "2kg"],
    inStock: true,
    badge: "Premium",
    featured: true
  },
  {
    id: 6,
    name: "Mango Sorbet",
    category: "Seasonal Specials",
    price: 279,
    originalPrice: 359,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1567206563114-c179706a56a2?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567206563114-c179706a56a2?w=600&h=600&fit=crop"
    ],
    description: "Refreshing Alphonso mango sorbet made from 100% natural Ratnagiri mangoes. No artificial flavours.",
    shortDescription: "100% natural Alphonso mango sorbet.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "Seasonal",
    featured: false
  },
  {
    id: 7,
    name: "Party Pack Bundle",
    category: "Party Packs",
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=600&fit=crop"
    ],
    description: "Feed the whole gang! Includes 4 flavours of 500ml tubs — Vanilla, Chocolate, Strawberry, and Mango.",
    shortDescription: "4-flavour party pack for the whole family.",
    sizes: ["Standard (4x500ml)", "Deluxe (4x1L)"],
    inStock: true,
    badge: "Value",
    featured: false
  },
  {
    id: 8,
    name: "Pistachio Royale",
    category: "Premium Ice Cream Tubs",
    price: 449,
    originalPrice: 549,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop"
    ],
    description: "Premium pistachio ice cream loaded with real pistachio nuts. A luxurious flavour for the discerning palate.",
    shortDescription: "Luxurious pistachio with real nut pieces.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "Premium",
    featured: true
  },
  {
    id: 9,
    name: "Dark Chocolate Truffle",
    category: "Chocolate Desserts",
    price: 429,
    originalPrice: 529,
    rating: 4.8,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&h=600&fit=crop"
    ],
    description: "Intensely dark chocolate ice cream with embedded chocolate truffles. For true chocolate lovers only.",
    shortDescription: "Intense dark chocolate with embedded truffles.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: false,
    badge: "Coming Soon",
    featured: false
  },
  {
    id: 10,
    name: "Rose & Cardamom",
    category: "Seasonal Specials",
    price: 379,
    originalPrice: 479,
    rating: 4.6,
    reviews: 57,
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=600&fit=crop"
    ],
    description: "An exotic fusion of delicate rose water and warm cardamom. A truly Indian-inspired flavour experience.",
    shortDescription: "Exotic rose & cardamom fusion ice cream.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "Seasonal",
    featured: false
  },
  {
    id: 11,
    name: "Mint Choco Chip",
    category: "Premium Ice Cream Tubs",
    price: 319,
    originalPrice: 399,
    rating: 4.5,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1505394033641-40908a35dfc6?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505394033641-40908a35dfc6?w=600&h=600&fit=crop"
    ],
    description: "Cool, refreshing mint ice cream studded with dark chocolate chips. A classic combination that always satisfies.",
    shortDescription: "Cool mint with dark chocolate chips.",
    sizes: ["Small (250ml)", "Medium (500ml)", "Large (1L)"],
    inStock: true,
    badge: "",
    featured: false
  },
  {
    id: 12,
    name: "Caramel Swirl Sundae",
    category: "Sundaes",
    price: 299,
    originalPrice: 379,
    rating: 4.7,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=600&h=600&fit=crop"
    ],
    description: "Velvety vanilla ice cream drowning in golden caramel sauce, topped with crispy wafer pieces and whipped cream.",
    shortDescription: "Vanilla with golden caramel and wafer crunch.",
    sizes: ["Regular", "Large"],
    inStock: true,
    badge: "Bestseller",
    featured: true
  }
];

const CATEGORIES = [
  { name: "Premium Ice Cream Tubs", icon: "🍦", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop" },
  { name: "Ice Cream Cakes", icon: "🎂", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
  { name: "Sundaes", icon: "🍨", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
  { name: "Chocolate Desserts", icon: "🍫", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop" },
  { name: "Party Packs", icon: "🎉", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop" },
  { name: "Seasonal Specials", icon: "🌸", image: "https://images.unsplash.com/photo-1567206563114-c179706a56a2?w=400&h=300&fit=crop" }
];
