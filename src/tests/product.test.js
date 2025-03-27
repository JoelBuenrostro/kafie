const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const config = require('../config/config');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await mongoose.connect(config.dbUrl);
  await Product.deleteMany({});
  await User.deleteMany({});

  // Crear usuario de prueba y token
  const testUser = await User.create({
    name: 'Admin Test',
    email: 'admin@test.com',
    password: '123456', // Hasheado por el middleware en tu modelo
  });

  token = jwt.sign({ id: testUser._id }, config.jwtSecret, {
    expiresIn: '1h',
  });

  // Crear producto base
  await Product.create({
    name: 'Café de prueba',
    description: 'Producto para pruebas automatizadas',
    price: 150,
    stock: 25,
  });
});

afterAll(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('🧪 PRODUCTOS - API', () => {
  it('GET /products - debería devolver una lista de productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });

  it('POST /products - debería permitir crear un nuevo producto con token', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Café oscuro premium',
        description: 'Nuevo café para prueba',
        price: 180,
        stock: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('product');
    expect(res.body.product.name).toBe('Café oscuro premium');
  });

  it('POST /products - debería rechazar creación sin token', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Café no autorizado',
      description: 'Debe fallar',
      price: 180,
      stock: 10,
    });

    expect(res.statusCode).toBe(401);
  });
});
