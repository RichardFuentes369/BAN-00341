-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.11.14-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for core_project_BAN_00341
CREATE DATABASE IF NOT EXISTS `core_project_BAN_00341` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `core_project_BAN_00341`;

-- Dumping structure for table core_project_BAN_00341.mod_catalogo_categorias
CREATE TABLE IF NOT EXISTS `mod_catalogo_categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1fd4865dcbc2b7722b210d9a08` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalogo_categorias: ~9 rows (approximately)
INSERT INTO `mod_catalogo_categorias` (`id`, `nombre`, `descripcion`) VALUES
	(2, 'Cárnicos', 'Carnes frías, embutidos y carnes rojas'),
	(66, 'blaSD', 'bla'),
	(67, 'ble', 'ble'),
	(68, 'bli', 'bli'),
	(69, 'blo', 'blo'),
	(70, 'll', 'll'),
	(71, 'lolo', 'lolo'),
	(72, 'uiu', 'iuiu'),
	(73, 'sds', 'sdsd');

-- Dumping structure for table core_project_BAN_00341.mod_catalogo_productos
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
) ENGINE=InnoDB AUTO_INCREMENT=7441 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalogo_productos: ~4 rows (approximately)
INSERT INTO `mod_catalogo_productos` (`id`, `codigo_barra`, `nombre`, `stock_minimo`, `unidad_medida`, `id_categoria`, `marca`) VALUES
	(4049, '7701234568017', 'Jamón de Cerdo Tradicional', 20, 'paquete', 2, 'Zenu'),
	(4058, '7701234568109', 'Jamón de Pavo Desgrasado', 15, 'paquete', 2, 'Pietrán'),
	(4061, '7701234568130', 'Muchacho de Res', 8, 'kg', 2, 'Carnes Bog'),
	(4080, '7701234568321', 'Butifarra de la Costa', 20, 'paquete', 2, 'La Especial');

-- Dumping structure for table core_project_BAN_00341.mod_catalogo_proveedores
CREATE TABLE IF NOT EXISTS `mod_catalogo_proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nit` bigint(20) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_20124d60355ae6fbf4410be1f5` (`nit`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalogo_proveedores: ~2 rows (approximately)
INSERT INTO `mod_catalogo_proveedores` (`id`, `nit`, `razon_social`, `direccion`, `correo`, `telefono`) VALUES
	(1, 9001234561, 'Distribuidora Alimentos Express S.A.', 'Calle 45 #10-20', 'ventas@alimentos.com', '6012345678'),
	(2, 1098785729, 'Industrias JB Sas', 'Calle 6 # 12 - 72 villabel', 'jb.business@gmail.com', '3504284093');

-- Dumping structure for table core_project_BAN_00341.mod_lote
CREATE TABLE IF NOT EXISTS `mod_lote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `costo_unitario` decimal(10,2) NOT NULL DEFAULT 0.00,
  `precio_venta_sugerido` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` enum('disponible','vencido','agotado') NOT NULL DEFAULT 'disponible',
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `lote` varchar(50) NOT NULL,
  `cantidad_comprada` int(11) NOT NULL DEFAULT 0,
  `cantidad_vendida` int(11) NOT NULL DEFAULT 0,
  `stock` int(11) NOT NULL DEFAULT 0,
  `fecha_entrada` bigint(20) NOT NULL,
  `fecha_vencimiento` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0fa3203835ac3fa160d1931dbb` (`lote`),
  KEY `FK_c092e4d64074c5be85e9116dd94` (`id_producto`),
  KEY `FK_2a6dab7c1ebe24649a8d88a5e51` (`id_proveedor`),
  CONSTRAINT `FK_2a6dab7c1ebe24649a8d88a5e51` FOREIGN KEY (`id_proveedor`) REFERENCES `mod_catalogo_proveedores` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_c092e4d64074c5be85e9116dd94` FOREIGN KEY (`id_producto`) REFERENCES `mod_catalogo_productos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_lote: ~3 rows (approximately)
