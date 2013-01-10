-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1.precise~ppa.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 29, 2012 at 04:09 AM
-- Server version: 5.1.63
-- PHP Version: 5.3.17-1~dotdeb.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `forksteroids`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `name` varchar(15) NOT NULL,
  `score` int(5) NOT NULL,
  `IP` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=84 ;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`ID`, `dateTime`, `name`, `score`, `IP`) VALUES
(1, '2012-11-28 22:02:59', 'User', 1001, '127.0.0.1'),
(2, '2012-11-28 22:03:00', 'User', 1000, '127.0.0.1'),
(3, '2012-11-28 22:03:01', 'User', 1000, '127.0.0.1'),
(4, '2012-11-28 22:03:02', 'User', 1000, '127.0.0.1'),
(5, '2012-11-28 22:03:03', 'User', 1000, '127.0.0.1'),
(6, '2012-11-29 01:03:21', 'User', 1000, '127.0.0.1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;