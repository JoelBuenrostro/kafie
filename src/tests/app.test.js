const request = require('supertest');
const app = require('../app');

describe('📦 API - Ruta base', () => {
  it('debería devolver 404 para rutas desconocidas', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Ruta no encontrada');
  });
});
