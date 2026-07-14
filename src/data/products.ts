export const productCategories = [
  'Rudraksha',
  'Pooja Kits',
  'Idols & Murtis',
  'Spiritual Books',
  'Crystals & Gems',
  'Incense & Dhoop',
  'Pooja Essentials',
  'Pendants & Jewelry',
];

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  symbol: string;
  stock: number;
  rating: number;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: '5 Mukhi Rudraksha Mala',
    description: 'Authentic Nepali Rudraksha mala, 108 beads, energized.',
    category: 'Rudraksha',
    price: 1499,
    discountPrice: 1199,
    symbol: '🕉',
    stock: 24,
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Complete Pooja Thali Kit',
    description: 'Brass thali with all essentials for daily worship.',
    category: 'Pooja Kits',
    price: 2299,
    symbol: '🪔',
    stock: 15,
    rating: 4.6,
  },
  {
    id: 'p3',
    name: 'Brass Ganesha Idol',
    description: 'Hand-carved brass Ganesha murti, 6 inches, for home temples.',
    category: 'Idols & Murtis',
    price: 3499,
    discountPrice: 2999,
    symbol: 'ॐ',
    stock: 8,
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Bhagavad Gita (Sanskrit-English)',
    description: 'Illustrated dual-language edition with commentary.',
    category: 'Spiritual Books',
    price: 599,
    symbol: '📖',
    stock: 40,
    rating: 4.7,
  },
  {
    id: 'p5',
    name: 'Natural Rose Quartz Bracelet',
    description: 'Hand-strung crystal bracelet for love and healing energy.',
    category: 'Crystals & Gems',
    price: 899,
    symbol: '✦',
    stock: 32,
    rating: 4.5,
  },
  {
    id: 'p6',
    name: 'Sandalwood Dhoop Sticks (Pack of 100)',
    description: 'Pure sandalwood incense, hand-rolled, long-lasting fragrance.',
    category: 'Incense & Dhoop',
    price: 349,
    discountPrice: 299,
    symbol: '🪷',
    stock: 60,
    rating: 4.4,
  },
  {
    id: 'p7',
    name: 'Copper Kalash Set',
    description: 'Traditional copper kalash with coconut stand for pooja.',
    category: 'Pooja Essentials',
    price: 1799,
    symbol: '☾',
    stock: 18,
    rating: 4.6,
  },
  {
    id: 'p8',
    name: 'Om Pendant in Silver',
    description: 'Sterling silver Om pendant with adjustable chain.',
    category: 'Pendants & Jewelry',
    price: 1299,
    symbol: 'ॐ',
    stock: 22,
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 'p9',
    name: 'Rudraksha Bracelet (5 Mukhi)',
    description: 'Compact wrist mala for daily wear and protection.',
    category: 'Rudraksha',
    price: 699,
    symbol: '🕉',
    stock: 45,
    rating: 4.5,
  },
  {
    id: 'p10',
    name: 'Silver Plated Lakshmi Idol',
    description: 'Elegant silver-plated Lakshmi murti for prosperity corner.',
    category: 'Idols & Murtis',
    price: 2799,
    discountPrice: 2399,
    symbol: '❁',
    stock: 12,
    rating: 4.7,
  },
  {
    id: 'p11',
    name: 'Clear Quartz Pyramid',
    description: 'Amplifies positive energy, ideal for meditation spaces.',
    category: 'Crystals & Gems',
    price: 1099,
    symbol: '✦',
    stock: 20,
    rating: 4.3,
  },
  {
    id: 'p12',
    name: 'Camphor & Dhoop Combo Pack',
    description: 'Premium camphor tablets with sandalwood dhoop cones.',
    category: 'Incense & Dhoop',
    price: 249,
    symbol: '🪷',
    stock: 80,
    rating: 4.2,
  },
];
