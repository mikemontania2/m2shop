import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProductDto as Product } from '../lib/api';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1800);
  };

  const hasDiscount = (product.discount_percent ?? 0) > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - (product.discount_percent as number) / 100))
    : product.price;

  return (
    <Link to={`/producto/${product.slug}`} className="product-card">
      <div className="product-image">
        <img
          src={product.image_url}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://cdn.cavallaro.com.py/productos/300000918.jpg';
          }}
        />
        {hasDiscount && (
          <img className="badge-image badge-sale" src="/badge-sale.png" alt="Oferta" />
        )}
        {product.is_new && (
          <img className="badge-image badge-new" src="/badge-new.png" alt="Nuevo" />
        )}
        {!product.is_new && product.is_featured && (
          <span className="badge badge-featured">Destacado</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {hasDiscount ? (
          <p className="product-price">
            <span className="price-old">{formatPrice(product.price)}</span>
            <span className="price-new">{formatPrice(discountedPrice)}</span>
          </p>
        ) : (
          <p className="product-price">{formatPrice(product.price)}</p>
        )}
        <button onClick={handleAddToCart} className="btn btn-primary">
          Agregar al Carrito
        </button>
      </div>

      {added && (
        <div className="toast-added" aria-live="polite">
          Agregado al carrito
        </div>
      )}
    </Link>
  );
}
