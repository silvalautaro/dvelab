import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Borra el token
        navigate('/login'); // Redirige al login
    };

    return (
        <Button 
            variant="contained" 
            color="undefined"
            onClick={handleLogout}
            sx={{ position: 'absolute', top: 16, right: 16 }}
        >
            Cerrar Sesión
        </Button>
    );
};

export default LogoutButton;
