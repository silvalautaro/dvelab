const Veterinaria = require('../models/veterinaria');

const getAllVeterinarias = async () => {
  return await Veterinaria.findAll();
};

const getVeterinariaById = async (id) => {
  return await Veterinaria.findByPk(id);
}

const createVeterinaria = async (data) => {
  return await Veterinaria.create(data);
};

module.exports = {
  getAllVeterinarias,
  getVeterinariaById,
  createVeterinaria
};
