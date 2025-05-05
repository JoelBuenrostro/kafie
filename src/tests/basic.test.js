const app = require('../app');
const request = require('supertest');

describe('💡 Pruebas básicas del sistema', () => {
  it('debería confirmar que el entorno de pruebas está activo', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('debería cargar correctamente la app de Express', () => {
    expect(app).toBeDefined();
  });

  it('debería responder con 404 en una ruta inexistente', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Ruta no encontrada');
  });
});
