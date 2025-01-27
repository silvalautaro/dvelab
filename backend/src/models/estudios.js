const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Estudio = sequelize.define('Estudio', {
  id_estudio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estudio: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'Estudios',
  timestamps: false,
});

Estudio.associate = (models) => {
  Estudio.hasMany(models.Protocolo, {
    foreignKey: 'id_estudio'
  });
  Estudio.hasMany(models.Precio, {
    foreignKey: 'id_estudio'
  });
}


module.exports = Estudio;
