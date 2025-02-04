const { getAllCoagulogramas, createCoagulograma, getCoagulograma, updateCoagulograma, deleteCoagulograma } = require('../services/CoagulogramaService');

const getCoagulogramas = async (req, res) => {
  try {
    const Coagulogramas = await getAllCoagulogramas();
    res.json({ registro: Coagulogramas.length, result: Coagulogramas, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addCoagulograma = async (req, res) => {
  try {
    const nuevaCoagulograma = await createCoagulograma(req.body);
    res.status(201).json({ result: nuevaCoagulograma, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getCoagulogramaById = async (req, res) => {
  try {
    const { id } = req.params;
    const Coagulograma = await getCoagulograma(id);
    if (Coagulograma) {
      res.json({ result: Coagulograma, status: 200, ok: true });
    } else {
      res.status(404).json({ message: 'Coagulograma no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateCoagulogramaById = async (req, res) => {
  try {
    const { id } = req.params;
    const Coagulograma = await getCoagulograma(id);
    if (Coagulograma) {
      const CoagulogramaActualizado = await updateCoagulograma(id, req.body);
      res.json({ result: CoagulogramaActualizado, status: 200, ok: true });
    } else {
      res.status(404).json({ message: 'Coagulograma no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteCoagulogramaById = async (req, res) => {
  try {
    const { id } = req.params;
    const Coagulograma = await getCoagulograma(id);
    if (Coagulograma) {
      await deleteCoagulograma(id);
      res.json({ result: Coagulograma, status: 200, ok: true });
    } else {
      res.status(404).json({ message: 'Coagulograma no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getCoagulogramas,
  addCoagulograma,
  getCoagulogramaById,
  updateCoagulogramaById,
  deleteCoagulogramaById
};
