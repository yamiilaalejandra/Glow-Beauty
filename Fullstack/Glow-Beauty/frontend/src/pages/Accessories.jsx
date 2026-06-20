import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages.css';
import { getStoredAccessories } from '../data/accessories';
import { getImage } from '../data/imageMap';

export default function Accessories() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [accessories, setAccessories] = useState([]);

  const loadAccessories = async () => {
    try {
      const data = await getStoredAccessories();
      setAccessories(data);
    } catch (err) {
      console.error('Error al cargar accesorios:', err);
    }
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setSearchTerm(sp.get('search') || '');
  }, [location.search]);

  const filtered = accessories.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page-content">
      <div className="container">
        <h1>Accesorios</h1>

        <div style={{ margin: '22px 0' }}>
          <Link to="/products" className="btn btn-secondary">
            Ver Productos
          </Link>
        </div>

        <p className="section-subtitle">Accesorios que completan tu estilo</p>

        <div className="grid-3">
          {filtered.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                {getImage(item) && <img src={getImage(item)} alt={item.name} />}
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p style={{ fontSize: '14px', marginBottom: '12px' }}>{item.description}</p>
                <div className="product-detail-stock" style={{ marginBottom: '10px' }}>
                  <strong>Stock:</strong> {item.stock || 0}
                </div>
                <div className="product-price">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)}</div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/accessory/${item.id}`)}
                  style={{ width: '100%' }}
                >
                  Ver Accesorio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
