const Especie = require('../models/especie');

const getAllEspecies = async () => {
  return await Especie.findAll();
};

const createEspecie = async (data) => {
  return await Especie.create(data);
};

const updateEspecie = async (id_especie, data) => {
  return await Especie.update(data, {
    where: { id_especie },
  });
};

const deleteEspecie = async (id_especie) => {
  return await Especie.destroy({
    where: { id_especie },
  });
};


module.exports = {
  getAllEspecies,
  createEspecie,
  updateEspecie,
  deleteEspecie,
};
