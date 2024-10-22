// routes/contracts.js

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const contractController = require('../controllers/contractsController');

// Middleware de autenticación general
router.use(authenticate);

// Ruta para crear un nuevo contrato
router.post('/', contractController.createContract);

// Otras rutas
router.get('/', contractController.getContracts); // Obtener todos los contratos
router.get('/:id', contractController.getContractById); // Obtener contrato por ID
router.put('/:id', contractController.updateContract); // Actualizar contrato

module.exports = router;
