const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const accessoryRoutes = require('./routes/accessories');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Limpiamos las URLs por defecto
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
    // Permitir peticiones sin origen (como Postman o curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list (case-insensitive)
    const isAllowed = allowedOrigins.some(allowed => 
      origin.toLowerCase() === allowed.toLowerCase()
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('CORS rejected origin:', origin, 'Allowed origins:', allowedOrigins);
      // CORRECCIÓN: Se envía un objeto Error para que Express responda correctamente y Railway no tire 502
      callback(new Error('Not allowed by CORS'));
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