INSERT INTO `mod_lote` (`id`, `costo_unitario`, `precio_venta_sugerido`, `estado`, `id_producto`, `id_proveedor`, `lote`, `cantidad_comprada`, `cantidad_vendida`, `stock`, `fecha_entrada`, `fecha_vencimiento`) VALUES
	(16, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000001', 250, 0, 250, 1775778954, 1775692554),
	(18, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000002', 250, 0, 250, 1775192154, 1776210954),
	(19, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000003', 250, 0, 250, 1775192154, NULL),
	(21, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000004', 250, 0, 250, 1775192154, 1776902154),
	(23, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000005', 250, 0, 250, 1775192154, 1776902154),
	(24, 3000.00, 6850.00, 'disponible', 4049, 1, '20000000006', 250, 0, 250, 1775192154, 1777506954);

-- Dumping structure for table core_project_BAN_00341.mod_merma_mermas
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_merma_mermas: ~0 rows (approximately)

-- Dumping structure for table core_project_BAN_00341.mod_merma_tipos
CREATE TABLE IF NOT EXISTS `mod_merma_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d4131d037acc1ff2cb862fe550` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_merma_tipos: ~10 rows (approximately)
INSERT INTO `mod_merma_tipos` (`id`, `nombre`) VALUES
	(1, 'Consumo Interno'),
	(2, 'Daño Físico / Rotura'),
	(3, 'Deterioro por Humedad'),
	(5, 'Devolución Proveedor'),
	(8, 'Error de Empaque'),
	(6, 'Falla de Cadena de Frío'),
	(9, 'Muestra Comercial'),
	(10, 'Plagas'),
	(11, 'Robo o Extravío'),
	(4, 'Vencimiento');

-- Dumping structure for table core_project_BAN_00341.mod_permisos_modulo
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo: ~62 rows (approximately)
INSERT INTO `mod_permisos_modulo` (`id`, `nombre`, `permiso`, `tiene_submodulos`, `tiene_permisos`, `descripcion`, `modulo_padre_id`) VALUES
	(1, 'Usuarios', 'usuarios', 1, 0, 'Modulo usuarios', NULL),
	(2, 'Administradores', 'administradores', 0, 1, 'Permiso administradores, modulo usuarios', 1),
	(3, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo administradores, modulo usuarios', 2),
	(4, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo administradores, modulo usuarios', 2),
	(5, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo administradores, modulo usuarios', 2),
	(6, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2),
	(8, 'Estado (usuario)', 'estado_usuario', 0, 0, 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2),
	(9, 'Permisos (asignar)', 'asignar_permisos', 0, 0, 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(10, 'Finales', 'finales', 0, 1, 'Permiso finales, modulo usuarios', 1),
	(11, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo finales, modulo usuarios', 10),
	(12, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo finales, modulo usuarios', 10),
	(13, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo finales, modulo usuarios', 10),
	(14, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10),
	(15, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar multiple, submodulo finales, modulo usuarios', 10),
	(16, 'Estado (usuario)', 'estado_usuario', 0, 0, 'Permiso estado usuario, submodulo finales, modulo usuarios', 10),
	(17, 'Modulos', 'modulos', 0, 1, 'Modulo modulos', NULL),
	(18, 'Ver', 'ver', 0, 0, 'Permiso ver, modulo modulos', 17),
	(19, 'Crear', 'crear', 0, 0, 'Permiso crear, modulo modulos', 17),
	(20, 'Editar', 'editar', 0, 0, 'Permiso editar, modulo modulos', 17),
	(21, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, modulo modulos', 17),
	(22, 'Catalogo', 'catalogo', 1, 0, 'Modulo catalogo', NULL),
	(25, 'Categorias', 'categorias', 0, 1, 'Permiso categorias, modulo catalogo', 22),
	(26, 'Proveedores', 'proveedores', 0, 1, 'Permiso proveedores, modulo catalogo', 22),
	(27, 'Productos (asignar)', 'asignar_productos', 0, 1, 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 25),
	(28, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo categorias, modulo catalogo', 25),
	(29, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo categorias, modulo catalogo', 25),
	(30, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo categorias, modulo catalogo', 25),
	(31, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 25),
	(32, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo categorias, modulo catalogo', 25),
	(33, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo proveedores, modulo catalogo', 26),
	(34, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo proveedores, modulo catalogo', 26),
	(35, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo proveedores, modulo catalogo', 26),
	(36, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 26),
	(37, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo proveedores, modulo catalogo', 26),
	(38, 'Productos', 'productos', 1, 1, 'Permiso productos, modulo catalogo', 22),
	(39, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo productos, modulo catalogo', 38),
	(40, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo productos, modulo catalogo', 38),
	(41, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo productos, modulo catalogo', 38),
	(42, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo productos, modulo catalogo', 38),
	(43, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 38),
	(44, 'Merma', 'merma', 1, 0, 'Modulo merma', NULL),
	(45, 'Tipos merma', 'tipo_merma', 0, 1, 'Permiso tipo_merma, modulo merma', 44),
	(46, 'Registro merma', 'registro_merma', 0, 1, 'Permiso registro_merma, modulo merma', 44),
	(47, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo tipo_merma, modulo merma', 45),
	(48, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo tipo_merma, modulo merma', 45),
	(49, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo tipo_merma, modulo merma', 45),
	(50, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 45),
	(51, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo tipo_merma, modulo merma', 45),
	(58, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo registro_merma, modulo merma', 46),
	(59, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo registro_merma, modulo merma', 46),
	(60, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo registro_merma, modulo merma', 46),
	(61, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 46),
	(62, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo registro_merma, modulo merma', 46),
	(63, 'Cargar (excel)', 'cargar_excel', 0, 0, 'Permiso cargar_excel, submodulo productos, modulo catalogo', 38),
	(64, 'Lote', 'lote', 0, 1, 'Modulo lote', NULL),
	(65, 'Ver', 'ver', 0, 0, 'ver', 64),
	(66, 'Crear', 'crear', 0, 0, 'crear', 64),
	(67, 'Editar', 'editar', 0, 0, 'editar', 64),
	(68, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'eliminar_individual', 64),
	(69, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'eliminar_multiple', 64),
	(75, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 0, 0, 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(78, 'Descargar (Reporte trazabilidad)', 'descarga_reporte_trazabilidad', 1, 0, 'descarga_reporte_trazabilidad', 64);

-- Dumping structure for table core_project_BAN_00341.mod_permisos_modulo_asignacion
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo_asignacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `id_modulo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6eb0af2f8e13274ad1819f4cfca` (`user_id`),
  CONSTRAINT `FK_6eb0af2f8e13274ad1819f4cfca` FOREIGN KEY (`user_id`) REFERENCES `mod_usuarios_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=426 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo_asignacion: ~107 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`, `id_modulo`) VALUES
	(1, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1, 1),
	(2, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 1, 1, 2),
	(3, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 1, 9),
	(241, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2, 1, 8),
	(242, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2, 1, 6),
	(243, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 2, 1, 5),
	(244, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 2, 1, 4),
	(245, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 2, 1, 3),
	(246, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 1, 1, 10),
	(247, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 10, 1, 11),
	(248, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 1, 12),
	(249, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 10, 1, 13),
	(250, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10, 1, 14),
	(252, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 10, 1, 16),
	(258, 'Ver', 'ver', 'ver', 64, 1, 65),
	(259, 'Crear', 'crear', 'crear', 64, 1, 66),
	(260, 'Editar', 'editar', 'editar', 64, 1, 67),
	(261, 'Eliminar (individual)', 'eliminar_individual', 'eliminar_individual', 64, 1, 68),
	(263, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 1, 18),
	(264, 'Crear', 'crear', 'Permiso crear, modulo modulos', 17, 1, 19),
	(265, 'Editar', 'editar', 'Permiso editar, modulo modulos', 17, 1, 20),
	(266, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 17, 1, 21),
	(305, 'Categorias', 'categorias', 'Permiso categorias, modulo catalogo', 22, 1, 25),
	(306, 'Productos (asignar)', 'asignar_productos', 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 25, 1, 27),
	(307, 'Ver', 'ver', 'Permiso ver, submodulo categorias, modulo catalogo', 25, 1, 28),
	(308, 'Crear', 'crear', 'Permiso crear, submodulo categorias, modulo catalogo', 25, 1, 29),
	(309, 'Editar', 'editar', 'Permiso editar, submodulo categorias, modulo catalogo', 25, 1, 30),
	(311, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 22, 1, 26),
	(312, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 26, 1, 33),
	(313, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 26, 1, 34),
	(314, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 26, 1, 35),
	(315, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 26, 1, 36),
	(316, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 22, 1, 38),
	(317, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 38, 1, 39),
	(318, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 38, 1, 40),
	(319, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 38, 1, 41),
	(321, 'Cargar (excel)', 'cargar_excel', 'Permiso cargar_excel, submodulo productos, modulo catalogo', 38, 1, 63),
	(322, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 44, 1, 45),
	(323, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 45, 1, 47),
	(324, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 45, 1, 48),
	(325, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 45, 1, 49),
	(326, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 45, 1, 50),
	(329, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 44, 1, 46),
	(330, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 46, 1, 58),
	(331, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 46, 1, 59),
	(332, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 46, 1, 60),
	(333, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 46, 1, 61),
	(354, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 2, 1),
	(355, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 1, 2, 2),
	(356, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 2, 2, 3),
	(357, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 2, 2, 4),
	(358, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 2, 2, 5),
	(359, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2, 2, 6),
	(360, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2, 2, 8),
	(361, 'Permisos (asignar)', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 2, 9),
	(363, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 1, 2, 10),
	(364, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 10, 2, 11),
	(365, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 2, 12),
	(366, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 10, 2, 13),
	(367, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10, 2, 14),
	(368, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 10, 2, 16),
	(369, 'Modulos', 'modulos', 'Modulo modulos', NULL, 2, 17),
	(370, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 2, 18),
	(371, 'Crear', 'crear', 'Permiso crear, modulo modulos', 17, 2, 19),
	(372, 'Editar', 'editar', 'Permiso editar, modulo modulos', 17, 2, 20),
	(373, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 17, 2, 21),
	(374, 'Lote', 'lote', 'Modulo lote', NULL, 2, 64),
	(375, 'Ver', 'ver', 'ver', 64, 2, 65),
	(376, 'Crear', 'crear', 'crear', 64, 2, 66),
	(377, 'Editar', 'editar', 'editar', 64, 2, 67),
	(378, 'Eliminar (individual)', 'eliminar_individual', 'eliminar_individual', 64, 2, 68),
	(379, 'Catalogo', 'catalogo', 'Modulo catalogo', NULL, 2, 22),
	(380, 'Categorias', 'categorias', 'Permiso categorias, modulo catalogo', 22, 2, 25),
	(381, 'Productos (asignar)', 'asignar_productos', 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 25, 2, 27),
	(383, 'Crear', 'crear', 'Permiso crear, submodulo categorias, modulo catalogo', 25, 2, 29),
	(384, 'Ver', 'ver', 'Permiso ver, submodulo categorias, modulo catalogo', 25, 2, 28),
	(385, 'Editar', 'editar', 'Permiso editar, submodulo categorias, modulo catalogo', 25, 2, 30),
	(386, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 25, 2, 31),
	(387, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 22, 2, 26),
	(388, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 26, 2, 33),
	(389, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 26, 2, 34),
	(390, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 26, 2, 35),
	(391, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 26, 2, 36),
	(392, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 22, 2, 38),
	(393, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 38, 2, 39),
	(394, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 38, 2, 40),
	(395, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 38, 2, 41),
	(396, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo productos, modulo catalogo', 38, 2, 42),
	(397, 'Cargar (excel)', 'cargar_excel', 'Permiso cargar_excel, submodulo productos, modulo catalogo', 38, 2, 63),
	(398, 'Merma', 'merma', 'Modulo merma', NULL, 2, 44),
	(399, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 44, 2, 45),
	(401, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 45, 2, 48),
	(402, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 45, 2, 47),
	(403, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 45, 2, 49),
	(404, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 45, 2, 50),
	(405, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 44, 2, 46),
	(406, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 46, 2, 58),
	(407, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 46, 2, 59),
	(408, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 46, 2, 60),
	(409, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 46, 2, 61),
	(411, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 2, 1, 75),
	(418, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 38, 1, 43),
	(420, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 25, 1, 31),
	(421, 'Modulos', 'modulos', 'Modulo modulos', NULL, 1, 17),
	(422, 'Catalogo', 'catalogo', 'Modulo catalogo', NULL, 1, 22),
	(423, 'Merma', 'merma', 'Modulo merma', NULL, 1, 44),
	(424, 'Lote', 'lote', 'Modulo lote', NULL, 1, 64);

-- Dumping structure for table core_project_BAN_00341.mod_usuarios_admin
CREATE TABLE IF NOT EXISTS `mod_usuarios_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c885318c449a37e806a7f87607` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_usuarios_admin: ~3 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(2, 'Admin2', 'Admin2', 'donald@correo.com', 'Qwerty9601', 1),
	(30, 'Mark', 'Zuckerberg', 'mark.zuckerbeg@correo.com', 'Qwerty9601', 0);

-- Dumping structure for table core_project_BAN_00341.mod_usuarios_user
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

-- Dumping data for table core_project_BAN_00341.mod_usuarios_user: ~13 rows (approximately)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1),
	(3, 'final3', 'final3', 'final3@gmail.com', 'Qwerty9601', 1),
	(4, 'final4', 'final4', 'final4@gmail.com', 'Qwerty9601', 1),
	(5, 'final5', 'final5', 'final5@gmail.com', 'Qwerty9601', 1),
	(11, 'final11', 'final11', 'final11@gmail.com', 'Qwerty9601', 1),
	(12, 'final12', 'final12', 'final12@gmail.com', 'Qwerty9601', 1),
	(14, 'final13', 'final13', '13@gmail.com', 'Qwerty9601', 1),
	(15, 'final14', 'final14', '14@gmail.com', 'Qwerty9601', 1),
	(16, 'final15', 'final15', '15@gmail.com', 'Qwerty9601', 1),
	(17, 'final16', 'final16', '16@gmail.com', 'Qwerty9601', 0),
	(18, 'final17', 'final17', '17@gmail.com', 'Qwerty9601', 0),
	(19, 'final18', 'final18', '18@gmail.com', 'Qwerty9601', 0),
	(20, 'final19', 'final19', '19@gmail.com', 'Qwerty9601', 0),
	(21, 'final20', 'final20', '20@gmail.com', 'Qwerty9601', 0),
	(22, 'final21', 'final21', '21@gmail.com', 'Qwerty9601', 0),
	(23, 'final22', 'final22', '22@gmail.com', 'Qwerty9601', 0),
	(24, 'final23', 'final23', '23@gmail.com', 'Qwerty9601', 0),
	(25, 'final24', 'final24', '24@gmail.com', 'Qwerty9601', 0),
	(26, 'final25', 'final25', '25@gmail.com', 'Qwerty9601', 0);

-- Dumping structure for procedure core_project_BAN_00341.sp_reporte_permisos_paginado
DELIMITER //
CREATE PROCEDURE `sp_reporte_permisos_paginado`(
    IN p_pagina_actual INT,
    IN p_registros_por_pagina INT,
    IN p_modulo VARCHAR(100),
    IN p_submodulo VARCHAR(100),
    IN p_permiso VARCHAR(100)
)
BEGIN
    -- Usamos INT normales para evitar conflictos de rango
    DECLARE v_offset INT;
    DECLARE v_limit INT;
    DECLARE v_total_registros INT;
    
    -- 1. LÓGICA DE PAGINACIÓN SEGURA
    -- Si no mandas límite, usamos 999,999,999 (Suficiente para cualquier reporte)
    IF p_registros_por_pagina IS NULL OR p_registros_por_pagina <= 0 THEN
        SET v_limit = 999999999; 
        SET v_offset = 0;
    ELSE
        SET v_limit = p_registros_por_pagina;
        SET v_offset = (IFNULL(p_pagina_actual, 1) - 1) * p_registros_por_pagina;
    END IF;

    -- 2. TABLA TEMPORAL
    DROP TEMPORARY TABLE IF EXISTS temp_reporte;
    
    CREATE TEMPORARY TABLE temp_reporte AS
    SELECT t.* FROM (
        SELECT
            CASE 
                WHEN mpma.modulo_padre_id IS NULL THEN (
                    SELECT mpm.nombre FROM mod_permisos_modulo mpm WHERE mpm.id = mpma.id_modulo
                )
                WHEN mpma.modulo_padre_id IN (SELECT id FROM mod_permisos_modulo WHERE modulo_padre_id IS NULL) THEN (
                    SELECT mpm.nombre FROM mod_permisos_modulo mpm WHERE mpm.id = mpma.modulo_padre_id
                )
                ELSE (
                    SELECT m_abuelo.nombre 
                    FROM mod_permisos_modulo m_padre
                    INNER JOIN mod_permisos_modulo m_abuelo ON m_padre.modulo_padre_id = m_abuelo.id
                    WHERE m_padre.id = mpma.modulo_padre_id
                )
            END AS MODULO,
            CASE
                WHEN mpma.modulo_padre_id IS NULL THEN '---'
                WHEN mpma.modulo_padre_id IS NOT NULL  
                    AND mpma.modulo_padre_id IN (SELECT id FROM mod_permisos_modulo WHERE modulo_padre_id IS NULL)
                    THEN (SELECT mpm.nombre FROM mod_permisos_modulo mpm WHERE mpm.id = mpma.id_modulo)
                ELSE (SELECT mpm.nombre FROM mod_permisos_modulo mpm WHERE mpm.id = mpma.modulo_padre_id)
            END AS SUBMODULO,
            mpma.nombre AS PERMISO,
            mpma.permiso AS IDENTIFICADOR,
            mua.email AS CORREO_USUARIO,
            CASE mua.isActive WHEN 1 THEN 'ACTIVO' ELSE 'INACTIVO' END AS ESTADO_USUARIO
        FROM mod_permisos_modulo_asignacion mpma
        INNER JOIN mod_usuarios_admin mua ON mpma.user_id = mua.id
    ) AS t
    WHERE 
        (p_modulo IS NULL OR t.MODULO = p_modulo) AND
        (p_submodulo IS NULL OR t.SUBMODULO = p_submodulo) AND
        (p_permiso IS NULL OR t.PERMISO LIKE CONCAT('%', p_permiso, '%'));

    -- 3. TOTALES
    SELECT COUNT(*) INTO v_total_registros FROM temp_reporte;

    -- 4. RESULTADO 1: METADATOS
    SELECT 
        v_total_registros AS total,
        IFNULL(p_registros_por_pagina, v_total_registros) AS perPage,
        IFNULL(p_pagina_actual, 1) AS currentPage,
        CEIL(v_total_registros / IFNULL(p_registros_por_pagina, v_total_registros)) AS lastPage;

    -- 5. RESULTADO 2: DATOS (Usando variables de usuario @ para el EXECUTE)
    SET @l = v_limit;
    SET @o = v_offset;
    
    PREPARE stmt FROM 'SELECT * FROM temp_reporte LIMIT ? OFFSET ?';
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    DROP TEMPORARY TABLE IF EXISTS temp_reporte;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
