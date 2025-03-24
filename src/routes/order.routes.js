const express = require('express');
const router = express.Router();

const { createOrder, getOrdersByUser } = require('../controllers/order.controller');

const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gestionar pedidos de café
 */

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
 *                   required:
 *                     - product
 *                     - quantity
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
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, createOrder);

/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Obtener todos los pedidos de un usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos del usuario
 *       403:
 *         description: No autorizado para ver estos pedidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/:userId', authMiddleware, getOrdersByUser);

module.exports = router;
