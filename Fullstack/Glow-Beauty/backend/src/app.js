const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const accessoryRoutes = require('./routes/accessories');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. MIDDLEWARE DE PARSING (antes de CORS)
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'glow-beauty-backend' });
});

// 2. Limpiamos las URLs por defecto
const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://glow-beauty-mocha.vercel.app',
  'https://glow-beauty-production.up.railway.app'
];

const rawOrigins = process.env.CORS_ORIGINS || '';
const envOrigins = rawOrigins
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = origin.toLowerCase();
  const isLocalhost = normalizedOrigin.startsWith('http://localhost:') || normalizedOrigin.startsWith('http://127.0.0.1:');
  const isVercel = normalizedOrigin.endsWith('.vercel.app');
  const isRailway = normalizedOrigin.includes('.railway.app');
  const isGithubDev = normalizedOrigin.endsWith('.app.github.dev');

  if (isLocalhost || isVercel || isRailway || isGithubDev) {
    return true;
  }

  return allowedOrigins.some((allowed) => normalizedOrigin === allowed.toLowerCase());
};

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o curl)
    if (!origin) return callback(null, true);

    if (isAllowedOrigin(origin)) {
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

// 3. MIDDLEWARE DE CORS (después de parsing)
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 2. Soporte para ambas rutas (con y sin /api)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); 

app.use('/api/products', productRoutes);
app.use('/products', productRoutes); 
app.use('/api/accessories', accessoryRoutes);
app.use('/accessories', accessoryRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes); 

app.use(errorHandler);

module.exports = app;