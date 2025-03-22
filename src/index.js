const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

connectDB(); // ← conectar antes de iniciar servidor

app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
});
