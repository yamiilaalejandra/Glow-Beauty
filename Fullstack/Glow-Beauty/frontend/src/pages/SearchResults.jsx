import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages.css';
import { findProductsByQuery } from '../data/products';
import { findAccessoriesByQuery } from '../data/accessories';
import { getImage } from '../data/imageMap';

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQuery(p.get('q') || '');
  }, [location.search]);

  useEffect(() => {
    if (!query.trim()) return;
    Promise.all([findProductsByQuery(query), findAccessoriesByQuery(query)])
      .then(([prods, accs]) => {
        setProducts(prods);
        setAccessories(accs);
      })
      .catch(console.error);
  }, [query]);

  return (
    <main className="page-content">
      <div className="container">
        <h1>Resultados de búsqueda</h1>
        <p className="section-subtitle">Resultados para "{query}"</p>

        {query.trim() ? (
          <>
            {products.length > 0 && (
              <section>
                <h2>Productos</h2>
                <div className="grid-3">
                  {products.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        {getImage(product) && <img src={getImage(product)} alt={product.name} />}
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
              </section>
            )}

            {accessories.length > 0 && (
              <section style={{ marginTop: 32 }}>
                <h2>Accesorios</h2>
                <div className="grid-3">
                  {accessories.map(item => (
                    <div key={item.id} className="product-card">
                      <div className="product-image">
                        {getImage(item) && <img src={getImage(item)} alt={item.name} />}
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{item.name}</h3>
                        <p style={{ fontSize: '14px', marginBottom: '12px' }}>{item.description}</p>
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
              </section>
            )}

            {products.length === 0 && accessories.length === 0 && (
              <p style={{ marginTop: 18 }}>No se encontraron resultados.</p>
            )}
          </>
        ) : (
          <p>Ingresa un término en el buscador para encontrar productos y accesorios.</p>
        )}
      </div>
    </main>
  );
}
