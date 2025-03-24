const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Crear un nuevo pedido
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

// Obtener todos los pedidos de un usuario
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validar que el usuario autenticado está consultando su propio historial
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para ver estos pedidos.' });
    }

    const orders = await Order.find({ user: userId })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
