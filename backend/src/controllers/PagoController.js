const pagoService = require("../services/PagoService");

const registrarPago = async (req, res) => {
    try {
        const { id_protocolo, importe, medio_pago, observaciones } = req.body;
    
        if (!id_protocolo || !importe || !medio_pago) {
          return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
    
        const nuevoPago = await pagoService.registrarPago(id_protocolo, importe, medio_pago, observaciones);
        
        res.status(201).json({
          status: 201,
          message: "Pago registrado con éxito",
          pago: nuevoPago,
          ok: true,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { registrarPago };
