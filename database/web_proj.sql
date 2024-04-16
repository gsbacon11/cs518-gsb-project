-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2024 at 02:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_proj`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `courseName` varchar(10) NOT NULL,
  `level` int(16) DEFAULT NULL,
  `isPrereq` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`courseName`, `level`, `isPrereq`) VALUES
('CS 112', 100, 1),
('CS 115', 100, 1),
('CS 120G', 100, 1),
('CS 121G', 100, 0),
('CS 126G', 100, 0),
('CS 150', 100, 0),
('CS 151', 100, 0),
('CS 153', 100, 0),
('CS 170', 100, 0),
('CS 195', 100, 0),
('CS 197', 100, 0),
('CS 202G', 200, 0),
('CS 250', 200, 1),
('CS 251', 200, 1),
('CS 252', 200, 1),
('CS 253', 200, 0),
('CS 260', 200, 0),
('CS 261', 200, 0),
('CS 263', 200, 0),
('CS 270', 200, 0),
('CS 295', 200, 0),
('CS 300T', 300, 0),
('CS 312', 300, 1),
('CS 315', 300, 1),
('CS 330', 300, 1),
('CS 350', 300, 0),
('CS 355', 300, 0),
('CS 361', 300, 0),
('CS 367', 300, 0),
('CS 368', 300, 0),
('CS 381', 300, 0),
('CS 390', 300, 0),
('CS 395', 300, 0),
('CS 402', 400, 0),
('CS 410', 400, 0),
('CS 411W', 400, 0),
('CS 417', 400, 0),
('CS 418', 400, 0),
('CS 422', 400, 0),
('CS 431', 400, 0),
('CS 432', 400, 0),
('CS 433', 400, 0),
('CS 441', 400, 0),
('CS 450', 400, 0),
('CS 454', 400, 0),
('CS 455', 400, 0),
('CS 458', 400, 0),
('CS 460', 400, 0),
('CS 462', 400, 0),
('CS 463', 400, 0),
('CS 464', 400, 0),
('CS 465', 400, 0),
('CS 466', 400, 0),
('CS 467', 400, 0),
('CS 468W', 400, 0),
('CS 469', 400, 0),
('CS 471', 400, 0),
('CS 472', 400, 0),
('CS 475', 400, 0),
('CS 476', 400, 0),
('CS 478', 400, 0),
('CS 480', 400, 0),
('CS 486', 400, 0),
('CS 487', 400, 0),
('CS 488', 400, 0),
('CS 491', 400, 0),
('CS 492', 400, 0),
('CS 495', 400, 0),
('CS 497', 400, 0),
('CS 499W', 400, 0),
('CS 500', 500, 0),
('CS 502', 500, 0),
('CS 510', 500, 0),
('CS 511', 500, 0),
('CS 517', 500, 0),
('CS 518', 500, 0),
('CS 522', 500, 0),
('CS 531', 500, 0),
('CS 532', 500, 0),
('CS 533', 500, 0),
('CS 541', 500, 0),
('CS 554', 500, 0),
('CS 555', 500, 0),
('CS 558', 500, 0),
('CS 560', 500, 0),
('CS 562', 500, 0),
('CS 564', 500, 0),
('CS 565', 500, 0),
('CS 566', 500, 0),
('CS 567', 500, 0),
('CS 569', 500, 0),
('CS 571', 500, 0),
('CS 575', 500, 0),
('CS 576', 500, 0),
('CS 578', 500, 0),
('CS 580', 500, 0),
('CS 586', 500, 0),
('CS 588', 500, 0),
('CS 591', 500, 0),
('CS 592', 500, 0),
('CS 595', 500, 0),
('CS 597', 500, 0),
('CS 600', 600, 0),
('CS 610 ', 600, 0),
('CS 620', 600, 0),
('CS 624', 600, 0),
('CS 625', 600, 0),
('CS 635', 600, 0),
('CS 656', 600, 0),
('CS 660', 600, 0),
('CS 665', 600, 0),
('CS 667', 600, 0),
('CS 668', 600, 0),
('CS 669', 600, 0),
('CS 690', 600, 0),
('CS 695', 600, 0),
('CS 697', 600, 0),
('CS 698', 600, 0),
('CS 699', 600, 0),
('CS 710', 700, 0),
('CS 711', 700, 0),
('CS 712', 700, 0),
('CS 714', 700, 0),
('CS 722', 700, 0),
('CS 723', 700, 0),
('CS 724', 700, 0),
('CS 725', 700, 0),
('CS 726', 700, 0),
('CS 732', 700, 0),
('CS 733', 700, 0),
('CS 734', 700, 0),
('CS 735', 700, 0),
('CS 744', 700, 0),
('CS 751 ', 700, 0),
('CS 752', 700, 0),
('CS 761', 700, 0),
('CS 762', 700, 0),
('CS 764', 700, 0),
('CS 765', 700, 0),
('CS 771', 700, 0),
('CS 772', 700, 0),
('CS 773', 700, 0),
('CS 774', 700, 0),
('CS 775', 700, 0),
('CS 776', 700, 0),
('CS 778', 700, 0),
('CS 779', 700, 0),
('CS 791', 700, 0),
('CS 795', 700, 0),
('CS 800', 800, 0),
('CS 810', 800, 0),
('CS 811', 800, 0),
('CS 812', 800, 0),
('CS 814', 800, 0),
('CS 822', 800, 0),
('CS 823', 800, 0),
('CS 824', 800, 0),
('CS 825', 800, 0),
('CS 826', 800, 0),
('CS 827', 800, 0),
('CS 832', 800, 0),
('CS 833', 800, 0),
('CS 834', 800, 0),
('CS 835', 800, 0),
('CS 844', 800, 0),
('CS 851', 800, 0),
('CS 852', 800, 0),
('CS 861', 800, 0),
('CS 862', 800, 0),
('CS 864', 800, 0),
('CS 865', 800, 0),
('CS 871', 800, 0),
('CS 872', 800, 0),
('CS 873', 800, 0),
('CS 874', 800, 0),
('CS 875', 800, 0),
('CS 876', 800, 0),
('CS 878', 800, 0),
('CS 879', 800, 0),
('CS 891', 800, 0),
('CS 895', 800, 0),
('CS 896', 800, 0),
('CS 898', 800, 0),
('CS 899', 800, 0),
('CS 998', 900, 0),
('CS 999', 900, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sheets`
--

