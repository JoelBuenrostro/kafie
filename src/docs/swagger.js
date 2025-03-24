const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Kafie',
      version: '1.0.0',
      description: 'Documentación de la API REST para la plataforma de café Kafie',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // rutas anotadas con @swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
