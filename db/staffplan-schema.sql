
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ACCESS_ROLE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_ROLE`;

CREATE TABLE `ACCESS_ROLE` (
  `ACCESS_ROLE_ID` int(11) NOT NULL,
  `ROLE_NAME` varchar(255) NOT NULL,
  `COMBINATION_ID` int(11) NOT NULL,
  PRIMARY KEY (`ACCESS_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ACCESS_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_TYPE`;

CREATE TABLE `ACCESS_TYPE` (
  `ACCESS_TYPE_ID` int(11) NOT NULL,
  `TYPE` varchar(255) NOT NULL,
  PRIMARY KEY (`ACCESS_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ACCESS_TYPE_COMBINATION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_TYPE_COMBINATION`;

CREATE TABLE `ACCESS_TYPE_COMBINATION` (
  `ID` int(11) NOT NULL,
  `COMBINATION` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CATEGORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CATEGORY`;

CREATE TABLE `CATEGORY` (
  `CATEGORY_ID` int(11) NOT NULL,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CERTIFICATION_SKILLS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CERTIFICATION_SKILLS`;

CREATE TABLE `CERTIFICATION_SKILLS` (
  `CERTIFICATION_ID` int(11) NOT NULL,
  `CERTIFICATION_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CERTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CUSTOM_LABEL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOM_LABEL`;

CREATE TABLE `CUSTOM_LABEL` (
  `CUSTOM_LABEL_ID` int(11) NOT NULL,
  `TABLE_NAME` varchar(50) NOT NULL,
  `FIELD_NAME` varchar(50) NOT NULL,
  `CUSTOM_FIELD` varchar(50) NOT NULL,
  PRIMARY KEY (`CUSTOM_LABEL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CUSTOMER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOMER`;

CREATE TABLE `CUSTOMER` (
  `CUSTOMER_ID` int(11) NOT NULL,
  `CUSTOMER_NAME` varchar(255) DEFAULT NULL,
  `CUSTOMER_ADDRESS` varchar(255) DEFAULT NULL,
  `CUSTOMER_CITY` varchar(50) DEFAULT NULL,
  `CUSTOMER_STATE` varchar(10) DEFAULT NULL,
  `CUSTOMER_ZIP` varchar(10) DEFAULT NULL,
  `CUSTOMER_CONTACT` varchar(255) DEFAULT NULL,
  `CONTACT_PHONE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CUSTOMER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CUSTOMER_PROJECTS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOMER_PROJECTS`;

CREATE TABLE `CUSTOMER_PROJECTS` (
  `CUSTOMER_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  PRIMARY KEY (`CUSTOMER_ID`,`PROJECT_ID`),
  KEY `FK_CUSTOMER` (`CUSTOMER_ID`),
  KEY `fkIdx_367` (`CUSTOMER_ID`),
  KEY `fkIdx_370` (`PROJECT_ID`),
  CONSTRAINT `FK_367` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER` (`CUSTOMER_ID`),
  CONSTRAINT `FK_370` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table EXPERIENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `EXPERIENCE`;

CREATE TABLE `EXPERIENCE` (
  `EXPERIENCE_ID` int(11) NOT NULL,
  `EXPERIENCE_LABEL` varchar(255) NOT NULL,
  PRIMARY KEY (`EXPERIENCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table OFFICE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `OFFICE`;

CREATE TABLE `OFFICE` (
  `OFFICE_ID` int(11) NOT NULL,
  `OFFICE_NAME` varchar(255) DEFAULT NULL,
  `OFFICE_ADDRESS` varchar(255) DEFAULT NULL,
  `OFFICE_CITY` varchar(255) NOT NULL,
  `OFFICE_STATE` varchar(10) DEFAULT NULL,
  `OFFICE_ZIP` varchar(10) DEFAULT NULL,
  `OFFICE_TYPE` varchar(50) DEFAULT NULL,
  `REGION_ID` int(11) NOT NULL,
  PRIMARY KEY (`OFFICE_ID`),
  KEY `fkIdx_375` (`REGION_ID`),
  CONSTRAINT `FK_375` FOREIGN KEY (`REGION_ID`) REFERENCES `REGION` (`REGION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PLANNED_PROJECT_STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PLANNED_PROJECT_STAFF`;

CREATE TABLE `PLANNED_PROJECT_STAFF` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `ALLOCATION` float(8,2) NOT NULL,
  `PROJECT_ROLE_ID` int(11) NOT NULL,
  `ASSIGNMENT_DURATION` int(11) DEFAULT NULL,
  `CONFIRMED` tinyint(1) DEFAULT NULL,
  `NEXT_AVAILABLE` date DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true',
  `PROJECT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fkIdx_344` (`PROJECT_ID`),
  KEY `ID` (`ID`),
  CONSTRAINT `FK_344` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT`;

CREATE TABLE `PROJECT` (
  `PROJECT_ID` int(11) NOT NULL,
  `PROJECT_NO` varchar(30) NOT NULL,
  `PROJECT_NAME` varchar(255) NOT NULL,
  `PROJECT_ROM` varchar(20) DEFAULT NULL,
  `PROJECT_ADDRESS` varchar(255) DEFAULT NULL,
  `PROJECT_COUNTRY` varchar(50) DEFAULT NULL,
  `PROJECT_CITY` varchar(50) DEFAULT NULL,
  `PROJECT_STATE` varchar(50) DEFAULT NULL,
  `PROJECT_ZIP` varchar(10) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `PROJECT_DURATION` int(11) DEFAULT NULL,
  `PROJECT_STATUS_ID` int(11) DEFAULT NULL,
  `PROJECT_TYPE_ID` int(11) DEFAULT NULL,
  `OFFICE_ID` int(11) NOT NULL,
  `CATEGORY_ID` int(11) NOT NULL,
  `PROJECT_DESCRIPTION` text,
  `TIMELINE_TYPE` enum('1','2') DEFAULT NULL COMMENT '1: Estimated , 2:Confirmed',
  `GROUP_ID` int(11) NOT NULL,
  PRIMARY KEY (`PROJECT_ID`),
  KEY `fkIdx_341` (`GROUP_ID`),
  CONSTRAINT `FK_341` FOREIGN KEY (`GROUP_ID`) REFERENCES `PROJECT_GROUP` (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT_GROUP
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_GROUP`;

CREATE TABLE `PROJECT_GROUP` (
  `GROUP_ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT_STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_STAFF`;

CREATE TABLE `PROJECT_STAFF` (
  `STAFF_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `ALLOCATION` float(8,2) DEFAULT NULL,
  `PROJECT_ROLE_ID` int(11) DEFAULT NULL,
  `ASSIGNMENT_DURATION` int(11) DEFAULT NULL,
  `CONFIRMED` char(1) DEFAULT NULL,
  `NEXT_AVAILABLE` date DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true',
  `EXPERIENCE_ID` text,
  PRIMARY KEY (`STAFF_ID`,`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT_STATUS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_STATUS`;

CREATE TABLE `PROJECT_STATUS` (
  `STATUS_ID` int(11) NOT NULL,
  `STATUS_NAME` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_TYPE`;

CREATE TABLE `PROJECT_TYPE` (
  `TYPE_ID` int(11) NOT NULL,
  `TYPE_NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table REGION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REGION`;

CREATE TABLE `REGION` (
  `REGION_ID` int(11) NOT NULL,
  `REGION_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`REGION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF`;

CREATE TABLE `STAFF` (
  `STAFF_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(50) NOT NULL,
  `MIDDLE_INITIAL` varchar(5) DEFAULT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `PREFERRED_NAME` varchar(50) DEFAULT NULL,
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
  `STAFF_ROLE_ID` int(11) DEFAULT NULL,
  `STAFF_GROUP_ID` int(11) DEFAULT NULL,
  `STAFF_STATUS_ID` int(11) DEFAULT NULL,
  `OFFICE_ID` varchar(255) DEFAULT NULL,
  `EMPLOYMENT_START_DATE` date DEFAULT NULL,
  PRIMARY KEY (`STAFF_ID`),
  KEY `fkIdx_350` (`STAFF_ID`),
  KEY `FK_349` (`STAFF_STATUS_ID`),
  CONSTRAINT `FK_349` FOREIGN KEY (`STAFF_STATUS_ID`) REFERENCES `STAFF_STATUS` (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF_CERTIFICATION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_CERTIFICATION`;

CREATE TABLE `STAFF_CERTIFICATION` (
  `STAFF_CERTIFICATION_ID` int(11) NOT NULL,
  `STAFF_ID` int(11) NOT NULL,
  `CERTIFICATION_ID` int(11) NOT NULL,
  PRIMARY KEY (`STAFF_CERTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF_GROUP
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_GROUP`;

CREATE TABLE `STAFF_GROUP` (
  `GROUP_ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF_PROJECT_EXPERIENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_PROJECT_EXPERIENCE`;

CREATE TABLE `STAFF_PROJECT_EXPERIENCE` (
  `EXPERIENCE_ID` int(11) NOT NULL,
  `STAFF_ID` int(11) NOT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`EXPERIENCE_ID`,`STAFF_ID`),
  KEY `fkIdx_355` (`EXPERIENCE_ID`),
  KEY `fkIdx_358` (`STAFF_ID`),
  KEY `fkIdx_363` (`PROJECT_ID`),
  CONSTRAINT `FK_355` FOREIGN KEY (`EXPERIENCE_ID`) REFERENCES `EXPERIENCE` (`EXPERIENCE_ID`),
  CONSTRAINT `FK_358` FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`),
  CONSTRAINT `FK_363` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF_ROLE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_ROLE`;

CREATE TABLE `STAFF_ROLE` (
  `ROLE_ID` int(11) NOT NULL,
  `ROLE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table STAFF_STATUS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_STATUS`;

CREATE TABLE `STAFF_STATUS` (
  `STATUS_ID` int(11) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`),
  KEY `fkIdx_350` (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table USER_ACCESS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER_ACCESS`;

CREATE TABLE `USER_ACCESS` (
  `USER_ACCESS_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `OFFICE_ID` int(11) NOT NULL,
  `REGION_ID` int(11) NOT NULL,
  PRIMARY KEY (`USER_ACCESS_ID`),
  KEY `fkIdx_380` (`USER_ID`),
  KEY `fkIdx_383` (`OFFICE_ID`),
  KEY `fkIdx_386` (`REGION_ID`),
  CONSTRAINT `FK_380` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`),
  CONSTRAINT `FK_383` FOREIGN KEY (`OFFICE_ID`) REFERENCES `OFFICE` (`OFFICE_ID`),
  CONSTRAINT `FK_386` FOREIGN KEY (`REGION_ID`) REFERENCES `REGION` (`REGION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table USERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
  `USER_ID` int(11) NOT NULL,
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
  `ZIP` varchar(255) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table PASSWORD_RESET
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PASSWORD_RESET`;

CREATE TABLE `PASSWORD_RESET` (
  `PASSWORD_RESET_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `REQUEST_DATE` datetime NOT NULL,
  `RESET_ID` varchar(50) NOT NULL,
  `ACTIVE` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`PASSWORD_RESET_ID`),
  KEY `fkIdx_390` (`USER_ID`),
  CONSTRAINT `FK_391` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `NOTES`;

CREATE TABLE `NOTES` (
  `NOTE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `CONTENT` mediumtext NOT NULL,
  `CREATED` date NOT NULL,
  `UPDATED` date NOT NULL,
  `PROJECT_ID` varchar(255) NOT NULL DEFAULT '',
  `NODE_PARENT_ID` int(11) DEFAULT NULL,
  `IS_PARENT` tinyint(1) NOT NULL,
  PRIMARY KEY (`NOTE_ID`),
  KEY `fkIdx_420` (`USER_ID`),
  CONSTRAINT `FK_421` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table USER_PREFERENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER_PREFERENCE`;

CREATE TABLE `USER_PREFERENCE` (
  `PREFERENCE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `CONTENT` mediumtext NOT NULL,
  PRIMARY KEY (`PREFERENCE_ID`),
  KEY `fkIdx_410` (`USER_ID`),
  CONSTRAINT `FK_411` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
