const FormulaLeucocitaria = require('../models/formulaLeucocitaria');

const getAllFormulaLeucocitarias = async () => {
  return await FormulaLeucocitaria.findAll();
};

const createFormulaLeucocitaria = async (data) => {
  return await FormulaLeucocitaria.create(data);
};

module.exports = {
  getAllFormulaLeucocitarias,
  createFormulaLeucocitaria
};
