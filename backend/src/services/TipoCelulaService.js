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

const updateTipoCelulas = async (data, id) => {
  return await TipoCelulas.update(data, {
    where: { id_tipo : id }
  });
};

const deleteTipoCelulas = async (id) => {
  return await TipoCelulas.destroy({
    where: { id_tipo : id }
  });
}

module.exports = {
  getAllTipoCelulas,
  getTipoCelulaById,
  createTipoCelulas,
  updateTipoCelulas,
  deleteTipoCelulas
};
