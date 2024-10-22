// 

require('dotenv').config();
console.log('Variables de entorno cargadas en app.js:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const express = require('express');
const cors = require('cors');
const app = express();
const { errorHandler } = require('./utils/errorHandler');
const authRoutes = require('./routes/auth');
const contractRoutes = require('./routes/contracts'); // Importación de rutas de contratos
const chatRoutes = require('./routes/chat');
const sequelize = require('./config/database');

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes); // Uso de rutas de contratos
app.use('/api/chat', chatRoutes);

// Manejador de errores
app.use(errorHandler);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de NotaryAI funcionando correctamente' });
});

// Sincronizar modelos y iniciar el servidor
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // Sincronizar la base de datos
  .then(() => {
    console.log('Base de datos y tablas creadas');
    app.listen(PORT, () => {
      console.log(`Servidor backend ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
