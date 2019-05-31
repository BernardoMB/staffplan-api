
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ACCESS_TYPE
# ------------------------------------------------------------

LOCK TABLES `ACCESS_TYPE` WRITE;
/*!40000 ALTER TABLE `ACCESS_TYPE` DISABLE KEYS */;

INSERT INTO `ACCESS_TYPE` (`ID`, `TYPE`)
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

INSERT INTO `CUSTOM_LABEL` (`ID`, `TABLE_NAME`, `FIELD_NAME`, `CUSTOM_FIELD`)
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
	('CID_001','Asheville Medical Center','NULL','NULL','NULL','NULL','John Smith','NULL'),
	('CID_002','Alexandria General Hospital','NULL','NULL','NULL','NULL','Jim Bob','NULL'),
	('CID_003','Techno Data Systems','NULL','NULL','NULL','NULL','Jason Hendricks','NULL'),
	('CID_004','Apricot Development Companies','NULL','NULL','NULL','NULL','Hedda Herring','NULL'),
	('CID_005','British Telecom','NULL','NULL','NULL','NULL','Jada Maldonado','NULL'),
	('CID_006','Digital Broadcast','NULL','NULL','NULL','NULL','August McLeod','NULL'),
	('CID_007','Technology Virtual Center','NULL','NULL','NULL','NULL','Prescott Jacobson','NULL'),
	('CID_008','Ops Technology','NULL','NULL','NULL','NULL','Shelly Hahn','NULL'),
	('CID_009','Rufus Companies','NULL','NULL','NULL','NULL','Wade Burnett','NULL'),
	('CID_010','Equinox','NULL','NULL','NULL','NULL','Emery Shannon','NULL'),
	('CID_011','Northhampton Companies','NULL','NULL','NULL','NULL','Candice McCall','NULL'),
	('CID_012','Quint Health Center','NULL','NULL','NULL','NULL','Anthony Owen','NULL'),
	('CID_013','Wolfe Health Medical Center','NULL','NULL','NULL','NULL','Tate Edwards','NULL'),
	('CID_014','Velocity 5','NULL','NULL','NULL','NULL','Calvin Ewing','NULL'),
	('CID_015','Ocean Hills Development Co','NULL','NULL','NULL','NULL','Brady Sharpe','NULL'),
	('CID_016','MedLife Science','NULL','NULL','NULL','NULL','Lionel Henson','NULL'),
	('CID_017','Communication 100','NULL','NULL','NULL','NULL','Clayton Osborne','NULL'),
	('CID_018','Charleston Regional Hospital','NULL','NULL','NULL','NULL','Rogan Irwin','NULL'),
	('CID_019','Georgetown Medical Center','NULL','NULL','NULL','NULL','Alexa Sweeney','NULL'),
	('CID_020','Open Plaza','NULL','NULL','NULL','NULL','Burke Nieves','NULL'),
	('CID_021','Wunderlist Technology Center','NULL','NULL','NULL','NULL','Nathan Bell','NULL'),
	('CID_022','QZ Inc','NULL','NULL','NULL','NULL','Kay Jarvis','NULL'),
	('CID_023','Omni Inc','NULL','NULL','NULL','NULL','Sherman Griffith','NULL'),
	('CID_024','Maryland Regional Health Care','NULL','NULL','NULL','NULL','Shelby Schwartz','NULL'),
	('CID_025','TechOps Inc','NULL','NULL','NULL','NULL','Kim Baxter','NULL'),
	('CID_026','High Street Corp','NULL','NULL','NULL','NULL','Tucker Moreno','NULL'),
	('CID_027','All Sciences Inc','NULL','NULL','NULL','NULL','Alan Boyle','NULL'),
	('CID_028','Georgetown Medical Center','NULL','NULL','NULL','NULL','Regina Pierce','NULL'),
	('CID_029','San Andreas Community College','NULL','NULL','NULL','NULL','Matthew Spence','NULL'),
	('CID_030','Allentown University','NULL','NULL','NULL','NULL','Dale Henry','NULL');

/*!40000 ALTER TABLE `CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER_PROJECTS
# ------------------------------------------------------------



# Dump of table OFFICE
# ------------------------------------------------------------

LOCK TABLES `OFFICE` WRITE;
/*!40000 ALTER TABLE `OFFICE` DISABLE KEYS */;

INSERT INTO `OFFICE` (`OFFICE_ID`, `OFFICE_NAME`, `OFFICE_ADDRESS`, `OFFICE_CITY`, `OFFICE_STATE`, `OFFICE_ZIP`, `OFFICE_TYPE`, `REGION_ID`)
VALUES
	('OID_001','TBD','TBD','TBD','','','',1),
	('OID_002','Phoenix','580 Forest Avenue','Phoenix','AZ','85001','',2),
	('OID_003','Austin','1791 Gold Cliff Circle','Austin','TX','73301','',2),
	('OID_004','Boston','4044 Stadium Drive','Boston','MA','2110','',2),
	('OID_005','Chicago','4100 Federal Road','Chicago','IL','60631','',4),
	('OID_006','Madison','675 Comfort Court','Madison','WI','53718','',4),
	('OID_007','Los Angeles','1834 Woodstock Drive','Los Angeles','CA','90014','',6),
	('OID_008','Seattle','3136 Raccoon Run','Seattle','WA','98101','',6),
	('OID_009','Atlanta','2487 Stroop Hill Road','Atlanta','GA','30303','',3),
	('OID_010','Detroit','3483 State Street','Detroit','MI','48213','',4),
	('OID_011','Raleigh','747 Johnson Street','Raleigh','NC','27604','',3),
	('OID_012','Philadelphia','3045 Young Road','Philadelphia','PA','19144','',2),
	('OID_013','Miami','4246 Ridenour Street','Miami','FL','33169','',3),
	('OID_014','Baltimore','2433 Hickory Heights Drive','Baltimore','MD','21201','',2);

