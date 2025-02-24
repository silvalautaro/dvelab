-- MySQL dump 10.13  Distrib 8.4.3, for Linux (x86_64)
--
-- Host: localhost    Database: dvelab
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Archivo_pdf`
--

DROP TABLE IF EXISTS `Archivo_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Archivo_pdf` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_protocolo` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `nombre_archivo` varchar(255) DEFAULT NULL,
  `fecha_subida` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_id_protocolo_archivo` (`id_protocolo`),
  CONSTRAINT `Archivo_pdf_ibfk_1` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Archivo_pdf`
--

LOCK TABLES `Archivo_pdf` WRITE;
/*!40000 ALTER TABLE `Archivo_pdf` DISABLE KEYS */;
/*!40000 ALTER TABLE `Archivo_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bioquimica_Sanguinea`
--

DROP TABLE IF EXISTS `Bioquimica_Sanguinea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bioquimica_Sanguinea` (
  `id_bioquimica` int NOT NULL AUTO_INCREMENT,
  `id_protocolo` int NOT NULL,
  `urea` decimal(5,2) DEFAULT NULL,
  `creatinina` decimal(5,2) DEFAULT NULL,
  `glucemia` decimal(5,2) DEFAULT NULL,
  `gpt` decimal(5,2) DEFAULT NULL,
  `got` decimal(5,2) DEFAULT NULL,
  `fosfatasa_alcalina` decimal(5,2) DEFAULT NULL,
  `g_glutamil_transferasa` decimal(5,2) DEFAULT NULL,
  `proteinas_totales` decimal(5,2) DEFAULT NULL,
  `albumina` decimal(5,2) DEFAULT NULL,
  `globulinas` decimal(5,2) DEFAULT NULL,
  `relacion_alb_glob` decimal(5,2) DEFAULT NULL,
  `bilirrubina_total` decimal(5,2) DEFAULT NULL,
  `bilirrubina_directa` decimal(5,2) DEFAULT NULL,
  `bilirrubina_indirecta` decimal(5,2) DEFAULT NULL,
  `amilasa` decimal(5,2) DEFAULT NULL,
  `trigliceridos` decimal(5,2) DEFAULT NULL,
  `colesterol_total` decimal(5,2) DEFAULT NULL,
  `creatinina_p_kinasa` decimal(5,2) DEFAULT NULL,
  `hdl_col` decimal(5,2) DEFAULT NULL,
  `ldl_col` decimal(5,2) DEFAULT NULL,
  `calcio_total` decimal(5,2) DEFAULT NULL,
  `fosforo` decimal(5,2) DEFAULT NULL,
  `sodio` decimal(5,2) DEFAULT NULL,
  `potasio` decimal(5,2) DEFAULT NULL,
  `cloro` decimal(5,2) DEFAULT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_bioquimica`),
  UNIQUE KEY `unique_bioquimica_protocolo` (`id_protocolo`),
  KEY `idx_id_protocolo_bioquimica` (`id_protocolo`),
  CONSTRAINT `fk_bioquimica_sanguinea_protocolo` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bioquimica_Sanguinea`
--

LOCK TABLES `Bioquimica_Sanguinea` WRITE;
/*!40000 ALTER TABLE `Bioquimica_Sanguinea` DISABLE KEYS */;
INSERT INTO `Bioquimica_Sanguinea` VALUES (5,12350,12.00,12.00,20.00,20.00,20.00,20.00,20.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,25.00,'prueba a ver'),(8,12351,22.00,12.00,12.00,12.00,1.00,1.00,1.00,45.00,45.00,44.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No se observa nada'),(9,15515,22.00,12.00,13.00,12.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Bioquimica_Sanguinea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorias_especies`
--

DROP TABLE IF EXISTS `Categorias_especies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias_especies` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias_especies`
--

LOCK TABLES `Categorias_especies` WRITE;
/*!40000 ALTER TABLE `Categorias_especies` DISABLE KEYS */;
INSERT INTO `Categorias_especies` VALUES (1,'Caninos-Felinos'),(2,'Equinos-Bovinos');
/*!40000 ALTER TABLE `Categorias_especies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coagulogramas`
--

DROP TABLE IF EXISTS `Coagulogramas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coagulogramas` (
  `id_coagulograma` int NOT NULL AUTO_INCREMENT,
  `id_protocolo` int NOT NULL,
  `tiempo_protrombina` decimal(5,2) DEFAULT NULL,
  `tiempo_tromboplastina` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_coagulograma`),
  UNIQUE KEY `unique_coagulograma_protocolo` (`id_protocolo`),
  KEY `idx_id_protocolo_coagulograma` (`id_protocolo`),
  CONSTRAINT `fk_coagulogramas_protocolo` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coagulogramas`
--

LOCK TABLES `Coagulogramas` WRITE;
/*!40000 ALTER TABLE `Coagulogramas` DISABLE KEYS */;
INSERT INTO `Coagulogramas` VALUES (5,12350,25.00,12.00),(8,12351,25.00,22.00),(9,15515,22.00,23.00);
/*!40000 ALTER TABLE `Coagulogramas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Especies`
--

DROP TABLE IF EXISTS `Especies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Especies` (
  `id_especie` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_especie`),
  KEY `fk_categoria_especies_idx` (`id_categoria`),
  CONSTRAINT `fk_categoria_especies` FOREIGN KEY (`id_categoria`) REFERENCES `Categorias_especies` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Especies`
--

LOCK TABLES `Especies` WRITE;
/*!40000 ALTER TABLE `Especies` DISABLE KEYS */;
INSERT INTO `Especies` VALUES (1,'Canino',1),(2,'Felino',1),(3,'Equino',2),(4,'Bovino',2);
/*!40000 ALTER TABLE `Especies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Estados`
--

DROP TABLE IF EXISTS `Estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Estados` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estados`
--

