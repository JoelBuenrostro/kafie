// src/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Habilita CORS
app.use(helmet()); // Cabeceras de seguridad
app.use(morgan('dev')); // Logging de peticiones
app.use(express.json()); // Parsea JSON en las peticiones

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Kafie!');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
