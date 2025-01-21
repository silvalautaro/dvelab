const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Protocolo = sequelize.define('Protocolo', {
  id_protocolo: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  importe: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'paciente',
      key: 'id_paciente'
    }
  },
  id_veterinaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_profesional: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estudio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Protocolos',
  timestamps: false
});

Protocolo.associate = (models) => {
    Protocolo.belongsTo(models.Paciente, {
        foreignKey: 'id_paciente',
        as: 'paciente'
    });
    Protocolo.belongsTo(models.Veterinaria, {
        foreignKey: 'id_veterinaria'
    });
    Protocolo.belongsTo(models.Profesional, {
        foreignKey: 'id_profesional'
    });
    Protocolo.belongsTo(models.Estudio, {
        foreignKey: 'id_estudio'
    });
    Protocolo.hasOne(models.Hemograma,{
        foreignKey: 'id_protocolo'
    })
    Protocolo.hasOne(models.Bioquimica_Sanguinea,{
        foreignKey: 'id_protocolo'
    })
    Protocolo.hasOne(models.Coagulograma,{
        foreignKey: 'id_protocolo'
    })
    Protocolo.hasOne(models.FormulaLeucocitaria,{
        foreignKey: 'id_protocolo'
    })
    Protocolo.belongsTo(models.Estado, {
      foreignKey: 'id_estado'
    });
    Protocolo.hasMany(models.ArchivoPdf, {
        foreignKey: 'id_protocolo'
    });
    
}

module.exports = Protocolo;