CREATE TABLE `sheets` (
  `sheetID` int(64) NOT NULL,
  `userID` int(64) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `termCurrent` varchar(15) NOT NULL,
  `termLast` varchar(15) NOT NULL,
  `gpa` decimal(10,2) DEFAULT NULL,
  `status` text NOT NULL DEFAULT 'Pending',
  `notes` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sheets`
--

INSERT INTO `sheets` (`sheetID`, `userID`, `date`, `time`, `termCurrent`, `termLast`, `gpa`, `status`, `notes`) VALUES
(48, 49, '2024-03-26', '2024-03-26 04:36:26', 'Spring 2024', 'Fall 2023', 4.00, 'Accepted', ' Looks good!!!'),
(49, 49, '2024-03-26', '2024-03-26 04:40:03', 'Spring 2024', 'Fall 2023', 3.10, 'Rejected', ' BADDDDDDDDDD'),
(50, 49, '2024-03-26', '2024-03-26 04:41:44', 'Fall 2023', 'Fall 2023', 4.00, 'Pending', '');

-- --------------------------------------------------------

--
-- Table structure for table `sheets2courses`
--

CREATE TABLE `sheets2courses` (
  `sheetID` int(64) NOT NULL,
  `courseName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sheets2courses`
--

INSERT INTO `sheets2courses` (`sheetID`, `courseName`) VALUES
(48, 'CS 112'),
(48, 'CS 121G'),
(48, 'CS 250'),
(48, 'CS 312'),
(49, 'CS 115'),
(49, 'CS 126G'),
(49, 'CS 315'),
(50, 'CS 115');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `term` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`term`) VALUES
('Fall 2023'),
('Fall 2024'),
('Spring 2023'),
('Spring 2024'),
('Summer 2023'),
('Summer 2024');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(64) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `loginID` int(20) DEFAULT NULL,
  `passwordReset` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `email`, `password`, `isAdmin`, `isApproved`, `loginID`, `passwordReset`) VALUES
(46, 'Trent', 'Richardson', 'jerywopo@closetab.email', '$2b$10$GGFyhWCJQY4Poiw7tNG3IOpdJ3fg50ArzFeS371dKaA7rlWiRHnzq', 0, 0, 915742, 0),
(48, 'Jimmy', 'Bobb', 'fopeqa@pelagius.net', '$2b$10$pF1JzPcE4woPS4Phq.3bROeFcfZEQaN6YSg12ioEmyNpDYV3ZpyM.', 0, 0, NULL, 0),
(49, 'John', 'Doe', 'gsbacon11extra@gmail.com', '$2b$10$Wrj21SZRHyWRuUFu8/2V.ueCUUSZTs8XYFEYfeNX7OemfVwM1TPki', 0, 1, 954667, 0),
(50, 'Admin', 'Admin', 'gsbacon11@gmail.com', '$2b$10$lCkDIBLPpg7yd2xaV2kW.e89Si2Ql0E73zjUY7XG/Qv6YfrLpqZLy', 1, 1, 274768, 0),
(51, 'ahha', 'dwdwd', 'gbacon11@gmail.com', '$2b$10$rF4cS4xn9Zee0tBNYU3kqOwZQmMPTc0sOIamwkavb9NeomCEb5CL2', 0, 0, NULL, 0),
(52, 'fef', 'efef', 'gba@gmail.coxx', '$2b$10$MrMWQg8Rm9acHPkT.VKoCujQlNyeq.tMbwSCi2ax8WEZReOgU3pgC', 0, 0, NULL, 0),
(53, 'edfe', 'effe', 'efefe@gmax.coxx', '$2b$10$mxlRhVxkwYXNaVu4fRBB1e1lvrVULpiD/zJTCUD0xTzdFrcIM9V.6', 0, 0, NULL, 0),
(54, 'wfdwdw', 'wddwwd', 'ggg@gmail.commmm', '$2b$10$ilc3UQbMX0Pl7yvKHlaRcu5DgbKwttFIV20HUiiFbJSbYpIiGoPbO', 0, 0, NULL, 0),
(55, 'dwdwdwd', 'wdwdwd', 'uhdwuhdu@gmailxcsdfwsd.commm', '$2b$10$W7ZmKQlSfF44cTUhMTgAdekyZDPYwOa898ZDnubbuXEvo2.SbPnaC', 0, 0, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseName`);

