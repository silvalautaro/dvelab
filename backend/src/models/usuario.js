const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');


const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo',
    },
    rol: {
      type: DataTypes.ENUM('admin', 'usuario'),
      defaultValue: 'usuario',
    },
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
  
  module.exports = Usuario;