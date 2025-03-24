const Stripe = require('stripe');
const config = require('../config/config');
const Order = require('../models/order.model');

const stripe = new Stripe(config.stripeSecret);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, config.stripeWebhookSecret);
  } catch (err) {
    console.error('⚠️ Error al verificar la firma:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Suponiendo que pasaste el ID del pedido en `metadata`
    const orderId = session.metadata.orderId;

    try {
      await Order.findByIdAndUpdate(orderId, { status: 'pagado' });
      console.log(`✅ Pedido ${orderId} marcado como pagado`);
    } catch (error) {
      console.error('❌ Error al actualizar pedido:', error);
    }
  }

  res.json({ received: true });
};

module.exports = {
  handleStripeWebhook,
};
