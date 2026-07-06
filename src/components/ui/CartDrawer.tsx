'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CartDrawer({ isOpen: propsIsOpen, onClose: propsOnClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, subtotal, isOpen: contextIsOpen, setIsOpen } = useCart();
  
  const isOpen = propsIsOpen ?? contextIsOpen;
  const onClose = propsOnClose ?? (() => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'BYN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">Корзина</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              aria-label="Закрыть корзину"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="w-24 h-24 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-gray-500 text-lg mb-2">Корзина пуста</p>
                <p className="text-gray-400 text-sm mb-6">
                  Добавьте товары, чтобы оформить заказ
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Продолжить покупки
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-black font-medium text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-black font-semibold mb-2">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                            aria-label="Уменьшить количество"
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
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-black text-sm font-medium border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                            aria-label="Увеличить количество"
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
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Удалить товар"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 bg-white">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Итого:</span>
                <span className="text-xl font-bold text-black">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-3 bg-black text-white text-center font-medium rounded-full hover:bg-gray-800 transition-colors mb-3"
              >
                Оформить заказ
              </Link>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-600 hover:text-black text-sm underline transition-colors"
              >
                Продолжить покупки
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
