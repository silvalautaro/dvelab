import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import logo from '../assets/logo.png'; // Importa el logo

const Navbar = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar sx={{ justifyContent: 'center' }}>
                {/* Logo */}
                <Box
                    component="img"
                    src={logo}
                    alt="Logo de la empresa"
                    sx={{ height: '50px', width: 'auto' }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
