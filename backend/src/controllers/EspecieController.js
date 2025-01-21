const { getAllEspecies, createEspecie } = require('../services/EspecieService');

const getEspecies = async (req, res) => {
  try {
    const especies = await getAllEspecies();
    res.json({ result: especies, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addEspecie = async (req, res) => {
  try {
    const nuevaEspecie = await createEspecie(req.body);
    res.status(201).json({ result: nuevaEspecie, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getEspecies,
  addEspecie,
};
