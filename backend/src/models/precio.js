const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Precio = sequelize.define('Precio', {
    id_precio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_estudio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    }, {
    tableName: 'Precios',
    timestamps: false
});


Precio.associate = (models) => {
    Precio.belongsTo(models.Categorias_Especies, {
        foreignKey: 'id_categoria'
    });
    Precio.belongsTo(models.Estudio, {
        foreignKey: 'id_estudio'
    });
}

module.exports = Precio;