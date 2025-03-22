const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Rutas
const baseRoutes = require('./routes'); // Ruta base (ej: /api/)
const authRoutes = require('./routes/auth.routes'); // Rutas de autenticación

const app = express();

// Middlewares globales
app.use(cors()); // Habilita CORS
app.use(helmet()); // Seguridad con cabeceras HTTP
app.use(morgan('dev')); // Logs de peticiones
app.use(express.json()); // Parsea JSON en el body

// Rutas
app.use('/api', baseRoutes); // Ruta base (ej: /api/)
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Ruta para errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
