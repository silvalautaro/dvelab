const PDFDocument = require('pdfkit');

const generatePDF = (data, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(16).text('Informe', { align: 'center' });
  doc.moveDown();

  // Datos Generales
  doc.fontSize(12).text('Datos Generales:');
  Object.keys(data.general).forEach((key) => {
    doc.text(`${key}: ${data.general[key]}`);
  });

  // Hemograma
  doc.moveDown().text('Hemograma:');
  data.hemograma.forEach((item) => {
    doc.text(`${item.label}: ${item.resultado} ${item.unit}`);
  });

  doc.end();
};

module.exports = generatePDF;
