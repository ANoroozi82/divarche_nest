-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2024 at 11:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `divarche`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `categories_name` varchar(25) NOT NULL,
  `fields_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categories_id`, `category_id`, `categories_name`, `fields_id`) VALUES
(1, 2, 'سواری و وانت', 1),
(2, 2, 'سنگین', 1),
(3, 2, 'موتور سیکلت', 1),
(4, 2, 'قطعات یدکی', 2),
(5, 2, 'اجاره ای', 3),
(6, 1, 'موبایل', 4),
(7, 1, 'تبلت', 4),
(8, 1, 'رایانه رومیزی', 7),
(9, 1, 'لپ تاپ', 5),
(10, 1, 'ایرپاد', 2),
(11, 1, ' لوازم جانبی', 2),
(12, 1, 'کنسول بازی', 6),
(13, 1, 'صوتی و تصویری', 2),
(14, 4, 'لوازم خانگی برقی', 2),
(15, 4, 'ظروف و لوازم آشپزخانه', 2),
(16, 4, 'خوردنی و آشامیدنی', NULL),
(17, 4, 'خیاطی و بافتنی', 2),
(18, 4, 'مبلمان و صنایع چوت', 2),
(19, 4, 'نور و روشنایی', 2),
(20, 4, 'فرش و موکت', 2),
(21, 4, 'تشک و روتختی', 2),
(22, 4, 'دکور و تزئینی', 2),
(23, 5, 'سرمایشی و گرمایشی', NULL),
(24, 5, 'شستشو و نظافت', NULL),
(25, 5, 'موتور و ماشین', NULL),
(26, 5, 'پذیرایی و مراسم', NULL),
(27, 5, 'رایانه ای و موبایل', NULL),
(28, 5, 'مالی و حسابداری', NULL),
(29, 5, 'حمل و نقل', NULL),
(30, 5, 'پیشه و مهارت', NULL),
(31, 5, 'آرایشگری و زیبایی', NULL),
(32, 5, 'نظافت', NULL),
(33, 5, 'باغبانی و درختکاری', NULL),
(34, 5, 'آموزش', NULL),
(35, 3, 'کیف، کفش و لباس', NULL),
(36, 3, 'زیورآلات و اکسسوری', 2),
(37, 3, 'آرایشی، بهداشتی و درمانی', 2),
(38, 3, 'وسایل بچه', NULL),
(39, 3, 'لوازم تحریر', 2),
(40, 6, 'بلیط', NULL),
(41, 6, 'تور و چارتر', 9),
(42, 6, 'کتاب و مجله', NULL),
(43, 6, 'دوچرخه، اسکوتر و اسکیت', 2),
(44, 6, 'حیوانات', NULL),
(45, 6, 'کلکسیون و سرگرمی', NULL),
(46, 6, 'آلات موسیقی', 2),
(47, 6, 'ورزش و تناسب اندام', NULL),
(48, 6, 'اسباب بازی', 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(25) NOT NULL,
  `category_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_image`) VALUES
(1, 'کالای دیجیتال', ''),
(2, 'وسیله نقلیه', ''),
(3, 'وسایل شخصی', ''),
(4, 'خانه و آشپزخانه', ''),
(5, 'خدمات', ''),
(6, 'سرگرمی و فراغت', '');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(25) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_name`, `state_id`) VALUES
(1, 'تهران', 1),
(2, 'مشهد', 2),
(3, 'تبریز', 6),
(4, 'ارومیه', 8),
(5, 'اردبیل', 21),
(6, 'اصفهان', 3),
(7, 'کرج', 10),
(8, 'ایلام', 30),
(9, 'بوشهر', 22),
(10, 'شهرکرد', 25),
(11, 'بیرجند', 27),
(12, 'بجنورد', 26),
(13, 'اهواز', 5),
(14, 'زنجان', 24),
(15, 'سمنان', 29),
(16, 'زاهدان', 9),
(17, 'شیراز', 4),
(18, 'قزوین', 20),
(19, 'قم', 19),
(20, 'سنندج', 17),
(21, 'کرمانشاه', 12),
(22, 'یاسوج', 28),
(23, 'گرگان', 13),
(24, 'رشت', 11),
(25, 'خرم‌آباد', 15),
(26, 'ساری', 7),
(27, 'بندرعباس', 14),
(28, 'همدان', 16),
(29, 'یزد', 23),
(30, 'اراک', 18),
(31, 'کرمان', 31);

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

CREATE TABLE `fields` (
  `fields_id` int(11) NOT NULL,
  `fields` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`fields_id`, `fields`) VALUES
(1, '[\r\n\'سال تولید\',\r\n\'برند\',\r\n\'رنگ\',\r\n\'وضعیت شاسی\',\r\n\'نوع سوخت\',\r\n\'گیربکس\',\r\n\'بیمه\',\r\n\'مدل\'\r\n]'),
(2, '[\r\n\'برند\',\r\n\'مدل\'\r\n]'),
(3, '[\r\n\'برند\',\r\n\'رنگ\',\r\n\'نوع سوخت\',\r\n\'گیربکس\',\r\n\'بیمه\',\r\n\'مدل\'\r\n]'),
(4, '[\n\'برند\',\n\'حافظه داخلی\',\n\'مقدار رم\',\n\'تعداد سیمکارت\',\n\'اندازه صفحه\',\n\'سیستم عامل\',\n\'پردازنده\',\n\'پردازنده گرافیکی\'\n]'),
(5, '[\n\'برند\',\n\'حافظه داخلی\',\n\'مقدار رم\',\n\'اندازه صفحه\',\n\'سیستم عامل\',\n\'پردازنده\',\n\'پردازنده گرافیکی\'\n]'),
(6, '[\r\n\'برند\',\r\n\'مدل\',\r\n\'تعداد دسته همراه\',\r\n\'نوع دسته\'\r\n]'),
(7, '[\n\'حافظه داخلی\',\n\'مقدار رم\',\n\'سیستم عامل\',\n\'پردازنده\',\n\'پردازنده گرافیکی\'\n]'),
(8, '[\r\n]'),
(9, '[\r\n\'تعداد روز\'\r\n]');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(30) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(25) NOT NULL,
  `address` text NOT NULL,
  `status` varchar(25) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `user_id` varchar(15) NOT NULL,
  `categories_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `title`, `description`, `price`, `address`, `status`, `data`, `user_id`, `categories_id`) VALUES
