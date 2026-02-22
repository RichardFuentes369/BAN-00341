-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.14-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
-- SO del servidor:              debian-linux-gnu
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para core_project_BAN_00341
DROP DATABASE IF EXISTS `core_project_BAN_00341`;
CREATE DATABASE IF NOT EXISTS `core_project_BAN_00341` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `core_project_BAN_00341`;

-- Volcando estructura para tabla core_project_BAN_00341.mod_catalogo_categorias
DROP TABLE IF EXISTS `mod_catalogo_categorias`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1fd4865dcbc2b7722b210d9a08` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_catalogo_productos
DROP TABLE IF EXISTS `mod_catalogo_productos`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_barra` varchar(50) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `stock_minimo` int(11) NOT NULL,
  `unidad_medida` enum('unidad','kg','litro','paquete') NOT NULL DEFAULT 'kg',
  `id_categoria` int(11) NOT NULL,
  `marca` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_58c1252afc49ad323e7c5a3c0a` (`codigo_barra`),
  KEY `FK_e442e00427c9f85b6c8767ef9be` (`id_categoria`),
  CONSTRAINT `FK_e442e00427c9f85b6c8767ef9be` FOREIGN KEY (`id_categoria`) REFERENCES `mod_catalogo_categorias` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_catalogo_proveedores
DROP TABLE IF EXISTS `mod_catalogo_proveedores`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nit` bigint(20) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_20124d60355ae6fbf4410be1f5` (`nit`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_lote
DROP TABLE IF EXISTS `mod_lote`;
CREATE TABLE IF NOT EXISTS `mod_lote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_vencimiento` timestamp NOT NULL,
  `cantidad_inicial` int(11) NOT NULL DEFAULT 0,
  `stock_actual` int(11) NOT NULL DEFAULT 0,
  `costo_unitario` decimal(10,2) NOT NULL DEFAULT 0.00,
  `precio_venta_sugerido` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` enum('disponible','vencido','agotado') NOT NULL DEFAULT 'disponible',
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c092e4d64074c5be85e9116dd94` (`id_producto`),
  KEY `FK_2a6dab7c1ebe24649a8d88a5e51` (`id_proveedor`),
  CONSTRAINT `FK_2a6dab7c1ebe24649a8d88a5e51` FOREIGN KEY (`id_proveedor`) REFERENCES `mod_catalogo_proveedores` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_c092e4d64074c5be85e9116dd94` FOREIGN KEY (`id_producto`) REFERENCES `mod_catalogo_productos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_merma_mermas
DROP TABLE IF EXISTS `mod_merma_mermas`;
CREATE TABLE IF NOT EXISTS `mod_merma_mermas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `fecha_reporte` timestamp NOT NULL DEFAULT current_timestamp(),
  `valor_perdido` decimal(10,2) NOT NULL DEFAULT 0.00,
  `observaciones` text NOT NULL,
  `id_tipo_merma` int(11) NOT NULL,
  `id_lote` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f936b059227146a8e5f1ffaec0a` (`id_tipo_merma`),
  KEY `FK_c43c67defe5b3af684b4065015b` (`id_lote`),
  CONSTRAINT `FK_c43c67defe5b3af684b4065015b` FOREIGN KEY (`id_lote`) REFERENCES `mod_lote` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_f936b059227146a8e5f1ffaec0a` FOREIGN KEY (`id_tipo_merma`) REFERENCES `mod_merma_tipos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_merma_tipos
DROP TABLE IF EXISTS `mod_merma_tipos`;
CREATE TABLE IF NOT EXISTS `mod_merma_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d4131d037acc1ff2cb862fe550` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_permisos_modulo
DROP TABLE IF EXISTS `mod_permisos_modulo`;
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL,
  `tiene_submodulos` tinyint(4) NOT NULL DEFAULT 0,
  `tiene_permisos` tinyint(4) NOT NULL DEFAULT 0,
  `descripcion` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_28bd06971f76c49399db2715d90` (`modulo_padre_id`),
  CONSTRAINT `FK_28bd06971f76c49399db2715d90` FOREIGN KEY (`modulo_padre_id`) REFERENCES `mod_permisos_modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_permisos_modulo_asignacion
DROP TABLE IF EXISTS `mod_permisos_modulo_asignacion`;
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo_asignacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6eb0af2f8e13274ad1819f4cfca` (`user_id`),
  CONSTRAINT `FK_6eb0af2f8e13274ad1819f4cfca` FOREIGN KEY (`user_id`) REFERENCES `mod_usuarios_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_usuarios_admin
DROP TABLE IF EXISTS `mod_usuarios_admin`;
CREATE TABLE IF NOT EXISTS `mod_usuarios_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c885318c449a37e806a7f87607` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla core_project_BAN_00341.mod_usuarios_user
DROP TABLE IF EXISTS `mod_usuarios_user`;
CREATE TABLE IF NOT EXISTS `mod_usuarios_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_129e1f78d9bf43c04689f16cf8` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
