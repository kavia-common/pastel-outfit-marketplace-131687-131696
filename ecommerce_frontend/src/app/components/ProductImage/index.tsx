'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/app/constants/images';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={error ? PLACEHOLDER_IMAGE : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={alt.includes('hero')}
      />
    </div>
  );
}
