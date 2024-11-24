CREATE DATABASE  IF NOT EXISTS `parcial` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parcial`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: parcial
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `idLibros` int unsigned NOT NULL AUTO_INCREMENT,
  `Titulo_Libro` varchar(75) DEFAULT NULL,
  `Autor` varchar(50) DEFAULT NULL,
  `Editorial` varchar(50) DEFAULT NULL,
  `Genero` varchar(50) DEFAULT NULL,
  `Id_Miembro` int DEFAULT NULL,
  PRIMARY KEY (`idLibros`),
  KEY `Id_Miembro_idx` (`Id_Miembro`),
  CONSTRAINT `Id_Miembro` FOREIGN KEY (`Id_Miembro`) REFERENCES `miembro` (`Id_Miembro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (1,'El Principito','Antoine de Saint','Guadal','Novela Infantil',NULL),(2,'Harry Potter','J.K Rowling','Bloomsbury','Ficción',NULL),(3,'El Alquimista','Paulo Coelho','Companhia das Letras','Ficción',NULL),(4,'rola','dssdas','dsad','dewe',NULL),(6,'rere','dsad','sadsa','sadasd',4),(7,'RAMBO','dsad','sadsa','sadasd',NULL);
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `miembro`
--

DROP TABLE IF EXISTS `miembro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miembro` (
  `Id_Miembro` int NOT NULL AUTO_INCREMENT,
  `Nombre_Apellido` varchar(60) DEFAULT NULL,
  `DNI` int unsigned DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `Numero_Telefono` int unsigned DEFAULT NULL,
  PRIMARY KEY (`Id_Miembro`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miembro`
--

LOCK TABLES `miembro` WRITE;
/*!40000 ALTER TABLE `miembro` DISABLE KEYS */;
INSERT INTO `miembro` VALUES (1,'Angela_Aguilar',1234,'AG@gmail.com',567891),(2,'Mariano Perez',5678,'MP@gmail.com',789101),(3,'Sofia Avila',9101,'SA@gmail.com',910111),(4,'juan',4321,'res@gmail.com',654321),(7,'tttttt',557657623,'rff@gmail.com',324423),(10,'Pedro',324423,'rff@gmail.com',4321),(11,'rerwrwe',232323,'rff@gmail.com',3242342),(12,'Pedro',324423,'rff@gmail.com',4321);
/*!40000 ALTER TABLE `miembro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-24 17:10:13
