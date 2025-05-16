const { getAllFormulaLeucocitarias, createFormulaLeucocitaria, getFormulaLeucocitaria, updateFormulaLeucocitaria, deleteFormulaLeucocitaria } = require('../services/FormulaLeucocitariaService');

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

const getFormulaLeucocitariaById = async (req, res) => {
  try {
    const FormulaLeucocitaria = await getFormulaLeucocitaria(req.params.id);
    if (FormulaLeucocitaria) {
      res.json({ result: FormulaLeucocitaria, status: 200, ok: true });
    } else {
      res.status(404).json({ message: 'FormulaLeucocitaria no encontrada', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateFormulaLeucocitariaById = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    
    const FormulaLeucocitaria = await updateFormulaLeucocitaria(req.params.id, req.body);
    res.json({ registro: FormulaLeucocitaria.length, result: FormulaLeucocitaria, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteFormulaLeucocitariaById = async (req, res) => {
  try {
    const FormulaLeucocitaria = await deleteFormulaLeucocitaria(req.params.id);
    res.json({ result: FormulaLeucocitaria, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getFormulaLeucocitarias,
  addFormulaLeucocitaria,
  getFormulaLeucocitariaById,
  updateFormulaLeucocitariaById,
  deleteFormulaLeucocitariaById
};
