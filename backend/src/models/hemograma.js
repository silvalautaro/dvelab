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
        allowNull: false,
    },
    hemoglobina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    hematocrito: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    vcm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    hcm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    chcm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    rdw: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    indice_reticulocitario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recuento_plaquetario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    frotis: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    recuento_leucocitario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  tableName: 'Hemogramas',
  timestamps: false,
});

Hemograma.associate = (models) => {
  Hemograma.belongsTo(models.Protocolo, {
    foreignKey: 'id_protocolo'
  });
};


module.exports = Hemograma;

