
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ACCESS_TYPE_COMBINATION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_TYPE_COMBINATION`;

CREATE TABLE `ACCESS_TYPE_COMBINATION` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `COMBINATION` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table ACCESS_ROLE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_ROLE`;

CREATE TABLE `ACCESS_ROLE` (
  `ACCESS_ROLE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(255) NOT NULL,
  `COMBINATION_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ACCESS_ROLE_ID`),
  FOREIGN KEY (`COMBINATION_ID`) REFERENCES `ACCESS_TYPE_COMBINATION` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table ACCESS_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACCESS_TYPE`;

CREATE TABLE `ACCESS_TYPE` (
  `ACCESS_TYPE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE` varchar(255) NOT NULL,
  PRIMARY KEY (`ACCESS_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table CATEGORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CATEGORY`;

CREATE TABLE `CATEGORY` (
  `CATEGORY_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table CERTIFICATION_SKILLS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CERTIFICATION_SKILLS`;

CREATE TABLE `CERTIFICATION_SKILLS` (
  `CERTIFICATION_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CERTIFICATION_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CERTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table CUSTOM_LABEL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOM_LABEL`;

CREATE TABLE `CUSTOM_LABEL` (
  `CUSTOM_LABEL_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MODULE_NAME` varchar(50) NOT NULL,
  `FIELD_NAME` varchar(50) NOT NULL,
  `FIELD_VALUE` varchar(500) NOT NULL,
  PRIMARY KEY (`CUSTOM_LABEL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table CONTACT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CONTACT`;

CREATE TABLE `CONTACT` (
  `CONTACT_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PHONE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CONTACT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=LATIN1;


# Dump of table CUSTOMER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOMER`;

CREATE TABLE `CUSTOMER` (
  `CUSTOMER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CUSTOMER_NAME` varchar(255) DEFAULT NULL,
  `CUSTOMER_ADDRESS` varchar(255) DEFAULT NULL,
  `CUSTOMER_CITY` varchar(255) DEFAULT NULL,
  `CUSTOMER_STATE` varchar(255) DEFAULT NULL,
  `CUSTOMER_ZIP` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CUSTOMER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table CUSTOMER_CONTACTS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CUSTOMER_CONTACTS`;

CREATE TABLE `CUSTOMER_CONTACTS` (
  `CUSTOMER_ID` int(11) unsigned NOT NULL,
  `CONTACT_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`CUSTOMER_ID`,`CONTACT_ID`),
  FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER` (`CUSTOMER_ID`),
  FOREIGN KEY (`CONTACT_ID`) REFERENCES `CONTACT` (`CONTACT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table EXPERIENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `EXPERIENCE`;

CREATE TABLE `EXPERIENCE` (
  `EXPERIENCE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `EXPERIENCE_LABEL` varchar(255) NOT NULL,
  PRIMARY KEY (`EXPERIENCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table TIMELINE_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TIMELINE_TYPE`;

CREATE TABLE `TIMELINE_TYPE` (
  `TIMELINE_TYPE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE` varchar(50) NOT NULL,
  PRIMARY KEY (`TIMELINE_TYPE_ID`),
  KEY `TIMELINE_TYPE_ID` (`TIMELINE_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table PROJECT_GROUP
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_GROUP`;

CREATE TABLE `PROJECT_GROUP` (
  `GROUP_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table PROJECT_STATUS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_STATUS`;

CREATE TABLE `PROJECT_STATUS` (
  `STATUS_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STATUS_NAME` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table PROJECT_TYPE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_TYPE`;

CREATE TABLE `PROJECT_TYPE` (
  `TYPE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` varchar(50) NOT NULL,
  PRIMARY KEY (`TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table REGION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REGION`;

CREATE TABLE `REGION` (
  `REGION_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `REGION_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`REGION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table OFFICE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `OFFICE`;

CREATE TABLE `OFFICE` (
  `OFFICE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OFFICE_NAME` varchar(255) NOT NULL,
  `OFFICE_ADDRESS` varchar(255) DEFAULT NULL,
  `OFFICE_CITY` varchar(255) NOT NULL,
  `OFFICE_STATE` varchar(255) DEFAULT NULL,
  `OFFICE_ZIP` varchar(10) DEFAULT NULL,
  `OFFICE_TYPE` varchar(50) DEFAULT NULL,
  `REGION_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`OFFICE_ID`),
  KEY `fkIdx_375` (`REGION_ID`),
  CONSTRAINT `FK_375` FOREIGN KEY (`REGION_ID`) REFERENCES `REGION` (`REGION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table STAFF_ROLE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_ROLE`;

CREATE TABLE `STAFF_ROLE` (
  `ROLE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(50) NOT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table STAFF_GROUP
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_GROUP`;

CREATE TABLE `STAFF_GROUP` (
  `GROUP_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table STAFF_STATUS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_STATUS`;

CREATE TABLE `STAFF_STATUS` (
  `STATUS_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STATUS_NAME` varchar(50) NOT NULL,
  PRIMARY KEY (`STATUS_ID`),
  KEY `fkIdx_350` (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF`;

CREATE TABLE `STAFF` (
  `STAFF_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
  `STAFF_PHOTO` varchar(255) DEFAULT NULL,
  `STAFF_ROLE_ID` int(11) unsigned DEFAULT NULL,
  `STAFF_GROUP_ID` int(11) unsigned DEFAULT NULL,
  `STAFF_STATUS_ID` int(11) unsigned DEFAULT NULL,
  `OFFICE_ID` int(11) unsigned DEFAULT NULL,
  `EMPLOYMENT_START_DATE` date DEFAULT NULL,
  `PREFERENCES` mediumtext,
  `CANRELOCATE` tinyint(1) DEFAULT '0',
  `CANCOMMUTE` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`STAFF_ID`),
  KEY `fkIdx_350` (`STAFF_ID`),
  KEY `FK_349` (`STAFF_STATUS_ID`),
  KEY `STAFF_ROLE_ID` (`STAFF_ROLE_ID`),
  KEY `STAFF_GROUP_ID` (`STAFF_GROUP_ID`),
  KEY `OFFICE_ID` (`OFFICE_ID`),
  CONSTRAINT `FK_349` FOREIGN KEY (`STAFF_STATUS_ID`) REFERENCES `STAFF_STATUS` (`STATUS_ID`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`STAFF_ROLE_ID`) REFERENCES `STAFF_ROLE` (`ROLE_ID`),
  CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`STAFF_GROUP_ID`) REFERENCES `STAFF_GROUP` (`GROUP_ID`),
  CONSTRAINT `staff_ibfk_3` FOREIGN KEY (`OFFICE_ID`) REFERENCES `OFFICE` (`OFFICE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table PROJECT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT`;

CREATE TABLE `PROJECT` (
  `PROJECT_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PROJECT_NO` varchar(30) DEFAULT NULL,
  `PROJECT_NAME` varchar(255) NOT NULL,
  `PROJECT_ROM` varchar(20) DEFAULT NULL,
  `PROJECT_ADDRESS` varchar(255) DEFAULT NULL,
  `PROJECT_COUNTRY` varchar(255) DEFAULT NULL,
  `PROJECT_CITY` varchar(255) DEFAULT NULL,
  `PROJECT_STATE` varchar(50) DEFAULT NULL,
  `PROJECT_ZIP` varchar(10) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `PROJECT_DURATION` int(11) DEFAULT NULL,
  `PROJECT_STATUS_ID` int(11) unsigned DEFAULT NULL,
  `PROJECT_TYPE_ID` int(11) unsigned DEFAULT NULL,
  `OFFICE_ID` int(11) unsigned NOT NULL,
  `CATEGORY_ID` int(11) unsigned NOT NULL,
  `PROJECT_DESCRIPTION` text,
  `GROUP_ID` int(11) unsigned NOT NULL,
  `TIMELINE_TYPE_ID` int(11) unsigned NOT NULL,
  `CUSTOMER_ID` int(11) unsigned DEFAULT NULL,
  `CONTACT_ID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`PROJECT_ID`),
  KEY `fkIdx_341` (`GROUP_ID`),
  CONSTRAINT `FK_341` FOREIGN KEY (`GROUP_ID`) REFERENCES `PROJECT_GROUP` (`GROUP_ID`),
  FOREIGN KEY (`PROJECT_STATUS_ID`) REFERENCES `PROJECT_STATUS` (`STATUS_ID`),
  FOREIGN KEY (`PROJECT_TYPE_ID`) REFERENCES `PROJECT_TYPE` (`TYPE_ID`),
  FOREIGN KEY (`OFFICE_ID`) REFERENCES `OFFICE` (`OFFICE_ID`),
  FOREIGN KEY (`CATEGORY_ID`) REFERENCES `CATEGORY` (`CATEGORY_ID`),
  FOREIGN KEY (`TIMELINE_TYPE_ID`) REFERENCES `TIMELINE_TYPE` (`TIMELINE_TYPE_ID`),
  FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER` (`CUSTOMER_ID`),
  FOREIGN KEY (`CONTACT_ID`) REFERENCES `CONTACT` (`CONTACT_ID`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table PLANNED_PROJECT_STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PLANNED_PROJECT_STAFF`;

CREATE TABLE `PLANNED_PROJECT_STAFF` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `ALLOCATION` float(8,2) NOT NULL,
  `PROJECT_ROLE_ID` int(11) unsigned NOT NULL,
  `CONFIRMED` tinyint(1) DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true',
  `PROJECT_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`),
  FOREIGN KEY (`PROJECT_ROLE_ID`) REFERENCES `STAFF_ROLE` (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table PROJECT_STAFF
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PROJECT_STAFF`;

CREATE TABLE `PROJECT_STAFF` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STAFF_ID` int(11) unsigned NOT NULL,
  `PROJECT_ID` int(11) unsigned NOT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `ALLOCATION` float(8,2) DEFAULT NULL,
  `PROJECT_ROLE_ID` int(11) unsigned DEFAULT NULL,
  `CONFIRMED` char(1) DEFAULT NULL,
  `RESUME_SUBMITTED` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: false , 1: true',
  PRIMARY KEY (`ID`),
  KEY `STAFF_ID` (`STAFF_ID`),
  KEY `PROJECT_ID` (`PROJECT_ID`),
  KEY `PROJECT_ROLE_ID` (`PROJECT_ROLE_ID`),
  CONSTRAINT `project_staff_ibfk_1` FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`),
  CONSTRAINT `project_staff_ibfk_2` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`),
  CONSTRAINT `project_staff_ibfk_3` FOREIGN KEY (`PROJECT_ROLE_ID`) REFERENCES `STAFF_ROLE` (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table STAFF_CERTIFICATION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_CERTIFICATION`;

CREATE TABLE `STAFF_CERTIFICATION` (
  `STAFF_CERTIFICATION_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STAFF_ID` int(11) unsigned NOT NULL,
  `CERTIFICATION_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`STAFF_CERTIFICATION_ID`),
  FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`),
  FOREIGN KEY (`CERTIFICATION_ID`) REFERENCES `CERTIFICATION_SKILLS` (`CERTIFICATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table STAFF_PROJECT_EXPERIENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_PROJECT_EXPERIENCE`;

CREATE TABLE `STAFF_PROJECT_EXPERIENCE` (
  `EXPERIENCE_ID` int(11) unsigned NOT NULL,
  `STAFF_ID` int(11) unsigned NOT NULL,
  `PROJECT_ID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`EXPERIENCE_ID`,`STAFF_ID`),
  KEY `fkIdx_355` (`EXPERIENCE_ID`),
  KEY `fkIdx_358` (`STAFF_ID`),
  KEY `fkIdx_363` (`PROJECT_ID`),
  CONSTRAINT `FK_355` FOREIGN KEY (`EXPERIENCE_ID`) REFERENCES `EXPERIENCE` (`EXPERIENCE_ID`),
  CONSTRAINT `FK_358` FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`),
  CONSTRAINT `FK_363` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table USER_ACCESS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER_ACCESS`;

CREATE TABLE `USER_ACCESS` (
  `USER_ACCESS_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11)  unsigned NOT NULL,
  `OFFICE_ID` int(11) unsigned NOT NULL,
  `REGION_ID` int(11) unsigned NOT NULL,
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
  `USER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ROLE_ID` int(11) NOT NULL,
  `FIRST_NAME` varchar(50) NOT NULL,
  `MIDDLE_NAME` varchar(50) NOT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `VERIFIED` enum('true','false') NOT NULL,
  `ADDRESS` varchar(255) NOT NULL,
  `CITY` varchar(255) NOT NULL,
  `COUNTRY` varchar(255) NOT NULL,
  `ZIP` varchar(255) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table PASSWORD_RESET
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PASSWORD_RESET`;

CREATE TABLE `PASSWORD_RESET` (
  `PASSWORD_RESET_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) unsigned NOT NULL,
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
  `USER_ID` int(11) unsigned NOT NULL,
  `CONTENT` mediumtext NOT NULL,
  `CREATED` datetime NOT NULL,
  `UPDATED` datetime NOT NULL,
  `PROJECT_ID` int(11) unsigned NOT NULL,
  `NODE_PARENT_ID` int(11) unsigned DEFAULT NULL,
  `IS_PARENT` tinyint(1) NOT NULL,
  PRIMARY KEY (`NOTE_ID`),
  FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`),
  FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`),
  FOREIGN KEY (`NODE_PARENT_ID`) REFERENCES `NOTES` (`NOTE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table USER_PREFERENCE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER_PREFERENCE`;

CREATE TABLE `USER_PREFERENCE` (
  `PREFERENCE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) unsigned NOT NULL,
  `CONTENT` mediumtext NOT NULL,
  PRIMARY KEY (`PREFERENCE_ID`),
  KEY `fkIdx_410` (`USER_ID`),
  CONSTRAINT `FK_411` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table CALENDAR
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CALENDAR`;

CREATE TABLE `CALENDAR` (
  `CALENDAR_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `YEAR` int(4) unsigned NOT NULL,
  `WEEK` int(2) unsigned NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  PRIMARY KEY (`CALENDAR_ID`),
  UNIQUE KEY `YEAR` (`YEAR`,`WEEK`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

# Dump of table STAFF_ALLOCATION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `STAFF_ALLOCATION`;

CREATE TABLE `STAFF_ALLOCATION` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CALENDAR_ID` int(11) unsigned NOT NULL,
  `PROJECT_STAFF_ID` int(11) unsigned NOT NULL,
  `ALLOCATION` int(3) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `CALENDAR_ID` (`CALENDAR_ID`),
  KEY `PROJECT_STAFF_ID` (`PROJECT_STAFF_ID`),
  CONSTRAINT `staff_allocation_ibfk_1` FOREIGN KEY (`CALENDAR_ID`) REFERENCES `CALENDAR` (`CALENDAR_ID`),
  CONSTRAINT `staff_allocation_ibfk_2` FOREIGN KEY (`PROJECT_STAFF_ID`) REFERENCES `PROJECT_STAFF` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
