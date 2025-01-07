import React, { useState } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import HemogramaTable from './components/HemogramaTable';
import GeneratePDFButton from './components/GeneratePDFButton';

const App = () => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          general: {
            fecha: formData.fecha,
            protocolo: formData.protocolo,
            tutor: formData.tutor,
            // Otros campos...
          },
          hemograma: [
            { label: 'Recuento Glóbulos Rojos', resultado: formData.rbc, unit: 'M/ul' },
            { label: 'Hemoglobina', resultado: formData.hb, unit: 'g/dl' },
          ],
        }),
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Informe.pdf';
        a.click();
      } else {
        console.error('Error al generar el PDF');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <FormSection onChange={handleChange} />
      <HemogramaTable data={formData} onChange={handleChange} />
      <GeneratePDFButton onClick={handleGeneratePDF} />
    </div>
  );
};

export default App;
