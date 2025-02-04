const fs = require('fs');
const path = require('path');

const {
    getArchivosPorProtocolo,
    subirArchivoPdf,
    getAllArchivosPdf
} = require('../services/ArchivoPdfService');

const getAllArchivos = async (req, res) => {
    try {
        const archivos = await getAllArchivosPdf();
        res.json({ registro: archivos.length, result: archivos, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const subirArchivo = async (req, res) => {
    try {
        const { id } = req.params;
        const { path } = req.file;
        const nombreArchivo = req.file.originalname;
        const archivo = await subirArchivoPdf(id, path, nombreArchivo);
        res.json({ result: archivo, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const getArchivoPdf = async (req, res) => {
  try {
      const { idProtocolo } = req.params;
      const archivos = await getArchivosPorProtocolo(idProtocolo);
      if (archivos.length > 0) {
          const archivo = archivos[0];
          const ruta = path.join(__dirname, '..', 'public', archivo.url);
          const pdf = fs.readFileSync(ruta);
          res.contentType('application/pdf');
          res.send(pdf);
      } else {
          res.status(404).json({ error: 'Archivo no encontrado', status: 404, ok: false });
      }
  } catch (error) {
      console.error('Error al obtener archivo:', error);
      res.status(500).json({ error: 'Error al obtener archivo', status: 500, ok: false });
  }
};

module.exports = {
    getAllArchivos,
    subirArchivo,
    getArchivoPdf
};