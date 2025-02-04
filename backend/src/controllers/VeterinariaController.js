const { getAllVeterinarias, getVeterinariaById, createVeterinaria, updateVeterinaria, deleteVeterinaria } = require('../services/VeterinariaService');

const getVeterinarias = async (req, res) => {
  try {
    const Veterinarias = await getAllVeterinarias();
    res.json({ registro: Veterinarias.length, result: Veterinarias, status: 200, ok: true});
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

const updateVeterinariaById = async (req, res) => {
  try {
    const { id } = req.params;
    const Veterinaria = req.body;
    const updated = await updateVeterinaria(id, Veterinaria);
    if (updated) {
      res.json({ result: 'Veterinaria actualizada', status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Veterinaria no encontrada', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteVeterinariaById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteVeterinaria(id);
    if (deleted) {
      res.json({ result: 'Veterinaria eliminada', status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Veterinaria no encontrada', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}

module.exports = {
  getVeterinarias,
  getOneVeterinaria,
  addVeterinaria,
  updateVeterinariaById,
  deleteVeterinariaById
};
