import { getProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

const categories = [
  {
    name: 'Чехлы',
    slug: 'chehly',
    subcategories: [
      { name: 'Свадебные', slug: 'svadebnye' },
      { name: 'Из оксфорда', slug: 'iz-oksforda' },
      { name: 'Антимолевые', slug: 'antimolevye' },
      { name: 'Чехлы для', slug: 'chehly-dlya', items: ['Ковриков йоги', 'Балетных пачек', 'Укулели'] },
    ],
  },
  {
    name: 'Портпледы',
    slug: 'portpledy',
    subcategories: [
      { name: 'Для купальника', slug: 'dlya-kupalnika' },
      { name: 'Дорожные', slug: 'dorozhnye' },
      { name: 'Школьные', slug: 'shkolnye' },
    ],
  },
  {
    name: 'Сумки',
    slug: 'sumki',
    subcategories: [
      { name: 'Для ноутбуков', slug: 'dlya-noutbukov' },
      { name: 'Кожаные', slug: 'kozhanye' },
      { name: 'С защитой от дождя', slug: 's-zashchitoy-ot-dozhdya' },
    ],
  },
];

const ITEMS_PER_PAGE = 12;

function Breadcrumb({ category, search }: { category?: string; search?: string }) {
  const items = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
  ];

  if (category) {
    const cat = categories.find(c => c.slug === category);
    if (cat) {
      items.push({ name: cat.name, href: `/catalog?category=${cat.slug}` });
    }
  }

  if (search) {
    items.push({ name: `Поиск: "${search}"`, href: `/catalog?search=${search}` });
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {index === items.length - 1 ? (
            <span className="text-black font-medium">{item.name}</span>
          ) : (
            <Link href={item.href} className="hover:text-black transition-colors">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

function SearchForm({ search }: { search?: string }) {
  return (
    <form action="/catalog" method="GET" className="relative">
      <input
        type="text"
        name="search"
        defaultValue={search}
        placeholder="Поиск товаров..."
        className="w-full border-2 border-black px-4 py-3 pr-12 focus:outline-none focus:border-gray-400"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}

function CategorySidebar({ activeCategory }: { activeCategory?: string }) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-8">
        <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Категории</h3>
        <nav className="space-y-1">
          <Link
            href="/catalog"
            className={`block px-3 py-2 transition-colors ${
              !activeCategory
                ? 'bg-black text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Все товары
          </Link>
          {categories.map((category) => (
            <div key={category.slug}>
              <Link
                href={`/catalog?category=${category.slug}`}
                className={`block px-3 py-2 font-medium transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
              {activeCategory === category.slug && category.subcategories.length > 0 && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/catalog?category=${category.slug}&subcategory=${sub.slug}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function MobileCategoryFilter({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="lg:hidden mb-6">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none border-2 border-black px-4 py-3">
          <span className="font-medium">
            {activeCategory
              ? categories.find(c => c.slug === activeCategory)?.name || 'Категории'
              : 'Все категории'}
          </span>
          <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="border-2 border-t-0 border-black mt-0">
          <Link
            href="/catalog"
            className={`block px-4 py-3 transition-colors ${
              !activeCategory ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            Все товары
          </Link>
          {categories.map((category) => (
            <div key={category.slug}>
              <Link
                href={`/catalog?category=${category.slug}`}
                className={`block px-4 py-3 font-medium transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </Link>
              {activeCategory === category.slug && category.subcategories.length > 0 && (
                <div className="ml-4 bg-gray-50">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/catalog?category=${category.slug}&subcategory=${sub.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  category,
  search,
}: {
  currentPage: number;
  totalPages: number;
  category?: string;
  search?: string;
}) {
  if (totalPages <= 1) return null;

  const createUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (page > 1) params.set('page', page.toString());
    const query = params.toString();
    return `/catalog${query ? `?${query}` : ''}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={createUrl(currentPage - 1)}
          className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
        >
          ← Назад
        </Link>
      )}
      
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createUrl(page as number)}
              className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'border-black hover:bg-black hover:text-white'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages && (
        <Link
          href={createUrl(currentPage + 1)}
          className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
        >
          Вперёд →
        </Link>
      )}
    </div>
  );
}

function ProductGrid({
  products,
  category,
  search,
  currentPage,
}: {
  products: Awaited<ReturnType<typeof getProducts>>;
  category?: string;
  search?: string;
  currentPage: number;
}) {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getCategoryTitle = () => {
    if (search) return `Результаты поиска: "${search}"`;
    if (category) {
      const cat = categories.find(c => c.slug === category);
      return cat?.name || 'Каталог';
    }
    return 'Все товары';
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{getCategoryTitle()}</h1>
        <p className="text-gray-600">
          {products.length} {getProductsCount(products.length)}
        </p>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-medium mb-2">Товары не найдены</h3>
          <p className="text-gray-600 mb-6">
            Попробуйте изменить параметры поиска или выбрать другую категорию
          </p>
          <Link
            href="/catalog"
            className="inline-block border-2 border-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors"
          >
            Показать все товары
          </Link>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        category={category}
        search={search}
      />
    </div>
  );
}

function getProductsCount(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
  if (lastDigit === 1) return 'товар';
  if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
  return 'товаров';
}

async function CatalogContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const currentPage = parseInt(params.page || '1', 10);

  const products = await getProducts({ category, search });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Каталог</h1>
          <p className="text-gray-400">LINUCHI — чехлы, сумки, портпледы</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb category={category} search={search} />

        {/* Search Bar */}
        <div className="mb-8">
          <SearchForm search={search} />
        </div>

        {/* Mobile Category Filter - shown on mobile */}
        <div className="lg:hidden mb-6">
          <MobileCategoryFilter activeCategory={category} />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <CategorySidebar activeCategory={category} />
          </div>

          {/* Products */}
          <ProductGrid
            products={products}
            category={category}
            search={search}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default async function CatalogPage(props: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <CatalogContent searchParams={props.searchParams} />
    </Suspense>
  );
}
