const Order = require('../models/order.model');
const Product = require('../models/product.model');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Debes agregar al menos un producto al pedido.' });
    }

    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
      }

      const quantity = parseInt(item.quantity, 10);
      if (quantity <= 0) {
        return res.status(400).json({ message: 'Cantidad inválida en el pedido.' });
      }

      validatedItems.push({ product: product._id, quantity });
      total += product.price * quantity;
    }

    const newOrder = new Order({
      user: userId,
      items: validatedItems,
      total,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order: newOrder,
    });
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

module.exports = {
  createOrder,
};
