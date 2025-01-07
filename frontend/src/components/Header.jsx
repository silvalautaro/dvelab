import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = () => (
  <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
    <Typography variant="h4" gutterBottom>
      Generador de Informes
    </Typography>
    <Typography variant="subtitle1">
      Complete los campos necesarios y genere un informe en PDF.
    </Typography>
  </Box>
);

export default Header;
