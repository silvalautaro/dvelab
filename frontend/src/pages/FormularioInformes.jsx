import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import jsPDF from 'jspdf';

// Esquema de validación usando Yup
const validationSchema = yup.object().shape({
    date: yup.date().required('La fecha es requerida'),
    redBloodCellCount: yup
        .number()
        .typeError('Debe ser un número')
        .min(5.5, 'El valor debe ser mayor o igual a 5.5')
        .max(8, 'El valor debe ser menor o igual a 8')
        .required('El recuento de glóbulos rojos es requerido'),
});

const FormularioInformes = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            requestedAnalysis: 'Perfil General Básico', // Valor predeterminado para análisis solicitado
        },
    });

    const onSubmit = (data) => {
        const doc = new jsPDF();
        doc.text('Informe de Análisis', 20, 20);
        Object.keys(data).forEach((key, index) => {
            doc.text(`${key}: ${data[key]}`, 20, 30 + index * 10);
        });
        doc.save('informe.pdf');

        console.log('Datos enviados:', data);
        alert('Formulario enviado y PDF generado!');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            <Controller
                name="redBloodCellCount"
                control={control}
                render={({ field }) => (
                    <TextField
                        label="Recuento Glóbulos Rojos"
                        type="number"
            error={!!errors.redBloodCellCount}
            helperText={
                errors.redBloodCellCount && (
                    <span style={{ color: '#ffcc00' }}>
                        {errors.redBloodCellCount.message}
                    </span>
                )
            }
            InputProps={{
                style: {
                    color: errors.redBloodCellCount ? '#ffcc00' : undefined, // Texto amarillo
                },
            }}
            InputLabelProps={{
                style: {
                    color: errors.redBloodCellCount ? '#ffcc00' : undefined, // Label amarillo
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Cambia el borde a amarillo
                    },
                    '&:hover fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Evita el borde rojo al pasar el mouse
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Borde amarillo al enfocar
                    },
                },
            }}
            fullWidth
                    />
                )}
            />

            <Controller
                name="redBloodCellCount"
                control={control}
                render={({ field }) => (
                    <TextField
                        label="Hemoglobina"
                        type="number"
            error={!!errors.redBloodCellCount}
            helperText={
                errors.redBloodCellCount && (
                    <span style={{ color: '#ffcc00' }}>
                        {errors.redBloodCellCount.message}
                    </span>
                )
            }
            InputProps={{
                style: {
                    color: errors.redBloodCellCount ? '#ffcc00' : undefined, // Texto amarillo
                },
            }}
            InputLabelProps={{
                style: {
                    color: errors.redBloodCellCount ? '#ffcc00' : undefined, // Label amarillo
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Cambia el borde a amarillo
                    },
                    '&:hover fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Evita el borde rojo al pasar el mouse
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: errors.redBloodCellCount ? '#ffcc00' : undefined, // Borde amarillo al enfocar
                    },
                },
            }}
            fullWidth
                    />
                )}
            />            

            {/* Botón de envío */}
            <Button 
                type="submit" 
                variant="contained" 
                sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }} 
                fullWidth
            >
                Enviar y Generar PDF
            </Button>
        </Box>
    );
};

export default FormularioInformes;
