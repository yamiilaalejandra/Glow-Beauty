import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/pages.css';
import { getAccessoryById } from '../data/accessories';
import { getImage } from '../data/imageMap';

export default function AccessoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [accessory, setAccessory] = useState(null);

  useEffect(() => {
    getAccessoryById(id).then(setAccessory).catch(console.error);
  }, [id]);

  if (!accessory) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Cargando...</p>
        </div>
      </main>
    );
  }

  const availableStock = accessory.stock || 0;
  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      id: accessory.id,
      category: 'accessory',
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      description: accessory.description,
      quantity: Math.min(quantity, availableStock)
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
              {getImage(accessory) && <img src={getImage(accessory)} alt={accessory.name} />}
            </div>
          </div>

          <div className="product-detail-info">
            <h1>{accessory.name}</h1>
            <div className="product-detail-price">
              {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(accessory.price)}
            </div>
            <p className="product-detail-description">{accessory.longDescription}</p>

            <div className="product-detail-section">
              <h3>Componentes</h3>
              <p>{accessory.ingredients}</p>
            </div>

            <div className="product-detail-stock">
              <strong>Stock:</strong> {availableStock} unidad{availableStock === 1 ? '' : 'es'}
            </div>

            <div className="quantity-selector">
              <label>Cantidad:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} disabled={isOutOfStock}>−</button>
                <span>{Math.min(quantity, availableStock || 1)}</span>
                <button onClick={() => setQuantity((prev) => Math.min(prev + 1, availableStock || 1))} disabled={isOutOfStock}>+</button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{ width: '100%', marginTop: '24px', padding: '16px' }}
            >
              {isOutOfStock ? 'Producto Agotado' : 'Agregar al Carrito'}
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
