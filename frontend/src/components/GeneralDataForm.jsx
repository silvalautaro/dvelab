import React from 'react';
import { TextField, Grid } from '@mui/material';

const GeneralDataForm = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Customer" defaultValue="COMPANY 1" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Contact Person" defaultValue="MARK SMITH" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" defaultValue="478889974" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" defaultValue="mark.smith@company.com" />
            </Grid>
        </Grid>
    );
};

export default GeneralDataForm;
