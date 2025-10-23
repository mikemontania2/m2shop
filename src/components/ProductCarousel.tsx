import React from 'react';
import Carousel, { Breakpoints } from './Carousel';
import ProductCard from './ProductCard';
import { Product } from '../interfaces/Productos.interface';
 
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
  // ⭐ NUEVAS PROPS para lazy loading
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
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
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}) => {
  if (!products || products.length === 0) return null;

  const handleNearEnd = () => {
    // Solo cargar si hay callback, hay más items disponibles y no está cargando
    if (onLoadMore && hasMore && !isLoadingMore) {
      console.log('📦 ProductCarousel: Solicitando más productos...');
      onLoadMore();
    }
  };

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
          onNearEnd={onLoadMore ? handleNearEnd : undefined}
          nearEndThreshold={3}
          isLoadingMore={isLoadingMore}
        />
      </div>
    </section>
  );
};

export default ProductCarousel;