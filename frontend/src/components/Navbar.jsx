import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import logo from '../assets/logo.png'; // Importa el logo
import LogoutButton from './LogoutButton'; // Importa el botón de cerrar sesión

const Navbar = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
                {/* Logo */}
                <Box
                    component="img"
                    src={logo}
                    alt="Logo de la empresa"
                    sx={{ height: '50px', width: 'auto' , cursor: 'pointer' }} 
                    onClick={() => window.location.href = '/dashboard'}
                    onMouseOver={(e) => e.currentTarget.title = 'Home'}
                />
                {/* Botón de cerrar sesión */}
                <LogoutButton />
            </Toolbar>            
        </AppBar>
    );
};

export default Navbar;
