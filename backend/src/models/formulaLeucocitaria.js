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
        allowNull: false,
    },
    absoluta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    }, {
    tableName: 'FormulaLeucocitaria',
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