const { DataTypes } = require('sequelize');
const sequelize = require('../../db/config');

const Pago = sequelize.define(
  "Pago",
  {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_protocolo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
    },
    fecha_pago: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    importe: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    medio_pago: {
      type: DataTypes.ENUM("Efectivo", "MercadoPago", "Transferencia Bancaria"),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "pagos",
    timestamps: false,
  }
);

Pago.associate = (models) => {
    Pago.belongsTo(models.Protocolo, {
        foreignKey: "id_protocolo",
    });
}

module.exports = Pago;
