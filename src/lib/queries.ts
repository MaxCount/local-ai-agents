interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  images?: { url: string }[];
  category?: { name: string; slug: string };
  description?: string;
  features?: string[];
}

// Mock data for development (will be replaced with Payload queries in production)
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Чехол для балетной пачки ЛЕГКИЙ, 100*100*10см',
    slug: 'chehol-dlya-baletnoj-pachki-legkij-100-100-10sm',
    price: 30.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop' },
    ],
    description: 'Легкий и прочный чехол для хранения и транспортировки балетных пачек. Изготовлен из качественного дышащего материала, защищает от пыли и загрязнений.',
    features: [
      'Размер: 100*100*10см',
      'Легкий дышащий материал',
      'Защита от пыли и грязи',
      'Удобная ручка для переноски',
      'Водоотталкивающая пропитка',
    ],
    category: { name: 'Чехлы для', slug: 'chehly-dlya' },
  },
  {
    id: '2',
    title: 'Чехол для балетной пачки СТАНДАРТ, 100*100*15см',
    slug: 'chehol-dlya-baletnoj-pachki-standart-100-100-15sm',
    price: 55.05,
    images: [
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop' },
    ],
    description: 'Усиленный чехол для балетных пачек с дополнительной защитой. Увеличенная глубина подходит для объемных нарядов.',
    features: [
      'Размер: 100*100*15см',
      'Усиленное дно',
      'Молния по периметру',
      'Внутренний карман',
    ],
    category: { name: 'Чехлы для', slug: 'chehly-dlya' },
  },
  {
    id: '3',
    title: 'Портплед свадебный ПРЕМИУМ, 180*60*20см',
    slug: 'portpled-svadebnyj-premium-180-60-20sm',
    price: 89.00,
    salePrice: 75.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop' },
    ],
    description: 'Элегантный портплед для свадебного платья. Премиальное качество с усиленной защитой от пыли и механических повреждений.',
    features: [
      'Размер: 180*60*20см',
      'Премиальный материал',
      'Антистатическая подкладка',
      'Усиленные швы',
      'Чехол для аксессуаров в комплекте',
    ],
    category: { name: 'Портпледы', slug: 'portpledy' },
  },
  {
    id: '4',
    title: 'Чехол для коврика йоги 180*60см',
    slug: 'chehol-dlya-kovrika-jogi-180-60sm',
    price: 18.50,
    images: [
      { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop' },
    ],
    description: 'Практичный чехол для коврика йоги и фитнеса. Легкий, компактный, удобный для переноски на занятия.',
    features: [
      'Размер: 180*60см',
      'Быстрая фиксация коврика',
      'Регулируемый ремень',
      'Сетчатый карман для мелочей',
    ],
    category: { name: 'Чехлы', slug: 'chehly' },
  },
  {
    id: '5',
    title: 'Сумка для ноутбука 15.6" кожаная',
    slug: 'sumka-dlya-noutbuka-15-6-kozhanaya',
    price: 110.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop' },
    ],
    description: 'Стильная сумка для ноутбука из натуральной кожи. Классический дизайн подходит для деловых поездок и повседневного использования.',
    features: [
      'Подходит для ноутбуков 15.6"',
      'Натуральная кожа',
      'Отделение для документов',
      'USB-порт для зарядки',
      'Съемный плечевой ремень',
    ],
    category: { name: 'Сумки', slug: 'sumki' },
  },
  {
    id: '6',
    title: 'Портплед дорожный СТАНДАРТ 120*60*15см',
    slug: 'portpled-dorozhnyj-standart-120-60-15sm',
    price: 45.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop' },
    ],
    description: 'Универсальный дорожный портплед для костюмов и одежды. Компактный размер удобен для перевозки в багажнике.',
    features: [
      'Размер: 120*60*15см',
      'Водонепроницаемое дно',
      'Прозрачное окно для этикетки',
      'Удобные ручки',
    ],
    category: { name: 'Портпледы', slug: 'portpledy' },
  },
  {
    id: '7',
    title: 'Чехол свадебный для платья 200*70см',
    slug: 'chehol-svadebnyj-dlya-platya-200-70sm',
    price: 52.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=800&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop' },
    ],
    description: 'Специальный чехол для свадебных и вечерних платьев. Защищает нежную ткань от пыли, света и механических повреждений.',
    features: [
      'Размер: 200*70см',
      'Мягкая подкладка',
      'Антимолевая защита',
      'Вентиляционные отверстия',
      'Застежка-молния',
    ],
    category: { name: 'Чехлы', slug: 'chehly' },
  },
  {
    id: '8',
    title: 'Портплед школьный для костюма',
    slug: 'portpled-shkolnyj-dlya-kostyuma',
    price: 38.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop' },
    ],
    description: 'Практичный портплед для школьной формы и костюмов. Помогает сохранить одежду в идеальном состоянии.',
    features: [
      'Оптимальный размер для формы',
      'Прочный материал',
      'Легко очищается',
      'Компактное хранение',
    ],
    category: { name: 'Портпледы', slug: 'portpledy' },
  },
];

interface GetProductsOptions {
  limit?: number;
  category?: string;
  search?: string;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  // In production, this would query Payload CMS
  // For now, return mock data
  let filtered = [...mockProducts];
  
  if (options.category) {
    filtered = filtered.filter(p => 
      p.category?.slug === options.category
    );
  }
  
  if (options.search) {
    const search = options.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search)
    );
  }
  
  if (options.limit) {
    filtered = filtered.slice(0, options.limit);
  }
  
  return filtered;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mockProducts.find(p => p.slug === slug) || null;
}
