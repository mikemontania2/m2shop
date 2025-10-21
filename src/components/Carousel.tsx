import React, { useEffect, useMemo, useRef, useState } from 'react';

export type Breakpoints = {
  default: number;
  md?: number; // <= 1024px
  sm?: number; // <= 768px
  xs?: number; // <= 480px
};

interface CarouselProps<T = any> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
  loop?: boolean;
  itemsPerView?: number | Breakpoints;
  slideBy?: number; // how many items to move per step
  ariaLabel?: string;
}

const getPerView = (itemsPerView?: number | Breakpoints): number => {
  if (!itemsPerView) return 4;
  if (typeof itemsPerView === 'number') return Math.max(1, Math.floor(itemsPerView));
  const width = window.innerWidth;
  if (width <= 480 && itemsPerView.xs) return itemsPerView.xs;
  if (width <= 768 && itemsPerView.sm) return itemsPerView.sm;
  if (width <= 1024 && itemsPerView.md) return itemsPerView.md;
  return itemsPerView.default;
};

function Carousel<T = any>(props: CarouselProps<T>) {
  const {
    items,
    renderItem,
    className,
    showArrows = true,
    showDots = true,
    autoPlay = false,
    autoPlayIntervalMs = 5000,
    loop = true,
    itemsPerView: itemsPerViewProp = { default: 4, md: 3, sm: 2, xs: 1 },
    slideBy: slideByProp,
    ariaLabel = 'carousel',
  } = props;

  const [perView, setPerView] = useState<number>(() => getPerView(itemsPerViewProp));
  const [current, setCurrent] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const maxIndex = Math.max(0, items.length - perView);
  const slideBy = Math.max(1, slideByProp ?? 1);

  useEffect(() => {
    const handler = () => setPerView(getPerView(itemsPerViewProp));
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [itemsPerViewProp]);

  useEffect(() => {
    // Ensure current index is valid after perView change
    setCurrent((prev) => Math.min(prev, Math.max(0, items.length - perView)));
  }, [perView, items.length]);

  useEffect(() => {
    if (!autoPlay || items.length <= perView) return;
    const id = setInterval(() => {
      setCurrent((prev) => {
        if (prev + slideBy <= maxIndex) return prev + slideBy;
        return loop ? 0 : prev;
      });
    }, autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, items.length, perView, slideBy, loop, maxIndex]);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(index, maxIndex)));
  };

  const next = () => {
    setCurrent((prev) => (prev + slideBy <= maxIndex ? prev + slideBy : (loop ? 0 : prev)));
  };

  const prev = () => {
    setCurrent((prev) => (prev - slideBy >= 0 ? prev - slideBy : (loop ? maxIndex : prev)));
  };

  const numDots = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.floor(maxIndex / slideBy) + 1;
  }, [items.length, perView, slideBy, maxIndex]);

  const activeDotIndex = useMemo(() => {
    if (slideBy === 0) return 0;
    return Math.floor(current / slideBy);
  }, [current, slideBy]);

  return (
    <div className={`carousel ${className || ''}`} aria-label={ariaLabel}>
      {showArrows && items.length > perView && (
        <>
          <button className="carousel-arrow prev" aria-label="Anterior" onClick={prev}>
            ‹
          </button>
          <button className="carousel-arrow next" aria-label="Siguiente" onClick={next}>
            ›
          </button>
        </>
      )}

      <div className="carousel-viewport">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            transform: `translateX(-${(current * 100) / perView}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="carousel-item"
              style={{ flex: `0 0 ${100 / perView}%` }}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      {showDots && numDots > 1 && (
        <div className="carousel-dots" role="tablist">
          {Array.from({ length: numDots }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeDotIndex === i}
              className={`carousel-dot ${activeDotIndex === i ? 'active' : ''}`}
              onClick={() => goTo(i * slideBy)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
