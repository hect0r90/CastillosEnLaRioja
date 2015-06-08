-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Apr 2015 um 14:01
-- Server Version: 5.6.11
-- PHP-Version: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `castillos`
--
CREATE DATABASE IF NOT EXISTS `castillos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `castillos`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `castillo`
--

CREATE TABLE IF NOT EXISTS `castillo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_construccion` varchar(255) NOT NULL,
  `fecha_construccion_desc` text NOT NULL,
  `estado_conservacion` int(1) NOT NULL,
  `estado_conservacion_desc` text NOT NULL,
  `localidad` varchar(255) NOT NULL,
  `pagina_web` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Daten für Tabelle `castillo`
--

INSERT INTO `castillo` (`id`, `nombre`, `descripcion`, `fecha_construccion`, `fecha_construccion_desc`, `estado_conservacion`, `estado_conservacion_desc`, `localidad`, `pagina_web`, `imagen`, `latitud`, `longitud`) VALUES
(9, 'Castillo de Aguas Mansas', 'El castillo de Arnedo es una fortificaciÃ³n de EspaÃ±a, localizada en la ciudad de Arnedo, en La Rioja. Domina la ciudad y el curso del rÃ­o Cidacos.3 Las primeras construcciones defensivas que se construyeron en la colina donde hoy en dÃ­a se encuentra el castillo se remontan a la Ã©poca romana.1 4 DespuÃ©s de la invasiÃ³n Ã¡rabe, Ã©stos reconstruyeron â€”se considera al siglo IX fecha de la construcciÃ³nâ€”2 sobre los restos anteriores una nueva fortaleza defensiva.2 Durante la Edad Media fue el castillo mÃ¡s importante de la regiÃ³n5 y pasÃ³ de manos Ã¡rabes a cristianas y viceversa en varias ocasiones durante la Reconquista.5 6 7', 'IX', '', 1, '', '', 'http://www.google.es', '', 42.44611, -2.29139),
(10, 'Castillo de Cornago', '', '', '', 1, '', '', '', '', 42.066149, -2.096262),
(13, 'Castillo de Arnedo', '', 'IX', '', 2, 'test', '', '', 'Castillo-de-Arnedo-La-Rioja.jpg', 42.228889, -2.096528);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
