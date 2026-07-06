import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/queries";
import ProductCard from "@/components/ui/ProductCard";

const categories = [
  {
    name: "Чехлы",
    slug: "chehly",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    subcategories: [
      { name: "Свадебные", slug: "svadebnye" },
      { name: "Из оксфорда", slug: "iz-oksforda" },
      { name: "Антимолевые", slug: "antimolevye" },
    ],
  },
  {
    name: "Портпледы",
    slug: "portpledy",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    subcategories: [
      { name: "Для купальника", slug: "dlya-kupalnika" },
      { name: "Дорожные", slug: "dorozhnye" },
      { name: "Школьные", slug: "shkolnye" },
    ],
  },
  {
    name: "Сумки",
    slug: "sumki",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    subcategories: [
      { name: "Для ноутбуков", slug: "dlya-noutbukov" },
      { name: "Кожаные", slug: "kozhanye" },
      { name: "С защитой от дождя", slug: "s-zashchitoy-ot-dozhdya" },
    ],
  },
];

export default async function HomePage() {
  // Fetch featured products (first 6)
  const products = await getProducts({ limit: 6 });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              LINUCHI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Чехлы, сумки, портпледы
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-xl">
              Частное производственное унитарное предприятие ЛИНУЧИ — единственное 
              специализированное предприятие в Республике Беларусь по производству чехлов (футляров).
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/catalog"
                className="bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-colors"
              >
                В каталог
              </Link>
              <Link 
                href="/contacts"
                className="border border-white px-8 py-4 font-medium hover:bg-white hover:text-black transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог</h2>
            <p className="text-gray-600">Выберите категорию</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                href={`/catalog?category=${category.slug}`}
                className="group relative aspect-[4/5] overflow-hidden bg-gray-100"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {category.subcategories.map((sub) => (
                      <span key={sub.slug} className="text-sm bg-white/20 px-2 py-1">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Популярные товары</h2>
              <p className="text-gray-600">Бестселлеры нашего магазина</p>
            </div>
            <Link 
              href="/catalog"
              className="hidden md:inline-flex border-2 border-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors"
            >
              Все товары
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-10 md:hidden">
            <Link 
              href="/catalog"
              className="inline-flex border-2 border-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors"
            >
              Все товары
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Качество</h3>
              <p className="text-gray-600">Собственное производство в Беларуси</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Сроки</h3>
              <p className="text-gray-600">Изготовление от 1 до 5 дней</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Оплата</h3>
              <p className="text-gray-600">Наложенный платёж, ЕРИП, наличные</p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Tailoring */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Индивидуальный пошив</h2>
            <p className="text-xl text-gray-300 mb-8">
              Нужны чехлы по вашим размерам? Мы изготовим их специально для вас!
            </p>
            <Link 
              href="/custom"
              className="inline-flex bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-colors"
            >
              Заказать расчёт
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Свяжитесь с нами</h2>
          <p className="text-xl text-gray-600 mb-8">
            Пн-Пт 8:00-20:00
          </p>
          <a 
            href="tel:+375293870980"
            className="text-3xl md:text-4xl font-bold hover:text-gray-600 transition-colors"
          >
            +375 29 387-09-80
          </a>
        </div>
      </section>
    </div>
  );
}
