const { getAllBioquimicaSanguineas, createBioquimicaSanguinea } = require('../services/BioquimicaSanguineaService');

const getBioquimicaSanguineas = async (req, res) => {
  try {
    const BioquimicaSanguineas = await getAllBioquimicaSanguineas();
    res.json({ result: BioquimicaSanguineas, status: 200, ok: true});
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

module.exports = {
  getBioquimicaSanguineas,
  addBioquimicaSanguinea,
};
