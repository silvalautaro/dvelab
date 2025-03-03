import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Configuracion.css';

const Configuracion = () => {
    const [precios, setPrecios] = useState({});
    const [error, setError] = useState(null);
    const idEstudio = 1; // Asegúrate de definir el ID del estudio

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/precios`)
            .then(response => {
                console.log(response.data);
                const precioEstudio1 = response.data.result.find(precio => precio.id_estudio === idEstudio);
                if (precioEstudio1) {
                    setPrecios(prevPrecios => ({
                        ...prevPrecios,
                        estudio1: precioEstudio1.precio
                    }));
                } else {
                    setError('No se encontró el precio para el estudio con ID 1.');
                }
            })
            .catch(error => {
                console.error('Error al cargar los precios:', error);
                setError('Error al cargar los precios.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrecios({
            ...precios,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ precio: precios.estudio1 });
    
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/precios`)
            .then(response => {
                if (!Array.isArray(response.data.result)) {
                    throw new Error("La respuesta del backend no contiene un array");
                }
    
                const preciosActuales = response.data.result;
    
                // Buscar el precio específico a actualizar
                const precioActual = preciosActuales.find(precio => precio.id_estudio === idEstudio);
    
                if (!precioActual) {
                    throw new Error("No se encontró el estudio con ese ID");
                }
    
                // Crear objeto con el precio actualizado
                const precioActualizado = { 
                    ...precioActual, 
                    precio: parseInt(precios.estudio1, 10) 
                };
    
                // Enviar la actualización al backend con el ID correcto
                return axios.put(`${process.env.REACT_APP_BACKEND_URL}/precios/${precioActual.id_precio}`, 
                    precioActualizado,
                    { headers: { 'Content-Type': 'application/json' } }
                );
            })
            .then(response => {
                console.log('Precio actualizado exitosamente:', response.data);
            })
            .catch(error => {
                console.error('Error al actualizar los precios:', error);
                setError('Error al actualizar los precios.');
            });
    };

    return (
        <div className="configuracion-container">
            <h1>Lista de Precios</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="configuracion-form">
                <div className="form-group">
                    <label htmlFor="estudio1">Perfil General Básico:</label>
                    <input
                        type="number"
                        id="estudio1"
                        name="estudio1"
                        value={precios.estudio1 || ''}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    );
};

export default Configuracion;
