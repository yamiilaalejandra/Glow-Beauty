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
const envOrigins = rawOrigins
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list (case-insensitive)
    const isAllowed = allowedOrigins.some(allowed => 
      origin.toLowerCase() === allowed.toLowerCase()
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('CORS rejected origin:', origin, 'Allowed origins:', allowedOrigins);
      callback(null, false);
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// 2. Soporte para ambas rutas (con y sin /api) por si tu frontend no usa /api
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // <--- Esto evita el error 404 que se veía en tu consola

app.use('/api/products', productRoutes);
app.use('/products', productRoutes); // soporte directo sin /api
app.use('/api/accessories', accessoryRoutes);
app.use('/accessories', accessoryRoutes); // soporte directo sin /api
app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes); // soporte directo sin /api

app.use(errorHandler);

module.exports = app;