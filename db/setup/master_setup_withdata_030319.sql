CREATE DATABASE  IF NOT EXISTS `qa_master` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `qa_master`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: rds.coqokg7f9b0o.us-west-1.rds.amazonaws.com    Database: qa_master
-- ------------------------------------------------------
-- Server version	5.7.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `COMPANY`
--

DROP TABLE IF EXISTS `COMPANY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPANY` (
  `COMPANY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMPANY_NAME` varchar(255) NOT NULL,
  `COMPANY_ADDRESS` varchar(255) NOT NULL,
  `PRIMARY_CONTACT` varchar(155) NOT NULL,
  `PRIMARY_CONTACT_EMAIL` varchar(255) NOT NULL,
  `PRIMARY_CONTACT_TEL_NUMBER` varchar(155) NOT NULL,
  `PRIMARY_CONTACT_TITLE` varchar(255) NOT NULL,
  `CREATED_DATE_TIME` datetime NOT NULL,
  `UPDATED_DATE_TIME` datetime NOT NULL,
  `CREATED_BY` int(11) NOT NULL,
  `UPDATED_BY` int(11) NOT NULL,
  PRIMARY KEY (`COMPANY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPANY`
--

LOCK TABLES `COMPANY` WRITE;
/*!40000 ALTER TABLE `COMPANY` DISABLE KEYS */;
INSERT INTO `COMPANY` VALUES (1,'StaffPlan','USA','Admin','admin@staffplan.io','888-555-9021','System Admin','2018-01-01 00:00:00','2018-01-01 00:00:00',1,1),(2,'Acme','USA','Admin','admin@acme.io','888-555-1234','System Admin','2028-11-18 00:00:00','2028-11-18 00:00:00',1,1);
/*!40000 ALTER TABLE `COMPANY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBSCRIBER`
--

DROP TABLE IF EXISTS `SUBSCRIBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SUBSCRIBER` (
  `SUBSCRIBER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMPANY_ID` int(11) NOT NULL,
  `CREATED_DATE` datetime NOT NULL,
  `CREATED_BY_USER` int(11) NOT NULL,
  `DOMAIN_ID` varchar(255) NOT NULL,
  PRIMARY KEY (`SUBSCRIBER_ID`),
  KEY `COMPANY_ID` (`COMPANY_ID`),
  CONSTRAINT `COMPANY_ID` FOREIGN KEY (`COMPANY_ID`) REFERENCES `COMPANY` (`COMPANY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBSCRIBER`
--

LOCK TABLES `SUBSCRIBER` WRITE;
/*!40000 ALTER TABLE `SUBSCRIBER` DISABLE KEYS */;
INSERT INTO `SUBSCRIBER` VALUES (1,1,'2028-11-18 00:00:00',1,'staffplan.io'),(2,2,'2018-11-18 00:00:00',1,'acme.io'),(3,1,'2019-01-15 00:00:00',1,'staffplan.io');
/*!40000 ALTER TABLE `SUBSCRIBER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBSCRIPTION_SERVICE`
--

DROP TABLE IF EXISTS `SUBSCRIPTION_SERVICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SUBSCRIPTION_SERVICE` (
  `SUBSCRIPTION_SERVICE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SUBSCRIBER_ID` int(11) NOT NULL,
  `SUBSCRIPTION_TYPE_ID` int(11) NOT NULL,
  `COUNT` int(11) NOT NULL,
  `CREATED_DATE_TIME` datetime NOT NULL,
  `UPDATED_DATE_TIME` datetime NOT NULL,
  `CREATED_BY` int(11) NOT NULL,
  `UPDATED_BY` int(11) NOT NULL,
  PRIMARY KEY (`SUBSCRIPTION_SERVICE_ID`),
  KEY `SUBSCRIBER_ID` (`SUBSCRIBER_ID`),
  CONSTRAINT `SUBSCRIBER_ID` FOREIGN KEY (`SUBSCRIBER_ID`) REFERENCES `SUBSCRIBER` (`SUBSCRIBER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBSCRIPTION_SERVICE`
--

LOCK TABLES `SUBSCRIPTION_SERVICE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` DISABLE KEYS */;
INSERT INTO `SUBSCRIPTION_SERVICE` VALUES (1,1,1,10,'2019-01-15 00:00:00','2019-01-15 00:00:00',1,1),(2,2,1,10,'2019-01-15 00:00:00','2019-01-15 00:00:00',1,1),(3,3,3,50,'2019-01-15 00:00:00','2019-01-15 00:00:00',1,1);
/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBSCRIPTION_TYPE`
--

DROP TABLE IF EXISTS `SUBSCRIPTION_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SUBSCRIPTION_TYPE` (
  `SUBSCRIPTION_TYPE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SUBSCRIPTION_NAME` varchar(255) NOT NULL,
  `SUBSCRIPTION_DETAILS` varchar(255) NOT NULL,
  `SUBSCRIPTION_PRICING_PER_MONTH` varchar(255) NOT NULL,
  `CREATED_DATE_TIME` datetime NOT NULL,
  `UPDATED_DATE_TIME` datetime NOT NULL,
  `CREATED_BY` int(11) NOT NULL,
  `UPDATED_BY` int(11) NOT NULL,
  PRIMARY KEY (`SUBSCRIPTION_TYPE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBSCRIPTION_TYPE`
--

LOCK TABLES `SUBSCRIPTION_TYPE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` DISABLE KEYS */;
INSERT INTO `SUBSCRIPTION_TYPE` VALUES (1,'StaffPlan All Access','Access to all','110','2019-01-15 00:00:00','2019-01-15 00:00:00',1,1),(2,'Project Access','Access Project','60','2019-01-15 00:00:00','2019-01-15 00:00:00',1,1),(3,'View Access','View data only','30','2019-01-15 00:00:00','2019-01-15 00:00:00',1,1),(4,'Staff Data','Manage Staff data','30','2019-01-15 00:00:00','2019-01-15 00:00:00',1,1);
/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TENANT_DETAILS`
--

DROP TABLE IF EXISTS `TENANT_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TENANT_DETAILS` (
  `TENANT_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SUBSCRIBER_ID` int(11) NOT NULL,
  `TENANT_TYPE_ID` int(11) NOT NULL,
  `START_DATE` date NOT NULL,
  `DOMAIN_ID` varchar(255) NOT NULL,
  `TENANT_STATUS` varchar(155) NOT NULL,
  PRIMARY KEY (`TENANT_ID`),
  KEY `SUBSCRIBER_ID` (`SUBSCRIBER_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TENANT_DETAILS`
--

LOCK TABLES `TENANT_DETAILS` WRITE;
/*!40000 ALTER TABLE `TENANT_DETAILS` DISABLE KEYS */;
INSERT INTO `TENANT_DETAILS` VALUES (1,1,1,'2019-01-15','staffplan.staffplan.io/demo','active'),(2,1,2,'2019-01-15','staffplan.staffplan.io/staging','active'),(3,1,3,'2019-01-15','staffplan.staffplan.io/prod','active'),(4,2,1,'2019-01-15','acme.staffplan.io/demo','active'),(5,3,1,'2019-01-15','staffplan.staffplan.io/demo','active'),(6,3,2,'2019-01-15','staffplan.staffplan.io/staging','active');
/*!40000 ALTER TABLE `TENANT_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TENANT_TYPE`
--

DROP TABLE IF EXISTS `TENANT_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TENANT_TYPE` (
  `TENANT_TYPE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TENANT_DESCRIPTION` varchar(255) NOT NULL,
  `UPDATED_BY` int(11) NOT NULL,
  PRIMARY KEY (`TENANT_TYPE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TENANT_TYPE`
--

LOCK TABLES `TENANT_TYPE` WRITE;
/*!40000 ALTER TABLE `TENANT_TYPE` DISABLE KEYS */;
INSERT INTO `TENANT_TYPE` VALUES (1,'demo',1),(2,'staging',1),(3,'prod',1);
/*!40000 ALTER TABLE `TENANT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'qa_master'
--

--
-- Dumping routines for database 'qa_master'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-03 20:21:01
