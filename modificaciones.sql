--MODIFICACIONES 22/06/2025--


--Se agrega columnas a formula leucocitaria
ALTER TABLE dvelab.formulaleucocitaria
ADD COLUMN recuento_leucocitario INT NULL DEFAULT NULL AFTER observaciones,
ADD COLUMN recuento_plaquetario INT NULL DEFAULT NULL AFTER recuento_leucocitario,
ADD COLUMN frotis DECIMAL(5,2) NULL DEFAULT NULL AFTER recuento_plaquetario;


--Se eliminan columnas de hemogramas
ALTER TABLE dvelab.hemogramas
DROP COLUMN recuento_leucocitario,
DROP COLUMN frotis,
DROP COLUMN recuento_plaquetario;

--Se cambia el tipo de dato de la columna absoluta en formulaleucocitaria
ALTER TABLE dvelab.formulaleucocitaria 
CHANGE COLUMN absoluta absoluta DECIMAL(10,2) NULL DEFAULT NULL ;