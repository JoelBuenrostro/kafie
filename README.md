# kafie

API REST para el sitio de café Kafie

---

## Características

- Autenticación con JWT
- Gestión de productos de café
- Pedidos con integración a Stripe
- Suscripciones periódicas (semanal, quincenal, mensual)
- Sistema de planes predefinidos
- Formulario de contacto y gestión de mensajes
- Webhooks de Stripe para pagos automáticos
- API documentada con Swagger (`/api/docs`)

---

## Tecnologías

- Node.js
- Express.js
- MongoDB + Mongoose
- Stripe (Checkout + Webhooks)
- Swagger UI
- bcrypt, jsonwebtoken
- dotenv, morgan, helmet, cors

---

## Scripts

```bash
npm run dev      # Ejecutar en desarrollo con nodemon
npm start        # Ejecutar en producción
npm lint         # Ejecutar eslint
npm format       # Ejecutar prettier
```

---

## 📚 Documentación API

Disponible en:

<http://localhost:3000/api/docs>

Incluye todos los endpoints con descripciones, parámetros y respuestas esperadas.

---

## 🔐 Rutas principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/login`    | Inicio de sesión |
| `GET`  | `/api/products`      | Lista de productos |
| `POST` | `/api/orders`        | Crear pedido |
| `POST` | `/api/payments/checkout` | Iniciar pago con Stripe |
| `POST` | `/api/subscriptions` | Crear suscripción |
| `GET`  | `/api/contact`       | Ver mensajes (admin) |
| `POST` | `/api/contact`       | Enviar mensaje |
| `POST` | `/api/plans`         | Crear plan de suscripción (admin) |

---

## Seguridad

- Tokens JWT para autenticación
- Validación de stock antes de pedidos
- Webhooks seguros con firma de Stripe
- Middleware de autorización (`authMiddleware`)

---

## Licencia

Este proyecto está bajo la licencia MIT.
