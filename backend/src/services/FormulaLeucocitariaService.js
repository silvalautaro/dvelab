const FormulaLeucocitaria = require('../models/formulaLeucocitaria');
let formulaLeucocitaria;

const getAllFormulaLeucocitarias = async () => {
  return await FormulaLeucocitaria.findAll();
};

const createFormulaLeucocitaria = async (data) => {
  return await FormulaLeucocitaria.create(data);
};

const getFormulaLeucocitaria = async (id_protocolo) => {
  return await FormulaLeucocitaria.findAll({
    where: { id_protocolo },
  });
}

const updateFormulaLeucocitaria = async (id_protocolo, data) => {
  formulaLeucocitaria = await getFormulaLeucocitaria(id_protocolo);
  if(!formulaLeucocitaria) {
    throw new Error('Formula Leucocitaria no encontrada');
  }
  return await formulaLeucocitaria.update(data);
}

const deleteFormulaLeucocitaria = async (id_protocolo) => {
  formulaLeucocitaria = await getFormulaLeucocitaria(id_protocolo);
  return await formulaLeucocitaria.destroy();
}

module.exports = {
  getAllFormulaLeucocitarias,
  createFormulaLeucocitaria,
  getFormulaLeucocitaria,
  updateFormulaLeucocitaria,
  deleteFormulaLeucocitaria
};
