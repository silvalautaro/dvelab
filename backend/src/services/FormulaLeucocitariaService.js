const FormulaLeucocitaria = require('../models/formulaLeucocitaria');
let formulaLeucocitaria;

const getAllFormulaLeucocitarias = async () => {
  return await FormulaLeucocitaria.findAll();
};

const createFormulaLeucocitaria = async (data) => {
  formulaLeucocitaria = await FormulaLeucocitaria.bulkCreate(data);
  return formulaLeucocitaria;
};

const getFormulaLeucocitaria = async (id_protocolo) => {
  return await FormulaLeucocitaria.findAll({
    where: {
      id_protocolo: id_protocolo
    }
  });
}

const updateFormulaLeucocitaria = async (id_protocolo, data) => {
  const formulaLeucocitarias = await getFormulaLeucocitaria(id_protocolo);
  console.log("FORMULASl: ",formulaLeucocitarias);
  console.log("DATA: ",data);
  
  if (!Array.isArray(data)) {
    throw new Error('Los datos proporcionados no son un array');
  }
  const updatePromises = data.map(async (item) => {
    const formulaLeucocitaria = formulaLeucocitarias.find(fl => fl.id_tipo_celula === item.id_tipo_celula);
    if (formulaLeucocitaria) {
      return await formulaLeucocitaria.update(item);
    } else {
      throw new Error('Formula Leucocitaria no encontrada');
    }
  });

  return await Promise.all(updatePromises);
};



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
