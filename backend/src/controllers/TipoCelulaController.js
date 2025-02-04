const { getAllTipoCelulas, getTipoCelulaById, createTipoCelulas, updateTipoCelulas, deleteTipoCelulas } = require('../services/TipoCelulaService');

const getTipoCelulas = async (req, res) => {
  try {
    const TipoCelulas = await getAllTipoCelulas();
    res.json({ registro: TipoCelulas.length,result: TipoCelulas, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getTipoCelulaId = async (req, res) => {
  try {
    const { id } = req.params;
    const TipoCelula = await getTipoCelulaById(id);
    if (TipoCelula) {
      res.json({ result: TipoCelula, status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'TipoCelula no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}

const addTipoCelula = async (req, res) => {
  try {
    const nuevaTipoCelula = await createTipoCelulas(req.body);
    res.status(201).json({ result: nuevaTipoCelula, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateTipoCelulaById = async (req, res) => {
  try {
    const { id } = req.params;
    const TipoCelula = await updateTipoCelulas(req.body, id);
    if (TipoCelula) {
      res.json({ result: TipoCelula, status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'TipoCelula no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteTipoCelulaById = async (req, res) => {
  try {
    const { id } = req.params;
    const TipoCelula = await deleteTipoCelulas(id);
    if (TipoCelula) {
      res.json({ result: TipoCelula, status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'TipoCelula no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}

module.exports = {
  getTipoCelulas,
  getTipoCelulaId,
  addTipoCelula,
  updateTipoCelulaById,
  deleteTipoCelulaById
};
