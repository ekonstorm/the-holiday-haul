/**
 * ============================================================
 *  products.js — The Holiday Haul · Product Data
 * ============================================================
 *
 *  HOW TO EDIT
 *  -----------
 *  Each object in the array below represents one product card.
 *
 *  Fields:
 *    id          – A unique number (1, 2, 3 …). Never duplicate.
 *    title       – The product name shown on the card.
 *    description – A short sentence (≈ 10-20 words).
 *    category    – One of the categories listed in CATEGORIES below.
 *    collection  – Which seasonal collection this belongs to
 *                  (e.g. "halloween", "christmas", "newyear",
 *                   "valentines", "everyday", "giftguide").
 *    giftGuide   – (optional) Which gift guide(s) to show it in.
 *                  Array of strings, e.g. ["under25", "forher"].
 *    image       – URL or local path to the product image.
 *                  Replace placeholder URLs with your own images.
 *    price       – (optional) Price string like "$19.99".
 *                  IMPORTANT: Only include if you have recently
 *                  verified the price on Amazon. Remove or leave
 *                  empty if you are unsure.
 *    amazonUrl   – Your full Amazon affiliate link.
 *                  Replace YOUR_AMAZON_AFFILIATE_LINK with your
 *                  actual approved Amazon Associates link.
 *    featured    – true or false. Featured items appear in the
 *                  "Featured Finds" section at the top.
 *
 *  IMPORTANT NOTES
 *  ---------------
 *  • All products below are DEMO / PLACEHOLDER content.
 *  • Do NOT present demo items as verified recommendations.
 *  • Replace every image, title, description, price, and link
 *    with your own approved content before going live.
 *  • Amazon.com Associates and Amazon.in Associates are separate
 *    programs — use links from the correct program.
 *  • Never fabricate reviews, ratings, or bestseller claims.
 *  • Follow current Amazon Associates Operating Agreement.
 *
 * ============================================================
 */

/* ---- CATEGORY DEFINITIONS ---- */
const CATEGORIES = [
  { id: "halloween",  label: "Halloween",          icon: "🎃" },
  { id: "christmas",  label: "Christmas",          icon: "🎄" },
  { id: "newyear",    label: "New Year's Eve",     icon: "🥂" },
  { id: "valentines", label: "Valentine's Day",    icon: "💝" },
  { id: "everyday",   label: "Everyday Home Finds", icon: "🏡" },
  { id: "giftguide",  label: "Gift Guides",        icon: "🎁" },
];

/* ---- GIFT GUIDE DEFINITIONS ---- */
const GIFT_GUIDES = [
  { id: "under25",   label: "Gifts Under $25",     icon: "💰" },
  { id: "forher",    label: "Gifts for Her",        icon: "💐" },
  { id: "hostess",   label: "Hostess Gift Ideas",   icon: "🍷" },
  { id: "party",     label: "Party Essentials",     icon: "🎉" },
];

