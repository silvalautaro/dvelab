const ArchivoPdf = require("./archivo_pdf");
const Bioquimica_Sanguinea = require( "./bioquimicaSanguinea");
const Coagulograma = require( "./coagulograma");
const Estado = require( "./estado");
const Estudio = require( "./estudios");
const FormulaLeucocitaria = require( "./formulaLeucocitaria");
const Hemograma = require( "./hemograma");
const Paciente = require( "./paciente");
const Profesional = require( "./profesional");
const Veterinaria = require( "./veterinaria");
const Protocolo = require( "./protocolo");
const Sexo = require( "./sexo");
const TipoCelula = require( "./tipoCelulas");
const Raza = require( "./raza");
const Especie = require( "./especie");
const Categorias_Especies = require( "./categorias_especies");
const Precio = require( "./precio");
const Usuario = require( "./usuario");
const Pago = require( "./pago");

const models = {
    ArchivoPdf,
    Bioquimica_Sanguinea,
    Coagulograma,
    Estado,
    Estudio,
    FormulaLeucocitaria,
    Hemograma,
    Paciente,
    Profesional,
    Veterinaria,
    Protocolo,
    Sexo,
    TipoCelula,
    Raza,
    Especie,
    Categorias_Especies,
    Precio,
    Usuario,
    Pago
}

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = models;