require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,

  app: {
    name: 'Kafie Backend API',
    version: '1.0.0',
  },
  cors: {
    origin: '*', // o puedes limitarlo a tu frontend
  },
};

module.exports = config;
