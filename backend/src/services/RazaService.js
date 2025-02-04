const Raza = require('../models/raza');

const getAllRazas = async () => {
  return await Raza.findAll();
};

const createRaza = async (data) => {
  return await Raza.create(data);
};

const updateRaza = async (id, data) => {
  return await Raza.update(data, {
    where: {
      id_raza: id
    },
  });
};

const deleteRaza = async (id) => {
  return await Raza.destroy({
    where: {
      id_raza: id
    },
  });
};

module.exports = {
  getAllRazas,
  createRaza,
  updateRaza,
  deleteRaza,
};
