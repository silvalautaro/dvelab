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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoUrl from '../assets/logo.png';
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

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const TextFieldGroup = ({ labels, data, handleChange, fieldRefs, handleKeyDown }) => (
  <div>
    {labels.map((label, index) => {
      const id = removeAccents(label.toLowerCase().replace(/ /g, '-'));
      return (
        <TextField
          key={label}
          autoFocus={index === 0}
          margin="dense"
          id={id}
          label={label}
          type="text"
          fullWidth
          variant="standard"
          value={data[id] || ''}
          onChange={handleChange}
          inputRef={(el) => (fieldRefs.current[index] = el)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        />
      );
    })}
  </div>
);

const TextFieldGroupWithRelAbs = ({ labels, data, handleChange, fieldRefs, handleKeyDown }) => (
  <div>
    {labels.map((label, index) => {
      const id = removeAccents(label.toLowerCase().replace(/ /g, '-'));
      return (
        <Box key={label} display="flex" alignItems="center" mb={2}>
          <Box width="30%">
            <strong>{label}</strong>
          </Box>
          <TextField
            margin="dense"
            id={`${id}-relativa`}
            label="Relativa"
            type="text"
            variant="standard"
            value={data[`${id}-relativa`] || ''}
            onChange={(e) => handleChange(e, index, 'relativa')}
            inputRef={(el) => (fieldRefs.current[index] = el)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            style={{ marginRight: '10px' }}
          />
          <TextField
            margin="dense"
            id={`${id}-absoluta`}
            label="Absoluta"
            type="text"
            variant="standard"
            value={data[`${id}-absoluta`] || ''}
            onChange={(e) => handleChange(e, index, 'absoluta')}
            inputRef={(el) => (fieldRefs.current[index + labels.length] = el)}
            onKeyDown={(event) => handleKeyDown(event, index + labels.length)}
          />
        </Box>
      );
    })}
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
  const [tipoCelulas, setTipoCelulas] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentData, setPaymentData] = useState({
    importe: '',
    medioPago: '',
    observaciones: ''
  });

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
    const fetchTipoCelulas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tipos-celula`);
        setTipoCelulas(response.data.result);
      } catch (error) {
        console.error('Error fetching tipo celulas:', error);
      }
    };

    fetchData();
    fetchEstados();
    fetchTipoCelulas();
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
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProtocoloId(null);
    setPendingState();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = async () => {
    try {

      const convertToNumberOrNull = (value) => {
        const number = parseFloat(value);
        return isNaN(number) ? null : number;
      };

      const addHemograma = {
        id_protocolo: selectedProtocoloId,
        recuento_globulos_rojos: convertToNumberOrNull(hemogramaData['recuento-globulos-rojos']),
        hemoglobina: convertToNumberOrNull(hemogramaData['hemoglobina']),
        hematocrito: convertToNumberOrNull(hemogramaData['hematocrito']),
        vcm: convertToNumberOrNull(hemogramaData['vcm']),
        hcm: convertToNumberOrNull(hemogramaData['hcm']),
        chcm: convertToNumberOrNull(hemogramaData['chcm']),
        rdw: convertToNumberOrNull(hemogramaData['rdw']),
        indice_reticulocitario: convertToNumberOrNull(hemogramaData['indice-reticulocitario']),
        recuento_plaquetario: convertToNumberOrNull(hemogramaData['recuento-plaquetario']),
        frotis: hemogramaData['frotis'] || null,
        recuento_leucocitario: convertToNumberOrNull(hemogramaData['recuento-leucocitario'])
      };
      const addBioquimica = {
        id_protocolo: selectedProtocoloId,
        urea: convertToNumberOrNull(bioquimicaSanguineaData['urea']),
        creatinina: convertToNumberOrNull(bioquimicaSanguineaData['creatinina']),
        glucemia: convertToNumberOrNull(bioquimicaSanguineaData['glucemia']),
        gpt: convertToNumberOrNull(bioquimicaSanguineaData['gpt-(alt)']),
        got: convertToNumberOrNull(bioquimicaSanguineaData['got-(ast)']),
        fosfatasa_alcalina: convertToNumberOrNull(bioquimicaSanguineaData['fosfatasa-alcalina-serica-(fas)']),
        g_glutamil_transferasa: convertToNumberOrNull(bioquimicaSanguineaData['g-glutamil-transferasa-(ggt)']),
        proteinas_totales: convertToNumberOrNull(bioquimicaSanguineaData['proteinas-totales']),
        albumina: convertToNumberOrNull(bioquimicaSanguineaData['albumina']),
        globulinas: convertToNumberOrNull(bioquimicaSanguineaData['globulinas']),
        relacion_alb_glob: convertToNumberOrNull(bioquimicaSanguineaData['relacion-alb/glob']),
        bilirrubina_total: convertToNumberOrNull(bioquimicaSanguineaData['bilirrubina-total-(bt)']),
        bilirrubina_directa: convertToNumberOrNull(bioquimicaSanguineaData['bilirrubina-directa-(bd)']),
        bilirrubina_indirecta: convertToNumberOrNull(bioquimicaSanguineaData['bilirrubina-indirecta-(bi)']),
        amilasa: convertToNumberOrNull(bioquimicaSanguineaData['amilasa']),
        trigliceridos: convertToNumberOrNull(bioquimicaSanguineaData['trigliceridos-(tag)']),
        colesterol_total: convertToNumberOrNull(bioquimicaSanguineaData['colesterol-total-(col)']),
        creatinina_p_kinasa: convertToNumberOrNull(bioquimicaSanguineaData['creatinin-p-kinasa-(cpk)']),
        hdl_col: convertToNumberOrNull(bioquimicaSanguineaData['hdl-col']),
        ldl_col: convertToNumberOrNull(bioquimicaSanguineaData['ldl-col']),
        calcio_total: convertToNumberOrNull(bioquimicaSanguineaData['calcio-total-(ca)']),
        fosforo: convertToNumberOrNull(bioquimicaSanguineaData['fosforo-(p)']),
        sodio: convertToNumberOrNull(bioquimicaSanguineaData['sodio-(na)']),
        potasio: convertToNumberOrNull(bioquimicaSanguineaData['potasio-(k)']),
        cloro: convertToNumberOrNull(bioquimicaSanguineaData['cloro-(cl)']),
      };
      const addCoagulograma = {
        id_protocolo: selectedProtocoloId,
        tiempo_protrombina: convertToNumberOrNull(coagulogramaData['tiempo-de-protrombina--t.p']),
        tiempo_tromboplastina: convertToNumberOrNull(coagulogramaData['tiempo-de-tromboplastina-parcial-activado---kptt'])
      };

      const addFormulaL = tipoCelulas.map(tc => ({
        id_tipo_celula: tc.id_tipo,
        id_protocolo: selectedProtocoloId,
        relativa: convertToNumberOrNull(formulaLeucocitariaData[`${removeAccents(tc.tipo_celula.toLowerCase().replace(/ /g, '-'))}-relativa`]),
        absoluta: convertToNumberOrNull(formulaLeucocitariaData[`${removeAccents(tc.tipo_celula.toLowerCase().replace(/ /g, '-'))}-absoluta`])
      }));

      // Enviar los datos al backend
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hemogramas`, addHemograma);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea`, addBioquimica);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas`, addCoagulograma);
      for (const formula of addFormulaL) {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria`, formula);
      }

      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${selectedProtocoloId}`, { id_estado: 3 });

      console.log("Datos enviados:");
      console.log("Hemograma:", addHemograma);
      console.log("Bioquimica:", addBioquimica);
      console.log("Coagulograma:", addCoagulograma);
      console.log("Formula Leucocitaria:", addFormulaL);
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

  const setPendingState = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${selectedProtocoloId}`, { id_estado: 2 });
      // Actualizar la data después de cambiar el estado a "Pendiente"
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
      setData(response.data.result);
    } catch (error) {
      console.error('Error al cambiar el estado a Pendiente:', error);
    }
  };

  const handleHemogramaChange = (e) => {
    const id = removeAccents(e.target.id);
    setHemogramaData({ ...hemogramaData, [id]: e.target.value });
  };

  const handleFormulaLeucocitariaChange = (e, index, type) => {
    const { id, value } = e.target;
    const field = id.split('-').slice(0, -1).join('-');
    setFormulaLeucocitariaData((prevData) => ({
      ...prevData,
      [`${field}-${type}`]: value,
    }));
  };

  const handleBioquimicaSanguineaChange = (e) => {
    const id = removeAccents(e.target.id);
    setBioquimicaSanguineaData({ ...bioquimicaSanguineaData, [id]: e.target.value });
  };

  const handleCoagulogramaChange = (e) => {
    const id = removeAccents(e.target.id);
    setCoagulogramaData({ ...coagulogramaData, [id]: e.target.value });
  };

  const handleDownload = async (id_protocolo) => {
    try {
      // Obtener datos desde el backend
      const protocoloResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${id_protocolo}`);
      const hemogramaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${id_protocolo}`);
      const formulaLeucocitariaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${id_protocolo}`);
      const coagulogramaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${id_protocolo}`);
      const bioquimicaSanguineaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${id_protocolo}`);
      const profesionalResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profesionales/${protocoloResponse.data.result.id_profesional}`);
      const pacienteResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pacientes/${protocoloResponse.data.result.id_paciente}`);
  
      const protocolo = protocoloResponse.data.result;
      const hemograma = hemogramaResponse.data.result;
      const formulaLeucocitaria = Array.isArray(formulaLeucocitariaResponse.data.result) ? formulaLeucocitariaResponse.data.result : [formulaLeucocitariaResponse.data.result];
      const coagulograma = coagulogramaResponse.data.result;
      const bioquimicaSanguinea = bioquimicaSanguineaResponse.data.result;
      const profesional = profesionalResponse.data.result;
      const paciente = pacienteResponse.data.result;
  
      const doc = new jsPDF();
  
      // Logo
      const logoHeight = 25; // Alto deseado
      const logoWidth = logoHeight * (1761 / 642); // Ancho calculado para mantener la proporción
  
      doc.addImage(logoUrl, 'PNG', 14, 10, logoWidth, logoHeight);
  
      // Encabezado con datos del protocolo
      doc.setFontSize(12);
      let yPosition = 50; // Posición inicial debajo del logo
  
      doc.text(`Número de Protocolo: ${protocolo.id_protocolo || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Fecha: ${protocolo.fecha || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Profesional Veterinaria: ${profesional.nombre || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Tutor: ${paciente.tutor || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Paciente: ${paciente.nombre || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Especie: ${paciente.especie || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Raza: ${paciente.raza || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Sexo: ${paciente.sexo || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Edad: ${paciente.edad || ''}`, 14, yPosition);
      yPosition += 10;
      doc.text(`Estudio Solicitado: ${protocolo.estudio_solicitado || ''}`, 14, yPosition);
      yPosition += 20; // Espacio adicional antes del título
  
      // Título
      doc.setFontSize(16);
      doc.text("Informe de Laboratorio", 14, yPosition);
      yPosition += 10;
  
      // Tabla de Hemograma
      doc.setFontSize(12);
      doc.text("Hemograma", 14, yPosition);
      const hemogramaColumnas = ["Parámetro", "Resultado", "Unidad"];
      const hemogramaFilas = [
        ["Recuento Glóbulos Rojos", hemograma.recuento_globulos_rojos || '', "M/ul"],
        ["Hemoglobina", hemograma.hemoglobina || '', "g/dl"],
        ["Hematocrito", hemograma.hematocrito || '', "%"],
        ["VCM", hemograma.vcm || '', "fL"],
        ["HCM", hemograma.hcm || '', "pg"],
        ["CHCM", hemograma.chcm || '', "%"],
        ["RDW", hemograma.rdw || '', "%"],
        ["Índice Reticulocitario", hemograma.indice_reticulocitario || '', "-"],
        ["Recuento Plaquetario", hemograma.recuento_plaquetario || '', "K/ul"],
        ["Frotis", hemograma.frotis || '', ""],
        ["Recuento Leucocitario", hemograma.recuento_leucocitario || '', "K/ul"]
      ];
      doc.autoTable({
        head: [hemogramaColumnas],
        body: hemogramaFilas,
        startY: yPosition + 10
      });
  
      // Mapeo de id_tipo_celula a nombres de tipo de célula
      const tipoCelulasMap = tipoCelulas.reduce((map, tipo) => {
        map[tipo.id_tipo] = tipo.tipo_celula;
        return map;
      }, {});
  
      // Tabla de Fórmula Leucocitaria
      doc.text("Fórmula Leucocitaria", 14, doc.autoTable.previous.finalY + 10);
      const formulaLeucocitariaColumnas = ["Tipo de Célula", "Relativa", "Absoluta"];
      const formulaLeucocitariaFilas = formulaLeucocitaria.map((item) => [
        tipoCelulasMap[item.id_tipo_celula] || item.id_tipo_celula,
        item.relativa || '',
        item.absoluta || ''
      ]);
      doc.autoTable({
        head: [formulaLeucocitariaColumnas],
        body: formulaLeucocitariaFilas,
        startY: doc.autoTable.previous.finalY + 20
      });
  
      // Tabla de Bioquímica Sanguínea
      doc.text("Bioquímica Sanguínea", 14, doc.autoTable.previous.finalY + 10);
      const bioquimicaColumnas = ["Parámetro", "Resultado", "Unidad"];
      const bioquimicaFilas = [
        ["Urea", bioquimicaSanguinea.urea || '', "mg/dl"],
        ["Creatinina", bioquimicaSanguinea.creatinina || '', "mg/dl"],
        ["Glucemia", bioquimicaSanguinea.glucemia || '', "mg/dl"],
        ["GPT (ALT)", bioquimicaSanguinea.gpt || '', "U/L"],
        ["GOT (AST)", bioquimicaSanguinea.got || '', "U/L"],
        ["Fosfatasa Alcalina Sérica (FAS)", bioquimicaSanguinea.fosfatasa_alcalina || '', "U/L"],
        ["g-glutamil transferasa (GGT)", bioquimicaSanguinea.g_glutamil_transferasa || '', "U/L"],
        ["Proteínas Totales", bioquimicaSanguinea.proteinas_totales || '', "g/dl"],
        ["Albúmina", bioquimicaSanguinea.albumina || '', "g/dl"],
        ["Globulinas", bioquimicaSanguinea.globulinas || '', "g/dl"],
        ["Relación Alb/Glob", bioquimicaSanguinea.relacion_alb_glob || '', ""],
        ["Bilirrubina Total (BT)", bioquimicaSanguinea.bilirrubina_total || '', "mg/dl"],
        ["Bilirrubina Directa (BD)", bioquimicaSanguinea.bilirrubina_directa || '', "mg/dl"],
        ["Bilirrubina Indirecta (BI)", bioquimicaSanguinea.bilirrubina_indirecta || '', "mg/dl"],
        ["Amilasa", bioquimicaSanguinea.amilasa || '', "U/L"],
        ["Triglicéridos (TAG)", bioquimicaSanguinea.trigliceridos || '', "mg/dl"],
        ["Colesterol Total (COL)", bioquimicaSanguinea.colesterol_total || '', "mg/dl"],
        ["Creatinin-P-Kinasa (CPK)", bioquimicaSanguinea.creatinina_p_kinasa || '', "U/L"],
        ["HDL-Col", bioquimicaSanguinea.hdl_col || '', "mg/dl"],
        ["LDL-Col", bioquimicaSanguinea.ldl_col || '', "mg/dl"],
        ["Calcio Total (Ca)", bioquimicaSanguinea.calcio_total || '', "mg/dl"],
        ["Fósforo (P)", bioquimicaSanguinea.fosforo || '', "mg/dl"],
        ["Sodio (Na)", bioquimicaSanguinea.sodio || '', "mmol/L"],
        ["Potasio (K)", bioquimicaSanguinea.potasio || '', "mmol/L"],
        ["Cloro (Cl)", bioquimicaSanguinea.cloro || '', "mmol/L"]
      ];
      doc.autoTable({
        head: [bioquimicaColumnas],
        body: bioquimicaFilas,
        startY: doc.autoTable.previous.finalY + 20
      });
  
      // Guardar el PDF
      doc.save(`informe_protocolo_${id_protocolo}.pdf`);
  
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const handleDelete = async (id_protocolo) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este protocolo?");
    if (confirmDelete) {
      try {
        // Eliminar el registro principal en la tabla protocolos
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${id_protocolo}`);
  
        // Actualizar el estado de los datos en el frontend
        setData((prevData) => prevData.filter((item) => item.id_protocolo !== id_protocolo));
  
        // Mostrar mensaje de éxito
        alert('Protocolo eliminado correctamente');
      } catch (error) {
        // Manejo de errores
        if (error.response) {
          console.error('Error en la respuesta del servidor:', error.response.data);
          alert(`Error al eliminar el protocolo: ${error.response.data.error || error.response.data.message}`);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
          alert('No se recibió respuesta del servidor. Verifica tu conexión a internet.');
        } else {
          console.error('Error al configurar la solicitud:', error.message);
          alert('Error al configurar la solicitud. Inténtalo de nuevo.');
        }
      }
    }
    handleCloseMenu();
  };

  const handleOpenPaymentDialog = (id_protocolo) => {
    setSelectedProtocoloId(id_protocolo);
    setOpenPaymentDialog(true);
    handleCloseMenu();
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setPaymentData({
      importe: '',
      medioPago: '',
      observaciones: ''
    });
  };

  const handleSavePayment = async () => {
    try {
      const paymentDetails = {
        id_protocolo: selectedProtocoloId,
        importe: parseFloat(paymentData.importe),
        medio_pago: paymentData.medioPago,
        observaciones: paymentData.observaciones
      };

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/pagos`, paymentDetails);

      alert('Pago acreditado correctamente');
      handleClosePaymentDialog();
    } catch (error) {
      console.error('Error al acreditar el pago:', error);
      alert('Error al acreditar el pago');
    }
  };

  const renderFormContent = (step) => {
    switch (step) {
      case 0:
        return <TextFieldGroup labels={['Recuento Glóbulos Rojos', 'Hemoglobina', 'Hematocrito', 'VCM', 'HCM', 'CHCM', 'RDW', 'Índice Reticulocitario', 'Recuento Plaquetario', 'Frotis', 'Recuento Leucocitario']} data={hemogramaData} handleChange={handleHemogramaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
      case 1:
        return tipoCelulas.length > 0 ? (
          <TextFieldGroupWithRelAbs 
            labels={tipoCelulas.map(tc => tc.tipo_celula)} 
            data={formulaLeucocitariaData} 
            handleChange={handleFormulaLeucocitariaChange} 
            fieldRefs={fieldRefs} 
            handleKeyDown={handleKeyDown} 
          />
        ) : (
          <p>Cargando tipos de células...</p>
        );
      case 2:
        return <TextFieldGroup labels={['Urea', 'Creatinina', 'Glucemia', 'GPT (ALT)', 'GOT (AST)', 'Fosfatasa Alcalina Sérica (FAS)', 'g-glutamil transferasa (GGT)', 'Proteínas Totales', 'Albúmina', 'Globulinas', 'Relación Alb/Glob', 'Bilirrubina Total (BT)', 'Bilirrubina Directa (BD)', 'Bilirrubina Indirecta (BI)', 'Amilasa', 'Triglicéridos (TAG)', 'Colesterol Total (COL)', 'Creatinin-P-Kinasa (CPK)', 'HDL-Col', 'LDL-Col', 'Calcio Total (Ca)', 'Fósforo (P)', 'Sodio (Na)', 'Potasio (K)', 'Cloro (Cl)']} data={bioquimicaSanguineaData} handleChange={handleBioquimicaSanguineaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} />;
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
          <strong>Análisis Completados:</strong> <span style={{ color: "green" }}>X</span>
        </Box>
        <Box>
          <strong>Análisis Pendientes:</strong> <span style={{ color: "orange" }}>Y</span>
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
                  importeColor = 'rgb(91, 189, 91)';
                } else if (row.importe > 0 && row.importe < precioEstudio) {
                  importeColor = 'rgb(248, 248, 108)'; 
                } else if (row.importe === 0) {
                  importeColor = 'rgb(243, 71, 71)'; 
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
                          <MenuItem onClick={() => handleOpenPaymentDialog(selectedProtocoloId)}>Acreditar Pago</MenuItem>
                          <MenuItem onClick={() => handleOpenDialog(selectedProtocoloId)}>Editar</MenuItem>
                          <MenuItem onClick={() => handleDownload(selectedProtocoloId)}>Descargar</MenuItem>                          
                          <MenuItem onClick={() => handleDelete(selectedProtocoloId)}>Eliminar</MenuItem>
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

      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Acreditar Pago para Protocolo N° ({selectedProtocoloId})</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="importe"
            label="Importe"
            type="number"
            fullWidth
            variant="standard"
            value={paymentData.importe}
            onChange={(e) => setPaymentData({ ...paymentData, importe: e.target.value })}
          />
          <TextField
            margin="dense"
            id="medioPago"
            label="Medio de Pago"
            select
            fullWidth
            variant="standard"
            value={paymentData.medioPago}
            onChange={(e) => setPaymentData({ ...paymentData, medioPago: e.target.value })}
          >
            <MenuItem value="Efectivo">Efectivo</MenuItem>
            <MenuItem value="MercadoPago">MercadoPago</MenuItem>
            <MenuItem value="Transferencia Bancaria">Transferencia Bancaria</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="observaciones"
            label="Observaciones"
            type="text"
            fullWidth
            variant="standard"
            value={paymentData.observaciones}
            onChange={(e) => setPaymentData({ ...paymentData, observaciones: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSavePayment} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TablaRegistros;