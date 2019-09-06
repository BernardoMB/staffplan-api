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

INSERT INTO `ACCESS_ROLE` (`ACCESS_ROLE_ID`, `ROLE_NAME`, `ROLE`)
VALUES
	(1,'All Company Access', 'ALLCOMPANY'),
	(2,'Regional Access', 'REGIONAL'),
	(3,'Admin', 'ADMIN');

/*!40000 ALTER TABLE `ACCESS_ROLE` ENABLE KEYS */;
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


# Dump of table CONTACT
# ------------------------------------------------------------

LOCK TABLES `CONTACT` WRITE;
/*!40000 ALTER TABLE `CONTACT` DISABLE KEYS */;

INSERT INTO `CONTACT` (`CONTACT_ID`, `NAME`, `EMAIL`, `PHONE`)
VALUES
	(1,'John Smith',NULL,NULL),
	(2,'Jim Bob',NULL,NULL),
	(3,'Jason Hendricks',NULL,NULL),
	(4,'Hedda Herring',NULL,NULL),
	(5,'Jada Maldonado',NULL,NULL),
	(6,'August McLeod',NULL,NULL),
	(7,'Prescott Jacobson',NULL,NULL),
	(8,'Shelly Hahn',NULL,NULL),
	(9,'Wade Burnett',NULL,NULL),
	(10,'Emery Shannon',NULL,NULL),
	(11,'Candice McCall',NULL,NULL),
	(12,'Anthony Owen',NULL,NULL),
	(13,'Tate Edwards',NULL,NULL),
	(14,'Calvin Ewing',NULL,NULL),
	(15,'Brady Sharpe',NULL,NULL),
	(16,'Lionel Henson',NULL,NULL),
	(17,'Clayton Osborne',NULL,NULL),
	(18,'Rogan Irwin',NULL,NULL),
	(19,'Alexa Sweeney',NULL,NULL),
	(20,'Burke Nieves',NULL,NULL),
	(21,'Nathan Bell',NULL,NULL),
	(22,'Kay Jarvis',NULL,NULL),
	(23,'Sherman Griffith',NULL,NULL),
	(24,'Shelby Schwartz',NULL,NULL),
	(25,'Kim Baxter',NULL,NULL),
	(26,'Tucker Moreno',NULL,NULL),
	(27,'Alan Boyle',NULL,NULL),
	(28,'Regina Pierce',NULL,NULL),
	(29,'Matthew Spence',NULL,NULL),
	(30,'Dale Henry',NULL,NULL);

/*!40000 ALTER TABLE `CONTACT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOM_LABEL
# ------------------------------------------------------------

LOCK TABLES `CUSTOM_LABEL` WRITE;
/*!40000 ALTER TABLE `CUSTOM_LABEL` DISABLE KEYS */;

INSERT INTO `CUSTOM_LABEL` (`CUSTOM_LABEL_ID`, `MODULE_NAME`, `FIELD_NAME`, `FIELD_VALUE`)
VALUES
	(1,'Dashboard','Proposal','Proposal'),
	(2,'Dashboard','ProposalDesc','No. of projects proposals'),
	(3,'Dashboard','InProgress','In Progress'),
	(4,'Dashboard','InProgressDesc','No. of projects awarded and in progress'),
	(5,'Dashboard','OpenRole','Open Role'),
	(6,'Dashboard','OpenRoleDesc','No. of roles that are open for staff assignment'),
	(7,'Dashboard','AssignmentGap','Assignment Gap'),
	(8,'Dashboard','AssignmentGapDesc','No. of staff that have gaps between their assignments'),
	(9,'Dashboard','AllocationAlert','Allocation Alert'),
	(10,'Dashboard','AllocationAlertDesc','No. of staff that have allocation alerts (over or under allocated)'),
	(11,'Dashboard','Bench','Staff on Bench'),
	(12,'Dashboard','BenchDesc','No. of staff on bench'),
	(13,'Project','PROJECT_NAME','Project'),
	(14,'Project','OPENROLE','Open Roles'),
	(15,'Project','NOTECOUNT','Notes'),
	(16,'Project','STATUS_NAME','Status'),
	(17,'Project','START_DATE','Start Date'),
	(18,'Project','END_DATE','End Date'),
	(19,'Project','TIMELINE','Timeline'),
	(20,'Project','PROJECT_ROM','Value'),
	(21,'Project','OFFICE_NAME','Office'),
	(22,'Project','TEAM','Team'),
	(23,'Project','ALLOCATION','% Allocation'),
	(24,'Project','RESUME_SUBMITTED','Resume Submitted'),
	(25,'Project','ASSIGNMENTSTATUS','Assignment Status'),
	(26,'Project','STAFF','Staff'),
	(27,'Project','ROLE_NAME','Project Role'),
	(28,'Staff','STAFF','Staff'),
	(29,'Staff','PROJECT_NAME','Project Name'),
	(30,'Staff','PROJECTROLE','Project Role'),
	(31,'Staff','PROJECTSTATUS','Project Status'),
	(32,'Staff','START_DATE','Start Date'),
	(33,'Staff','END_DATE','End Date'),
	(34,'Staff','ALLOCATION','Allocation'),
	(35,'Staff','RESUME_SUBMITTED','Resume Submitted'),
	(36,'Staff','ASSIGNMENTSTATUS','Assignment Status'),
	(37,'Staff','STAFFROLE','Staff Role'),
	(38,'Staff','STATUS','Staff Status'),
	(39,'Staff','OFFICE','office'),
	(40,'Staff','GROUP','Group');

/*!40000 ALTER TABLE `CUSTOM_LABEL` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER
# ------------------------------------------------------------

LOCK TABLES `CUSTOMER` WRITE;
/*!40000 ALTER TABLE `CUSTOMER` DISABLE KEYS */;

INSERT INTO `CUSTOMER` (`CUSTOMER_ID`, `CUSTOMER_NAME`, `CUSTOMER_ADDRESS`, `CUSTOMER_CITY`, `CUSTOMER_STATE`, `CUSTOMER_ZIP`)
VALUES
	(1,'Asheville Medical Center','NULL','NULL','NULL','NULL'),
	(2,'Alexandria General Hospital','NULL','NULL','NULL','NULL'),
	(3,'Techno Data Systems','NULL','NULL','NULL','NULL'),
	(4,'Apricot Development Companies','NULL','NULL','NULL','NULL'),
	(5,'British Telecom','NULL','NULL','NULL','NULL'),
	(6,'Digital Broadcast','NULL','NULL','NULL','NULL'),
	(7,'Technology Virtual Center','NULL','NULL','NULL','NULL'),
	(8,'Ops Technology','NULL','NULL','NULL','NULL'),
	(9,'Rufus Companies','NULL','NULL','NULL','NULL'),
	(10,'Equinox','NULL','NULL','NULL','NULL'),
	(11,'Northhampton Companies','NULL','NULL','NULL','NULL'),
	(12,'Quint Health Center','NULL','NULL','NULL','NULL'),
	(13,'Wolfe Health Medical Center','NULL','NULL','NULL','NULL'),
	(14,'Velocity 5','NULL','NULL','NULL','NULL'),
	(15,'Ocean Hills Development Co','NULL','NULL','NULL','NULL'),
	(16,'MedLife Science','NULL','NULL','NULL','NULL'),
	(17,'Communication 100','NULL','NULL','NULL','NULL'),
	(18,'Charleston Regional Hospital','NULL','NULL','NULL','NULL'),
	(19,'Georgetown Medical Center','NULL','NULL','NULL','NULL'),
	(20,'Open Plaza','NULL','NULL','NULL','NULL'),
	(21,'Wunderlist Technology Center','NULL','NULL','NULL','NULL'),
	(22,'QZ Inc','NULL','NULL','NULL','NULL'),
	(23,'Omni Inc','NULL','NULL','NULL','NULL'),
	(24,'Maryland Regional Health Care','NULL','NULL','NULL','NULL'),
	(25,'TechOps Inc','NULL','NULL','NULL','NULL'),
	(26,'High Street Corp','NULL','NULL','NULL','NULL'),
	(27,'All Sciences Inc','NULL','NULL','NULL','NULL'),
	(28,'Georgetown Medical Center','NULL','NULL','NULL','NULL'),
	(29,'San Andreas Community College','NULL','NULL','NULL','NULL'),
	(30,'Allentown University','NULL','NULL','NULL','NULL');

