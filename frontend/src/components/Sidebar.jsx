import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BiotechIcon from '@mui/icons-material/Biotech';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Sidebar = () => {
    const [openIngresos, setOpenIngresos] = useState(false);
    const [openInformes, setOpenInformes] = useState(false);

    const handleToggleIngresos = () => setOpenIngresos(!openIngresos);
    const handleToggleInformes = () => setOpenInformes(!openInformes);

    return (
        <Box sx={{ width: '250px', backgroundColor: '#0a0e0f', height: '100vh', padding: '16px' }}>
            <List>
                {/* Botón Ingresos */}
                <ListItem component="div" onClick={handleToggleIngresos} sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <BiotechIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ingresos" sx={{ color: 'white' }} />
                    {openIngresos ? (
                        <ExpandLessIcon sx={{ color: 'white' }} />
                    ) : (
                        <ExpandMoreIcon sx={{ color: 'white' }} />
                    )}
                </ListItem>
                <Collapse in={openIngresos} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={Link} to="/dashboard/ingresos/formulario" sx={{ pl: 4 }}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Formulario de ingreso" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Botón Informes */}
                <ListItem component="div" onClick={handleToggleInformes} sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Informes" sx={{ color: 'white' }} />
                    {openInformes ? (
                        <ExpandLessIcon sx={{ color: 'white' }} />
                    ) : (
                        <ExpandMoreIcon sx={{ color: 'white' }} />
                    )}
                </ListItem>
                <Collapse in={openInformes} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={Link} to="/dashboard/informes/tabla" sx={{ pl: 4 }}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tabla de registros" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Box>
    );
};

export default Sidebar;
