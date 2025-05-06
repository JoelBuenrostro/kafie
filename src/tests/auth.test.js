const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const config = require('../config/config');
const User = require('../models/user.model');

beforeAll(async () => {
  await mongoose.connect(config.dbUrl);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🧪 AUTH - Registro e Inicio de Sesión', () => {
  const userData = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: '123456',
  };

  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    expect(res.body.user.email).toBe(userData.email);
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('debería iniciar sesión correctamente', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  it('debería rechazar login con contraseña incorrecta', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: 'incorrecta',
    });
    expect(res.statusCode).toBe(401);
  });

  it('debería rechazar el registro de un usuario con email duplicado', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('El email ya está registrado');
  });
});
