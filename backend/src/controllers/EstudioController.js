const { getAllEstudios, createEstudio } = require('../services/EstudioService');

const getEstudios = async (req, res) => {
  try {
    const Estudios = await getAllEstudios();
    res.json({ result: Estudios, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addEstudio = async (req, res) => {
  try {
    const nuevaEstudio = await createEstudio(req.body);
    res.status(201).json({ result: nuevaEstudio, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getEstudios,
  addEstudio,
};
