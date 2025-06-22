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

  if (!Array.isArray(data)) {
    throw new Error('Los datos proporcionados no son un array');
  }

  const updatePromises = data.map(async (item) => {
    const existente = formulaLeucocitarias.find(fl => fl.id_tipo_celula === item.id_tipo_celula);

    if (existente) {
      // Actualizar registro existente
      return await existente.update({
        relativa: item.relativa,
        absoluta: item.absoluta,
        observaciones: item.observaciones,
        recuento_leucocitario: item.recuento_leucocitario,
        recuento_plaquetario: item.recuento_plaquetario,
        frotis: item.frotis
      });
    } else {
      // Crear nuevo registro si no existe
      return await FormulaLeucocitaria.create({
        id_tipo_celula: item.id_tipo_celula,
        id_protocolo: id_protocolo,
        relativa: item.relativa,
        absoluta: item.absoluta,
        observaciones: item.observaciones,
        recuento_leucocitario: item.recuento_leucocitario,
        recuento_plaquetario: item.recuento_plaquetario,
        frotis: item.frotis
      });
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
