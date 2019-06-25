/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ACCESS_ROLE
# ------------------------------------------------------------

LOCK TABLES `ACCESS_ROLE` WRITE;
/*!40000 ALTER TABLE `ACCESS_ROLE` DISABLE KEYS */;

INSERT INTO `ACCESS_ROLE` (`ACCESS_ROLE_ID`, `ROLE_NAME`, `COMBINATION_ID`)
VALUES
	(1,'All Company Access',1),
	(2,'Regional Access',1),
	(3,'Admin',1);

/*!40000 ALTER TABLE `ACCESS_ROLE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ACCESS_TYPE
# ------------------------------------------------------------

LOCK TABLES `ACCESS_TYPE` WRITE;
/*!40000 ALTER TABLE `ACCESS_TYPE` DISABLE KEYS */;

INSERT INTO `ACCESS_TYPE` (`ACCESS_TYPE_ID`, `TYPE`)
VALUES
	(1,'View'),
	(2,'Edit'),
	(3,'Delete'),
	(4,'Add'),
	(5,'Add Staff'),
	(6,'Add Project'),
	(7,'Edit Project'),
	(8,'Edit Staff'),
	(9,'Delete Staff'),
	(10,'Delete Project');

/*!40000 ALTER TABLE `ACCESS_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ACCESS_TYPE_COMBINATION
# ------------------------------------------------------------

LOCK TABLES `ACCESS_TYPE_COMBINATION` WRITE;
/*!40000 ALTER TABLE `ACCESS_TYPE_COMBINATION` DISABLE KEYS */;

INSERT INTO `ACCESS_TYPE_COMBINATION` (`ID`, `COMBINATION`)
VALUES
	(1,'[1,2]'),
	(3,'[2,3,4,1,6]'),
	(4,'[2,3,4]'),
	(5,'[6,7]');

/*!40000 ALTER TABLE `ACCESS_TYPE_COMBINATION` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CATEGORY
# ------------------------------------------------------------

LOCK TABLES `CATEGORY` WRITE;
/*!40000 ALTER TABLE `CATEGORY` DISABLE KEYS */;

INSERT INTO `CATEGORY` (`CATEGORY_ID`, `CATEGORY_NAME`)
VALUES
	(1,'Healthcare'),
	(2,'Retail'),
	(3,'Technology'),
	(4,'Education'),
	(5,'Life Science'),
	(6,'Self Perform'),
	(7,'Sports Venues'),
	(8,'Semi Conductor'),
	(9,'Manufacturing & Supply Chain'),
	(10,'Mission Critical'),
	(11,'Hospitality'),
	(12,'Cultural/Historic'),
	(13,'Entertainment'),
	(14,'Corporate');

/*!40000 ALTER TABLE `CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CERTIFICATION_SKILLS
# ------------------------------------------------------------

LOCK TABLES `CERTIFICATION_SKILLS` WRITE;
/*!40000 ALTER TABLE `CERTIFICATION_SKILLS` DISABLE KEYS */;

INSERT INTO `CERTIFICATION_SKILLS` (`CERTIFICATION_ID`, `CERTIFICATION_NAME`)
VALUES
	(1,'Title 24'),
	(2,'OSHPD'),
	(3,'PMI Certification'),
	(4,'LEED'),
	(5,'OSHA');

/*!40000 ALTER TABLE `CERTIFICATION_SKILLS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOM_LABEL
# ------------------------------------------------------------

LOCK TABLES `CUSTOM_LABEL` WRITE;
/*!40000 ALTER TABLE `CUSTOM_LABEL` DISABLE KEYS */;

INSERT INTO `CUSTOM_LABEL` (`CUSTOM_LABEL_ID`, `TABLE_NAME`, `FIELD_NAME`, `CUSTOM_FIELD`)
VALUES
	(2,'OFFICE','OFFICE_NAME','Office');

/*!40000 ALTER TABLE `CUSTOM_LABEL` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER
# ------------------------------------------------------------

LOCK TABLES `CUSTOMER` WRITE;
/*!40000 ALTER TABLE `CUSTOMER` DISABLE KEYS */;

INSERT INTO `CUSTOMER` (`CUSTOMER_ID`, `CUSTOMER_NAME`, `CUSTOMER_ADDRESS`, `CUSTOMER_CITY`, `CUSTOMER_STATE`, `CUSTOMER_ZIP`, `CUSTOMER_CONTACT`, `CONTACT_PHONE`)
VALUES
	(1,'Asheville Medical Center','NULL','NULL','NULL','NULL','John Smith','NULL'),
	(2,'Alexandria General Hospital','NULL','NULL','NULL','NULL','Jim Bob','NULL'),
	(3,'Techno Data Systems','NULL','NULL','NULL','NULL','Jason Hendricks','NULL'),
	(4,'Apricot Development Companies','NULL','NULL','NULL','NULL','Hedda Herring','NULL'),
	(5,'British Telecom','NULL','NULL','NULL','NULL','Jada Maldonado','NULL'),
	(6,'Digital Broadcast','NULL','NULL','NULL','NULL','August McLeod','NULL'),
	(7,'Technology Virtual Center','NULL','NULL','NULL','NULL','Prescott Jacobson','NULL'),
	(8,'Ops Technology','NULL','NULL','NULL','NULL','Shelly Hahn','NULL'),
	(9,'Rufus Companies','NULL','NULL','NULL','NULL','Wade Burnett','NULL'),
	(10,'Equinox','NULL','NULL','NULL','NULL','Emery Shannon','NULL'),
	(11,'Northhampton Companies','NULL','NULL','NULL','NULL','Candice McCall','NULL'),
	(12,'Quint Health Center','NULL','NULL','NULL','NULL','Anthony Owen','NULL'),
	(13,'Wolfe Health Medical Center','NULL','NULL','NULL','NULL','Tate Edwards','NULL'),
	(14,'Velocity 5','NULL','NULL','NULL','NULL','Calvin Ewing','NULL'),
	(15,'Ocean Hills Development Co','NULL','NULL','NULL','NULL','Brady Sharpe','NULL'),
	(16,'MedLife Science','NULL','NULL','NULL','NULL','Lionel Henson','NULL'),
	(17,'Communication 100','NULL','NULL','NULL','NULL','Clayton Osborne','NULL'),
	(18,'Charleston Regional Hospital','NULL','NULL','NULL','NULL','Rogan Irwin','NULL'),
	(19,'Georgetown Medical Center','NULL','NULL','NULL','NULL','Alexa Sweeney','NULL'),
	(20,'Open Plaza','NULL','NULL','NULL','NULL','Burke Nieves','NULL'),
	(21,'Wunderlist Technology Center','NULL','NULL','NULL','NULL','Nathan Bell','NULL'),
	(22,'QZ Inc','NULL','NULL','NULL','NULL','Kay Jarvis','NULL'),
	(23,'Omni Inc','NULL','NULL','NULL','NULL','Sherman Griffith','NULL'),
	(24,'Maryland Regional Health Care','NULL','NULL','NULL','NULL','Shelby Schwartz','NULL'),
	(25,'TechOps Inc','NULL','NULL','NULL','NULL','Kim Baxter','NULL'),
	(26,'High Street Corp','NULL','NULL','NULL','NULL','Tucker Moreno','NULL'),
	(27,'All Sciences Inc','NULL','NULL','NULL','NULL','Alan Boyle','NULL'),
	(28,'Georgetown Medical Center','NULL','NULL','NULL','NULL','Regina Pierce','NULL'),
	(29,'San Andreas Community College','NULL','NULL','NULL','NULL','Matthew Spence','NULL'),
	(30,'Allentown University','NULL','NULL','NULL','NULL','Dale Henry','NULL');

