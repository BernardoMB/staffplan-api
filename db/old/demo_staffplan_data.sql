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
INSERT INTO `CATEGORY` VALUES (1,'Healthcare'),(2,'Retail'),(3,'Technology'),(4,'Education'),(5,'Life Science'),(6,'Self Perform'),(7,'Sports Venues'),(8,'Semi Conductor'),(9,'Manufacturing & Supply Chain'),(10,'Mission Critical'),(11,'Hospitality'),(12,'Cultural/Historic'),(13,'Entertainment');
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
INSERT INTO `CUSTOM_LABEL` VALUES (0,'STAFF','PREFERRED_NAME','NAME'),(2,'OFFICE','OFFICE_NAME','OFFICE');
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
/*!40000 ALTER TABLE `PLANNED_PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT`
--

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;
INSERT INTO `PROJECT` VALUES ('PID_001',1,'SP_001','Ashville Regional Medical Center','17300000','34 North St','Arlington','VA','20330','2008-08-17','2028-08-20',0,4,1,'OID_001',8,'','2'),('PID_002',1,'SP_002','General Hospital Center - Suite 100','21300000','44 Lake St','Alexandria','VA','22306','2001-03-18','2015-11-20',0,4,1,'OID_001',8,'','2'),('PID_003',1,'SP_003','Tech Data Center - East Center','12700000','4312  Pennsylvania Ave','Bethesda','MD','20810','2001-07-18','2015-08-19',0,4,1,'OID_001',1,'','2'),('PID_004',1,'SP_004','Apricot West Suites 110 & 210','8100000','45  5th Avenue','Fredrick','MD','21701','2002-02-18','2030-12-20',0,4,1,'OID_001',1,'','2'),('PID_005',1,'SP_005','BT Data Center 2201','8000000','67  Park Ave','Gaithesburg','MD','20697','2017-02-18','2001-02-20',0,4,1,'OID_001',1,'','2'),('PID_006',1,'SP_006','Broadcast Data Center','8000000','99  West St','Reston','VA','20170','2001-06-18','2001-12-19',0,4,1,'OID_001',1,'','2'),('PID_007',1,'SP_007','Tech Virtual Ware - Project Mountain','16800000','44  Blue Bay','Rockville','MD','20847','2001-01-18','2031-12-19',0,4,1,'OID_001',1,'','2'),('PID_008',1,'SP_008','Operation Data Center','9300000','1000  1st Street','Silver Spring','MD','20815','2015-04-18','2031-12-19',0,4,1,'OID_001',1,'','2'),('PID_009',1,'SP_009','Rufus Data Center','12700000','45  Michigan Ave','Arlington','VA','20330','2005-01-18','2015-09-19',0,4,1,'OID_001',1,'','2'),('PID_010',1,'SP_010','Equinox Data Center','9000000','44  Broad St','Alexandria','VA','22306','2001-05-18','2015-12-19',0,4,1,'OID_001',1,'','2'),('PID_011',1,'SP_011','Northhampton Data Center','8700000','34  North St','Bethesda','MD','20810','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_012',1,'SP_012','Quint Health Center','16800000','44  Lake St','Fredrick','MD','21701','0000-00-00','0000-00-00',0,4,1,'OID_001',8,'','2'),('PID_013',1,'SP_013','Wolfe Health Data Center','7800000','4312  Pennsylvania Ave','Gaithesburg','MD','20697','0000-00-00','0000-00-00',0,4,1,'OID_001',8,'','2'),('PID_014',1,'SP_014','Velocity 5  - WV Project','3000000','45  5th Avenue','Reston','VA','20170','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_015',1,'SP_015','Ocean City Hills - Tenant Interiors','9300000','67  Park Ave','Rockville','MD','20847','0000-00-00','0000-00-00',0,4,1,'OID_001',5,'','2'),('PID_016',1,'SP_016','MedLife Science Data Center','34400000','99  West St','Silver Spring','MD','20815','0000-00-00','0000-00-00',0,4,1,'OID_001',3,'','2'),('PID_017',2,'SP_017','Communication 100','16100000','44  Blue Bay','Arlington','VA','20330','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_018',2,'SP_018','Charleston Regional Hospital','3000000','1000  1st Street','Alexandria','VA','22306','0000-00-00','0000-00-00',0,4,1,'OID_001',8,'','2'),('PID_019',1,'SP_019','Georgetown Med Center TI','3000000','45  Michigan Ave','Bethesda','MD','20810','0000-00-00','0000-00-00',0,4,1,'OID_001',8,'','2'),('PID_020',1,'SP_020','Open Plaza','8000000','44  Broad St','Fredrick','MD','21701','0000-00-00','0000-00-00',0,4,1,'OID_001',5,'','2'),('PID_021',1,'SP_021','Wunderlist Technology Center','7000000','34  North St','Gaithesburg','MD','20697','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_022',1,'SP_022','QZ Data Center','8000000','44  Lake St','Reston','VA','20170','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_023',1,'SP_023','Omni Data Center','92300000','4312  Pennsylvania Ave','Rockville','MD','20847','0000-00-00','0000-00-00',0,4,1,'OID_001',1,'','2'),('PID_024',1,'SP_024','Regional ER - OR Remodel','29600000','45  5th Avenue','Silver Spring','MD','20815','0000-00-00','0000-00-00',0,4,1,'OID_001',8,'','2'),('PID_025',1,'SP_025','TechOps Center','9000000','67  Park Ave','Arlington','VA','20330','0000-00-00','0000-00-00',0,3,1,'OID_001',1,'','2'),('PID_026',1,'SP_026','High Street Corp Campus','14000000','99  West St','Alexandria','VA','22306','0000-00-00','0000-00-00',0,3,1,'OID_001',5,'','1'),('PID_027',1,'SP_027','All Sciences Technology Center','58000000','44  Blue Bay','Bethesda','MD','20810','0000-00-00','0000-00-00',0,3,1,'OID_001',1,'','1'),('PID_028',1,'SP_028','Georgetown Urgent Care','100000000','1000  1st Street','Fredrick','MD','21701','0000-00-00','0000-00-00',0,3,1,'OID_011',8,'','1'),('PID_029',1,'SP_029','Lake Travis Community Center','22300000','2120 Lakeshore Dr','Austin','TX','73301','0000-00-00','0000-00-00',0,4,1,'OID_003',7,'','2');
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
/*!40000 ALTER TABLE `PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_STATUS`
--

LOCK TABLES `PROJECT_STATUS` WRITE;
/*!40000 ALTER TABLE `PROJECT_STATUS` DISABLE KEYS */;
INSERT INTO `PROJECT_STATUS` VALUES (1,'TBD'),(2,'Proposal'),(3,'Potential'),(4,'Pre-Con'),(5,'Construction'),(6,'Closed'),(7,'Lost'),(8,'Hold'),(10,'Archive');
/*!40000 ALTER TABLE `PROJECT_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `PROJECT_TYPE`
--

LOCK TABLES `PROJECT_TYPE` WRITE;
/*!40000 ALTER TABLE `PROJECT_TYPE` DISABLE KEYS */;
INSERT INTO `PROJECT_TYPE` VALUES (1,'TBD'),(2,'Multi-Story Office Building'),(3,'Retail Space'),(4,'Warehouse'),(5,'Lab'),(6,'Data Center'),(7,'Tenant Improvement'),(8,'Corporate Office'),(9,'Student Center'),(10,'Lab');
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
INSERT INTO `STAFF` VALUES ('EID_001','Andrew','','Gill','Andy','andrew.gill@acme.com','888-123-4567','Cell','877-234-5678','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_002','Annette','','Schumaker','Ann','annette.schumaker@acme.com','888-123-4568','Cell','877-234-5679','Alternate','Arlington','VA','20330','','','',3,1,1,'OID_003','0000-00-00'),('EID_003','Anthony','','Smith','Tony','anthony.smith@acme.com','888-123-4569','Cell','877-234-5680','Alternate','Rockville','MD','20847','','','',4,1,1,'OID_003','0000-00-00'),('EID_004','Anthony','','Mansfield','','anthony.mansfield@acme.com','888-123-4570','Cell','877-234-5681','Alternate','Fredrick','MD','21701','','','',6,1,1,'OID_003','0000-00-00'),('EID_005','Armand','','Neuman','','armand.neuman@acme.com','888-123-4571','Cell','877-234-5682','Alternate','Bethesda','MD','20810','','','',7,1,1,'OID_003','0000-00-00'),('EID_006','Braden','','Eichler','','braden.eichler@acme.com','888-123-4572','Cell','877-234-5683','Alternate','Fredrick','MD','21701','','','',7,1,1,'OID_003','0000-00-00'),('EID_007','Bradley','','Schmidt','Brad','bradley.schmidt@acme.com','888-123-4573','Cell','877-234-5684','Alternate','Gaithesburg','MD','20697','','','',7,1,1,'OID_003','0000-00-00'),('EID_008','Brandi','','Hartwick','','brandi.hartwick@acme.com','888-123-4574','Cell','877-234-5685','Alternate','Rockville','MD','20847','','','',6,1,1,'OID_003','0000-00-00'),('EID_009','Brenda','G','Cohen','','brenda.cohen@acme.com','888-123-4575','Cell','877-234-5686','Alternate','Reston','VA','20170','','','',6,1,1,'OID_003','0000-00-00'),('EID_010','Bridget','','Shultz','','bridget.schultz@acme.com','888-123-4576','Cell','877-234-5687','Alternate','Rockville','MD','20847','','','',5,1,1,'OID_003','0000-00-00'),('EID_011','Brody','','Cauldfield','','brody.cauldfield@acme.com','888-123-4577','Cell','877-234-5688','Alternate','Gaithesburg','MD','20697','','','',6,1,1,'OID_003','0000-00-00'),('EID_012','Caesar','','Morris','','caesar.morris@acme.com','888-123-4578','Cell','877-234-5689','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_013','Callan','','Williams','','callan.williams@acme.com','888-123-4579','Cell','877-234-5690','Alternate','Silver Spring','MD','20815','','','',6,1,1,'OID_003','0000-00-00'),('EID_014','Chad','L','Morris','','chad.morris@acme.com','888-123-4580','Cell','877-234-5691','Alternate','Silver Spring','MD','20815','','','',4,1,1,'OID_003','0000-00-00'),('EID_015','Charles','','Talbot','Chuck','charles.talbot@acme.com','888-123-4581','Cell','877-234-5692','Alternate','Alexandria','VA','22306','','','',8,1,1,'OID_003','0000-00-00'),('EID_016','Chase','','Moore','','chase.moore@acme.com','888-123-4582','Cell','877-234-5693','Alternate','Reston','VA','20170','','','',7,1,1,'OID_003','0000-00-00'),('EID_017','Christian','','Maher','','christian.maher@acme.com','888-123-4583','Cell','877-234-5694','Alternate','Arlington','VA','20330','','','',4,1,1,'OID_003','0000-00-00'),('EID_018','Christopher','','Campbell','Chris','christopher.campbell@acme.com','888-123-4584','Cell','877-234-5695','Alternate','Bethesda','MD','20810','','','',9,1,1,'OID_003','0000-00-00'),('EID_019','Cody','','Maher','','cody.maher@acme.com','888-123-4585','Cell','877-234-5696','Alternate','Arlington','VA','20330','','','',6,1,1,'OID_003','0000-00-00'),('EID_020','Dan','','Gollet','','dan.gollet@acme.com','888-123-4586','Cell','877-234-5697','Alternate','Arlington','VA','20330','','','',1,1,1,'OID_003','0000-00-00'),('EID_021','Darrin','','Jackson','','darrin.jackson@acme.com','888-123-4587','Cell','877-234-5698','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_022','Dave','','Robbins','','dave.robbins@acme.com','888-123-4588','Cell','877-234-5699','Alternate','Reston','VA','20170','','','',9,1,1,'OID_003','0000-00-00'),('EID_023','David','','Newberry','Dave','david.newberry@acme.com','888-123-4589','Cell','877-234-5700','Alternate','Alexandria','VA','22306','','','',6,1,1,'OID_003','0000-00-00'),('EID_024','Don','','Brockfield','','dob.brockfield@acme.com','888-123-4590','Cell','877-234-5701','Alternate','Alexandria','VA','22306','','','',1,1,1,'OID_003','0000-00-00'),('EID_025','Donald','','Eishenhower','Don','donald.eisenhower@acme.com','888-123-4591','Cell','877-234-5702','Alternate','Alexandria','VA','22306','','','',4,1,1,'OID_003','0000-00-00'),('EID_026','Dorreen','','Winchester','','dorreen.winchester@acme.com','888-123-4592','Cell','877-234-5703','Alternate','Alexandria','VA','22306','','','',3,1,1,'OID_003','0000-00-00'),('EID_027','Douglas','','Bowman','Doug','douglas.bowman@acme.com','888-123-4593','Cell','877-234-5704','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_028','Edward','','Tudor','Ed','edward.tudor@acme.com','888-123-4594','Cell','877-234-5705','Alternate','Rockville','MD','20847','','','',9,1,1,'OID_003','0000-00-00'),('EID_029','Eliza','B','Darwin','Liz','eliza.darwin@acme.com','888-123-4595','Cell','877-234-5706','Alternate','Bethesda','MD','20810','','','',8,1,1,'OID_003','0000-00-00'),('EID_030','Emma','','Covington','','emma.covington@acme.com','888-123-4596','Cell','877-234-5707','Alternate','Fredrick','MD','21701','','','',8,1,1,'OID_003','0000-00-00'),('EID_031','Erik','','Ramsey','','erik.ramsey@acme.com','888-123-4597','Cell','877-234-5708','Alternate','Bethesda','MD','20810','','','',6,1,1,'OID_003','0000-00-00'),('EID_032','Eron','','Flynn','','eron.flynn@acme.com','888-123-4598','Cell','877-234-5709','Alternate','Gaithesburg','MD','20697','','','',8,1,1,'OID_003','0000-00-00'),('EID_033','Ferdinand','','Churchill','Fred','ferdinand.churchill@acme.com','888-123-4599','Cell','877-234-5710','Alternate','Fredrick','MD','21701','','','',6,1,1,'OID_003','0000-00-00'),('EID_034','Grant','','Orwell','','grant.orwell@acme.com','888-123-4600','Cell','877-234-5711','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_035','Greg','','Orlitz','','greg.orlitz@acme.com','888-123-4601','Cell','877-234-5712','Alternate','Silver Spring','MD','20815','','','',9,1,1,'OID_003','0000-00-00'),('EID_037','Jacob','','Feddero','Jake','jacob.feddero@acme.com','888-123-4603','Cell','877-234-5714','Alternate','Reston','VA','20170','','','',8,1,1,'OID_003','0000-00-00'),('EID_038','Jaeger','','Bronte','','jaeger.bronte@acme.com','888-123-4604','Cell','877-234-5715','Alternate','Rockville','MD','20847','','','',8,1,1,'OID_003','0000-00-00'),('EID_039','Janice','','Poppins','','janice.poppins@acme.com','888-123-4605','Cell','877-234-5716','Alternate','Silver Spring','MD','20815','','','',5,1,1,'OID_003','0000-00-00'),('EID_040','Jerome','O','Feliz','Jerry','jerome.feliz@acme.com','888-123-4606','Cell','877-234-5717','Alternate','Bethesda','MD','20810','','','',9,1,1,'OID_003','0000-00-00'),('EID_041','Jerri','','McCarty','','jerri.mccarty@acme.com','888-123-4607','Cell','877-234-5718','Alternate','Arlington','VA','20330','','','',5,1,1,'OID_003','0000-00-00'),('EID_042','Jim','','Luther','','jim.luther@acme.com','888-123-4608','Cell','877-234-5719','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_043','John','','Lennon','','john.lennon@acme.com','888-123-4609','Cell','877-234-5720','Alternate','Rockville','MD','20847','','','',7,1,1,'OID_003','0000-00-00'),('EID_044','Josef','','Speer','','josef.speer@acme.com','888-123-4610','Cell','877-234-5721','Alternate','Bethesda','MD','20810','','','',1,1,1,'OID_003','0000-00-00'),('EID_045','Josie','','Belk','','josie.belk@acme.com','888-123-4611','Cell','877-234-5722','Alternate','Reston','VA','20170','','','',2,1,1,'OID_003','0000-00-00'),('EID_046','Karen','','Coutinho','','karen.coutinho@acme.com','888-123-4612','Cell','877-234-5723','Alternate','Alexandria','VA','22306','','','',5,1,1,'OID_003','0000-00-00'),('EID_047','Karl','A','Shilpberg','','karl.shilpberg@acme.com','888-123-4613','Cell','877-234-5724','Alternate','Silver Spring','MD','20815','','','',8,1,1,'OID_003','0000-00-00'),('EID_048','Kate','','Jefferson','','kate.jefferson@acme.com','888-123-4614','Cell','877-234-5725','Alternate','Bethesda','MD','20810','','','',3,1,1,'OID_003','0000-00-00'),('EID_049','Kim','','Kardin','','kim.kardin@acme.com','888-123-4615','Cell','877-234-5726','Alternate','Arlington','VA','20330','','','',8,1,1,'OID_003','0000-00-00'),('EID_050','Klein','','Henrick','','klein.henrick@acme.com','888-123-4616','Cell','877-234-5727','Alternate','Alexandria','VA','22306','','','',8,1,1,'OID_003','0000-00-00'),('EID_051','Kyle','','Paloma','','kyle.paloma@acme.com','888-123-4617','Cell','877-234-5728','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_052','Lee','','Major','','lee.major@acme.com','888-123-4618','Cell','877-234-5729','Alternate','Bethesda','MD','20810','','','',4,1,1,'OID_003','0000-00-00'),('EID_053','Liam','','Neeson','','liam.neeson@acme.com','888-123-4619','Cell','877-234-5730','Alternate','Silver Spring','MD','20815','','','',7,1,1,'OID_003','0000-00-00'),('EID_054','Lina','','Dockrill','','lina.dockrill@acme.com','888-123-4620','Cell','877-234-5731','Alternate','Reston','VA','20170','','','',6,1,1,'OID_003','0000-00-00'),('EID_055','Linda','','Gray','','linda.gray@acme.com','888-123-4621','Cell','877-234-5732','Alternate','Fredrick','MD','21701','','','',3,1,1,'OID_003','0000-00-00'),('EID_056','Lisa','Y','Simpson','','lisa.simpson@acme.com','888-123-4622','Cell','877-234-5733','Alternate','Gaithesburg','MD','20697','','','',6,1,1,'OID_003','0000-00-00'),('EID_057','Michael','','Lunar','','michael.lunar@acme.com','888-123-4623','Cell','877-234-5734','Alternate','Fredrick','MD','21701','','','',8,1,1,'OID_003','0000-00-00'),('EID_058','Mike','','Whittern','','mike.whittern@acme.com','888-123-4624','Cell','877-234-5735','Alternate','Bethesda','MD','20810','','','',8,1,1,'OID_003','0000-00-00'),('EID_059','Mike','','Abbott','','mike.abbott@acme.com','888-123-4625','Cell','877-234-5736','Alternate','Reston','VA','20170','','','',9,1,1,'OID_003','0000-00-00'),('EID_060','Mitch','','Borges','','mitch.borges@acme.com','888-123-4626','Cell','877-234-5737','Alternate','Gaithesburg','MD','20697','','','',8,1,1,'OID_003','0000-00-00'),('EID_061','Mitchell','','Townsend','Mitch','mitchell.townsend@acme.com','888-123-4627','Cell','877-234-5738','Alternate','Arlington','VA','20330','','','',7,1,1,'OID_003','0000-00-00'),('EID_062','Ned','','Kristoffensen','','ned.kristoffensen@acme.com','888-123-4628','Cell','877-234-5739','Alternate','Fredrick','MD','21701','','','',4,1,1,'OID_003','0000-00-00'),('EID_063','Nick','','Kline','','nick.kline@acme.com','888-123-4629','Cell','877-234-5740','Alternate','Rockville','MD','20847','','','',6,1,1,'OID_003','0000-00-00'),('EID_064','Orphelia','','Beecham','','orphelia.beecham@acme.com','888-123-4630','Cell','877-234-5741','Alternate','Gaithesburg','MD','20697','','','',3,1,1,'OID_003','0000-00-00'),('EID_065','Palmer','','Kerns','','palmer.kerns@acme.com','888-123-4631','Cell','877-234-5742','Alternate','Reston','VA','20170','','','',8,1,1,'OID_003','0000-00-00'),('EID_066','Parker','T','Marchessa','','parker.marchessa@acme.com','888-123-4632','Cell','877-234-5743','Alternate','Rockville','MD','20847','','','',9,1,1,'OID_003','0000-00-00'),('EID_067','Perry','','Ellis','','perry.ellis@acme.com','888-123-4633','Cell','877-234-5744','Alternate','Rockville','MD','20847','','','',8,1,1,'OID_003','0000-00-00'),('EID_068','Ray','','Aiken','','ray.aiken@acme.com','888-123-4634','Cell','877-234-5745','Alternate','Silver Spring','MD','20815','','','',9,1,1,'OID_003','0000-00-00'),('EID_069','Rick','','Springfield','','first.last@acme.com','888-123-4635','Cell','877-234-5746','Alternate','Gaithesburg','MD','20697','','','',4,1,1,'OID_003','0000-00-00'),('EID_070','Robin','','Danish','','first.last@acme.com','888-123-4636','Cell','877-234-5747','Alternate','Reston','VA','20170','','','',3,1,1,'OID_003','0000-00-00'),('EID_071','Roger','','Rinaldo','','first.last@acme.com','888-123-4637','Cell','877-234-5748','Alternate','Arlington','VA','20330','','','',9,1,1,'OID_003','0000-00-00'),('EID_072','Roman','','Williams','','first.last@acme.com','888-123-4638','Cell','877-234-5749','Alternate','Reston','VA','20170','','','',4,1,1,'OID_003','0000-00-00'),('EID_073','Ron','','Sonsinni','','first.last@acme.com','888-123-4639','Cell','877-234-5750','Alternate','Alexandria','VA','22306','','','',9,1,1,'OID_003','0000-00-00'),('EID_074','Rosie','','O\'Donnell','','first.last@acme.com','888-123-4640','Cell','877-234-5751','Alternate','Silver Spring','MD','20815','','','',6,1,1,'OID_003','0000-00-00'),('EID_075','Roy','','Rogers','','roy.rogers@acme.com','888-123-4641','Cell','877-234-5752','Alternate','Fredrick','MD','21701','','','',1,1,1,'OID_003','0000-00-00'),('EID_076','Ryan','S','Malcolm','','ryan.malcolm@acme.com','888-123-4642','Cell','877-234-5753','Alternate','Rockville','MD','20847','','','',2,1,1,'OID_003','0000-00-00'),('EID_077','Shawn','','Franklin','','franklin.shawn@acme.com','888-123-4643','Cell','877-234-5754','Alternate','Gaithesburg','MD','20697','','','',1,1,1,'OID_003','0000-00-00'),('EID_078','Thomas','','Edison','Tom','thomas.edison@acme.com','888-123-4644','Cell','877-234-5755','Alternate','Silver Spring','MD','20815','','','',2,1,1,'OID_003','0000-00-00'),('EID_079','Thomas','','Cook','','first.last@acme.com','888-123-4645','Cell','877-234-5756','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_080','Tim','','Gates','','first.last@acme.com','888-123-4646','Cell','877-234-5757','Alternate','Fredrick','MD','21701','','','',9,1,1,'OID_003','0000-00-00'),('EID_081','Tyler','','Moffett','','first.last@acme.com','888-123-4648','Cell','877-234-5759','Alternate','Arlington','VA','20330','','','',6,1,1,'OID_003','0000-00-00'),('EID_082','Tyler','C','Kastelan','','first.last@acme.com','888-123-4649','Cell','877-234-5760','Alternate','Gaithesburg','MD','20697','','','',9,1,1,'OID_003','0000-00-00'),('EID_083','Verona','','Capulet','','first.last@acme.com','888-123-4650','Cell','877-234-5761','Alternate','Bethesda','MD','20810','','','',5,1,1,'OID_003','0000-00-00'),('EID_084','Will','','Hefner','','first.last@acme.com','888-123-4651','Cell','877-234-5762','Alternate','Silver Spring','MD','20815','','','',8,1,1,'OID_003','0000-00-00'),('EID_085','William','V','Atkins','Will','first.last@acme.com','888-123-4652','Cell','877-234-5763','Alternate','Alexandria','VA','22306','','','',6,1,1,'OID_003','0000-00-00');
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
INSERT INTO `STAFF_ROLE` VALUES (1,'TBD'),(2,'Assistant Superintendent'),(3,'BIM Project Engineer'),(4,'Field Office Coordinator'),(5,'MEP Coordinator'),(6,'Project Accountant'),(7,'Project Engineer'),(8,'Project Executive'),(9,'Project Manager'),(10,'Project Superintendent'),(11,'Intern');
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

-- Dump completed on 2019-01-22 10:44:56
