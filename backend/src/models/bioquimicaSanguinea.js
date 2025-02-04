const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Bioquimica_Sanguinea = sequelize.define('Bioquimica_Sanguinea', {
    id_bioquimica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_protocolo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    urea: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    creatinina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    glucemia: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    gpt: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    got: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    fosfatasa_alcalina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    g_glutamil_transferasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    proteinas_totales: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    albumina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    globulinas: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    relacion_alb_glob: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    bilirrubina_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    bilirrubina_directa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    bilirrubina_indirecta: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    amilasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    trigliceridos: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    colesterol_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    creatinina_p_kinasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    hdl_col: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    ldl_col: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    calcio_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    fosforo: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    sodio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    potasio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    cloro: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    }
},{
    tableName: 'Bioquimica_Sanguinea',
    timestamps: false,
});

Bioquimica_Sanguinea.associate = (models) => {
    Bioquimica_Sanguinea.belongsTo(models.Protocolo, {
        foreignKey: 'id_protocolo',
    });
}

module.exports = Bioquimica_Sanguinea;
