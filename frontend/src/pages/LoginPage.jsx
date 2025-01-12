import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === '123' && password === '123') {
            localStorage.setItem('authToken', 'demo-token'); // Guarda un token
            navigate('/dashboard'); // Redirige al dashboard
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <TextField 
                    label="Usuario" 
                    fullWidth 
                    margin="normal" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <TextField 
                    label="Contraseña" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    fullWidth 
                    color="primary" 
                    sx={{ marginTop: 2 }}
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginPage;
