import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages.css';
import { apiFetch } from '../data/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email: data.email, firstName: data.firstName }));
      setError('');
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <div className="login-container">
          <div className="card login-card">
            <h1>Bienvenida a <br></br>Glow Beauty</h1>
            <p className="subtitle">Ingresa para acceder a nuestros productos exclusivos</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Ingresar
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>

            <div className="login-footer">
              <p>¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
              <p>¿Eres administrador? <Link to="/admin/login">Ingresar como admin</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
