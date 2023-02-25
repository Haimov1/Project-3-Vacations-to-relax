-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2023 at 06:12 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(5) DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(4, 'Yuval', 'Haimov', 'Haimov199@gmail.com', '1785585a015c086b05d4522a8b7743b5dc7f30a077609684cc0852ab82beee6a42a11f44e5f3ec702797ce0fc786e8dc519d8bedbb70e7d9b00e4192263397db', 'User'),
(5, 'Yuval', 'Haimov', 'Haimov1999@gmail.com', '1785585a015c086b05d4522a8b7743b5dc7f30a077609684cc0852ab82beee6a42a11f44e5f3ec702797ce0fc786e8dc519d8bedbb70e7d9b00e4192263397db', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `vacationDetails`
--

CREATE TABLE `vacationDetails` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(450) NOT NULL,
  `startVacation` date NOT NULL,
  `endVacation` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacationDetails`
--

INSERT INTO `vacationDetails` (`vacationId`, `destination`, `description`, `startVacation`, `endVacation`, `price`, `imageName`) VALUES
(1, 'Paris', 'It’s a prime destination for travelers from around the world. The Eiffel Tower, Louvre, Le Marais, Champs-Élysées, Arc de Triomphe are some of the sights to see when visiting Paris. No trip to the City of Light is complete without a stroll on the ornate Pont Alexandre III Bridge, over the serene Seine River.\r\n\r\n', '2023-01-29', '2023-02-05', '1200.00', 'f7ebff58-0f54-4c33-8311-61c3fd58992c.jpeg'),
(2, 'New York City', 'New York City is the full of culture and diversity. Broadway, the Statue of Liberty, Ellis Island, the Empire State Building, Rockefeller Center, Ground Zero, Harlem, Central Park and SoHo shopping are great reasons to visit the Big Apple. Venture out beyond Manhattan and experience the flavor of Brooklyn and NYC’s other boroughs.', '2023-02-06', '2023-02-13', '2400.00', '75134fa2-a044-4ae9-9c73-cbe53fc8b6bf.jpeg'),
(3, 'Hawaii', 'The Big Island of Hawaii is always a popular destination for travelers. Maui, Oahu and Honolulu are a few Hawaiian hot spots to relax and unwind. There\'s something for everyone, including sunset paddling, the Hawaii Volcanoes National Park, USS Arizona Memorial, Panaewa Rainforest Zoo and Waimea Canyon.\r\n\r\n', '2023-02-15', '2023-02-22', '430.00', '1c1172b1-28f7-4870-aae6-5f24197f7d1f.jpeg'),
(4, 'Rome', 'This is Rome\'s famous Ponte Sant\'Angelo Bridge, leading to Castel Sant\'Angelo. Plan your trip to see more must-see attractions in the Eternal City, including the Vatican, Trevi Fountain, the Colosseum, Pantheon, National Museum of Rome, Sistine Chapel and Piazza Navona.\r\n\r\n', '2023-02-22', '2023-03-01', '580.00', 'e7b7c517-7be0-4030-a35a-4f01cc64d19c.jpeg'),
(5, 'Cancun, Mexico', 'Take a jungle tour swim with the dolphins go snorkeling in the second largest reef in the world or take a Party Hopper Tour of fun pubs in Cancun, Mexico. We also recommend that you indulge in a couple of relaxing days on the pristine, sandy shores of this popular destination.\r\n\r\n', '2023-03-01', '2023-03-08', '890.00', '8f0d976c-1409-4d61-98db-0b8d01df7d4b.jpeg'),
(6, 'Orlando', 'Epcot Center is just one of the magical Disney parks in Orlando. Looking for more family theme-park adventures? Then head to Magic Kingdom Park, Universal Studios Florida, SeaWorld and Disney’s Animal Kingdom Theme Park. Orlando is also a great destination for adults with dozens of places to visit a spa, golf, shop and it\'s also a popular destination for weddings.\r\n\r\n', '2023-03-08', '2023-03-15', '1890.00', '98113353-1904-4ea7-89e1-91a5396c72d2.jpeg'),
(7, 'London', 'Old and new worlds meet in London with a walk across the Millennium Bridge to the historic St. Paul\'s Cathedral. Looking for other things to do? Visit Buckingham Palace to see the changing of the guard; spend the day shopping around Piccadilly Circus; or get a view of Big Ben and Westminster palace from the London Eye.\r\n\r\n', '2023-03-15', '2023-03-22', '3800.00', '63e86396-25fa-4a64-a560-25419824466c.jpeg'),
(8, 'Miami', 'Miami is pulsating with nighttime energy, with hot restaurants and hotter clubs. Enjoy shopping on Lincoln Avenue; partying on Ocean Drive; sunbathing on South Beach; and visit Parrot and Monkey Jungle Islands.\r\n\r\n', '2023-03-22', '2023-03-29', '980.00', '4584dc93-a31c-43ff-831b-b6bcc0bba13c.jpeg'),
(9, 'Las Vegas', 'Luck can be more than a lady in Sin City. With dozens of posh hotels, casinos and a variety of buffets, Las Vegas is definitely a top destination for tourists. Go indoor skydiving; ride a rollercoaster at the Stratosphere Hotel Casino; stroll through the Bellagio\'s Botanical Gardens; or race your friends in a mini kart at the Las Vegas Mini Gran Prix.', '2023-03-29', '2023-04-05', '6000.00', '9ee2210a-fb55-4bcc-9aad-03b098d99282.jpeg'),
(10, 'San Francisco', 'Take in the view of San Francisco from high atop Mission Dolores. Plan your next adventure in the City by the Bay. Visit Golden Gate Park, the Castro neighborhood, Palace of Fine Arts, Embarcadero, Coit Tower, The Presidio, Muir Woods or take a ferry to Sausalito.', '2023-02-24', '2023-03-28', '760.00', 'f34dc5c6-b4ee-40ee-b8e7-cee5a615f8aa.jpeg'),
(11, 'Myrtle Beach, South Carolina', 'Myrtle Beach\'s Broadway at the Beach is 350 acres of fun with restaurants, movies, mini golf, music pavilions and more. Tourists come to this quaint Southern town to bathe in the sun on the beach. But there are dozens of other things to do and see, including the Carolina Opry, Family Kingdom Amusement Park & Water Park, Apache Family Campgrounds and Le Grande Cirque Adrenaline.\n\n', '2023-04-12', '2023-04-19', '2100.00', '74065cc5-a310-46ac-9b57-0f39319769b7.jpeg'),
(12, 'Plitvice Lakes, Croatia', 'The Plitvice Lakes can be found on Croatia’s Adriatic Sea coast, just lingering on the border between Zadar and the nation’s capital, Zagreb.\r\n\r\nThese lakes consist of 16 bodies of water that are all joined together by a variety of cascading waterfalls and fascinating bridges, flanked by age-old emerald forests that hold wildlife aplenty: birds, wolves, bears, and more!', '2023-03-31', '2023-04-07', '123.00', 'c3666723-5d46-49f9-a250-a31486de6391.jpeg'),
(13, 'Branson, Missouri', 'Branson, Missouri, is a lively vacation spot with theme-park fun, live theater and the Showboat Branson Belle. It\'s not only known as a country music hot spot, but it\'s also great for whitewater rafting, ziplining, catching a show at the Amazing Waltzing Waters or visiting the World\'s Largest Antique Toy Museum.\r\n\r\n', '2023-04-26', '2023-05-03', '830.00', '1fe06747-6506-47e7-94ab-efcddbab8bd6.jpeg'),
(14, 'Puerto Rico', 'Morro Castle, Turtle Beach, Old San Juan, El Yunque Tropical Rainforest and Rio Cumuy Cave Park are some must-see sights in Puerto Rico. The Vieques Biobay is also a popular destination and one of a few bioluminescent bays in the world. Go midnight kayaking or take a dive into the glowing green waters of Mosquito Bay. It\'s one of the most amazing experiences Puerto Rico has to offer.\r\n\r\n', '2023-05-03', '2023-05-10', '420.00', 'db59663d-cb11-48e0-8ff5-ce733899ecbd.jpeg'),
(15, 'Rhodes', 'The most popular of the Dodecanese Islands and one of the most popular of all the Greek islands, Rhodes is a multifaceted place, almost like a small country, with a history that has stirred romantics for centuries. It also has some of the best beaches the most interesting archaeological sites in Greece, fine restaurants and an intense nightlife.\r\n\r\n', '2023-05-10', '2023-05-17', '640.00', 'e6cf086c-5221-413b-b3b7-0769dfda4408.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacationDetails`
--
ALTER TABLE `vacationDetails`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `vacationDetails`
--
ALTER TABLE `vacationDetails`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacationDetails` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