/*!40000 ALTER TABLE `CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER_PROJECTS
# ------------------------------------------------------------



# Dump of table EXPERIENCE
# ------------------------------------------------------------

LOCK TABLES `EXPERIENCE` WRITE;
/*!40000 ALTER TABLE `EXPERIENCE` DISABLE KEYS */;

INSERT INTO `EXPERIENCE` (`EXPERIENCE_ID`, `EXPERIENCE_LABEL`)
VALUES
	(1,'Target Value Design'),
	(2,'Cost Control'),
	(3,'Cost Estimating'),
	(4,'Constructability Review'),
	(5,'Short Interval Planning'),
	(6,'Sunbcontractor Selection'),
	(7,'BIM Consulting'),
	(8,'VDC Execution Planning'),
	(9,'Model BAsed Estimating'),
	(10,'MEP Coordination'),
	(11,'4D Sequencing'),
	(12,'Constructability Analysis'),
	(13,'Site Logistics Planning'),
	(14,'Total Station Integration'),
	(15,'Drywall and taping'),
	(16,'Doors'),
	(17,'Rough carpentry'),
	(18,'Acoustical ceiling work'),
	(19,'Light demolition and clean up');

/*!40000 ALTER TABLE `EXPERIENCE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table OFFICE
# ------------------------------------------------------------

LOCK TABLES `OFFICE` WRITE;
/*!40000 ALTER TABLE `OFFICE` DISABLE KEYS */;

INSERT INTO `OFFICE` (`OFFICE_ID`, `OFFICE_NAME`, `OFFICE_ADDRESS`, `OFFICE_CITY`, `OFFICE_STATE`, `OFFICE_ZIP`, `OFFICE_TYPE`, `REGION_ID`)
VALUES
	(1,'TBD','TBD','TBD','','','',1),
	(2,'Phoenix','580 Forest Avenue','Phoenix','AZ','85001','',2),
	(3,'Austin','1791 Gold Cliff Circle','Austin','TX','73301','',2),
	(4,'Boston','4044 Stadium Drive','Boston','MA','2110','',2),
	(5,'Chicago','4100 Federal Road','Chicago','IL','60631','',4),
	(6,'Madison','675 Comfort Court','Madison','WI','53718','',4),
	(7,'Los Angeles','1834 Woodstock Drive','Los Angeles','CA','90014','',6),
	(8,'Seattle','3136 Raccoon Run','Seattle','WA','98101','',6),
	(9,'Atlanta','2487 Stroop Hill Road','Atlanta','GA','30303','',3),
	(10,'Detroit','3483 State Street','Detroit','MI','48213','',4),
	(11,'Raleigh','747 Johnson Street','Raleigh','NC','27604','',3),
	(12,'Philadelphia','3045 Young Road','Philadelphia','PA','19144','',2),
	(13,'Miami','4246 Ridenour Street','Miami','FL','33169','',3),
	(14,'Baltimore','2433 Hickory Heights Drive','Baltimore','MD','21201','',2);

/*!40000 ALTER TABLE `OFFICE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PLANNED_PROJECT_STAFF
# ------------------------------------------------------------

LOCK TABLES `PLANNED_PROJECT_STAFF` WRITE;
/*!40000 ALTER TABLE `PLANNED_PROJECT_STAFF` DISABLE KEYS */;

