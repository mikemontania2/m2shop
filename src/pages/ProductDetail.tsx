import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Api, ProductDto as Product } from '../lib/api';
import { useCart } from '../contexts/CartContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  async function fetchProduct() {
    if (!slug) return;
    setLoading(true);
    const data = await Api.getProductBySlug(slug);
    setProduct(data);
    setLoading(false);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const hasDiscount = (product?.discount_percent ?? 0) > 0;
  const discountedPrice = product
    ? (hasDiscount
        ? Math.round(product.price * (1 - (product.discount_percent as number) / 100))
        : product.price)
    : 0;

  if (loading) {
    return <div className="container loading">Cargando producto...</div>;
  }

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Producto no encontrado</h2>
          <Link to="/productos" className="btn btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/productos">Productos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail">
          <div className="product-image-section">
            <img src={product.image_url} alt={product.name} onError={(e) => { (e.target as HTMLImageElement).src = '/fallback-product.jpg'; }} />
          </div>

          <div className="product-info-section">
            <div className="product-badges">
              {product.is_new && <span className="badge badge-new">Nuevo</span>}
              {product.is_featured && <span className="badge badge-featured">Destacado</span>}
            </div>

            <h1>{product.name}</h1>
            {hasDiscount ? (
              <p className="product-price-large">
                <span className="price-old">{formatPrice(product.price)}</span>
                <span className="price-new">{formatPrice(discountedPrice)}</span>
                <small className="discount-tag" style={{ marginLeft: 8 }}>Oferta {product.discount_percent}%</small>
              </p>
            ) : (
              <p className="product-price-large">{formatPrice(product.price)}</p>
            )}

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            {product.recommended_uses && (
              <div className="product-description">
                <h3>Usos recomendados</h3>
                <p>{product.recommended_uses}</p>
              </div>
            )}

            {product.properties && (
              <div className="product-description">
                <h3>Propiedades</h3>
                <p>{product.properties}</p>
              </div>
            )}

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">En stock ({product.stock} disponibles)</span>
              ) : (
                <span className="out-of-stock">Agotado</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCart} className="btn btn-primary btn-large">
                  Agregar al Carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
