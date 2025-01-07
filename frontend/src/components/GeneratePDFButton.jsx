import React from 'react';
import { Button, Box } from '@mui/material';

const GeneratePDFButton = ({ onClick }) => (
  <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
    <Button variant="contained" color="primary" onClick={onClick}>
      Generar PDF
    </Button>
  </Box>
);

export default GeneratePDFButton;
