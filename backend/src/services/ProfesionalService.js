const Profesional = require('../models/profesional');

const getAllProfesionales = async () => {
  return await Profesional.findAll();
};

const createProfesional = async (data) => {
  return await Profesional.create(data);
};

module.exports = {
  getAllProfesionales,
  createProfesional,
};
