const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const config = require('../config/config');
const Product = require('../models/product.model');

beforeAll(async () => {
  await mongoose.connect(config.dbUrl);

  // Crear un producto de prueba
  await Product.create({
    name: 'Café de prueba',
    description: 'Producto para pruebas automatizadas',
    price: 150,
    stock: 25,
  });
});

afterAll(async () => {
  await Product.deleteMany({});
  await mongoose.connection.close();
});

describe('🧪 PRODUCTOS - GET /api/products', () => {
  it('debería devolver un array de productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });
});
