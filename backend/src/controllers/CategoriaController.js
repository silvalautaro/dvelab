const fs = require('fs');
const path = require('path');


const { getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria } = require('../services/CategoriaService');


const getCategorias = async (req, res) => {
    try {
        const categorias = await getAllCategorias();
        res.json({ registro: categorias.length, result: categorias, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const getOneCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await getCategoriaById(id);
        if (categoria) {
            res.json({ result: categoria, status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Categoria no encontrada', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const addCategoria = async (req, res) => {
    try {
        const categoria = req.body;
        const newCategoria = await createCategoria(categoria);
        res.json({ result: newCategoria, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const updateCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = req.body;
        const updated = await updateCategoria(id, categoria);
        if (updated) {
            res.json({ result: 'Categoria actualizada', status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Categoria no encontrada', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const deleteCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCategoria(id);
        if (deleted) {
            res.json({ result: 'Categoria eliminada', status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Categoria no encontrada', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

module.exports = {
    getCategorias,
    getOneCategoria,
    addCategoria,
    updateCategoriaById,
    deleteCategoriaById
};