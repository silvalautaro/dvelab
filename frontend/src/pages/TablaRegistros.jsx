import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from 'axios';

const steps = ['HEMOGRAMA', 'Formula Leucocitaria', 'BIOQUIMICA SANGUINEA', 'Coagulograma'];

const estudiosMap = {
  1: 'Perfil General Básico',
  2: 'Perfil General Completo',
  3: 'Perfil Hepático',
  4: 'Perfil Neurológico 1',
  5: 'Perfil Neurológico 2',
  6: 'Perfil Prequirúrgico Hemostático',
  7: 'Perfil Renal Básico',
  8: 'Perfil Renal Completo',
  9: 'Perfil Tiroideo Básico',
  10: 'Perfil Tiroideo Completo',
  11: 'Hemograma',
  12: 'Perfil Infeccioso Felino'
};

const estadosMap = {
  1: 'Ingresado',
  2: 'Pendiente',
  3: 'Completado'
};

const TextFieldGroup = ({ labels, data, handleChange, fieldRefs, handleKeyDown }) => (
  <div>
    {labels.map((label, index) => (
      <TextField
        key={label}
        autoFocus={index === 0}
        margin="dense"
        id={label.toLowerCase().replace(/ /g, '-')}
        label={label}
        type="text"
        fullWidth
        variant="standard"
        value={data[label.toLowerCase().replace(/ /g, '-')] || ''}
        onChange={handleChange}
        inputRef={(el) => (fieldRefs.current[index] = el)}
        onKeyDown={(event) => handleKeyDown(event, index)}
      />
    ))}
  </div>
);

