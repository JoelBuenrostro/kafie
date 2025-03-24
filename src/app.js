const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const config = require('./config/config');

// Rutas
const baseRoutes = require('./routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const webhookRoutes = require('./routes/webhook.routes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// ---------------------------
// Webhooks de Stripe (RAW BODY antes de JSON)
app.use('/api/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));

// ---------------------------
// Middlewares globales
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // Esto debe ir después del webhook Stripe

// ---------------------------
// Rutas API
app.use('/api', baseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes); // Incluye ya /stripe internamente

// ---------------------------
// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------
// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

module.exports = app;
