import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { apiFetch } from '../data/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Usuario o contraseña de administrador incorrectos.');
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <div className="login-container">
          <div className="card login-card">
            <h1>Login Administrador</h1>
            <p className="subtitle">Accede al panel administrativo.</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Ingresar como Admin
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