/*!40000 ALTER TABLE `OFFICE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PLANNED_PROJECT_PEOPLE
# ------------------------------------------------------------

LOCK TABLES `PLANNED_PROJECT_PEOPLE` WRITE;
/*!40000 ALTER TABLE `PLANNED_PROJECT_PEOPLE` DISABLE KEYS */;

INSERT INTO `PLANNED_PROJECT_PEOPLE` (`ID`, `PROJECT_ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`)
VALUES
	(3,'PID_003','2019-07-01','2019-08-10',100.00,6,NULL,NULL,NULL,'0'),
	(6,'PID_014','2019-04-15','2019-11-01',100.00,6,NULL,NULL,NULL,'0'),
	(11,'PID_027','2020-02-01','2022-10-01',100.00,8,NULL,NULL,NULL,'1'),
	(12,'PID_027','2020-02-01','2022-10-01',100.00,9,NULL,NULL,NULL,'1'),
	(14,'PID_004','2019-12-01','2022-12-30',25.00,7,NULL,NULL,NULL,'1'),
	(15,'PID_004','2019-12-01','2022-12-30',100.00,8,NULL,NULL,NULL,'1'),
	(16,'PID_004','2019-12-01','2022-12-30',100.00,9,NULL,NULL,NULL,'1'),
	(17,'PID_001','2019-08-08','2022-08-20',100.00,8,NULL,NULL,NULL,'1'),
	(18,'PID_001','2019-08-08','2022-08-20',25.00,7,NULL,NULL,NULL,'1'),
	(19,'PID_001','2019-08-08','2022-08-20',100.00,9,NULL,NULL,NULL,'1'),
	(26,'PID_028','2019-03-15','2021-12-31',100.00,8,NULL,NULL,NULL,'1'),
	(27,'PID_028','2019-03-15','2021-12-31',100.00,9,NULL,NULL,NULL,'1'),
	(28,'PID_028','2019-03-15','2021-12-31',25.00,9,NULL,NULL,NULL,'1'),
	(29,'PID_026','2019-04-01','2020-10-15',100.00,8,NULL,NULL,NULL,'1'),
	(30,'PID_026','2019-04-01','2020-10-15',25.00,7,NULL,NULL,NULL,'1'),
	(31,'PID_026','2019-04-01','2020-10-15',100.00,9,NULL,NULL,NULL,'1'),
	(32,'PID_029','2019-04-01','2020-03-01',25.00,7,NULL,NULL,NULL,'1'),
	(33,'PID_029','2019-04-01','2020-03-01',100.00,8,NULL,NULL,NULL,'1'),
	(34,'PID_029','2019-04-01','2020-03-01',100.00,9,NULL,NULL,NULL,'1'),
	(35,'PID_016','2019-04-07','2021-06-01',100.00,8,NULL,NULL,NULL,'1'),
	(36,'PID_016','2019-04-07','2021-06-01',25.00,7,NULL,NULL,NULL,'1'),
	(37,'PID_016','2019-04-07','2021-06-01',100.00,9,NULL,NULL,NULL,'1'),
	(38,'PID_008','2019-04-15','2021-12-31',100.00,8,NULL,NULL,NULL,'1'),
	(39,'PID_008','2019-04-15','2021-12-31',25.00,7,NULL,NULL,NULL,'1'),
	(40,'PID_008','2019-04-15','2021-12-31',100.00,9,NULL,NULL,NULL,'1'),
	(41,'PID_012','2019-07-22','2022-09-08',25.00,7,NULL,NULL,NULL,'1'),
	(42,'PID_012','2019-07-22','2022-09-08',100.00,8,NULL,NULL,NULL,'1'),
	(43,'PID_012','2019-07-22','2022-09-08',100.00,9,NULL,NULL,NULL,'1'),
	(44,'PID_022','2019-05-01','2022-12-01',25.00,7,NULL,NULL,NULL,'1'),
	(45,'PID_022','2019-05-01','2022-12-01',100.00,8,NULL,NULL,NULL,'1'),
	(46,'PID_022','2019-05-01','2022-12-01',100.00,9,NULL,NULL,NULL,'1'),
	(47,'PID_024','2019-09-19','2022-12-19',25.00,7,NULL,NULL,NULL,'1'),
	(48,'PID_024','2019-09-19','2022-12-19',100.00,8,NULL,NULL,NULL,'1'),
	(49,'PID_024','2019-09-19','2022-12-19',100.00,9,NULL,NULL,NULL,'1'),
	(50,'PID_009','2020-01-05','2022-09-15',25.00,7,NULL,NULL,NULL,'1'),
	(51,'PID_009','2020-01-05','2022-09-15',100.00,8,NULL,NULL,NULL,'1'),
	(52,'PID_009','2020-01-05','2022-09-15',100.00,9,NULL,NULL,NULL,'1');

