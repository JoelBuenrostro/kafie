const { body } = require('express-validator');

const registerValidation = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),

  body('email').isEmail().withMessage('Debe ser un email válido'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Debe ser un email válido'),

  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

module.exports = {
  registerValidation,
  loginValidation,
};
