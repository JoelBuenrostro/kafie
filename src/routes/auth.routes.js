const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const validateInput = require('../middleware/validateInput');

router.post('/register', registerValidation, validateInput, registerUser);
router.post('/login', loginValidation, validateInput, loginUser);

module.exports = router;
