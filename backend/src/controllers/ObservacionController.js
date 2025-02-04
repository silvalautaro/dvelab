const { getAllObservaciones, createObservacion, updateObservacion, deleteObservacion } = require('../services/ObservacionService');

const getObservaciones = async (req, res) => {
  try {
    const Observaciones = await getAllObservaciones();
    res.json({ registro: Observaciones.length, result: Observaciones, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addObservacion = async (req, res) => {
  try {
    const nuevaObservacion = await createObservacion(req.body);
    res.status(201).json({ result: nuevaObservacion, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateObservacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedObservacion = await updateObservacion(id, req.body);
    res.json({ result: updatedObservacion, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteObservacionById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteObservacion(id);
    res.json({ status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}

module.exports = {
  getObservaciones,
  addObservacion,
  updateObservacionById,
  deleteObservacionById
};
