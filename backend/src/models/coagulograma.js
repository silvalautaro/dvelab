const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Coagulograma = sequelize.define('Coagulograma', {
    id_coagulograma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_protocolo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tiempo_protrombina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    tiempo_tromboplastina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
}, {
    tableName: 'Coagulogramas',
    timestamps: false,
});

Coagulograma.associate = (models) => {
    Coagulograma.belongsTo(models.Protocolo, {
        foreignKey: 'id_protocolo',
    });
}

module.exports = Coagulograma;
