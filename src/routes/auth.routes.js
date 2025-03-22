const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Registro y login públicos
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida de ejemplo
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Acceso permitido',
    user: req.user,
  });
});

module.exports = router;
