import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages.css';
import { getAccessoryById } from '../data/accessories';

export default function AccessoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const accessory = getAccessoryById(id);

  if (!accessory) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Accesorio no encontrado</p>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      id,
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      description: accessory.description,
      quantity
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  return (
    <main className="page-content">
      <div className="container">
        <button onClick={() => navigate('/accessories')} className="back-link">
          ← Volver a Accesorios
        </button>

        <div className="grid-2" style={{ marginTop: '40px' }}>
          <div className="product-detail-image">
            <div className="large-image">
              <img src={accessory.image} alt={accessory.name} />
            </div>
          </div>

          <div className="product-detail-info">
            <h1>{accessory.name}</h1>
            <div className="product-detail-price">
              {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(accessory.price)}
            </div>
            <p className="product-detail-description">{accessory.longDescription}</p>

            <div className="product-detail-section">
              <h3>Ingredientes</h3>
              <p>{accessory.ingredients}</p>
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
              onClick={() => navigate('/accessories')}
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
