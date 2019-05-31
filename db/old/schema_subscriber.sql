-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2018 at 07:55 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.1.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Staff_Plan_Subscriber_Details`
--

-- --------------------------------------------------------

--
-- Table structure for table `ACCESS_TYPE`
--

CREATE TABLE `ACCESS_TYPE` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ACCESS_TYPE_COMBINATION`
--

CREATE TABLE `ACCESS_TYPE_COMBINATION` (
  `ID` int(11) NOT NULL,
  `COMBINATION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `CATEGORY_ID` int(10) NOT NULL,
  `CATEGORY_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `CERTIFICATION_SKILLS`
--

CREATE TABLE `CERTIFICATION_SKILLS` (
  `CERTIFICATION_ID` int(11) NOT NULL,
  `CERTIFICATION_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMER`
--

CREATE TABLE `CUSTOMER` (
  `CUSTOMER_ID` varchar(50) NOT NULL,
  `CUSTOMER_NAME` varchar(255) DEFAULT NULL,
  `CUSTOMER_ADDRESS` varchar(255) DEFAULT NULL,
  `CUSTOMER_CITY` varchar(255) DEFAULT NULL,
  `CUSTOMER_STATE` varchar(10) DEFAULT NULL,
  `CUSTOMER_ZIP` varchar(10) DEFAULT NULL,
  `CUSTOMER_CONTACT` varchar(255) DEFAULT NULL,
  `CONTACT_PHONE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMER_PROJECTS`
--

CREATE TABLE `CUSTOMER_PROJECTS` (
  `PROJECT_ID` varchar(255) NOT NULL,
  `CUSTOMER_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mysql_migrations_347ertt3e`
--

CREATE TABLE `mysql_migrations_347ertt3e` (
  `timestamp` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `OFFICE`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `PLANNED_PROJECT_PEOPLE`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT`
--

CREATE TABLE `PROJECT` (
  `PROJECT_ID` varchar(255) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `GROUP_ID` int(11) NOT NULL,
  `PROJECT_NO` varchar(255) NOT NULL,
  `PROJECT_NAME` varchar(255) NOT NULL,
  `PROJECT_ROM` varchar(255) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_GROUP`
--

CREATE TABLE `PROJECT_GROUP` (
  `GROUP_ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_PEOPLE`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_STATUS`
--

CREATE TABLE `PROJECT_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_TYPE`
--

CREATE TABLE `PROJECT_TYPE` (
  `TYPE_ID` int(10) NOT NULL,
  `TYPE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `REGION`
--

CREATE TABLE `REGION` (
  `REGION_ID` int(10) NOT NULL,
  `REGION_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE`
--

CREATE TABLE `ROLE` (
  `ID` int(11) NOT NULL,
  `ROLE_NAME` varchar(255) NOT NULL,
  `COMBINATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `STAFF`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_CERTIFICATION`
--

CREATE TABLE `STAFF_CERTIFICATION` (
  `STAFF_ID` varchar(255) NOT NULL,
  `CERTIFICATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_EXPERIENCE`
--

CREATE TABLE `STAFF_EXPERIENCE` (
  `EXPERIENCE_ID` int(11) NOT NULL,
  `EXPERIENCE_LABEL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_GROUP`
--

CREATE TABLE `STAFF_GROUP` (
  `GROUP_ID` int(10) NOT NULL,
  `GROUP_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_ROLE`
--

CREATE TABLE `STAFF_ROLE` (
  `ROLE_ID` int(10) NOT NULL,
  `ROLE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_STATUS`
--

CREATE TABLE `STAFF_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `USER_ACCESS`
--

CREATE TABLE `USER_ACCESS` (
  `ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `OFFICE_ID` int(11) NOT NULL,
  `REGION_ID` int(11) NOT NULL,
  `DIVISION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ACCESS_TYPE`
--
ALTER TABLE `ACCESS_TYPE`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `ACCESS_TYPE_COMBINATION`
--
ALTER TABLE `ACCESS_TYPE_COMBINATION`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD PRIMARY KEY (`CATEGORY_ID`);

--
-- Indexes for table `CERTIFICATION_SKILLS`
--
ALTER TABLE `CERTIFICATION_SKILLS`
  ADD PRIMARY KEY (`CERTIFICATION_ID`);

--
-- Indexes for table `CUSTOMER`
--
ALTER TABLE `CUSTOMER`
  ADD PRIMARY KEY (`CUSTOMER_ID`);

--
-- Indexes for table `CUSTOMER_PROJECTS`
--
ALTER TABLE `CUSTOMER_PROJECTS`
  ADD PRIMARY KEY (`PROJECT_ID`,`CUSTOMER_ID`),
  ADD KEY `FK_CUSTOMER` (`CUSTOMER_ID`);

--
-- Indexes for table `mysql_migrations_347ertt3e`
--
ALTER TABLE `mysql_migrations_347ertt3e`
  ADD UNIQUE KEY `timestamp` (`timestamp`);

--
-- Indexes for table `OFFICE`
--
ALTER TABLE `OFFICE`
  ADD PRIMARY KEY (`OFFICE_ID`),
  ADD KEY `FK_REFERENCE_2` (`REGION_ID`);

--
-- Indexes for table `PLANNED_PROJECT_PEOPLE`
--
ALTER TABLE `PLANNED_PROJECT_PEOPLE`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `PROJECT`
--
ALTER TABLE `PROJECT`
  ADD PRIMARY KEY (`PROJECT_ID`),
  ADD KEY `PROJECT_STATUS_FK` (`PROJECT_STATUS_ID`),
  ADD KEY `PROJECT_TYPE_FK` (`PROJECT_TYPE_ID`),
  ADD KEY `FK_OFFICE` (`OFFICE_ID`),
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`),
  ADD KEY `GROUP_ID_FK` (`GROUP_ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `PROJECT_GROUP`
--
ALTER TABLE `PROJECT_GROUP`
  ADD PRIMARY KEY (`GROUP_ID`);

--
-- Indexes for table `PROJECT_PEOPLE`
--
ALTER TABLE `PROJECT_PEOPLE`
  ADD UNIQUE KEY `EMPLOYEE_ID` (`STAFF_ID`,`PROJECT_ID`),
  ADD KEY `PEOPLE_PROJECTS_FK` (`PROJECT_ID`),
  ADD KEY `PROJECT_ROLE_FK` (`PROJECT_ROLE_ID`);

--
-- Indexes for table `PROJECT_STATUS`
--
ALTER TABLE `PROJECT_STATUS`
  ADD PRIMARY KEY (`STATUS_ID`);

--
-- Indexes for table `PROJECT_TYPE`
--
ALTER TABLE `PROJECT_TYPE`
  ADD PRIMARY KEY (`TYPE_ID`);

--
-- Indexes for table `REGION`
--
ALTER TABLE `REGION`
  ADD PRIMARY KEY (`REGION_ID`);

--
-- Indexes for table `ROLE`
--
ALTER TABLE `ROLE`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `combination_id` (`COMBINATION_ID`);

--
-- Indexes for table `STAFF`
--
ALTER TABLE `STAFF`
  ADD PRIMARY KEY (`STAFF_ID`),
  ADD KEY `STAFF_ROLE_FK` (`STAFF_ROLE_ID`),
  ADD KEY `STAFF_CATEGORY_FK` (`STAFF_GROUP_ID`),
  ADD KEY `STAFF_STATUS_FK` (`STAFF_STATUS_ID`),
  ADD KEY `FK_PEOPLE_OFFICE` (`OFFICE_ID`);

--
-- Indexes for table `STAFF_CERTIFICATION`
--
ALTER TABLE `STAFF_CERTIFICATION`
  ADD PRIMARY KEY (`STAFF_ID`,`CERTIFICATION_ID`),
  ADD KEY `CERTIFICATION_ID_FK` (`CERTIFICATION_ID`);

--
-- Indexes for table `STAFF_EXPERIENCE`
--
ALTER TABLE `STAFF_EXPERIENCE`
  ADD PRIMARY KEY (`EXPERIENCE_ID`);

--
-- Indexes for table `STAFF_GROUP`
--
ALTER TABLE `STAFF_GROUP`
  ADD PRIMARY KEY (`GROUP_ID`);

--
-- Indexes for table `STAFF_ROLE`
--
ALTER TABLE `STAFF_ROLE`
  ADD PRIMARY KEY (`ROLE_ID`);

--
-- Indexes for table `STAFF_STATUS`
--
ALTER TABLE `STAFF_STATUS`
  ADD PRIMARY KEY (`STATUS_ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `role_id` (`ROLE_ID`);

--
-- Indexes for table `USER_ACCESS`
--
ALTER TABLE `USER_ACCESS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ACCESS_TYPE`
--
ALTER TABLE `ACCESS_TYPE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ACCESS_TYPE_COMBINATION`
--
ALTER TABLE `ACCESS_TYPE_COMBINATION`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CATEGORY`
--
ALTER TABLE `CATEGORY`
  MODIFY `CATEGORY_ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CERTIFICATION_SKILLS`
--
ALTER TABLE `CERTIFICATION_SKILLS`
  MODIFY `CERTIFICATION_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PLANNED_PROJECT_PEOPLE`
--
ALTER TABLE `PLANNED_PROJECT_PEOPLE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PROJECT_GROUP`
--
ALTER TABLE `PROJECT_GROUP`
  MODIFY `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ROLE`
--
ALTER TABLE `ROLE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `STAFF_EXPERIENCE`
--
ALTER TABLE `STAFF_EXPERIENCE`
  MODIFY `EXPERIENCE_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USER_ACCESS`
--
ALTER TABLE `USER_ACCESS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CUSTOMER_PROJECTS`
--
ALTER TABLE `CUSTOMER_PROJECTS`
  ADD CONSTRAINT `FK_CUSTOMER` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER` (`CUSTOMER_ID`),
  ADD CONSTRAINT `FK_REFERENCE_1` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`);

--
-- Constraints for table `OFFICE`
--
ALTER TABLE `OFFICE`
  ADD CONSTRAINT `FK_REFERENCE_2` FOREIGN KEY (`REGION_ID`) REFERENCES `REGION` (`REGION_ID`);

--
-- Constraints for table `PROJECT`
--
ALTER TABLE `PROJECT`
  ADD CONSTRAINT `FK_OFFICE` FOREIGN KEY (`OFFICE_ID`) REFERENCES `OFFICE` (`OFFICE_ID`),
  ADD CONSTRAINT `GROUP_ID_FK` FOREIGN KEY (`GROUP_ID`) REFERENCES `PROJECT_GROUP` (`GROUP_ID`),
  ADD CONSTRAINT `PROJECT_STATUS_FK` FOREIGN KEY (`PROJECT_STATUS_ID`) REFERENCES `PROJECT_STATUS` (`STATUS_ID`),
  ADD CONSTRAINT `PROJECT_TYPE_FK` FOREIGN KEY (`PROJECT_TYPE_ID`) REFERENCES `PROJECT_TYPE` (`TYPE_ID`),
  ADD CONSTRAINT `PROJECT_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `CATEGORY` (`CATEGORY_ID`);

--
-- Constraints for table `PROJECT_PEOPLE`
--
ALTER TABLE `PROJECT_PEOPLE`
  ADD CONSTRAINT `PEOPLE_PROJECTS_FK` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`PROJECT_ID`),
  ADD CONSTRAINT `PROJECT_ROLE_FK` FOREIGN KEY (`PROJECT_ROLE_ID`) REFERENCES `STAFF_ROLE` (`ROLE_ID`),
  ADD CONSTRAINT `STAFF_FK` FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`);

--
-- Constraints for table `ROLE`
--
ALTER TABLE `ROLE`
  ADD CONSTRAINT `COMBINATION_ID` FOREIGN KEY (`COMBINATION_ID`) REFERENCES `ACCESS_TYPE_COMBINATION` (`ID`);

--
-- Constraints for table `STAFF`
--
ALTER TABLE `STAFF`
  ADD CONSTRAINT `FK_PEOPLE_OFFICE` FOREIGN KEY (`OFFICE_ID`) REFERENCES `OFFICE` (`OFFICE_ID`),
  ADD CONSTRAINT `STAFF_CATEGORY_FK` FOREIGN KEY (`STAFF_GROUP_ID`) REFERENCES `STAFF_GROUP` (`GROUP_ID`),
  ADD CONSTRAINT `STAFF_ROLE_FK` FOREIGN KEY (`STAFF_ROLE_ID`) REFERENCES `STAFF_ROLE` (`ROLE_ID`),
  ADD CONSTRAINT `STAFF_STATUS_FK` FOREIGN KEY (`STAFF_STATUS_ID`) REFERENCES `STAFF_STATUS` (`STATUS_ID`);

--
-- Constraints for table `STAFF_CERTIFICATION`
--
ALTER TABLE `STAFF_CERTIFICATION`
  ADD CONSTRAINT `CERTIFICATION_ID_FK` FOREIGN KEY (`CERTIFICATION_ID`) REFERENCES `CERTIFICATION_SKILLS` (`CERTIFICATION_ID`),
  ADD CONSTRAINT `STAFF_ID_FK` FOREIGN KEY (`STAFF_ID`) REFERENCES `STAFF` (`STAFF_ID`);

--
-- Constraints for table `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `role_id` FOREIGN KEY (`ROLE_ID`) REFERENCES `ROLE` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