/*!40000 ALTER TABLE `CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CUSTOMER_CONTACTS
# ------------------------------------------------------------

LOCK TABLES `CUSTOMER_CONTACTS` WRITE;
/*!40000 ALTER TABLE `CUSTOMER_CONTACTS` DISABLE KEYS */;

INSERT INTO `CUSTOMER_CONTACTS` (`CUSTOMER_ID`, `CONTACT_ID`)
VALUES
	(1,1),
	(2,2),
	(3,3),
	(4,4),
	(5,5),
	(6,6),
	(7,7),
	(8,8),
	(9,9),
	(10,10),
	(11,11),
	(12,12),
	(13,13),
	(14,14),
	(15,15),
	(16,16),
	(17,17),
	(18,18),
	(19,19),
	(20,20),
	(21,21),
	(22,22),
	(23,23),
	(24,24),
	(25,25),
	(26,26),
	(27,27),
	(28,28),
	(29,29),
	(30,30);

/*!40000 ALTER TABLE `CUSTOMER_CONTACTS` ENABLE KEYS */;
UNLOCK TABLES;


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


# Dump of table NOTES
# ------------------------------------------------------------

LOCK TABLES `NOTES` WRITE;
/*!40000 ALTER TABLE `NOTES` DISABLE KEYS */;

INSERT INTO `NOTES` (`NOTE_ID`, `USER_ID`, `CONTENT`, `CREATED`, `UPDATED`, `PROJECT_ID`, `NODE_PARENT_ID`, `IS_PARENT`)
VALUES
	(1,50,'Apricot Suits is looking for a team that has experience in office remodeling - mainly retrofits and bringing the building upto code.','2019-07-22','2019-07-22',4,NULL,1);

/*!40000 ALTER TABLE `NOTES` ENABLE KEYS */;
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

