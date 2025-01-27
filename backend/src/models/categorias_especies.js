const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Categorias_Especies = sequelize.define('Categorias_Especies', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    tableName: 'Categorias_especies',
    timestamps: false,
    onDelete: 'CASCADE',
});

Categorias_Especies.associate = (models) => {
    Categorias_Especies.hasMany(models.Especie, {
        foreignKey: 'id_categoria'
    });
}

module.exports = Categorias_Especies;