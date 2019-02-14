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
-- Dumping data for table `COMPANY`
--

LOCK TABLES `COMPANY` WRITE;
/*!40000 ALTER TABLE `COMPANY` DISABLE KEYS */;
INSERT INTO `COMPANY` VALUES (1,'StaffPlan','USA','Acme Admin','admin@staffplan.io','888-555-9021','System Admin','2028-11-18 00:00:00','0000-00-00 00:00:00',1,0);
/*!40000 ALTER TABLE `COMPANY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SUBSCRIBER`
--

LOCK TABLES `SUBSCRIBER` WRITE;
/*!40000 ALTER TABLE `SUBSCRIBER` DISABLE KEYS */;
INSERT INTO `SUBSCRIBER` VALUES (1,1,'2028-11-18 00:00:00',1,'staffplan.io');
/*!40000 ALTER TABLE `SUBSCRIBER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SUBSCRIPTION_SERVICE`
--

LOCK TABLES `SUBSCRIPTION_SERVICE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` DISABLE KEYS */;
/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SUBSCRIPTION_TYPE`
--

LOCK TABLES `SUBSCRIPTION_TYPE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` DISABLE KEYS */;
/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `TENANT_DETAILS`
--

LOCK TABLES `TENANT_DETAILS` WRITE;
/*!40000 ALTER TABLE `TENANT_DETAILS` DISABLE KEYS */;
/*!40000 ALTER TABLE `TENANT_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `TENANT_TYPE`
--

