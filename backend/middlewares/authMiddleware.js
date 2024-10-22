// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const Notary = require('../models/Notary');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const notary = await Notary.findByPk(decoded.id);

    if (!notary) {
      return res.status(401).json({ message: 'Notario no encontrado.' });
    }

    req.notary = notary;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
