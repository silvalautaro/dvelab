const Especie = require('../models/especie');

const getAllEspecies = async () => {
  return await Especie.findAll();
};

const createEspecie = async (data) => {
  return await Especie.create(data);
};

module.exports = {
  getAllEspecies,
  createEspecie,
};
