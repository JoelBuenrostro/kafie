describe('🧪 PAGOS - POST /api/payments/checkout', () => {
  it('debería crear una sesión de Stripe', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ product: productId.toString(), quantity: 1 }],
        orderId: '1234567890abcdef12345678',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('url');
    expect(res.body.url).toContain('https://checkout.stripe.com');
  });

  it('debería fallar si no hay token', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .send({
        items: [{ product: productId.toString(), quantity: 1 }],
        orderId: '1234567890abcdef12345678',
      });

    expect(res.statusCode).toBe(401);
  });
});
