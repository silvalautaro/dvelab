const { getAllVeterinarias, getVeterinariaById, createVeterinaria } = require('../services/VeterinariaService');

const getVeterinarias = async (req, res) => {
  try {
    const Veterinarias = await getAllVeterinarias();
    res.json({ result: Veterinarias, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getOneVeterinaria = async (req, res) => {
  try {
    const { id } = req.params;
    const Veterinaria = await getVeterinariaById(id);
    if (Veterinaria) {
      res.json({ result: Veterinaria, status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Veterinaria no encontrada', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addVeterinaria = async (req, res) => {
  try {
    const nuevaVeterinaria = await createVeterinaria(req.body);
    res.status(201).json({ result: nuevaVeterinaria, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getVeterinarias,
  getOneVeterinaria,
  addVeterinaria,
};