INSERT INTO `PLANNED_PROJECT_STAFF` (`ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`, `PROJECT_ID`)
VALUES
	(3,'2019-07-01','2019-08-10',100.00,6,NULL,NULL,NULL,'0',3),
	(6,'2019-04-15','2019-11-01',100.00,6,NULL,NULL,NULL,'0',14),
	(11,'2020-02-01','2022-10-01',100.00,8,NULL,NULL,NULL,'1',27),
	(12,'2020-02-01','2022-10-01',100.00,9,NULL,NULL,NULL,'1',27),
	(14,'2019-12-01','2022-12-30',25.00,7,NULL,NULL,NULL,'1',4),
	(15,'2019-12-01','2022-12-30',100.00,8,NULL,NULL,NULL,'1',4),
	(16,'2019-12-01','2022-12-30',100.00,9,NULL,NULL,NULL,'1',4),
	(17,'2019-08-08','2022-08-20',100.00,8,NULL,NULL,NULL,'1',1),
	(18,'2019-08-08','2022-08-20',25.00,7,NULL,NULL,NULL,'1',1),
	(19,'2019-08-08','2022-08-20',100.00,9,NULL,NULL,NULL,'1',1),
	(26,'2019-03-15','2021-12-31',100.00,8,NULL,NULL,NULL,'1',28),
	(27,'2019-03-15','2021-12-31',100.00,9,NULL,NULL,NULL,'1',28),
	(28,'2019-03-15','2021-12-31',25.00,9,NULL,NULL,NULL,'1',28),
	(29,'2019-04-01','2020-10-15',100.00,8,NULL,NULL,NULL,'1',26),
	(30,'2019-04-01','2020-10-15',25.00,7,NULL,NULL,NULL,'1',26),
	(31,'2019-04-01','2020-10-15',100.00,9,NULL,NULL,NULL,'1',26),
	(32,'2019-04-01','2020-03-01',25.00,7,NULL,NULL,NULL,'1',29),
	(33,'2019-04-01','2020-03-01',100.00,8,NULL,NULL,NULL,'1',29),
	(34,'2019-04-01','2020-03-01',100.00,9,NULL,NULL,NULL,'1',29),
	(35,'2019-04-07','2021-06-01',100.00,8,NULL,NULL,NULL,'1',16),
	(36,'2019-04-07','2021-06-01',25.00,7,NULL,NULL,NULL,'1',16),
	(37,'2019-04-07','2021-06-01',100.00,9,NULL,NULL,NULL,'1',16),
	(38,'2019-04-15','2021-12-31',100.00,8,NULL,NULL,NULL,'1',8),
	(39,'2019-04-15','2021-12-31',25.00,7,NULL,NULL,NULL,'1',8),
	(40,'2019-04-15','2021-12-31',100.00,9,NULL,NULL,NULL,'1',8),
	(41,'2019-07-22','2022-09-08',25.00,7,NULL,NULL,NULL,'1',12),
	(42,'2019-07-22','2022-09-08',100.00,8,NULL,NULL,NULL,'1',12),
	(43,'2019-07-22','2022-09-08',100.00,9,NULL,NULL,NULL,'1',12),
	(44,'2019-05-01','2022-12-01',25.00,7,NULL,NULL,NULL,'1',22),
	(45,'2019-05-01','2022-12-01',100.00,8,NULL,NULL,NULL,'1',22),
	(46,'2019-05-01','2022-12-01',100.00,9,NULL,NULL,NULL,'1',22),
	(47,'2019-09-19','2022-12-19',25.00,7,NULL,NULL,NULL,'1',24),
	(48,'2019-09-19','2022-12-19',100.00,8,NULL,NULL,NULL,'1',24),
	(49,'2019-09-19','2022-12-19',100.00,9,NULL,NULL,NULL,'1',24),
	(50,'2020-01-05','2022-09-15',25.00,7,NULL,NULL,NULL,'1',9),
	(51,'2020-01-05','2022-09-15',100.00,8,NULL,NULL,NULL,'1',9),
	(52,'2020-01-05','2022-09-15',100.00,9,NULL,NULL,NULL,'1',9);

/*!40000 ALTER TABLE `PLANNED_PROJECT_STAFF` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT
# ------------------------------------------------------------

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;

INSERT INTO `PROJECT` (`PROJECT_ID`, `PROJECT_NO`, `PROJECT_NAME`, `PROJECT_ROM`, `PROJECT_ADDRESS`, `PROJECT_COUNTRY`, `PROJECT_CITY`, `PROJECT_STATE`, `PROJECT_ZIP`, `START_DATE`, `END_DATE`, `PROJECT_DURATION`, `PROJECT_STATUS_ID`, `PROJECT_TYPE_ID`, `OFFICE_ID`, `CATEGORY_ID`, `PROJECT_DESCRIPTION`, `TIMELINE_TYPE`, `GROUP_ID`)
VALUES
	(1,'SP_001','A_Ashville Regional Medical Center','17300000','34 North St',NULL,'Arlington','VA','20330','2019-08-08','2022-08-20',NULL,1,10,'1',1,'','1',1),
	(2,'SP_002','B_General Hospital Center - Suite 100','21300000','44 Lake St',NULL,'Alexandria','VA','22306','2019-08-01','2021-11-15',NULL,3,10,'1',1,'','2',1),
	(3,'SP_003','Tech Data Center - East Center','12700000','4312  Pennsylvania Ave',NULL,'Bethesda','MD','20810','2018-07-01','2019-08-15',NULL,3,6,'1',3,'','2',1),
	(4,'SP_004','A_Apricot West Suites 110 & 210','8100000','45  5th Avenue',NULL,'Fredrick','MD','21701','2019-12-01','2022-12-30',NULL,1,2,'14',14,'','1',2),
	(5,'SP_005','A_BT Data Center 2201','8000000','67  Park Ave',NULL,'Gaithesburg','MD','20697','2020-02-17','2022-02-01',NULL,1,6,'1',3,'','1',1),
	(6,'SP_006','A_Broadcast Data Center','8000000','99  West St',NULL,'Reston','VA','20170','2019-06-01','2020-12-01',NULL,1,6,'1',3,'','1',1),
	(7,'SP_007','Tech Virtual Ware - Project Mountain','16800000','44  Blue Bay',NULL,'Rockville','MD','20847','2018-01-01','2019-12-31',NULL,3,8,'1',3,'','2',1),
	(8,'SP_008','E_Operation Data Center','9300000','1000  1st Street',NULL,'Silver Spring','MD','20815','2019-04-15','2021-12-31',NULL,1,6,'1',3,'','1',1),
	(9,'SP_009','E_Rumfield Data Center','12700000','45  Michigan Ave',NULL,'Arlington','VA','20330','2020-01-05','2022-09-15',NULL,1,6,'1',3,'','1',1),
	(10,'SP_010','B_Equinox Data Center','9000000','44  Broad St',NULL,'Alexandria','VA','22306','2018-05-01','2021-12-15',NULL,3,6,'1',3,'','2',1),
	(11,'SP_011','D_Northhampton Data Center','8700000','34  North St',NULL,'Bethesda','MD','20810','2018-11-17','2021-11-01',NULL,3,6,'1',2,'','2',1),
	(12,'SP_012','E_Quint Health Center','16800000','44  Lake St',NULL,'Fredrick','MD','21701','2019-07-22','2022-09-08',NULL,1,2,'1',1,'','1',1),
	(13,'SP_013','Wolfe Health Data Center','7800000','4312  Pennsylvania Ave',NULL,'Gaithesburg','MD','20697','2017-02-24','2020-02-01',NULL,3,6,'1',1,'','2',1),
	(14,'SP_014','Velocity 5  - WV Project','3000000','45  5th Avenue',NULL,'Reston','VA','20170','2017-04-15','2019-11-01',NULL,3,5,'1',5,'','2',1),
	(15,'SP_015','D_Ocean City Hills - Tenant Interiors','9300000','67  Park Ave',NULL,'Rockville','MD','20847','2018-10-01','2021-11-21',NULL,3,8,'1',12,'','2',1),
	(16,'SP_016','C_MedLife Science Data Center','34400000','99  West St',NULL,'Silver Spring','MD','20815','2019-04-07','2021-06-01',NULL,6,6,'1',1,'','1',1),
	(17,'SP_017','B_Communication 100','16100000','44  Blue Bay',NULL,'Arlington','VA','20330','2019-10-07','2022-09-01',NULL,3,4,'1',8,'','2',2),
	(18,'SP_018','B_Charleston Regional Hospital','3000000','1000  1st Street',NULL,'Alexandria','VA','22306','2018-04-21','2020-07-31',NULL,3,5,'1',1,'','2',2),
	(19,'SP_019','B_Georgetown Med Center TI','3000000','45  Michigan Ave',NULL,'Bethesda','MD','20810','2018-08-21','2020-10-31',NULL,3,10,'1',1,'','2',1),
	(20,'SP_020','D_Open Plaza','8000000','44  Broad St',NULL,'Fredrick','MD','21701','2018-01-01','2021-12-01',NULL,3,3,'1',2,'','2',1),
	(21,'SP_021','Wunderlist Technology Center','7000000','34  North St',NULL,'Gaithesburg','MD','20697','2018-05-01','2019-03-31',NULL,3,1,'1',1,'','2',1),
	(22,'SP_022','E_QZ Data Center','8000000','44  Lake St',NULL,'Reston','VA','20170','2019-05-01','2022-12-01',NULL,1,6,'1',3,'','1',1),
	(23,'SP_023','D_Omni Data Center','92300000','4312  Pennsylvania Ave',NULL,'Rockville','MD','20847','2017-11-01','2022-12-31',NULL,3,6,'1',3,'','2',1),
	(24,'SP_024','E_Regional ER - OR Remodel','29600000','45  5th Avenue',NULL,'Silver Spring','MD','20815','2019-09-19','2022-12-19',NULL,1,10,'1',1,'','1',1),
	(25,'SP_025','TechOps Center','9000000','67  Park Ave',NULL,'Arlington','VA','20330','2018-12-01','2019-12-01',NULL,3,1,'14',1,'','2',1),
	(26,'SP_026','C_High Street Corp Campus','14000000','99  West St',NULL,'Alexandria','VA','22306','2019-04-01','2020-10-15',NULL,6,2,'14',2,'','1',2),
	(27,'SP_027','A_All Sciences Technology Center','58000000','44  Blue Bay',NULL,'Bethesda','MD','20810','2020-02-01','2022-10-01',NULL,1,5,'14',4,'','1',2),
	(28,'SP_028','C_Georgetown Urgent Care','100000000','1000  1st Street',NULL,'Fredrick','MD','21701','2019-03-15','2021-12-31',NULL,1,1,'11',1,'','1',1),
	(29,'SP_029','C_Lake Travis Community Center','22300000','2120 Lakeshore Dr',NULL,'Austin','TX','73301','2019-04-01','2020-03-01',NULL,1,1,'3',7,'','1',1);

/*!40000 ALTER TABLE `PROJECT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT_GROUP
# ------------------------------------------------------------

LOCK TABLES `PROJECT_GROUP` WRITE;
/*!40000 ALTER TABLE `PROJECT_GROUP` DISABLE KEYS */;

