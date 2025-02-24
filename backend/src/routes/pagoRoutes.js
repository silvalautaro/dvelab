const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/PagoController");

router.post("/", pagoController.registrarPago);

module.exports = router;
