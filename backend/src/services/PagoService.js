const { Pago, Protocolo } = require("../models");
const { Sequelize } = require("sequelize");

const registrarPago = async (id_protocolo, importe, medio_pago, observaciones) => {
    const transaction = await Pago.sequelize.transaction();
    try {
      const protocolo = await Protocolo.findByPk(id_protocolo, { transaction });
      if (!protocolo) {
        throw new Error("El protocolo no existe");
      }
      const nuevoPago = await Pago.create(
        { id_protocolo, importe, medio_pago, observaciones },
        { transaction }
      );
      await protocolo.update({ importe: Sequelize.literal(`importe + ${importe}`) }, { transaction });
  
      await transaction.commit();
      return nuevoPago;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = { registrarPago };
