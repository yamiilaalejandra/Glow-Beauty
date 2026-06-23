const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const accessoryRoutes = require('./routes/accessories');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Limpiamos las URLs por defecto (Corregido el doble https://)
const defaultOrigins = [
  'http://localhost:5173',
  'https://glow-beauty-mocha.vercel.app',
  'https://glow-beauty-production.up.railway.app'
];

const rawOrigins = process.env.CORS_ORIGINS || '';
const allowedOrigins = rawOrigins
  ? rawOrigins.split(',').map((s) => s.trim()).filter(Boolean)
  : defaultOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed by server'), false);
    },
    credentials: true,
  })
);
app.use(express.json());

// 2. Soporte para ambas rutas (con y sin /api) por si tu frontend no usa /api
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // <--- Esto evita el error 404 que se veía en tu consola

app.use('/api/products', productRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

module.exports = app;