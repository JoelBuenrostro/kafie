const express = require('express');
const router = express.Router();

// Ejemplo de endpoint temporal
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;
