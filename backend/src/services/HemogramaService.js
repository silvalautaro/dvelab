const { Hemograma, Protocolo } = require('../models');

//obtener el hemograma de un protocolo
const getAllHemogramas = async (id) => {
  try {
    return await Hemograma.findAll();
  } catch (error) {
      console.error('Error al obtener hemogramas:', error);
      throw new Error('Error al obtener hemogramas');
  }
};

const createHemograma = async (data) => {
  try {
    return await Hemograma.create(data);
  } catch (error) {
      console.error('Error al crear hemograma:', error);
      throw new Error('Error al crear hemograma');
  }
};

module.exports = {
  getAllHemogramas,
  createHemograma
};
