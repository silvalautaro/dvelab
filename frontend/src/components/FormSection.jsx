import React from 'react';
import { Box, Grid, TextField } from '@mui/material';

const FormSection = ({ onChange }) => {
  const fields = [
    { label: 'Fecha', id: 'fecha' },
    { label: 'Protocolo', id: 'protocolo' },
    { label: 'Tutor', id: 'tutor' },
    { label: 'Paciente', id: 'paciente' },
    { label: 'Especie', id: 'especie' },
    { label: 'Raza', id: 'raza' },
    { label: 'Sexo', id: 'sexo' },
    { label: 'Edad', id: 'edad' },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field.id}>
            <TextField
              fullWidth
              label={field.label}
              variant="outlined"
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FormSection;
