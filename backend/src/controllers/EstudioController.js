const { getAllEstudios, createEstudio, getEstudio, updateEstudio, deleteEstudio, } = require('../services/EstudioService');

const getEstudios = async (req, res) => {
  try {
    const Estudios = await getAllEstudios();
    res.json({ registro: Estudios.length, result: Estudios, status: 200, ok: true});
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

const getEstudioById = async (req, res) => {
  try {
    const { id } = req.params;
    const Estudio = await getEstudio(id);
    res.json({ result: Estudio, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateEstudioById = async (req, res) => {
  try {
    const { id } = req.params;
    await updateEstudio(id, req.body);
    res.json({ message: 'Estudio actualizado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteEstudioById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEstudio(id);
    res.json({ message: 'Estudio eliminado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getEstudios,
  addEstudio,
  getEstudioById,
  updateEstudioById,
  deleteEstudioById,
};
