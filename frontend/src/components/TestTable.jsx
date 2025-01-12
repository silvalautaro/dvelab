import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TestsTable = () => {
    const rows = [
        { code: 1, test: 'GLUCOSE', amount: 18, price: 17.5 },
        { code: 2, test: 'UREA', amount: 18, price: 0.6 },
        { code: 3, test: 'CREATININE', amount: 18, price: 2.75 },
    ];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.code}>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.test}</TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.price} €</TableCell>
                        <TableCell>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TestsTable;
