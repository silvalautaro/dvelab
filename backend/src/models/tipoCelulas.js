const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const TipoCelula = sequelize.define('TipoCelula', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_celula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'TipoCelulas',
  timestamps: false,
});

TipoCelula.associate = (models) => {
  TipoCelula.hasMany(models.FormulaLeucocitaria, {
    foreignKey: 'id_tipo_celula',
    as: 'formulaLeucocitaria'
  });
}

module.exports = TipoCelula;
