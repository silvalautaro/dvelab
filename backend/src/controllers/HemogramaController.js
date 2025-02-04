const { getAllHemogramas, createHemograma, getHemograma, updateHemograma, deleteHemograma } = require('../services/HemogramaService');

const getHemogramas = async (req, res) => {
  try {
    const hemogramas = await getAllHemogramas(req.query.protocoloId);
    res.json({ registro: hemogramas.length, result: hemogramas, status: 200, ok: true });
  } catch (err) {
      res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addHemograma = async (req, res) => {
  try {
    const nuevaHemograma = await createHemograma(req.body);
    res.status(201).json({ result: nuevaHemograma, status: 201, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getHemogramaById = async (req, res) => {
  try {
    const hemograma = await getHemograma(req.params.id);
    if (hemograma) {
      res.json({ result: hemograma, status: 200, ok: true });
    } else {
      res.status(404).json({ message: 'Hemograma no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateHemogramaById = async (req, res) => {
  try {
    const hemograma = await updateHemograma(req.params.id, req.body);
    res.json({ result: hemograma, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteHemogramaById = async (req, res) => {
  try {
    const hemograma = await deleteHemograma(req.params.id);
    res.json({ result: hemograma, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};



module.exports = {
  getHemogramas,
  addHemograma,
  getHemogramaById,
  updateHemogramaById,
  deleteHemogramaById
};
