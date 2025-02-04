const Observacion = require('../models/observaciones');

const getAllObservaciones = async () => {
  return await Observacion.findAll();
};

const createObservacion = async (data) => {
  return await Observacion.create(data);
};

const updateObservacion = async (id_observacion, data) => {
  return await Observacion.update(data, { where: { id_observacion } });
};

const deleteObservacion = async (id_observacion) => {
  return await Observacion.destroy({ where: { id_observacion } });
};

module.exports = {
  getAllObservaciones,
  createObservacion,
  updateObservacion,
  deleteObservacion
};
