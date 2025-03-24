const Stripe = require('stripe');
const config = require('../config/config');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

const stripe = new Stripe(config.stripeSecret);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, config.stripeWebhookSecret);
  } catch (err) {
    console.error('⚠️ Error al verificar la firma del webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Procesar evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return res.status(400).json({ message: 'Falta orderId en metadata del checkout.' });
    }

    try {
      // Marcar el pedido como pagado
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: 'pagado' },
        { new: true }
      ).populate('items.product');

      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado.' });
      }

      // Descontar stock de cada producto
      for (const item of order.items) {
        const product = item.product;
        product.stock = Math.max(product.stock - item.quantity, 0); // Evita stock negativo
        await product.save();
      }

      console.log(`✅ Pedido ${orderId} actualizado a "pagado" y stock descontado`);
      res.status(200).json({ received: true });
    } catch (error) {
      console.error('❌ Error al actualizar pedido o descontar stock:', error);
      res.status(500).json({ message: 'Error al procesar el webhook' });
    }
  } else {
    // Evento no relevante
    res.status(200).json({ received: true });
  }
};

module.exports = {
  handleStripeWebhook,
};
