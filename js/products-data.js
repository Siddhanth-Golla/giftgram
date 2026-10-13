/**
 * =========================================================================
 * 🌸 GIFTCRAM - CENTRAL PRODUCT CATALOG DATA
 * =========================================================================
 * 
 * 💡 HOW TO ADD A NEW PRODUCT WITHOUT CHANGING ANY HTML:
 * 
 * Simply add a new item to the DEFAULT_PRODUCTS list below:
 * 
 *   {
 *     id: 6,
 *     name: "Your New Gift Name",
 *     category: "Photo Frames",  // Choose: "Photo Frames", "Handmade Gifts", or "Custom Keepsakes"
 *     price: 499,
 *     image: "assets/images/products/your-photo.jpg",
 *     description: "Handcrafted personalized gift made with love.",
 *     bestseller: false
 *   },
 * 
 * (You can also use our simple visual manager: open `manage-products.html` in your browser!)
 * =========================================================================
 */

const GIFTCRAM_CATEGORIES = [
  { id: "all", name: "All Gifts" },
  { id: "frames", name: "Photo Frames" },
  { id: "handmade", name: "Handmade Gifts" },
  { id: "keepsakes", name: "Custom Keepsakes" }
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Personalized Mini Retro Polaroid Keepsake",
    category: "Photo Frames",
    price: 30 ,
    image: "assets/images/products/polaroid-mini-frame.jpg",
    description: "A nostalgic retro polaroid keepsake with your custom photograph and meaningful caption. Perfectly sized for wallets, study desks, or bedside displays.",
    bestseller: true
  },
  {
    id: 2,
    name: "Custom Memory Collage White Frame",
    category: "Photo Frames",
    price: 799,
    image: "assets/images/products/memory-collage-frame.jpg",
    description: "Handcrafted premium white frame featuring your favorite curated moments and group memories. High-definition photo printing on archival cardstock with protective glass.",
    bestseller: true
  },
  {
    id: 3,
    name: "Personalized 'Vogue Style' Birthday Girl Magazine Frame",
    category: "Photo Frames",
    price: 999,
    image: "assets/images/products/vogue-birthday-magazine-frame.jpg",
    description: "Make her feel like an iconic celebrity on her special day! Custom-styled luxury magazine cover frame with personalized headlines, dates, and birthday wishes.",
    bestseller: true
  },
  {
    id: 4,
    name: "Personalized Graduation Acrylic Standee Keepsake",
    category: "Custom Keepsakes",
    price: 899,
    image: "assets/images/products/graduation-acrylic-standee.jpg",
    description: "Laser-cut 3D premium acrylic keepsake honoring the graduate's proud academic milestone. Customized with student name, degree, college name, and class year.",
    bestseller: false
  },
  {
    id: 5,
    name: "Sweet Love Miniature Keepsake Surprise Tin Box",
    category: "Handmade Gifts",
    price: 399,
    image: "assets/images/products/sweet-love-tin-box.jpg",
    description: "A romantic pocket tin surprise filled with custom mini accordion memories, tiny love letters, and warm heartfelt details handcrafted with love.",
    bestseller: false
  }
];
