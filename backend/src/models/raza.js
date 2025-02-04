const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Raza = sequelize.define('Raza', {
  id_raza: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Razas',
  timestamps: false,
});

Raza.associate = (models) => {
  Raza.hasMany(models.Paciente, {
    foreignKey: 'id_raza'
  });
}

module.exports = Raza;
