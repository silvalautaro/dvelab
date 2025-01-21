const { getAllRazas, createRaza } = require('../services/RazaService');

const getRazas = async (req, res) => {
  try {
    const Razas = await getAllRazas();
    res.json({ result: Razas, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addRaza = async (req, res) => {
  try {
    const nuevaRaza = await createRaza(req.body);
    res.status(201).json({ result: nuevaRaza, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getRazas,
  addRaza,
};
