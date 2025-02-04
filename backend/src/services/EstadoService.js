const Estado = require('../models/estado');

const getEstados = async () => {
    try {
      const estados = await Estado.findAll();
      return estados;
    } catch (error) {
      console.error('Error al obtener estados:', error);
      throw new Error('Error al obtener estados');
    }
};
  
const createEstado = async (data) => {
    try {
      const nuevoEstado = await Estado.create(data);
      return nuevoEstado;
    } catch (error) {
      console.error('Error al crear estado:', error);
      throw new Error('Error al crear estado');
    }
};

const updateEstado = async (id_estado, data) => {
    try {
      return await Estado.update(data, { where: { id_estado } });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw new Error('Error al actualizar estado');
    }
};

const deleteEstado = async (id_estado) => {
    try {
      return await Estado.destroy({ where: { id_estado } });
    } catch (error) {
      console.error('Error al eliminar estado:', error);
      throw new Error('Error al eliminar estado');
    }
};


module.exports = {
    getEstados,
    createEstado,
    updateEstado,
    deleteEstado,
};