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
        allowNull: false,
    },
    creatinina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    glucemia: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    gpt: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    got: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    fosfatasa_alcalina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    g_glutamil_transferasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    proteinas_totales: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    albumina: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    globulinas: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    relacion_alb_glob: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    bilirrubina_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    bilirrubina_directa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    bilirrubina_indirecta: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    amilasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    trigliceridos: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    colesterol_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    creatinina_p_kinasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    hdl_col: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    ldl_col: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    calcio_total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    fosforo: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    sodio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    potasio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    cloro: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
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
