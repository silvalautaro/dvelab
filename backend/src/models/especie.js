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
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'especies',
  timestamps: false,
});

Especie.associate = (models) => {
  Especie.hasMany(models.Paciente, {
    foreignKey: 'id_especie'
  });
  Especie.belongsTo(models.Categorias_Especies, {
    foreignKey: 'id_categoria'
  });
}

module.exports = Especie;
