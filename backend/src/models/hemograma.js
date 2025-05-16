const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Hemograma = sequelize.define('Hemograma', {
  id_hemograma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_protocolo:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recuento_globulos_rojos: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
  },
  hemoglobina: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  hematocrito: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  vcm: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  hcm: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  chcm: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  rdw: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  indice_reticulocitario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recuento_plaquetario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  frotis: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  recuento_leucocitario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  caracteristicas_serie_eritroide:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  morfologia_plaquetaria:{
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'hemogramas',
  timestamps: false,
});

Hemograma.associate = (models) => {
  Hemograma.belongsTo(models.Protocolo, {
    foreignKey: 'id_protocolo'
  });
};


module.exports = Hemograma;

