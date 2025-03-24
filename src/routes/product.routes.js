const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const { productValidation } = require('../validations/product.validation');
const validateInput = require('../middleware/validateInput');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestionar productos de café
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto (requiere autenticación)
 *     tags: [Products]
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
 *               - description
 *               - origin
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               origin:
 *                 type: string
 *               roastLevel:
 *                 type: string
 *                 enum: [suave, medio, oscuro]
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       422:
 *         description: Datos inválidos
 */
router.post('/', authMiddleware, productValidation, validateInput, productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put(
  '/:id',
  authMiddleware,
  productValidation,
  validateInput,
  productController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
