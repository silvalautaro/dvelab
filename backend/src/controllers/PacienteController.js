const { getAllPacientes,getPacienteById, createPaciente } = require('../services/PacienteService');

const getPacientes = async (req, res) => {
  try {
    const Pacientes = await getAllPacientes();
    res.json({ paciente: Pacientes, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const Paciente = await getPacienteById(id);
        if (Paciente) {
        res.json({ result: Paciente, status: 200, ok: true });
        } else {
        res.status(404).json({ error: 'Paciente no encontrado', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
};

const addPaciente = async (req, res) => {
  try {
    const nuevaPaciente = await createPaciente(req.body);
    res.status(201).json({ result: nuevaPaciente, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getPacientes,
  getPaciente,
  addPaciente
};
