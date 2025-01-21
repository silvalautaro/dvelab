const { Paciente, Protocolo } = require('../models');

const getAllPacientes = async () => {
  return await Paciente.findAll();
};

const getPacienteById = async (id) => {
    return await Paciente.findOne({
      where: { id_paciente: id },
      include: [{
        model: Protocolo,
        as: 'protocolos'
      }]
    });
};

const createPaciente = async (data) => {
  return await Paciente.create(data);
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente
};
