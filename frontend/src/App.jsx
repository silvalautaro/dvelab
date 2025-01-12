import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuotesPage from './pages/QuotesPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FormularioIngresos from './pages/FormularioIngresos';
import TablaRegistros from './pages/TablaRegistros';
import FormularioInformes from './pages/FormularioInformes';

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
                            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                                {/* Navbar */}
                                <Navbar />
                                
                                {/* Contenedor principal con Sidebar y contenido */}
                                <div style={{ display: 'flex', flex: 1 }}>
                                    {/* Sidebar */}
                                    <Sidebar />
                                    
                                    {/* Contenido */}
                                    <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                                        <Routes>
                                            {/* Páginas del dashboard */}
                                            <Route path="/" element={<QuotesPage />} />
                                            <Route path="ingresos/formulario" element={<FormularioIngresos />} />
                                            <Route path="ingresos/tabla" element={<TablaRegistros />} />
                                            <Route path="informes/formulario" element={<FormularioInformes />} />
                                            <Route path="informes/tabla" element={<TablaRegistros />} />
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
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
};

export default App;
