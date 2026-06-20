import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { getStoredOrders } from '../data/orders';

export default function Confirmation() {
  const navigate = useNavigate();
  const orders = getStoredOrders();
  const latestOrder = orders[0];

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">
        <div className="card confirmation-card">

          <div className="confirmation-icon">🎉</div>

          <h1>¡Compra Realizada con Éxito!</h1>

          <p className="confirmation-message">
            Gracias por tu compra. Tu pedido ha sido confirmado y pronto
            recibirás un correo con los detalles del envío.
          </p>

          <div className="confirmation-details">
            <div className="detail-row">
              <span>Número de Pedido</span>
              <strong>
                {latestOrder
                  ? latestOrder.id
                  : `#GB${Math.random().toString(36).substring(2, 8).toUpperCase()}`}
              </strong>
            </div>

            {latestOrder && (
              <div className="detail-row">
                <span>Total</span>
                <strong>${latestOrder.total.toFixed(2)}</strong>
              </div>
            )}

            <div className="detail-row">
              <span>Estado</span>
              <strong>
                {latestOrder ? latestOrder.status : 'Procesando'}
              </strong>
            </div>

            <div className="detail-row">
              <span>Tiempo de Entrega</span>
              <strong>3-5 días hábiles</strong>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Volver al Inicio
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Seguir Comprando
          </button>

        </div>
      </div>
    </main>
  );
}