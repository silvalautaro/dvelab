const Sexo = require('../models/sexo');

const getAllSexos = async () => {
  return await Sexo.findAll();
};

const createSexo = async (data) => {
  return await Sexo.create(data);
};

const updateSexo = async (id, data) => {
  return await Sexo.update(data, {
    where: { id_sexo: id }
  });
};

const deleteSexo = async (id) => {
  return await Sexo.destroy({
    where: { id_sexo: id }
  });
};

module.exports = {
  getAllSexos,
  createSexo,
  updateSexo,
  deleteSexo
};
