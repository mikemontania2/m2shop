import React from 'react';
import Carousel, { Breakpoints } from './Carousel';
import ProductCard from './ProductCard';
import type { Product } from '../services/productService';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  className?: string;
  itemsPerView?: number | Breakpoints;
  slideBy?: number;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
  onProductClick?: (productId: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  className,
  itemsPerView = { default: 4, md: 3, sm: 2, xs: 1 },
  slideBy = 1,
  autoPlay = false,
  autoPlayIntervalMs = 5000,
  onProductClick,
  onAddToCart,
}) => {
  if (!products || products.length === 0) return null;
  return (
    <section className={`product-carousel ${className || ''}`}>
      {title && <h2 className="section-title">{title}</h2>}
      <div className="container">
        <Carousel
          items={products}
          itemsPerView={itemsPerView}
          slideBy={slideBy}
          autoPlay={autoPlay}
          autoPlayIntervalMs={autoPlayIntervalMs}
          showArrows
          showDots
          renderItem={(p) => (
            <ProductCard product={p} onProductClick={onProductClick} onAddToCart={onAddToCart} />
          )}
        />
      </div>
    </section>
  );
};

export default ProductCarousel;
