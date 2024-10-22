// models/Notary.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define el modelo Notary
const Notary = sequelize.define('Notary', {
  // ID único del notario
  notaryId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Nombre del notario
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Contraseña cifrada
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Notary;
