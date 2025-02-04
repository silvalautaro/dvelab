const { Hemograma, Protocolo } = require('../models');
let hemograma;

const getAllHemogramas = async (id) => {
  return await Hemograma.findAll();
};

const createHemograma = async (data) => {
  return await Hemograma.create(data);
};

const getHemograma = async (id_protocolo) => {
  return await Hemograma.findOne({
    where: { id_protocolo },
  });
};

const updateHemograma = async (id_protocolo, data) => {
  hemograma = await getHemograma(id_protocolo);
  return await hemograma.update(data);
}

const deleteHemograma = async (id_protocolo) => {
  hemograma = await getHemograma(id_protocolo);
  return await hemograma.destroy();
}

module.exports = {
  getAllHemogramas,
  createHemograma,
  getHemograma,
  updateHemograma,
  deleteHemograma
};
