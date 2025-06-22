const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const FormulaLeucocitaria = sequelize.define('FormulaLeucocitaria', {
    id_formula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_celula: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_protocolo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    relativa: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
    },
    absoluta: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    recuento_leucocitario:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    recuento_plaquetario:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    frotis: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    }, {
    tableName: 'formulaleucocitaria',
    timestamps: false,
});

FormulaLeucocitaria.associate = (models) => {
    FormulaLeucocitaria.belongsTo(models.Protocolo, {
        foreignKey: 'id_protocolo',
    });
    FormulaLeucocitaria.belongsTo(models.TipoCelula, {
        foreignKey: 'id_tipo_celula',
        as: 'tipoCelula'
    });
};

module.exports = FormulaLeucocitaria;