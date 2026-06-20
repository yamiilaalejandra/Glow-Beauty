import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/header.css';
import logo from '../assets/logo.jpeg';
import cartIcon from '../assets/cart.svg';
import userIcon from '../assets/user.svg';
import logoutIcon from '../assets/logout.svg';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('user')));
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';

  const hideNav = location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/admin');
  const logoLink = isAdminAuthenticated ? '/admin' : isAuthenticated ? '/products' : '/login';

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    setCartCount(totalCount);
    setIsAuthenticated(Boolean(localStorage.getItem('user')));
  }, [location]);

  const handleLogout = () => {
    if (isAdminAuthenticated) {
      localStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminAuthenticated');
      navigate('/admin/login');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to={logoLink} className="logo" aria-label="Glow Beauty">
            <img src={logo} alt="Glow Beauty" className="logo-image" />
          </Link>

          {isAuthenticated && !hideNav && (
            <div className="header-search">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}

          <div className="header-icons">
            {!isAuthenticated && !isAdminAuthenticated ? (
              <button className="icon-button" title="Iniciar sesión" onClick={() => navigate('/login')}>
                <img src={userIcon} alt="Iniciar sesión" className="icon-image" />
              </button>
            ) : (
              <button className="icon-button" title="Cerrar sesión" onClick={handleLogout}>
                <img src={logoutIcon} alt="Cerrar sesión" className="icon-image" />
              </button>
            )}

            {!isAdminAuthenticated && !hideNav && (
              <button
                className="icon-button"
                title="Carrito"
                onClick={() => navigate('/checkout')}
              >
                <img src={cartIcon} alt="Carrito" className="icon-image" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
