import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { deleteOrderById, getStoredOrders, updateOrderStatus } from '../data/orders';

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

const STATUS_OPTIONS = ['Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'];

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  const loadOrders = async () => {
    try {
      const data = await getStoredOrders();
      setOrders(data.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      setMessage('Error al cargar órdenes: ' + err.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.');
    if (!confirmed) return;
    try {
      await deleteOrderById(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setMessage('Orden eliminada correctamente.');
    } catch (err) {
      setMessage('Error al eliminar: ' + err.message);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: updated.status } : o)));
      setMessage('Estado actualizado correctamente.');
    } catch (err) {
      setMessage('Error al actualizar estado: ' + err.message);
    }
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
                    <h2>Orden {order.orderId || order.id}</h2>
                    <p>{formatDateTime(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    <select
                      value={order.status || 'Pendiente'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '4px' }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </header>

                <section className="order-section">
                  <h3>Datos del Pedido</h3>
                  <div className="order-detail-row">
                    <span>ID de Orden</span>
                    <strong>{order.orderId || order.id}</strong>
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
                      {order.street || 'N/A'} {order.number || ''}
                      {order.floorDepto ? `, ${order.floorDepto}` : ''}
                    </strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Ciudad / Provincia</span>
                    <strong>{order.cityProvince || 'N/A'}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Código Postal</span>
                    <strong>{order.postalCode || 'N/A'}</strong>
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
                        {(order.items || []).map((item, index) => {
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
