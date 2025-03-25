const express = require('express');
const router = express.Router();

const {
  createSubscription,
  cancelSubscription,
} = require('../controllers/subscription.controller');

const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Endpoints para gestionar suscripciones de café
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Crear una suscripción de café
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, quantity, frequency]
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               frequency:
 *                 type: string
 *                 enum: [semanal, quincenal, mensual]
 *     responses:
 *       201:
 *         description: Suscripción creada
 */
router.post('/', authMiddleware, createSubscription);

/**
 * @swagger
 * /subscriptions/{id}/cancel:
 *   patch:
 *     summary: Cancelar una suscripción activa
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la suscripción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Suscripción cancelada
 *       403:
 *         description: No autorizado
 *       404:
 *         description: No encontrada
 */
router.patch('/:id/cancel', authMiddleware, cancelSubscription);

module.exports = router;
