import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import jsPDF from 'jspdf';

// Esquema de validación usando Yup
const validationSchema = yup.object().shape({
    date: yup.date().required('La fecha es requerida'),
    moneySent: yup
        .number()
        .typeError('Debe ser un número')
        .required('El monto es requerido'),
    protocolNumber: yup
        .string()
        .matches(/^\d+$/, 'El número de protocolo debe ser una cadena de números')
        .required('El número de protocolo es requerido'),
    professional: yup.string().required('Seleccione o escriba un profesional'),
    veterinary: yup.string().required('Seleccione o escriba una veterinaria'),
    tutor: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'El tutor solo puede contener letras')
        .required('El tutor es requerido'),
    patient: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'El paciente solo puede contener letras')
        .required('El paciente es requerido'),
    species: yup.string().required('Seleccione una especie'),
    breed: yup.string().required('Seleccione o escriba una raza'),
    sex: yup.string().required('Seleccione un sexo'),
    age: yup.number().typeError('Debe ser un número').required('La edad es requerida'),
    requestedAnalysis: yup.string().required('Seleccione un análisis solicitado'),
});

const FormularioIngresos = () => {
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

    const options = {
        meansofpayment: ['Efectivo', 'Mercado Pago'],
        professionals: ['Dr. Pérez', 'Dra. López', 'Dr. Sánchez'],
        veterinaries: ['Veterinaria Central', 'AnimalCare', 'Healthy Pets'],
        breeds: ['Labrador', 'Pastor Alemán', 'Beagle'],
        species: ['Canina', 'Felina'],
        sexes: ['Macho', 'Hembra'],
        analyses: ['Perfil General Básico', 'Perfil General Completo', 'Hemograma'],
    };

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
                name="protocolNumber"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Número de Protocolo"
                        error={!!errors.protocolNumber}
                        helperText={errors.protocolNumber?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="date"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Fecha"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="moneySent"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Dinero remitido"
                        type="number"
                        error={!!errors.moneySent}
                        helperText={errors.moneySent?.message}
                        fullWidth
                    />
                )}
            />

            {[
                {
                    field: 'meansofpayment',
                    label: 'Medio de Pago',
                    options: options.meansofpayment,
                },                 
                {
                    field: 'professional',
                    label: 'Profesional',
                    options: options.professionals,
                },
                {
                    field: 'veterinary',
                    label: 'Veterinaria',
                    options: options.veterinaries,
                },
            ].map(({ field, label, options }) => (
                <Controller
                    key={field}
                    name={field}
                    control={control}
                    render={({ field: controllerField }) => (
                        <Autocomplete
                            {...controllerField}
                            options={options}
                            onChange={(_, value) => controllerField.onChange(value || '')}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={label}
                                    error={!!errors[field]}
                                    helperText={errors[field]?.message}
                                    fullWidth
                                />
                            )}
                        />
                    )}
                />
            ))}

            <Controller
                name="tutor"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Tutor"
                        error={!!errors.tutor}
                        helperText={errors.tutor?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="patient"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Paciente"
                        error={!!errors.patient}
                        helperText={errors.patient?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={options.breeds}
                        onChange={(_, value) => field.onChange(value || '')}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Raza"
                                error={!!errors.breed}
                                helperText={errors.breed?.message}
                                fullWidth
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="species"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Especie"
                        select
                        error={!!errors.species}
                        helperText={errors.species?.message}
                        fullWidth
                    >
                        {options.species.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Sexo"
                        select
                        error={!!errors.sex}
                        helperText={errors.sex?.message}
                        fullWidth
                    >
                        {options.sexes.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="age"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Edad"
                        type="number"
                        error={!!errors.age}
                        helperText={errors.age?.message}
                        fullWidth
                    />
                )}
            />

            <Controller
                name="requestedAnalysis"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Análisis solicitado"
                        select
                        error={!!errors.requestedAnalysis}
                        helperText={errors.requestedAnalysis?.message}
                        fullWidth
                    >
                        {options.analyses.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            {/* Botón de envío */}
            <Button 
                type="submit" 
                variant="contained" 
                sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }} 
                fullWidth
            >
                Subir Orden
            </Button>
        </Box>
    );
};

export default FormularioIngresos;
