const fs = require('fs');
const path = require('path');

const {
  getAllProtocolos,
  getProtocoloById,
  createProtocolo,
  updateProtocolo,
  deleteProtocolo,
  searchProtocolos
} = require('../services/ProtocoloService');

const {
  createPaciente, getPacienteById
} = require('../services/PacienteService');
const {
  createVeterinaria, getVeterinariaById
} = require('../services/VeterinariaService');

const getProtocolos = async (req, res) => {
  try {
    const protocolos = await getAllProtocolos();
    res.json({ registros: protocolos.length, result: protocolos, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const getProtocoloId = async (req, res) => {
  try {
    const { id } = req.params;
    const protocolo = await getProtocoloById(id);
    if (protocolo) {
      res.json({ result: protocolo, status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Protocolo no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const addProtocolo = async (req, res) => {
  try {
    const body = req.body;
    console.log('Datos recibidos para crear el protocolo:', body);
    try {
      let veterinaria = body.veterinaria;
      if (!veterinaria) {
        const nuevaVeterinaria = await createVeterinaria({ nombre: body.nuevoVeterinaria });
        veterinaria = nuevaVeterinaria.id_veterinaria;
      } else {
        const veterinariaExistente = await getVeterinariaById(veterinaria);
        veterinaria = veterinariaExistente.id_veterinaria;
      }
      const addPaciente = await createPaciente({
        nombre: body.nombre,
        id_especie: body.especie,
        id_raza: body.raza,
        id_sexo: body.sexo,
        tutor: body.tutor,
        edad: body.edad
      });
      const pacienteId = addPaciente.id_paciente;
      const protocolo = {
        id_protocolo: body.id_protocolo,
        id_paciente: pacienteId,
        id_veterinaria: veterinaria,
        id_profesional: body.profesional,
        fecha: body.fecha,
        importe: body.importe,
        id_estudio: body.estudio,
        id_estado: 1
      };
      await createProtocolo(protocolo);
    } catch (error) {
      console.error('Error al crear el protocolo:', error);
      res.status(500).json({ error: 'Error al crear el protocolo', details: error.message });
    }
    res.status(201).json({
      result: 'Protocolo creado',
      status: 201,
      ok: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const updateProtocoloId = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const protocolo = await getProtocoloById(id);
    if (protocolo) {
      await updateProtocolo(id, body);
      res.json({ result: 'Protocolo actualizado', status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Protocolo no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const deleteProtocoloId = async (req, res) => {
  try {
    const { id } = req.params;
    const protocolo = await getProtocoloById(id);
    if (protocolo) {
      await deleteProtocolo(id);
      res.json({ result: 'Protocolo eliminado', status: 200, ok: true });
    } else {
      res.status(404).json({ error: 'Protocolo no encontrado', status: 404, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
};

const searchProtocolosByFilters = async (req, res) => {
  try {
    const filters = req.query;
    const protocolos = await searchProtocolos(filters);
    res.json({ registros: protocolos.length, result: protocolos, status: 200, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 500, ok: false });
  }
}


module.exports = {
  getProtocolos,
  getProtocoloId,
  addProtocolo,
  updateProtocoloId,
  deleteProtocoloId,
  searchProtocolosByFilters
};
