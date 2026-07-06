'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  images?: { url: string }[];
  category?: { name: string; slug: string };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const imageUrl = product.images?.[0]?.url || '/placeholder.jpg';
  const displayPrice = product.salePrice || product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem({
      id: product.id,
      title: product.title,
      price: displayPrice,
      quantity: 1,
      image: imageUrl,
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="product-card bg-white overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 image-zoom">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white border border-black p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
            title="В корзину"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        {/* Info */}
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category?.name}</p>
          <h3 className="font-medium mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{displayPrice.toFixed(2)} руб</span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through">{product.price.toFixed(2)} руб</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
