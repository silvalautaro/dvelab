const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Estado = sequelize.define('Estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'estados',
  timestamps: false,
});

Estado.associate = (models) => {
    Estado.hasMany(models.Protocolo, {
        foreignKey: 'id_estado'
    });
};

module.exports = Estado;
