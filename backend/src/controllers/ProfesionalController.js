const { getAllProfesionales, createProfesional, getProfesionalById, updateProfesional, deleteProfesional } = require('../services/ProfesionalService');

const getProfesionales = async (req, res) => {
  try {
    const Profesionals = await getAllProfesionales();
    res.json({ registro: Profesionals.length, result: Profesionals, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addProfesional = async (req, res) => {
  try {
    const nuevaProfesional = await createProfesional(req.body);
    res.status(201).json({ result: nuevaProfesional, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getProfesional = async (req, res) => {
  try {
    const { id_profesional } = req.params;
    const profesional = await getProfesionalById(id_profesional);
    res.json({ result: profesional, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateProfesionalById = async (req, res) => {
  try {
    const { id_profesional } = req.params;
    const data = req.body;
    await updateProfesional(id_profesional, data);
    res.json({ message: 'Profesional actualizado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteProfesionalById = async (req, res) => {
  try {
    const { id_profesional } = req.params;
    await deleteProfesional(id_profesional);
    res.json({ message: 'Profesional eliminado', status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};


module.exports = {
  getProfesionales,
  addProfesional,
  getProfesional,
  updateProfesionalById,
  deleteProfesionalById
};