/* ---- PRODUCT DATA ---- */
const PRODUCTS = [

  /* ==============================
   *  HALLOWEEN — Demo products
   * ============================== */
  {
    id: 1,
    title: "Demo — Ceramic Pumpkin Candle Holder",
    description: "Warm amber glow for your autumn mantle. Demo item — replace before publishing.",
    category: "halloween",
    collection: "halloween",
    giftGuide: [],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Pumpkin+Candle",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 2,
    title: "Demo — Black Cat Door Mat",
    description: "A playful welcome for trick-or-treaters. Demo item — replace before publishing.",
    category: "halloween",
    collection: "halloween",
    giftGuide: ["under25"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Cat+Doormat",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
  {
    id: 3,
    title: "Demo — Velvet Throw Pillow (Orange)",
    description: "Seasonal colour pop for your sofa. Demo item — replace before publishing.",
    category: "halloween",
    collection: "halloween",
    giftGuide: ["forher"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Orange+Pillow",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },

  /* ==============================
   *  CHRISTMAS — Demo products
   * ============================== */
  {
    id: 4,
    title: "Demo — Frosted Pine Wreath",
    description: "Classic door wreath with faux snow finish. Demo item — replace before publishing.",
    category: "christmas",
    collection: "christmas",
    giftGuide: [],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Pine+Wreath",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 5,
    title: "Demo — Knit Stocking Set (3-Pack)",
    description: "Chunky-knit stockings in cream, red, and green. Demo item — replace before publishing.",
    category: "christmas",
    collection: "christmas",
    giftGuide: ["under25"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Knit+Stockings",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 6,
    title: "Demo — Gold Star Tree Topper",
    description: "Brushed-gold metal star for a polished tree top. Demo item — replace before publishing.",
    category: "christmas",
    collection: "christmas",
    giftGuide: ["forher"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Star+Topper",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
  {
    id: 7,
    title: "Demo — Cinnamon & Cedar Candle",
    description: "Hand-poured holiday scent in a reusable glass jar. Demo item — replace before publishing.",
    category: "christmas",
    collection: "christmas",
    giftGuide: ["under25", "hostess"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Cedar+Candle",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },

  /* ==============================
   *  NEW YEAR'S EVE — Demo products
   * ============================== */
  {
    id: 8,
    title: "Demo — Gold Confetti Table Runner",
    description: "Sparkle without the cleanup — wipeable runner. Demo item — replace before publishing.",
    category: "newyear",
    collection: "newyear",
    giftGuide: ["party"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Confetti+Runner",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 9,
    title: "Demo — Crystal Champagne Flutes (Set of 4)",
    description: "Elegant stemware for midnight toasts. Demo item — replace before publishing.",
    category: "newyear",
    collection: "newyear",
    giftGuide: ["hostess"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Champagne+Flutes",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
  {
    id: 10,
    title: "Demo — Countdown Clock Display",
    description: "Battery-powered LED clock for your party table. Demo item — replace before publishing.",
    category: "newyear",
    collection: "newyear",
    giftGuide: ["party"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Countdown+Clock",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },

  /* ==============================
   *  VALENTINE'S DAY — Demo products
   * ============================== */
  {
    id: 11,
    title: "Demo — Rose-Gold Jewellery Tray",
    description: "A pretty place to keep everyday jewellery. Demo item — replace before publishing.",
    category: "valentines",
    collection: "valentines",
    giftGuide: ["forher"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Jewellery+Tray",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 12,
    title: "Demo — Heart-Shaped Waffle Maker",
    description: "Make breakfast a little more special. Demo item — replace before publishing.",
    category: "valentines",
    collection: "valentines",
    giftGuide: ["under25", "forher"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Waffle+Maker",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
  {
    id: 13,
    title: "Demo — Blush Linen Napkins (Set of 6)",
    description: "Soft pink napkins for a romantic dinner table. Demo item — replace before publishing.",
    category: "valentines",
    collection: "valentines",
    giftGuide: ["hostess"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Linen+Napkins",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },

  /* ==============================
   *  EVERYDAY HOME FINDS — Demo products
   * ============================== */
  {
    id: 14,
    title: "Demo — Woven Storage Basket (Large)",
    description: "Natural seagrass basket for blankets or toys. Demo item — replace before publishing.",
    category: "everyday",
    collection: "everyday",
    giftGuide: [],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Storage+Basket",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: true,
  },
  {
    id: 15,
    title: "Demo — Minimalist Wall Clock",
    description: "Clean wood-and-white design suits any room. Demo item — replace before publishing.",
    category: "everyday",
    collection: "everyday",
    giftGuide: ["under25"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Wall+Clock",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
  {
    id: 16,
    title: "Demo — Linen Throw Blanket (Oatmeal)",
    description: "Year-round layering in a neutral palette. Demo item — replace before publishing.",
    category: "everyday",
    collection: "everyday",
    giftGuide: ["forher", "hostess"],
    image: "https://placehold.co/600x600/FAF7F2/A65332?text=Throw+Blanket",
    price: "",
    amazonUrl: "YOUR_AMAZON_AFFILIATE_LINK",
    featured: false,
  },
];
