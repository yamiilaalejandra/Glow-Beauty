const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const accessoryRoutes = require('./routes/accessories');
const orderRoutes = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Allow configurable CORS origins via env var `CORS_ORIGINS` (comma-separated)
const rawOrigins = process.env.CORS_ORIGINS || '';
const defaultOrigins = [
  'http://localhost:5173',
  'https://https://glow-beauty-mocha.vercel.app',
  'https://glow-beauty-production.up.railway.app'
];

const allowedOrigins = rawOrigins
  ? rawOrigins.split(',').map((s) => s.trim()).filter(Boolean)
  : defaultOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
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

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

module.exports = app;