/*!40000 ALTER TABLE `PLANNED_PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT
# ------------------------------------------------------------

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;

INSERT INTO `PROJECT` (`PROJECT_ID`, `GROUP_ID`, `PROJECT_NO`, `PROJECT_NAME`, `PROJECT_ROM`, `PROJECT_ADDRESS`, `PROJECT_CITY`, `PROJECT_STATE`, `PROJECT_ZIP`, `START_DATE`, `END_DATE`, `PROJECT_DURATION`, `PROJECT_STATUS_ID`, `PROJECT_TYPE_ID`, `OFFICE_ID`, `CATEGORY_ID`, `PROJECT_DESCRIPTION`, `TIMELINE_TYPE`)
VALUES
	('PID_001',1,'SP_001','A_Ashville Regional Medical Center','17300000','34 North St','Arlington','VA','20330','2019-08-08','2022-08-20',NULL,1,10,'OID_001',1,'','1'),
	('PID_002',1,'SP_002','B_General Hospital Center - Suite 100','21300000','44 Lake St','Alexandria','VA','22306','2019-08-01','2021-11-15',NULL,3,10,'OID_001',1,'','2'),
	('PID_003',1,'SP_003','Tech Data Center - East Center','12700000','4312  Pennsylvania Ave','Bethesda','MD','20810','2018-07-01','2019-08-15',NULL,3,6,'OID_001',3,'','2'),
	('PID_004',2,'SP_004','A_Apricot West Suites 110 & 210','8100000','45  5th Avenue','Fredrick','MD','21701','2019-12-01','2022-12-30',NULL,1,2,'OID_014',14,'','1'),
	('PID_005',1,'SP_005','A_BT Data Center 2201','8000000','67  Park Ave','Gaithesburg','MD','20697','2020-02-17','2022-02-01',NULL,1,6,'OID_001',3,'','1'),
	('PID_006',1,'SP_006','A_Broadcast Data Center','8000000','99  West St','Reston','VA','20170','2019-06-01','2020-12-01',NULL,1,6,'OID_001',3,'','1'),
	('PID_007',1,'SP_007','Tech Virtual Ware - Project Mountain','16800000','44  Blue Bay','Rockville','MD','20847','2018-01-01','2019-12-31',NULL,3,8,'OID_001',3,'','2'),
	('PID_008',1,'SP_008','E_Operation Data Center','9300000','1000  1st Street','Silver Spring','MD','20815','2019-04-15','2021-12-31',NULL,1,6,'OID_001',3,'','1'),
	('PID_009',1,'SP_009','E_Rumfield Data Center','12700000','45  Michigan Ave','Arlington','VA','20330','2020-01-05','2022-09-15',NULL,1,6,'OID_001',3,'','1'),
	('PID_010',1,'SP_010','B_Equinox Data Center','9000000','44  Broad St','Alexandria','VA','22306','2018-05-01','2021-12-15',NULL,3,6,'OID_001',3,'','2'),
	('PID_011',1,'SP_011','D_Northhampton Data Center','8700000','34  North St','Bethesda','MD','20810','2018-11-17','2021-11-01',NULL,3,6,'OID_001',2,'','2'),
	('PID_012',1,'SP_012','E_Quint Health Center','16800000','44  Lake St','Fredrick','MD','21701','2019-07-22','2022-09-08',NULL,1,2,'OID_001',1,'','1'),
	('PID_013',1,'SP_013','Wolfe Health Data Center','7800000','4312  Pennsylvania Ave','Gaithesburg','MD','20697','2017-02-24','2020-02-01',NULL,3,6,'OID_001',1,'','2'),
	('PID_014',1,'SP_014','Velocity 5  - WV Project','3000000','45  5th Avenue','Reston','VA','20170','2017-04-15','2019-11-01',NULL,3,5,'OID_001',5,'','2'),
	('PID_015',1,'SP_015','D_Ocean City Hills - Tenant Interiors','9300000','67  Park Ave','Rockville','MD','20847','2018-10-01','2021-11-21',NULL,3,8,'OID_001',12,'','2'),
	('PID_016',1,'SP_016','C_MedLife Science Data Center','34400000','99  West St','Silver Spring','MD','20815','2019-04-07','2021-06-01',NULL,6,6,'OID_001',1,'','1'),
	('PID_017',2,'SP_017','B_Communication 100','16100000','44  Blue Bay','Arlington','VA','20330','2019-10-07','2022-09-01',NULL,3,4,'OID_001',8,'','2'),
	('PID_018',2,'SP_018','B_Charleston Regional Hospital','3000000','1000  1st Street','Alexandria','VA','22306','2018-04-21','2020-07-31',NULL,3,5,'OID_001',1,'','2'),
	('PID_019',1,'SP_019','B_Georgetown Med Center TI','3000000','45  Michigan Ave','Bethesda','MD','20810','2018-08-21','2020-10-31',NULL,3,10,'OID_001',1,'','2'),
	('PID_020',1,'SP_020','D_Open Plaza','8000000','44  Broad St','Fredrick','MD','21701','2018-01-01','2021-12-01',NULL,3,3,'OID_001',2,'','2'),
	('PID_021',1,'SP_021','Wunderlist Technology Center','7000000','34  North St','Gaithesburg','MD','20697','2018-05-01','2019-03-31',NULL,3,1,'OID_001',1,'','2'),
	('PID_022',1,'SP_022','E_QZ Data Center','8000000','44  Lake St','Reston','VA','20170','2019-05-01','2022-12-01',NULL,1,6,'OID_001',3,'','1'),
	('PID_023',1,'SP_023','D_Omni Data Center','92300000','4312  Pennsylvania Ave','Rockville','MD','20847','2017-11-01','2022-12-31',NULL,3,6,'OID_001',3,'','2'),
	('PID_024',1,'SP_024','E_Regional ER - OR Remodel','29600000','45  5th Avenue','Silver Spring','MD','20815','2019-09-19','2022-12-19',NULL,1,10,'OID_001',1,'','1'),
	('PID_025',1,'SP_025','TechOps Center','9000000','67  Park Ave','Arlington','VA','20330','2018-12-01','2019-12-01',NULL,3,1,'OID_014',1,'','2'),
	('PID_026',2,'SP_026','C_High Street Corp Campus','14000000','99  West St','Alexandria','VA','22306','2019-04-01','2020-10-15',NULL,6,2,'OID_014',2,'','1'),
	('PID_027',2,'SP_027','A_All Sciences Technology Center','58000000','44  Blue Bay','Bethesda','MD','20810','2020-02-01','2022-10-01',NULL,1,5,'OID_014',4,'','1'),
	('PID_028',1,'SP_028','C_Georgetown Urgent Care','100000000','1000  1st Street','Fredrick','MD','21701','2019-03-15','2021-12-31',NULL,1,1,'OID_011',1,'','1'),
	('PID_029',1,'SP_029','C_Lake Travis Community Center','22300000','2120 Lakeshore Dr','Austin','TX','73301','2019-04-01','2020-03-01',NULL,1,1,'OID_003',7,'','1');

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


# Dump of table PROJECT_PEOPLE
# ------------------------------------------------------------

LOCK TABLES `PROJECT_PEOPLE` WRITE;
/*!40000 ALTER TABLE `PROJECT_PEOPLE` DISABLE KEYS */;

