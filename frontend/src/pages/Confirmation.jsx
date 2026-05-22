import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <main className="page-content">
      <div className="container">
        <div className="confirmation-container">
          <div className="card confirmation-card">
            <div className="confirmation-icon">🎉</div>
            <h1>¡Compra Realizada con Éxito!</h1>
            <p className="confirmation-message">
              Gracias por tu compra. Tu pedido ha sido confirmado y pronto recibirás un correo con los detalles del envío.
            </p>

            <div className="confirmation-details card">
              <div className="detail-row">
                <span>Número de Pedido:</span>
                <strong>#GB{Math.random().toString(36).substring(7).toUpperCase()}</strong>
              </div>
              <div className="detail-row">
                <span>Estado:</span>
                <strong>Procesando</strong>
              </div>
              <div className="detail-row">
                <span>Tiempo de Entrega:</span>
                <strong>3-5 días hábiles</strong>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate('/')}
              style={{ width: '100%', marginTop: '32px', padding: '16px' }}
            >
              Volver al Inicio
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
              style={{ width: '100%', marginTop: '12px', padding: '16px' }}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
