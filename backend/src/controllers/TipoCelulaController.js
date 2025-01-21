const { getAllTipoCelulas, getTipoCelulaById, createTipoCelulas } = require('../services/TipoCelulaService');

const getTipoCelulas = async (req, res) => {
  try {
    const TipoCelulas = await getAllTipoCelulas();
    res.json({ result: TipoCelulas, status: 200, ok: true});
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

module.exports = {
  getTipoCelulas,
  getTipoCelulaId,
  addTipoCelula,
};