INSERT INTO `PROJECT_PEOPLE` (`STAFF_ID`, `PROJECT_ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`, `EXPERIENCE_ID`)
VALUES
	('EID_015','PID_017','2019-10-07','2022-09-01',100.00,8,NULL,NULL,NULL,'0',NULL),
	('EID_001','PID_017','2019-10-07','2022-09-01',100.00,9,NULL,NULL,NULL,'0',NULL),
	('EID_005','PID_017','2019-10-07','2022-09-01',25.00,7,NULL,NULL,NULL,'0','[1,6,5,3]'),
	('EID_012','PID_002','2019-08-01','2021-11-15',100.00,9,NULL,NULL,NULL,'0',NULL),
	('EID_005','PID_002','2019-08-01','2021-11-15',25.00,7,NULL,NULL,NULL,'0',NULL),
	('EID_029','PID_002','2019-08-01','2021-11-15',100.00,8,NULL,NULL,NULL,'0',NULL),
	('EID_005','PID_018','2018-04-21','2020-07-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_030','PID_018','2018-04-21','2020-07-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_018','PID_018','2018-04-21','2020-07-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_004','PID_018','2018-04-30','2020-07-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_005','PID_010','2018-05-01','2021-12-15',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_032','PID_010','2018-05-01','2021-12-15',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_021','PID_010','2018-05-01','2021-12-15',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_008','PID_010','2018-06-01','2021-12-15',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_006','PID_019','2018-08-21','2020-10-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_037','PID_019','2018-08-21','2020-10-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_022','PID_019','2018-08-21','2020-10-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_009','PID_019','2018-08-21','2020-10-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_006','PID_011','2018-11-17','2021-11-01',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_038','PID_011','2018-11-17','2021-11-01',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_027','PID_011','2018-11-17','2021-11-01',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_011','PID_011','2018-12-01','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_006','PID_015','2018-10-01','2021-11-21',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_028','PID_015','2018-10-01','2021-11-21',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_047','PID_015','2018-10-01','2021-11-21',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_013','PID_015','2018-11-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_006','PID_023','2017-11-01','2022-12-31',25.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_034','PID_023','2017-11-01','2022-12-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_049','PID_023','2017-11-01','2022-12-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_007','PID_020','2018-01-01','2021-12-01',100.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_050','PID_020','2018-01-01','2021-12-01',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_035','PID_020','2018-01-01','2021-12-01',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_023','PID_020','2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_031','PID_020','2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_033','PID_020','2018-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_019','PID_023','2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_054','PID_023','2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_056','PID_023','2017-11-01','2022-12-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_063','PID_015','2019-04-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_074','PID_015','2019-04-01','2021-11-21',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_081','PID_011','2019-04-15','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_085','PID_011','2019-04-15','2021-11-01',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_016','PID_003','2018-07-01','2019-08-15',100.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_016','PID_007','2018-01-01','2019-12-31',100.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_057','PID_003','2018-07-01','2019-08-15',40.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_057','PID_007','2018-01-01','2019-12-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_043','PID_021','2018-05-01','2019-03-31',100.00,7,NULL,NULL,NULL,'1',NULL),
	('EID_058','PID_021','2018-05-01','2019-03-31',100.00,8,NULL,NULL,NULL,'1',NULL),
	('EID_040','PID_021','2018-05-01','2019-03-31',100.00,9,NULL,NULL,NULL,'1',NULL),
	('EID_020','PID_021','2018-05-01','2019-03-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_024','PID_021','2018-05-01','2019-03-31',100.00,6,NULL,NULL,NULL,'0',NULL),
	('EID_020','PID_020','2020-01-01','2021-12-01',100.00,6,NULL,NULL,NULL,'0',NULL);

/*!40000 ALTER TABLE `PROJECT_PEOPLE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT_STATUS
# ------------------------------------------------------------

LOCK TABLES `PROJECT_STATUS` WRITE;
/*!40000 ALTER TABLE `PROJECT_STATUS` DISABLE KEYS */;

INSERT INTO `PROJECT_STATUS` (`STATUS_ID`, `STATUS_NAME`)
VALUES
	(1,'Proposal'),
	(2,'Potential'),
	(3,'In Progress'),
	(4,'Completed'),
	(5,'Closed'),
	(6,'Lost'),
	(7,'Hold'),
	(8,'Archive'),
	(9,'TBD'),
	(10,'Pre-Con');

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


# Dump of table ROLE
# ------------------------------------------------------------

LOCK TABLES `ROLE` WRITE;
/*!40000 ALTER TABLE `ROLE` DISABLE KEYS */;

INSERT INTO `ROLE` (`ID`, `ROLE_NAME`, `COMBINATION_ID`)
VALUES
	(1,'All Company Access',1),
	(2,'Regional Access',1),
	(3,'Admin',1);

/*!40000 ALTER TABLE `ROLE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF
# ------------------------------------------------------------

LOCK TABLES `STAFF` WRITE;
/*!40000 ALTER TABLE `STAFF` DISABLE KEYS */;

INSERT INTO `STAFF` (`STAFF_ID`, `FIRST_NAME`, `MIDDLE_INITIAL`, `LAST_NAME`, `PREFERRED_NAME`, `EMAIL_ID`, `PHONE_1`, `PHONE_1_TYPE`, `PHONE_2`, `PHONE_2_TYPE`, `HOME_CITY`, `HOME_STATE`, `HOME_ZIP`, `STAFF_CERTIFICATION`, `STAFF_TRAINING`, `STAFF_PHOTO`, `STAFF_ROLE_ID`, `STAFF_GROUP_ID`, `STAFF_STATUS_ID`, `OFFICE_ID`, `EMPLOYMENT_START_DATE`)
VALUES
	('EID_001','Andrew','','Gill','Andy','andrew.gill@acme.com','888-123-4567','Cell','877-234-5678','Alternate','Arlington','VA','20330','','','EID_001',9,1,1,'OID_003','0000-00-00'),
	('EID_002','Annette','','Schumaker','Ann','annette.schumaker@acme.com','888-123-4568','Cell','877-234-5679','Alternate','Arlington','VA','20330','','','EID_002',3,1,1,'OID_003','0000-00-00'),
	('EID_003','Anthony','','Smith','Tony','anthony.smith@acme.com','888-123-4569','Cell','877-234-5680','Alternate','Rockville','MD','20847','','','EID_003',4,1,1,'OID_003','0000-00-00'),
	('EID_004','Anthony','','Mansfield','','anthony.mansfield@acme.com','888-123-4570','Cell','877-234-5681','Alternate','Fredrick','MD','21701','','','EID_004',6,1,1,'OID_003','0000-00-00'),
	('EID_005','Armand','','Neuman','','armand.neuman@acme.com','888-123-4571','Cell','877-234-5682','Alternate','Bethesda','MD','20810','','','EID_005',7,1,1,'OID_003','0000-00-00'),
	('EID_006','Braden','','Eichler','','braden.eichler@acme.com','888-123-4572','Cell','877-234-5683','Alternate','Fredrick','MD','21701','','','EID_006',7,1,1,'OID_003','0000-00-00'),
	('EID_007','Bradley','','Schmidt','Brad','bradley.schmidt@acme.com','888-123-4573','Cell','877-234-5684','Alternate','Gaithesburg','MD','20697','','','EID_007',7,1,1,'OID_003','0000-00-00'),
	('EID_008','Brandi','','Hartwick','','brandi.hartwick@acme.com','888-123-4574','Cell','877-234-5685','Alternate','Rockville','MD','20847','','','EID_008',6,1,1,'OID_003','0000-00-00'),
	('EID_009','Brenda','G','Cohen','','brenda.cohen@acme.com','888-123-4575','Cell','877-234-5686','Alternate','Reston','VA','20170','','','EID_009',6,1,1,'OID_003','0000-00-00'),
	('EID_010','Bridget','','Shultz','','bridget.schultz@acme.com','888-123-4576','Cell','877-234-5687','Alternate','Rockville','MD','20847','','','EID_010',5,1,1,'OID_003','0000-00-00'),
	('EID_011','Brody','','Cauldfield','','brody.cauldfield@acme.com','888-123-4577','Cell','877-234-5688','Alternate','Gaithesburg','MD','20697','','','EID_011',6,1,1,'OID_003','0000-00-00'),
	('EID_012','Caesar','','Morris','','caesar.morris@acme.com','888-123-4578','Cell','877-234-5689','Alternate','Alexandria','VA','22306','','','EID_012',9,1,1,'OID_003','0000-00-00'),
	('EID_013','Callan','','Williams','','callan.williams@acme.com','888-123-4579','Cell','877-234-5690','Alternate','Silver Spring','MD','20815','','','EID_013',6,1,1,'OID_003','0000-00-00'),
	('EID_014','Chad','L','Morris','','chad.morris@acme.com','888-123-4580','Cell','877-234-5691','Alternate','Silver Spring','MD','20815','','','EID_014',4,1,1,'OID_003','0000-00-00'),
	('EID_015','Charles','','Talbot','Chuck','charles.talbot@acme.com','888-123-4581','Cell','877-234-5692','Alternate','Alexandria','VA','22306','','','EID_015',8,1,1,'OID_014','0000-00-00'),
	('EID_016','Chase','','Moore','','chase.moore@acme.com','888-123-4582','Cell','877-234-5693','Alternate','Reston','VA','20170','','','EID_016',7,1,1,'OID_003','0000-00-00'),
	('EID_017','Christian','','Maher','','christian.maher@acme.com','888-123-4583','Cell','877-234-5694','Alternate','Arlington','VA','20330','','','EID_017',4,1,1,'OID_003','0000-00-00'),
	('EID_018','Christopher','','Campbell','Chris','christopher.campbell@acme.com','888-123-4584','Cell','877-234-5695','Alternate','Bethesda','MD','20810','','','EID_018',9,1,1,'OID_003','0000-00-00'),
	('EID_019','Cody','','Maher','','cody.maher@acme.com','888-123-4585','Cell','877-234-5696','Alternate','Arlington','VA','20330','','','EID_019',6,1,1,'OID_003','0000-00-00'),
	('EID_020','Dan','','Gollet','','dan.gollet@acme.com','888-123-4586','Cell','877-234-5697','Alternate','Arlington','VA','20330','','','EID_020',6,1,1,'OID_003','0000-00-00'),
	('EID_021','Darrin','','Jackson','','darrin.jackson@acme.com','888-123-4587','Cell','877-234-5698','Alternate','Gaithesburg','MD','20697','','','EID_021',9,1,1,'OID_003','0000-00-00'),
	('EID_022','Dave','','Robbins','','dave.robbins@acme.com','888-123-4588','Cell','877-234-5699','Alternate','Reston','VA','20170','','','EID_022',9,1,1,'OID_003','0000-00-00'),
	('EID_023','David','','Newberry','Dave','david.newberry@acme.com','888-123-4589','Cell','877-234-5700','Alternate','Alexandria','VA','22306','','','EID_023',6,1,1,'OID_003','0000-00-00'),
	('EID_024','Don','','Brockfield','','dob.brockfield@acme.com','888-123-4590','Cell','877-234-5701','Alternate','Alexandria','VA','22306','','','EID_024',6,1,1,'OID_003','0000-00-00'),
	('EID_025','Donald','','Eishenhower','Don','donald.eisenhower@acme.com','888-123-4591','Cell','877-234-5702','Alternate','Alexandria','VA','22306','','','EID_025',4,1,1,'OID_003','0000-00-00'),
	('EID_026','Dorreen','','Winchester','','dorreen.winchester@acme.com','888-123-4592','Cell','877-234-5703','Alternate','Alexandria','VA','22306','','','EID_026',3,1,1,'OID_003','0000-00-00'),
	('EID_027','Douglas','','Bowman','Doug','douglas.bowman@acme.com','888-123-4593','Cell','877-234-5704','Alternate','Fredrick','MD','21701','','','EID_027',9,1,1,'OID_003','0000-00-00'),
	('EID_028','Edward','','Tudor','Ed','edward.tudor@acme.com','888-123-4594','Cell','877-234-5705','Alternate','Rockville','MD','20847','','','EID_028',9,1,1,'OID_003','0000-00-00'),
	('EID_029','Eliza','B','Darwin','Liz','eliza.darwin@acme.com','888-123-4595','Cell','877-234-5706','Alternate','Bethesda','MD','20810','','','EID_029',8,1,1,'OID_003','0000-00-00'),
	('EID_030','Emma','','Covington','','emma.covington@acme.com','888-123-4596','Cell','877-234-5707','Alternate','Fredrick','MD','21701','','','EID_030',8,1,1,'OID_003','0000-00-00'),
	('EID_031','Erik','','Ramsey','','erik.ramsey@acme.com','888-123-4597','Cell','877-234-5708','Alternate','Bethesda','MD','20810','','','EID_031',6,1,1,'OID_003','0000-00-00'),
	('EID_032','Eron','','Flynn','','eron.flynn@acme.com','888-123-4598','Cell','877-234-5709','Alternate','Gaithesburg','MD','20697','','','EID_032',8,1,1,'OID_003','0000-00-00'),
	('EID_033','Ferdinand','','Churchill','Fred','ferdinand.churchill@acme.com','888-123-4599','Cell','877-234-5710','Alternate','Fredrick','MD','21701','','','EID_033',6,1,1,'OID_003','0000-00-00'),
	('EID_034','Grant','','Orwell','','grant.orwell@acme.com','888-123-4600','Cell','877-234-5711','Alternate','Arlington','VA','20330','','','EID_034',9,1,1,'OID_003','0000-00-00'),
	('EID_035','Greg','','Orlitz','','greg.orlitz@acme.com','888-123-4601','Cell','877-234-5712','Alternate','Silver Spring','MD','20815','','','EID_035',9,1,1,'OID_003','0000-00-00'),
	('EID_037','Jacob','','Feddero','Jake','jacob.feddero@acme.com','888-123-4603','Cell','877-234-5714','Alternate','Reston','VA','20170','','','EID_037',8,1,1,'OID_003','0000-00-00'),
	('EID_038','Jaeger','','Bronte','','jaeger.bronte@acme.com','888-123-4604','Cell','877-234-5715','Alternate','Rockville','MD','20847','','','EID_038',8,1,1,'OID_003','0000-00-00'),
	('EID_039','Janice','','Poppins','','janice.poppins@acme.com','888-123-4605','Cell','877-234-5716','Alternate','Silver Spring','MD','20815','','','EID_039',5,1,1,'OID_003','0000-00-00'),
	('EID_040','Jerome','O','Feliz','Jerry','jerome.feliz@acme.com','888-123-4606','Cell','877-234-5717','Alternate','Bethesda','MD','20810','','','EID_040',9,1,1,'OID_003','0000-00-00'),
	('EID_041','Jerri','','McCarty','','jerri.mccarty@acme.com','888-123-4607','Cell','877-234-5718','Alternate','Arlington','VA','20330','','','EID_041',5,1,1,'OID_003','0000-00-00'),
	('EID_042','Jim','','Luther','','jim.luther@acme.com','888-123-4608','Cell','877-234-5719','Alternate','Alexandria','VA','22306','','','EID_042',9,1,1,'OID_003','0000-00-00'),
	('EID_043','John','','Lennon','','john.lennon@acme.com','888-123-4609','Cell','877-234-5720','Alternate','Rockville','MD','20847','','','EID_043',7,1,1,'OID_003','0000-00-00'),
	('EID_044','Josef','','Speer','','josef.speer@acme.com','888-123-4610','Cell','877-234-5721','Alternate','Bethesda','MD','20810','','','EID_044',6,1,1,'OID_003','0000-00-00'),
	('EID_045','Josie','','Belk','','josie.belk@acme.com','888-123-4611','Cell','877-234-5722','Alternate','Reston','VA','20170','','','EID_045',2,1,1,'OID_003','0000-00-00'),
	('EID_046','Karen','','Coutinho','','karen.coutinho@acme.com','888-123-4612','Cell','877-234-5723','Alternate','Alexandria','VA','22306','','','',5,1,1,'OID_003','0000-00-00'),
	('EID_047','Karl','A','Shilpberg','','karl.shilpberg@acme.com','888-123-4613','Cell','877-234-5724','Alternate','Silver Spring','MD','20815','','','EID_047',8,1,1,'OID_003','0000-00-00'),
	('EID_048','Kate','','Jefferson','','kate.jefferson@acme.com','888-123-4614','Cell','877-234-5725','Alternate','Bethesda','MD','20810','','','EID_048',3,1,1,'OID_003','0000-00-00'),
	('EID_049','Kim','','Kardin','','kim.kardin@acme.com','888-123-4615','Cell','877-234-5726','Alternate','Arlington','VA','20330','','','EID_049',8,1,1,'OID_003','0000-00-00'),
	('EID_050','Klein','','Henrick','','klein.henrick@acme.com','888-123-4616','Cell','877-234-5727','Alternate','Alexandria','VA','22306','','','EID_050',8,1,1,'OID_003','0000-00-00'),
	('EID_051','Kyle','','Paloma','','kyle.paloma@acme.com','888-123-4617','Cell','877-234-5728','Alternate','Gaithesburg','MD','20697','','','EID_051',9,1,1,'OID_003','0000-00-00'),
	('EID_052','Lee','','Major','','lee.major@acme.com','888-123-4618','Cell','877-234-5729','Alternate','Bethesda','MD','20810','','','EID_052',6,1,1,'OID_003','0000-00-00'),
	('EID_053','Liam','','Neeson','','liam.neeson@acme.com','888-123-4619','Cell','877-234-5730','Alternate','Silver Spring','MD','20815','','','EID_053',7,1,1,'OID_003','0000-00-00'),
	('EID_054','Lina','','Dockrill','','lina.dockrill@acme.com','888-123-4620','Cell','877-234-5731','Alternate','Reston','VA','20170','','','EID_054',6,1,1,'OID_003','0000-00-00'),
	('EID_055','Linda','','Gray','','linda.gray@acme.com','888-123-4621','Cell','877-234-5732','Alternate','Fredrick','MD','21701','','','EID_055',3,1,1,'OID_003','0000-00-00'),
	('EID_056','Lisa','Y','Simpson','','lisa.simpson@acme.com','888-123-4622','Cell','877-234-5733','Alternate','Gaithesburg','MD','20697','','','EID_056',6,1,1,'OID_003','0000-00-00'),
	('EID_057','Michael','','Lunar','','michael.lunar@acme.com','888-123-4623','Cell','877-234-5734','Alternate','Fredrick','MD','21701','','','EID_057',8,1,1,'OID_003','0000-00-00'),
	('EID_058','Mike','','Whittern','','mike.whittern@acme.com','888-123-4624','Cell','877-234-5735','Alternate','Bethesda','MD','20810','','','EID_058',8,1,1,'OID_003','0000-00-00'),
	('EID_059','Mike','','Abbott','','mike.abbott@acme.com','888-123-4625','Cell','877-234-5736','Alternate','Reston','VA','20170','','','EID_059',9,1,1,'OID_003','0000-00-00'),
	('EID_060','Mitch','','Borges','','mitch.borges@acme.com','888-123-4626','Cell','877-234-5737','Alternate','Gaithesburg','MD','20697','','','EID_060',8,1,1,'OID_003','0000-00-00'),
	('EID_061','Mitchell','','Townsend','Mitch','mitchell.townsend@acme.com','888-123-4627','Cell','877-234-5738','Alternate','Arlington','VA','20330','','','EID_061',7,1,1,'OID_003','0000-00-00'),
	('EID_062','Ned','','Kristoffensen','','ned.kristoffensen@acme.com','888-123-4628','Cell','877-234-5739','Alternate','Fredrick','MD','21701','','','EID_062',6,1,1,'OID_003','0000-00-00'),
	('EID_063','Nick','','Kline','','nick.kline@acme.com','888-123-4629','Cell','877-234-5740','Alternate','Rockville','MD','20847','','','EID_063',6,1,1,'OID_003','0000-00-00'),
	('EID_064','Orphelia','','Beecham','','orphelia.beecham@acme.com','888-123-4630','Cell','877-234-5741','Alternate','Gaithesburg','MD','20697','','','EID_064',6,1,1,'OID_003','0000-00-00'),
	('EID_065','Palmer','','Kerns','','palmer.kerns@acme.com','888-123-4631','Cell','877-234-5742','Alternate','Reston','VA','20170','','','EID_065',8,1,1,'OID_003','0000-00-00'),
	('EID_066','Parker','T','Marchessa','','parker.marchessa@acme.com','888-123-4632','Cell','877-234-5743','Alternate','Rockville','MD','20847','','','EID_066',9,1,1,'OID_003','0000-00-00'),
	('EID_067','Perry','','Ellis','','perry.ellis@acme.com','888-123-4633','Cell','877-234-5744','Alternate','Rockville','MD','20847','','','EID_067',8,1,1,'OID_003','0000-00-00'),
	('EID_068','Ray','','Aiken','','ray.aiken@acme.com','888-123-4634','Cell','877-234-5745','Alternate','Silver Spring','MD','20815','','','EID_068',9,1,1,'OID_003','0000-00-00'),
	('EID_069','Rick','','Springfield','','first.last@acme.com','888-123-4635','Cell','877-234-5746','Alternate','Gaithesburg','MD','20697','','','EID_069',6,1,1,'OID_003','0000-00-00'),
	('EID_070','Robin','','Danish','','first.last@acme.com','888-123-4636','Cell','877-234-5747','Alternate','Reston','VA','20170','','','EID_070',6,1,1,'OID_003','0000-00-00'),
	('EID_071','Roger','','Rinaldo','','first.last@acme.com','888-123-4637','Cell','877-234-5748','Alternate','Arlington','VA','20330','','','EID_071',9,1,1,'OID_003','0000-00-00'),
	('EID_072','Roman','','Williams','','first.last@acme.com','888-123-4638','Cell','877-234-5749','Alternate','Reston','VA','20170','','','EID_072',6,1,1,'OID_003','0000-00-00'),
	('EID_073','Ron','','Sonsinni','','first.last@acme.com','888-123-4639','Cell','877-234-5750','Alternate','Alexandria','VA','22306','','','EID_073',6,1,1,'OID_003','0000-00-00'),
	('EID_074','Rosie','','O\'Donnell','','first.last@acme.com','888-123-4640','Cell','877-234-5751','Alternate','Silver Spring','MD','20815','','','EID_074',6,1,1,'OID_003','0000-00-00'),
	('EID_075','Roy','','Rogers','','roy.rogers@acme.com','888-123-4641','Cell','877-234-5752','Alternate','Fredrick','MD','21701','','','EID_075',6,1,1,'OID_003','0000-00-00'),
	('EID_076','Ryan','S','Malcolm','','ryan.malcolm@acme.com','888-123-4642','Cell','877-234-5753','Alternate','Rockville','MD','20847','','','EID_076',2,1,1,'OID_003','0000-00-00'),
	('EID_077','Shawn','','Franklin','','franklin.shawn@acme.com','888-123-4643','Cell','877-234-5754','Alternate','Gaithesburg','MD','20697','','','EID_077',6,1,1,'OID_003','0000-00-00'),
	('EID_078','Thomas','','Edison','Tom','thomas.edison@acme.com','888-123-4644','Cell','877-234-5755','Alternate','Silver Spring','MD','20815','','','EID_078',2,1,1,'OID_003','0000-00-00'),
	('EID_079','Thomas','','Cook','','first.last@acme.com','888-123-4645','Cell','877-234-5756','Alternate','Fredrick','MD','21701','','','EID_079',6,1,1,'OID_003','0000-00-00'),
	('EID_080','Tim','','Gates','','first.last@acme.com','888-123-4646','Cell','877-234-5757','Alternate','Fredrick','MD','21701','','','EID_080',6,1,1,'OID_003','0000-00-00'),
	('EID_081','Tyler','','Moffett','','first.last@acme.com','888-123-4648','Cell','877-234-5759','Alternate','Arlington','VA','20330','','','EID_081',6,1,1,'OID_003','0000-00-00'),
	('EID_082','Tyler','C','Kastelan','','first.last@acme.com','888-123-4649','Cell','877-234-5760','Alternate','Gaithesburg','MD','20697','','','EID_082',6,1,1,'OID_003','0000-00-00'),
	('EID_083','Verona','','Capulet','','first.last@acme.com','888-123-4650','Cell','877-234-5761','Alternate','Bethesda','MD','20810','','','EID_083',2,1,1,'OID_003','0000-00-00'),
	('EID_084','Will','','Hefner','','first.last@acme.com','888-123-4651','Cell','877-234-5762','Alternate','Silver Spring','MD','20815','','','EID_084',8,1,1,'OID_003','0000-00-00'),
	('EID_085','William','V','Atkins','Will','first.last@acme.com','888-123-4652','Cell','877-234-5763','Alternate','Alexandria','VA','22306','','','EID_085',6,1,1,'OID_003','0000-00-00');

/*!40000 ALTER TABLE `STAFF` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_CERTIFICATION
# ------------------------------------------------------------

LOCK TABLES `STAFF_CERTIFICATION` WRITE;
/*!40000 ALTER TABLE `STAFF_CERTIFICATION` DISABLE KEYS */;

INSERT INTO `STAFF_CERTIFICATION` (`STAFF_ID`, `CERTIFICATION_ID`)
VALUES
	('EID_005',3),
	('EID_005',5);

/*!40000 ALTER TABLE `STAFF_CERTIFICATION` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table STAFF_EXPERIENCE
# ------------------------------------------------------------

LOCK TABLES `STAFF_EXPERIENCE` WRITE;
/*!40000 ALTER TABLE `STAFF_EXPERIENCE` DISABLE KEYS */;

INSERT INTO `STAFF_EXPERIENCE` (`EXPERIENCE_ID`, `EXPERIENCE_LABEL`)
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

/*!40000 ALTER TABLE `STAFF_EXPERIENCE` ENABLE KEYS */;
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

INSERT INTO `USER_ACCESS` (`ID`, `USER_ID`, `OFFICE_ID`, `REGION_ID`, `DIVISION_ID`)
VALUES
	(1,50,'OID_014',0,0);

/*!40000 ALTER TABLE `USER_ACCESS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USERS
# ------------------------------------------------------------

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`ID`, `ROLE_ID`, `FIRST_NAME`, `MIDDLE_NAME`, `LAST_NAME`, `EMAIL`, `PASSWORD`, `VERIFIED`, `ADDRESS`, `CITY`, `COUNTRY`, `ZIP`, `SUBSCRIPTION_SERVICE_ID`)
VALUES
	(50,1,'StaffPlan','','Admin','admin@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022',1);

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
