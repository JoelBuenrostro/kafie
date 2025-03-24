const Stripe = require('stripe');
const config = require('../config/config');
const Product = require('../models/product.model');

const stripe = new Stripe(config.stripeSecret);

const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No se enviaron productos para el pago.' });
    }

    const lineItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
      }

      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // en centavos
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:4321/success',
      cancel_url: 'http://localhost:4321/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error);
    res.status(500).json({ message: 'Error en el servidor de pagos' });
  }
};

module.exports = {
  createCheckoutSession,
};
