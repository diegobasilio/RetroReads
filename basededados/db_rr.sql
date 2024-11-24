-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_rr
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `tbende`
--

DROP TABLE IF EXISTS `tbende`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbende` (
  `ENDE_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int NOT NULL,
  `ENDE_LOG` varchar(255) NOT NULL,
  `ENDE_NUM` int DEFAULT NULL,
  `ENDE_COMP` varchar(50) DEFAULT NULL,
  `ENDE_CIDA` varchar(255) NOT NULL,
  `ENDE_UF` varchar(2) NOT NULL,
  `ENDE_CEP` varchar(9) NOT NULL,
  `ENDE_BRR` varchar(255) NOT NULL,
  PRIMARY KEY (`ENDE_ID`),
  KEY `USER_END_FK` (`USER_ID`),
  CONSTRAINT `USER_END_FK` FOREIGN KEY (`USER_ID`) REFERENCES `tbuser` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbende`
--

LOCK TABLES `tbende` WRITE;
/*!40000 ALTER TABLE `tbende` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbende` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblvro`
--

DROP TABLE IF EXISTS `tblvro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblvro` (
  `LVRO_ID` int NOT NULL AUTO_INCREMENT,
  `LVRO_ISBN` varchar(50) NOT NULL,
  `LVRO_TITULO` varchar(255) NOT NULL,
  `LVRO_GEN` varchar(50) NOT NULL,
  `LVRO_PRCO` float NOT NULL,
  `LVRO_QNT_PG` int NOT NULL,
  `LVRO_EDIT` varchar(50) NOT NULL,
  `LVRO_ATR` varchar(255) NOT NULL,
  `LVRO_DT_LANC` date NOT NULL,
  `LVRO_AV` float NOT NULL,
  `LVRO_STT_LT` varchar(50) DEFAULT NULL,
  `LVRO_DN` int NOT NULL,
  `LVRO_QNT` int NOT NULL,
  PRIMARY KEY (`LVRO_ID`),
  KEY `DN_FK` (`LVRO_DN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblvro`
--

LOCK TABLES `tblvro` WRITE;
/*!40000 ALTER TABLE `tblvro` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblvro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbngco`
--

DROP TABLE IF EXISTS `tbngco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbngco` (
  `NGCO_ID` int NOT NULL AUTO_INCREMENT,
  `NGCO_ID_COMP` int NOT NULL,
  `NGCO_ID_VEND` int NOT NULL,
  `NGCO_ID_LVRO` int NOT NULL,
  `NGCO_STT` varchar(50) NOT NULL,
  PRIMARY KEY (`NGCO_ID`),
  KEY `NGCO_ID_COMP_FK` (`NGCO_ID_COMP`),
  KEY `NGCO_ID_VEND_FK` (`NGCO_ID_VEND`),
  KEY `NGCO_ID_LVRO_FK` (`NGCO_ID_LVRO`),
  CONSTRAINT `NGCO_ID_COMP_FK` FOREIGN KEY (`NGCO_ID_COMP`) REFERENCES `tbuser` (`USER_ID`),
  CONSTRAINT `NGCO_ID_LVRO_FK` FOREIGN KEY (`NGCO_ID_LVRO`) REFERENCES `tblvro` (`LVRO_ID`),
  CONSTRAINT `NGCO_ID_VEND_FK` FOREIGN KEY (`NGCO_ID_VEND`) REFERENCES `tbuser` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbngco`
--

LOCK TABLES `tbngco` WRITE;
/*!40000 ALTER TABLE `tbngco` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbngco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbuser`
--

DROP TABLE IF EXISTS `tbuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbuser` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NM` varchar(255) NOT NULL,
  `USER_EMAIL` varchar(255) NOT NULL,
  `USER_FN` varchar(50) NOT NULL,
  `USER_PWD` varchar(255) NOT NULL,
  `USER_CN` varchar(50) NOT NULL,
  `USER_TP` int NOT NULL,
  `USER_FINAN` float DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_EMAIL` (`USER_EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbuser`
--

LOCK TABLES `tbuser` WRITE;
/*!40000 ALTER TABLE `tbuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbuser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 18:26:12
