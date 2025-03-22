const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

// ¡IMPORTANTE! Ejecutar la conexión antes de levantar el servidor
connectDB();

app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
});
