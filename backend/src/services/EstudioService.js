const { Estudio, Precio } = require("../models");

const getAllEstudios = async () => {
  return await Estudio.findAll(
    {
      include: [ Precio ]
    }
  );
};

const createEstudio = async (data) => {
  return await Estudio.create(data);
};

const getEstudio = async (id) => {
  return await Estudio.findByPk(id,{
    include: [ Precio ]
  });
};

const updateEstudio = async (id, data) => {
  return await Estudio.update(data, {
    where: {
      id_estudio: id,
    },
  });
};

const deleteEstudio = async (id) => {
  return await Estudio.destroy({
    where: {
      id_estudio: id,
    },
  });
};

module.exports = {
  getAllEstudios,
  createEstudio,
  getEstudio,
  updateEstudio,
  deleteEstudio,
};
