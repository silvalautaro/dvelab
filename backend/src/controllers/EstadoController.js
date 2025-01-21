const { getEstados, actualizarEstadoProtocolo } = require('../services/EstadoService');

const getAllEstados = async (req, res) => {
  try {
    const Estado = await getEstados();
    res.json({ result: Estado, status: 200, ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateEstado = async (req, res) => {
  try {
    const { idProtocolo, idEstado } = req.body;
    const protocolo = await actualizarEstadoProtocolo(idProtocolo, idEstado);
    res.json({ result: protocolo, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

module.exports = {
  getAllEstados,
  updateEstado,
};
