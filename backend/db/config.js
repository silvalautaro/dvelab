const sql = require('mssql');

const config = {
  user: 'sa',
  password: '1234',
  server: 'localhost',
  database: 'Informes',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('Conexión a SQL Server exitosa');
  } catch (err) {
    console.error('Error conectando a SQL Server:', err);
  }
};

module.exports = { sql, connectDB };
