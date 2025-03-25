const express = require('express');
const router = express.Router();
const { createContactMessage, getAllMessages } = require('../controllers/contact.controller');

const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Formulario de contacto y mensajes recibidos
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Enviar mensaje de contacto
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', createContactMessage);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Obtener todos los mensajes de contacto (admin)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mensajes
 */
router.get('/', authMiddleware, getAllMessages);

module.exports = router;
