const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { productValidation } = require('../validations/product.validation');
const validateInput = require('../middleware/validateInput');

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas con validación
router.post('/', authMiddleware, productValidation, validateInput, productController.createProduct);
router.put(
  '/:id',
  authMiddleware,
  productValidation,
  validateInput,
  productController.updateProduct
);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
