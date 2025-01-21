const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');
const Protocolo = require('./protocolo');

const Paciente = sequelize.define('Paciente', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_especie: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_raza: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_sexo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Pacientes',
  timestamps: false,
});

Paciente.associate = (models) => {
    Paciente.belongsTo(models.Especie, {
        foreignKey: 'id_especie',
    });
    Paciente.belongsTo(models.Raza, {
        foreignKey: 'id_raza',
    });
    Paciente.belongsTo(models.Sexo, {
        foreignKey: 'id_sexo',
    });
    Paciente.hasMany(models.Protocolo, {
        foreignKey: 'id_paciente',
        as: 'protocolos',
    });
}
Protocolo.belongsTo(Paciente, {
    foreignKey: 'id_paciente',
});

module.exports = Paciente;
