import { getProductBySlug, getProducts } from '@/lib/queries';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import ImageGallery from './ImageGallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const product = await getProductBySlug(slug);
  return product;
}

async function getRelatedProducts(currentProductId: string) {
  const products = await getProducts({ limit: 4 });
  return products.filter(p => p.id !== currentProductId).slice(0, 4);
}

function Breadcrumb({ product, category }: { product: { title: string; slug: string }; category?: { name: string; slug: string } }) {
  const items = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
  ];

  if (category) {
    items.push({ name: category.name, href: `/catalog?category=${category.slug}` });
  }

  items.push({ name: product.title, href: `/product/${product.slug}` });

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {index === items.length - 1 ? (
            <span className="text-black font-medium truncate max-w-[200px]" title={item.name}>
              {item.name}
            </span>
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

function ProductFeatures({ features }: { features?: string[] }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-3">Характеристики</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetails({ product }: { product: {
  id: string;
  title: string;
  price: number;
  salePrice?: number;
  description?: string;
  features?: string[];
  category?: { name: string; slug: string };
  images?: { url: string }[];
} }) {
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;

  return (
    <div className="space-y-6">
      {/* Category */}
      {product.category && (
        <Link 
          href={`/catalog?category=${product.category.slug}`}
          className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
        >
          {product.category.name}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold text-black">
          {displayPrice.toFixed(2)} руб
        </span>
        {hasDiscount && (
          <span className="text-xl text-gray-400 line-through">
            {product.price.toFixed(2)} руб
          </span>
        )}
        {hasDiscount && (
          <span className="bg-red-500 text-white text-sm px-2 py-1 font-medium">
            -{Math.round((1 - product.salePrice! / product.price) * 100)}%
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>{product.description}</p>
        </div>
      )}

      {/* Features */}
      <ProductFeatures features={product.features} />

      {/* Add to Cart */}
      <div className="pt-6 border-t border-gray-200">
        <AddToCartButton product={product} />
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>Бесплатная доставка от 3000 руб</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Возврат в течение 14 дней</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Гарантия качества</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Оплата при получении</span>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ products }: { products: Awaited<ReturnType<typeof getRelatedProducts>> }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);
  const images = product.images?.length ? product.images : [{ url: '/placeholder.jpg' }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">LINUCHI</h1>
          <p className="text-gray-400 mt-1">Чехлы, сумки, портпледы</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb product={product} category={product.category} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="order-1">
            <ImageGallery images={images} productTitle={product.title} />
          </div>

          {/* Product Details */}
          <div className="order-2">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <main>
      <ProductContent slug={slug} />
    </main>
  );
}
