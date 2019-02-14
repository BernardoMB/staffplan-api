CREATE DATABASE  IF NOT EXISTS `demo_master` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `demo_master`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: rds.coqokg7f9b0o.us-west-1.rds.amazonaws.com    Database: demo_master
-- ------------------------------------------------------
-- Server version	5.7.23

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SUBSCRIPTION_SERVICE`
--

DROP TABLE IF EXISTS `SUBSCRIPTION_SERVICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SUBSCRIPTION_SERVICE` (
  `SUBSCRIBER_ID` int(11) NOT NULL,
  `SUBSCRIPTION_SERVICE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SUBSCRIPTION_TYPE_ID` int(11) NOT NULL,
  `COUNT` int(11) NOT NULL,
  `CREATED_DATE_TIME` datetime NOT NULL,
  `UPDATED_DATE_TIME` int(11) NOT NULL,
  `CREATED_BY` int(11) NOT NULL,
  `UPDATED_BY` int(11) NOT NULL,
  PRIMARY KEY (`SUBSCRIPTION_SERVICE_ID`),
  KEY `SUBSCRIBER_ID` (`SUBSCRIBER_ID`),
  CONSTRAINT `SUBSCRIBER_ID` FOREIGN KEY (`SUBSCRIBER_ID`) REFERENCES `SUBSCRIBER` (`SUBSCRIBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TENANT_DETAILS`
--

DROP TABLE IF EXISTS `TENANT_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TENANT_DETAILS` (
  `SUBSCRIBER_ID` int(11) NOT NULL,
  `TENANT_TYPE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `START_DATE` date NOT NULL,
  `DOMAIN_ID` varchar(255) NOT NULL,
  `TENANT_STATUS` varchar(155) NOT NULL,
  PRIMARY KEY (`TENANT_TYPE_ID`),
  KEY `SUBSCRIBER_ID` (`SUBSCRIBER_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mysql_migrations_347ertt3e`
--

DROP TABLE IF EXISTS `mysql_migrations_347ertt3e`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mysql_migrations_347ertt3e` (
  `timestamp` varchar(254) NOT NULL,
  UNIQUE KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'demo_master'
--

--
-- Dumping routines for database 'demo_master'
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

-- Dump completed on 2019-02-14 10:33:20
CREATE DATABASE  IF NOT EXISTS `demo_staffplan` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `demo_staffplan`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: rds.coqokg7f9b0o.us-west-1.rds.amazonaws.com    Database: demo_staffplan
-- ------------------------------------------------------
-- Server version	5.7.23

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
-- Table structure for table `ACCESS_TYPE`
--

DROP TABLE IF EXISTS `ACCESS_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ACCESS_TYPE` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ACCESS_TYPE_COMBINATION`
--

DROP TABLE IF EXISTS `ACCESS_TYPE_COMBINATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ACCESS_TYPE_COMBINATION` (
  `ID` int(11) NOT NULL,
  `COMBINATION` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CATEGORY`
--

DROP TABLE IF EXISTS `CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CATEGORY` (
  `CATEGORY_ID` int(10) NOT NULL,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CERTIFICATION_SKILLS`
--

DROP TABLE IF EXISTS `CERTIFICATION_SKILLS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CERTIFICATION_SKILLS` (
  `CERTIFICATION_ID` int(11) NOT NULL,
  `CERTIFICATION_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CERTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CUSTOMER`
--

DROP TABLE IF EXISTS `CUSTOMER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CUSTOMER` (
  `CUSTOMER_ID` varchar(50) NOT NULL,
  `CUSTOMER_NAME` varchar(255) DEFAULT NULL,
  `CUSTOMER_ADDRESS` varchar(255) DEFAULT NULL,
  `CUSTOMER_CITY` varchar(255) DEFAULT NULL,
  `CUSTOMER_STATE` varchar(10) DEFAULT NULL,
  `CUSTOMER_ZIP` varchar(10) DEFAULT NULL,
  `CUSTOMER_CONTACT` varchar(255) DEFAULT NULL,
  `CONTACT_PHONE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CUSTOMER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CUSTOMER_PROJECTS`
--

DROP TABLE IF EXISTS `CUSTOMER_PROJECTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CUSTOMER_PROJECTS` (
  `PROJECT_ID` varchar(255) NOT NULL,
  `CUSTOMER_ID` varchar(255) NOT NULL,
  PRIMARY KEY (`PROJECT_ID`,`CUSTOMER_ID`),
  KEY `FK_CUSTOMER` (`CUSTOMER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CUSTOM_LABEL`
--

DROP TABLE IF EXISTS `CUSTOM_LABEL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CUSTOM_LABEL` (
  `ID` int(11) NOT NULL,
  `TABLE_NAME` varchar(50) NOT NULL,
  `FIELD_NAME` varchar(50) NOT NULL,
  `CUSTOM_FIELD` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OFFICE`
--

DROP TABLE IF EXISTS `OFFICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OFFICE` (
  `OFFICE_ID` varchar(255) NOT NULL,
  `OFFICE_NAME` varchar(255) DEFAULT NULL,
  `OFFICE_ADDRESS` varchar(255) DEFAULT NULL,
  `OFFICE_CITY` varchar(255) NOT NULL,
  `OFFICE_STATE` varchar(10) DEFAULT NULL,
  `OFFICE_ZIP` varchar(10) DEFAULT NULL,
  `OFFICE_TYPE` varchar(50) DEFAULT NULL,
  `REGION_ID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PLANNED_PROJECT_PEOPLE`
--

DROP TABLE IF EXISTS `PLANNED_PROJECT_PEOPLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PLANNED_PROJECT_PEOPLE` (
  `ID` int(11) NOT NULL,
  `PROJECT_ID` varchar(40) NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `ALLOCATION` float(8,2) NOT NULL,
  `PROJECT_ROLE_ID` int(10) NOT NULL,
  `ASSIGNMENT_DURATION` int(10) DEFAULT NULL,
  `CONFIRMED` tinyint(1) DEFAULT NULL,
  `NEXT_AVAILABLE` date DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT`
--

DROP TABLE IF EXISTS `PROJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT` (
  `PROJECT_ID` varchar(255) NOT NULL,
  `GROUP_ID` int(11) NOT NULL,
  `PROJECT_NO` varchar(255) NOT NULL,
  `PROJECT_NAME` varchar(255) NOT NULL,
  `PROJECT_ROM` varchar(20) DEFAULT NULL,
  `PROJECT_ADDRESS` varchar(255) DEFAULT NULL,
  `PROJECT_CITY` varchar(255) DEFAULT NULL,
  `PROJECT_STATE` varchar(255) DEFAULT NULL,
  `PROJECT_ZIP` varchar(10) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `PROJECT_DURATION` int(10) DEFAULT NULL,
  `PROJECT_STATUS_ID` int(10) DEFAULT NULL,
  `PROJECT_TYPE_ID` int(10) DEFAULT NULL,
  `OFFICE_ID` varchar(255) DEFAULT NULL,
  `CATEGORY_ID` int(11) NOT NULL,
  `PROJECT_DESCRIPTION` text,
  `TIMELINE_TYPE` enum('1','2') DEFAULT NULL COMMENT '"1": "Estimated" , "2":"Confirmed"'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT_GROUP`
--

DROP TABLE IF EXISTS `PROJECT_GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT_GROUP` (
  `GROUP_ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT_PEOPLE`
--

DROP TABLE IF EXISTS `PROJECT_PEOPLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT_PEOPLE` (
  `STAFF_ID` varchar(255) NOT NULL,
  `PROJECT_ID` varchar(40) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `ALLOCATION` float(8,2) DEFAULT NULL,
  `PROJECT_ROLE_ID` int(10) DEFAULT NULL,
  `ASSIGNMENT_DURATION` int(10) DEFAULT NULL,
  `CONFIRMED` char(1) DEFAULT NULL,
  `NEXT_AVAILABLE` date DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true',
  `EXPERIENCE_ID` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT_STATUS`
--

DROP TABLE IF EXISTS `PROJECT_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT_TYPE`
--

DROP TABLE IF EXISTS `PROJECT_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT_TYPE` (
  `TYPE_ID` int(10) NOT NULL,
  `TYPE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `REGION`
--

DROP TABLE IF EXISTS `REGION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `REGION` (
  `REGION_ID` int(10) NOT NULL,
  `REGION_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ROLE`
--

DROP TABLE IF EXISTS `ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROLE` (
  `ID` int(11) NOT NULL,
  `ROLE_NAME` varchar(255) NOT NULL,
  `COMBINATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF`
--

DROP TABLE IF EXISTS `STAFF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF` (
  `STAFF_ID` varchar(255) NOT NULL,
  `FIRST_NAME` varchar(255) NOT NULL,
  `MIDDLE_INITIAL` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) NOT NULL,
  `PREFERRED_NAME` varchar(255) DEFAULT NULL,
  `EMAIL_ID` varchar(255) DEFAULT NULL,
  `PHONE_1` varchar(255) DEFAULT NULL,
  `PHONE_1_TYPE` varchar(255) DEFAULT NULL,
  `PHONE_2` varchar(255) DEFAULT NULL,
  `PHONE_2_TYPE` varchar(255) DEFAULT NULL,
  `HOME_CITY` varchar(255) DEFAULT NULL,
  `HOME_STATE` varchar(255) DEFAULT NULL,
  `HOME_ZIP` varchar(255) DEFAULT NULL,
  `STAFF_CERTIFICATION` char(1) DEFAULT 'N',
  `STAFF_TRAINING` char(1) DEFAULT 'N',
  `STAFF_PHOTO` varchar(255) DEFAULT NULL,
  `STAFF_ROLE_ID` int(10) DEFAULT NULL,
  `STAFF_GROUP_ID` int(10) DEFAULT NULL,
  `STAFF_STATUS_ID` int(10) DEFAULT NULL,
  `OFFICE_ID` varchar(255) DEFAULT NULL,
  `EMPLOYMENT_START_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF_CERTIFICATION`
--

DROP TABLE IF EXISTS `STAFF_CERTIFICATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF_CERTIFICATION` (
  `STAFF_ID` varchar(255) NOT NULL,
  `CERTIFICATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF_EXPERIENCE`
--

DROP TABLE IF EXISTS `STAFF_EXPERIENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF_EXPERIENCE` (
  `EXPERIENCE_ID` int(11) NOT NULL,
  `EXPERIENCE_LABEL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF_GROUP`
--

DROP TABLE IF EXISTS `STAFF_GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF_GROUP` (
  `GROUP_ID` int(10) NOT NULL,
  `GROUP_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF_ROLE`
--

DROP TABLE IF EXISTS `STAFF_ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF_ROLE` (
  `ROLE_ID` int(10) NOT NULL,
  `ROLE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAFF_STATUS`
--

DROP TABLE IF EXISTS `STAFF_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAFF_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL,
  `ROLE_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(45) NOT NULL,
  `MIDDLE_NAME` varchar(45) NOT NULL,
  `LAST_NAME` varchar(45) NOT NULL,
  `EMAIL` varchar(155) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `VERIFIED` enum('true','false') NOT NULL,
  `ADDRESS` varchar(255) NOT NULL,
  `CITY` varchar(100) NOT NULL,
  `COUNTRY` varchar(255) NOT NULL,
  `ZIP` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_ACCESS`
--

DROP TABLE IF EXISTS `USER_ACCESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_ACCESS` (
  `ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `OFFICE_ID` varchar(255) DEFAULT NULL,
  `REGION_ID` int(11) NOT NULL,
  `DIVISION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'demo_staffplan'
--

--
-- Dumping routines for database 'demo_staffplan'
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

-- Dump completed on 2019-02-14 10:33:29
