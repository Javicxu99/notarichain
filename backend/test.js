// test.js

const result = require('dotenv').config({ debug: true });

if (result.error) {
  console.error('Error al cargar .env:', result.error);
} else {
  console.log('Variables de entorno cargadas:');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
}
