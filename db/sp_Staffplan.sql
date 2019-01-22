-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2018 at 02:41 PM
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
-- Database: `sp_staffplan`
--

-- --------------------------------------------------------

--
-- Table structure for table `ACCESS_TYPE`
--

CREATE TABLE `ACCESS_TYPE` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ACCESS_TYPE`
--

INSERT INTO `ACCESS_TYPE` (`ID`, `TYPE`) VALUES
(1, 'View'),
(2, 'Edit'),
(3, 'Delete'),
(4, 'Add'),
(5, 'Add Staff'),
(6, 'Add Project'),
(7, 'Edit Project'),
(8, 'Edit Staff'),
(9, 'Delete Staff'),
(10, 'Delete Project');

-- --------------------------------------------------------

--
-- Table structure for table `ACCESS_TYPE_COMBINATION`
--

CREATE TABLE `ACCESS_TYPE_COMBINATION` (
  `ID` int(11) NOT NULL,
  `COMBINATION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ACCESS_TYPE_COMBINATION`
--

INSERT INTO `ACCESS_TYPE_COMBINATION` (`ID`, `COMBINATION`) VALUES
(1, '[1,2]'),
(3, '[2,3,4,1,6]');

-- --------------------------------------------------------

--
-- Table structure for table `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `CATEGORY_ID` int(10) NOT NULL,
  `CATEGORY_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CATEGORY`
--

INSERT INTO `CATEGORY` (`CATEGORY_ID`, `CATEGORY_NAME`) VALUES
(1, 'Healthcare'),
(2, 'Retail'),
(3, 'Technology'),
(4, 'Education'),
(5, 'Life Science'),
(6, 'Self Perform'),
(7, 'Sports Venues'),
(8, 'Semi Conductor'),
(9, 'Manufacturing & Supply Chain'),
(10, 'Mission Critical'),
(11, 'Hospitality'),
(12, 'Cultural/Historic'),
(13, 'Entertainment');

-- --------------------------------------------------------

--
-- Table structure for table `CERTIFICATION_SKILLS`
--