LOCK TABLES `TENANT_TYPE` WRITE;
/*!40000 ALTER TABLE `TENANT_TYPE` DISABLE KEYS */;
/*!40000 ALTER TABLE `TENANT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mysql_migrations_347ertt3e`
--

LOCK TABLES `mysql_migrations_347ertt3e` WRITE;
/*!40000 ALTER TABLE `mysql_migrations_347ertt3e` DISABLE KEYS */;
/*!40000 ALTER TABLE `mysql_migrations_347ertt3e` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2019-02-14 10:32:34
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
-- Dumping data for table `ACCESS_TYPE`
--

LOCK TABLES `ACCESS_TYPE` WRITE;
/*!40000 ALTER TABLE `ACCESS_TYPE` DISABLE KEYS */;
INSERT INTO `ACCESS_TYPE` VALUES (1,'View'),(2,'Edit'),(3,'Delete'),(4,'Add'),(5,'Add Staff'),(6,'Add Project'),(7,'Edit Project'),(8,'Edit Staff'),(9,'Delete Staff'),(10,'Delete Project');
/*!40000 ALTER TABLE `ACCESS_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ACCESS_TYPE_COMBINATION`
--

LOCK TABLES `ACCESS_TYPE_COMBINATION` WRITE;
/*!40000 ALTER TABLE `ACCESS_TYPE_COMBINATION` DISABLE KEYS */;
INSERT INTO `ACCESS_TYPE_COMBINATION` VALUES (1,'[1,2]'),(3,'[2,3,4,1,6]'),(4,'[2,3,4]'),(5,'[6,7]');
/*!40000 ALTER TABLE `ACCESS_TYPE_COMBINATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CATEGORY`
--

LOCK TABLES `CATEGORY` WRITE;
/*!40000 ALTER TABLE `CATEGORY` DISABLE KEYS */;
INSERT INTO `CATEGORY` VALUES (1,'Healthcare'),(2,'Retail'),(3,'Technology'),(4,'Education'),(5,'Life Science'),(6,'Self Perform'),(7,'Sports Venues'),(8,'Semi Conductor'),(9,'Manufacturing & Supply Chain'),(10,'Mission Critical'),(11,'Hospitality'),(12,'Cultural/Historic'),(13,'Entertainment'),(14,'Corporate');
/*!40000 ALTER TABLE `CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CERTIFICATION_SKILLS`
--

LOCK TABLES `CERTIFICATION_SKILLS` WRITE;
/*!40000 ALTER TABLE `CERTIFICATION_SKILLS` DISABLE KEYS */;
INSERT INTO `CERTIFICATION_SKILLS` VALUES (1,'Title 24'),(2,'OSHPD'),(3,'PMI Certification'),(4,'LEED'),(5,'OSHA');
/*!40000 ALTER TABLE `CERTIFICATION_SKILLS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CUSTOMER`
--

LOCK TABLES `CUSTOMER` WRITE;
/*!40000 ALTER TABLE `CUSTOMER` DISABLE KEYS */;
INSERT INTO `CUSTOMER` VALUES ('CID_001','Asheville Medical Center','NULL','NULL','NULL','NULL','John Smith','NULL'),('CID_002','Alexandria General Hospital','NULL','NULL','NULL','NULL','Jim Bob','NULL'),('CID_003','Techno Data Systems','NULL','NULL','NULL','NULL','Jason Hendricks','NULL'),('CID_004','Apricot Development Companies','NULL','NULL','NULL','NULL','Hedda Herring','NULL'),('CID_005','British Telecom','NULL','NULL','NULL','NULL','Jada Maldonado','NULL'),('CID_006','Digital Broadcast','NULL','NULL','NULL','NULL','August McLeod','NULL'),('CID_007','Technology Virtual Center','NULL','NULL','NULL','NULL','Prescott Jacobson','NULL'),('CID_008','Ops Technology','NULL','NULL','NULL','NULL','Shelly Hahn','NULL'),('CID_009','Rufus Companies','NULL','NULL','NULL','NULL','Wade Burnett','NULL'),('CID_010','Equinox','NULL','NULL','NULL','NULL','Emery Shannon','NULL'),('CID_011','Northhampton Companies','NULL','NULL','NULL','NULL','Candice McCall','NULL'),('CID_012','Quint Health Center','NULL','NULL','NULL','NULL','Anthony Owen','NULL'),('CID_013','Wolfe Health Medical Center','NULL','NULL','NULL','NULL','Tate Edwards','NULL'),('CID_014','Velocity 5','NULL','NULL','NULL','NULL','Calvin Ewing','NULL'),('CID_015','Ocean Hills Development Co','NULL','NULL','NULL','NULL','Brady Sharpe','NULL'),('CID_016','MedLife Science','NULL','NULL','NULL','NULL','Lionel Henson','NULL'),('CID_017','Communication 100','NULL','NULL','NULL','NULL','Clayton Osborne','NULL'),('CID_018','Charleston Regional Hospital','NULL','NULL','NULL','NULL','Rogan Irwin','NULL'),('CID_019','Georgetown Medical Center','NULL','NULL','NULL','NULL','Alexa Sweeney','NULL'),('CID_020','Open Plaza','NULL','NULL','NULL','NULL','Burke Nieves','NULL'),('CID_021','Wunderlist Technology Center','NULL','NULL','NULL','NULL','Nathan Bell','NULL'),('CID_022','QZ Inc','NULL','NULL','NULL','NULL','Kay Jarvis','NULL'),('CID_023','Omni Inc','NULL','NULL','NULL','NULL','Sherman Griffith','NULL'),('CID_024','Maryland Regional Health Care','NULL','NULL','NULL','NULL','Shelby Schwartz','NULL'),('CID_025','TechOps Inc','NULL','NULL','NULL','NULL','Kim Baxter','NULL'),('CID_026','High Street Corp','NULL','NULL','NULL','NULL','Tucker Moreno','NULL'),('CID_027','All Sciences Inc','NULL','NULL','NULL','NULL','Alan Boyle','NULL'),('CID_028','Georgetown Medical Center','NULL','NULL','NULL','NULL','Regina Pierce','NULL'),('CID_029','San Andreas Community College','NULL','NULL','NULL','NULL','Matthew Spence','NULL'),('CID_030','Allentown University','NULL','NULL','NULL','NULL','Dale Henry','NULL');
/*!40000 ALTER TABLE `CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CUSTOMER_PROJECTS`
--

LOCK TABLES `CUSTOMER_PROJECTS` WRITE;
/*!40000 ALTER TABLE `CUSTOMER_PROJECTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `CUSTOMER_PROJECTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `CUSTOM_LABEL`
--

LOCK TABLES `CUSTOM_LABEL` WRITE;
/*!40000 ALTER TABLE `CUSTOM_LABEL` DISABLE KEYS */;
INSERT INTO `CUSTOM_LABEL` VALUES (0,'STAFF','PREFERRED_NAME','NAME'),(2,'OFFICE','OFFICE_NAME','Office');
/*!40000 ALTER TABLE `CUSTOM_LABEL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `OFFICE`
--

LOCK TABLES `OFFICE` WRITE;
/*!40000 ALTER TABLE `OFFICE` DISABLE KEYS */;
INSERT INTO `OFFICE` VALUES ('OID_001','TBD','TBD','TBD','','','',1),('OID_002','Phoenix','580 Forest Avenue','Phoenix','AZ','85001','',2),('OID_003','Austin','1791 Gold Cliff Circle','Austin','TX','73301','',2),('OID_004','Boston','4044 Stadium Drive','Boston','MA','2110','',2),('OID_005','Chicago','4100 Federal Road','Chicago','IL','60631','',4),('OID_006','Madison','675 Comfort Court','Madison','WI','53718','',4),('OID_007','Los Angeles','1834 Woodstock Drive','Los Angeles','CA','90014','',6),('OID_008','Seattle','3136 Raccoon Run','Seattle','WA','98101','',6),('OID_009','Atlanta','2487 Stroop Hill Road','Atlanta','GA','30303','',3),('OID_010','Detroit','3483 State Street','Detroit','MI','48213','',4),('OID_011','Raleigh','747 Johnson Street','Raleigh','NC','27604','',3),('OID_012','Philadelphia','3045 Young Road','Philadelphia','PA','19144','',2),('OID_013','Miami','4246 Ridenour Street','Miami','FL','33169','',3),('OID_014','Baltimore','2433 Hickory Heights Drive','Baltimore','MD','21201','',2);
/*!40000 ALTER TABLE `OFFICE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PLANNED_PROJECT_PEOPLE`
--

LOCK TABLES `PLANNED_PROJECT_PEOPLE` WRITE;
/*!40000 ALTER TABLE `PLANNED_PROJECT_PEOPLE` DISABLE KEYS */;
INSERT INTO `PLANNED_PROJECT_PEOPLE` VALUES (1,'PID_004','2018-02-02','2020-12-30',100.00,8,NULL,NULL,NULL,'0'),(0,'PID_027','2019-02-18','2020-09-01',100.00,7,NULL,NULL,NULL,'0');
/*!40000 ALTER TABLE `PLANNED_PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT`
--

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;
INSERT INTO `PROJECT` VALUES ('PID_001',1,'SP_001','Ashville Regional Medical Center','17300000','34 North St','Arlington','VA','20330','2017-08-08','2020-08-20',NULL,3,10,'OID_001',1,'','2'),('PID_002',1,'SP_002','General Hospital Center - Suite 100','21300000','44 Lake St','Alexandria','VA','22306','2018-03-01','2020-11-15',NULL,3,10,'OID_001',1,'','2'),('PID_003',1,'SP_003','Tech Data Center - East Center','12700000','4312  Pennsylvania Ave','Bethesda','MD','20810','2018-07-01','2019-08-15',NULL,3,6,'OID_001',3,'','2'),('PID_004',2,'SP_004','Apricot West Suites 110 & 210','8100000','45  5th Avenue','Fredrick','MD','21701','2018-02-02','2020-12-30',NULL,3,2,'OID_014',14,'','2'),('PID_005',1,'SP_005','BT Data Center 2201','8000000','67  Park Ave','Gaithesburg','MD','20697','2018-02-17','2020-02-01',NULL,10,6,'OID_001',3,'','2'),('PID_006',1,'SP_006','Broadcast Data Center','8000000','99  West St','Reston','VA','20170','2018-06-01','2019-12-01',NULL,3,6,'OID_001',3,'','2'),('PID_007',1,'SP_007','Tech Virtual Ware - Project Mountain','16800000','44  Blue Bay','Rockville','MD','20847','2018-01-01','2019-12-31',NULL,3,8,'OID_001',3,'','2'),('PID_008',1,'SP_008','Operation Data Center','9300000','1000  1st Street','Silver Spring','MD','20815','2018-04-15','2019-12-31',NULL,3,6,'OID_001',3,'','2'),('PID_009',1,'SP_009','Rufus Data Center','12700000','45  Michigan Ave','Arlington','VA','20330','2018-01-05','2019-09-15',NULL,3,6,'OID_001',3,'','2'),('PID_010',1,'SP_010','Equinox Data Center','9000000','44  Broad St','Alexandria','VA','22306','2018-05-01','2019-12-15',NULL,3,6,'OID_001',3,'','2'),('PID_011',1,'SP_011','Northhampton Data Center','8700000','34  North St','Bethesda','MD','20810','2018-11-17','2019-11-01',NULL,10,6,'OID_001',2,'','2'),('PID_012',1,'SP_012','Quint Health Center','16800000','44  Lake St','Fredrick','MD','21701','2018-07-22','2019-09-08',NULL,10,2,'OID_001',1,'','2'),('PID_013',1,'SP_013','Wolfe Health Data Center','7800000','4312  Pennsylvania Ave','Gaithesburg','MD','20697','2017-02-24','2019-09-11',NULL,3,6,'OID_001',1,'','2'),('PID_014',1,'SP_014','Velocity 5  - WV Project','3000000','45  5th Avenue','Reston','VA','20170','2017-04-15','2019-11-01',NULL,3,5,'OID_001',5,'','2'),('PID_015',1,'SP_015','Ocean City Hills - Tenant Interiors','9300000','67  Park Ave','Rockville','MD','20847','2017-12-01','2019-11-21',NULL,3,8,'OID_001',12,'','2'),('PID_016',1,'SP_016','MedLife Science Data Center','34400000','99  West St','Silver Spring','MD','20815','2017-04-07','2019-06-01',NULL,3,6,'OID_001',1,'','2'),('PID_017',2,'SP_017','Communication 100','16100000','44  Blue Bay','Arlington','VA','20330','2017-10-07','2019-09-01',NULL,3,4,'OID_001',8,'','2'),('PID_018',2,'SP_018','Charleston Regional Hospital','3000000','1000  1st Street','Alexandria','VA','22306','2018-04-21','2019-07-31',NULL,10,5,'OID_001',1,'','2'),('PID_019',1,'SP_019','Georgetown Med Center TI','3000000','45  Michigan Ave','Bethesda','MD','20810','2017-08-21','2019-10-31',NULL,3,10,'OID_001',1,'','2'),('PID_020',1,'SP_020','Open Plaza','8000000','44  Broad St','Fredrick','MD','21701','2018-01-01','2019-12-01',NULL,3,3,'OID_001',2,'','2'),('PID_021',1,'SP_021','Wunderlist Technology Center','7000000','34  North St','Gaithesburg','MD','20697','2018-05-01','2019-03-31',0,10,1,'OID_001',1,'','2'),('PID_022',1,'SP_022','QZ Data Center','8000000','44  Lake St','Reston','VA','20170','2018-05-01','2019-12-01',NULL,3,6,'OID_001',3,'','2'),('PID_023',1,'SP_023','Omni Data Center','92300000','4312  Pennsylvania Ave','Rockville','MD','20847','2017-11-01','2019-12-31',NULL,3,6,'OID_001',3,'','2'),('PID_024',1,'SP_024','Regional ER - OR Remodel','29600000','45  5th Avenue','Silver Spring','MD','20815','2017-05-19','2019-12-19',NULL,3,10,'OID_001',1,'','2'),('PID_025',1,'SP_025','TechOps Center','9000000','67  Park Ave','Arlington','VA','20330','2018-12-01','2019-12-01',NULL,3,1,'OID_014',1,'','2'),('PID_026',2,'SP_026','High Street Corp Campus','14000000','99  West St','Alexandria','VA','22306','2019-02-01','2020-10-15',NULL,3,2,'OID_014',2,'','2'),('PID_027',2,'SP_027','All Sciences Technology Center','58000000','44  Blue Bay','Bethesda','MD','20810','2019-02-01','2020-10-01',NULL,3,5,'OID_014',4,'','2'),('PID_028',1,'SP_028','Georgetown Urgent Care','100000000','1000  1st Street','Fredrick','MD','21701','2019-03-15','2021-12-31',NULL,2,1,'OID_011',1,'','1'),('PID_029',1,'SP_029','Lake Travis Community Center','22300000','2120 Lakeshore Dr','Austin','TX','73301','2018-04-01','2020-03-01',NULL,3,1,'OID_003',7,'','2'),('PID_030',1,'10004','Testing Project','6',NULL,NULL,NULL,NULL,'2018-03-28','2020-01-28',NULL,3,1,'OID_001',1,'','2'),('PID_031',2,'2019ABC','Testing Again','100000',NULL,NULL,NULL,NULL,'2019-02-13','2020-02-13',NULL,3,1,'OID_014',7,'','2');
/*!40000 ALTER TABLE `PROJECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_GROUP`
--

LOCK TABLES `PROJECT_GROUP` WRITE;
/*!40000 ALTER TABLE `PROJECT_GROUP` DISABLE KEYS */;
INSERT INTO `PROJECT_GROUP` VALUES (1,'TBD'),(2,'Operations'),(3,'SPW');
/*!40000 ALTER TABLE `PROJECT_GROUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_PEOPLE`
--

LOCK TABLES `PROJECT_PEOPLE` WRITE;
/*!40000 ALTER TABLE `PROJECT_PEOPLE` DISABLE KEYS */;
INSERT INTO `PROJECT_PEOPLE` VALUES ('EID_015','PID_027','2019-02-01','2020-10-01',100.00,7,NULL,NULL,NULL,'0',NULL),('EID_086','PID_030','2019-01-01','2019-02-15',100.00,8,NULL,NULL,NULL,'0',NULL),('EID_086','PID_031','2019-06-13','2020-02-13',100.00,8,NULL,NULL,NULL,'0',NULL),('EID_015','PID_031','2019-02-12','2020-02-12',100.00,8,NULL,NULL,NULL,'0',NULL),('EID_086','PID_031','2019-03-13','2020-02-13',100.00,8,NULL,NULL,NULL,'0',NULL),('EID_001','PID_031','2019-02-13','2020-02-13',100.00,8,NULL,NULL,NULL,'0',NULL);
/*!40000 ALTER TABLE `PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_STATUS`
--

LOCK TABLES `PROJECT_STATUS` WRITE;
/*!40000 ALTER TABLE `PROJECT_STATUS` DISABLE KEYS */;
INSERT INTO `PROJECT_STATUS` VALUES (1,'Proposal'),(2,'Potential'),(3,'In Progress'),(4,'Completed'),(5,'Closed'),(6,'Lost'),(7,'Hold'),(8,'Archive'),(9,'TBD'),(10,'Pre-Con');
/*!40000 ALTER TABLE `PROJECT_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_TYPE`
--

LOCK TABLES `PROJECT_TYPE` WRITE;
/*!40000 ALTER TABLE `PROJECT_TYPE` DISABLE KEYS */;
INSERT INTO `PROJECT_TYPE` VALUES (1,'TBD'),(2,'Multi-Story Office Building'),(3,'Retail Space'),(4,'Warehouse'),(5,'Lab'),(6,'Data Center'),(7,'Tenant Improvement'),(8,'Corporate Office'),(9,'Student Center'),(10,'Hospital');
/*!40000 ALTER TABLE `PROJECT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `REGION`
--

LOCK TABLES `REGION` WRITE;
/*!40000 ALTER TABLE `REGION` DISABLE KEYS */;
INSERT INTO `REGION` VALUES (1,'TBD'),(2,'Northeast'),(3,'SouthEast'),(4,'Midwest'),(5,'South'),(6,'West'),(7,'Southwest');
/*!40000 ALTER TABLE `REGION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ROLE`
--

LOCK TABLES `ROLE` WRITE;
/*!40000 ALTER TABLE `ROLE` DISABLE KEYS */;
INSERT INTO `ROLE` VALUES (1,'All Company Access',1),(2,'Regional Access',1),(3,'Admin',1);
/*!40000 ALTER TABLE `ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF`
--

LOCK TABLES `STAFF` WRITE;
/*!40000 ALTER TABLE `STAFF` DISABLE KEYS */;
INSERT INTO `STAFF` VALUES ('EID_001','Andrew','','Gill','Andy','andrew.gill@acme.com','888-123-4567','Cell','877-234-5678','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_002','Annette','','Schumaker','Ann','annette.schumaker@acme.com','888-123-4568','Cell','877-234-5679','Alternate','Arlington','VA','20330','','','EID_002',3,1,1,'OID_003','0000-00-00'),('EID_003','Anthony','','Smith','Tony','anthony.smith@acme.com','888-123-4569','Cell','877-234-5680','Alternate','Rockville','MD','20847','','','EID_003',4,1,1,'OID_003','0000-00-00'),('EID_004','Anthony','','Mansfield','','anthony.mansfield@acme.com','888-123-4570','Cell','877-234-5681','Alternate','Fredrick','MD','21701','','','',6,1,1,'OID_003','0000-00-00'),('EID_005','Armand','','Neuman','','armand.neuman@acme.com','888-123-4571','Cell','877-234-5682','Alternate','Bethesda','MD','20810','','','',7,1,1,'OID_003','0000-00-00'),('EID_006','Braden','','Eichler','','braden.eichler@acme.com','888-123-4572','Cell','877-234-5683','Alternate','Fredrick','MD','21701','','','',7,1,1,'OID_003','0000-00-00'),('EID_007','Bradley','','Schmidt','Brad','bradley.schmidt@acme.com','888-123-4573','Cell','877-234-5684','Alternate','Gaithesburg','MD','20697','','','',7,1,1,'OID_003','0000-00-00'),('EID_008','Brandi','','Hartwick','','brandi.hartwick@acme.com','888-123-4574','Cell','877-234-5685','Alternate','Rockville','MD','20847','','','EID_008',6,1,1,'OID_003','0000-00-00'),('EID_009','Brenda','G','Cohen','','brenda.cohen@acme.com','888-123-4575','Cell','877-234-5686','Alternate','Reston','VA','20170','','','EID_009',6,1,1,'OID_003','0000-00-00'),('EID_010','Bridget','','Shultz','','bridget.schultz@acme.com','888-123-4576','Cell','877-234-5687','Alternate','Rockville','MD','20847','','','EID_010',5,1,1,'OID_003','0000-00-00'),('EID_011','Brody','','Cauldfield','','brody.cauldfield@acme.com','888-123-4577','Cell','877-234-5688','Alternate','Gaithesburg','MD','20697','','','',6,1,1,'OID_003','0000-00-00'),('EID_012','Caesar','','Morris','','caesar.morris@acme.com','888-123-4578','Cell','877-234-5689','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_013','Callan','','Williams','','callan.williams@acme.com','888-123-4579','Cell','877-234-5690','Alternate','Silver Spring','MD','20815','','','',6,1,1,'OID_003','0000-00-00'),('EID_014','Chad','L','Morris','','chad.morris@acme.com','888-123-4580','Cell','877-234-5691','Alternate','Silver Spring','MD','20815','','','EID_014',4,1,1,'OID_003','0000-00-00'),('EID_015','Charles','','Talbot','Chuck','charles.talbot@acme.com','888-123-4581','Cell','877-234-5692','Alternate','Alexandria','VA','22306','','','',8,1,1,'OID_014','0000-00-00'),('EID_016','Chase','','Moore','','chase.moore@acme.com','888-123-4582','Cell','877-234-5693','Alternate','Reston','VA','20170','','','',7,1,1,'OID_003','0000-00-00'),('EID_017','Christian','','Maher','','christian.maher@acme.com','888-123-4583','Cell','877-234-5694','Alternate','Arlington','VA','20330','','','EID_017',4,1,1,'OID_003','0000-00-00'),('EID_018','Christopher','','Campbell','Chris','christopher.campbell@acme.com','888-123-4584','Cell','877-234-5695','Alternate','Bethesda','MD','20810','','','',9,1,1,'OID_003','0000-00-00'),('EID_019','Cody','','Maher','','cody.maher@acme.com','888-123-4585','Cell','877-234-5696','Alternate','Arlington','VA','20330','','','',6,1,1,'OID_003','0000-00-00'),('EID_020','Dan','','Gollet','','dan.gollet@acme.com','888-123-4586','Cell','877-234-5697','Alternate','Arlington','VA','20330','','','',10,1,1,'OID_003','0000-00-00'),('EID_021','Darrin','','Jackson','','darrin.jackson@acme.com','888-123-4587','Cell','877-234-5698','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_022','Dave','','Robbins','','dave.robbins@acme.com','888-123-4588','Cell','877-234-5699','Alternate','Reston','VA','20170','','','',9,1,1,'OID_003','0000-00-00'),('EID_023','David','','Newberry','Dave','david.newberry@acme.com','888-123-4589','Cell','877-234-5700','Alternate','Alexandria','VA','22306','','','',6,1,1,'OID_003','0000-00-00'),('EID_024','Don','','Brockfield','','dob.brockfield@acme.com','888-123-4590','Cell','877-234-5701','Alternate','Alexandria','VA','22306','','','',10,1,1,'OID_003','0000-00-00'),('EID_025','Donald','','Eishenhower','Don','donald.eisenhower@acme.com','888-123-4591','Cell','877-234-5702','Alternate','Alexandria','VA','22306','','','EID_025',4,1,1,'OID_003','0000-00-00'),('EID_026','Dorreen','','Winchester','','dorreen.winchester@acme.com','888-123-4592','Cell','877-234-5703','Alternate','Alexandria','VA','22306','','','EID_026',3,1,1,'OID_003','0000-00-00'),('EID_027','Douglas','','Bowman','Doug','douglas.bowman@acme.com','888-123-4593','Cell','877-234-5704','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_028','Edward','','Tudor','Ed','edward.tudor@acme.com','888-123-4594','Cell','877-234-5705','Alternate','Rockville','MD','20847','','','',9,1,1,'OID_003','0000-00-00'),('EID_029','Eliza','B','Darwin','Liz','eliza.darwin@acme.com','888-123-4595','Cell','877-234-5706','Alternate','Bethesda','MD','20810','','','',8,1,1,'OID_003','0000-00-00'),('EID_030','Emma','','Covington','','emma.covington@acme.com','888-123-4596','Cell','877-234-5707','Alternate','Fredrick','MD','21701','','','',8,1,1,'OID_003','0000-00-00'),('EID_031','Erik','','Ramsey','','erik.ramsey@acme.com','888-123-4597','Cell','877-234-5708','Alternate','Bethesda','MD','20810','','','',6,1,1,'OID_003','0000-00-00'),('EID_032','Eron','','Flynn','','eron.flynn@acme.com','888-123-4598','Cell','877-234-5709','Alternate','Gaithesburg','MD','20697','','','',8,1,1,'OID_003','0000-00-00'),('EID_033','Ferdinand','','Churchill','Fred','ferdinand.churchill@acme.com','888-123-4599','Cell','877-234-5710','Alternate','Fredrick','MD','21701','','','',6,1,1,'OID_003','0000-00-00'),('EID_034','Grant','','Orwell','','grant.orwell@acme.com','888-123-4600','Cell','877-234-5711','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_035','Greg','','Orlitz','','greg.orlitz@acme.com','888-123-4601','Cell','877-234-5712','Alternate','Silver Spring','MD','20815','','','',9,1,1,'OID_003','0000-00-00'),('EID_037','Jacob','','Feddero','Jake','jacob.feddero@acme.com','888-123-4603','Cell','877-234-5714','Alternate','Reston','VA','20170','','','',8,1,1,'OID_003','0000-00-00'),('EID_038','Jaeger','','Bronte','','jaeger.bronte@acme.com','888-123-4604','Cell','877-234-5715','Alternate','Rockville','MD','20847','','','',8,1,1,'OID_003','0000-00-00'),('EID_039','Janice','','Poppins','','janice.poppins@acme.com','888-123-4605','Cell','877-234-5716','Alternate','Silver Spring','MD','20815','','','EID_039',5,1,1,'OID_003','0000-00-00'),('EID_040','Jerome','O','Feliz','Jerry','jerome.feliz@acme.com','888-123-4606','Cell','877-234-5717','Alternate','Bethesda','MD','20810','','','',9,1,1,'OID_003','0000-00-00'),('EID_041','Jerri','','McCarty','','jerri.mccarty@acme.com','888-123-4607','Cell','877-234-5718','Alternate','Arlington','VA','20330','','','EID_041',5,1,1,'OID_003','0000-00-00'),('EID_042','Jim','','Luther','','jim.luther@acme.com','888-123-4608','Cell','877-234-5719','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_043','John','','Lennon','','john.lennon@acme.com','888-123-4609','Cell','877-234-5720','Alternate','Rockville','MD','20847','','','',7,1,1,'OID_003','0000-00-00'),('EID_044','Josef','','Speer','','josef.speer@acme.com','888-123-4610','Cell','877-234-5721','Alternate','Bethesda','MD','20810','','','',10,1,1,'OID_003','0000-00-00'),('EID_045','Josie','','Belk','','josie.belk@acme.com','888-123-4611','Cell','877-234-5722','Alternate','Reston','VA','20170','','','EID_045',2,1,1,'OID_003','0000-00-00'),('EID_046','Karen','','Coutinho','','karen.coutinho@acme.com','888-123-4612','Cell','877-234-5723','Alternate','Alexandria','VA','22306','','','',5,1,1,'OID_003','0000-00-00'),('EID_047','Karl','A','Shilpberg','','karl.shilpberg@acme.com','888-123-4613','Cell','877-234-5724','Alternate','Silver Spring','MD','20815','','','',8,1,1,'OID_003','0000-00-00'),('EID_048','Kate','','Jefferson','','kate.jefferson@acme.com','888-123-4614','Cell','877-234-5725','Alternate','Bethesda','MD','20810','','','EID_048',3,1,1,'OID_003','0000-00-00'),('EID_049','Kim','','Kardin','','kim.kardin@acme.com','888-123-4615','Cell','877-234-5726','Alternate','Arlington','VA','20330','','','',8,1,1,'OID_003','0000-00-00'),('EID_050','Klein','','Henrick','','klein.henrick@acme.com','888-123-4616','Cell','877-234-5727','Alternate','Alexandria','VA','22306','','','',8,1,1,'OID_003','0000-00-00'),('EID_051','Kyle','','Paloma','','kyle.paloma@acme.com','888-123-4617','Cell','877-234-5728','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_052','Lee','','Major','','lee.major@acme.com','888-123-4618','Cell','877-234-5729','Alternate','Bethesda','MD','20810','','','EID_052',4,1,1,'OID_003','0000-00-00'),('EID_053','Liam','','Neeson','','liam.neeson@acme.com','888-123-4619','Cell','877-234-5730','Alternate','Silver Spring','MD','20815','','','',7,1,1,'OID_003','0000-00-00'),('EID_054','Lina','','Dockrill','','lina.dockrill@acme.com','888-123-4620','Cell','877-234-5731','Alternate','Reston','VA','20170','','','EID_054',6,1,1,'OID_003','0000-00-00'),('EID_055','Linda','','Gray','','linda.gray@acme.com','888-123-4621','Cell','877-234-5732','Alternate','Fredrick','MD','21701','','','EID_055',3,1,1,'OID_003','0000-00-00'),('EID_056','Lisa','Y','Simpson','','lisa.simpson@acme.com','888-123-4622','Cell','877-234-5733','Alternate','Gaithesburg','MD','20697','','','',6,1,1,'OID_003','0000-00-00'),('EID_057','Michael','','Lunar','','michael.lunar@acme.com','888-123-4623','Cell','877-234-5734','Alternate','Fredrick','MD','21701','','','',8,1,1,'OID_003','0000-00-00'),('EID_058','Mike','','Whittern','','mike.whittern@acme.com','888-123-4624','Cell','877-234-5735','Alternate','Bethesda','MD','20810','','','',8,1,1,'OID_003','0000-00-00'),('EID_059','Mike','','Abbott','','mike.abbott@acme.com','888-123-4625','Cell','877-234-5736','Alternate','Reston','VA','20170','','','',9,1,1,'OID_003','0000-00-00'),('EID_060','Mitch','','Borges','','mitch.borges@acme.com','888-123-4626','Cell','877-234-5737','Alternate','Gaithesburg','MD','20697','','','',8,1,1,'OID_003','0000-00-00'),('EID_061','Mitchell','','Townsend','Mitch','mitchell.townsend@acme.com','888-123-4627','Cell','877-234-5738','Alternate','Arlington','VA','20330','','','',7,1,1,'OID_003','0000-00-00'),('EID_062','Ned','','Kristoffensen','','ned.kristoffensen@acme.com','888-123-4628','Cell','877-234-5739','Alternate','Fredrick','MD','21701','','','EID_062',4,1,1,'OID_003','0000-00-00'),('EID_063','Nick','','Kline','','nick.kline@acme.com','888-123-4629','Cell','877-234-5740','Alternate','Rockville','MD','20847','','','',6,1,1,'OID_003','0000-00-00'),('EID_064','Orphelia','','Beecham','','orphelia.beecham@acme.com','888-123-4630','Cell','877-234-5741','Alternate','Gaithesburg','MD','20697','','','EID_064',3,1,1,'OID_003','0000-00-00'),('EID_065','Palmer','','Kerns','','palmer.kerns@acme.com','888-123-4631','Cell','877-234-5742','Alternate','Reston','VA','20170','','','',8,1,1,'OID_003','0000-00-00'),('EID_066','Parker','T','Marchessa','','parker.marchessa@acme.com','888-123-4632','Cell','877-234-5743','Alternate','Rockville','MD','20847','','','',9,1,1,'OID_003','0000-00-00'),('EID_067','Perry','','Ellis','','perry.ellis@acme.com','888-123-4633','Cell','877-234-5744','Alternate','Rockville','MD','20847','','','',8,1,1,'OID_003','0000-00-00'),('EID_068','Ray','','Aiken','','ray.aiken@acme.com','888-123-4634','Cell','877-234-5745','Alternate','Silver Spring','MD','20815','','','',9,1,1,'OID_003','0000-00-00'),('EID_069','Rick','','Springfield','','first.last@acme.com','888-123-4635','Cell','877-234-5746','Alternate','Gaithesburg','MD','20697','','','EID_069',4,1,1,'OID_003','0000-00-00'),('EID_070','Robin','','Danish','','first.last@acme.com','888-123-4636','Cell','877-234-5747','Alternate','Reston','VA','20170','','','EID_070',3,1,1,'OID_003','0000-00-00'),('EID_071','Roger','','Rinaldo','','first.last@acme.com','888-123-4637','Cell','877-234-5748','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_072','Roman','','Williams','','first.last@acme.com','888-123-4638','Cell','877-234-5749','Alternate','Reston','VA','20170','','','EID_072',4,1,1,'OID_003','0000-00-00'),('EID_073','Ron','','Sonsinni','','first.last@acme.com','888-123-4639','Cell','877-234-5750','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_074','Rosie','','O\'Donnell','','first.last@acme.com','888-123-4640','Cell','877-234-5751','Alternate','Silver Spring','MD','20815','','','EID_074',6,1,1,'OID_003','0000-00-00'),('EID_075','Roy','','Rogers','','roy.rogers@acme.com','888-123-4641','Cell','877-234-5752','Alternate','Fredrick','MD','21701','','','',10,1,1,'OID_003','0000-00-00'),('EID_076','Ryan','S','Malcolm','','ryan.malcolm@acme.com','888-123-4642','Cell','877-234-5753','Alternate','Rockville','MD','20847','','','EID_076',2,1,1,'OID_003','0000-00-00'),('EID_077','Shawn','','Franklin','','franklin.shawn@acme.com','888-123-4643','Cell','877-234-5754','Alternate','Gaithesburg','MD','20697','','','',10,1,1,'OID_003','0000-00-00'),('EID_078','Thomas','','Edison','Tom','thomas.edison@acme.com','888-123-4644','Cell','877-234-5755','Alternate','Silver Spring','MD','20815','','','EID_078',2,1,1,'OID_003','0000-00-00'),('EID_079','Thomas','','Cook','','first.last@acme.com','888-123-4645','Cell','877-234-5756','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_080','Tim','','Gates','','first.last@acme.com','888-123-4646','Cell','877-234-5757','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_081','Tyler','','Moffett','','first.last@acme.com','888-123-4648','Cell','877-234-5759','Alternate','Arlington','VA','20330','','','',6,1,1,'OID_003','0000-00-00'),('EID_082','Tyler','C','Kastelan','','first.last@acme.com','888-123-4649','Cell','877-234-5760','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_083','Verona','','Capulet','','first.last@acme.com','888-123-4650','Cell','877-234-5761','Alternate','Bethesda','MD','20810','','','EID_083',5,1,1,'OID_003','0000-00-00'),('EID_084','Will','','Hefner','','first.last@acme.com','888-123-4651','Cell','877-234-5762','Alternate','Silver Spring','MD','20815','','','',8,1,1,'OID_003','0000-00-00'),('EID_085','William','V','Atkins','Will','first.last@acme.com','888-123-4652','Cell','877-234-5763','Alternate','Alexandria','VA','22306','','','',6,1,1,'OID_003','0000-00-00'),('EID_086','Test for Staff ',NULL,' Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N','N',NULL,8,2,1,'OID_014','2016-01-12');
/*!40000 ALTER TABLE `STAFF` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF_CERTIFICATION`
--

LOCK TABLES `STAFF_CERTIFICATION` WRITE;
/*!40000 ALTER TABLE `STAFF_CERTIFICATION` DISABLE KEYS */;
/*!40000 ALTER TABLE `STAFF_CERTIFICATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF_EXPERIENCE`
--

LOCK TABLES `STAFF_EXPERIENCE` WRITE;
/*!40000 ALTER TABLE `STAFF_EXPERIENCE` DISABLE KEYS */;
INSERT INTO `STAFF_EXPERIENCE` VALUES (1,'Target Value Design'),(2,'Cost Control'),(3,'Cost Estimating'),(4,'Constructability Review'),(5,'Short Interval Planning'),(6,'Sunbcontractor Selection'),(7,'BIM Consulting'),(8,'VDC Execution Planning'),(9,'Model BAsed Estimating'),(10,'MEP Coordination'),(11,'4D Sequencing'),(12,'Constructability Analysis'),(13,'Site Logistics Planning'),(14,'Total Station Integration'),(15,'Drywall and taping'),(16,'Doors'),(17,'Rough carpentry'),(18,'Acoustical ceiling work'),(19,'Light demolition and clean up');
/*!40000 ALTER TABLE `STAFF_EXPERIENCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF_GROUP`
--

LOCK TABLES `STAFF_GROUP` WRITE;
/*!40000 ALTER TABLE `STAFF_GROUP` DISABLE KEYS */;
INSERT INTO `STAFF_GROUP` VALUES (1,'TBD'),(2,'Operation'),(3,'SPW'),(4,'Estimator'),(5,'Admin'),(6,'Intern');
/*!40000 ALTER TABLE `STAFF_GROUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF_ROLE`
--

LOCK TABLES `STAFF_ROLE` WRITE;
/*!40000 ALTER TABLE `STAFF_ROLE` DISABLE KEYS */;
INSERT INTO `STAFF_ROLE` VALUES (1,'Assistant Superintendent'),(2,'BIM Project Engineer'),(3,'Field Office Coordinator'),(4,'MEP Coordinator'),(5,'Project Accountant'),(6,'Project Engineer'),(7,'Project Executive'),(8,'Project Manager'),(9,'Project Superintendent'),(10,'Intern'),(11,'TBD');
/*!40000 ALTER TABLE `STAFF_ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `STAFF_STATUS`
--

LOCK TABLES `STAFF_STATUS` WRITE;
/*!40000 ALTER TABLE `STAFF_STATUS` DISABLE KEYS */;
INSERT INTO `STAFF_STATUS` VALUES (1,'Active'),(2,'Inactive'),(3,'Leave of Absence'),(4,'Retired'),(5,'Sabbatical');
/*!40000 ALTER TABLE `STAFF_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (50,1,'StaffPlan','','Admin','admin@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `USER_ACCESS`
--

LOCK TABLES `USER_ACCESS` WRITE;
/*!40000 ALTER TABLE `USER_ACCESS` DISABLE KEYS */;
INSERT INTO `USER_ACCESS` VALUES (1,50,'OID_014',0,0);
/*!40000 ALTER TABLE `USER_ACCESS` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2019-02-14 10:32:43
