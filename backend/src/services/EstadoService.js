const Estado = require('../models/estado');
const Protocolos = require('../models/protocolo');

// Obtener todos los estados
const getEstados = async () => {
    try {
      const estados = await Estado.findAll();
      return estados;
    } catch (error) {
      console.error('Error al obtener estados:', error);
      throw new Error('Error al obtener estados');
    }
};
  
  // Actualizar el estado de un protocolo
const actualizarEstadoProtocolo = async (idProtocolo, idEstado) => {
    try {
      const protocolo = await Protocolos.findByPk(idProtocolo);
      if (!protocolo) {
        throw new Error('Protocolo no encontrado');
      }
      protocolo.id_estado = idEstado;
      await protocolo.save();
      return protocolo;
    } catch (error) {
      console.error('Error al actualizar estado del protocolo:', error);
      throw new Error('Error al actualizar estado', error);
    }
};

module.exports = {
    getEstados,
    actualizarEstadoProtocolo
};