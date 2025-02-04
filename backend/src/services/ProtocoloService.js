const { Protocolo, Paciente, Veterinaria, Profesional, Estudio, Especie, Raza, Sexo, ArchivoPdf, Estado, Precio, Hemograma, Bioquimica_Sanguinea, Coagulograma, FormulaLeucocitaria } = require('../models');
const moment = require('moment');
const sequelize = require('sequelize');

const getAllProtocolos = async () => {
  return await Protocolo.findAll({
    include: [
      { 
        model: Paciente, 
        include: [
          { model: Especie, attributes: ['tipo'] }, 
          { model: Raza, attributes: ['nombre'] }, 
          { model: Sexo, attributes: ['sexo'] }
        ] 
      },
      Veterinaria,  
      Profesional,  
      {model: Estudio,
        include:[
          { model: Precio, attributes: ['precio'] }
        ]
      },   
      Estado,  
      ArchivoPdf,
      Hemograma,
      Bioquimica_Sanguinea,
      Coagulograma,
      FormulaLeucocitaria

    ],
    order: [['fecha', 'DESC']]
  });
};

const getProtocoloById = async (id_protocolo) => {
  const protocolo = await Protocolo.findByPk(id_protocolo, {
    include: [
      { 
        model: Paciente, 
        include: [
          { model: Especie, attributes: ['tipo'] }, 
          { model: Raza, attributes: ['nombre'] }, 
          { model: Sexo, attributes: ['sexo'] } 
        ]  
      },
      Veterinaria,  
      Profesional,  
      {model: Estudio,
        include:[
          { model: Precio, attributes: ['precio'] }
        ]
      },   
      Estado,    
      ArchivoPdf,
      Hemograma,
      Bioquimica_Sanguinea,
      Coagulograma,
      FormulaLeucocitaria
    ],
  });

  return protocolo;
};

const createProtocolo = async (data) => {
  return await Protocolo.create(data);
};

const updateProtocolo = async (id_protocolo, data) => {
  return await Protocolo.update(data, { where: { id_protocolo } });
};

const deleteProtocolo = async (id_protocolo) => {
  return await Protocolo.destroy({ where: { id_protocolo } });
};

const searchProtocolos = async (filters) => {
  const whereClause = {};
  console.log("FILTROS: ", filters);
  
  if (filters.fecha_inicio !== '' && filters.fecha_fin !== '') {
    filters.fecha_inicio = moment(filters.fecha_inicio).format('YYYY-MM-DD');
    filters.fecha_fin = moment(filters.fecha_fin).format('YYYY-MM-DD');
    
    whereClause.fecha = {
      [sequelize.Op.between]: [filters.fecha_inicio, filters.fecha_fin]
    };
  } else if (filters.fecha) {
    filters.fecha = moment(filters.fecha).format('YYYY-MM-DD');
    whereClause.fecha = sequelize.where(sequelize.fn('DATE', sequelize.col('Protocolo.fecha')), filters.fecha);
  }

  if (filters.id_protocolo) {
    whereClause.id_protocolo = filters.id_protocolo;
  }
  if (filters.id_estado) {
    whereClause.id_estado = filters.id_estado;
  }

  return await Protocolo.findAll({
    where: whereClause,
    include: [
      { 
        model: Paciente, 
        include: [
          { model: Especie, attributes: ['tipo'] }, 
          { model: Raza, attributes: ['nombre'] }, 
          { model: Sexo, attributes: ['sexo'] }
        ]  
      },
      Veterinaria,  
      Profesional,  
      { model: Estudio,
        include:[
          { model: Precio, attributes: ['precio'] }
        ]
      },  
      Estado,    
      ArchivoPdf,
      Hemograma,
      Bioquimica_Sanguinea,
      Coagulograma,
      FormulaLeucocitaria
    ],
    order: [['fecha', 'DESC']]
  });
};


module.exports = {
  getAllProtocolos,
  getProtocoloById,
  createProtocolo,
  updateProtocolo,
  deleteProtocolo,
  searchProtocolos 
};