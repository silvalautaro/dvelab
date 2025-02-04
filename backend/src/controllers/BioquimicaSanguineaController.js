const { getAllBioquimicaSanguineas, createBioquimicaSanguinea, getBioquimicaSanguinea, updateBioquimicaSanguinea, deleteBioquimicaSanguinea } = require('../services/BioquimicaSanguineaService');

const getBioquimicaSanguineas = async (req, res) => {
  try {
    const BioquimicaSanguineas = await getAllBioquimicaSanguineas();
    res.json({ registro: BioquimicaSanguineas.length, result: BioquimicaSanguineas, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addBioquimicaSanguinea = async (req, res) => {
  try {
    const nuevaBioquimicaSanguinea = await createBioquimicaSanguinea(req.body);
    res.status(201).json({ result: nuevaBioquimicaSanguinea, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getBioquimicaSanguineaById = async (req, res) => {
  try {
    const { id } = req.params;
    const BioquimicaSanguinea = await getBioquimicaSanguinea(id);
    res.json({ result: BioquimicaSanguinea, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateBioquimicaSanguineaById = async (req, res) => {
  try {
    const { id } = req.params;
    const BioquimicaSanguinea = await updateBioquimicaSanguinea(id, req.body);
    res.json({ result: BioquimicaSanguinea, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteBioquimicaSanguineaById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBioquimicaSanguinea(id);
    res.json({ result: 'Bioquimica Sanguinea eliminada', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getBioquimicaSanguineas,
  addBioquimicaSanguinea,
  getBioquimicaSanguineaById,
  updateBioquimicaSanguineaById,
  deleteBioquimicaSanguineaById
};