CREATE TABLE `CERTIFICATION_SKILLS` (
  `CERTIFICATION_ID` int(11) NOT NULL,
  `CERTIFICATION_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CERTIFICATION_SKILLS`
--

INSERT INTO `CERTIFICATION_SKILLS` (`CERTIFICATION_ID`, `CERTIFICATION_NAME`) VALUES
(1, 'Title 24'),
(2, 'OSHPD'),
(3, 'PMI Certification'),
(4, 'LEED'),
(5, 'OSHA'),
(6, 'asa'),
(7, 'vvvv');

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

--
-- Dumping data for table `CUSTOMER`
--

INSERT INTO `CUSTOMER` (`CUSTOMER_ID`, `CUSTOMER_NAME`, `CUSTOMER_ADDRESS`, `CUSTOMER_CITY`, `CUSTOMER_STATE`, `CUSTOMER_ZIP`, `CUSTOMER_CONTACT`, `CONTACT_PHONE`) VALUES
('CID_001', 'Big Construction & Co', '200, 46th St', 'Washington', 'DC', '20012', 'John Smith', '212-444-5555'),
('CID_002', 'All Builders Inc', '4, Bond St', 'New York', 'NY', '11011', 'Jim Bob', '404-111-2222'),
('CID_003', 'Asheville Medical Center', NULL, NULL, NULL, NULL, 'Jason Hendricks', NULL),
('CID_004', 'Alexandria General Hospital', NULL, NULL, NULL, NULL, 'Hedda Herring', NULL),
('CID_005', 'Techno Data Systems', NULL, NULL, NULL, NULL, 'Jada Maldonado', NULL),
('CID_006', 'Apricot Development Companies', NULL, NULL, NULL, NULL, 'August McLeod', NULL),
('CID_007', 'British Telecom', NULL, NULL, NULL, NULL, 'Prescott Jacobson', NULL),
('CID_008', 'Digital Broadcast', NULL, NULL, NULL, NULL, 'Shelly Hahn', NULL),
('CID_009', 'Technology Virtual Center', NULL, NULL, NULL, NULL, 'Wade Burnett', NULL),
('CID_010', 'Ops Technology', NULL, NULL, NULL, NULL, 'Emery Shannon', NULL),
('CID_011', 'Rufus Companies', NULL, NULL, NULL, NULL, 'Candice McCall', NULL),
('CID_012', 'Equinox', NULL, NULL, NULL, NULL, 'Anthony Owen', NULL),
('CID_013', 'Northhampton Companies', NULL, NULL, NULL, NULL, 'Tate Edwards', NULL),
('CID_014', 'Quint Health Center', NULL, NULL, NULL, NULL, 'Calvin Ewing', NULL),
('CID_015', 'Wolfe Health Medical Center', NULL, NULL, NULL, NULL, 'Brady Sharpe', NULL),
('CID_016', 'Velocity 5 ', NULL, NULL, NULL, NULL, 'Lionel Henson', NULL),
('CID_017', 'Ocean Hills Development Co', NULL, NULL, NULL, NULL, 'Clayton Osborne', NULL),
('CID_018', 'MedLife Science ', NULL, NULL, NULL, NULL, 'Rogan Irwin', NULL),
('CID_019', 'Communication 100', NULL, NULL, NULL, NULL, 'Alexa Sweeney', NULL),
('CID_020', 'Charleston Regional Hospital', NULL, NULL, NULL, NULL, 'Burke Nieves', NULL),
('CID_021', 'Georgetown Medical Center', NULL, NULL, NULL, NULL, 'Nathan Bell', NULL),
('CID_022', 'Open Plaza', NULL, NULL, NULL, NULL, 'Kay Jarvis', NULL),
('CID_023', 'Wunderlist Technology Center', NULL, NULL, NULL, NULL, 'Sherman Griffith', NULL),
('CID_024', 'QZ Inc', NULL, NULL, NULL, NULL, 'Shelby Schwartz', NULL),
('CID_025', 'Omni Inc', NULL, NULL, NULL, NULL, 'Kim Baxter', NULL),
('CID_026', 'Maryland Regional Health Care', NULL, NULL, NULL, NULL, 'Tucker Moreno', NULL),
('CID_027', 'TechOps Inc', NULL, NULL, NULL, NULL, 'Alan Boyle', NULL),
('CID_028', 'High Street Corp ', NULL, NULL, NULL, NULL, 'Regina Pierce', NULL),
('CID_029', 'All Sciences Inc', NULL, NULL, NULL, NULL, 'Matthew Spence', NULL),
('CID_030', 'Georgetown Medical Center', NULL, NULL, NULL, NULL, 'Dale Henry', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMER_PROJECTS`
--

CREATE TABLE `CUSTOMER_PROJECTS` (
  `PROJECT_ID` varchar(255) NOT NULL,
  `CUSTOMER_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CUSTOMER_PROJECTS`
--

INSERT INTO `CUSTOMER_PROJECTS` (`PROJECT_ID`, `CUSTOMER_ID`) VALUES
('PID_001', 'CID_002'),
('PID_002', 'CID_002'),
('PID_003', 'CID_001'),
('PID_004', 'CID_002'),
('PID_005', 'CID_001'),
('PID_006', 'CID_002'),
('PID_007', 'CID_001'),
('PID_008', 'CID_002'),
('PID_009', 'CID_001'),
('PID_010', 'CID_001');

-- --------------------------------------------------------

--
-- Table structure for table `mysql_migrations_347ertt3e`
--

CREATE TABLE `mysql_migrations_347ertt3e` (
  `timestamp` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mysql_migrations_347ertt3e`
--

INSERT INTO `mysql_migrations_347ertt3e` (`timestamp`) VALUES
('1543224641779'),
('1543224648233'),
('1543224656327'),
('1543229601370'),
('1543229935101'),
('1543235545263');

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

--
-- Dumping data for table `OFFICE`
--

INSERT INTO `OFFICE` (`OFFICE_ID`, `OFFICE_NAME`, `OFFICE_ADDRESS`, `OFFICE_CITY`, `OFFICE_STATE`, `OFFICE_ZIP`, `OFFICE_TYPE`, `REGION_ID`) VALUES
('OID_001', 'Baltimore', '2433  Hickory Heights Drive', 'Baltimore', 'MD', '21201', 'Branch', 1),
('OID_002', 'New York', '580  Forest Avenue', 'New York', 'NY', '10013', 'Main Office', 1),
('OID_003', 'Washington DC', '1791  Gold Cliff Circle', 'Washington DC', 'DC', '20016', 'Branch', 1),
('OID_004', 'Boston', '4044  Stadium Drive', 'Boston', 'MA', '02110', 'Branch', 1),
('OID_005', 'Chicago', '4100  Federal Road', 'Chicago', 'IL', '60631', 'Branch', 3),
('OID_006', 'Madison', '675  Comfort Court', 'Madison', 'WI', '53718', 'Branch', 3),
('OID_007', 'Los Angeles', '1834  Woodstock Drive', 'Los Angeles', 'CA', '90014', 'Branch', 6),
('OID_008', 'Seattle', '3136  Raccoon Run', 'Seattle', 'WA', '98101', 'Branch', 5),
('OID_009', 'Atlanta', '2487  Stroop Hill Road', 'Atlanta', 'GA', '30303', 'Branch', 2),
('OID_010', 'Detroit', '3483  State Street', 'Detroit', 'MI', '48213', 'Branch', 3),
('OID_011', 'Raleigh', '747  Johnson Street', 'Raleigh', 'NC', '27604', 'Branch', 2),
('OID_012', 'Philadelphia', '3045  Young Road', 'Philadelphia', 'PA', '19144', 'Branch', 1),
('OID_013', 'Miami', '4246  Ridenour Street', 'Miami', 'FL', '33169', 'Branch', 2),
('OID_014', 'Minneapolis', '45, 5th Street', 'Minneapolis', 'MN', '55425', 'Branch', 3);

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

--
-- Dumping data for table `PLANNED_PROJECT_PEOPLE`
--

INSERT INTO `PLANNED_PROJECT_PEOPLE` (`ID`, `PROJECT_ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`) VALUES
(45, 'PID_001', '2018-08-31', '2018-08-31', 45.00, 9, NULL, 1, NULL, '0'),
(46, 'PID_001', '2018-08-31', '2018-08-31', 5.00, 9, NULL, 1, NULL, '1'),
(48, 'PID_001', '2018-09-03', '2018-09-03', 100.00, 3, NULL, 1, NULL, '0'),
(49, 'PID_001', '2018-09-02', '2018-09-28', 100.00, 10, NULL, 1, NULL, '0'),
(50, 'PID_001', '2018-09-01', '2018-09-24', 100.00, 4, NULL, 1, NULL, '1'),
(66, 'PID_024', '2018-02-17', '2019-02-01', 100.00, 2, NULL, 1, NULL, '1'),
(67, 'PID_049', '2018-11-01', '2018-11-27', 100.00, 1, NULL, NULL, NULL, '0'),
(68, 'PID_049', '2018-11-01', '2018-11-01', 100.00, 3, NULL, 1, NULL, '1'),
(69, 'PID_050', '2018-11-01', '2018-11-30', 100.00, 4, NULL, 1, NULL, '1'),
(70, 'PID_050', '2018-11-01', '2018-11-30', 100.00, 1, NULL, 1, NULL, '1'),
(71, 'PID_001', '2018-11-01', '2018-11-01', 100.00, 2, NULL, NULL, NULL, '0');

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT`
--

CREATE TABLE `PROJECT` (
  `PROJECT_ID` varchar(255) NOT NULL,
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

--
-- Dumping data for table `PROJECT`
--

INSERT INTO `PROJECT` (`PROJECT_ID`, `GROUP_ID`, `PROJECT_NO`, `PROJECT_NAME`, `PROJECT_ROM`, `PROJECT_ADDRESS`, `PROJECT_CITY`, `PROJECT_STATE`, `PROJECT_ZIP`, `START_DATE`, `END_DATE`, `PROJECT_DURATION`, `PROJECT_STATUS_ID`, `PROJECT_TYPE_ID`, `OFFICE_ID`, `CATEGORY_ID`, `PROJECT_DESCRIPTION`, `TIMELINE_TYPE`) VALUES
('PID_001', 1, 'SP000001', 'Al Maktoum Airport ', '0', NULL, NULL, NULL, NULL, '2018-09-02', '2018-09-29', NULL, 3, 1, 'OID_014', 4, '', '2'),
('PID_002', 2, 'SP000009', 'Blue Postal', '0', NULL, NULL, NULL, NULL, '2018-09-01', '2019-08-21', NULL, 2, 2, 'OID_007', 4, '', '1'),
('PID_003', 1, 'SP000002', 'Dusty Storm', '0', NULL, NULL, NULL, NULL, '2018-07-01', '2018-12-31', NULL, 2, 2, 'OID_006', 2, '', '1'),
('PID_004', 1, 'SP000003', 'Summer Liquid', '0', NULL, NULL, NULL, NULL, '2018-09-01', '2021-08-31', NULL, 2, 1, 'OID_007', 2, '', '2'),
('PID_005', 1, 'SP000004', 'Next Ivory', '', '67, Park Ave', 'New York', 'NY', '11001', '2018-09-01', '2020-08-31', NULL, 2, 3, 'OID_004', 1, '', '1'),
('PID_006', 1, 'SP000005', 'Lobster Black', '0', NULL, NULL, NULL, NULL, '2019-01-01', '2019-06-30', NULL, 1, 1, 'OID_003', 5, '', '1'),
('PID_007', 2, 'SP000010', 'Intensive Snake', '', '44, Blue Bay', 'Leominster', 'MA', '08765', '2019-01-01', '2019-12-31', NULL, 1, 2, 'OID_001', 5, '', '1'),
('PID_008', 2, 'SP000011', 'Official Platinum', '0', NULL, NULL, NULL, NULL, '2019-09-01', '2020-08-31', NULL, 2, 3, 'OID_008', 2, '', '1'),
('PID_009', 1, 'SP000006', 'Dubailand', '21', NULL, NULL, NULL, NULL, '2018-08-07', '2018-08-08', NULL, 3, 4, 'OID_005', 2, NULL, '1'),
('PID_010', 1, 'SP000007', 'Worthy Warehouse', '25', NULL, NULL, NULL, NULL, '2018-06-04', '2020-08-29', NULL, 5, 3, 'OID_007', 3, '', '1'),
('PID_020', 1, 'SP000014', 'Ashville Regional Medical Center', '$17.3M', '34 North St', 'Arlington', 'VA', '20330', '2017-08-08', '2020-08-30', NULL, 4, 1, 'OID_004', 8, '', '1'),
('PID_021', 1, 'SP000015', 'General Hospital Center - Suite 100', '$21.3M', '44 Lake St', 'Alexandria', 'VA', '2206', '2018-03-01', '2018-11-15', NULL, 4, 1, 'OID_006', 8, '', '1'),
('PID_022', 1, 'SP000016', 'Tech Data Center - East Center', '$12.7M', '4312 Pennsylvania Ave', 'Bethesda', 'MD', '20810', '2018-07-01', '2019-08-15', NULL, 4, 2, 'OID_008', 1, '', '1'),
('PID_023', 1, 'SP000017', 'Apricot West Suites 110 &amp; 210', '$8.1M', '45 5th Avenue', 'Fredrick', 'MD', '21701', '2018-02-02', '2018-12-30', NULL, 4, 3, 'OID_008', 1, '', '1'),
('PID_024', 1, 'SP000018qweqwe', 'BT Data Center 2201', '$8.0M', '67 Park Ave', 'Gaithesburg', 'MD', '20697', '2018-02-17', '2019-02-01', NULL, 4, 1, 'OID_009', 1, '', '1'),
('PID_025', 1, 'SP000019', 'Broadcast Data Center', '$8.0M', '99 West St', 'Reston', 'VA', '20170', '2018-06-01', '2018-12-01', NULL, 4, 2, 'OID_008', 1, '', '1'),
('PID_026', 1, 'SP000020', 'Tech Virtual Ware - Project Mountain', '$16.8M', '44 Blue Bay', 'Rockville', 'MD', '20847', '2018-01-01', '2018-12-31', NULL, 4, 1, 'OID_007', 1, '', '1'),
('PID_027', 1, 'SP000021', 'Operation Data Center', '$9.3M', '1000 1st Street', 'Silver Spring', 'MD', '20815', '2018-04-15', '2018-12-31', NULL, 4, 1, 'OID_005', 1, '', '1'),
('PID_028', 1, 'SP000022', 'Rufus Data Center', '$12.7M', '45 Michigan Ave', 'Arlington', 'VA', '20330', '2018-01-05', '2019-03-15', NULL, 4, 2, 'OID_013', 1, '', '1'),
('PID_029', 1, 'SP000023', 'Equinox Data Center', '$9.0M', '44 Broad St', 'Alexandria', 'VA', '2206', '2018-05-01', '2018-12-15', NULL, 4, 3, 'OID_007', 1, '', '1'),
('PID_030', 1, 'SP000024', 'Northhampton Data Center', '$8.7M', '34 North St', 'Bethesda', 'MD', '20810', '2018-11-17', '2019-11-01', NULL, 4, 1, 'OID_014', 1, '', '1'),
('PID_031', 1, 'SP000025', 'Quint Health Center', '$16.8M', '44 Lake St', 'Fredrick', 'MD', '21701', '2018-07-22', '2018-09-30', NULL, 4, 1, 'OID_013', 8, '', '1'),
('PID_032', 1, 'SP000026', 'Wolfe Health Data Center', '$7.8M', '4312 Pennsylvania Ave', 'Gaithesburg', 'MD', '20697', '2017-02-24', '2018-09-30', NULL, 4, 3, 'OID_001', 8, '', '1'),
('PID_033', 1, 'SP000027', 'Velocity 5 - WV Project', '$3.0M', '45 5th Avenue', 'Reston', 'VA', '20170', '2017-04-15', '2018-11-01', NULL, 4, 2, 'OID_009', 1, '', '1'),
('PID_034', 1, 'SP000028', 'Ocean City Hills - Tenant Interiors', '$9.3M', '67 Park Ave', 'Rockville', 'MD', '20847', '2017-12-01', '2019-01-21', NULL, 4, 2, 'OID_011', 8, '', '1'),
('PID_035', 1, 'SP000029', 'MedLife Science Data Center', '$34.4M', '99 West St', 'Silver Spring', 'MD', '20815', '2017-04-07', '2019-06-01', NULL, 4, 3, 'OID_013', 3, '', '1'),
('PID_036', 1, 'SP000030', 'Communication 100', '$16.1M', '44 Blue Bay', 'Arlington', 'VA', '20330', '2017-10-07', '2019-09-01', NULL, 4, 1, 'OID_005', 1, '', '1'),
('PID_037', 1, 'SP000031', 'Charleston Regional Hospital', '$3.0M', '1000 1st Street', 'Alexandria', 'VA', '2206', '2018-04-21', '2019-03-31', NULL, 4, 1, 'OID_011', 8, '', '1'),
('PID_038', 1, 'SP000032', 'Georgetown Med Center TI', '$3.0M', '45 Michigan Ave', 'Bethesda', 'MD', '20810', '2017-08-21', '2018-10-31', NULL, 4, 2, 'OID_008', 8, '', '1'),
('PID_039', 1, 'SP000033', 'Open Plaza', '$8.0M', '44 Broad St', 'Fredrick', 'MD', '21701', '2018-01-01', '2019-12-01', NULL, 4, 1, 'OID_010', 5, '', '1'),
('PID_040', 1, 'SP000034', 'Wunderlist Technology Center', '$7.0M', '34 North St', 'Gaithesburg', 'MD', '20697', '2018-05-01', '2018-12-31', NULL, 4, 3, 'OID_010', 1, '', '1'),
('PID_041', 1, 'SP000035', 'QZ Data Center', '$8.0M', '44 Lake St', 'Reston', 'VA', '20170', '2018-05-01', '2018-12-01', NULL, 4, 3, 'OID_011', 1, '', '1'),
('PID_042', 1, 'SP000036', 'Omni Data Center', '$92.3M', '4312 Pennsylvania Ave', 'Rockville', 'MD', '20847', '2017-11-01', '2019-12-31', NULL, 4, 1, 'OID_007', 1, '', '1'),
('PID_043', 1, 'SP000037', 'Regional ER - OR Remodel', '$29.6M', '45 5th Avenue', 'Silver Spring', 'MD', '20815', '2017-05-19', '2018-12-19', NULL, 4, 1, 'OID_006', 8, '', '1'),
('PID_044', 1, 'SP000038', 'TechOps Center', '$9.0M', '67 Park Ave', 'Arlington', 'VA', '20330', '2018-12-01', '2019-12-01', NULL, 3, 2, 'OID_005', 1, '', '1'),
('PID_045', 1, 'SP000039', 'High Street Corp Campus', '$14.0M', '99 West St', 'Alexandria', 'VA', '2206', '2019-02-01', '2020-10-15', NULL, 3, 1, NULL, 5, '', '1'),
('PID_046', 1, 'SP000040', 'All Sciences Technology Center', '$58.0M', '44 Blue Bay', 'Bethesda', 'MD', '20810', '2019-02-01', '2020-10-01', NULL, 3, 1, NULL, 1, '', '1'),
('PID_047', 1, 'SP000041', 'Georgetown Urgent Care', '$100.0M', '1000 1st Street', 'Fredrick', 'MD', '21701', '2019-03-15', '2021-12-31', NULL, 3, 4, NULL, 3, '', '1');

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_GROUP`
--

CREATE TABLE `PROJECT_GROUP` (
  `GROUP_ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PROJECT_GROUP`
--

INSERT INTO `PROJECT_GROUP` (`GROUP_ID`, `GROUP_NAME`) VALUES
(1, 'Operation'),
(2, 'SPW');

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

--
-- Dumping data for table `PROJECT_PEOPLE`
--

INSERT INTO `PROJECT_PEOPLE` (`STAFF_ID`, `PROJECT_ID`, `START_DATE`, `END_DATE`, `ALLOCATION`, `PROJECT_ROLE_ID`, `ASSIGNMENT_DURATION`, `CONFIRMED`, `NEXT_AVAILABLE`, `RESUME_SUBMITTED`, `EXPERIENCE_ID`) VALUES
('EID_018', 'PID_004', '2018-08-19', '2018-12-31', 25.00, 10, NULL, NULL, NULL, '0', '[4]'),
('EID_002', 'PID_002', '2018-08-28', '2018-08-29', 100.00, 2, NULL, NULL, NULL, '0', 'undefined'),
('EID_002', 'PID_001', '2018-08-28', '2018-08-29', 100.00, 1, NULL, NULL, NULL, '0', ''),
('EID_004', 'PID_005', '2018-08-28', '2018-08-31', 100.00, 4, NULL, NULL, NULL, '0', ''),
('EID_001', 'PID_005', '2018-09-02', '2018-12-31', 90.00, 1, NULL, NULL, NULL, '1', ''),
('EID_008', 'PID_001', '2018-09-01', '2018-12-31', 45.00, 1, NULL, '1', NULL, '1', ''),
('EID_008', 'PID_002', '2018-09-02', '2018-12-31', 58.00, 1, NULL, '2', NULL, '0', ''),
('EID_008', 'PID_003', '2018-09-01', '2018-12-31', 45.00, 1, NULL, '1', NULL, '1', ''),
('EID_002', 'PID_008', '2018-09-02', '2019-03-18', 60.00, 1, NULL, '1', NULL, '0', ''),
('EID_016', 'PID_003', '2018-09-03', '2018-09-03', 100.00, 7, NULL, NULL, NULL, '0', 'undefined'),
('EID_001', 'PID_001', '2018-09-11', '2018-09-30', 100.00, 1, NULL, NULL, NULL, '0', 'undefined'),
('EID_025', 'PID_004', '2018-09-10', '2018-09-10', 100.00, 7, NULL, NULL, NULL, '0', '[7,5]'),
('EID_004', 'PID_006', '2018-09-10', '2018-09-10', 100.00, 4, NULL, NULL, NULL, '0', NULL),
('EID_018', 'PID_006', '2018-09-10', '2018-09-10', 100.00, 9, NULL, NULL, NULL, '0', '[2]'),
('EID_002', 'PID_006', '2019-01-20', '2019-09-23', 100.00, 2, NULL, '1', NULL, '0', NULL),
('EID_031', 'PID_002', '2018-09-14', '2018-09-14', 100.00, 6, NULL, NULL, NULL, '0', NULL),
('EID_002', 'PID_045', '2018-11-01', '2018-11-01', 100.00, 2, NULL, '1', NULL, '0', NULL),
('EID_002', 'PID_009', '2018-11-01', '2018-11-30', 100.00, 2, NULL, '1', NULL, '0', NULL),
('EID_002', 'PID_047', '2018-11-03', '2018-12-11', 100.00, 2, NULL, '1', NULL, '0', NULL),
('EID_003', 'PID_001', '2018-11-01', '2018-11-01', 100.00, 3, NULL, NULL, NULL, '0', NULL),
('EID_022', 'PID_003', '2018-09-02', '2018-12-31', 59.00, 1, NULL, NULL, NULL, '0', NULL),
('EID_080', 'PID_004', '2018-11-15', '2018-11-15', 100.00, 7, NULL, '1', NULL, '0', NULL),
('EID_027', 'PID_001', '2017-11-28', '2018-11-27', 89.00, 2, NULL, '1', NULL, '0', NULL),
('EID_027', 'PID_046', '2018-10-01', '2018-11-30', 100.00, 2, NULL, '1', NULL, '0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_STATUS`
--

CREATE TABLE `PROJECT_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PROJECT_STATUS`
--

INSERT INTO `PROJECT_STATUS` (`STATUS_ID`, `STATUS_NAME`) VALUES
(1, 'Proposal'),
(2, 'Initiated'),
(3, 'In-Progress'),
(4, 'Completed'),
(5, 'Closed');

-- --------------------------------------------------------

--
-- Table structure for table `PROJECT_TYPE`
--

CREATE TABLE `PROJECT_TYPE` (
  `TYPE_ID` int(10) NOT NULL,
  `TYPE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PROJECT_TYPE`
--

INSERT INTO `PROJECT_TYPE` (`TYPE_ID`, `TYPE_NAME`) VALUES
(1, 'Multi-Story Office Building'),
(2, 'Retail Space'),
(3, 'Warehouse'),
(4, 'Commercial Comples');

-- --------------------------------------------------------

--
-- Table structure for table `REGION`
--

CREATE TABLE `REGION` (
  `REGION_ID` int(10) NOT NULL,
  `REGION_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `REGION`
--

INSERT INTO `REGION` (`REGION_ID`, `REGION_NAME`) VALUES
(1, 'North East'),
(2, 'Sourh East'),
(3, 'Mid West'),
(4, 'South'),
(5, 'North West'),
(6, 'West'),
(7, 'South West');

-- --------------------------------------------------------

--
-- Table structure for table `ROLE`
--

CREATE TABLE `ROLE` (
  `ID` int(11) NOT NULL,
  `ROLE_NAME` varchar(255) NOT NULL,
  `COMBINATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ROLE`
--

INSERT INTO `ROLE` (`ID`, `ROLE_NAME`, `COMBINATION_ID`) VALUES
(1, 'C-Level', 1),
(2, 'A-Level', 1);

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

--
-- Dumping data for table `STAFF`
--

INSERT INTO `STAFF` (`STAFF_ID`, `FIRST_NAME`, `MIDDLE_INITIAL`, `LAST_NAME`, `PREFERRED_NAME`, `EMAIL_ID`, `PHONE_1`, `PHONE_1_TYPE`, `PHONE_2`, `PHONE_2_TYPE`, `HOME_CITY`, `HOME_STATE`, `HOME_ZIP`, `STAFF_CERTIFICATION`, `STAFF_TRAINING`, `STAFF_PHOTO`, `STAFF_ROLE_ID`, `STAFF_GROUP_ID`, `STAFF_STATUS_ID`, `OFFICE_ID`, `EMPLOYMENT_START_DATE`) VALUES
('EID_001', 'Dan ', 'A', ' Erickson', 'Dan ', 'Dan.Erickson@justwoko.com', '(404)375-2626', 'Cell', '(267)569-4849', 'Home', 'Mundelein', 'IL', '60060', 'N', 'N', 'None', 1, 2, 1, 'OID_005', '2015-09-01'),
('EID_002', 'Ryan ', 'B', ' Banks', 'Ryan ', 'Ryan.Banks@justwoko.com', '(573)685-5726', 'Cell', '(425)361-2197', 'Home', 'Hummelstown', 'PA', '17036', 'N', 'N', 'None', 2, 1, 1, 'OID_012', '2016-08-01'),
('EID_003', 'Horace ', 'C', ' Munoz', 'Horace ', 'Horace.Munoz@justwoko.com', '(684)733-9201', 'Cell', '(475)328-3446', 'Home', 'Glenview', 'IL', '60025', 'N', 'N', 'None', 3, 1, 1, 'OID_005', '2015-01-01'),
('EID_004', 'Nelson ', 'D', ' Davis', 'Nelson ', 'Nelson.Davis@justwoko.com', '(667)305-8506', 'Cell', '(432)620-8914', 'Home', 'West Palm Beach', 'FL', '33404', 'N', 'N', 'None', 4, 1, 1, 'OID_013', '2015-02-12'),
('EID_005', 'Lynn ', 'E', ' Harrison', 'Lynn ', 'Lynn.Harrison@justwoko.com', '(469)552-9299', 'Cell', '(504)444-1710', 'Home', 'Menasha', 'WI', '54952', 'N', 'N', 'None', 5, 1, 1, 'OID_006', '2015-12-20'),
('EID_006', 'Lorenzo ', 'F', ' West', 'Lorenzo ', 'Lorenzo.West@justwoko.com', '(515)542-4733', 'Cell', '(337)566-8769', 'Home', 'Brookline', 'MA', '2446', 'N', 'N', 'None', 6, 1, 2, 'OID_004', '2016-12-13'),
('EID_007', 'Stanley ', 'G', ' Waters', 'Stan', 'Stanley.Waters@justwoko.com', '(803)821-4848', 'Cell', '(657)464-5347', 'Home', 'Hudson', 'NH', '3051', 'N', 'N', 'None', 7, 1, 1, 'OID_004', '2013-12-10'),
('EID_008', 'May ', 'H', ' Baker', 'May ', 'May.Baker@justwoko.com', '(206)533-6136', 'Cell', '(508)582-7802', 'Home', 'Falls Church', 'VA', '22041', 'N', 'N', 'None', 8, 1, 1, 'OID_003', '2015-10-12'),
('EID_009', 'Abel ', 'I', ' Marsh', 'Abel ', 'Abel.Marsh@justwoko.com', '(832)419-2967', 'Cell', '(612)666-7647', 'Home', 'Battle Ground', 'WA', '98604', 'N', 'N', 'None', 8, 1, 1, 'OID_008', '2015-12-10'),
('EID_010', 'Everett ', 'J', ' Barber', 'Eve', 'Everett.Barber@justwoko.com', '(670)484-6999', 'Cell', '(361)937-2474', 'Home', 'West Bend', 'WI', '53095', 'N', 'N', 'None', 1, 1, 1, 'OID_006', '2016-12-21'),
('EID_011', 'Edna ', 'K', ' Webster', 'Edna ', 'Edna.Webster@justwoko.com', '(669)900-9273', 'Cell', '(502)449-6039', 'Home', 'Roslindale', 'MA', '2131', 'N', 'N', 'None', 2, 1, 1, 'OID_004', '2015-10-12'),
('EID_012', 'Jacqueline ', 'L', ' Reyes', 'Jac', 'Jacqueline.Reyes@justwoko.com', '(424)284-3874', 'Cell', '(343)333-9077', 'Home', 'Rolling Meadows', 'IL', '60008', 'N', 'N', 'None', 3, 1, 1, 'OID_005', '2012-12-12'),
('EID_013', 'Naomi ', 'M', ' Ingram', 'Naomi ', 'Naomi.Ingram@justwoko.com', '(609)456-4456', 'Cell', '(310)843-8052', 'Home', 'Great Falls', 'MT', '59404', 'N', 'N', 'None', 4, 1, 1, 'OID_014', '2016-01-02'),
('EID_014', 'Nathaniel ', 'N', ' Zimmerman', 'Nate', 'Nathaniel.Zimmerman@justwoko.com', '(570)960-1669', 'Cell', '(219)757-2610', 'Home', 'Carpentersville', 'IL', '60110', 'N', 'N', 'None', 5, 1, 1, 'OID_005', '2017-02-03'),
('EID_015', 'Patsy ', 'O', ' Sutton', 'Patsy ', 'Patsy.Sutton@justwoko.com', '(423)262-2764', 'Cell', '(660)671-8137', 'Home', 'Yuba City', 'CA', '95993', 'N', 'N', 'None', 6, 1, 1, 'OID_007', '2014-02-03'),
('EID_016', 'Salvador ', 'P', ' Logan', 'Sall', 'Salvador.Logan@justwoko.com', '(712)294-8752', 'Cell', '(412)563-1240', 'Home', 'Massapequa', 'NY', '11758', 'N', 'N', 'None', 7, 1, 1, 'OID_012', '2016-02-02'),
('EID_017', 'Gerard ', 'Q', ' Simpson', 'Gerard ', 'Gerard.Simpson@justwoko.com', '(385)335-6237', 'Cell', '(305)352-9137', 'Home', 'Bellmore', 'NY', '11710', 'N', 'N', 'None', 8, 1, 1, 'OID_002', '2015-06-08'),
('EID_018', 'Darla ', 'R', ' Andrews', 'Darla ', 'Darla.Andrews@justwoko.com', '(401)637-3347', 'Cell', '(260)475-7695', 'Home', 'Newnan', 'GA', '30263', 'N', 'N', 'None', 9, 1, 1, 'OID_009', '2016-08-09'),
('EID_019', 'Susie ', 'S', ' Lewis', 'Susie ', 'Susie.Lewis@justwoko.com', '(435)817-3250', 'Cell', '(269)335-6766', 'Home', 'East Elmhurst', 'NY', '11369', 'N', 'N', 'None', 1, 1, 1, 'OID_002', '2017-08-09'),
('EID_020', 'Toni ', 'T', ' Robinson', 'Toni ', 'Toni.Robinson@justwoko.com', '(225)200-1041', 'Cell', '(520)444-7670', 'Home', 'Arlington', 'MA', '2474', 'N', 'N', 'None', 2, 1, 1, 'OID_004', '2017-08-06'),
('EID_021', 'Kenneth ', 'U', ' Lyons', 'Ken', 'Kenneth.Lyons@justwoko.com', '(269)641-7312', 'Cell', '(602)508-9584', 'Home', 'Buffalo Grove', 'IL', '60089', 'N', 'N', 'None', 3, 1, 1, 'OID_005', '2017-08-06'),
('EID_022', 'Dana ', 'V', ' Brady', 'Dana ', 'Dana.Brady@justwoko.com', '(409)289-2226', 'Cell', '(515)234-6120', 'Home', 'Lapeer', 'MI', '48446', 'N', 'N', 'None', 4, 1, 1, 'OID_010', '2017-06-03'),
('EID_023', 'Cedric ', 'W', ' Armstrong', 'Cedric ', 'Cedric.Armstrong@justwoko.com', '(248)991-4963', 'Cell', '(413)318-2667', 'Home', 'Aberdeen', 'SD', '57401', 'N', 'N', 'None', 5, 1, 1, 'OID_014', '2017-05-02'),
('EID_024', 'Gary ', 'A', ' Harrington', 'Gary ', 'Gary.Harrington@justwoko.com', '(585)370-2061', 'Cell', '(336)567-2811', 'Home', 'Elgin', 'IL', '60120', 'N', 'N', 'None', 6, 1, 1, 'OID_005', '2017-08-05'),
('EID_025', 'Edmund ', 'B', ' Riley', 'Ed', 'Edmund.Riley@justwoko.com', '(562)631-6190', 'Cell', '(737)932-7249', 'Home', 'Hope Mills', 'NC', '28348', 'N', 'N', 'EID_025', 7, 1, 1, 'OID_011', '2017-02-03'),
('EID_026', 'Jhon', 'Wlker', 'Nothing', NULL, 'walker@hismail.com', '569658658', 'Cell', '8547854585', 'Home', 'dont know', NULL, NULL, 'N', 'N', NULL, 6, 1, 1, 'OID_002', NULL),
('EID_027', 'Jhonson ', 'Hemilton ', 'Hilery ', 'Jhonson', 'Jhonson@gmail.com', '8547444444', 'Cell', '8444444444', 'Home', 'New York', 'New Yourk', '655412', 'N', 'N', NULL, 2, 2, 3, 'OID_002', '2018-09-05'),
('EID_028', 'Andrew', '', 'Gill', 'Andy', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_029', 'Annette', '', 'Schumaker', 'Ann', 'ann.schumaker@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_030', 'Anthony', '', 'Smith', 'Tony', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_031', 'Anthony', '', 'Mansfield', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_032', 'Armand', '', 'Neuman', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_033', 'Braden', '', 'Eichler', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_034', 'Bradley', '', 'Schmidt', 'Brad', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_035', 'Brandi', '', 'Hartwick', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_036', 'Brenda', '', 'Cohen', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_037', 'Bridget', '', 'Shultz', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 5, 1, 1, 'OID_003', NULL),
('EID_038', 'Brody', '', 'Cauldfield', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_039', 'Caesar', '', 'Morris', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_040', 'Callan', '', 'Williams', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_041', 'Chad', '', 'Morris', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_042', 'Charles', '', 'Talbot', 'Chuck', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_043', 'Chase', '', 'Moore', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_044', 'Christian', '', 'Maher', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_045', 'Christopher', '', 'Campbell', 'Chris', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_046', 'Cody', '', 'Maher', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_048', 'Darrin', '', 'Jackson', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_049', 'Dave', '', 'Robbins', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_050', 'David', '', 'Newberry', 'Dave', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_052', 'Donald', '', 'Eishenhower', 'Don', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_053', 'Dorreen', '', 'Winchester', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_054', 'Douglas', '', 'Bowman', 'Doug', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_055', 'Edward', '', 'Tudor', 'Ed', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_056', 'Eliza', '', 'Darwin', 'Liz', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_057', 'Emma', '', 'Covington', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_058', 'Erik', '', 'Ramsey', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_059', 'Eron', '', 'Flynn', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_060', 'Ferdinand', '', 'Churchill', 'Fred', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_061', 'Grant', '', 'Orwell', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_062', 'Greg', '', 'Orlitz', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_063', 'Jack', '', 'Orman', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 1, 2, 1, 'OID_003', NULL),
('EID_064', 'Jacob', '', 'Feddero', 'Jake', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_065', 'Jaeger', '', 'Bronte', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_066', 'Janice', '', 'Poppins', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 5, 1, 1, 'OID_003', NULL),
('EID_067', 'Jerome', '', 'Feliz', 'Jerry', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_068', 'Jerri', '', 'McCarty', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 5, 1, 1, 'OID_003', NULL),
('EID_069', 'Jim', '', 'Luther', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_070', 'John', '', 'Lennon', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_071', 'Josef', '', 'Speer', '', 'josef.speer@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 1, 1, 1, 'OID_003', NULL),
('EID_072', 'Josie', '', 'Belk', '', 'josie.belk@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 2, 1, 1, 'OID_003', NULL),
('EID_073', 'Karen', '', 'Coutinho', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 5, 1, 1, 'OID_003', NULL),
('EID_074', 'Karl', '', 'Shilpberg', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_075', 'Kate', '', 'Jefferson', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_076', 'Kim', '', 'Kardin', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_077', 'Klein', '', 'Henrick', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_078', 'Kyle', '', 'Paloma', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_079', 'Lee', '', 'Major', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_080', 'Liam', '', 'Neeson', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_081', 'Lina', '', 'Dockrill', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_082', 'Linda', '', 'Gray', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_083', 'Lisa', '', 'Simpson', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_084', 'Michael', '', 'Lunar', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_085', 'Mike', '', 'Whittern', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_086', 'Mike', '', 'Abbott', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_087', 'Mitch', '', 'Borges', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_088', 'Mitchell', '', 'Townsend', 'Mitch', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 7, 1, 1, 'OID_003', NULL),
('EID_089', 'Ned', '', 'Kristoffensen', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_090', 'Nick', '', 'Kline', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_091', 'Orphelia', '', 'Beecham', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_092', 'Palmer', '', 'Kerns', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_093', 'Parker', '', 'Marchessa', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_094', 'Perry', '', 'Ellis', '', 'first.last@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_095', 'Ray', '', 'Aiken', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_096', 'Rick', '', 'Springfield', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_097', 'Robin', '', 'Danish', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 3, 1, 1, 'OID_003', NULL),
('EID_098', 'Roger', '', 'Rinaldo', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_099', 'Roman', '', 'Williams', '', 'first.last@acme.com', '', '', '', '', 'Reston', 'VA', '20170', '', '', '', 4, 1, 1, 'OID_003', NULL),
('EID_100', 'Ron', '', 'Sonsinni', '', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_101', 'Rosie', '', 'O&apos;Donnell', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_102', 'Roy', '', 'Rogers', '', 'roy.rogers@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 1, 1, 1, 'OID_003', NULL),
('EID_103', 'Ryan', '', 'Malcolm', '', 'ryan.malcolm@acme.com', '', '', '', '', 'Rockville', 'MD', '20847', '', '', '', 2, 1, 1, 'OID_003', NULL),
('EID_104', 'Shawn', '', 'Franklin', '', 'franklin.shawn@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 1, 1, 1, 'OID_003', NULL),
('EID_105', 'Thomas', '', 'Edison', 'Tom', 'thomas.edison@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 2, 1, 1, 'OID_003', NULL),
('EID_106', 'Thomas', '', 'Cook', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_107', 'Tim', '', 'Gates', '', 'first.last@acme.com', '', '', '', '', 'Fredrick', 'MD', '21701', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_108', 'Trent', '', 'Washington', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_109', 'Tyler', '', 'Moffett', '', 'first.last@acme.com', '', '', '', '', 'Arlington', 'VA', '20330', '', '', '', 6, 1, 1, 'OID_003', NULL),
('EID_110', 'Tyler', '', 'Kastelan', '', 'first.last@acme.com', '', '', '', '', 'Gaithesburg', 'MD', '20697', '', '', '', 9, 1, 1, 'OID_003', NULL),
('EID_111', 'Verona', '', 'Capulet', '', 'first.last@acme.com', '', '', '', '', 'Bethesda', 'MD', '20810', '', '', '', 5, 1, 1, 'OID_003', NULL),
('EID_112', 'Will', '', 'Hefner', '', 'first.last@acme.com', '', '', '', '', 'Silver Spring', 'MD', '20815', '', '', '', 8, 1, 1, 'OID_003', NULL),
('EID_113', 'William', '', 'Atkins', 'Will', 'first.last@acme.com', '', '', '', '', 'Alexandria', 'VA', '2206', '', '', '', 6, 1, 1, 'OID_003', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_CERTIFICATION`
--

CREATE TABLE `STAFF_CERTIFICATION` (
  `STAFF_ID` varchar(255) NOT NULL,
  `CERTIFICATION_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `STAFF_CERTIFICATION`
--

INSERT INTO `STAFF_CERTIFICATION` (`STAFF_ID`, `CERTIFICATION_ID`) VALUES
('EID_040', 1),
('EID_040', 5),
('EID_046', 1),
('EID_046', 7);

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_EXPERIENCE`
--

CREATE TABLE `STAFF_EXPERIENCE` (
  `EXPERIENCE_ID` int(11) NOT NULL,
  `EXPERIENCE_LABEL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `STAFF_EXPERIENCE`
--

INSERT INTO `STAFF_EXPERIENCE` (`EXPERIENCE_ID`, `EXPERIENCE_LABEL`) VALUES
(1, 'Target Value Design'),
(2, 'Cost Control'),
(3, 'Cost Estimating'),
(4, 'Constructability Review'),
(5, 'Short Interval Planning'),
(6, 'Sunbcontractor Selection'),
(7, 'BIM Consulting'),
(8, 'VDC Execution Planning'),
(9, 'Model BAsed Estimating'),
(10, 'MEP Coordination'),
(11, '4D Sequencing'),
(12, 'Constructability Analysis'),
(13, 'Site Logistics Planning'),
(14, 'Total Station Integration'),
(15, 'Drywall and taping'),
(16, 'Doors, frames and hardware'),
(17, 'Rough carpentry'),
(18, 'Acoustical ceiling work'),
(19, 'Light demolition and clean up'),
(20, 'Firestop'),
(21, 'Strut for over-head supports as well as ground up MEP utility racks'),
(22, 'Building Core Upgrades'),
(23, 'Data Center Upgrades'),
(24, 'Energy Efficiency Upgrades'),
(25, 'Hospital Renovations'),
(26, 'Lab Remodels'),
(27, 'Mechanical Upgrades'),
(28, 'Office Reconfigurations'),
(29, 'Retail Buildouts'),
(30, 'Roof Replacements'),
(31, 'Site Improvements'),
(32, 'Seismic Upgardes'),
(33, 'Tenant Buildout'),
(34, 'sdsdsd'),
(35, 'dsdssdsd'),
(36, 'sss');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_GROUP`
--

CREATE TABLE `STAFF_GROUP` (
  `GROUP_ID` int(10) NOT NULL,
  `GROUP_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `STAFF_GROUP`
--

INSERT INTO `STAFF_GROUP` (`GROUP_ID`, `GROUP_NAME`) VALUES
(1, 'Operation'),
(2, 'SSG');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_ROLE`
--

CREATE TABLE `STAFF_ROLE` (
  `ROLE_ID` int(10) NOT NULL,
  `ROLE_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `STAFF_ROLE`
--

INSERT INTO `STAFF_ROLE` (`ROLE_ID`, `ROLE_NAME`) VALUES
(1, 'Assistant Superintendent'),
(2, 'BIM Project Engineer'),
(3, 'Field Office Coordinator'),
(4, 'MEP Coordinator'),
(5, 'Project Accountant'),
(6, 'Project Engineer'),
(7, 'Project Executive'),
(8, 'Project Manager'),
(9, 'Project Superintendent'),
(10, 'Staff Role');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_STATUS`
--

CREATE TABLE `STAFF_STATUS` (
  `STATUS_ID` int(10) NOT NULL,
  `STATUS_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `STAFF_STATUS`
--

INSERT INTO `STAFF_STATUS` (`STATUS_ID`, `STATUS_NAME`) VALUES
(1, 'Active'),
(2, 'Inactive'),
(3, 'Terminated');

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

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`ID`, `ROLE_ID`, `FIRST_NAME`, `MIDDLE_NAME`, `LAST_NAME`, `EMAIL`, `PASSWORD`, `VERIFIED`, `ADDRESS`, `CITY`, `COUNTRY`, `ZIP`) VALUES
(50, 1, 'Admin', 'A', 'Admin', 'admin@staffplan.io', '39911a1da4d8b466068cb0af85cf0c52', 'true', 'USA', 'California', 'USA', '60012');

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
  ADD KEY `GROUP_ID_FK` (`GROUP_ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ACCESS_TYPE_COMBINATION`
--
ALTER TABLE `ACCESS_TYPE_COMBINATION`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `CATEGORY`
--
ALTER TABLE `CATEGORY`
  MODIFY `CATEGORY_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `CERTIFICATION_SKILLS`
--
ALTER TABLE `CERTIFICATION_SKILLS`
  MODIFY `CERTIFICATION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `PLANNED_PROJECT_PEOPLE`
--
ALTER TABLE `PLANNED_PROJECT_PEOPLE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `PROJECT_GROUP`
--
ALTER TABLE `PROJECT_GROUP`
  MODIFY `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ROLE`
--
ALTER TABLE `ROLE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `STAFF_EXPERIENCE`
--
ALTER TABLE `STAFF_EXPERIENCE`
  MODIFY `EXPERIENCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
