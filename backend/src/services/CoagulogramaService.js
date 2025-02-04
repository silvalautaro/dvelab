const Coagulograma = require('../models/coagulograma');
let coagulograma;

const getAllCoagulogramas = async () => {
  return await Coagulograma.findAll();
};

const createCoagulograma = async (data) => {
  return await Coagulograma.create(data);
};

const getCoagulograma = async (id_protocolo) => {
  return await Coagulograma.findOne({
    where: { id_protocolo },
  });
};

const updateCoagulograma = async (id_protocolo, data) => {
  coagulograma = await getCoagulograma(id_protocolo);
  if(!coagulograma) {
    throw new Error('Coagulograma no encontrado');
  }
  return await coagulograma.update(data);
};

const deleteCoagulograma = async (id_protocolo) => {
  coagulograma = await getCoagulograma(id_protocolo);
  if(!coagulograma) {
    throw new Error('Coagulograma no encontrado');
  }
  return await coagulograma.destroy();
};

module.exports = {
  getAllCoagulogramas,
  createCoagulograma,
  getCoagulograma,
  updateCoagulograma,
  deleteCoagulograma
};
