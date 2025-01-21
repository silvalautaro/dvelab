const Observacion = require('../models/observaciones');

const getAllObservaciones = async () => {
  return await Observacion.findAll();
};

const createObservacion = async (data) => {
  return await Observacion.create(data);
};

module.exports = {
  getAllObservaciones,
  createObservacion,
};
