const { validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Error de validación',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validateInput;
