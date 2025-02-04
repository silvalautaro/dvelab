const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const ArchivoPdf = sequelize.define('ArchivoPdf', {
  id: {
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  id_protocolo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nombre_archivo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  fecha_subida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'Archivo_pdf', 
  timestamps: false
});
  
ArchivoPdf.associate = function(models) {
  ArchivoPdf.belongsTo(models.Protocolo, {
    foreignKey: 'id_protocolo'
  });
};

module.exports = ArchivoPdf;
  