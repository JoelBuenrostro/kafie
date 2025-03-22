const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const config = require('./config/config');

// Rutas
const baseRoutes = require('./routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

// ---------------------------
// Middlewares de seguridad
// ---------------------------
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true, // permite enviar cookies si se usan en el futuro
  })
);

app.use(helmet()); // Cabeceras de seguridad (XSS, sniffing, etc.)
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', baseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

module.exports = app;
