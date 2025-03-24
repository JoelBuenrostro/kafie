const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const validateInput = require('../middleware/validateInput');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación (registro, login)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       409:
 *         description: El email ya está registrado
 *       422:
 *         description: Datos de entrada inválidos
 */
router.post('/register', registerValidation, validateInput, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con email y contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       422:
 *         description: Datos de entrada inválidos
 */
router.post('/login', loginValidation, validateInput, loginUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Acceso permitido',
    user: req.user,
  });
});

module.exports = router;