('2P2FyyAX5', 'سامسونگ M11', 'گوشی دست دوم هست و بدون هیچ مشکلی', '2500000', 'سیدی، اصلانی 62', 'دست دوم', '{\"مدل\":\"A55\",\"برند\":\"سامسونگ\"}', '1', 4),
('aGifszL5X', 'کفش', 'گوشی دست دوم هست و بدون هیچ مشکلی', '2500000', 'سیدی، اصلانی 62', 'نو', '{\"برند\":\"سامسونگ\"}', '1', 6),
('o8xf0JGpj', 'پژو 405SLX', 'ماشین خواب بوده', '400000000', 'سیدی، اصلانی 62', 'کارکرده', '{\"سال تولید\":\"1395\",\"برند\":\"پژو\",\"رنگ\":\"نقره ای\",\"وضعیت شاسی\":\"سالم\",\"نوع سوخت\":\"بنزین\",\"گیربکس\":\"دنده ای\",\"بیمه\":\"6 ماه\",\"مدل\":\"405SLX\"}', '1', 4);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_name` varchar(15) NOT NULL,
  `access` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_name`, `access`) VALUES
('admin', '[\n\'/user/logout\',\n\'/user/update\',\n\'/user/getinfo\',\n\'/user/remove\',\n\'/post/add\',\n\'/post/update\',\n\'/post/remove\',\n\'/post/selectdata\',\n\'/post/data\'\n]'),
('visitor', '[\n\'/user/login\',\n\'/user/signup\',\n\'/post/selectdata\',\n\'/post/data\'\n]');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `token` varchar(50) NOT NULL,
  `info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`token`, `info`) VALUES
('-hle-kZqs', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:22:10\",\"expired\":\"Mon, 06 May 2024 16:52:10 GMT\"}'),
('1', '1'),
('75VsXRJka', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:26:26\",\"expired\":\"Mon, 06 May 2024 16:56:26 GMT\"}'),
('8D-oB5ABA', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:33:33\",\"expired\":\"Mon, 06 May 2024 17:03:33 GMT\"}'),
('8KXTSeWm4', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/16\",\"time\":\"13:40:41\",\"expired\":\"Sun, 05 May 2024 10:10:41 GMT\"}'),
('9yO1Im6wl', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:21:20\",\"expired\":\"Mon, 06 May 2024 16:51:20 GMT\"}'),
('dzXWQPyNP', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:33:21\",\"expired\":\"Mon, 06 May 2024 17:03:21 GMT\"}'),
('EUUzVbprq', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:54:11\",\"expired\":\"Sat, 27 Apr 2024 07:24:11 GMT\"}'),
('f8blm7K_g', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:24:29\",\"expired\":\"Mon, 06 May 2024 16:54:29 GMT\"}'),
('fc0Cwengh', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"11:01:49\",\"expired\":\"Sat, 27 Apr 2024 07:31:49 GMT\"}'),
('hOI9qYGP6', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/06\",\"time\":\"22:41:41\",\"expired\":\"Fri, 26 Apr 2024 19:11:41 GMT\"}'),
('Iduwo_tAN', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:16:11\",\"expired\":\"Mon, 06 May 2024 16:46:11 GMT\"}'),
('jtJ-ADBEB', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:48:53\",\"expired\":\"Sat, 27 Apr 2024 07:18:53 GMT\"}'),
('mFHQ_K9q_', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:24:43\",\"expired\":\"Mon, 06 May 2024 16:54:43 GMT\"}'),
('MIdk0EBCG', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:45:08\",\"expired\":\"Mon, 06 May 2024 17:15:08 GMT\"}'),
('MnI71PYCF', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:53:22\",\"expired\":\"Sat, 27 Apr 2024 07:23:22 GMT\"}'),
('obVF5xBN_', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:25:49\",\"expired\":\"Mon, 06 May 2024 16:55:49 GMT\"}'),
('oE-PnGTWt', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/07\",\"time\":\"23:01:23\",\"expired\":\"Fri, 26 Apr 2024 19:31:23 GMT\"}'),
('OIuvoJeYL', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:53:52\",\"expired\":\"Sat, 27 Apr 2024 07:23:52 GMT\"}'),
('OtSbCznwd', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:35:04\",\"expired\":\"Mon, 06 May 2024 17:05:04 GMT\"}'),
('pzBfVOpSp', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"11:00:26\",\"expired\":\"Sat, 27 Apr 2024 07:30:26 GMT\"}'),
('rHJYpwJ_J', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:19:06\",\"expired\":\"Mon, 06 May 2024 16:49:06 GMT\"}'),
('SBtOiljWu', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:45:48\",\"expired\":\"Mon, 06 May 2024 17:15:48 GMT\"}'),
('t6O9x10c2', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:21:50\",\"expired\":\"Mon, 06 May 2024 16:51:50 GMT\"}'),
('TjntpwBUz', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:56:48\",\"expired\":\"Sat, 27 Apr 2024 07:26:48 GMT\"}'),
('W7LfZBqCz', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:43:06\",\"expired\":\"Mon, 06 May 2024 17:13:06 GMT\"}'),
('X45K-xcR2', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:27:26\",\"expired\":\"Mon, 06 May 2024 16:57:26 GMT\"}'),
('XRS0ega9D', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:58:17\",\"expired\":\"Sat, 27 Apr 2024 07:28:17 GMT\"}'),
('ZqIYOuQw2', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/17\",\"time\":\"20:34:28\",\"expired\":\"Mon, 06 May 2024 17:04:28 GMT\"}'),
('_aipz-QgH', '{\"role\":\"visitor\",\"user_id\":\"\",\"date\":\"1403/02/08\",\"time\":\"10:47:38\",\"expired\":\"Sat, 27 Apr 2024 07:17:38 GMT\"}');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `state_name`) VALUES
(1, 'تهران'),
(2, 'خراسان رضوی'),
(3, 'اصفهان'),
(4, 'فارس'),
(5, 'خوزستان'),
(6, 'آذربایجان شرقی'),
(7, 'مازندران'),
(8, 'آذربایجان غربی'),
(9, 'سیستان و بلوچستان'),
(10, 'البرز'),
(11, 'گیلان'),
(12, 'کرمانشاه'),
(13, 'گلستان'),
(14, 'هرمزگان'),
(15, 'لرستان'),
(16, 'همدان'),
(17, 'کردستان'),
(18, 'مرکزی'),
(19, 'قم'),
(20, 'قزوین'),
(21, 'اردبیل	'),
(22, 'بوشهر'),
(23, 'یزد'),
(24, 'زنجان'),
(25, 'چهارمحال و بختیاری'),
(26, 'خراسان شمالی'),
(27, 'خراسان جنوبی'),
(28, 'کهگیلویه و بویراحمد'),
(29, 'سمنان'),
(30, 'ایلام'),
(31, 'کرمان');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(15) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `role_name` varchar(15) NOT NULL,
  `user` varchar(15) NOT NULL,
  `pass` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `phone_number`, `city_id`, `role_name`, `user`, `pass`) VALUES
('1', 'امیر نوروزی', '09054518642', 2, 'admin', 'A.noroozi', 'AmirAgha');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`),
  ADD KEY `FK_2` (`category_id`),
  ADD KEY `fk_fields_id` (`fields_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `FK_1` (`state_id`);

--
-- Indexes for table `fields`
--
ALTER TABLE `fields`
  ADD PRIMARY KEY (`fields_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_4` (`user_id`),
  ADD KEY `fk_10` (`categories_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_1` (`city_id`),
  ADD KEY `fk_role_name` (`role_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `fields`
--
ALTER TABLE `fields`
  MODIFY `fields_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `FK_9` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `fk_fields_id` FOREIGN KEY (`fields_id`) REFERENCES `fields` (`fields_id`);

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `categories_id_add` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`),
  ADD CONSTRAINT `fk_10` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_7_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  ADD CONSTRAINT `fk_role_name` FOREIGN KEY (`role_name`) REFERENCES `roles` (`role_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