const TablaRegistros = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([]);
  const [selectedProtocoloId, setSelectedProtocoloId] = useState(null);
  const [hemogramaData, setHemogramaData] = useState({});
  const [formulaLeucocitariaData, setFormulaLeucocitariaData] = useState({});
  const [bioquimicaSanguineaData, setBioquimicaSanguineaData] = useState({});
  const [coagulogramaData, setCoagulogramaData] = useState({});
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('');
  const [numeroProtocolo, setNumeroProtocolo] = useState('');
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/estados`);
        setEstados(response.data.result);
      } catch (error) {
        console.error('Error fetching estados:', error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
        setData(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchEstados();
  }, []);

  const handleEstadoChange = (e) => {setEstado(e.target.value); console.log(e.target.value);}
  const handleNumeroProtocoloChange = (e) => {setNumeroProtocolo(e.target.value); console.log(e.target.value)};

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleFiltroClick = async () => {
    try {
      // Enviar los datos al backend
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos/go/search`, {
        params: {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          id_estado: estado,
          id_protocolo: numeroProtocolo
        }
      });
      setData(response.data.result);
      console.log(response.data);  // Puedes manejar la respuesta como desees
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  const handleLimpiarFiltros = async() => {
    setFechaInicio('');
    setFechaFin('');
    setEstado('');
    setNumeroProtocolo('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleClick = (event, id_protocolo) => {
    console.log(id_protocolo);
    setSelectedProtocoloId(id_protocolo);
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  
  const handleOpenDialog = (id_protocolo) => {
    //setSelectedProtocoloId(id_protocolo);
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProtocoloId(null);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hemogramas`, { ...hemogramaData, id_protocolo: selectedProtocoloId });
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria`, { ...formulaLeucocitariaData, id_protocolo: selectedProtocoloId });
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea`, { ...bioquimicaSanguineaData, id_protocolo: selectedProtocoloId });
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas`, { ...coagulogramaData, id_protocolo: selectedProtocoloId });

      alert('Datos guardados correctamente');
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos');
    }
  };

  const fieldRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' && index < fieldRefs.current.length - 1) {
      fieldRefs.current[index + 1].focus();
    } else if (event.key === 'ArrowUp' && index > 0) {
      fieldRefs.current[index - 1].focus();
    }
  };

  const handleHemogramaChange = (e) => {
    setHemogramaData({ ...hemogramaData, [e.target.id]: e.target.value });
  };

  const handleFormulaLeucocitariaChange = (e) => {
    setFormulaLeucocitariaData({ ...formulaLeucocitariaData, [e.target.id]: e.target.value });
  };

  const handleBioquimicaSanguineaChange = (e) => {
    setBioquimicaSanguineaData({ ...bioquimicaSanguineaData, [e.target.id]: e.target.value });
  };

  const handleCoagulogramaChange = (e) => {
    setCoagulogramaData({ ...coagulogramaData, [e.target.id]: e.target.value });
  };

  const renderFormContent = (step) => {
    switch (step) {
      case 0:
        return <TextFieldGroup labels={['Recuento Glóbulos Rojos', 'Hemoglobina', 'Hematocrito', 'VCM', 'HCM', 'CHCM', 'RDW', 'Índice Reticulocitario', 'Recuento Plaquetario', 'Frotis', 'Recuento Leucocitario']} data={hemogramaData} handleChange={handleHemogramaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
      case 1:
        return <TextFieldGroup labels={['Neutrófilos Segmentados', 'Neutrófilos en banda', 'Eosinófilos', 'Basófilos', 'Linfocitos', 'Monocitos', 'Formas Juveniles']} data={formulaLeucocitariaData} handleChange={handleFormulaLeucocitariaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
      case 2:
        return <TextFieldGroup labels={['Urea', 'Creatinina', 'Glucemia', 'GPT (ALT)', 'GOT (AST)', 'Fosfatasa Alcalina Sérica (FAS)', 'g-glutamil transferasa (GGT)', 'Proteínas Totales', 'Albúmina', 'Globulinas', 'Relación Alb/Glob', 'Bilirrubina Total (BT)', 'Bilirrubina Directa (BD)', 'Bilirrubina Indirecta (BI)', 'Amilasa', 'Triglicéridos (TAG)', 'Colesterol Total (COL)', 'Creatinin-P-Kinasa (CPK)', 'HDL- Col', 'LDL- Col', 'Calcio Total (Ca)', 'Fósforo (P)', 'Sodio (Na)', 'Potasio (K)', 'Cloro (Cl)']} data={bioquimicaSanguineaData} handleChange={handleBioquimicaSanguineaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
      case 3:
        return <TextFieldGroup labels={['Tiempo de Protrombina- T.P', 'Tiempo de tromboplastina parcial activado - KPTT']} data={coagulogramaData} handleChange={handleCoagulogramaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
      default:
        return 'Unknown step';
    }
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Box p={3}>
      {/* Encabezado con Totales */}
      <Box
        display="flex"
        justifyContent="space-evenly"
        mb={2}
        p={2}
        bgcolor="#f5f5f5"
        borderRadius="8px"
      >
        <Box>
          <strong>Análisis Completados:</strong> <span style={{ color: "green" }}>1000</span>
        </Box>
        <Box>
          <strong>Análisis Pendientes:</strong> <span style={{ color: "orange" }}>300</span>
        </Box>
      </Box>

      {/* Filtros */}
      <Box display="flex" justifyContent="space-between" mb={2}>
      <Box display="flex" gap={2}>
        <TextField
          label="Desde"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaInicio}
          onChange={handleFechaInicioChange}
        />
        <TextField
          label="Hasta"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaFin}
          onChange={handleFechaFinChange}
        />
        {/* Campo de Estado */}
        <TextField
          select
          label="Estado"
          value={estado}
          onChange={handleEstadoChange}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">
          </option>
          {estados.map((estado) => (
            <option key={estado.id_estado} value={estado.id_estado}>
              {estado.estado}
            </option>
          ))}
        </TextField>

        {/* Campo de N° de Protocolo */}
        <TextField
          label="N° de Protocolo"
          value={numeroProtocolo}
          onChange={handleNumeroProtocoloChange}
        />
        <Button variant="contained" color="primary" onClick={handleFiltroClick}>
          Filtrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLimpiarFiltros}
        >
          Limpiar filtros
      </Button>
      </Box>
    </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Número de Protocolo</TableCell>
              <TableCell>Emisión</TableCell>
              <TableCell>Análisis Solicitado</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, index) => {
                const precioEstudio = row.Estudio.Precios[0].precio;
                const formatCurrency = (amount) => {
                  return new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'ARS',
                  }).format(amount);
                };
                
                let importeColor = '';
                if (row.importe === precioEstudio) {
                  importeColor = 'green';
                } else if (row.importe > 0 && row.importe < precioEstudio) {
                  importeColor = 'yellow'; 
                } else if (row.importe === 0) {
                  importeColor = 'red'; 
                }

                return (
                  <TableRow key={index}>
                    <TableCell>{estadosMap[row.id_estado] || 'Desconocido'}</TableCell>
                    <TableCell>{row.id_protocolo}</TableCell>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{estudiosMap[row.id_estudio] || 'Desconocido'}</TableCell>
                    <TableCell style={{ backgroundColor: importeColor, textAlign: 'center', fontWeight: 'bold' }}>
                        {formatCurrency(row.importe)}
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={(event) => handleClick(event, row.id_protocolo)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={openMenu}
                          slotProps={{
                            paper: {
                              style: { width: 200 },
                            },
                          }}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={handleCloseMenu}>Ver</MenuItem>
                          <MenuItem onClick={() => handleOpenDialog(selectedProtocoloId)}>Editar</MenuItem>
                          <MenuItem onClick={handleCloseMenu}>Descargar</MenuItem>
                          <MenuItem onClick={handleCloseMenu}>Eliminar</MenuItem>
                        </Menu>

                        {/* Diálogo con formulario */}
                        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                          <DialogTitle>Editar Protocolo N° ({selectedProtocoloId})</DialogTitle>
                          <DialogContent>
                            <Stepper activeStep={activeStep}>
                              {steps.map((label) => (
                                <Step key={label}>
                                  <StepLabel>{label}</StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                            {renderFormContent(activeStep)}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                              Cancelar
                            </Button>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              color="primary"
                            >
                              Atrás
                            </Button>
                            <Button
                              disabled={activeStep === steps.length - 1}
                              onClick={handleNext}
                              color="primary"
                            >
                              Siguiente
                            </Button>
                            {activeStep === steps.length - 1 && (
                              <Button onClick={handleSave} color="primary">
                                Guardar
                              </Button>
                            )}
                          </DialogActions>
                        </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          displayEmpty
          inputProps={{ "aria-label": "Registros por página" }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Box>
  );
};

export default TablaRegistros;
