const { getAllProfesionales, createProfesional } = require('../services/ProfesionalService');

const getProfesionales = async (req, res) => {
  try {
    const Profesionals = await getAllProfesionales();
    res.json({ result: Profesionals, status: 200, ok: true});
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

module.exports = {
  getProfesionales,
  addProfesional,
};
