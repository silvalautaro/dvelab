const { getAllSexos, createSexo, updateSexo, deleteSexo } = require('../services/SexoService');

const getSexos = async (req, res) => {
  try {
    const Sexos = await getAllSexos();
    res.json({ registro: Sexos.length,result: Sexos, status: 200, ok: true});
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

const updateSexoById = async (req, res) => {
  try {
    const { id } = req.params;
    const Sexo = await updateSexo(id, req.body);
    res.json({ result: Sexo, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteSexoById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSexo(id);
    res.json({ result: 'Sexo eliminado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getSexos,
  addSexo,
  updateSexoById,
  deleteSexoById
};
