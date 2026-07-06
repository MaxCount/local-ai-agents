'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  url: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  productTitle: string;
}

export default function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    images = [{ url: '/placeholder.jpg' }];
  }

  const selectedImage = images[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden group">
        <Image
          src={selectedImage.url}
          alt={`${productTitle} - изображение ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1">
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom Hint */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-sm text-gray-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Наведите для увеличения
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-300'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={`${productTitle} - миниатюра ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Dots (Mobile) */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedIndex === index ? 'bg-black w-4' : 'bg-gray-300'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