INSERT INTO `PLANNED_PROJECT_STAFF` (`ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `CONFIRMED`, `RESUME_SUBMITTED`, `PROJECT_ID`)
VALUES
	(3,'2019-07-01','2019-08-10',100.00,6,NULL,'0',3),
	(6,'2019-04-15','2019-11-01',100.00,6,NULL,'0',14),
	(11,'2020-02-01','2022-10-01',100.00,8,NULL,'1',27),
	(12,'2020-02-01','2022-10-01',100.00,9,NULL,'1',27),
	(14,'2019-12-01','2022-12-30',25.00,7,NULL,'1',4),
	(15,'2019-12-01','2022-12-30',100.00,8,NULL,'1',4),
	(16,'2019-12-01','2022-12-30',100.00,9,NULL,'1',4),
	(17,'2019-08-08','2022-08-20',100.00,8,NULL,'1',1),
	(18,'2019-08-08','2022-08-20',25.00,7,NULL,'1',1),
	(19,'2019-08-08','2022-08-20',100.00,9,NULL,'1',1),
	(26,'2019-03-15','2021-12-31',100.00,8,NULL,'1',28),
	(27,'2019-03-15','2021-12-31',100.00,9,NULL,'1',28),
	(28,'2019-03-15','2021-12-31',25.00,9,NULL,'1',28),
	(29,'2019-04-01','2020-10-15',100.00,8,NULL,'1',26),
	(30,'2019-04-01','2020-10-15',25.00,7,NULL,'1',26),
	(31,'2019-04-01','2020-10-15',100.00,9,NULL,'1',26),
	(32,'2019-04-01','2020-03-01',25.00,7,NULL,'1',29),
	(33,'2019-04-01','2020-03-01',100.00,8,NULL,'1',29),
	(34,'2019-04-01','2020-03-01',100.00,9,NULL,'1',29),
	(35,'2019-04-07','2021-06-01',100.00,8,NULL,'1',16),
	(36,'2019-04-07','2021-06-01',25.00,7,NULL,'1',16),
	(37,'2019-04-07','2021-06-01',100.00,9,NULL,'1',16),
	(38,'2019-04-15','2021-12-31',100.00,8,NULL,'1',8),
	(39,'2019-04-15','2021-12-31',25.00,7,NULL,'1',8),
	(40,'2019-04-15','2021-12-31',100.00,9,NULL,'1',8),
	(41,'2019-07-22','2022-09-08',25.00,7,NULL,'1',12),
	(42,'2019-07-22','2022-09-08',100.00,8,NULL,'1',12),
	(43,'2019-07-22','2022-09-08',100.00,9,NULL,'1',12),
	(44,'2019-05-01','2022-12-01',25.00,7,NULL,'1',22),
	(45,'2019-05-01','2022-12-01',100.00,8,NULL,'1',22),
	(46,'2019-05-01','2022-12-01',100.00,9,NULL,'1',22),
	(47,'2019-09-19','2022-12-19',25.00,7,NULL,'1',24),
	(48,'2019-09-19','2022-12-19',100.00,8,NULL,'1',24),
	(49,'2019-09-19','2022-12-19',100.00,9,NULL,'1',24),
	(50,'2020-01-05','2022-09-15',25.00,7,NULL,'1',9),
	(51,'2020-01-05','2022-09-15',100.00,8,NULL,'1',9),
	(52,'2020-01-05','2022-09-15',100.00,9,NULL,'1',9);

/*!40000 ALTER TABLE `PLANNED_PROJECT_STAFF` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PROJECT
# ------------------------------------------------------------

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;

INSERT INTO `PROJECT` (`PROJECT_ID`, `PROJECT_NO`, `PROJECT_NAME`, `PROJECT_ROM`, `PROJECT_ADDRESS`, `PROJECT_COUNTRY`, `PROJECT_CITY`, `PROJECT_STATE`, `PROJECT_ZIP`, `START_DATE`, `END_DATE`, `PROJECT_DURATION`, `PROJECT_STATUS_ID`, `PROJECT_TYPE_ID`, `OFFICE_ID`, `CATEGORY_ID`, `PROJECT_DESCRIPTION`, `GROUP_ID`, `TIMELINE_TYPE_ID`, `CUSTOMER_ID`, `CONTACT_ID`)
VALUES
	(1,'SP_001','A_Ashville Regional Medical Center','17300000','34 North St',NULL,'Arlington','VA','20330','2019-08-08','2022-08-20',NULL,1,10,1,1,'',1,2,NULL,NULL),
	(2,'SP_002','B_General Hospital Center - Suite 100','21300000','44 Lake St',NULL,'Alexandria','VA','22306','2019-08-01','2021-11-15',NULL,3,10,1,1,'',1,2,NULL,NULL),
	(3,'SP_003','Tech Data Center - East Center','12700000','4312  Pennsylvania Ave',NULL,'Bethesda','MD','20810','2018-07-01','2019-08-15',NULL,3,6,1,3,'',1,2,NULL,NULL),
	(4,'SP_004','A_Apricot West Suites 110 & 210','8100000','45  5th Avenue',NULL,'Fredrick','MD','21701','2019-12-01','2022-12-30',NULL,1,2,14,14,'',2,2,NULL,NULL),
	(5,'SP_005','A_BT Data Center 2201','8000000','67  Park Ave',NULL,'Gaithesburg','MD','20697','2020-02-17','2022-02-01',NULL,1,6,1,3,'',1,2,NULL,NULL),
	(6,'SP_006','A_Broadcast Data Center','8000000','99  West St',NULL,'Reston','VA','20170','2019-06-01','2020-12-01',NULL,1,6,1,3,'',1,2,NULL,NULL),
	(7,'SP_007','Tech Virtual Ware - Project Mountain','16800000','44  Blue Bay',NULL,'Rockville','MD','20847','2018-01-01','2019-12-31',NULL,3,8,1,3,'',1,2,NULL,NULL),
	(8,'SP_008','E_Operation Data Center','9300000','1000  1st Street',NULL,'Silver Spring','MD','20815','2019-04-15','2021-12-31',NULL,1,6,1,3,'',1,2,NULL,NULL),
	(9,'SP_009','E_Rumfield Data Center','12700000','45  Michigan Ave',NULL,'Arlington','VA','20330','2020-01-05','2022-09-15',NULL,1,6,1,3,'',1,2,NULL,NULL),
	(10,'SP_010','B_Equinox Data Center','9000000','44  Broad St',NULL,'Alexandria','VA','22306','2018-05-01','2021-12-15',NULL,3,6,1,3,'',1,2,NULL,NULL),
	(11,'SP_011','D_Northhampton Data Center','8700000','34  North St',NULL,'Bethesda','MD','20810','2018-11-17','2021-11-01',NULL,3,6,1,2,'',1,2,NULL,NULL),
	(12,'SP_012','E_Quint Health Center','16800000','44  Lake St',NULL,'Fredrick','MD','21701','2019-07-22','2022-09-08',NULL,1,2,1,1,'',1,2,NULL,NULL),
	(13,'SP_013','Wolfe Health Data Center','7800000','4312  Pennsylvania Ave',NULL,'Gaithesburg','MD','20697','2017-02-24','2020-02-01',NULL,3,6,1,1,'',1,2,NULL,NULL),
	(14,'SP_014','Velocity 5  - WV Project','3000000','45  5th Avenue',NULL,'Reston','VA','20170','2017-04-15','2019-11-01',NULL,3,5,1,5,'',1,2,NULL,NULL),
	(15,'SP_015','D_Ocean City Hills - Tenant Interiors','9300000','67  Park Ave',NULL,'Rockville','MD','20847','2018-10-01','2021-11-21',NULL,3,8,1,12,'',1,2,NULL,NULL),
	(16,'SP_016','C_MedLife Science Data Center','34400000','99  West St',NULL,'Silver Spring','MD','20815','2019-04-07','2021-06-01',NULL,6,6,1,1,'',1,2,NULL,NULL),
	(17,'SP_017','B_Communication 100','16100000','44  Blue Bay',NULL,'Arlington','VA','20330','2019-10-07','2022-09-01',NULL,3,4,1,8,'',2,2,NULL,NULL),
	(18,'SP_018','B_Charleston Regional Hospital','3000000','1000  1st Street',NULL,'Alexandria','VA','22306','2018-04-21','2020-07-31',NULL,3,5,1,1,'',2,2,NULL,NULL),
	(19,'SP_019','B_Georgetown Med Center TI','3000000','45  Michigan Ave',NULL,'Bethesda','MD','20810','2018-08-21','2020-10-31',NULL,3,10,1,1,'',1,2,NULL,NULL),
	(20,'SP_020','D_Open Plaza','8000000','44  Broad St',NULL,'Fredrick','MD','21701','2018-01-01','2021-12-01',NULL,3,3,1,2,'',1,2,NULL,NULL),
	(21,'SP_021','Wunderlist Technology Center','7000000','34  North St',NULL,'Gaithesburg','MD','20697','2018-05-01','2019-03-31',NULL,3,1,1,1,'',1,2,NULL,NULL),
	(22,'SP_022','E_QZ Data Center','8000000','44  Lake St',NULL,'Reston','VA','20170','2019-05-01','2022-12-01',NULL,1,6,1,3,'',1,2,NULL,NULL),
	(23,'SP_023','D_Omni Data Center','92300000','4312  Pennsylvania Ave',NULL,'Rockville','MD','20847','2017-11-01','2022-12-31',NULL,3,6,1,3,'',1,2,NULL,NULL),
	(24,'SP_024','E_Regional ER - OR Remodel','29600000','45  5th Avenue',NULL,'Silver Spring','MD','20815','2019-09-19','2022-12-19',NULL,1,10,1,1,'',1,2,NULL,NULL),
	(25,'SP_025','TechOps Center','9000000','67  Park Ave',NULL,'Arlington','VA','20330','2018-12-01','2019-12-01',NULL,3,1,14,1,'',1,2,NULL,NULL),
	(26,'SP_026','C_High Street Corp Campus','14000000','99  West St',NULL,'Alexandria','VA','22306','2019-04-01','2020-10-15',NULL,6,2,14,2,'',2,2,NULL,NULL),
	(27,'SP_027','A_All Sciences Technology Center','58000000','44  Blue Bay',NULL,'Bethesda','MD','20810','2020-02-01','2022-10-01',NULL,1,5,14,4,'',2,2,NULL,NULL),
	(28,'SP_028','C_Georgetown Urgent Care','100000000','1000  1st Street',NULL,'Fredrick','MD','21701','2019-03-15','2021-12-31',NULL,1,1,11,1,'',1,2,NULL,NULL),
	(29,'SP_029','C_Lake Travis Community Center','22300000','2120 Lakeshore Dr',NULL,'Austin','TX','73301','2019-04-01','2020-03-01',NULL,1,1,3,7,'',1,2,NULL,NULL);

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

INSERT INTO `STAFF` (`STAFF_ID`, `FIRST_NAME`, `MIDDLE_INITIAL`, `LAST_NAME`, `PREFERRED_NAME`, `EMAIL_ID`, `PHONE_1`, `PHONE_1_TYPE`, `PHONE_2`, `PHONE_2_TYPE`, `HOME_CITY`, `HOME_STATE`, `HOME_ZIP`, `STAFF_PHOTO`, `STAFF_ROLE_ID`, `STAFF_GROUP_ID`, `STAFF_STATUS_ID`, `OFFICE_ID`, `EMPLOYMENT_START_DATE`)
VALUES
	(1,'Andrew','','Gill','Andy','andrew.gill@acme.com','888-123-4567','Cell','877-234-5678','Alternate','Arlington','VA','20330','1',9,1,1,3,'0000-00-00'),
	(2,'Annette','','Schumaker','Ann','annette.schumaker@acme.com','888-123-4568','Cell','877-234-5679','Alternate','Arlington','VA','20330','2',3,1,1,3,'0000-00-00'),
	(3,'Anthony','','Smith','Tony','anthony.smith@acme.com','888-123-4569','Cell','877-234-5680','Alternate','Rockville','MD','20847','3',4,1,1,3,'0000-00-00'),
	(4,'Anthony','','Mansfield','','anthony.mansfield@acme.com','888-123-4570','Cell','877-234-5681','Alternate','Fredrick','MD','21701','4',6,1,1,3,'0000-00-00'),
	(5,'Armand','','Neuman','','armand.neuman@acme.com','888-123-4571','Cell','877-234-5682','Alternate','Bethesda','MD','20810','5',7,1,1,3,'0000-00-00'),
	(6,'Braden','','Eichler','','braden.eichler@acme.com','888-123-4572','Cell','877-234-5683','Alternate','Fredrick','MD','21701','6',7,1,1,3,'0000-00-00'),
	(7,'Bradley','','Schmidt','Brad','bradley.schmidt@acme.com','888-123-4573','Cell','877-234-5684','Alternate','Gaithesburg','MD','20697','7',7,1,1,3,'0000-00-00'),
	(8,'Brandi','','Hartwick','','brandi.hartwick@acme.com','888-123-4574','Cell','877-234-5685','Alternate','Rockville','MD','20847','8',6,1,1,3,'0000-00-00'),
	(9,'Brenda','G','Cohen','','brenda.cohen@acme.com','888-123-4575','Cell','877-234-5686','Alternate','Reston','VA','20170','9',6,1,1,3,'0000-00-00'),
	(10,'Bridget','','Shultz','','bridget.schultz@acme.com','888-123-4576','Cell','877-234-5687','Alternate','Rockville','MD','20847','10',5,1,1,3,'0000-00-00'),
	(11,'Brody','','Cauldfield','','brody.cauldfield@acme.com','888-123-4577','Cell','877-234-5688','Alternate','Gaithesburg','MD','20697','11',6,1,1,3,'0000-00-00'),
	(12,'Caesar','','Morris','','caesar.morris@acme.com','888-123-4578','Cell','877-234-5689','Alternate','Alexandria','VA','22306','12',9,1,1,3,'0000-00-00'),
	(13,'Callan','','Williams','','callan.williams@acme.com','888-123-4579','Cell','877-234-5690','Alternate','Silver Spring','MD','20815','13',6,1,1,3,'0000-00-00'),
	(14,'Chad','L','Morris','','chad.morris@acme.com','888-123-4580','Cell','877-234-5691','Alternate','Silver Spring','MD','20815','14',4,1,1,3,'0000-00-00'),
	(15,'Charles','','Talbot','Chuck','charles.talbot@acme.com','888-123-4581','Cell','877-234-5692','Alternate','Alexandria','VA','22306','15',8,1,1,14,'0000-00-00'),
	(16,'Chase','','Moore','','chase.moore@acme.com','888-123-4582','Cell','877-234-5693','Alternate','Reston','VA','20170','16',7,1,1,3,'0000-00-00'),
	(17,'Christian','','Maher','','christian.maher@acme.com','888-123-4583','Cell','877-234-5694','Alternate','Arlington','VA','20330','17',4,1,1,3,'0000-00-00'),
	(18,'Christopher','','Campbell','Chris','christopher.campbell@acme.com','888-123-4584','Cell','877-234-5695','Alternate','Bethesda','MD','20810','18',9,1,1,3,'0000-00-00'),
	(19,'Cody','','Maher','','cody.maher@acme.com','888-123-4585','Cell','877-234-5696','Alternate','Arlington','VA','20330','19',6,1,1,3,'0000-00-00'),
	(20,'Dan','','Gollet','','dan.gollet@acme.com','888-123-4586','Cell','877-234-5697','Alternate','Arlington','VA','20330','20',6,1,1,3,'0000-00-00'),
	(21,'Darrin','','Jackson','','darrin.jackson@acme.com','888-123-4587','Cell','877-234-5698','Alternate','Gaithesburg','MD','20697','21',9,1,1,3,'0000-00-00'),
	(22,'Dave','','Robbins','','dave.robbins@acme.com','888-123-4588','Cell','877-234-5699','Alternate','Reston','VA','20170','22',9,1,1,3,'0000-00-00'),
	(23,'David','','Newberry','Dave','david.newberry@acme.com','888-123-4589','Cell','877-234-5700','Alternate','Alexandria','VA','22306','23',6,1,1,3,'0000-00-00'),
	(24,'Don','','Brockfield','','dob.brockfield@acme.com','888-123-4590','Cell','877-234-5701','Alternate','Alexandria','VA','22306','24',6,1,1,3,'0000-00-00'),
	(25,'Donald','','Eishenhower','Don','donald.eisenhower@acme.com','888-123-4591','Cell','877-234-5702','Alternate','Alexandria','VA','22306','25',4,1,1,3,'0000-00-00'),
	(26,'Dorreen','','Winchester','','dorreen.winchester@acme.com','888-123-4592','Cell','877-234-5703','Alternate','Alexandria','VA','22306','26',3,1,1,3,'0000-00-00'),
	(27,'Douglas','','Bowman','Doug','douglas.bowman@acme.com','888-123-4593','Cell','877-234-5704','Alternate','Fredrick','MD','21701','27',9,1,1,3,'0000-00-00'),
	(28,'Edward','','Tudor','Ed','edward.tudor@acme.com','888-123-4594','Cell','877-234-5705','Alternate','Rockville','MD','20847','28',9,1,1,3,'0000-00-00'),
	(29,'Eliza','B','Darwin','Liz','eliza.darwin@acme.com','888-123-4595','Cell','877-234-5706','Alternate','Bethesda','MD','20810','29',8,1,1,3,'0000-00-00'),
	(30,'Emma','','Covington','','emma.covington@acme.com','888-123-4596','Cell','877-234-5707','Alternate','Fredrick','MD','21701','30',8,1,1,3,'0000-00-00'),
	(31,'Erik','','Ramsey','','erik.ramsey@acme.com','888-123-4597','Cell','877-234-5708','Alternate','Bethesda','MD','20810','31',6,1,1,3,'0000-00-00'),
	(32,'Eron','','Flynn','','eron.flynn@acme.com','888-123-4598','Cell','877-234-5709','Alternate','Gaithesburg','MD','20697','32',8,1,1,3,'0000-00-00'),
	(33,'Ferdinand','','Churchill','Fred','ferdinand.churchill@acme.com','888-123-4599','Cell','877-234-5710','Alternate','Fredrick','MD','21701','33',6,1,1,3,'0000-00-00'),
	(34,'Grant','','Orwell','','grant.orwell@acme.com','888-123-4600','Cell','877-234-5711','Alternate','Arlington','VA','20330','34',9,1,1,3,'0000-00-00'),
	(35,'Greg','','Orlitz','','greg.orlitz@acme.com','888-123-4601','Cell','877-234-5712','Alternate','Silver Spring','MD','20815','35',9,1,1,3,'0000-00-00'),
	(37,'Jacob','','Feddero','Jake','jacob.feddero@acme.com','888-123-4603','Cell','877-234-5714','Alternate','Reston','VA','20170','37',8,1,1,3,'0000-00-00'),
	(38,'Jaeger','','Bronte','','jaeger.bronte@acme.com','888-123-4604','Cell','877-234-5715','Alternate','Rockville','MD','20847','38',8,1,1,3,'0000-00-00'),
	(39,'Janice','','Poppins','','janice.poppins@acme.com','888-123-4605','Cell','877-234-5716','Alternate','Silver Spring','MD','20815','39',5,1,1,3,'0000-00-00'),
	(40,'Jerome','O','Feliz','Jerry','jerome.feliz@acme.com','888-123-4606','Cell','877-234-5717','Alternate','Bethesda','MD','20810','40',9,1,1,3,'0000-00-00'),
	(41,'Jerri','','McCarty','','jerri.mccarty@acme.com','888-123-4607','Cell','877-234-5718','Alternate','Arlington','VA','20330','41',5,1,1,3,'0000-00-00'),
	(42,'Jim','','Luther','','jim.luther@acme.com','888-123-4608','Cell','877-234-5719','Alternate','Alexandria','VA','22306','42',9,1,1,3,'0000-00-00'),
	(43,'John','','Lennon','','john.lennon@acme.com','888-123-4609','Cell','877-234-5720','Alternate','Rockville','MD','20847','43',7,1,1,3,'0000-00-00'),
	(44,'Josef','','Speer','','josef.speer@acme.com','888-123-4610','Cell','877-234-5721','Alternate','Bethesda','MD','20810','44',6,1,1,3,'0000-00-00'),
	(45,'Josie','','Belk','','josie.belk@acme.com','888-123-4611','Cell','877-234-5722','Alternate','Reston','VA','20170','45',2,1,1,3,'0000-00-00'),
	(46,'Karen','','Coutinho','','karen.coutinho@acme.com','888-123-4612','Cell','877-234-5723','Alternate','Alexandria','VA','22306','',5,1,1,3,'0000-00-00'),
	(47,'Karl','A','Shilpberg','','karl.shilpberg@acme.com','888-123-4613','Cell','877-234-5724','Alternate','Silver Spring','MD','20815','47',8,1,1,3,'0000-00-00'),
	(48,'Kate','','Jefferson','','kate.jefferson@acme.com','888-123-4614','Cell','877-234-5725','Alternate','Bethesda','MD','20810','48',3,1,1,3,'0000-00-00'),
	(49,'Kim','','Kardin','','kim.kardin@acme.com','888-123-4615','Cell','877-234-5726','Alternate','Arlington','VA','20330','49',8,1,1,3,'0000-00-00'),
	(50,'Klein','','Henrick','','klein.henrick@acme.com','888-123-4616','Cell','877-234-5727','Alternate','Alexandria','VA','22306','50',8,1,1,3,'0000-00-00'),
	(51,'Kyle','','Paloma','','kyle.paloma@acme.com','888-123-4617','Cell','877-234-5728','Alternate','Gaithesburg','MD','20697','51',9,1,1,3,'0000-00-00'),
	(52,'Lee','','Major','','lee.major@acme.com','888-123-4618','Cell','877-234-5729','Alternate','Bethesda','MD','20810','52',6,1,1,3,'0000-00-00'),
	(53,'Liam','','Neeson','','liam.neeson@acme.com','888-123-4619','Cell','877-234-5730','Alternate','Silver Spring','MD','20815','53',7,1,1,3,'0000-00-00'),
	(54,'Lina','','Dockrill','','lina.dockrill@acme.com','888-123-4620','Cell','877-234-5731','Alternate','Reston','VA','20170','54',6,1,1,3,'0000-00-00'),
	(55,'Linda','','Gray','','linda.gray@acme.com','888-123-4621','Cell','877-234-5732','Alternate','Fredrick','MD','21701','55',3,1,1,3,'0000-00-00'),
	(56,'Lisa','Y','Simpson','','lisa.simpson@acme.com','888-123-4622','Cell','877-234-5733','Alternate','Gaithesburg','MD','20697','56',6,1,1,3,'0000-00-00'),
	(57,'Michael','','Lunar','','michael.lunar@acme.com','888-123-4623','Cell','877-234-5734','Alternate','Fredrick','MD','21701','57',8,1,1,3,'0000-00-00'),
	(58,'Mike','','Whittern','','mike.whittern@acme.com','888-123-4624','Cell','877-234-5735','Alternate','Bethesda','MD','20810','58',8,1,1,3,'0000-00-00'),
	(59,'Mike','','Abbott','','mike.abbott@acme.com','888-123-4625','Cell','877-234-5736','Alternate','Reston','VA','20170','59',9,1,1,3,'0000-00-00'),
	(60,'Mitch','','Borges','','mitch.borges@acme.com','888-123-4626','Cell','877-234-5737','Alternate','Gaithesburg','MD','20697','60',8,1,1,3,'0000-00-00'),
	(61,'Mitchell','','Townsend','Mitch','mitchell.townsend@acme.com','888-123-4627','Cell','877-234-5738','Alternate','Arlington','VA','20330','61',7,1,1,3,'0000-00-00'),
	(62,'Ned','','Kristoffensen','','ned.kristoffensen@acme.com','888-123-4628','Cell','877-234-5739','Alternate','Fredrick','MD','21701','62',6,1,1,3,'0000-00-00'),
	(63,'Nick','','Kline','','nick.kline@acme.com','888-123-4629','Cell','877-234-5740','Alternate','Rockville','MD','20847','63',6,1,1,3,'0000-00-00'),
	(64,'Orphelia','','Beecham','','orphelia.beecham@acme.com','888-123-4630','Cell','877-234-5741','Alternate','Gaithesburg','MD','20697','64',6,1,1,3,'0000-00-00'),
	(65,'Palmer','','Kerns','','palmer.kerns@acme.com','888-123-4631','Cell','877-234-5742','Alternate','Reston','VA','20170','65',8,1,1,3,'0000-00-00'),
	(66,'Parker','T','Marchessa','','parker.marchessa@acme.com','888-123-4632','Cell','877-234-5743','Alternate','Rockville','MD','20847','66',9,1,1,3,'0000-00-00'),
	(67,'Perry','','Ellis','','perry.ellis@acme.com','888-123-4633','Cell','877-234-5744','Alternate','Rockville','MD','20847','67',8,1,1,3,'0000-00-00'),
	(68,'Ray','','Aiken','','ray.aiken@acme.com','888-123-4634','Cell','877-234-5745','Alternate','Silver Spring','MD','20815','68',9,1,1,3,'0000-00-00'),
	(69,'Rick','','Springfield','','first.last@acme.com','888-123-4635','Cell','877-234-5746','Alternate','Gaithesburg','MD','20697','69',6,1,1,3,'0000-00-00'),
	(70,'Robin','','Danish','','first.last@acme.com','888-123-4636','Cell','877-234-5747','Alternate','Reston','VA','20170','70',6,1,1,3,'0000-00-00'),
	(71,'Roger','','Rinaldo','','first.last@acme.com','888-123-4637','Cell','877-234-5748','Alternate','Arlington','VA','20330','71',9,1,1,3,'0000-00-00'),
	(72,'Roman','','Williams','','first.last@acme.com','888-123-4638','Cell','877-234-5749','Alternate','Reston','VA','20170','72',6,1,1,3,'0000-00-00'),
	(73,'Ron','','Sonsinni','','first.last@acme.com','888-123-4639','Cell','877-234-5750','Alternate','Alexandria','VA','22306','73',6,1,1,3,'0000-00-00'),
	(74,'Rosie','','Donnell','','first.last@acme.com','888-123-4640','Cell','877-234-5751','Alternate','Silver Spring','MD','20815','74',6,1,1,3,'0000-00-00'),
	(75,'Roy','','Rogers','','roy.rogers@acme.com','888-123-4641','Cell','877-234-5752','Alternate','Fredrick','MD','21701','75',6,1,1,3,'0000-00-00'),
	(76,'Ryan','S','Malcolm','','ryan.malcolm@acme.com','888-123-4642','Cell','877-234-5753','Alternate','Rockville','MD','20847','76',2,1,1,3,'0000-00-00'),
	(77,'Shawn','','Franklin','','franklin.shawn@acme.com','888-123-4643','Cell','877-234-5754','Alternate','Gaithesburg','MD','20697','77',6,1,1,3,'0000-00-00'),
	(78,'Thomas','','Edison','Tom','thomas.edison@acme.com','888-123-4644','Cell','877-234-5755','Alternate','Silver Spring','MD','20815','78',2,1,1,3,'0000-00-00'),
	(79,'Thomas','','Cook','','first.last@acme.com','888-123-4645','Cell','877-234-5756','Alternate','Fredrick','MD','21701','79',6,1,1,3,'0000-00-00'),
	(80,'Tim','','Gates','','first.last@acme.com','888-123-4646','Cell','877-234-5757','Alternate','Fredrick','MD','21701','80',6,1,1,3,'0000-00-00'),
	(81,'Tyler','','Moffett','','first.last@acme.com','888-123-4648','Cell','877-234-5759','Alternate','Arlington','VA','20330','81',6,1,1,3,'0000-00-00'),
	(82,'Tyler','C','Kastelan','','first.last@acme.com','888-123-4649','Cell','877-234-5760','Alternate','Gaithesburg','MD','20697','82',6,1,1,3,'0000-00-00'),
	(83,'Verona','','Capulet','','first.last@acme.com','888-123-4650','Cell','877-234-5761','Alternate','Bethesda','MD','20810','83',2,1,1,3,'0000-00-00'),
	(84,'Will','','Hefner','','first.last@acme.com','888-123-4651','Cell','877-234-5762','Alternate','Silver Spring','MD','20815','84',8,1,1,3,'0000-00-00'),
	(85,'William','V','Atkins','Will','first.last@acme.com','888-123-4652','Cell','877-234-5763','Alternate','Alexandria','VA','22306','85',6,1,1,3,'0000-00-00');

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


# Dump of table TIMELINE_TYPE
# ------------------------------------------------------------

LOCK TABLES `TIMELINE_TYPE` WRITE;
/*!40000 ALTER TABLE `TIMELINE_TYPE` DISABLE KEYS */;

INSERT INTO `TIMELINE_TYPE` (`TIMELINE_TYPE_ID`, `TYPE`)
VALUES
	(1,'Estimate'),
	(2,'Confirmed');

/*!40000 ALTER TABLE `TIMELINE_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USER_ACCESS
# ------------------------------------------------------------

LOCK TABLES `USER_ACCESS` WRITE;
/*!40000 ALTER TABLE `USER_ACCESS` DISABLE KEYS */;

INSERT INTO `USER_ACCESS` (`USER_ACCESS_ID`, `USER_ID`, `OFFICE_ID`, `REGION_ID`)
VALUES
	(1,51,14,1);

/*!40000 ALTER TABLE `USER_ACCESS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USER_PREFERENCE
# ------------------------------------------------------------

LOCK TABLES `USER_PREFERENCE` WRITE;
/*!40000 ALTER TABLE `USER_PREFERENCE` DISABLE KEYS */;

INSERT INTO `USER_PREFERENCE` (`PREFERENCE_ID`, `USER_ID`, `CONTENT`)
VALUES
	(13,50,'{\"selectedOffice\":14}');

/*!40000 ALTER TABLE `USER_PREFERENCE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USERS
# ------------------------------------------------------------

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`USER_ID`, `ROLE_ID`, `FIRST_NAME`, `MIDDLE_NAME`, `LAST_NAME`, `EMAIL`, `PASSWORD`, `VERIFIED`, `ADDRESS`, `CITY`, `COUNTRY`, `ZIP`)
VALUES
	(50,1,'StaffPlan','','All Company','allcompany@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022'),
	(51,2,'StaffPlan','','Regional','regional@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022'),
	(52,3,'StaffPlan','','Admin','admin@staffplan.io','39911a1da4d8b466068cb0af85cf0c52','true','USA','California','USA','94022');

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table STATE
# ------------------------------------------------------------

LOCK TABLES `STATE` WRITE;
/*!40000 ALTER TABLE `STATE` DISABLE KEYS */;

INSERT INTO `STATE` (`STATE_ID`, `STATE_NAME`)
VALUES
	('AK','Alaska'),
	('AL','Alabama'),
	('AR','Arkansas'),
	('AS','American Samoa'),
	('AZ','Arizona'),
	('CA','California'),
	('CO','Colorado'),
	('CT','Connecticut'),
	('DC','District Of Columbia'),
	('DE','Delaware'),
	('FL','Florida'),
	('FM','Federated States Of Micronesia'),
	('GA','Georgia'),
	('GU','Guam'),
	('HI','Hawaii'),
	('IA','Iowa'),
	('ID','Idaho'),
	('IL','Illinois'),
	('IN','Indiana'),
	('KS','Kansas'),
	('KY','Kentucky'),
	('LA','Louisiana'),
	('MA','Massachusetts'),
	('MD','Maryland'),
	('ME','Maine'),
	('MH','Marshall Islands'),
	('MI','Michigan'),
	('MN','Minnesota'),
	('MO','Missouri'),
	('MP','Northern Mariana Islands'),
	('MS','Mississippi'),
	('MT','Montana'),
	('NC','North Carolina'),
	('ND','North Dakota'),
	('NE','Nebraska'),
	('NH','New Hampshire'),
	('NJ','New Jersey'),
	('NM','New Mexico'),
	('NV','Nevada'),
	('NY','New York'),
	('OH','Ohio'),
	('OK','Oklahoma'),
	('OR','Oregon'),
	('PA','Pennsylvania'),
	('PR','Puerto Rico'),
	('PW','Palau'),
	('RI','Rhode Island'),
	('SC','South Carolina'),
	('SD','South Dakota'),
	('TN','Tennessee'),
	('TX','Texas'),
	('UT','Utah'),
	('VA','Virginia'),
	('VI','Virgin Islands'),
	('VT','Vermont'),
	('WA','Washington'),
	('WI','Wisconsin'),
	('WV','West Virginia'),
	('WY','Wyoming');

/*!40000 ALTER TABLE `STATE` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table COUNTRY
# ------------------------------------------------------------

LOCK TABLES `COUNTRY` WRITE;
/*!40000 ALTER TABLE `COUNTRY` DISABLE KEYS */;

INSERT INTO `COUNTRY` (`COUNTRY_ID`, `COUNTRY_NAME`)
VALUES
	('US','United States');

/*!40000 ALTER TABLE `COUNTRY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table CALENDAR
# ------------------------------------------------------------

LOCK TABLES `CALENDAR` WRITE;
/*!40000 ALTER TABLE `CALENDAR` DISABLE KEYS */;

INSERT INTO `CALENDAR` (`CALENDAR_ID`, `YEAR`, `WEEK`, `START_DATE`, `END_DATE`)
VALUES
	(1,2019,1,'2018-12-30','2019-01-05'),
	(2,2019,2,'2019-01-06','2019-01-12'),
	(3,2019,3,'2019-01-13','2019-01-19'),
	(4,2019,4,'2019-01-20','2019-01-26'),
	(5,2019,5,'2019-01-27','2019-02-02'),
	(6,2019,6,'2019-02-03','2019-02-09'),
	(7,2019,7,'2019-02-10','2019-02-16'),
	(8,2019,8,'2019-02-17','2019-02-23'),
	(9,2019,9,'2019-02-24','2019-03-02'),
	(10,2019,10,'2019-03-03','2019-03-09'),
	(11,2019,11,'2019-03-10','2019-03-16'),
	(12,2019,12,'2019-03-17','2019-03-23'),
	(13,2019,13,'2019-03-24','2019-03-30'),
	(14,2019,14,'2019-03-31','2019-04-06'),
	(15,2019,15,'2019-04-07','2019-04-13'),
	(16,2019,16,'2019-04-14','2019-04-20'),
	(17,2019,17,'2019-04-21','2019-04-27'),
	(18,2019,18,'2019-04-28','2019-05-04'),
	(19,2019,19,'2019-05-05','2019-05-11'),
	(20,2019,20,'2019-05-12','2019-05-18'),
	(21,2019,21,'2019-05-19','2019-05-25'),
	(22,2019,22,'2019-05-26','2019-06-01'),
	(23,2019,23,'2019-06-02','2019-06-08'),
	(24,2019,24,'2019-06-09','2019-06-15'),
	(25,2019,25,'2019-06-16','2019-06-22'),
	(26,2019,26,'2019-06-23','2019-06-29'),
	(27,2019,27,'2019-06-30','2019-07-06'),
	(28,2019,28,'2019-07-07','2019-07-13'),
	(29,2019,29,'2019-07-14','2019-07-20'),
	(30,2019,30,'2019-07-21','2019-07-27'),
	(31,2019,31,'2019-07-28','2019-08-03'),
	(32,2019,32,'2019-08-04','2019-08-10'),
	(33,2019,33,'2019-08-11','2019-08-17'),
	(34,2019,34,'2019-08-18','2019-08-24'),
	(35,2019,35,'2019-08-25','2019-08-31'),
	(36,2019,36,'2019-09-01','2019-09-07'),
	(37,2019,37,'2019-09-08','2019-09-14'),
	(38,2019,38,'2019-09-15','2019-09-21'),
	(39,2019,39,'2019-09-22','2019-09-28'),
	(40,2019,40,'2019-09-29','2019-10-05'),
	(41,2019,41,'2019-10-06','2019-10-12'),
	(42,2019,42,'2019-10-13','2019-10-19'),
	(43,2019,43,'2019-10-20','2019-10-26'),
	(44,2019,44,'2019-10-27','2019-11-02'),
	(45,2019,45,'2019-11-03','2019-11-09'),
	(46,2019,46,'2019-11-10','2019-11-16'),
	(47,2019,47,'2019-11-17','2019-11-23'),
	(48,2019,48,'2019-11-24','2019-11-30'),
	(49,2019,49,'2019-12-01','2019-12-07'),
	(50,2019,50,'2019-12-08','2019-12-14'),
	(51,2019,51,'2019-12-15','2019-12-21'),
	(52,2019,52,'2019-12-22','2019-12-28'),
	(53,2018,1,'2017-12-31','2018-01-06'),
	(54,2018,2,'2018-01-07','2018-01-13'),
	(55,2018,3,'2018-01-14','2018-01-20'),
	(56,2018,4,'2018-01-21','2018-01-27'),
	(57,2018,5,'2018-01-28','2018-02-03'),
	(58,2018,6,'2018-02-04','2018-02-10'),
	(59,2018,7,'2018-02-11','2018-02-17'),
	(60,2018,8,'2018-02-18','2018-02-24'),
	(61,2018,9,'2018-02-25','2018-03-03'),
	(62,2018,10,'2018-03-04','2018-03-10'),
	(63,2018,11,'2018-03-11','2018-03-17'),
	(64,2018,12,'2018-03-18','2018-03-24'),
	(65,2018,13,'2018-03-25','2018-03-31'),
	(66,2018,14,'2018-04-01','2018-04-07'),
	(67,2018,15,'2018-04-08','2018-04-14'),
	(68,2018,16,'2018-04-15','2018-04-21'),
	(69,2018,17,'2018-04-22','2018-04-28'),
	(70,2018,18,'2018-04-29','2018-05-05'),
	(71,2018,19,'2018-05-06','2018-05-12'),
	(72,2018,20,'2018-05-13','2018-05-19'),
	(73,2018,21,'2018-05-20','2018-05-26'),
	(74,2018,22,'2018-05-27','2018-06-02'),
	(75,2018,23,'2018-06-03','2018-06-09'),
	(76,2018,24,'2018-06-10','2018-06-16'),
	(77,2018,25,'2018-06-17','2018-06-23'),
	(78,2018,26,'2018-06-24','2018-06-30'),
	(79,2018,27,'2018-07-01','2018-07-07'),
	(80,2018,28,'2018-07-08','2018-07-14'),
	(81,2018,29,'2018-07-15','2018-07-21'),
	(82,2018,30,'2018-07-22','2018-07-28'),
	(83,2018,31,'2018-07-29','2018-08-04'),
	(84,2018,32,'2018-08-05','2018-08-11'),
	(85,2018,33,'2018-08-12','2018-08-18'),
	(86,2018,34,'2018-08-19','2018-08-25'),
	(87,2018,35,'2018-08-26','2018-09-01'),
	(88,2018,36,'2018-09-02','2018-09-08'),
	(89,2018,37,'2018-09-09','2018-09-15'),
	(90,2018,38,'2018-09-16','2018-09-22'),
	(91,2018,39,'2018-09-23','2018-09-29'),
	(92,2018,40,'2018-09-30','2018-10-06'),
	(93,2018,41,'2018-10-07','2018-10-13'),
	(94,2018,42,'2018-10-14','2018-10-20'),
	(95,2018,43,'2018-10-21','2018-10-27'),
	(96,2018,44,'2018-10-28','2018-11-03'),
	(97,2018,45,'2018-11-04','2018-11-10'),
	(98,2018,46,'2018-11-11','2018-11-17'),
	(99,2018,47,'2018-11-18','2018-11-24'),
	(100,2018,48,'2018-11-25','2018-12-01'),
	(101,2018,49,'2018-12-02','2018-12-08'),
	(102,2018,50,'2018-12-09','2018-12-15'),
	(103,2018,51,'2018-12-16','2018-12-22'),
	(104,2018,52,'2018-12-23','2018-12-29'),
	(105,2020,1,'2019-12-29','2020-01-04'),
	(106,2020,2,'2020-01-05','2020-01-11'),
	(107,2020,3,'2020-01-12','2020-01-18'),
	(108,2020,4,'2020-01-19','2020-01-25'),
	(109,2020,5,'2020-01-26','2020-02-01'),
	(110,2020,6,'2020-02-02','2020-02-08'),
	(111,2020,7,'2020-02-09','2020-02-15'),
	(112,2020,8,'2020-02-16','2020-02-22'),
	(113,2020,9,'2020-02-23','2020-02-29'),
	(114,2020,10,'2020-03-01','2020-03-07'),
	(115,2020,11,'2020-03-08','2020-03-14'),
	(116,2020,12,'2020-03-15','2020-03-21'),
	(117,2020,13,'2020-03-22','2020-03-28'),
	(118,2020,14,'2020-03-29','2020-04-04'),
	(119,2020,15,'2020-04-05','2020-04-11'),
	(120,2020,16,'2020-04-12','2020-04-18'),
	(121,2020,17,'2020-04-19','2020-04-25'),
	(122,2020,18,'2020-04-26','2020-05-02'),
	(123,2020,19,'2020-05-03','2020-05-09'),
	(124,2020,20,'2020-05-10','2020-05-16'),
	(125,2020,21,'2020-05-17','2020-05-23'),
	(126,2020,22,'2020-05-24','2020-05-30'),
	(127,2020,23,'2020-05-31','2020-06-06'),
	(128,2020,24,'2020-06-07','2020-06-13'),
	(129,2020,25,'2020-06-14','2020-06-20'),
	(130,2020,26,'2020-06-21','2020-06-27'),
	(131,2020,27,'2020-06-28','2020-07-04'),
	(132,2020,28,'2020-07-05','2020-07-11'),
	(133,2020,29,'2020-07-12','2020-07-18'),
	(134,2020,30,'2020-07-19','2020-07-25'),
	(135,2020,31,'2020-07-26','2020-08-01'),
	(136,2020,32,'2020-08-02','2020-08-08'),
	(137,2020,33,'2020-08-09','2020-08-15'),
	(138,2020,34,'2020-08-16','2020-08-22'),
	(139,2020,35,'2020-08-23','2020-08-29'),
	(140,2020,36,'2020-08-30','2020-09-05'),
	(141,2020,37,'2020-09-06','2020-09-12'),
	(142,2020,38,'2020-09-13','2020-09-19'),
	(143,2020,39,'2020-09-20','2020-09-26'),
	(144,2020,40,'2020-09-27','2020-10-03'),
	(145,2020,41,'2020-10-04','2020-10-10'),
	(146,2020,42,'2020-10-11','2020-10-17'),
	(147,2020,43,'2020-10-18','2020-10-24'),
	(148,2020,44,'2020-10-25','2020-10-31'),
	(149,2020,45,'2020-11-01','2020-11-07'),
	(150,2020,46,'2020-11-08','2020-11-14'),
	(151,2020,47,'2020-11-15','2020-11-21'),
	(152,2020,48,'2020-11-22','2020-11-28'),
	(153,2020,49,'2020-11-29','2020-12-05'),
	(154,2020,50,'2020-12-06','2020-12-12'),
	(155,2020,51,'2020-12-13','2020-12-19'),
	(156,2020,52,'2020-12-20','2020-12-26'),
	(157,2021,1,'2020-12-27','2021-01-02'),
	(158,2021,2,'2021-01-03','2021-01-09'),
	(159,2021,3,'2021-01-10','2021-01-16'),
	(160,2021,4,'2021-01-17','2021-01-23'),
	(161,2021,5,'2021-01-24','2021-01-30'),
	(162,2021,6,'2021-01-31','2021-02-06'),
	(163,2021,7,'2021-02-07','2021-02-13'),
	(164,2021,8,'2021-02-14','2021-02-20'),
	(165,2021,9,'2021-02-21','2021-02-27'),
	(166,2021,10,'2021-02-28','2021-03-06'),
	(167,2021,11,'2021-03-07','2021-03-13'),
	(168,2021,12,'2021-03-14','2021-03-20'),
	(169,2021,13,'2021-03-21','2021-03-27'),
	(170,2021,14,'2021-03-28','2021-04-03'),
	(171,2021,15,'2021-04-04','2021-04-10'),
	(172,2021,16,'2021-04-11','2021-04-17'),
	(173,2021,17,'2021-04-18','2021-04-24'),
	(174,2021,18,'2021-04-25','2021-05-01'),
	(175,2021,19,'2021-05-02','2021-05-08'),
	(176,2021,20,'2021-05-09','2021-05-15'),
	(177,2021,21,'2021-05-16','2021-05-22'),
	(178,2021,22,'2021-05-23','2021-05-29'),
	(179,2021,23,'2021-05-30','2021-06-05'),
	(180,2021,24,'2021-06-06','2021-06-12'),
	(181,2021,25,'2021-06-13','2021-06-19'),
	(182,2021,26,'2021-06-20','2021-06-26'),
	(183,2021,27,'2021-06-27','2021-07-03'),
	(184,2021,28,'2021-07-04','2021-07-10'),
	(185,2021,29,'2021-07-11','2021-07-17'),
	(186,2021,30,'2021-07-18','2021-07-24'),
	(187,2021,31,'2021-07-25','2021-07-31'),
	(188,2021,32,'2021-08-01','2021-08-07'),
	(189,2021,33,'2021-08-08','2021-08-14'),
	(190,2021,34,'2021-08-15','2021-08-21'),
	(191,2021,35,'2021-08-22','2021-08-28'),
	(192,2021,36,'2021-08-29','2021-09-04'),
	(193,2021,37,'2021-09-05','2021-09-11'),
	(194,2021,38,'2021-09-12','2021-09-18'),
	(195,2021,39,'2021-09-19','2021-09-25'),
	(196,2021,40,'2021-09-26','2021-10-02'),
	(197,2021,41,'2021-10-03','2021-10-09'),
	(198,2021,42,'2021-10-10','2021-10-16'),
	(199,2021,43,'2021-10-17','2021-10-23'),
	(200,2021,44,'2021-10-24','2021-10-30'),
	(201,2021,45,'2021-10-31','2021-11-06'),
	(202,2021,46,'2021-11-07','2021-11-13'),
	(203,2021,47,'2021-11-14','2021-11-20'),
	(204,2021,48,'2021-11-21','2021-11-27'),
	(205,2021,49,'2021-11-28','2021-12-04'),
	(206,2021,50,'2021-12-05','2021-12-11'),
	(207,2021,51,'2021-12-12','2021-12-18'),
	(208,2021,52,'2021-12-19','2021-12-25'),
	(209,2022,1,'2021-12-26','2022-01-01'),
	(210,2022,2,'2022-01-02','2022-01-08'),
	(211,2022,3,'2022-01-09','2022-01-15'),
	(212,2022,4,'2022-01-16','2022-01-22'),
	(213,2022,5,'2022-01-23','2022-01-29'),
	(214,2022,6,'2022-01-30','2022-02-05'),
	(215,2022,7,'2022-02-06','2022-02-12'),
	(216,2022,8,'2022-02-13','2022-02-19'),
	(217,2022,9,'2022-02-20','2022-02-26'),
	(218,2022,10,'2022-02-27','2022-03-05'),
	(219,2022,11,'2022-03-06','2022-03-12'),
	(220,2022,12,'2022-03-13','2022-03-19'),
	(221,2022,13,'2022-03-20','2022-03-26'),
	(222,2022,14,'2022-03-27','2022-04-02'),
	(223,2022,15,'2022-04-03','2022-04-09'),
	(224,2022,16,'2022-04-10','2022-04-16'),
	(225,2022,17,'2022-04-17','2022-04-23'),
	(226,2022,18,'2022-04-24','2022-04-30'),
	(227,2022,19,'2022-05-01','2022-05-07'),
	(228,2022,20,'2022-05-08','2022-05-14'),
	(229,2022,21,'2022-05-15','2022-05-21'),
	(230,2022,22,'2022-05-22','2022-05-28'),
	(231,2022,23,'2022-05-29','2022-06-04'),
	(232,2022,24,'2022-06-05','2022-06-11'),
	(233,2022,25,'2022-06-12','2022-06-18'),
	(234,2022,26,'2022-06-19','2022-06-25'),
	(235,2022,27,'2022-06-26','2022-07-02'),
	(236,2022,28,'2022-07-03','2022-07-09'),
	(237,2022,29,'2022-07-10','2022-07-16'),
	(238,2022,30,'2022-07-17','2022-07-23'),
	(239,2022,31,'2022-07-24','2022-07-30'),
	(240,2022,32,'2022-07-31','2022-08-06'),
	(241,2022,33,'2022-08-07','2022-08-13'),
	(242,2022,34,'2022-08-14','2022-08-20'),
	(243,2022,35,'2022-08-21','2022-08-27'),
	(244,2022,36,'2022-08-28','2022-09-03'),
	(245,2022,37,'2022-09-04','2022-09-10'),
	(246,2022,38,'2022-09-11','2022-09-17'),
	(247,2022,39,'2022-09-18','2022-09-24'),
	(248,2022,40,'2022-09-25','2022-10-01'),
	(249,2022,41,'2022-10-02','2022-10-08'),
	(250,2022,42,'2022-10-09','2022-10-15'),
	(251,2022,43,'2022-10-16','2022-10-22'),
	(252,2022,44,'2022-10-23','2022-10-29'),
	(253,2022,45,'2022-10-30','2022-11-05'),
	(254,2022,46,'2022-11-06','2022-11-12'),
	(255,2022,47,'2022-11-13','2022-11-19'),
	(256,2022,48,'2022-11-20','2022-11-26'),
	(257,2022,49,'2022-11-27','2022-12-03'),
	(258,2022,50,'2022-12-04','2022-12-10'),
	(259,2022,51,'2022-12-11','2022-12-17'),
	(260,2022,52,'2022-12-18','2022-12-24'),
	(261,2023,1,'2023-01-01','2023-01-07'),
	(262,2023,2,'2023-01-08','2023-01-14'),
	(263,2023,3,'2023-01-15','2023-01-21'),
	(264,2023,4,'2023-01-22','2023-01-28'),
	(265,2023,5,'2023-01-29','2023-02-04'),
	(266,2023,6,'2023-02-05','2023-02-11'),
	(267,2023,7,'2023-02-12','2023-02-18'),
	(268,2023,8,'2023-02-19','2023-02-25'),
	(269,2023,9,'2023-02-26','2023-03-04'),
	(270,2023,10,'2023-03-05','2023-03-11'),
	(271,2023,11,'2023-03-12','2023-03-18'),
	(272,2023,12,'2023-03-19','2023-03-25'),
	(273,2023,13,'2023-03-26','2023-04-01'),
	(274,2023,14,'2023-04-02','2023-04-08'),
	(275,2023,15,'2023-04-09','2023-04-15'),
	(276,2023,16,'2023-04-16','2023-04-22'),
	(277,2023,17,'2023-04-23','2023-04-29'),
	(278,2023,18,'2023-04-30','2023-05-06'),
	(279,2023,19,'2023-05-07','2023-05-13'),
	(280,2023,20,'2023-05-14','2023-05-20'),
	(281,2023,21,'2023-05-21','2023-05-27'),
	(282,2023,22,'2023-05-28','2023-06-03'),
	(283,2023,23,'2023-06-04','2023-06-10'),
	(284,2023,24,'2023-06-11','2023-06-17'),
	(285,2023,25,'2023-06-18','2023-06-24'),
	(286,2023,26,'2023-06-25','2023-07-01'),
	(287,2023,27,'2023-07-02','2023-07-08'),
	(288,2023,28,'2023-07-09','2023-07-15'),
	(289,2023,29,'2023-07-16','2023-07-22'),
	(290,2023,30,'2023-07-23','2023-07-29'),
	(291,2023,31,'2023-07-30','2023-08-05'),
	(292,2023,32,'2023-08-06','2023-08-12'),
	(293,2023,33,'2023-08-13','2023-08-19'),
	(294,2023,34,'2023-08-20','2023-08-26'),
	(295,2023,35,'2023-08-27','2023-09-02'),
	(296,2023,36,'2023-09-03','2023-09-09'),
	(297,2023,37,'2023-09-10','2023-09-16'),
	(298,2023,38,'2023-09-17','2023-09-23'),
	(299,2023,39,'2023-09-24','2023-09-30'),
	(300,2023,40,'2023-10-01','2023-10-07'),
	(301,2023,41,'2023-10-08','2023-10-14'),
	(302,2023,42,'2023-10-15','2023-10-21'),
	(303,2023,43,'2023-10-22','2023-10-28'),
	(304,2023,44,'2023-10-29','2023-11-04'),
	(305,2023,45,'2023-11-05','2023-11-11'),
	(306,2023,46,'2023-11-12','2023-11-18'),
	(307,2023,47,'2023-11-19','2023-11-25'),
	(308,2023,48,'2023-11-26','2023-12-02'),
	(309,2023,49,'2023-12-03','2023-12-09'),
	(310,2023,50,'2023-12-10','2023-12-16'),
	(311,2023,51,'2023-12-17','2023-12-23'),
	(312,2023,52,'2023-12-24','2023-12-30'),
	(313,2024,1,'2023-12-31','2024-01-06'),
	(314,2024,2,'2024-01-07','2024-01-13'),
	(315,2024,3,'2024-01-14','2024-01-20'),
	(316,2024,4,'2024-01-21','2024-01-27'),
	(317,2024,5,'2024-01-28','2024-02-03'),
	(318,2024,6,'2024-02-04','2024-02-10'),
	(319,2024,7,'2024-02-11','2024-02-17'),
	(320,2024,8,'2024-02-18','2024-02-24'),
	(321,2024,9,'2024-02-25','2024-03-02'),
	(322,2024,10,'2024-03-03','2024-03-09'),
	(323,2024,11,'2024-03-10','2024-03-16'),
	(324,2024,12,'2024-03-17','2024-03-23'),
	(325,2024,13,'2024-03-24','2024-03-30'),
	(326,2024,14,'2024-03-31','2024-04-06'),
	(327,2024,15,'2024-04-07','2024-04-13'),
	(328,2024,16,'2024-04-14','2024-04-20'),
	(329,2024,17,'2024-04-21','2024-04-27'),
	(330,2024,18,'2024-04-28','2024-05-04'),
	(331,2024,19,'2024-05-05','2024-05-11'),
	(332,2024,20,'2024-05-12','2024-05-18'),
	(333,2024,21,'2024-05-19','2024-05-25'),
	(334,2024,22,'2024-05-26','2024-06-01'),
	(335,2024,23,'2024-06-02','2024-06-08'),
	(336,2024,24,'2024-06-09','2024-06-15'),
	(337,2024,25,'2024-06-16','2024-06-22'),
	(338,2024,26,'2024-06-23','2024-06-29'),
	(339,2024,27,'2024-06-30','2024-07-06'),
	(340,2024,28,'2024-07-07','2024-07-13'),
	(341,2024,29,'2024-07-14','2024-07-20'),
	(342,2024,30,'2024-07-21','2024-07-27'),
	(343,2024,31,'2024-07-28','2024-08-03'),
	(344,2024,32,'2024-08-04','2024-08-10'),
	(345,2024,33,'2024-08-11','2024-08-17'),
	(346,2024,34,'2024-08-18','2024-08-24'),
	(347,2024,35,'2024-08-25','2024-08-31'),
	(348,2024,36,'2024-09-01','2024-09-07'),
	(349,2024,37,'2024-09-08','2024-09-14'),
	(350,2024,38,'2024-09-15','2024-09-21'),
	(351,2024,39,'2024-09-22','2024-09-28'),
	(352,2024,40,'2024-09-29','2024-10-05'),
	(353,2024,41,'2024-10-06','2024-10-12'),
	(354,2024,42,'2024-10-13','2024-10-19'),
	(355,2024,43,'2024-10-20','2024-10-26'),
	(356,2024,44,'2024-10-27','2024-11-02'),
	(357,2024,45,'2024-11-03','2024-11-09'),
	(358,2024,46,'2024-11-10','2024-11-16'),
	(359,2024,47,'2024-11-17','2024-11-23'),
	(360,2024,48,'2024-11-24','2024-11-30'),
	(361,2024,49,'2024-12-01','2024-12-07'),
	(362,2024,50,'2024-12-08','2024-12-14'),
	(363,2024,51,'2024-12-15','2024-12-21'),
	(364,2024,52,'2024-12-22','2024-12-28');

/*!40000 ALTER TABLE `CALENDAR` ENABLE KEYS */;
UNLOCK TABLES;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
