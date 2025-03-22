const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Rutas
const baseRoutes = require('./routes'); // Ruta base (ej: /api/)
const authRoutes = require('./routes/auth.routes'); // Rutas de autenticación
const productRoutes = require('./routes/product.routes'); // CRUD de productos

const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde otros dominios (como Netlify)
app.use(helmet()); // Agrega cabeceras de seguridad HTTP
app.use(morgan('dev')); // Logging de peticiones en desarrollo
app.use(express.json()); // Parsea cuerpos JSON en peticiones

// Rutas del sistema
app.use('/api', baseRoutes); // Ruta base: /api
app.use('/api/auth', authRoutes); // Rutas públicas y protegidas de autenticación
app.use('/api/products', productRoutes); // Rutas para productos

// Middleware 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

module.exports = app;
