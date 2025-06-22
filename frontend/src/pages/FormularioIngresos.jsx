import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete, Modal, Typography, Grid, Divider } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Esquema de validación usando Yup
const validationSchema = yup.object().shape({
    date: yup.date().required('La fecha es requerida'),
    moneySent: yup
        .number()
        .typeError('Debe ser un número'),
    protocolNumber: yup
        .string()
        .matches(/^\d+$/, 'El número de protocolo debe ser una cadena de números')
        .required('El número de protocolo es requerido'),
    professional: yup.string(),
    veterinary: yup.string(),
    tutor: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'El tutor solo puede contener letras'),
    patient: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, 'El paciente solo puede contener letras'),
    species: yup.string().required('La especie es requerida'),
    breed: yup.string(),
    sex: yup.string(),
    age: yup.string(), // Permitir cualquier valor como string
    requestedAnalysis: yup.string().required('Seleccione un análisis solicitado'),
});

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const FormularioIngresos = () => {
    const navigate = useNavigate(); // Hook para redirigir
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            date: getTodayDate(),
            protocolNumber: '',
            moneySent: '',
            tutor: '',
            patient: '',
            age: '',
            nuevoVeterinaria: ''

        },
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
            importe: data.moneySent || 0,
            id_protocolo: data.protocolNumber,
            profesional: data.professional || 43,
            veterinaria: data.veterinary || 32,
            nombre: data.patient || 'S/E',
            especie: data.species,
            raza: data.breed || 12,
            sexo: data.sex || 3,
            tutor: data.tutor || 'S/E',
            edad: data.age || 0,
            nuevoVeterinaria: data.nuevoVeterinaria || '',
            estudio: data.requestedAnalysis,
        };

        console.log('Datos para enviar:', datosParaEnviar);

        try {
            const response = await axios.post(`${backendUrl}/protocolos`, datosParaEnviar);
            console.log('Respuesta del servidor:', response.data);
            setModalOpen(true); 
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const handleEditProtocol = () => {
        setModalOpen(false);
        navigate('/dashboard/informes/tabla');
    };

    const handleLoadAnotherProtocol = () => {
        reset();
        setModalOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 'calc(100vh - 120px)', // Ajusta la altura para adaptarse a cualquier pantalla
                    padding: '16px',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Formulario de Ingreso
                </Typography>
                <Divider sx={{ width: '100%', maxWidth: '800px', marginBottom: '16px' }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '16px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="professional"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={options.professionals}
                                        getOptionLabel={(option) => option.nombre || ''}
                                        value={options.professionals.find((opt) => opt.id_profesional === field.value) || null}
                                        onChange={(_, value) => field.onChange(value?.id_profesional || '')}
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="veterinary"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={[...options.veterinaries, { id_veterinaria: 'Otro', nombre: 'Otro' }]}
                                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.nombre)}
                                        value={
                                            [...options.veterinaries, { id_veterinaria: 'Otro', nombre: 'Otro' }]
                                            .find((opt) => opt.id_veterinaria === field.value) || null
                                        }
                                        onChange={(_, value) => {
                                            if (value?.id_veterinaria === 'Otro') {
                                                setIsOtherVeterinaria(true);
                                                field.onChange('');
                                            } else {
                                                setIsOtherVeterinaria(false);
                                                field.onChange(value?.id_veterinaria || '');
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
                        </Grid>

                        {isOtherVeterinaria && (
                            <Grid item xs={12} sm={6}>
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
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="species"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={options.species}
                                        getOptionLabel={(option) => option.tipo || ''}
                                        value={options.species.find((opt) => opt.id_especie === field.value) || null}
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="breed"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={options.breeds}
                                        getOptionLabel={(option) => option.nombre || ''}
                                        value={options.breeds.find((opt) => opt.id_raza === field.value) || null}
                                        onChange={(_, value) => field.onChange(value?.id_raza || '')}
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="sex"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={options.sexes}
                                        getOptionLabel={(option) => option.sexo || ''}
                                        value={options.sexes.find((opt) => opt.id_sexo === field.value) || null}
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Edad"
                                        type="text" 
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="requestedAnalysis"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={options.analyses}
                                        getOptionLabel={(option) => option.estudio || ''}
                                        value={options.analyses.find((opt) => opt.id_estudio === field.value) || null}
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
                        </Grid>
                    </Grid>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' }, mt: 2 }} 
                        fullWidth
                    >
                        Subir Orden
                    </Button>
                </Box>
            </Box>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Protocolo creado correctamente
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        ¿Qué desea hacer a continuación?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
                        <Button 
                            variant="contained"
                            color="success" 
                            onClick={handleEditProtocol} 
                            sx={{ width: "50%" }}>
                            Ir a Tabla de registros
                        </Button>
                        
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleLoadAnotherProtocol}
                            sx={{ width: "50%" }}>
                            Cargar otro protocolo
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FormularioIngresos;