const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Sexo = sequelize.define('Sexo', {
  id_sexo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Sexos',
  timestamps: false,
});

Sexo.associate = (models) => {
  Sexo.hasMany(models.Paciente, {
    foreignKey: 'id_sexo'
  });
}

module.exports = Sexo;
