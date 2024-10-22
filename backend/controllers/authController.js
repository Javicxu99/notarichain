// controllers/authController.js

const Notary = require('../models/Notary');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyNotaryOnBlockchain } = require('../services/blockchainService');

// Registrar un nuevo notario
exports.register = async (req, res, next) => {
  try {
    const { notaryId, name, password } = req.body;

    // Verificar si el notario ya existe
    let notary = await Notary.findOne({ where: { notaryId } });
    if (notary) {
      return res.status(400).json({ message: 'El notario ya está registrado.' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo notario
    notary = await Notary.create({
      notaryId,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Notario registrado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Iniciar sesión
exports.login = async (req, res, next) => {
  try {
    const { notaryId, password } = req.body;

    console.log('Intentando iniciar sesión con notaryId:', notaryId);

    // Verificar al notario en la blockchain
    const isValidNotary = await verifyNotaryOnBlockchain(notaryId);

    if (!isValidNotary) {
      return res.status(401).json({ message: 'Identificación de notario no válida.' });
    }

    // Buscar al notario en la base de datos
    const notary = await Notary.findOne({ where: { notaryId } });

    console.log('Resultado de la búsqueda del notario:', notary);

    if (!notary) {
      return res.status(404).json({ message: 'Notario no encontrado.' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, notary.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: notary.id }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, notary: { id: notary.id, name: notary.name, notaryId: notary.notaryId } });
  } catch (error) {
    next(error);
  }
};
