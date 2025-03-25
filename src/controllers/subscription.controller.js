const Subscription = require('../models/subscription.model');
const Product = require('../models/product.model');

// Crear suscripción
const createSubscription = async (req, res) => {
  try {
    const { product, quantity, frequency } = req.body;
    const userId = req.user.id;

    // Validaciones básicas
    if (!product || !quantity || !frequency) {
      return res.status(400).json({ message: 'Faltan datos de la suscripción.' });
    }

    const producto = await Product.findById(product);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const nuevaSuscripcion = new Subscription({
      user: userId,
      product,
      quantity,
      frequency,
    });

    await nuevaSuscripcion.save();

    res.status(201).json({
      message: 'Suscripción creada exitosamente',
      subscription: nuevaSuscripcion,
    });
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    res.status(500).json({ message: 'Error interno al crear la suscripción' });
  }
};

// Cancelar suscripción
const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const subscripcion = await Subscription.findById(id);

    if (!subscripcion) {
      return res.status(404).json({ message: 'Suscripción no encontrada.' });
    }

    if (subscripcion.user.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para cancelar esta suscripción.' });
    }

    subscripcion.status = 'cancelada';
    await subscripcion.save();

    res.status(200).json({
      message: 'Suscripción cancelada exitosamente',
      subscription: subscripcion,
    });
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ message: 'Error al cancelar la suscripción' });
  }
};

module.exports = {
  createSubscription,
  cancelSubscription,
};
