const Profesional = require('../models/profesional');

const getAllProfesionales = async () => {
  return await Profesional.findAll();
};

const createProfesional = async (data) => {
  return await Profesional.create(data);
};

const getProfesionalById = async (id_profesional) => {
  const profesional = await Profesional.findByPk(id_profesional);
  return profesional;
};

const updateProfesional = async (id_profesional, data) => {
  return await Profesional.update(data, { where: { id_profesional } });
};

const deleteProfesional = async (id_profesional) => {
  return await Profesional.destroy({ where: { id_profesional } });
};

module.exports = {
  getAllProfesionales,
  createProfesional,
  getProfesionalById,
  updateProfesional,
  deleteProfesional
};
