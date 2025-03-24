const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * /payments/checkout:
 *   post:
 *     summary: Iniciar proceso de pago con Stripe
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: URL de sesión Stripe creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/checkout', authMiddleware, createCheckoutSession);

module.exports = router;
