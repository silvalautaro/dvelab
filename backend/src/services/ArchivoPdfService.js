const ArchivoPdf = require('../models/archivo_pdf');

const getAllArchivosPdf = async (req, res) => {
    try {
      const archivos = await ArchivoPdf.findAll();
      return archivos;
    } catch (error) {
        console.error('Error al obtener archivos:', error);
        throw new Error('Error al obtener archivos', error.message);
    }
};

const getArchivosPorProtocolo = async (idProtocolo) => {
    try {
      const archivos = await ArchivoPdf.findAll({
        where: {
          id_protocolo: idProtocolo,
        },
      });
      return archivos;
    } catch (error) {
      console.error('Error al obtener archivos:', error);
      throw new Error('Error al obtener archivos', error.message);
    }
};

const subirArchivoPdf = async (idProtocolo, url, nombreArchivo) => {
  try {
    const archivo = await ArchivoPdf.create({
      id_protocolo: idProtocolo,
      url: url,
      nombre_archivo: nombreArchivo || null,
    });
    return archivo;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw new Error('Error al subir archivo');
  }
};

module.exports = {
    getAllArchivosPdf,
    getArchivosPorProtocolo,
    subirArchivoPdf,
};