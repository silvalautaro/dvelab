const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Observacion = sequelize.define('Observacion', {
    id_observacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_protocolo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    observacion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'Observaciones',
    timestamps: false,
});

Observacion.associate = (models) => {
    Observacion.belongsTo(models.Protocolo, {
        foreignKey: 'id_protocolo',
    });
}   

module.exports = Observacion;
