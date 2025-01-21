const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Veterinaria = sequelize.define('Veterinaria', {
  id_veterinaria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'Veterinarias',
  timestamps: false,
});

Veterinaria.associate = (models) => {
  Veterinaria.hasMany(models.Protocolo, {
    foreignKey: 'id_veterinaria'
  });
}


module.exports = Veterinaria;
