import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuotesPage from './pages/QuotesPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FormularioIngresos from './pages/FormularioIngresos';
import TablaRegistros from './pages/TablaRegistros';
import CuentasPendientes from './pages/CuentasPendientes';
import Configuracion from './pages/Configuracion';
import logo from './assets/logo.png';

const App = () => {
    // Simula el estado de autenticación
    const isAuthenticated = localStorage.getItem('authToken');

    return (
        <Router>
            <Routes>
                {/* Ruta del login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rutas protegidas */}
                {isAuthenticated ? (
                    <Route 
                    path="/dashboard/*" 
                    element={
                        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <Navbar />
                            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                                <Sidebar />
                                <div style={{flex: 1, padding: '16px', overflow: 'auto' }}>
                                    <Routes>
                                        {/* Logo centrado solo en /dashboard */}
                                        <Route path="" element={
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <img src={logo} alt="Logo Dvelab" style={{ maxWidth: '800px', width: '100%', height: 'auto' }} />
                                            </div>
                                        } />
                                        {/* Resto de páginas */}
                                        <Route path="ingresos/formulario" element={<FormularioIngresos />} />
                                        <Route path="informes/tabla" element={<TablaRegistros />} />
                                        <Route path="cuentas/pendientes" element={<CuentasPendientes />} />
                                        <Route path="configuracion" element={<Configuracion />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    } 
                />
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