--
-- Indexes for table `sheets`
--
ALTER TABLE `sheets`
  ADD PRIMARY KEY (`sheetID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `termCurrent` (`termCurrent`),
  ADD KEY `termLast` (`termLast`);

--
-- Indexes for table `sheets2courses`
--
ALTER TABLE `sheets2courses`
  ADD PRIMARY KEY (`sheetID`,`courseName`),
  ADD UNIQUE KEY `sheetID` (`sheetID`,`courseName`),
  ADD KEY `s` (`courseName`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`term`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sheets`
--
ALTER TABLE `sheets`
  MODIFY `sheetID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sheets`
--
ALTER TABLE `sheets`
  ADD CONSTRAINT `sheets_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `sheets_ibfk_2` FOREIGN KEY (`termCurrent`) REFERENCES `terms` (`term`),
  ADD CONSTRAINT `sheets_ibfk_3` FOREIGN KEY (`termLast`) REFERENCES `terms` (`term`);

--
-- Constraints for table `sheets2courses`
--
ALTER TABLE `sheets2courses`
  ADD CONSTRAINT `c` FOREIGN KEY (`sheetID`) REFERENCES `sheets` (`sheetID`),
  ADD CONSTRAINT `s` FOREIGN KEY (`courseName`) REFERENCES `courses` (`courseName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
