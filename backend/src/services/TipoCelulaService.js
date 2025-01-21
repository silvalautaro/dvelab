const TipoCelulas = require('../models/tipoCelulas');

const getAllTipoCelulas = async () => {
  return await TipoCelulas.findAll();
};

const getTipoCelulaById = async (id) => {
  return await TipoCelulas.findByPk(id);
};

const createTipoCelulas = async (data) => {
  return await TipoCelulas.create(data);
};

module.exports = {
  getAllTipoCelulas,
  getTipoCelulaById,
  createTipoCelulas
};
