'use client';

import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  price: number;
  salePrice?: number;
  images?: { url: string }[];
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, setIsOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const displayPrice = product.salePrice || product.price;
  const imageUrl = product.images?.[0]?.url || '/placeholder.jpg';

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      title: product.title,
      price: displayPrice,
      quantity,
      image: imageUrl,
    });
    
    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 500);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Количество:</span>
        <div className="flex items-center border-2 border-black">
          <button
            type="button"
            onClick={decrementQuantity}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Уменьшить количество"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 h-10 text-center border-x-2 border-black focus:outline-none"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Увеличить количество"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium transition-all ${
          isAdding
            ? 'bg-green-600 text-white'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isAdding ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Добавлено!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            В корзину
          </>
        )}
      </button>

      {/* Quick Buy Button */}
      <button
        type="button"
        onClick={() => {
          handleAddToCart();
        }}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium border-2 border-black hover:bg-black hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Купить в один клик
      </button>
    </div>
  );
}
