-- phpMyAdmin SQL Dump
-- version 4.1.14.8
-- http://www.phpmyadmin.net
--
-- Servidor: db451435171.db.1and1.com
-- Tiempo de generación: 08-06-2015 a las 19:51:18
-- Versión del servidor: 5.1.73-log
-- Versión de PHP: 5.4.39-0+deb7u2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `db451435171`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `castillo`
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Volcado de datos para la tabla `castillo`
--

INSERT INTO `castillo` (`id`, `nombre`, `descripcion`, `fecha_construccion`, `fecha_construccion_desc`, `estado_conservacion`, `estado_conservacion_desc`, `localidad`, `pagina_web`, `imagen`, `latitud`, `longitud`) VALUES
(15, 'Castillo de Aguas Mansas', 'La planta del castillo es prÃ¡cticamente rectangular con cuatro torres con forma de prisma en cada esquina que aÃºn conservan sus matacanes. ConstruÃ­do en sillerÃ­a y en dos etapas, una primera a mediados del siglo XIV sobre una construcciÃ³n anterior y otra a fines del siglo XV. La torre mÃ¡s alta es de cuatro plantas y tiene una puerta de arco apuntado. La torre mÃ¡s pequeÃ±a denominada de las palomas conserva en buen estado algÃºn modillÃ³n que sostenÃ­a el matacÃ¡n.', 'XIII', 'Fue construido durante los siglos XIII y XIV.', 1, 'Monumento HistÃ³rico-ArtÃ­stico desde el 9 de marzo de 1983', 'Agoncillo', 'http://es.wikipedia.org/wiki/Castillo_de_Aguas_Mansas', 'Castillo_de_Aguas_Mansas.jpg', 42.44611, -2.29139),
(19, 'Castillo de Arnedo', 'Las primeras construcciones defensivas que se construyeron en la colina donde hoy en dÃ­a se encuentra el castillo se remontan a la Ã©poca romana. DespuÃ©s de la invasiÃ³n Ã¡rabe, Ã©stos reconstruyeron sobre los restos anteriores una nueva fortaleza defensiva.2 Durante la Edad Media fue el castillo mÃ¡s importante de la regiÃ³n y pasÃ³ de manos Ã¡rabes a cristianas y viceversa en varias ocasiones durante la Reconquista.', 'IX', 'Origen Ã¡rabe sobre restos romanos anteriores', 2, '', 'Arnedo', 'http://es.wikipedia.org/wiki/Castillo_de_Arnedo', 'Castillo-de-Arnedo-La-Rioja.jpg', 42.228889, -2.096528),
(23, 'Castillo de Cornago', 'El Castillo de Cornago se encuentra ubicado en lo mÃ¡s alto de la colina que sirve de base al pueblo. Sus muros son obra que revela una sÃ³lida construcciÃ³n y debieron prestar servicios muy importantes en las guerras de la Edad Media.', 'XV', '', 1, '', 'Cornago', 'http://www.cornago.org/El-castillo-de-Cornago.1651.0.html', 'Cornago_-_Castillo_43333808.jpg', 42.066149, -2.096262),
(24, 'Castillo de Leiva', 'Ubicado en el municipio de Leiva, en la comunidad autÃ³noma de La Rioja, (EspaÃ±a).Palacio fuerte flanqueado por cuatro torres octÃ³gonas, una en cada lado y rodeado de fosos.\nFue solar de los seÃ±ores de Leiva.', 'XIV', 'Su arquitectura parece pertenecer a los siglos XIV y XV.', 1, '', 'Leiva', 'https://es.wikipedia.org/wiki/Castillo_de_Leiva', 'Leiva_-_Castillo_6153740.jpg', 42.501389, -3.046944),
(25, 'Castillo de Davalillo', 'Toda la fortaleza estÃ¡ construida en piedra de sillerÃ­a con relleno de morrillo. Tiene planta poligonal de siete lados.\n\nLa muralla aunque ha perdido sus almenas se encuentra en buen estado. Cuenta con torrecillas redondas de flanqueo en los Ã¡ngulos y en los centros de los lienzos, siendo todas macizas a excepciÃ³n de la que se encuentra a la izquierda frente a la entrada, que contaba con una aspillera. En la parte interior de la muralla hay varias hileras de mechinales, mÃ©nsulas y rozas que hacen suponer la existencia de construcciones complementarias para habitaciÃ³n de la guarniciÃ³n, cuadras y almacenes.', 'IX', 'Es probable que fuese construido durante el reinado de Alfonso VIII entre finales del siglo XII y comienzos del siglo XIII, para proteger Castilla de los ataques navarros que se producÃ­an a travÃ©s del puente de San Vicente,', 2, '', 'San Asensio', 'https://es.wikipedia.org/wiki/Castillo_de_Davalillo', '1024px-Castillo_de_Davalillo.JPG', 42.538611, -2.7325);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
