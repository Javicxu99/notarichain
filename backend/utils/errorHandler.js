// utils/errorHandler.js

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal. Inténtalo de nuevo más tarde.' });
};
