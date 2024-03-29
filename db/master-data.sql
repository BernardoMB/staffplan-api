
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table COMPANY
# ------------------------------------------------------------

LOCK TABLES `COMPANY` WRITE;
/*!40000 ALTER TABLE `COMPANY` DISABLE KEYS */;

INSERT INTO `COMPANY` (`ID`, `NAME`, `ADDRESS`, `PRIMARY_CONTACT`, `PRIMARY_CONTACT_EMAIL`, `PRIMARY_CONTACT_PHONE`, `PRIMARY_CONTACT_TITLE`, `CREATED_DATE_TIME`, `UPDATED_DATE_TIME`, `CREATED_BY`, `UPDATED_BY`)
VALUES
	(1,'StaffPlan','USA','Admin','admin@staffplan.io','888-555-9021','System Admin','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com');

	(1,Acme,USA,Admin,admin@staffplan.io,888-555-9021,System Admin,2018-01-01 00:00:00,2018-01-01 00:00:00,minhdn1210@gmail.com,minhdn1210@gmail.com)



/*!40000 ALTER TABLE `COMPANY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table COMPANY_ENVIRONMENT
# ------------------------------------------------------------

LOCK TABLES `COMPANY_ENVIRONMENT` WRITE;
/*!40000 ALTER TABLE `COMPANY_ENVIRONMENT` DISABLE KEYS */;

INSERT INTO `COMPANY_ENVIRONMENT` (`ID`, `COMPANY_ID`, `ENVIRONMENT_TYPE_ID`, `STATUS`, `START_DATE_TIME`, `CREATED_DATE_TIME`, `UPDATED_DATE_TIME`, `CREATED_BY`, `UPDATED_BY`, `COMPANY_DB`, `DOMAIN`)
VALUES
	(1,1,1,'active','2019-04-01 00:00:00','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','staging_staffplan', 'StaffPlan'),
	(2,1,2,'active','2019-04-01 00:00:00','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','demo_staffplan', 'StaffPlan'),
	(3,1,3,'active','2019-04-01 00:00:00','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','prod_staffplan', 'StaffPlan'),
	(4,1,4,'active','2019-04-01 00:00:00','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','qa_staffplan', 'StaffPlan');

/*!40000 ALTER TABLE `COMPANY_ENVIRONMENT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ENVIRONMENT_TYPE
# ------------------------------------------------------------

LOCK TABLES `ENVIRONMENT_TYPE` WRITE;
/*!40000 ALTER TABLE `ENVIRONMENT_TYPE` DISABLE KEYS */;

INSERT INTO `ENVIRONMENT_TYPE` (`ID`, `NAME`, `DETAILS`, `CREATED_DATE_TIME`, `UPDATED_DATE_TIME`, `CREATED_BY`, `UPDATED_BY`, `SUBDOMAIN`)
VALUES
	(1,'Staging','Environment for testing before push to production','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','Staging'),
	(2,'Demo','Environment staffplan will provide to customer for demoing ','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','Demo'),
	(3,'Prod','Production environment','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com',''),
	(4,'Trial','Trial environment','2018-01-01 00:00:00','2018-01-01 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com','Trial');
;

/*!40000 ALTER TABLE `ENVIRONMENT_TYPE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SUBSCRIPTION_SERVICE
# ------------------------------------------------------------

LOCK TABLES `SUBSCRIPTION_SERVICE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` DISABLE KEYS */;

INSERT INTO `SUBSCRIPTION_SERVICE` (`ID`, `COMPANY_ID`, `SUBSCRIPTION_TYPE_ID`, `USER_COUNT`, `REMAINING_USER_COUNT`, `CREATED_DATE_TIME`, `UPDATED_DATE_TIME`, `CREATED_BY`, `UPDATED_BY`, `ACTUAL_MONTHLY_FEE`, `ACTUAL_ANNUAL_FEE`, `ACTUAL_SUPPORT_FEE`)
VALUES
	(1,1,1,10,10,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com',0.00,0.00,0.00),
	(2,1,2,10,10,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com',0.00,0.00,0.00),
	(3,1,3,50,50,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com',0.00,0.00,0.00),
	(4,1,4,10,10,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com',0.00,0.00,0.00);

/*!40000 ALTER TABLE `SUBSCRIPTION_SERVICE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SUBSCRIPTION_TYPE
# ------------------------------------------------------------

LOCK TABLES `SUBSCRIPTION_TYPE` WRITE;
/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` DISABLE KEYS */;

INSERT INTO `SUBSCRIPTION_TYPE` (`ID`, `NAME`, `DETAILS`, `LIST_PRICE_PER_MONTH`, `LIST_PRICE_ANNUAL`, `SUPPORT_FEES_ANNUAL`, `STAGING_SERVICE_FEE`, `CREATED_DATE_TIME`, `UPDATED_DATE_TIME`, `CREATED_BY`, `UPDATED_BY`)
VALUES
	(1,'StaffPlan Admin','Manage to all users, projects and staff data of company',30.00,100.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(2,'Staffing Access','Manage to all projects and staff data of company',20.00,90.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(3,'Project Access','Assign and Manage roles in projects',20.00,80.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(4,'Staff Data 500-1000','Manage Staff data only',10.00,50.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(5,'wifa access','',100.00,200.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(6,'Staff Data 0-500','',5.00,10.00,5.00,6.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com'),
	(7,'100 staff 10 user 1 admin','100 staff 10 user 1 admin',30.00,0.00,0.00,0.00,'2019-01-15 00:00:00','2019-01-15 00:00:00','minhdn1210@gmail.com','minhdn1210@gmail.com');

/*!40000 ALTER TABLE `SUBSCRIPTION_TYPE` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