INSERT INTO `PROJECT_GROUP` (`GROUP_ID`, `GROUP_NAME`)
VALUES
	(1,'TBD'),
	(2,'Operations'),
	(3,'SPW');

/*!40000 ALTER TABLE `PROJECT_GROUP` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT_STAFF
# ------------------------------------------------------------

LOCK TABLES `PROJECT_STAFF` WRITE;
/*!40000 ALTER TABLE `PROJECT_STAFF` DISABLE KEYS */;

INSERT INTO `PROJECT_STAFF` (`STAFF_ID`, `PROJECT_ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`, `EXPERIENCE_ID`)
VALUES
	(1,17,'2019-10-07','2022-09-01',100.00,9,NULL,NULL,NULL,'0',NULL),
	(4,18,'2018-04-30','2020-07-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(5,2,'2019-08-01','2021-11-15',25.00,7,NULL,NULL,NULL,'0',NULL),
	(5,10,'2018-05-01','2021-12-15',25.00,7,NULL,NULL,NULL,'1',NULL),
	(5,17,'2019-10-07','2022-09-01',25.00,7,NULL,NULL,NULL,'0','[1,6,5,3]'),
	(5,18,'2018-04-21','2020-07-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	(6,11,'2018-11-17','2021-11-01',25.00,7,NULL,NULL,NULL,'1',NULL),
	(6,15,'2018-10-01','2021-11-21',25.00,7,NULL,NULL,NULL,'1',NULL),
	(6,19,'2018-08-21','2020-10-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	(6,23,'2017-11-01','2022-12-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	(7,20,'2018-01-01','2021-12-01',100.00,7,NULL,NULL,NULL,'1',NULL),
	(8,10,'2018-06-01','2021-12-15',100.00,6,NULL,NULL,NULL,'0',NULL),
	(9,19,'2018-08-21','2020-10-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(11,11,'2018-12-01','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(12,2,'2019-08-01','2021-11-15',100.00,9,NULL,NULL,NULL,'0',NULL),
	(13,15,'2018-11-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	(15,17,'2019-10-07','2022-09-01',100.00,8,NULL,NULL,NULL,'0',NULL),
	(16,3,'2018-07-01','2019-08-15',100.00,7,NULL,NULL,NULL,'1',NULL),
	(16,7,'2018-01-01','2019-12-31',100.00,7,NULL,NULL,NULL,'1',NULL),
	(18,18,'2018-04-21','2020-07-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	(19,23,'2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(20,20,'2020-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(20,21,'2018-05-01','2019-03-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(21,10,'2018-05-01','2021-12-15',100.00,9,NULL,NULL,NULL,'1',NULL),
	(22,19,'2018-08-21','2020-10-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	(23,20,'2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(24,21,'2018-05-01','2019-03-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(27,11,'2018-11-17','2021-11-01',100.00,9,NULL,NULL,NULL,'1',NULL),
	(28,15,'2018-10-01','2021-11-21',100.00,9,NULL,NULL,NULL,'1',NULL),
	(29,2,'2019-08-01','2021-11-15',100.00,8,NULL,NULL,NULL,'0',NULL),
	(30,18,'2018-04-21','2020-07-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	(31,20,'2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(32,10,'2018-05-01','2021-12-15',100.00,8,NULL,NULL,NULL,'1',NULL),
	(33,20,'2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(34,23,'2017-11-01','2022-12-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	(35,20,'2018-01-01','2021-12-01',100.00,9,NULL,NULL,NULL,'1',NULL),
	(37,19,'2018-08-21','2020-10-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	(38,11,'2018-11-17','2021-11-01',100.00,8,NULL,NULL,NULL,'1',NULL),
	(40,21,'2018-05-01','2019-03-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	(43,21,'2018-05-01','2019-03-31',100.00,7,NULL,NULL,NULL,'1',NULL),
	(47,15,'2018-10-01','2021-11-21',100.00,8,NULL,NULL,NULL,'1',NULL),
	(49,23,'2017-11-01','2022-12-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	(50,20,'2018-01-01','2021-12-01',100.00,8,NULL,NULL,NULL,'1',NULL),
	(54,23,'2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(56,23,'2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	(57,3,'2018-07-01','2019-08-15',40.00,8,NULL,NULL,NULL,'1',NULL),
	(57,7,'2018-01-01','2019-12-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	(58,21,'2018-05-01','2019-03-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	(63,15,'2019-04-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	(74,15,'2019-04-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	(81,11,'2019-04-15','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	(85,11,'2019-04-15','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL);

/*!40000 ALTER TABLE `PROJECT_STAFF` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT_STATUS
# ------------------------------------------------------------

LOCK TABLES `PROJECT_STATUS` WRITE;
/*!40000 ALTER TABLE `PROJECT_STATUS` DISABLE KEYS */;

INSERT INTO `PROJECT_STATUS` (`STATUS_ID`, `STATUS_NAME`, `DESCRIPTION`)
VALUES
	(1,'Proposal',NULL),
	(2,'Potential',NULL),
	(3,'In Progress',NULL),
	(4,'Completed',NULL),
	(5,'Closed',NULL),
	(6,'Lost',NULL),
	(7,'Hold',NULL),
	(8,'Archive',NULL),
	(9,'TBD',NULL),
	(10,'Pre-Con',NULL);

/*!40000 ALTER TABLE `PROJECT_STATUS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT_TYPE
# ------------------------------------------------------------

LOCK TABLES `PROJECT_TYPE` WRITE;
/*!40000 ALTER TABLE `PROJECT_TYPE` DISABLE KEYS */;

INSERT INTO `PROJECT_TYPE` (`TYPE_ID`, `TYPE_NAME`)
VALUES
	(1,'TBD'),
	(2,'Multi-Story Office Building'),
	(3,'Retail Space'),
	(4,'Warehouse'),
	(5,'Lab'),
	(6,'Data Center'),
	(7,'Tenant Improvement'),
	(8,'Corporate Office'),
	(9,'Student Center'),
	(10,'Hospital');

/*!40000 ALTER TABLE `PROJECT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table REGION
# ------------------------------------------------------------

LOCK TABLES `REGION` WRITE;
/*!40000 ALTER TABLE `REGION` DISABLE KEYS */;

INSERT INTO `REGION` (`REGION_ID`, `REGION_NAME`)
VALUES
	(1,'TBD'),
	(2,'Northeast'),
	(3,'SouthEast'),
	(4,'Midwest'),
	(5,'South'),
	(6,'West'),
	(7,'Southwest');

/*!40000 ALTER TABLE `REGION` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF
# ------------------------------------------------------------

LOCK TABLES `STAFF` WRITE;
/*!40000 ALTER TABLE `STAFF` DISABLE KEYS */;

INSERT INTO `STAFF` (`STAFF_ID`, `FIRST_NAME`, `MIDDLE_INITIAL`, `LAST_NAME`, `PREFERRED_NAME`, `EMAIL_ID`, `PHONE_1`, `PHONE_1_TYPE`, `PHONE_2`, `PHONE_2_TYPE`, `HOME_CITY`, `HOME_STATE`, `HOME_ZIP`, `STAFF_CERTIFICATION`, `STAFF_TRAINING`, `STAFF_PHOTO`, `STAFF_ROLE_ID`, `STAFF_GROUP_ID`, `STAFF_STATUS_ID`, `OFFICE_ID`, `EMPLOYMENT_START_DATE`)
VALUES
	(1,'Andrew','','Gill','Andy','andrew.gill@acme.com','888-123-4567','Cell','877-234-5678','Alternate','Arlington','VA','20330','','','1',9,1,1,'3','0000-00-00'),
	(2,'Annette','','Schumaker','Ann','annette.schumaker@acme.com','888-123-4568','Cell','877-234-5679','Alternate','Arlington','VA','20330','','','2',3,1,1,'3','0000-00-00'),
	(3,'Anthony','','Smith','Tony','anthony.smith@acme.com','888-123-4569','Cell','877-234-5680','Alternate','Rockville','MD','20847','','','3',4,1,1,'3','0000-00-00'),
	(4,'Anthony','','Mansfield','','anthony.mansfield@acme.com','888-123-4570','Cell','877-234-5681','Alternate','Fredrick','MD','21701','','','4',6,1,1,'3','0000-00-00'),
	(5,'Armand','','Neuman','','armand.neuman@acme.com','888-123-4571','Cell','877-234-5682','Alternate','Bethesda','MD','20810','','','5',7,1,1,'3','0000-00-00'),
	(6,'Braden','','Eichler','','braden.eichler@acme.com','888-123-4572','Cell','877-234-5683','Alternate','Fredrick','MD','21701','','','6',7,1,1,'3','0000-00-00'),
	(7,'Bradley','','Schmidt','Brad','bradley.schmidt@acme.com','888-123-4573','Cell','877-234-5684','Alternate','Gaithesburg','MD','20697','','','7',7,1,1,'3','0000-00-00'),
	(8,'Brandi','','Hartwick','','brandi.hartwick@acme.com','888-123-4574','Cell','877-234-5685','Alternate','Rockville','MD','20847','','','8',6,1,1,'3','0000-00-00'),
	(9,'Brenda','G','Cohen','','brenda.cohen@acme.com','888-123-4575','Cell','877-234-5686','Alternate','Reston','VA','20170','','','9',6,1,1,'3','0000-00-00'),
	(10,'Bridget','','Shultz','','bridget.schultz@acme.com','888-123-4576','Cell','877-234-5687','Alternate','Rockville','MD','20847','','','10',5,1,1,'3','0000-00-00'),
	(11,'Brody','','Cauldfield','','brody.cauldfield@acme.com','888-123-4577','Cell','877-234-5688','Alternate','Gaithesburg','MD','20697','','','11',6,1,1,'3','0000-00-00'),
	(12,'Caesar','','Morris','','caesar.morris@acme.com','888-123-4578','Cell','877-234-5689','Alternate','Alexandria','VA','22306','','','12',9,1,1,'3','0000-00-00'),
	(13,'Callan','','Williams','','callan.williams@acme.com','888-123-4579','Cell','877-234-5690','Alternate','Silver Spring','MD','20815','','','13',6,1,1,'3','0000-00-00'),
	(14,'Chad','L','Morris','','chad.morris@acme.com','888-123-4580','Cell','877-234-5691','Alternate','Silver Spring','MD','20815','','','14',4,1,1,'3','0000-00-00'),
	(15,'Charles','','Talbot','Chuck','charles.talbot@acme.com','888-123-4581','Cell','877-234-5692','Alternate','Alexandria','VA','22306','','','15',8,1,1,'14','0000-00-00'),
	(16,'Chase','','Moore','','chase.moore@acme.com','888-123-4582','Cell','877-234-5693','Alternate','Reston','VA','20170','','','16',7,1,1,'3','0000-00-00'),
	(17,'Christian','','Maher','','christian.maher@acme.com','888-123-4583','Cell','877-234-5694','Alternate','Arlington','VA','20330','','','17',4,1,1,'3','0000-00-00'),
	(18,'Christopher','','Campbell','Chris','christopher.campbell@acme.com','888-123-4584','Cell','877-234-5695','Alternate','Bethesda','MD','20810','','','18',9,1,1,'3','0000-00-00'),
	(19,'Cody','','Maher','','cody.maher@acme.com','888-123-4585','Cell','877-234-5696','Alternate','Arlington','VA','20330','','','19',6,1,1,'3','0000-00-00'),
	(20,'Dan','','Gollet','','dan.gollet@acme.com','888-123-4586','Cell','877-234-5697','Alternate','Arlington','VA','20330','','','20',6,1,1,'3','0000-00-00'),
	(21,'Darrin','','Jackson','','darrin.jackson@acme.com','888-123-4587','Cell','877-234-5698','Alternate','Gaithesburg','MD','20697','','','21',9,1,1,'3','0000-00-00'),
	(22,'Dave','','Robbins','','dave.robbins@acme.com','888-123-4588','Cell','877-234-5699','Alternate','Reston','VA','20170','','','22',9,1,1,'3','0000-00-00'),
	(23,'David','','Newberry','Dave','david.newberry@acme.com','888-123-4589','Cell','877-234-5700','Alternate','Alexandria','VA','22306','','','23',6,1,1,'3','0000-00-00'),
	(24,'Don','','Brockfield','','dob.brockfield@acme.com','888-123-4590','Cell','877-234-5701','Alternate','Alexandria','VA','22306','','','24',6,1,1,'3','0000-00-00'),
	(25,'Donald','','Eishenhower','Don','donald.eisenhower@acme.com','888-123-4591','Cell','877-234-5702','Alternate','Alexandria','VA','22306','','','25',4,1,1,'3','0000-00-00'),
	(26,'Dorreen','','Winchester','','dorreen.winchester@acme.com','888-123-4592','Cell','877-234-5703','Alternate','Alexandria','VA','22306','','','26',3,1,1,'3','0000-00-00'),
	(27,'Douglas','','Bowman','Doug','douglas.bowman@acme.com','888-123-4593','Cell','877-234-5704','Alternate','Fredrick','MD','21701','','','27',9,1,1,'3','0000-00-00'),
	(28,'Edward','','Tudor','Ed','edward.tudor@acme.com','888-123-4594','Cell','877-234-5705','Alternate','Rockville','MD','20847','','','28',9,1,1,'3','0000-00-00'),
	(29,'Eliza','B','Darwin','Liz','eliza.darwin@acme.com','888-123-4595','Cell','877-234-5706','Alternate','Bethesda','MD','20810','','','29',8,1,1,'3','0000-00-00'),
	(30,'Emma','','Covington','','emma.covington@acme.com','888-123-4596','Cell','877-234-5707','Alternate','Fredrick','MD','21701','','','30',8,1,1,'3','0000-00-00'),
	(31,'Erik','','Ramsey','','erik.ramsey@acme.com','888-123-4597','Cell','877-234-5708','Alternate','Bethesda','MD','20810','','','31',6,1,1,'3','0000-00-00'),
	(32,'Eron','','Flynn','','eron.flynn@acme.com','888-123-4598','Cell','877-234-5709','Alternate','Gaithesburg','MD','20697','','','32',8,1,1,'3','0000-00-00'),
	(33,'Ferdinand','','Churchill','Fred','ferdinand.churchill@acme.com','888-123-4599','Cell','877-234-5710','Alternate','Fredrick','MD','21701','','','33',6,1,1,'3','0000-00-00'),
	(34,'Grant','','Orwell','','grant.orwell@acme.com','888-123-4600','Cell','877-234-5711','Alternate','Arlington','VA','20330','','','34',9,1,1,'3','0000-00-00'),
	(35,'Greg','','Orlitz','','greg.orlitz@acme.com','888-123-4601','Cell','877-234-5712','Alternate','Silver Spring','MD','20815','','','35',9,1,1,'3','0000-00-00'),
	(37,'Jacob','','Feddero','Jake','jacob.feddero@acme.com','888-123-4603','Cell','877-234-5714','Alternate','Reston','VA','20170','','','37',8,1,1,'3','0000-00-00'),
	(38,'Jaeger','','Bronte','','jaeger.bronte@acme.com','888-123-4604','Cell','877-234-5715','Alternate','Rockville','MD','20847','','','38',8,1,1,'3','0000-00-00'),
	(39,'Janice','','Poppins','','janice.poppins@acme.com','888-123-4605','Cell','877-234-5716','Alternate','Silver Spring','MD','20815','','','39',5,1,1,'3','0000-00-00'),
	(40,'Jerome','O','Feliz','Jerry','jerome.feliz@acme.com','888-123-4606','Cell','877-234-5717','Alternate','Bethesda','MD','20810','','','40',9,1,1,'3','0000-00-00'),
	(41,'Jerri','','McCarty','','jerri.mccarty@acme.com','888-123-4607','Cell','877-234-5718','Alternate','Arlington','VA','20330','','','41',5,1,1,'3','0000-00-00'),
	(42,'Jim','','Luther','','jim.luther@acme.com','888-123-4608','Cell','877-234-5719','Alternate','Alexandria','VA','22306','','','42',9,1,1,'3','0000-00-00'),
	(43,'John','','Lennon','','john.lennon@acme.com','888-123-4609','Cell','877-234-5720','Alternate','Rockville','MD','20847','','','43',7,1,1,'3','0000-00-00'),
	(44,'Josef','','Speer','','josef.speer@acme.com','888-123-4610','Cell','877-234-5721','Alternate','Bethesda','MD','20810','','','44',6,1,1,'3','0000-00-00'),
	(45,'Josie','','Belk','','josie.belk@acme.com','888-123-4611','Cell','877-234-5722','Alternate','Reston','VA','20170','','','45',2,1,1,'3','0000-00-00'),
	(46,'Karen','','Coutinho','','karen.coutinho@acme.com','888-123-4612','Cell','877-234-5723','Alternate','Alexandria','VA','22306','','','',5,1,1,'3','0000-00-00'),
	(47,'Karl','A','Shilpberg','','karl.shilpberg@acme.com','888-123-4613','Cell','877-234-5724','Alternate','Silver Spring','MD','20815','','','47',8,1,1,'3','0000-00-00'),
	(48,'Kate','','Jefferson','','kate.jefferson@acme.com','888-123-4614','Cell','877-234-5725','Alternate','Bethesda','MD','20810','','','48',3,1,1,'3','0000-00-00'),
	(49,'Kim','','Kardin','','kim.kardin@acme.com','888-123-4615','Cell','877-234-5726','Alternate','Arlington','VA','20330','','','49',8,1,1,'3','0000-00-00'),
	(50,'Klein','','Henrick','','klein.henrick@acme.com','888-123-4616','Cell','877-234-5727','Alternate','Alexandria','VA','22306','','','50',8,1,1,'3','0000-00-00'),
	(51,'Kyle','','Paloma','','kyle.paloma@acme.com','888-123-4617','Cell','877-234-5728','Alternate','Gaithesburg','MD','20697','','','51',9,1,1,'3','0000-00-00'),
	(52,'Lee','','Major','','lee.major@acme.com','888-123-4618','Cell','877-234-5729','Alternate','Bethesda','MD','20810','','','52',6,1,1,'3','0000-00-00'),
	(53,'Liam','','Neeson','','liam.neeson@acme.com','888-123-4619','Cell','877-234-5730','Alternate','Silver Spring','MD','20815','','','53',7,1,1,'3','0000-00-00'),
	(54,'Lina','','Dockrill','','lina.dockrill@acme.com','888-123-4620','Cell','877-234-5731','Alternate','Reston','VA','20170','','','54',6,1,1,'3','0000-00-00'),
	(55,'Linda','','Gray','','linda.gray@acme.com','888-123-4621','Cell','877-234-5732','Alternate','Fredrick','MD','21701','','','55',3,1,1,'3','0000-00-00'),
	(56,'Lisa','Y','Simpson','','lisa.simpson@acme.com','888-123-4622','Cell','877-234-5733','Alternate','Gaithesburg','MD','20697','','','56',6,1,1,'3','0000-00-00'),
	(57,'Michael','','Lunar','','michael.lunar@acme.com','888-123-4623','Cell','877-234-5734','Alternate','Fredrick','MD','21701','','','57',8,1,1,'3','0000-00-00'),
	(58,'Mike','','Whittern','','mike.whittern@acme.com','888-123-4624','Cell','877-234-5735','Alternate','Bethesda','MD','20810','','','58',8,1,1,'3','0000-00-00'),
	(59,'Mike','','Abbott','','mike.abbott@acme.com','888-123-4625','Cell','877-234-5736','Alternate','Reston','VA','20170','','','59',9,1,1,'3','0000-00-00'),
	(60,'Mitch','','Borges','','mitch.borges@acme.com','888-123-4626','Cell','877-234-5737','Alternate','Gaithesburg','MD','20697','','','60',8,1,1,'3','0000-00-00'),
	(61,'Mitchell','','Townsend','Mitch','mitchell.townsend@acme.com','888-123-4627','Cell','877-234-5738','Alternate','Arlington','VA','20330','','','61',7,1,1,'3','0000-00-00'),
	(62,'Ned','','Kristoffensen','','ned.kristoffensen@acme.com','888-123-4628','Cell','877-234-5739','Alternate','Fredrick','MD','21701','','','62',6,1,1,'3','0000-00-00'),
	(63,'Nick','','Kline','','nick.kline@acme.com','888-123-4629','Cell','877-234-5740','Alternate','Rockville','MD','20847','','','63',6,1,1,'3','0000-00-00'),
	(64,'Orphelia','','Beecham','','orphelia.beecham@acme.com','888-123-4630','Cell','877-234-5741','Alternate','Gaithesburg','MD','20697','','','64',6,1,1,'3','0000-00-00'),
	(65,'Palmer','','Kerns','','palmer.kerns@acme.com','888-123-4631','Cell','877-234-5742','Alternate','Reston','VA','20170','','','65',8,1,1,'3','0000-00-00'),
	(66,'Parker','T','Marchessa','','parker.marchessa@acme.com','888-123-4632','Cell','877-234-5743','Alternate','Rockville','MD','20847','','','66',9,1,1,'3','0000-00-00'),
	(67,'Perry','','Ellis','','perry.ellis@acme.com','888-123-4633','Cell','877-234-5744','Alternate','Rockville','MD','20847','','','67',8,1,1,'3','0000-00-00'),
	(68,'Ray','','Aiken','','ray.aiken@acme.com','888-123-4634','Cell','877-234-5745','Alternate','Silver Spring','MD','20815','','','68',9,1,1,'3','0000-00-00'),
	(69,'Rick','','Springfield','','first.last@acme.com','888-123-4635','Cell','877-234-5746','Alternate','Gaithesburg','MD','20697','','','69',6,1,1,'3','0000-00-00'),
	(70,'Robin','','Danish','','first.last@acme.com','888-123-4636','Cell','877-234-5747','Alternate','Reston','VA','20170','','','70',6,1,1,'3','0000-00-00'),
	(71,'Roger','','Rinaldo','','first.last@acme.com','888-123-4637','Cell','877-234-5748','Alternate','Arlington','VA','20330','','','71',9,1,1,'3','0000-00-00'),
	(72,'Roman','','Williams','','first.last@acme.com','888-123-4638','Cell','877-234-5749','Alternate','Reston','VA','20170','','','72',6,1,1,'3','0000-00-00'),
	(73,'Ron','','Sonsinni','','first.last@acme.com','888-123-4639','Cell','877-234-5750','Alternate','Alexandria','VA','22306','','','73',6,1,1,'3','0000-00-00'),
	(74,'Rosie','','O\'Donnell','','first.last@acme.com','888-123-4640','Cell','877-234-5751','Alternate','Silver Spring','MD','20815','','','74',6,1,1,'3','0000-00-00'),
	(75,'Roy','','Rogers','','roy.rogers@acme.com','888-123-4641','Cell','877-234-5752','Alternate','Fredrick','MD','21701','','','75',6,1,1,'3','0000-00-00'),
	(76,'Ryan','S','Malcolm','','ryan.malcolm@acme.com','888-123-4642','Cell','877-234-5753','Alternate','Rockville','MD','20847','','','76',2,1,1,'3','0000-00-00'),
	(77,'Shawn','','Franklin','','franklin.shawn@acme.com','888-123-4643','Cell','877-234-5754','Alternate','Gaithesburg','MD','20697','','','77',6,1,1,'3','0000-00-00'),
	(78,'Thomas','','Edison','Tom','thomas.edison@acme.com','888-123-4644','Cell','877-234-5755','Alternate','Silver Spring','MD','20815','','','78',2,1,1,'3','0000-00-00'),
	(79,'Thomas','','Cook','','first.last@acme.com','888-123-4645','Cell','877-234-5756','Alternate','Fredrick','MD','21701','','','79',6,1,1,'3','0000-00-00'),
	(80,'Tim','','Gates','','first.last@acme.com','888-123-4646','Cell','877-234-5757','Alternate','Fredrick','MD','21701','','','80',6,1,1,'3','0000-00-00'),
	(81,'Tyler','','Moffett','','first.last@acme.com','888-123-4648','Cell','877-234-5759','Alternate','Arlington','VA','20330','','','81',6,1,1,'3','0000-00-00'),
	(82,'Tyler','C','Kastelan','','first.last@acme.com','888-123-4649','Cell','877-234-5760','Alternate','Gaithesburg','MD','20697','','','82',6,1,1,'3','0000-00-00'),
	(83,'Verona','','Capulet','','first.last@acme.com','888-123-4650','Cell','877-234-5761','Alternate','Bethesda','MD','20810','','','83',2,1,1,'3','0000-00-00'),
	(84,'Will','','Hefner','','first.last@acme.com','888-123-4651','Cell','877-234-5762','Alternate','Silver Spring','MD','20815','','','84',8,1,1,'3','0000-00-00'),
	(85,'William','V','Atkins','Will','first.last@acme.com','888-123-4652','Cell','877-234-5763','Alternate','Alexandria','VA','22306','','','85',6,1,1,'3','0000-00-00');

/*!40000 ALTER TABLE `STAFF` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_CERTIFICATION
# ------------------------------------------------------------

LOCK TABLES `STAFF_CERTIFICATION` WRITE;
/*!40000 ALTER TABLE `STAFF_CERTIFICATION` DISABLE KEYS */;

INSERT INTO `STAFF_CERTIFICATION` (`STAFF_CERTIFICATION_ID`, `STAFF_ID`, `CERTIFICATION_ID`)
VALUES
	(1,5,3),
	(2,5,5);

/*!40000 ALTER TABLE `STAFF_CERTIFICATION` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_GROUP
# ------------------------------------------------------------

LOCK TABLES `STAFF_GROUP` WRITE;
/*!40000 ALTER TABLE `STAFF_GROUP` DISABLE KEYS */;

INSERT INTO `STAFF_GROUP` (`GROUP_ID`, `GROUP_NAME`)
VALUES
	(1,'TBD'),
	(2,'Operation'),
	(3,'SPW'),
	(4,'Estimator'),
	(5,'Admin'),
	(6,'Intern');

/*!40000 ALTER TABLE `STAFF_GROUP` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_PROJECT_EXPERIENCE
# ------------------------------------------------------------



# Dump of table STAFF_ROLE
# ------------------------------------------------------------

LOCK TABLES `STAFF_ROLE` WRITE;
/*!40000 ALTER TABLE `STAFF_ROLE` DISABLE KEYS */;

INSERT INTO `STAFF_ROLE` (`ROLE_ID`, `ROLE_NAME`)
VALUES
	(1,'Assistant Superintendent'),
	(2,'BIM Project Engineer'),
	(3,'Field Office Coordinator'),
	(4,'MEP Coordinator'),
	(5,'Project Accountant'),
	(6,'Project Engineer'),
	(7,'Project Executive'),
	(8,'Project Manager'),
	(9,'Project Superintendent'),
	(10,'Intern'),
	(11,'TBD');

/*!40000 ALTER TABLE `STAFF_ROLE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_STATUS
# ------------------------------------------------------------

LOCK TABLES `STAFF_STATUS` WRITE;
/*!40000 ALTER TABLE `STAFF_STATUS` DISABLE KEYS */;

INSERT INTO `STAFF_STATUS` (`STATUS_ID`, `STATUS_NAME`)
VALUES
	(1,'Active'),
	(2,'Inactive'),
	(3,'Leave of Absence'),
	(4,'Retired'),
	(5,'Sabbatical');

/*!40000 ALTER TABLE `STAFF_STATUS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USER_ACCESS
# ------------------------------------------------------------

LOCK TABLES `USER_ACCESS` WRITE;
/*!40000 ALTER TABLE `USER_ACCESS` DISABLE KEYS */;

INSERT INTO `USER_ACCESS` (`USER_ACCESS_ID`, `USER_ID`, `OFFICE_ID`, `REGION_ID`)
VALUES
	(1,50,14,1);

/*!40000 ALTER TABLE `USER_ACCESS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USERS
# ------------------------------------------------------------

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`USER_ID`, `ROLE_ID`, `FIRST_NAME`, `MIDDLE_NAME`, `LAST_NAME`, `EMAIL`, `PASSWORD`, `VERIFIED`, `ADDRESS`, `CITY`, `COUNTRY`, `ZIP`)
VALUES
	(50,1,'StaffPlan','','Admin','admin@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022');

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
