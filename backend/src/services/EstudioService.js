const Estudio = require('../models/estudios');

const getAllEstudios = async () => {
  return await Estudio.findAll();
};

const createEstudio = async (data) => {
  return await Estudio.create(data);
};

module.exports = {
  getAllEstudios,
  createEstudio,
};
