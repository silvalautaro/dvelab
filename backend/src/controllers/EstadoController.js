const { getEstados, createEstado, updateEstado, deleteEstado } = require('../services/EstadoService');

const getAllEstados = async (req, res) => {
  try {
    const Estado = await getEstados();
    res.json({ registro: Estado.length, result: Estado, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addEstado = async (req, res) => {
  try {
    const nuevoEstado = await createEstado(req.body);
    res.status(201).json({ result: nuevoEstado, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    await updateEstado(id, req.body);
    res.json({ message: 'Estado actualizado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEstado(id);
    res.json({ message: 'Estado eliminado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};


module.exports = {
  getAllEstados,
  addEstado,
  updateEstadoById,
  deleteEstadoById
};
