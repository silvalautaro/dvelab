const Coagulograma = require('../models/coagulograma');

const getAllCoagulogramas = async () => {
  return await Coagulograma.findAll();
};

const createCoagulograma = async (data) => {
  return await Coagulograma.create(data);
};

module.exports = {
  getAllCoagulogramas,
  createCoagulograma
};
