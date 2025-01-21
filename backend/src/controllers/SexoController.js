const { getAllSexos, createSexo } = require('../services/SexoService');

const getSexos = async (req, res) => {
  try {
    const Sexos = await getAllSexos();
    res.json({ result: Sexos, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addSexo = async (req, res) => {
  try {
    const nuevaSexo = await createSexo(req.body);
    res.status(201).json({ result: nuevaSexo, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getSexos,
  addSexo,
};
