// routes/chat.js

const express = require('express');
const router = express.Router();
const { getChatCompletion } = require('../controllers/chatController');

// Ruta para probar que el servidor está funcionando
router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando' });
});

// Ruta para obtener la finalización del chat
router.post('/completion', getChatCompletion);

module.exports = router;
