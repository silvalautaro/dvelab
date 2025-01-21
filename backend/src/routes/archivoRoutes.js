const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllArchivos, subirArchivo, getArchivoPdf } = require('../controllers/ArchivoPdfController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); 
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const uniqueSuffix = `${date}-${id}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

// Obtener todos los archivos PDF
router.get('/', getAllArchivos);

// Obtener un archivo PDF por protocolo
router.get('/:idProtocolo', getArchivoPdf);

// Subir un archivo PDF por protocolo
router.post('/:id', upload.single('file'), subirArchivo);

module.exports = router;
