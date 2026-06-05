import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages.css';
import { getStoredProducts } from '../data/products';
import { getStoredAccessories } from '../data/accessories';

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  const [products, setProducts] = useState(() => getStoredProducts());
  const [accessories, setAccessories] = useState(() => getStoredAccessories());

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQuery(p.get('q') || '');
  }, [location.search]);

  useEffect(() => {
    const handleProductsUpdate = () => setProducts(getStoredProducts());
    const handleAccessoriesUpdate = () => setAccessories(getStoredAccessories());

    window.addEventListener('glowBeautyProductsUpdated', handleProductsUpdate);
    window.addEventListener('glowBeautyInventoryUpdated', handleAccessoriesUpdate);

    return () => {
      window.removeEventListener('glowBeautyProductsUpdated', handleProductsUpdate);
      window.removeEventListener('glowBeautyInventoryUpdated', handleAccessoriesUpdate);
    };
  }, []);

  const q = query.trim().toLowerCase();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );

  const filteredAccessories = accessories.filter(a =>
    a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
  );

  return (
    <main className="page-content">
      <div className="container">
        <h1>Resultados de búsqueda</h1>
        <p className="section-subtitle">Resultados para "{query}"</p>

        {q && (
          <>
            {filteredProducts.length > 0 && (
              <section>
                <h2>Productos</h2>
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
              </section>
            )}

            {filteredAccessories.length > 0 && (
              <section style={{ marginTop: 32 }}>
                <h2>Accesorios</h2>
                <div className="grid-3">
                  {filteredAccessories.map(item => (
                    <div key={item.id} className="product-card">
                      <div className="product-image">
                        <img src={item.image} alt={item.name} />
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

            {filteredProducts.length === 0 && filteredAccessories.length === 0 && (
              <p style={{ marginTop: 18 }}>No se encontraron resultados.</p>
            )}
          </>
        )}

        {!q && (
          <p>Ingresa un término en el buscador para encontrar productos y accesorios.</p>
        )}
      </div>
    </main>
  );
}