LOCK TABLES `Estados` WRITE;
/*!40000 ALTER TABLE `Estados` DISABLE KEYS */;
INSERT INTO `Estados` VALUES (1,'Ingresado'),(2,'Pendiente'),(3,'Completado');
/*!40000 ALTER TABLE `Estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Estudios`
--

DROP TABLE IF EXISTS `Estudios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Estudios` (
  `id_estudio` int NOT NULL AUTO_INCREMENT,
  `estudio` varchar(80) NOT NULL,
  PRIMARY KEY (`id_estudio`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estudios`
--

LOCK TABLES `Estudios` WRITE;
/*!40000 ALTER TABLE `Estudios` DISABLE KEYS */;
INSERT INTO `Estudios` VALUES (1,'Perfil General Básico'),(2,'Perfil General Completo'),(3,'Perfil Hepático'),(4,'Perfil Neurológico 1'),(5,'Perfil Neurológico 2'),(6,'Perfil Prequirúrgico Hemostático'),(7,'Perfil Renal Básico'),(8,'Perfil Renal Completo'),(9,'Perfil Tiroideo Básico'),(10,'Perfil Tiroideo Completo'),(11,'Hemograma'),(12,'Perfil Infeccioso Felino'),(13,'Perfil Rendimiento Equino Básico'),(14,'Perfil Rendimiento Equino Completo'),(15,'Perfil Clínico Bovino Básico'),(16,'Perfil Clínico Bovino Completo'),(17,'Perfil Mineral'),(18,'Hemograma Completo'),(19,'Búsqueda de Parásitos (Babesia SP) (Frotis de Sangre Capilar)'),(20,'Fibrinógeno'),(21,'Lactato'),(22,'Determinación Bioquímica Dentro de los Perfiles C/U'),(23,'Cultivo Bacteriológico Aeróbicos + Antibiograma'),(24,'Cultivo Bacteriológico Automatizado'),(25,'Cultivo Micologico'),(26,'Observación Directa Dermatofitos OHK'),(27,'Anemia Infecciosa Equina (IDGA)'),(28,'Análisis de Orina Completo (Físico-Químico-Citológico)'),(29,'Coproparasitológico (Flotación y Sedimentación)'),(30,'H.P.G.'),(31,'Análisis de Líquidos de Punción (Físico-Químico-Citológico)'),(32,'Análisis de Líquidos de Punción (Físico-Químico-Citológico) -D'),(33,'Citología (Hasta 4 Vidrios)'),(34,'Histopatológico'),(35,'Muestra Adicional Mismo Paciente Histopatológico'),(36,'Perfil Infeccioso Canino');
/*!40000 ALTER TABLE `Estudios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FormulaLeucocitaria`
--

DROP TABLE IF EXISTS `FormulaLeucocitaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FormulaLeucocitaria` (
  `id_formula` int NOT NULL AUTO_INCREMENT,
  `id_tipo_celula` int NOT NULL,
  `id_protocolo` int NOT NULL,
  `relativa` decimal(5,2) DEFAULT NULL,
  `absoluta` int DEFAULT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_formula`),
  UNIQUE KEY `unique_formula_protocolo_tipo` (`id_protocolo`,`id_tipo_celula`),
  KEY `id_tipo_celula` (`id_tipo_celula`),
  KEY `idx_id_protocolo_formula` (`id_protocolo`),
  CONSTRAINT `fk_formulaleucocitaria_protocolo` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`) ON DELETE CASCADE,
  CONSTRAINT `FormulaLeucocitaria_ibfk_2` FOREIGN KEY (`id_tipo_celula`) REFERENCES `TipoCelulas` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FormulaLeucocitaria`
--

LOCK TABLES `FormulaLeucocitaria` WRITE;
/*!40000 ALTER TABLE `FormulaLeucocitaria` DISABLE KEYS */;
INSERT INTO `FormulaLeucocitaria` VALUES (23,4,12350,0.00,0,'prueba'),(24,3,12350,5.00,825,'prueba'),(25,7,12350,20.00,2000,'prueba'),(26,5,12350,15.00,2475,'prueba'),(27,6,12350,2.00,330,'prueba'),(28,2,12350,0.00,0,'prueba'),(29,1,12350,78.00,12870,'prueba'),(30,4,12351,22.00,22,NULL),(31,3,12351,22.00,22,NULL),(32,7,12351,34.00,34,NULL),(33,5,12351,23.00,23,NULL),(34,6,12351,NULL,NULL,NULL),(35,2,12351,NULL,NULL,NULL),(36,1,12351,NULL,NULL,NULL),(37,4,15515,52.00,522,NULL),(38,3,15515,22.00,222,NULL),(39,7,15515,0.00,0,NULL),(40,5,15515,52.00,520,NULL),(41,6,15515,50.00,502,NULL),(42,2,15515,22.00,22,NULL),(43,1,15515,22.00,22,NULL);
/*!40000 ALTER TABLE `FormulaLeucocitaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hemogramas`
--

DROP TABLE IF EXISTS `Hemogramas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hemogramas` (
  `id_hemograma` int NOT NULL AUTO_INCREMENT,
  `id_protocolo` int NOT NULL,
  `recuento_globulos_rojos` decimal(5,2) DEFAULT NULL,
  `hemoglobina` decimal(5,2) DEFAULT NULL,
  `hematocrito` decimal(5,2) DEFAULT NULL,
  `vcm` decimal(5,2) DEFAULT NULL,
  `hcm` decimal(5,2) DEFAULT NULL,
  `chcm` decimal(5,2) DEFAULT NULL,
  `rdw` decimal(5,2) DEFAULT NULL,
  `indice_reticulocitario` varchar(100) DEFAULT NULL,
  `recuento_plaquetario` int DEFAULT NULL,
  `frotis` decimal(5,2) DEFAULT NULL,
  `recuento_leucocitario` int DEFAULT NULL,
  `caracteristicas_serie_eritroide` varchar(250) DEFAULT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  `morfologia_plaquetaria` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_hemograma`),
  UNIQUE KEY `unique_hemograma_protocolo` (`id_protocolo`),
  KEY `idx_id_protocolo` (`id_protocolo`),
  CONSTRAINT `fk_hemogramas_protocolo` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hemogramas`
--

LOCK TABLES `Hemogramas` WRITE;
/*!40000 ALTER TABLE `Hemogramas` DISABLE KEYS */;
INSERT INTO `Hemogramas` VALUES (6,12350,100.00,13.00,12.00,10.00,10.00,10.00,10.00,'123',12,10.00,1200,'1200','prueba','1200'),(10,12351,22.00,12.00,12.00,34.00,56.00,56.00,34.00,'12',12,55.00,45,'88','prueba 500','67'),(11,15515,22.00,23.00,23.00,23.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Hemogramas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pacientes`
--

DROP TABLE IF EXISTS `Pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pacientes` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `id_especie` int NOT NULL,
  `id_raza` int NOT NULL,
  `id_sexo` int NOT NULL,
  `tutor` varchar(100) NOT NULL,
  `edad` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_paciente`),
  KEY `idx_id_especie` (`id_especie`),
  KEY `idx_id_raza` (`id_raza`),
  KEY `idx_id_sexo` (`id_sexo`),
  CONSTRAINT `Pacientes_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `Especies` (`id_especie`),
  CONSTRAINT `Pacientes_ibfk_2` FOREIGN KEY (`id_raza`) REFERENCES `Razas` (`id_raza`),
  CONSTRAINT `Pacientes_ibfk_3` FOREIGN KEY (`id_sexo`) REFERENCES `Sexos` (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pacientes`
