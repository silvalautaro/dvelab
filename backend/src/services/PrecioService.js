const { Precio, Estudio, Categorias_Especies } = require('../models');

const getAllPrecios = async () => {
    try {
        const precios = await Precio.findAll({
            include: [ Estudio, Categorias_Especies ]
        });
        return precios;
    } catch (error) {
        console.error('Error al obtener precios:', error);
        throw new Error('Error al obtener precios', error.message);
    }
}

const getPrecioById = async (id) => {
    try {
        const precio = await Precio.findByPk(id,{
            include:[ Estudio, Categorias_Especies ]
        });
        return precio;
    } catch (error) {
        console.error('Error al obtener precio:', error);
        throw new Error('Error al obtener precio', error.message);
    }
}

const createPrecio = async (precio) => {
    try {
        const newPrecio = await Precio.create(precio);
        return newPrecio;
    } catch (error) {
        console.error('Error al crear precio:', error);
        throw new Error('Error al crear precio', error.message);
    }
}

const updatePrecio = async (id, precio) => {
    try {
        await Precio.update(precio, {
            where: {
                id_precio: id,
            },
        });
        return true;
    } catch (error) {
        console.error('Error al actualizar precio:', error);
        throw new Error('Error al actualizar precio', error.message);
    }
}

const deletePrecio = async (id) => {
    try {
        await Precio.destroy({
            where: {
                id_precio: id,
            },
        });
        return true;
    } catch (error) {
        console.error('Error al eliminar precio:', error);
        throw new Error('Error al eliminar precio', error.message);
    }
}

module.exports = {
    getAllPrecios,
    getPrecioById,
    createPrecio,
    updatePrecio,
    deletePrecio,
};