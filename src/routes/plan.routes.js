const express = require('express');
const router = express.Router();
const { getAllPlans, createPlan, deactivatePlan } = require('../controllers/plan.controller');

const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Endpoints para administrar planes de suscripción
 */

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Obtener todos los planes activos
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: Lista de planes
 */
router.get('/', getAllPlans);

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Crear un nuevo plan de suscripción
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - frequency
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [semanal, quincenal, mensual]
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plan creado exitosamente
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, createPlan);

/**
 * @swagger
 * /plans/{id}/deactivate:
 *   patch:
 *     summary: Desactivar un plan de suscripción
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del plan a desactivar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan desactivado exitosamente
 *       404:
 *         description: Plan no encontrado
 */
router.patch('/:id/deactivate', authMiddleware, deactivatePlan);

module.exports = router;
