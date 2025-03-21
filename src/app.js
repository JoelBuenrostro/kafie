const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Importar rutas (pronto)
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Kafie!');
});

module.exports = app;
