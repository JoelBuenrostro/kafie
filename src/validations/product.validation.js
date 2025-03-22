const { body } = require('express-validator');

const productValidation = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('origin').notEmpty().withMessage('El origen es obligatorio'),
  body('roastLevel')
    .isIn(['suave', 'medio', 'oscuro'])
    .withMessage('El nivel de tueste debe ser suave, medio u oscuro'),
  body('price').isNumeric().withMessage('El precio debe ser un número'),
];

module.exports = {
  productValidation,
};
