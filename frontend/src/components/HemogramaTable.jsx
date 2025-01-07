import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

const HemogramaTable = ({ data, onChange }) => {
  const rows = [
    { id: 'rbc', label: 'Recuento Glóbulos Rojos', unit: 'M/ul', ref: '5.5-8' },
    { id: 'hb', label: 'Hemoglobina', unit: 'g/dl', ref: '12-19' },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Determinaciones</TableCell>
          <TableCell>Resultados</TableCell>
          <TableCell>Unidades</TableCell>
          <TableCell>Valores de Referencia</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.label}</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                value={data[row.id] || ''}
                onChange={(e) => onChange(row.id, e.target.value)}
              />
            </TableCell>
            <TableCell>{row.unit}</TableCell>
            <TableCell>{row.ref}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HemogramaTable;
