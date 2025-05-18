const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/config');
const pdf = require('pdfkit');
const path = require('path');
require('dotenv').config();

const { 
  especieRoutes, 
  razaRoutes, 
  profesionalRoutes, 
  veterinariaRoutes, 
  estudioRoutes, 
  pacienteRoutes, 
  protocoloRoutes, 
  hemogramaRoutes, 
  tipoCelulaRoutes, 
  formulaLRoutes,
  bioquimicaSRoutes,
  coagulogramaRoutes, 
  sexoRoutes,
  archivoRoutes,
  estadoRoutes,
  categoriaRoutes,
  precioRoutes,
  usuarioRoutes,
  pagoRoutes
} = require('./src/routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Rutas de la API
app.use('/api/especies', especieRoutes);
app.use('/api/razas', razaRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/veterinarias', veterinariaRoutes);
app.use('/api/estudios', estudioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/protocolos', protocoloRoutes);
app.use('/api/hemogramas', hemogramaRoutes);
app.use('/api/tipos-celula', tipoCelulaRoutes);
app.use('/api/formula-leucocitaria', formulaLRoutes);
app.use('/api/bioquimica-sanguinea', bioquimicaSRoutes);
app.use('/api/coagulogramas', coagulogramaRoutes);
app.use('/api/generos', sexoRoutes);
app.use('/api/archivos', archivoRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/precios', precioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/status', (req, res) => {
  res.json({ status: 'API en línea' });
});
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT =  process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
