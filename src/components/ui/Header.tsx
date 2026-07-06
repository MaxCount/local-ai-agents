'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

interface SubMenuItem {
  label: string;
  slug: string;
}

interface MenuItem {
  label: string;
  slug?: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Каталог',
    slug: '/catalog',
  },
  {
    label: 'Контакты',
    slug: '/contacts',
  },
  {
    label: 'Доставка и оплата',
    slug: '/delivery',
  },
  {
    label: 'Гарантия',
    slug: '/guarantee',
  },
  {
    label: 'Индивидуальный пошив',
    slug: '/custom',
  },
];

const categories = [
  {
    label: 'Чехлы',
    slug: 'chexly',
    submenu: [
      { label: 'Свадебные', slug: 'svadebnye' },
      { label: 'Из оксфорда', slug: 'iz-oksforda' },
      { label: 'Антимолевые', slug: 'antimolevye' },
      {
        label: 'Чехлы для',
        slug: 'chexly-dlya',
        children: [
          { label: 'Ковриков йоги', slug: 'kovrikov-jogi' },
          { label: 'Балетных пачек', slug: 'baletnyx-pachek' },
          { label: 'Укулели', slug: 'ukeleheli' },
        ],
      },
    ],
  },
  {
    label: 'Портпледы',
    slug: 'portpledy',
    submenu: [
      { label: 'Для купальника', slug: 'dlya-kupalnika' },
      { label: 'Дорожные', slug: 'dorozhnye' },
      { label: 'Школьные', slug: 'shkolnye' },
    ],
  },
  {
    label: 'Сумки',
    slug: 'sumki',
    submenu: [
      { label: 'Для ноутбуков', slug: 'dlya-noutbukov' },
      { label: 'Кожаные', slug: 'kozhanye' },
      { label: 'С защитой от дождя', slug: 's-zashhitoj-ot-dozhdya' },
    ],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { cartCount, setIsOpen: setCartOpen } = useCart();

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuEnter = (slug: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveSubmenu(slug);
  };

  const handleSubmenuLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider text-black hover:text-gray-700 transition-colors"
          >
            LINUCHI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('categories')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-black hover:text-gray-600 font-medium flex items-center gap-1">
                Категории
                <svg
                  className={`w-4 h-4 transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'categories' && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2"
                  onMouseEnter={() => handleMouseEnter('categories')}
                >
                  {categories.map((category) => (
                    <div
                      key={category.slug}
                      className="relative"
                      onMouseEnter={() => handleSubmenuEnter(category.slug)}
                      onMouseLeave={handleSubmenuLeave}
                    >
                      <Link
                        href={`/catalog?category=${category.slug}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-black hover:bg-gray-50"
                      >
                        {category.label}
                        {category.submenu && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>

                      {activeSubmenu === category.slug && category.submenu && (
                        <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 ml-1">
                          {category.submenu.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/catalog?category=${item.slug}`}
                              className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.slug}
                href={item.slug || '#'}
                className="text-black hover:text-gray-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Phone, Search, Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Phone */}
            <a
              href="tel:+375293870980"
              className="text-black hover:text-gray-600 font-medium"
            >
              +375 29 387-09-80
            </a>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-40 lg:w-56 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-black hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-black p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 px-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </form>

            {/* Mobile Phone */}
            <a
              href="tel:+375293870980"
              className="block px-4 py-2 text-black font-medium border-b border-gray-200"
            >
              +375 29 387-09-80
            </a>

            {/* Mobile Navigation */}
            <nav className="py-2">
              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <span className="font-semibold text-black">Категории</span>
              </div>
              {categories.map((category) => (
                <div key={category.slug} className="pl-4">
                  <Link
                    href={`/catalog?category=${category.slug}`}
                    className="block px-4 py-2 text-black hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.label}
                  </Link>
                  {category.submenu && (
                    <div className="pl-4">
                      {category.submenu.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/catalog?category=${item.slug}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug || '#'}
                  className="block px-4 py-2 text-black hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Cart */}
            <button
              onClick={() => {
                setCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-black hover:bg-gray-50"
            >
              <span>Корзина</span>
              {cartCount > 0 && (
                <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
