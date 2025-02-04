import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const FormularioIngresos = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [isOtherVeterinaria, setIsOtherVeterinaria] = useState(false);
    const [options, setOptions] = useState({
        professionals: [],
        veterinaries: [],
        breeds: [],
        species: [],
        sexes: [],
        analyses: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [professionals, veterinaries, breeds, species, sexes, analyses] = await Promise.all([
                    axios.get(`${backendUrl}/profesionales`),
                    axios.get(`${backendUrl}/veterinarias`),
                    axios.get(`${backendUrl}/razas`),
                    axios.get(`${backendUrl}/especies`),
                    axios.get(`${backendUrl}/generos`),
                    axios.get(`${backendUrl}/estudios`),
                ]);
                
                setOptions({
                    professionals: Array.isArray(professionals.data.result) ? professionals.data.result : [],
                    veterinaries: Array.isArray(veterinaries.data.result) ? veterinaries.data.result : [],
                    breeds: Array.isArray(breeds.data.result) ? breeds.data.result : [],
                    species: Array.isArray(species.data.result) ? species.data.result : [],
                    sexes: Array.isArray(sexes.data.result) ? sexes.data.result : [],
                    analyses: Array.isArray(analyses.data.result) ? analyses.data.result : []
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const datosParaEnviar = {
            fecha: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
            importe: data.moneySent,
            id_protocolo: data.protocolNumber,
            profesional: data.professional ,
            veterinaria: data.veterinary ,
            nombre: data.patient ,
            especie: data.species ,
            raza: data.breed ,
            sexo: data.sex ,
            tutor: data.tutor || '',
            edad: data.age || 0,
            nuevoVeterinaria: data.nuevoVeterinaria || '',
            estudio: data.requestedAnalysis ,
        };
        
        try {
            const response = await axios.post(`${backendUrl}/protocolos`, datosParaEnviar);
            alert('Datos enviados correctamente');
            console.log('Respuesta del servidor:', response.data);
            reset();
            navigate('/dashboard/informes/tabla')
            
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
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

            <Controller
                name="professional"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={options.professionals}
                        getOptionLabel={(option) => option.nombre || option}
                        onChange={(_, value) => field.onChange(value ? value.id_profesional : '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Profesional"
                                error={!!errors.professional}
                                helperText={errors.professional?.message}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="veterinary"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={[...options.veterinaries, 'Otro']}
                        getOptionLabel={(option) => option.nombre || option}
                        onChange={(_, value) => {
                            if (value === 'Otro') {
                                setIsOtherVeterinaria(true);
                                field.onChange('');
                            } else {
                                setIsOtherVeterinaria(false);
                                field.onChange(value ? value.id_veterinaria : '');
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Veterinaria"
                                error={!!errors.veterinary}
                                helperText={errors.veterinary?.message}
                            />
                        )}
                    />
                )}
            />

            {isOtherVeterinaria && (
                <Controller
                    name="nuevoVeterinaria"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nombre de la nueva veterinaria"
                            fullWidth
                            error={!!errors.nuevoVeterinaria}
                            helperText={errors.nuevoVeterinaria?.message}
                        />
                    )}
                />
            )}

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
                        getOptionLabel={(option) => option.nombre || ''}
                        onChange={(_, value) => field.onChange(value.id_raza || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Raza"
                                error={!!errors.breed}
                                helperText={errors.breed?.message}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="species"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={options.species}
                        getOptionLabel={(option) => option.tipo || ''}
                        onChange={(_, value) => field.onChange(value?.id_especie || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Especie"
                                error={!!errors.species}
                                helperText={errors.species?.message}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={options.sexes}
                        getOptionLabel={(option) => option.sexo || ''}
                        onChange={(_, value) => field.onChange(value?.id_sexo || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Sexo"
                                error={!!errors.sex}
                                helperText={errors.sex?.message}
                            />
                        )}
                    />
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
                    <Autocomplete
                        {...field}
                        options={options.analyses}
                        getOptionLabel={(option) => option.estudio || ''}
                        onChange={(_, value) => field.onChange(value?.id_estudio || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Análisis solicitado"
                                error={!!errors.requestedAnalysis}
                                helperText={errors.requestedAnalysis?.message}
                            />
                        )}
                    />
                )}
            />
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
