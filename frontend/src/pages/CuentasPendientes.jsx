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
  DialogContentText,
  TablePagination,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoUrl from '../assets/logo.png';
import firmaUrl from '../assets/firma.png';
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
  3: 'Saldado'
};

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const TextFieldGroup = ({ labels, data, handleChange, fieldRefs, handleKeyDown, disabled }) => (
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
          disabled={disabled}
        />
      );
    })}
  </div>
);

const TextFieldGroupWithRelAbs = ({ labels, data, handleChange, handleObservacionesChange, fieldRefs, handleKeyDown, disabled }) => (
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
            disabled={disabled}
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
            disabled={disabled}
          />
        </Box>
      );
    })}
    <TextField
      margin="dense"
      id="observaciones"
      label="Observaciones"
      type="text"
      fullWidth
      variant="standard"
      value={data['observaciones'] || ''}
      onChange={handleObservacionesChange}
      disabled={disabled}
    />
  </div>
);

const CuentasPendientes = () => {
  const [page, setPage] = useState(0);
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
  const [completados, setCompletados] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

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

        // Calcular los valores de saldados y pendientes
        const saldadosCount = response.data.result.filter((item) => {
          const precioEstudio = item.Estudio.Precios[0].precio;
          return determinarEstado(item.importe, precioEstudio) === 'Saldado';
        }).length;

        const pendientesCount = response.data.result.filter((item) => {
          const precioEstudio = item.Estudio.Precios[0].precio;
          return determinarEstado(item.importe, precioEstudio) === 'Pendiente';
        }).length;

        setCompletados(saldadosCount);
        setPendientes(pendientesCount);
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
 
useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profesionales`);
        setProfesionales(response.data.result);
      } catch (error) {
        console.error('Error fetching profesionales:', error);
      }
    };

    fetchProfesionales();
  }, []);
 
  const handleNumeroProtocoloChange = (e) => {setNumeroProtocolo(e.target.value); console.log(e.target.value)};

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const handleFinalize = async () => {
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
        recuento_leucocitario: convertToNumberOrNull(hemogramaData['recuento-leucocitario']),
        caracteristicas_serie_eritroide: hemogramaData['caracteristicas-serie-eritroide'] || null,
        observaciones: hemogramaData['observaciones'] || null,
        morfologia_plaquetaria: hemogramaData['morfologia-plaquetaria'] || null
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
        observaciones: bioquimicaSanguineaData['observaciones'] || null
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
        absoluta: convertToNumberOrNull(formulaLeucocitariaData[`${removeAccents(tc.tipo_celula.toLowerCase().replace(/ /g, '-'))}-absoluta`]),
        observaciones: formulaLeucocitariaData['observaciones'] || null
      }));

      // Verificar si los datos ya existen
      const hemogramaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const bioquimicaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const coagulogramaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const formulaLeucocitariaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
  
      // Actualizar o crear registros según corresponda
      if (hemogramaExists && hemogramaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${selectedProtocoloId}`, addHemograma);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hemogramas`, addHemograma);
      }
  
      if (bioquimicaExists && bioquimicaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${selectedProtocoloId}`, addBioquimica);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea`, addBioquimica);
      }
  
      if (coagulogramaExists && coagulogramaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${selectedProtocoloId}`, addCoagulograma);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas`, addCoagulograma);
      }

      if (formulaLeucocitariaExists && formulaLeucocitariaExists.data.result.length > 0) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${selectedProtocoloId}`, addFormulaL);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria`, addFormulaL);
      }
      
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${selectedProtocoloId}`, { id_estado: 3 });
  
      alert('Protocolo finalizado correctamente, YA NO PODRÁ EDITARLO');
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
      setData(response.data.result);
      setprotocoloEstado();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos');
    }
  };

  const determinarEstado = (importe, precioEstudio) => {
    return importe === precioEstudio ? 'Saldado' : 'Pendiente';
  };
  
  const handleFiltroClick = async () => {
    console.log("Aplicando filtro con profesional (ID):", profesionalSeleccionado);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos/go/search`, {
        params: {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          id_protocolo: numeroProtocolo,
          id_profesional: profesionalSeleccionado ? Number(profesionalSeleccionado) : null,
        }
      });
  
      let filteredData = response.data.result;
      console.log("Datos recibidos:", filteredData);
  
      // Filtrar en frontend en caso de que el backend no lo haga correctamente
      if (profesionalSeleccionado) {
        filteredData = filteredData.filter(item => Number(item.id_profesional) === Number(profesionalSeleccionado));
      }
      
      // Filtrar por estado determinado por el importe y el precio del estudio
      if (estado) {
        filteredData = filteredData.filter(item => {
          const precioEstudio = item.Estudio.Precios[0].precio;
          const estadoCalculado = determinarEstado(item.importe, precioEstudio);
          
          if (estado === '3') {
            return estadoCalculado === 'Saldado';
          } else if (estado === '2') {
            return estadoCalculado === 'Pendiente';
          } else {
            return estadoCalculado === 'Pendiente';
          }
        });
      }
  
      setData(filteredData);
      console.log("Datos filtrados:", filteredData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  
  const handleLimpiarFiltros = async () => {
    setFechaInicio('');
    setFechaFin('');
    setEstado('');
    setNumeroProtocolo('');
    setProfesionalSeleccionado('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleClick = (event, id_protocolo, id_estado) => {
    setSelectedProtocoloId(id_protocolo);
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  
  const handleOpenDialog = async (id_protocolo) => {
    try {
      const protocoloResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${id_protocolo}`);
      const protocolo = protocoloResponse.data.result;
      const precioEstudio = protocolo.Estudio.Precios[0].precio;
      const estadoCalculado = determinarEstado(protocolo.importe, precioEstudio);
      setEstado(estadoCalculado === 'Saldado' ? '3' : '2');
      let hemogramaResponse = {};
      let formulaLeucocitariaResponse = {};
      let bioquimicaSanguineaResponse = {};
      let coagulogramaResponse = {};
      let formulaLeucocitariaFront = {};
      let coagulogramaFront = {};
      
      if(estado === 3 || estado === 2){
        hemogramaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${id_protocolo}`);
        formulaLeucocitariaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${id_protocolo}`);
        bioquimicaSanguineaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${id_protocolo}`);
        coagulogramaResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${id_protocolo}`);
      
        coagulogramaFront = {
          "tiempo-de-protrombina--t.p": coagulogramaResponse.data.result.tiempo_protrombina,
          "tiempo-de-tromboplastina-parcial-activado---kptt":coagulogramaResponse.data.result.tiempo_tromboplastina
        }

        
        if(formulaLeucocitariaResponse.data.result.length > 0){
          formulaLeucocitariaResponse.data.result.forEach((item) => {
            const tipoCelula = tipoCelulas.find(tc => tc.id_tipo === item.id_tipo_celula);
            if (tipoCelula) {
              const id = removeAccents(tipoCelula.tipo_celula.toLowerCase().replace(/ /g, '-'));
              formulaLeucocitariaFront[`${id}-relativa`] = item.relativa;
              formulaLeucocitariaFront[`${id}-absoluta`] = item.absoluta === 0? '0' : item.absoluta;
            }
          })
          formulaLeucocitariaFront['observaciones'] = formulaLeucocitariaResponse.data.result[0]?.observaciones || '';
        }else{
          formulaLeucocitariaFront['observaciones'] = '';
          tipoCelulas.forEach((tc) => {
            const id = removeAccents(tc.tipo_celula.toLowerCase().replace(/ /g, '-'));
            formulaLeucocitariaFront[`${id}-relativa`] = '';
            formulaLeucocitariaFront[`${id}-absoluta`] = '';
          });
        }
     
        setHemogramaData({
          "recuento-globulos-rojos": hemogramaResponse.data.result?hemogramaResponse.data.result.recuento_globulos_rojos : null,
          "hemoglobina": hemogramaResponse.data.result? hemogramaResponse.data.result.hemoglobina : null,
          "hematocrito": hemogramaResponse.data.result? hemogramaResponse.data.result.hematocrito : null,
          "vcm": hemogramaResponse.data.result? hemogramaResponse.data.result.vcm : null,
          "hcm": hemogramaResponse.data.result? hemogramaResponse.data.result.hcm : null,
          "chcm": hemogramaResponse.data.result? hemogramaResponse.data.result.chcm : null,
          "rdw": hemogramaResponse.data.result? hemogramaResponse.data.result.rdw : null,
          "indice-reticulocitario": hemogramaResponse.data.result? hemogramaResponse.data.result.indice_reticulocitario : null,
          "recuento-plaquetario": hemogramaResponse.data.result? hemogramaResponse.data.result.recuento_plaquetario : null,
          "frotis": hemogramaResponse.data.result? hemogramaResponse.data.result.frotis : null,
          "recuento-leucocitario": hemogramaResponse.data.result? hemogramaResponse.data.result.recuento_leucocitario : null,
          "caracteristicas-serie-eritroide": hemogramaResponse.data.result? hemogramaResponse.data.result.caracteristicas_serie_eritroide : null,
          "observaciones": hemogramaResponse.data.result? hemogramaResponse.data.result.observaciones : null,
          "morfologia-plaquetaria": hemogramaResponse.data.result? hemogramaResponse.data.result.morfologia_plaquetaria : null
        });

        setFormulaLeucocitariaData(formulaLeucocitariaFront);

        setBioquimicaSanguineaData({
          "urea": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.urea : null,
          "creatinina": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.creatinina : null,
          "glucemia": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.glucemia : null,
          "gpt-(alt)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.gpt : null,
          "got-(ast)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.got : null,
          "fosfatasa-alcalina-serica-(fas)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.fosfatasa_alcalina : null,
          "g-glutamil-transferasa-(ggt)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.g_glutamil_transferasa : null,
          "proteinas-totales": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.proteinas_totales : null,
          "albumina": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.albumina : null,
          "globulinas": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.globulinas : null,
          "relacion-alb/glob": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.relacion_alb_glob : null,
          "bilirrubina-total-(bt)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.bilirrubina_total : null,
          "bilirrubina-directa-(bd)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.bilirrubina_directa : null,
          "bilirrubina-indirecta-(bi)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.bilirrubina_indirecta : null,
          "amilasa": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.amilasa : null,
          "trigliceridos-(tag)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.trigliceridos : null,
          "colesterol-total-(col)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.colesterol_total : null,
          "creatinin-p-kinasa-(cpk)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.creatinina_p_kinasa : null,
          "hdl-col": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.hdl_col : null,
          "ldl-col": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.ldl_col : null,
          "calcio-total-(ca)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.calcio_total : null,
          "fosforo-(p)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.fosforo : null,
          "sodio-(na)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.sodio : null,
          "potasio-(k)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.potasio : null,
          "cloro-(cl)": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.cloro : null,
          "observaciones": bioquimicaSanguineaResponse.data.result?bioquimicaSanguineaResponse.data.result.observaciones : null
        });

        if(coagulogramaResponse){setCoagulogramaData(coagulogramaFront)}
          else{
            setCoagulogramaData({
              "tiempo-de-protrombina--t.p": null,
              "tiempo-de-tromboplastina-parcial-activado---kptt": null
            });
          }
      }else{
        setHemogramaData({
          "recuento-globulos-rojos": null,
          "hemoglobina": null,
          "hematocrito": null,
          "vcm": null,
          "hcm": null,
          "chcm": null,
          "rdw": null,
          "indice-reticulocitario": null,
          "recuento-plaquetario": null,
          "frotis": null,
          "recuento-leucocitario": null,
          "caracteristicas-serie-eritroide": null,
          "observaciones": null,
          "morfologia-plaquetaria": null
        });
        setFormulaLeucocitariaData({
          "observaciones": ''
        });
        setBioquimicaSanguineaData({
          "urea": null,
          "creatinina": null,
          "glucemia": null,
          "gpt-(alt)": null,
          "got-(ast)": null,
          "fosfatasa-alcalina-serica-(fas)": null,
          "g-glutamil-transferasa-(ggt)": null,
          "proteinas-totales": null,
          "albumina": null,
          "globulinas": null,
          "relacion-alb/glob": null,
          "bilirrubina-total-(bt)": null,
          "bilirrubina-directa-(bd)": null,
          "bilirrubina-indirecta-(bi)": null,
          "amilasa": null,
          "trigliceridos-(tag)": null,
          "colesterol-total-(col)": null,
          "creatinin-p-kinasa-(cpk)": null,
          "hdl-col": null,
          "ldl-col": null,
          "calcio-total-(ca)": null,
          "fosforo-(p)": null,
          "sodio-(na)": null,
          "potasio-(k)": null,
          "cloro-(cl)": null,
          "observaciones": ''
        });
        setCoagulogramaData({
          "tiempo-de-protrombina--t.p": null,
          "tiempo-de-tromboplastina-parcial-activado---kptt": null
        });
      }
 
      setSelectedProtocoloId(id_protocolo);
      setOpenDialog(true);
      handleCloseMenu();
    } catch (error) {
      console.error('Error al cargar los datos del protocolo:', error);
    }
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
        recuento_leucocitario: convertToNumberOrNull(hemogramaData['recuento-leucocitario']),
        caracteristicas_serie_eritroide: hemogramaData['caracteristicas-serie-eritroide'] || null,
        observaciones: hemogramaData['observaciones'] || null,
        morfologia_plaquetaria: hemogramaData['morfologia-plaquetaria'] || null
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
        observaciones: bioquimicaSanguineaData['observaciones'] || null
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
        absoluta: convertToNumberOrNull(formulaLeucocitariaData[`${removeAccents(tc.tipo_celula.toLowerCase().replace(/ /g, '-'))}-absoluta`]),
        observaciones: formulaLeucocitariaData['observaciones'] || null
      }));

      // Verificar si los datos ya existen
      const hemogramaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const bioquimicaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const coagulogramaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
      const formulaLeucocitariaExists = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${selectedProtocoloId}`).catch(error => {
        if (error.response && error.response.status === 404) return null;
        throw error;
      });
  
      // Actualizar o crear registros según corresponda
      if (hemogramaExists && hemogramaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/hemogramas/${selectedProtocoloId}`, addHemograma);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hemogramas`, addHemograma);
      }
  
      if (bioquimicaExists && bioquimicaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea/${selectedProtocoloId}`, addBioquimica);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bioquimica-sanguinea`, addBioquimica);
      }
  
      if (coagulogramaExists && coagulogramaExists.data.result) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas/${selectedProtocoloId}`, addCoagulograma);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/coagulogramas`, addCoagulograma);
      }

      if (formulaLeucocitariaExists && formulaLeucocitariaExists.data.result.length > 0) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria/${selectedProtocoloId}`, addFormulaL);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/formula-leucocitaria`, addFormulaL);
      }
      
      setPendingState();
      setprotocoloEstado();

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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
      setData(response.data.result);
    } catch (error) {
      console.error('Error al cambiar el estado a Pendiente:', error);
    }
  };

  const setprotocoloEstado = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos/${selectedProtocoloId}`);
      setEstado(response.data.result.id_estado);
    } catch (error) {
      console.error('Error al obtener el estado del protocolo:', error);
      return null;
    }
  }
  
  const handleHemogramaChange = (e) => {
    const id = removeAccents(e.target.id);
    setHemogramaData({ ...hemogramaData, [id]: e.target.value });
  };

  const handleFormulaLeucocitariaChange = (e, index, type) => {
    const { id, value } = e.target;
    const field = id.split('-').slice(0, -1).join('-');
    setFormulaLeucocitariaData((prevData) => ({
      ...prevData,
      [`${field}-${type}`]: value
    }));
  };

  const handleObservacionesChange = (e) => {
    const { value } = e.target;
    setFormulaLeucocitariaData((prevData) => ({
      ...prevData,
      observaciones: value,
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
      const formulaLeucocitaria = Array.isArray(formulaLeucocitariaResponse.data.result) 
        ? formulaLeucocitariaResponse.data.result 
        : [formulaLeucocitariaResponse.data.result];
      const coagulograma = coagulogramaResponse.data.result;
      const bioquimicaSanguinea = bioquimicaSanguineaResponse.data.result;
      const profesional = profesionalResponse.data.result;
      const paciente = pacienteResponse.data.result;
      
      // Obtener nombres reales de especie, raza y sexo
      const especiesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/especies`);
      const especieEncontrada = especiesResponse.data.result.find(e => e.id_especie === paciente.id_especie);
      const especie = especieEncontrada ? especieEncontrada.tipo : "No disponible";

      const razasResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/razas`);
      const razaEncontrada = razasResponse.data.result.find(r => r.id_raza === paciente.id_raza);
      const raza = razaEncontrada ? razaEncontrada.nombre : "No disponible";

      const sexosResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/generos`);
      const sexoEncontrado = sexosResponse.data.result.find(s => s.id_sexo === paciente.id_sexo);
      const sexo = sexoEncontrado ? sexoEncontrado.sexo : "No disponible";

      const estudioResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/estudios/${protocolo.id_estudio}`);

      const estudioSolicitado = estudioResponse.data.result.estudio || "No disponible";

      const doc = new jsPDF();

      // Logo
      const logoHeight = 25; // Alto deseado
      const logoWidth = logoHeight * (1761 / 642); // Ancho calculado para mantener la proporción
      const logoX = 14; // Posición en X del logo
      const logoY = 10; // Posición en Y del logo
      doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);

      // Configurar fuente y tamaño antes del texto
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      const textX = logoX + logoWidth + 110; // Ajusta la posición en X
      const textY = logoY + 6; // Alineado con el logo

      // Asegurar alineación manualmente
      const maxWidth = 80; // Ancho máximo para la alineación izquierda
      doc.text("Rivadavia 1626  -   CP 6700", textX, textY, { align: "right", maxWidth });
      doc.text("Bs. As. -  Luján", textX, textY + 5, { align: "right", maxWidth });
      doc.text("Tel : (02323) 15461414", textX, textY + 10, { align: "right", maxWidth });
    
      // Encabezado con datos del protocolo
      doc.autoTable({
        startY: 36,
        theme: 'grid',
        styles: { halign: 'left', fontSize: 9 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontSize: 9 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } },
        head: [
          ['', '']],
        body: [
        ['Número de Protocolo', protocolo.id_protocolo || ''],
        ['Fecha', protocolo.fecha || ''],
        ['Profesional Veterinario', profesional.nombre || ''],
        ['Tutor', paciente.tutor || ''],
        ['Estudio Solicitado', estudioSolicitado || '']]
      });

      // Posición X para la segunda tabla (ajusta el valor según el ancho de la primera tabla)
      const posicionX = 120;

      doc.autoTable({
        startY: 36,
        theme: 'grid',
        styles: { halign: 'left', fontSize: 9 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontSize: 9 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } },
        margin: { left: posicionX }, // Mueve la tabla hacia la derecha
        head: [
          ['', '']],
        body: [
        ['Paciente', paciente.nombre || ''],
        ['Especie', especie || ''],
        ['Raza', raza || ''],
        ['Sexo', sexo || ''],
        ['Edad', paciente.edad || '']]
      });      
      
      // Función para generar tablas con estilo
      const generarTabla = (titulo, columnas, filas) => {
        doc.setFont("helvetica", "bold");
        doc.text(titulo, 14, doc.autoTable.previous.finalY + 12);
        doc.autoTable({
          startY: doc.autoTable.previous.finalY + 16,
          theme: 'grid',
          styles: { fontSize: 9, cellPadding: 1.37 },
          columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center' }, 5: { halign: 'center' }, 6: { halign: 'center' } },
          headStyles: { fillColor: [0, 168, 89], textColor: 255, fontSize: 9 },
          head: [columnas],
          body: filas
        });
      };

      // Tabla de Hemograma
      generarTabla("Hemograma", ["Determinación", "Resultado", "Unidad", "    Valores de referencia\n              (Caninos)", "    Valores de referencia\n              (Felinos)"], [
        ["Recuento Glóbulos Rojos", hemograma.recuento_globulos_rojos || '', "M/ul", "5.5 - 8", "5 - 10"],
        ["Hemoglobina", hemograma.hemoglobina || '', "g/dl", "12 - 19", "9 - 15"],
        ["Hematocrito", hemograma.hematocrito || '', "%", "37 - 55", "27 - 48"],
        ["VCM", hemograma.vcm || '', "fL", "60 - 79", "40 - 55"],
        ["HCM", hemograma.hcm || '', "pg", "19 - 25", "12 - 18"],
        ["CHCM", hemograma.chcm || '', "%", "31 - 36", "29 - 36"],
        ["RDW", hemograma.rdw || '', "%", "12 - 16", "14 - 18"],
        ["Índice Reticulocitario", hemograma.indice_reticulocitario || '', "-", { content: ">2 Regenerativa\n<2 Arregenerativa", colSpan: 2 }], // Unir columnas,
        ["Recuento Plaquetario", hemograma.recuento_plaquetario || '', "K/ul", "180000 - 400000", "200000 - 500000"],
        ["Frotis", hemograma.frotis || '', "-", "-", "-"],
        ["Recuento Leucocitario", hemograma.recuento_leucocitario || '', "K/ul", "6000-13000", "5500 - 14000"]
      ]);
      
      // Observaciones - Hemograma
      doc.setFont("helvetica", "bold");
      doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.37 },
        columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'left', cellWidth: 133.82 } }, // Centrar solo la segunda columna
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontSize: 9 },
        body: [
          ["Características serie eritroide", hemograma.caracteristicas_serie_eritroide || "S/p"],
          ["Observaciones", hemograma.observaciones || "S/p"],
          ["Morfología plaquetaria", hemograma.morfologia_plaquetaria || "S/p"]
        ]
      });

      // Mapeo de id_tipo_celula a nombres de tipo de célula
      const tipoCelulasMap = tipoCelulas.reduce((map, tipo) => {
        map[tipo.id_tipo] = tipo.tipo_celula;
        return map;
      }, {});

      const referencias = [
        ["60 - 77%", "3000 - 11500", "35 - 75%", "2500 - 12500"],
        ["0 - 3%", "0 - 300", "0 - 3%", "0 - 300"],
        ["2 - 10%", "100 - 1000", "2 - 12%", "0 - 1000"],
        ["0 - 2%", "0 - 200", "0 - 12%", "0 - 200"],
        ["12 - 30%", "1000 - 4800", "20 - 55%", "1500 - 7000"],
        ["5 - 10%", "150 - 1200", "1 - 4%", "0 - 500"],
        ["-", "-", "-", "-"],
        ["-", "-", "-", "-"]
      ];

      // Tabla Fórmula Leucocitaria
      doc.setFont("helvetica", "bold");
      doc.text("Fórmula Leucocitaria", 14, doc.autoTable.previous.finalY + 12);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 16,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.37 },
        columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center' }, 5: { halign: 'center' }, 6: { halign: 'center' } },
        headStyles: { fillColor: [0, 168, 89], textColor: 255, fontSize: 9 },
        head: [["Tipo de Célula", "Relativa %", "Absoluta (/mm3)", "Referencias\n   Relativa\n  (Caninos)", "Referencias\n  Absoluta\n  (Caninos)", "Referencias\n    Relativa\n   (Felinos)", "Referencias\n  Absoluta\n  (Felinos)"]],
        body: formulaLeucocitaria.map((celula, index) => [
          tipoCelulasMap[celula.id_tipo_celula], 
          celula.relativa || '' , 
          celula.absoluta || '',
          referencias[index] ? referencias[index][0] : '',
          referencias[index] ? referencias[index][1] : '',
          referencias[index] ? referencias[index][2] : '',
          referencias[index] ? referencias[index][3] : ''
        ])
      });

      // Observaciones - Fórmula Leucocitaria
      doc.setFont("helvetica", "bold");
      doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.375 },
        columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'left', cellWidth: 140.52 } }, // Centrar solo la segunda columna
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontSize: 9 },
        body: [
          ["Observaciones", formulaLeucocitaria[0]?.observaciones || "S/p"], 
        ]
      });
      
      doc.addPage();

      // Tabla de Bioquímica Sanguínea
      doc.setFont("helvetica", "bold");
      doc.text("Bioquímica Sanguínea", 14, 20);
      doc.autoTable({
        startY: 20 + 4,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.37 },
        columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center' } },
        headStyles: { fillColor: [0, 168, 89], textColor: 255, fontSize: 9 },
        head: [["Determinación", "Resultado", "Unidad", "    Valores de referencia\n              (Caninos)", "    Valores de referencia\n              (Felinos)"]],
        body:  [
          ["Urea", bioquimicaSanguinea.urea || '', "mg/dl", "20 - 60", "20 - 60"],
          ["Creatinina", bioquimicaSanguinea.creatinina || '', "mg/dl", "Hasta 1.6", "Hasta 1.8"],
          ["Glucemia", bioquimicaSanguinea.glucemia || '', "mg/dl", "60 - 110", "60-180"],
          ["GPT (ALT)", bioquimicaSanguinea.gpt || '', "U/L", "Hasta 60", "Hasta 60"],
          ["GOT (AST)", bioquimicaSanguinea.got || '', "U/L", "Hasta 50", "Hasta 50"],
          ["Fosfatasa Alcalina Sérica (FAS)", bioquimicaSanguinea.fosfatasa_alcalina || '', "U/L", "Hasta 250 /Cach hasta 500", "Hasta 100"],
          ["g-glutamil transferasa (GGT)", bioquimicaSanguinea.g_glutamil_transferasa || '', "U/L", "Hasta 10", "Hasta 10"],
          ["Proteínas Totales", bioquimicaSanguinea.proteinas_totales || '', "g/dl", "5 - 7.5", "5.5 - 7.8"],
          ["Albúmina", bioquimicaSanguinea.albumina || '', "g/dl", "2.5 - 4", "2.5 - 3.5"],
          ["Globulinas", bioquimicaSanguinea.globulinas || '', "g/dl", "2.5 - 3.8", "3.0 - 4.0"],
          ["Relación Alb/Glob", bioquimicaSanguinea.relacion_alb_glob || '', "/", "0.6 - 1.2", "0.6 - 1.2"],
          ["Bilirrubina Total (BT)", bioquimicaSanguinea.bilirrubina_total || '', "mg/dl", "Hasta 1", "Hasta 1"],
          ["Bilirrubina Directa (BD)", bioquimicaSanguinea.bilirrubina_directa || '', "mg/dl", "Hasta 0.3", "Hasta 0.3"],
          ["Bilirrubina Indirecta (BI)", bioquimicaSanguinea.bilirrubina_indirecta || '', "mg/dl", "Hasta 0.7", "Hasta 0.7"],
          ["Amilasa", bioquimicaSanguinea.amilasa || '', "U/L", "Hasta 1500", "Hasta 1500"],
          ["Triglicéridos (TAG)", bioquimicaSanguinea.trigliceridos || '', "mg/dl", "50 - 100", "50 - 100"],
          ["Colesterol Total (COL)", bioquimicaSanguinea.colesterol_total || '', "mg/dl", "125 - 250", "125 - 250"],
          ["Creatinin-P-Kinasa (CPK)", bioquimicaSanguinea.creatinina_p_kinasa || '', "U/L", "Hasta 250", "Hasta 250"],
          ["HDL-Col", bioquimicaSanguinea.hdl_col || '', "mg/dl", "Mayor a 100", "Mayor a 100"],
          ["LDL-Col", bioquimicaSanguinea.ldl_col || '', "mg/dl", "Menor a 60", "Menor a 60"],
          ["Calcio Total (Ca)", bioquimicaSanguinea.calcio_total || '', "mg/dl", "8 - 12", "8 - 12"],
          ["Fósforo (P)", bioquimicaSanguinea.fosforo || '', "mg/dl", "2.1 - 5.6 / cach hasta 9.0", "2.1 - 5.6 / cach hasta 8.0"],
          ["Sodio (Na)", bioquimicaSanguinea.sodio || '', "mmol/L", "143 - 153", "143 - 153"],
          ["Potasio (K)", bioquimicaSanguinea.potasio || '', "mmol/L", "4 - 5,4", "4 - 5,4"],
          ["Cloro (Cl)", bioquimicaSanguinea.cloro || '', "mmol/L", "109 - 120", "109 - 120"]
        ]
      });  

      // Observaciones - Bioquímica Sanguínea
      doc.setFont("helvetica", "bold");
      doc.autoTable({
        startY: doc.autoTable.previous.finalY,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.37 },
        columnStyles: { 0: { fontStyle: 'bold' } , 1: { halign: 'left', cellWidth: 127.38 } }, // Centrar solo la segunda columna
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontSize: 9 },
        body: [
          ["Observaciones", bioquimicaSanguinea.observaciones || "S/p"],
        ]
      });      

      // Tabla de Coagulograma
      doc.setFont("helvetica", "bold");
      doc.text("Coagulograma", 14, doc.autoTable.previous.finalY + 12);
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 16,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 1.37 },
        columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' } },
        headStyles: { fillColor: [0, 168, 89], textColor: 255, fontSize: 9 },
        head: [["Determinación", "                  Resultado", "                  Referencia"]],
        body:  [
          ["Tiempo de Protrombina", coagulograma.tiempo_protrombina || '', "7 - 11 segundos"],
          ["Tiempo de Tromboplastina Parcial", coagulograma.tiempo_tromboplastina || '', "15 - 21 segundos"]
        ]
      });

      // Firma
      const firmaHeight = 25; // Alto deseado
      const firmaWidth = firmaHeight * (119 / 95); // Ancho calculado para mantener la proporción
      const firmaX = 153; // Posición en X de la firma
      const firmaY = 240; // Posición en Y de la firma
      doc.addImage(firmaUrl, 'PNG', firmaX, firmaY, firmaWidth, firmaHeight);

      //Aclaración
      doc.setFont("helvetica", "bold");
      doc.text("Cinthya Giselle Gallardo\nVETERINARIA - UBA\nM.P. 13612", 170, 270, { align: "center" });
      
      // Pie de página
      const pageCount = doc.getNumberOfPages(); // Obtiene el número total de páginas
      const pageWidth = doc.internal.pageSize.width; // Ancho de la página
      const emailText = "E-mail: diagnovete.lab@gmail.com";
      const emailX = (pageWidth - doc.getTextWidth(emailText)) / 2; // Centrar el texto

      // Recorre todas las páginas y agrega el pie de página
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i); // Ir a la página i
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

      // Agregar el email centrado
      doc.setTextColor(75, 75, 75); 
      doc.text(emailText, emailX, doc.internal.pageSize.height - 8);

      // Agregar el número de página alineado a la derecha
      doc.text(`${i}`, pageWidth - 15, doc.internal.pageSize.height - 8);
}
    
      // Guardar el PDF
      doc.save(`informe_protocolo_${id_protocolo}.pdf`);
    
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
    handleCloseMenu();
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

  const handleOpenPaymentDialog = async (id_protocolo) => {
    setSelectedProtocoloId(id_protocolo);
    setOpenPaymentDialog(true);
    handleCloseMenu();
  };

  const handleClosePaymentDialog = async() => {
    setOpenPaymentDialog(false);
    setPaymentData({
      importe: '',
      medioPago: '',
      observaciones: ''
    });
    // se actualizan los campos de la tabla
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/protocolos`);
    setData(response.data.result);
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

    const isDisabled = estado === 3;
    switch (step) {
      case 0:
        return <TextFieldGroup labels={['Recuento Glóbulos Rojos', 'Hemoglobina', 'Hematocrito', 'VCM', 'HCM', 'CHCM', 'RDW', 'Índice Reticulocitario', 'Recuento Plaquetario', 'Frotis', 'Recuento Leucocitario', 'Características serie eritroide', 'Observaciones', 'Morfología plaquetaria']} data={hemogramaData} handleChange={handleHemogramaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} disabled={isDisabled} />;
      case 1:
        return tipoCelulas.length > 0 ? (
          <TextFieldGroupWithRelAbs 
            labels={tipoCelulas.map(tc => tc.tipo_celula)} 
            data={formulaLeucocitariaData} 
            handleChange={handleFormulaLeucocitariaChange} 
            handleObservacionesChange={handleObservacionesChange}
            fieldRefs={fieldRefs} 
            handleKeyDown={handleKeyDown} 
            disabled={isDisabled}
          />
        ) : (
          <p>Cargando tipos de células...</p>
        );
      case 2:
        return <TextFieldGroup labels={['Urea', 'Creatinina', 'Glucemia', 'GPT (ALT)', 'GOT (AST)', 'Fosfatasa Alcalina Sérica (FAS)', 'g-glutamil transferasa (GGT)', 'Proteínas Totales', 'Albúmina', 'Globulinas', 'Relación Alb/Glob', 'Bilirrubina Total (BT)', 'Bilirrubina Directa (BD)', 'Bilirrubina Indirecta (BI)', 'Amilasa', 'Triglicéridos (TAG)', 'Colesterol Total (COL)', 'Creatinin-P-Kinasa (CPK)', 'HDL-Col', 'LDL-Col', 'Calcio Total (Ca)', 'Fósforo (P)', 'Sodio (Na)', 'Potasio (K)', 'Cloro (Cl)', 'Observaciones']} data={bioquimicaSanguineaData} handleChange={handleBioquimicaSanguineaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} disabled={isDisabled}/>;
      case 3:
        return <TextFieldGroup labels={['Tiempo de Protrombina- T.P', 'Tiempo de tromboplastina parcial activado - KPTT']} data={coagulogramaData} handleChange={handleCoagulogramaChange} fieldRefs={fieldRefs} handleKeyDown={handleKeyDown} disabled={isDisabled}/>;
      default:
        return 'Unknown step';
    }
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 90px)',
      minHeight: 'calc(100vh - 80px)',
      overflow: 'hidden', 
      '& .MuiTablePagination-selectLabel': {
        fontWeight: 'bold',
      }}}>
      {/* Encabezado con Totales */}
      <Box sx={{ flex: '0 0 auto' }}>
        <h1>Cuentas Pendientes</h1>
        <hr />
      </Box>
      {/* Filtros */}
      <Box display="flex"
        justifyContent="space-between"
        mb={2}
        mt={2}
        sx={{ flex: '0 0 auto', px: 2 }}>
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
      onChange={(e) => setEstado(e.target.value)}
      SelectProps={{
        native: true,
      }}
    >
      <option value="">
      </option>
      <option value="3">Saldado</option>
      <option value="2">Pendiente</option>
    </TextField>
    {/* Campo de Profesional */}
    <TextField
      select
      label="Profesional"
      value={profesionalSeleccionado}
      onChange={(e) => setProfesionalSeleccionado(e.target.value)}
      SelectProps={{
        native: true,
      }}
    >
      <option value="">
      </option>
      {profesionales.map((profesional) => (
        <option key={profesional.id_profesional} value={profesional.id_profesional}>
          {profesional.nombre}
        </option>
      ))}
    </TextField>
    {/* Campo de N° de Protocolo */}
    <TextField
      label="N° de Protocolo"
      value={numeroProtocolo}
      onChange={handleNumeroProtocoloChange}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleFiltroClick}
      sx={{ backgroundColor: 'rgb(35, 35, 35)', '&:hover': { backgroundColor: 'rgb(35, 35, 35)' } }}
    >
      Filtrar
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleLimpiarFiltros}
      sx={{ backgroundColor: 'rgb(35, 35, 35)', '&:hover': { backgroundColor: 'rgb(35, 35, 35)' } }}
    >
      Limpiar filtros
    </Button>
  </Box>
</Box>

      {/* Tabla */}
       <Box sx={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height:'calc(100vh - 320px)',
            }}>
      <TableContainer component={Paper}
      sx={{ height: '50vh', margin: '0 auto', display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader
        sx={{
          '& th': { fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #ccc' },
          '& td': { textAlign: 'center' },
          border: '1px solid #ccc',
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Número de Protocolo</TableCell>
              <TableCell>Emisión</TableCell>
              <TableCell>Profesional</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {data
     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
     .map((row, index) => {
      const precioEstudio = row.Estudio.Precios[0].precio;
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'ARS',
        }).format(amount);
      };
      const formattedDate = row.fecha.split('-').reverse().join('/');
      const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
      };

      const estadoCalculado = determinarEstado(row.importe, precioEstudio);

      return (
        <TableRow key={index}
        sx={{
          backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white', 
          '&:hover': {
            backgroundColor: '#e0f2f1'
          },
        }}>
          <TableCell>{estadoCalculado}</TableCell>
          <TableCell>{row.id_protocolo}</TableCell>
          <TableCell>{formattedDate}</TableCell>
          <TableCell>{row.Profesional.nombre || 'Desconocido'}</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>
            {formatCurrency(row.importe)}
          </TableCell>
          <TableCell>
            <IconButton onClick={(event) => handleClick(event, row.id_protocolo, row.id_estado)} style={{ visibility: 'hidden' }}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    })}
</TableBody>

        </Table>
      </TableContainer>
      </Box>

      {/* Paginación */}
      <Box sx={{ flexShrink: 0, py: 1 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="Registros por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
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

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmar Finalización</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas finalizar este protocolo? Ya no podrás editarlo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleFinalize} color="primary">
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        display="flex"
        justifyContent="space-evenly"
        mb={2}
        p={2}
        bgcolor="#f5f5f5"
        borderRadius="8px"
        marginTop="40px"
      >
        <Box>
          <strong>Saldados:</strong> <span style={{ color: "green" }}>{completados}</span>
        </Box>
        <Box>
          <strong>Pendientes:</strong> <span style={{ color: "orange" }}>{pendientes}</span>
        </Box>
      </Box>
    </Box>
    
  );
};

export default CuentasPendientes;