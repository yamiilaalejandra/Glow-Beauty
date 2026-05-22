import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages.css';
import { products } from '../data/products';

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get('search') || '');
  }, [location.search]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page-content">
      <div className="container">
        <h1>Nuestros Productos</h1>
        <div className="products-actions">
          <Link to="/accessories" className="btn btn-secondary">
            Ver Accesorios
          </Link>
        </div>

        <p className="section-subtitle">Descubre nuestra colección exclusiva de belleza</p>
        <div className="grid-3">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p style={{ fontSize: '14px', marginBottom: '12px' }}>{product.description}</p>
                <div className="product-price">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ width: '100%' }}
                >
                  Ver Producto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
