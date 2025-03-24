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
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// ---------------------------
// Middlewares globales
// ---------------------------
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ---------------------------
// Rutas API
// ---------------------------
app.use('/api', baseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// ---------------------------
// Documentación Swagger
// ---------------------------
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------
// Middleware 404
// ---------------------------
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

module.exports = app;
