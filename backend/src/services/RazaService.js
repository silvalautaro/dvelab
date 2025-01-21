const Raza = require('../models/raza');

const getAllRazas = async () => {
  return await Raza.findAll();
};

const createRaza = async (data) => {
  return await Raza.create(data);
};

module.exports = {
  getAllRazas,
  createRaza,
};
