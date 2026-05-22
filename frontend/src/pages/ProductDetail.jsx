import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages.css';
import { getProductById } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Producto no encontrado</p>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  return (
    <main className="page-content">
      <div className="container">
        <button onClick={() => navigate('/products')} className="back-link">
          ← Volver a Productos
        </button>

        <div className="grid-2" style={{ marginTop: '40px' }}>
          <div className="product-detail-image">
            <div className="large-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <div className="product-detail-price">
              {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}
            </div>
            <p className="product-detail-description">{product.longDescription}</p>

            <div className="product-detail-section">
              <h3>Ingredientes</h3>
              <p>{product.ingredients}</p>
            </div>

            <div className="quantity-selector">
              <label>Cantidad:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              style={{ width: '100%', marginTop: '24px', padding: '16px' }}
            >
              Agregar al Carrito
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
              style={{ width: '100%', marginTop: '12px', padding: '16px' }}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
