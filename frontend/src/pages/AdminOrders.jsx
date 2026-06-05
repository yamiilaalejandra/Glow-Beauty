import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { deleteOrderById, getStoredOrders } from '../data/orders';

const currencyFormat = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
});

const formatDateTime = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Fecha inválida';
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  const loadOrders = () => {
    const storedOrders = getStoredOrders();
    return storedOrders
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  useEffect(() => {
    setOrders(loadOrders());

    const handleOrdersUpdated = () => {
      setOrders(loadOrders());
    };

    window.addEventListener('glowBeautyOrdersUpdated', handleOrdersUpdated);
    return () => {
      window.removeEventListener('glowBeautyOrdersUpdated', handleOrdersUpdated);
    };
  }, []);

  const handleDeleteOrder = (orderId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    const updatedOrders = deleteOrderById(orderId);
    setOrders(updatedOrders.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setMessage('Orden eliminada correctamente.');
  };

  return (
    <main className="page-content">
      <div className="container">
        <div className="admin-orders-header">
          <div>
            <h1>Órdenes de Compra</h1>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
            Volver al Panel Principal
          </button>
        </div>

        {message && <div className="admin-message">{message}</div>}

        {orders.length === 0 ? (
          <div className="admin-card" style={{ padding: '32px', textAlign: 'center' }}>
            <p>No hay órdenes registradas en este momento.</p>
          </div>
        ) : (
          <div className="admin-orders-grid">
            {orders.map((order) => (
              <article key={order.id} className="order-card">
                <header className="order-card-title">
                  <div>
                    <h2>Orden {order.id}</h2>
                    <p>{formatDateTime(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    {order.status || 'Pendiente'}
                  </div>
                </header>

                <section className="order-section">
                  <h3>Datos del Pedido</h3>
                  <div className="order-detail-row">
                    <span>ID de Orden</span>
                    <strong>{order.id}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Fecha / Hora</span>
                    <strong>{formatDateTime(order.createdAt)}</strong>
                  </div>
                </section>

                <section className="order-section">
                  <h3>Cliente y Envío</h3>
                  <div className="order-detail-row">
                    <span>Nombre</span>
                    <strong>{order.customerName || 'N/A'}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Teléfono</span>
                    <strong>{order.phone || 'N/A'}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Email</span>
                    <strong>{order.email || 'N/A'}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Dirección</span>
                    <strong>
                      {order.shipping?.street || 'N/A'} {order.shipping?.number || ''}
                      {order.shipping?.floorDepto ? `, ${order.shipping.floorDepto}` : ''}
                    </strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Ciudad / Provincia</span>
                    <strong>{order.shipping?.cityProvince || 'N/A'}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Código Postal</span>
                    <strong>{order.shipping?.postalCode || 'N/A'}</strong>
                  </div>
                </section>

                <section className="order-section order-items-section">
                  <h3>Detalle de la Compra</h3>
                  <div className="order-items-table-wrapper">
                    <table className="order-items-table">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Precio unitario</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => {
                          const price = Number(item.price) || 0;
                          return (
                            <tr key={`${order.id}-${item.id}-${index}`}>
                              <td>{item.name}</td>
                              <td>{currencyFormat.format(price)}</td>
                              <td>{item.quantity}</td>
                              <td>{currencyFormat.format(price * item.quantity)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="order-total-row">
                    <span>Total general</span>
                    <strong>{currencyFormat.format(Number(order.total) || 0)}</strong>
                  </div>
                </section>

                <div className="order-card-actions">
                  <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                    Eliminar Orden
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
