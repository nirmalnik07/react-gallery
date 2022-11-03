-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2022 at 03:16 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_photo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `file_original_name` varchar(100) DEFAULT NULL,
  `featured` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `image`, `file_original_name`, `featured`, `created_at`) VALUES
(1, '35aa0f170ba1dd6b2c6874906365a761.jpeg', 'Men_Pistols.jpg', 1, '2022-11-02 20:01:38'),
(2, '347c64ba608ed4ad1a741a5c6a0e898c.jpeg', 'Banner 1.1 (1).jpg', 0, '2022-11-02 20:01:38'),
(3, '9a1f5306ba7f16c3894ce8eee763136c.jpeg', 'SampleJPGImage_1mbmb.jpg', 0, '2022-11-02 20:01:38'),
(4, '2c5d09928ccd689aff0e23dd27dc9f45.jpeg', '1.jpg', 0, '2022-11-02 20:01:38'),
(38, 'a736f5da7402b12b6e4de6fa941d65c4.jpeg', 'Banner 1.1 (3) (1).jpg', 0, '2022-11-03 00:11:04'),
(39, '2c9904b90866c6509fb577e5ac5288b0.jpeg', 'Banner 1.1 (3).jpg', 0, '2022-11-03 00:11:04'),
(40, '5beb002745cb0af83e696badc11fa9da.jpeg', 'Banner 1.1 (2).jpg', 0, '2022-11-03 00:11:04'),
(41, 'e2d873958ab7b26bd36e2ec9323c047a.jpeg', 'Banner 1.1 (1).jpg', 1, '2022-11-03 00:11:04'),
(44, '098338971ac0ef43184522db98367c2c.jpeg', 'Banner 1.1.jpg', 1, '2022-11-03 00:14:19'),
(45, '35b2aeeff0852f451ea3c9afe80f8541.jpeg', 'Banner 1.1 (2).jpg', 1, '2022-11-03 00:14:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
