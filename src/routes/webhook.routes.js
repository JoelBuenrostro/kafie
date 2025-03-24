const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../controllers/webhook.controller');

// NOTA: Stripe requiere el body sin modificar
const bodyParser = require('body-parser');

router.post('/stripe', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
