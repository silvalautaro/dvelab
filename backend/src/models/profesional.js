const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Profesional = sequelize.define('Profesional', {
  id_profesional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'profesionales',
  timestamps: false,
});

Profesional.associate = (models) => {
  Profesional.hasMany(models.Protocolo, {
    foreignKey: 'id_profesional'
  });
}

module.exports = Profesional;
