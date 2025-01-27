const Categoria = require('../models/categorias_especies');

const getAllCategorias = async () => {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        throw new Error('Error al obtener categorias', error.message);
    }
}

const getCategoriaById = async (id) => {
    try {
        const categoria = await Categoria.findByPk(id);
        return categoria;
    } catch (error) {
        console.error('Error al obtener categoria:', error);
        throw new Error('Error al obtener categoria', error.message);
    }
}

const createCategoria = async (categoria) => {
    try {
        const newCategoria = await Categoria.create(categoria);
        return newCategoria;
    } catch (error) {
        console.error('Error al crear categoria:', error);
        throw new Error('Error al crear categoria', error.message);
    }
}

const updateCategoria = async (id, categoria) => {
    try {
        await Categoria.update(categoria, {
            where: {
                id_categoria: id,
            },
        });
        return true;
    } catch (error) {
        console.error('Error al actualizar categoria:', error);
        throw new Error('Error al actualizar categoria', error.message);
    }
}

const deleteCategoria = async (id) => {
    try {
        await Categoria.destroy({
            where: {
                id_categoria: id,
            },
        });
        return true;
    } catch (error) {
        console.error('Error al eliminar categoria:', error);
        throw new Error('Error al eliminar categoria', error.message);
    }
}

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};