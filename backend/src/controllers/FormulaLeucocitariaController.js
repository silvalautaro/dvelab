const { getAllFormulaLeucocitarias, createFormulaLeucocitaria } = require('../services/FormulaLeucocitariaService');

const getFormulaLeucocitarias = async (req, res) => {
  try {
    const FormulaLeucocitarias = await getAllFormulaLeucocitarias();
    res.json({ result: FormulaLeucocitarias, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addFormulaLeucocitaria = async (req, res) => {
  try {
    const nuevaFormulaLeucocitaria = await createFormulaLeucocitaria(req.body);
    res.status(201).json({ FormulaLeucocitaria: nuevaFormulaLeucocitaria, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getFormulaLeucocitarias,
  addFormulaLeucocitaria,
};
