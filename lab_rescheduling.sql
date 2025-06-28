-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2025 at 05:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab_rescheduling`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `Schedule_id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `student_id`, `Schedule_id`, `status`) VALUES
(1, '22E001', 1, 'Present'),
(2, '22E002', 1, 'Present'),
(3, '22E003', 1, 'Late'),
(4, '22E004', 2, 'Absent'),
(5, '22E005', 2, 'Present'),
(6, '22E006', 3, 'Present'),
(7, '22E007', 3, 'Present'),
(8, '22E008', 4, 'Absent'),
(9, '22E009', 5, 'Present'),
(10, '22E010', 6, 'Late');

-- --------------------------------------------------------

--
-- Table structure for table `coordinator_receives_notification`
--

CREATE TABLE `coordinator_receives_notification` (
  `coordinator_id` varchar(10) NOT NULL,
  `notification_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coordinator_receives_notification`
--

INSERT INTO `coordinator_receives_notification` (`coordinator_id`, `notification_id`) VALUES
('COORD001', 1),
('COORD002', 2),
('COORD003', 3),
('COORD004', 4),
('COORD005', 5),
('COORD006', 6),
('COORD007', 7),
('COORD008', 8),
('COORD009', 9),
('COORD010', 10);

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `Lab_id` int(11) NOT NULL,
  `Lab_name` varchar(100) NOT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Availability` enum('Available','Not Available') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`Lab_id`, `Lab_name`, `Location`, `Availability`) VALUES
(1, 'Digital Lab', 'Block A, Room 101', 'Available'),
(2, 'Control Systems Lab', 'Block B, Room 205', 'Not Available'),
(3, 'Software Lab', 'Block C, Room 302', 'Available'),
(4, 'Robotics Lab', 'Block D, Room 104', 'Available'),
(5, 'Electronics Lab', 'Block E, Room 210', 'Not Available'),
(6, 'Communication Lab', 'Block A, Room 305', 'Available'),
(7, 'Power Systems Lab', 'Block B, Room 112', 'Not Available'),
(8, 'Microprocessor Lab', 'Block C, Room 207', 'Available'),
(9, 'VLSI Design Lab', 'Block D, Room 303', 'Available'),
(10, 'RF Engineering Lab', 'Block E, Room 108', 'Not Available');

-- --------------------------------------------------------

--
-- Table structure for table `lab_instructor`
--

CREATE TABLE `lab_instructor` (
  `Instructor_id` varchar(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `E_mail` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab_instructor`
--

INSERT INTO `lab_instructor` (`Instructor_id`, `Name`, `E_mail`, `Phone`) VALUES
('INS001', 'Ms. Anjali Fonseka', 'anjali.f@eng.jfn.ac.lk', '076-9876543'),
('INS002', 'Mr. Tharindu Dias', 'tharindu.d@eng.jfn.ac.lk', '078-1122334'),
('INS003', 'Dr. Saman Siriwardena', 'saman.s@eng.jfn.ac.lk', '077-3456789'),
('INS004', 'Ms. Nirosha Rajapakse', 'nirosha.r@eng.jfn.ac.lk', '071-2233445'),
('INS005', 'Mr. P. Arumugam', 'arumugam.p@eng.jfn.ac.lk', '072-3344556'),
('INS006', 'Dr. H. Balasubramaniam', 'balasubramaniam.h@eng.jfn.ac.lk', '075-5566778'),
('INS007', 'Ms. K. Nirmala', 'nirmala.k@eng.jfn.ac.lk', '077-8899001'),
('INS008', 'Mr. S. Chandrasekhar', 'chandrasekhar.s@eng.jfn.ac.lk', '070-1122334'),
('INS009', 'Ms. L. Piyaseeli', 'piyaseeli.l@eng.jfn.ac.lk', '076-4455667'),
('INS010', 'Dr. M. Ilangko', 'ilangko.m@eng.jfn.ac.lk', '078-9988776');

-- --------------------------------------------------------

--
-- Table structure for table `lab_schedule`
--

CREATE TABLE `lab_schedule` (
  `Schedule_id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Time_Slot` varchar(20) DEFAULT NULL,
  `Subject` varchar(100) NOT NULL,
  `Lab_id` int(11) NOT NULL,
  `coordinator_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab_schedule`
--

INSERT INTO `lab_schedule` (`Schedule_id`, `Date`, `Time_Slot`, `Subject`, `Lab_id`, `coordinator_id`) VALUES
(1, '2024-06-12', '09:00-11:00', 'EC5070 DBMS', 1, 'COORD001'),
(2, '2024-06-12', '13:00-15:00', 'EC5011 DSP', 2, 'COORD002'),
(3, '2024-06-13', '10:00-12:00', 'EC5080 SW Construction', 3, 'COORD001'),
(4, '2024-06-14', '09:00-11:00', 'EC5110 Comp Architecture', 1, 'COORD002'),
(5, '2024-06-14', '14:00-16:00', 'EC5030 Control Systems', 2, 'COORD003'),
(6, '2024-06-15', '11:00-13:00', 'EC5050 Robotics', 4, 'COORD004'),
(7, '2024-06-16', '10:30-12:30', 'EC5020 VLSI Design', 9, 'COORD005'),
(8, '2024-06-17', '08:00-10:00', 'EC5100 RF Engineering', 10, 'COORD006'),
(9, '2024-06-18', '14:00-16:00', 'EC5090 Power Systems', 7, 'COORD007'),
(10, '2024-06-19', '13:30-15:30', 'EC5040 Microprocessors', 8, 'COORD008');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `sent_at` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `recipient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `sent_at`, `message`, `recipient`) VALUES
(1, '2024-06-05 10:00:00', 'Lab schedule for EC5070 updated', 'Students'),
(2, '2024-06-07 14:30:00', 'DBMS assignment due Friday', 'Selected Students'),
(3, '2024-06-08 09:15:00', 'Special lecture on DSP', 'All Students'),
(4, '2024-06-09 11:00:00', 'Lab instructor meeting', 'Lab Instructors'),
(5, '2024-06-10 13:00:00', 'Library closed tomorrow', 'All Students'),
(6, '2024-06-11 15:30:00', 'Project submission extended', 'Final Year Students'),
(7, '2024-06-12 09:00:00', 'Wireless Lab unavailable', 'EC5080 Students'),
(8, '2024-06-13 16:45:00', 'Guest lecture: AI Trends', 'CS Students'),
(9, '2024-06-14 11:30:00', 'Scholarship applications open', 'UG Students'),
(10, '2024-06-15 14:00:00', 'Semester results published', 'All Students');

-- --------------------------------------------------------

--
-- Table structure for table `reschedule_request`
--

CREATE TABLE `reschedule_request` (
  `Request_id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `Reason` varchar(255) DEFAULT NULL,
  `Instructor_id` varchar(10) NOT NULL,
  `coordinator_id` varchar(10) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `lab_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reschedule_request`
--

INSERT INTO `reschedule_request` (`Request_id`, `status`, `created_at`, `Reason`, `Instructor_id`, `coordinator_id`, `student_id`, `lab_name`) VALUES
(1, 'Pending', '2024-06-06 11:30:00', 'Medical emergency', 'INS001', 'COORD001', '22E001', NULL),
(2, 'Approved', '2024-06-07 09:00:00', 'Family commitment', 'INS002', 'COORD001', '22E003', NULL),
(3, 'Rejected', '2024-06-08 16:00:00', 'Insufficient justification', 'INS001', 'COORD002', '22E004', NULL),
(4, 'Pending', '2024-06-09 10:15:00', 'Academic competition', 'INS003', 'COORD003', '22E005', NULL),
(5, 'Approved', '2024-06-10 14:30:00', 'Transport issues', 'INS004', 'COORD004', '22E006', NULL),
(6, 'Pending', '2024-06-11 11:00:00', 'Health reasons', 'INS005', 'COORD005', '22E007', NULL),
(7, 'Rejected', '2024-06-12 15:45:00', 'Duplicate request', 'INS006', 'COORD006', '22E008', NULL),
(8, 'Approved', '2024-06-13 09:30:00', 'Conference attendance', 'INS007', 'COORD007', '22E009', NULL),
(9, 'Pending', '2024-06-14 13:20:00', 'Family function', 'INS008', 'COORD008', '22E010', NULL),
(10, 'Approved', '2024-06-15 16:10:00', 'Sports tournament', 'INS009', 'COORD009', '22E002', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(20) NOT NULL,
  `F_name` varchar(100) NOT NULL,
  `L_name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `F_name`, `L_name`, `email`) VALUES
('22E001', 'H.K.', 'RATHNAYAKE', '2022e001@eng.jfn.ac.lk'),
('22E002', 'B.M.K.', 'PERERA', '2022e002@eng.jfn.ac.lk'),
('22E003', 'C.R.', 'FERNANDO', '2022e003@eng.jfn.ac.lk'),
('22E004', 'D.G.S.', 'SILVA', '2022e004@eng.jfn.ac.lk'),
('22E005', 'E.P.', 'BANDARA', '2022e005@eng.jfn.ac.lk'),
('22E006', 'F.A.', 'JAYAWARDENA', '2022e006@eng.jfn.ac.lk'),
('22E007', 'G.S.', 'DISSANAYAKE', '2022e007@eng.jfn.ac.lk'),
('22E008', 'A.D.S.', 'WITHARANA', '2022e008@eng.jfn.ac.lk'),
('22E009', 'I.M.', 'SUBRAMANIAM', '2022e009@eng.jfn.ac.lk'),
('22E010', 'J.N.', 'SIVAKUMAR', '2022e010@eng.jfn.ac.lk');

-- --------------------------------------------------------

--
-- Table structure for table `student_receives_notification`
--

CREATE TABLE `student_receives_notification` (
  `student_id` varchar(20) NOT NULL,
  `notification_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_receives_notification`
--

INSERT INTO `student_receives_notification` (`student_id`, `notification_id`) VALUES
('22E001', 1),
('22E002', 1),
('22E003', 2),
('22E004', 3),
('22E005', 4),
('22E006', 5),
('22E007', 6),
('22E008', 7),
('22E009', 8),
('22E010', 9);

-- --------------------------------------------------------

--
-- Table structure for table `subject_coordinator`
--

CREATE TABLE `subject_coordinator` (
  `coordinator_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_coordinator`
--

INSERT INTO `subject_coordinator` (`coordinator_id`, `name`, `email`, `phone`) VALUES
('COORD001', 'Dr. P. Nigunthan', 'nigunthan.p@eng.jfn.ac.lk', '071-2345678'),
('COORD002', 'Prof. Ayesha Silva', 'ayesha.s@eng.jfn.ac.lk', '077-8765432'),
('COORD003', 'Mr. K. Suresh', 'suresh.k@eng.jfn.ac.lk', '070-1122334'),
('COORD004', 'Ms. Dilini Dias', 'dilini.d@eng.jfn.ac.lk', '071-9988776'),
('COORD005', 'Dr. Nimali Fernando', 'nimali.f@eng.jfn.ac.lk', '072-3344556'),
('COORD006', 'Mr. S. Rajapakse', 'rajapakse.s@eng.jfn.ac.lk', '075-6677889'),
('COORD007', 'Ms. Chathuri Jayawardena', 'chathuri.j@eng.jfn.ac.lk', '078-1122334'),
('COORD008', 'Dr. Arulanantham Pillai', 'arulanantham.p@eng.jfn.ac.lk', '076-4455667'),
('COORD009', 'Ms. Tharushi Bandara', 'tharushi.b@eng.jfn.ac.lk', '077-8899001'),
('COORD010', 'Mr. K. Sivakumar', 'sivakumar.k@eng.jfn.ac.lk', '070-2233445');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `Schedule_id` (`Schedule_id`);

--
-- Indexes for table `coordinator_receives_notification`
--
ALTER TABLE `coordinator_receives_notification`
  ADD PRIMARY KEY (`coordinator_id`,`notification_id`),
  ADD KEY `notification_id` (`notification_id`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`Lab_id`);

--
-- Indexes for table `lab_instructor`
--
ALTER TABLE `lab_instructor`
  ADD PRIMARY KEY (`Instructor_id`);

--
-- Indexes for table `lab_schedule`
--
ALTER TABLE `lab_schedule`
  ADD PRIMARY KEY (`Schedule_id`),
  ADD KEY `Lab_id` (`Lab_id`),
  ADD KEY `coordinator_id` (`coordinator_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `reschedule_request`
--
ALTER TABLE `reschedule_request`
  ADD PRIMARY KEY (`Request_id`),
  ADD KEY `Instructor_id` (`Instructor_id`),
  ADD KEY `coordinator_id` (`coordinator_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_receives_notification`
--
ALTER TABLE `student_receives_notification`
  ADD PRIMARY KEY (`student_id`,`notification_id`),
  ADD KEY `notification_id` (`notification_id`);

--
-- Indexes for table `subject_coordinator`
--
ALTER TABLE `subject_coordinator`
  ADD PRIMARY KEY (`coordinator_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `Lab_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lab_schedule`
--
ALTER TABLE `lab_schedule`
  MODIFY `Schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reschedule_request`
--
ALTER TABLE `reschedule_request`
  MODIFY `Request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`Schedule_id`) REFERENCES `lab_schedule` (`Schedule_id`) ON DELETE CASCADE;

--
-- Constraints for table `coordinator_receives_notification`
--
ALTER TABLE `coordinator_receives_notification`
  ADD CONSTRAINT `coordinator_receives_notification_ibfk_1` FOREIGN KEY (`coordinator_id`) REFERENCES `subject_coordinator` (`coordinator_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coordinator_receives_notification_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`notification_id`) ON DELETE CASCADE;

--
-- Constraints for table `lab_schedule`
--
ALTER TABLE `lab_schedule`
  ADD CONSTRAINT `lab_schedule_ibfk_1` FOREIGN KEY (`Lab_id`) REFERENCES `lab` (`Lab_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lab_schedule_ibfk_2` FOREIGN KEY (`coordinator_id`) REFERENCES `subject_coordinator` (`coordinator_id`) ON DELETE CASCADE;

--
-- Constraints for table `reschedule_request`
--
ALTER TABLE `reschedule_request`
  ADD CONSTRAINT `reschedule_request_ibfk_1` FOREIGN KEY (`Instructor_id`) REFERENCES `lab_instructor` (`Instructor_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reschedule_request_ibfk_2` FOREIGN KEY (`coordinator_id`) REFERENCES `subject_coordinator` (`coordinator_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reschedule_request_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_receives_notification`
--
ALTER TABLE `student_receives_notification`
  ADD CONSTRAINT `student_receives_notification_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_receives_notification_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`notification_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
