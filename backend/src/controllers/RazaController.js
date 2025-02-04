const { getAllRazas, createRaza, updateRaza, deleteRaza } = require('../services/RazaService');

const getRazas = async (req, res) => {
  try {
    const Razas = await getAllRazas();
    res.json({ registro: Razas.length, result: Razas, status: 200, ok: true});
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

const updateRazaById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRaza = await updateRaza(id, req.body);
    res.json({ result: updatedRaza, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteRazaById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRaza(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}

module.exports = {
  getRazas,
  addRaza,
  updateRazaById,
  deleteRazaById,
};
