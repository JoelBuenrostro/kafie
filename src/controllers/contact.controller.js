const ContactMessage = require('../models/contact.model');

// Crear nuevo mensaje
const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ message: 'Error al procesar el mensaje.' });
  }
};

// Obtener todos los mensajes (admin)
const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ message: 'Error al obtener los mensajes.' });
  }
};

module.exports = {
  createContactMessage,
  getAllMessages,
};
