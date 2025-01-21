const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Especie = sequelize.define('Especie', {
  id_especie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'especies',
  timestamps: false,
});

Especie.associate = (models) => {
  Especie.hasMany(models.Paciente, {
    foreignKey: 'id_especie'
  });
}

module.exports = Especie;
