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

const updateVeterinaria = async (id, data) => {
  return await Veterinaria.update(data, {
    where: {
      id_veterinaria : id
    }
  });
};

const deleteVeterinaria = async (id) => {
  return await Veterinaria.destroy({
    where: {
      id_veterinaria: id
    }
  });
}


module.exports = {
  getAllVeterinarias,
  getVeterinariaById,
  createVeterinaria,
  updateVeterinaria,
  deleteVeterinaria
};
