const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID del producto
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos del pedido
 */
router.post('/', authMiddleware, createOrder);

module.exports = router;
