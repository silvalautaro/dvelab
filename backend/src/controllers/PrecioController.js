const {
    getAllPrecios,
    getPrecioById,
    createPrecio,
    updatePrecio,
    deletePrecio,
} = require('../services/PrecioService');

const getPrecios = async (req, res) => {
    try {
        const precios = await getAllPrecios();
        res.json({ result: precios, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const getOnePrecio = async (req, res) => {
    try {
        const { id } = req.params;
        const precio = await getPrecioById(id);
        if (precio) {
            res.json({ result: precio, status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Precio no encontrado', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const addPrecio = async (req, res) => {
    try {
        const precio = req.body;
        const newPrecio = await createPrecio(precio);
        res.json({ result: newPrecio, status: 200, ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const updatePrecioById = async (req, res) => {
    try {
        const { id } = req.params;
        const precio = req.body;
        const updated = await updatePrecio(id, precio);
        if (updated) {
            res.json({ result: 'Precio actualizado', status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Precio no encontrado', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

const deletePrecioById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deletePrecio(id);
        if (deleted) {
            res.json({ result: 'Precio eliminado', status: 200, ok: true });
        } else {
            res.status(404).json({ error: 'Precio no encontrado', status: 404, ok: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false });
    }
}

module.exports = {
    getPrecios,
    getOnePrecio,
    addPrecio,
    updatePrecioById,
    deletePrecioById,
}