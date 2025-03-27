const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const config = require('../config/config');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');

let token, userId, productId;

beforeAll(async () => {
  await mongoose.connect(config.dbUrl);
  await User.deleteMany({});
  await Product.deleteMany({});

  // Crear usuario y token
  const user = await User.create({
    name: 'Tester Pedido',
    email: 'order@test.com',
    password: '123456',
  });

  userId = user._id;
  token = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });

  // Crear producto
  const product = await Product.create({
    name: 'Café pruebas orden',
    description: 'Un café de prueba para pedidos',
    price: 100,
    stock: 5,
  });

  productId = product._id;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // Limpia toda la DB de test
  await mongoose.connection.close();
});

describe('🧪 ÓRDENES - POST /api/orders', () => {
  it('debería crear un pedido exitosamente', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ product: productId.toString(), quantity: 2 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order.total).toBe(200);
  });

  it('debería fallar con stock insuficiente', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ product: productId.toString(), quantity: 100 }],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