--

LOCK TABLES `Pacientes` WRITE;
/*!40000 ALTER TABLE `Pacientes` DISABLE KEYS */;
INSERT INTO `Pacientes` VALUES (1,'Toby',1,2,2,'Maria Pérez','8meses'),(2,'Pancho',1,5,2,'Gina Correa','2'),(3,'Ruby',1,3,1,'Ana Gonzalez','4'),(4,'Lucy',1,9,1,'Eloina Perez','3'),(5,'Lulu',1,1,1,'Aurora Martinez','1'),(6,'Roco',1,1,2,'Aurora Martinez','2'),(7,'Tilo',1,10,2,'Maria Lopez','2'),(8,'Tini',1,6,1,'Aldo mora','3'),(9,'Tiramisu',1,9,1,'Ross','2'),(10,'refa',1,11,2,'pepe','3');
/*!40000 ALTER TABLE `Pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pagos`
--

DROP TABLE IF EXISTS `Pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_protocolo` int NOT NULL,
  `fecha_pago` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `importe` decimal(10,2) NOT NULL,
  `medio_pago` enum('Efectivo','MercadoPago','Transferencia Bancaria') NOT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_pago`),
  KEY `id_protocolo` (`id_protocolo`),
  CONSTRAINT `Pagos_ibfk_1` FOREIGN KEY (`id_protocolo`) REFERENCES `Protocolos` (`id_protocolo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pagos`
--

LOCK TABLES `Pagos` WRITE;
/*!40000 ALTER TABLE `Pagos` DISABLE KEYS */;
INSERT INTO `Pagos` VALUES (6,12351,'2025-02-23 22:37:36',8000.00,'MercadoPago','Importe parcial'),(7,12351,'2025-02-23 22:39:55',6900.00,'Efectivo','Se pagó en caja importe final');
/*!40000 ALTER TABLE `Pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Precios`
--

DROP TABLE IF EXISTS `Precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Precios` (
  `id_precio` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `id_estudio` int NOT NULL,
  `precio` int NOT NULL,
  PRIMARY KEY (`id_precio`),
  KEY `FK_Precio_Estudio` (`id_estudio`),
  KEY `FK_Precio_Categoria` (`id_categoria`),
  CONSTRAINT `FK_Precio_Categoria` FOREIGN KEY (`id_categoria`) REFERENCES `Categorias_especies` (`id_categoria`) ON DELETE CASCADE,
  CONSTRAINT `FK_Precio_Estudio` FOREIGN KEY (`id_estudio`) REFERENCES `Estudios` (`id_estudio`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Precios`
--

LOCK TABLES `Precios` WRITE;
/*!40000 ALTER TABLE `Precios` DISABLE KEYS */;
INSERT INTO `Precios` VALUES (24,2,13,15400),(25,2,14,21500),(26,2,15,15400),(27,2,16,21500),(28,2,17,11200),(29,2,18,10800),(30,2,19,7400),(31,2,20,5500),(32,2,21,9000),(33,2,22,1800),(34,2,23,18500),(35,2,24,0),(36,2,25,18500),(37,2,26,8500),(38,2,27,6500),(39,2,28,6800),(40,2,29,6300),(41,2,30,5500),(42,2,31,17900),(43,2,32,25000),(44,2,33,17000),(45,2,34,35000),(46,2,35,17500),(47,1,36,40700),(48,1,1,12100),(49,1,2,14900),(50,1,3,14900),(51,1,4,28500),(52,1,5,28500),(53,1,6,14900),(54,1,7,11200),(55,1,8,17800),(56,1,9,19200),(57,1,10,61300),(58,1,11,9400),(59,1,12,47300);
/*!40000 ALTER TABLE `Precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profesionales`
--

DROP TABLE IF EXISTS `Profesionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profesionales` (
  `id_profesional` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_profesional`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profesionales`
--

LOCK TABLES `Profesionales` WRITE;
/*!40000 ALTER TABLE `Profesionales` DISABLE KEYS */;
INSERT INTO `Profesionales` VALUES (1,'Dr. Aimale Martín'),(2,'Dra. Borrego Andrea'),(3,'Dr. Barbano Pablo'),(4,'Dr. Camerano Marcos'),(5,'Dr. Carballo German'),(6,'Dra. Carmody Clementina'),(7,'Dra. Crivelli Agostina'),(8,'Dr. Costa Eduardo'),(9,'Dr. Coll Juan'),(10,'Dra. Deluca Paula'),(11,'Dra. Di Jacobo Ornella'),(12,'Dra. Dono Valeria'),(13,'Dr. Del Moral Mariano'),(14,'Dra. Gallinger Paula'),(15,'Dr. Garcia-Lertora'),(16,'Dra. Giachino Vanesa'),(17,'Dra. Gardiner Laura'),(18,'Dra. Gonzalez Analia'),(19,'Dra. Gonzalez Casanova Lara'),(20,'Dra. Gonzalez Natalia'),(21,'Dr. Grafia Sebastian'),(22,'Dr. Etchebarne Ramiro'),(23,'Dra. Felice Nora'),(24,'Dr. Fernandez'),(25,'Dra. Lanfredi Fátima'),(26,'Dra. Leopardi Florencia'),(27,'Dr. Marsico Diego'),(28,'Dra. Miroglio Antonela'),(29,'Dra. Morresi Lucia'),(30,'Dr. Mosnaim Fidel'),(31,'Dr. Malusardi Hernan'),(32,'Dr. Nicolai Ivan'),(33,'Dr. Nicosia Claudio'),(34,'Dra. Parada Virginia'),(35,'Dr. Pighin Juan Ignacio'),(36,'Dra. Quinn María Elena'),(37,'Dr. Randazzo Federico'),(38,'Dra. Rodriguez Jésica'),(39,'Dra. Soto Victoria'),(40,'Dra. Vergara Eugenia'),(41,'Dra. Zanazzi Belen'),(42,'Dra. Fatima Lanfredi');
/*!40000 ALTER TABLE `Profesionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Protocolos`
--

DROP TABLE IF EXISTS `Protocolos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Protocolos` (
  `id_protocolo` int NOT NULL,
  `fecha` date NOT NULL,
  `importe` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_veterinaria` int NOT NULL,
  `id_profesional` int NOT NULL,
  `id_estudio` int NOT NULL,
  `id_estado` int NOT NULL,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_protocolo`),
  KEY `id_paciente` (`id_paciente`),
  KEY `idx_id_veterinaria` (`id_veterinaria`),
  KEY `idx_id_profesional` (`id_profesional`),
  KEY `idx_id_estudio` (`id_estudio`),
  KEY `idx_id_estado` (`id_estado`),
  CONSTRAINT `Protocolos_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `Pacientes` (`id_paciente`),
  CONSTRAINT `Protocolos_ibfk_2` FOREIGN KEY (`id_veterinaria`) REFERENCES `Veterinarias` (`id_veterinaria`),
  CONSTRAINT `Protocolos_ibfk_3` FOREIGN KEY (`id_profesional`) REFERENCES `Profesionales` (`id_profesional`),
  CONSTRAINT `Protocolos_ibfk_4` FOREIGN KEY (`id_estudio`) REFERENCES `Estudios` (`id_estudio`),
  CONSTRAINT `Protocolos_ibfk_5` FOREIGN KEY (`id_estado`) REFERENCES `Estados` (`id_estado`),
  CONSTRAINT `Protocolos_chk_1` CHECK ((`id_protocolo` between 10000 and 99999))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Protocolos`
--

LOCK TABLES `Protocolos` WRITE;
/*!40000 ALTER TABLE `Protocolos` DISABLE KEYS */;
INSERT INTO `Protocolos` VALUES (12350,'2025-02-04',12100,7,8,7,1,3,'2025-02-24 01:54:11'),(12351,'2025-02-04',14900,8,2,9,3,3,'2025-02-24 05:59:22'),(15515,'2025-02-24',5000,10,1,9,1,2,'2025-02-24 06:27:39'),(22322,'2025-02-21',12000,9,1,7,1,1,'2025-02-22 02:51:33');
/*!40000 ALTER TABLE `Protocolos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Razas`
--

DROP TABLE IF EXISTS `Razas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Razas` (
  `id_raza` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_raza`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Razas`
--

LOCK TABLES `Razas` WRITE;
/*!40000 ALTER TABLE `Razas` DISABLE KEYS */;
INSERT INTO `Razas` VALUES (1,'PITBULL'),(2,'OVEJERO'),(3,'CANICHE'),(4,'LABRADOR'),(5,'GOLDEN'),(6,'CHIHUAHUA'),(7,'MESTIZO'),(8,'Jack Rusell'),(9,'Maltes'),(10,'B. Francés'),(11,'Schnauzer');
/*!40000 ALTER TABLE `Razas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sexos`
--

DROP TABLE IF EXISTS `Sexos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sexos` (
  `id_sexo` int NOT NULL AUTO_INCREMENT,
  `sexo` char(1) NOT NULL,
  PRIMARY KEY (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sexos`
--

LOCK TABLES `Sexos` WRITE;
/*!40000 ALTER TABLE `Sexos` DISABLE KEYS */;
INSERT INTO `Sexos` VALUES (1,'H'),(2,'M');
/*!40000 ALTER TABLE `Sexos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoCelulas`
--

DROP TABLE IF EXISTS `TipoCelulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoCelulas` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `tipo_celula` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo`),
  UNIQUE KEY `tipo_celula` (`tipo_celula`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoCelulas`
--

LOCK TABLES `TipoCelulas` WRITE;
/*!40000 ALTER TABLE `TipoCelulas` DISABLE KEYS */;
INSERT INTO `TipoCelulas` VALUES (4,'Basófilos'),(3,'Eosinófilos'),(7,'Formas Juveniles'),(5,'Linfocitos'),(6,'Monocitos'),(2,'Neutrófilos en banda'),(1,'Neutrófilos Segmentados');
/*!40000 ALTER TABLE `TipoCelulas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_electronico` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (2,'Rosemary','ross_prueba@gmail.com','12345678','1122223333','2025-01-31 19:54:02','activo','usuario'),(3,'Jose Delgado','jose_prueba@gmail.com','654321','1132323232','2025-01-31 19:55:50','activo','admin'),(4,'Esteban Delgado','esteban_prueba@gmail.com','654123','1132323232','2025-01-31 20:00:27','activo','usuario'),(5,'Gustavo Delgado','gus_prueba@gmail.com','$2a$10$iksRqWVKBYzcjKj0B1oWeOo.xie2RXg2RMFt5vG8jfGDwdia4Kb8G','1132323232','2025-01-31 20:03:49','activo','usuario');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Veterinarias`
--

DROP TABLE IF EXISTS `Veterinarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Veterinarias` (
  `id_veterinaria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_veterinaria`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Veterinarias`
--

LOCK TABLES `Veterinarias` WRITE;
/*!40000 ALTER TABLE `Veterinarias` DISABLE KEYS */;
INSERT INTO `Veterinarias` VALUES (1,'APVET'),(2,'Buena Pata'),(3,'CMV'),(4,'Como perros con dos colas'),(5,'Dono'),(6,'Del Carmen'),(7,'Ferrocarril Oeste'),(8,'Garcia-Lertora'),(9,'Identidad Canina'),(10,'La Espuela'),(11,'La querencia'),(12,'La Marca'),(13,'Mato'),(14,'Meraki'),(15,'Morresi'),(16,'Mymba Pets'),(17,'Natural Life'),(18,'Pilar'),(19,'Rural de Jauregui'),(20,'San Martin'),(21,'Santa Elena'),(22,'San Roque'),(23,'Santa Brígida'),(24,'Güemes'),(25,'CMV miroglio'),(26,'Valentina Moreno');
/*!40000 ALTER TABLE `Veterinarias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24  3:37:21
