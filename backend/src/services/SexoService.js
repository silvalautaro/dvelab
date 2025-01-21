const Sexo = require('../models/sexo');

const getAllSexos = async () => {
  return await Sexo.findAll();
};

const createSexo = async (data) => {
  return await Sexo.create(data);
};

module.exports = {
  getAllSexos,
  createSexo,
};
