import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas deben coincidir exactamente.');
      return;
    }

    const registeredData = { firstName, lastName, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(registeredData));
    localStorage.setItem('user', JSON.stringify({ email, firstName }));
    setError('');
    console.log('Datos de registro:', registeredData);
    navigate('/products');
  };

  return (
    <main className="page-content">
      <div className="container">
        <div className="login-container">
          <div className="card register-card">
            <h1>Crear cuenta</h1>
            <p className="subtitle">Únete a Glow Beauty y descubre una experiencia de belleza única.</p>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="field-row">
                <div className="input-group">
                  <label htmlFor="firstName">Nombre</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={handleChange('lastName')}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
              </div>

              <div className="field-row">
                <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange('password')}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Repetir contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Crear cuenta
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>

            <div className="register-note">
              <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
