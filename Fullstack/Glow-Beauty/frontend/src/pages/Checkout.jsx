import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages.css';
import { createOrder } from '../data/orders';
import { getImage } from '../data/imageMap';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    floorDepto: '',
    cityProvince: '',
    postalCode: '',
    paymentMethod: 'credit-card'
  });
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'number'
      ? item.price
      : parseFloat(String(item.price).replace(/[^0-9.-]+/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createOrder({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        shipping: {
          street: formData.street,
          number: formData.number,
          floorDepto: formData.floorDepto,
          postalCode: formData.postalCode,
          cityProvince: formData.cityProvince
        },
        paymentMethod: formData.paymentMethod,
        items: cart.map((item) => ({
          id: item.id,
          category: item.category,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        status: 'Pendiente'
      });
      localStorage.removeItem('cart');
      navigate('/confirmation');
    } catch (err) {
      setError(err.message || 'Error al procesar la compra.');
    }
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (cart.length === 0) {
    return (
      <main className="page-content">
        <div className="container">
          <h1>Tu Carrito</h1>
          <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <p style={{ fontSize: '18px', marginBottom: '24px' }}>Tu carrito está vacío</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="container">
        <h1>Carrito de Compra</h1>

        <div className="grid-2">
          <div className="checkout-cart">
            <h2>Tus Productos</h2>

            <div className="cart-items">
              {cart.map((item, index) => {
                const price = typeof item.price === 'number'
                  ? item.price
                  : parseFloat(String(item.price).replace(/[^0-9.-]+/g, ''));
                return (
                  <div key={index} className="cart-item">
                    <div className="cart-item-image">
                      {getImage(item) && <img src={getImage(item)} alt={item.name} />}
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>Cantidad: {item.quantity}</p>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    <div className="cart-item-price">
                      <p>${(price * item.quantity).toFixed(2)}</p>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(index)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="checkout-form-section">
            <h2>Información de Envío</h2>

            <form onSubmit={handleConfirmPurchase}>
              <div className="input-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="11 1234 5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="street">Calle</label>
                <input
                  id="street"
                  type="text"
                  name="street"
                  placeholder="Calle"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label htmlFor="number">Número</label>
                  <input
                    id="number"
                    type="text"
                    name="number"
                    placeholder="123"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="floorDepto">Piso / Depto</label>
                  <input
                    id="floorDepto"
                    type="text"
                    name="floorDepto"
                    placeholder="Piso y Depto"
                    value={formData.floorDepto}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label htmlFor="cityProvince">Ciudad / Provincia</label>
                  <input
                    id="cityProvince"
                    type="text"
                    name="cityProvince"
                    placeholder="Ciudad / Provincia"
                    value={formData.cityProvince}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="postalCode">Código Postal</label>
                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    placeholder="12345"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="paymentMethod">Método de Pago</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="credit-card">Tarjeta de Crédito</option>
                  <option value="debit-card">Tarjeta de Débito</option>
                  <option value="transfer">Transferencia Bancaria</option>
                </select>
              </div>

              <div className="order-summary card">
                <h3>Resumen de Compra</h3>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Impuesto (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {shipping === 0 && (
                  <p className="free-shipping-msg">✨ ¡Envío gratis! Compras mayores a $50</p>
                )}
              </div>

              {error && <div className="error-message" style={{ marginTop: '12px' }}>{error}</div>}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/products')}
                style={{ width: '100%', marginTop: '24px', padding: '16px' }}
              >
                Seguir Comprando
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px', padding: '16px' }}
              >
                Confirmar Compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
