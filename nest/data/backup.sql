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
DROP DATABASE IF EXISTS `core_project_BAN_00341`;
CREATE DATABASE IF NOT EXISTS `core_project_BAN_00341` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `core_project_BAN_00341`;

-- Dumping structure for table core_project_BAN_00341.mod_catalog_category
DROP TABLE IF EXISTS `mod_catalog_category`;
CREATE TABLE IF NOT EXISTS `mod_catalog_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c2790cdc734e91c27e59e6e4d4` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalog_category: ~0 rows (approximately)
INSERT INTO `mod_catalog_category` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Tecnología y Electrónica', 'Tecnología y Electrónica'),
	(2, 'Hogar y Cocina', 'Hogar y Cocina'),
	(3, 'Moda y Accesorios', 'Moda y Accesorios'),
	(4, 'Salud y Cuidado Personal', 'Salud y Cuidado Personal'),
	(5, 'Deportes y Fitness', 'Deportes y Fitnessl'),
	(6, 'Juguetes y Hobbies', 'Juguetes y Hobbies'),
	(7, 'Alimentos y Bebidas (Gourmet)', 'Alimentos y Bebidas (Gourmet)'),
	(8, 'Automotriz y Herramientas', 'Automotriz y Herramientas'),
	(9, 'Mascotas', 'Mascotas'),
	(10, 'Papelería y Oficina', 'Papelería y Oficina');

-- Dumping structure for table core_project_BAN_00341.mod_catalog_product
DROP TABLE IF EXISTS `mod_catalog_product`;
CREATE TABLE IF NOT EXISTS `mod_catalog_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) NOT NULL,
  `marca` int(11) NOT NULL,
  `contenido_por_unidad` int(11) NOT NULL,
  `medida_de_unidad` int(11) NOT NULL,
  `es_perecedero` tinyint(4) NOT NULL,
  `id_category` int(11) NOT NULL,
  `alerta_verde_dias` int(11) NOT NULL,
  `alerta_amarilla_dias` int(11) NOT NULL,
  `alerta_roja_dias` int(11) NOT NULL,
  `alerta_verde_unidades` int(11) NOT NULL,
  `alerta_amarilla_unidades` int(11) NOT NULL,
  `alerta_roja_unidades` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalog_product: ~0 rows (approximately)

-- Dumping structure for table core_project_BAN_00341.mod_catalog_supplier
DROP TABLE IF EXISTS `mod_catalog_supplier`;
CREATE TABLE IF NOT EXISTS `mod_catalog_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nit` bigint(20) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_catalog_supplier: ~0 rows (approximately)
INSERT INTO `mod_catalog_supplier` (`id`, `nit`, `razon_social`, `direccion`, `telefono`, `correo`) VALUES
	(1, 100001, 'Proveedor 1', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor1@gmail.com'),
	(2, 100002, 'Proveedor 2', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor2@gmail.com'),
	(3, 100003, 'Proveedor 3', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor3@gmail.com'),
	(4, 100004, 'Proveedor 4', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor4@gmail.com'),
	(5, 100005, 'Proveedor 5', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor5@gmail.com'),
	(6, 100006, 'Proveedor 6', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor6@gmail.com'),
	(7, 100007, 'Proveedor 7', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor7@gmail.com'),
	(8, 100008, 'Proveedor 8', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor8@gmail.com'),
	(9, 100009, 'Proveedor 9', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor9@gmail.com'),
	(10, 1000010, 'Proveedor 10', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor10@gmail.com'),
	(11, 1000011, 'Proveedor 11', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor11@gmail.com'),
	(12, 1000012, 'Proveedor 12', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor12@gmail.com'),
	(13, 1000013, 'Proveedor 13', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor13@gmail.com'),
	(14, 1000014, 'Proveedor 14', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor14@gmail.com'),
	(15, 1000015, 'Proveedor 15', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor15@gmail.com'),
	(16, 1000016, 'Proveedor 16', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor16@gmail.com'),
	(17, 1000017, 'Proveedor 17', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor17@gmail.com'),
	(18, 1000018, 'Proveedor 18', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor18@gmail.com'),
	(19, 1000019, 'Proveedor 19', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor19@gmail.com'),
	(20, 1000020, 'Proveedor 20', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor20@gmail.com'),
	(21, 1000021, 'Proveedor 21', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor21@gmail.com'),
	(22, 1000022, 'Proveedor 22', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor22@gmail.com'),
	(23, 1000023, 'Proveedor 23', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor23@gmail.com'),
	(24, 1000024, 'Proveedor 24', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor24@gmail.com'),
	(25, 1000025, 'Proveedor 25', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor25@gmail.com'),
	(26, 1000026, 'Proveedor 26', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor26@gmail.com'),
	(27, 1000027, 'Proveedor 27', 'calle 32 a # 52 - 105', '607 38542525', 'proveedor27@gmail.com');

-- Dumping structure for table core_project_BAN_00341.mod_permisos_modulo
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo: ~21 rows (approximately)
INSERT INTO `mod_permisos_modulo` (`id`, `nombre`, `permiso`, `tiene_submodulos`, `tiene_permisos`, `descripcion`, `modulo_padre_id`) VALUES
	(1, 'Usuarios', 'usuarios', 1, 0, 'Modulo usuarios', NULL),
	(2, 'Administradores', 'administradores', 0, 1, 'Submodulo administradores, modulo usuarios', 1),
	(3, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo administradores, modulo usuarios', 2),
	(4, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo administradores, modulo usuarios', 2),
	(5, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo administradores, modulo usuarios', 2),
	(6, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2),
	(8, 'Estado (usuario)', 'estado_usuario', 0, 0, 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2),
	(9, 'Permisos (asignar)', 'asignar_permisos', 0, 0, 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(10, 'Finales', 'finales', 0, 1, 'Submodulo finales, modulo usuarios', 1),
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
	(25, 'Categorias', 'categorias', 0, 1, 'Submodulo categorias, modulo catalogo', 22),
	(26, 'Proveedores', 'proveedores', 0, 1, 'Submodulo categorias, modulo proveedores', 22);

-- Dumping structure for table core_project_BAN_00341.mod_permisos_modulo_asignacion
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo_asignacion: ~24 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`) VALUES
	(2, 'Administradores', 'administradores', 'Submodulo administradores, modulo usuarios', 1, 1),
	(4, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 2, 1),
	(5, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 2, 1),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2, 1),
	(8, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2, 1),
	(9, 'Permisos (asignar)', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 1),
	(11, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 10, 1),
	(13, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 10, 1),
	(17, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 1),
	(18, 'Crear', 'crear', 'Permiso crear, modulo modulos', 17, 1),
	(19, 'Editar', 'editar', 'Permiso editar, modulo modulos', 17, 1),
	(31, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 10, 1),
	(39, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar multiple, submodulo finales, modulo usuarios', 10, 1),
	(42, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 17, 1),
	(45, 'Modulos', 'modulos', 'Modulo modulos', NULL, 1),
	(47, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 2, 1),
	(61, 'Administradores', 'administradores', 'Submodulo administradores, modulo usuarios', 1, 19),
	(63, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 19),
	(64, 'Finales', 'finales', 'Submodulo finales, modulo usuarios', 1, 19),
	(66, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 19),
	(79, 'Modulos', 'modulos', 'Modulo modulos', NULL, 19),
	(81, 'Finales', 'finales', 'Submodulo finales, modulo usuarios', 1, 1),
	(82, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 1),
	(83, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1);

-- Dumping structure for table core_project_BAN_00341.mod_stock_management_inventory
DROP TABLE IF EXISTS `mod_stock_management_inventory`;
CREATE TABLE IF NOT EXISTS `mod_stock_management_inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_category` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_supplier` int(11) NOT NULL,
  `lote` int(11) NOT NULL,
  `fecha_fabricacion` int(11) NOT NULL,
  `fecha_ingreso` int(11) NOT NULL,
  `fecha_vencimiento` int(11) NOT NULL,
  `cantidad_comprada` int(11) NOT NULL,
  `cantidad_vendida` int(11) NOT NULL,
  `cantidad_perdida` int(11) NOT NULL,
  `cantidad_consumible` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_stock_management_inventory: ~0 rows (approximately)

-- Dumping structure for table core_project_BAN_00341.mod_stock_management_loss
DROP TABLE IF EXISTS `mod_stock_management_loss`;
CREATE TABLE IF NOT EXISTS `mod_stock_management_loss` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `motivo` int(11) NOT NULL,
  `lote` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_inventory` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table core_project_BAN_00341.mod_stock_management_loss: ~0 rows (approximately)

-- Dumping structure for table core_project_BAN_00341.mod_usuarios_admin
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

-- Dumping data for table core_project_BAN_00341.mod_usuarios_admin: ~13 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(2, 'admin2', 'admin2', 'admin2@correo.com', 'Qwerty9601', 1),
	(3, 'admin3', 'admin3', 'admin3@correo.com', 'Qwerty9601', 1),
	(4, 'Admin4', 'Admin4', 'admin4@gmail.com', 'Qwerty9601', 1),
	(6, 'Admin5', 'Admin5', 'admin5@gmail.com', 'Qwerty9601', 1),
	(7, 'Admin6', 'Admin6', 'admin6@gmail.com', 'Qwerty9601', 1),
	(8, 'Admin7', 'Admin7', 'admin7@gmail.com', 'Qwerty9601', 1),
	(9, 'Admin8', 'Admin8', 'admin8@gmail.com', 'Qwerty9601', 1),
	(10, 'Admin9', 'Admin9', 'admin9@gmail.com', 'Qwerty9601', 1),
	(11, 'Admin10', 'Admin10', 'admin10@gmail.com', 'Qwerty9601', 1),
	(12, 'Admin11', 'Admin11', 'admin11@gmail.com', 'Qwerty9601', 1),
	(18, 'admin12', 'admin12', 'admin12@gmail.com', 'Qwerty9601.', 1),
	(19, 'Donald', 'Trump', 'donald@correo.com', 'Qwerty9601', 1);

-- Dumping structure for table core_project_BAN_00341.mod_usuarios_user
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

-- Dumping data for table core_project_BAN_00341.mod_usuarios_user: ~19 rows (approximately)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1),
	(3, 'final3', 'final3', 'final3@gmail.com', 'Qwerty9601', 1),
	(4, 'final4', 'final4', 'final4@gmail.com', 'Qwerty9601', 1),
	(5, 'final5', 'final5', 'final5@gmail.com', 'Qwerty9601', 1),
	(6, 'final6', 'final6', 'final6@gmail.com', 'Qwerty9601', 1),
	(7, 'final7', 'final7', 'final7@gmail.com', 'Qwerty9601', 1),
	(8, 'final8', 'final8', 'final8@gmail.com', 'Qwerty9601', 1),
	(9, 'final9', 'final9', 'final9@gmail.com', 'Qwerty9601', 1),
	(10, 'final10', 'final10', 'final10@gmail.com', 'Qwerty9601', 1),
	(11, 'final11', 'final11', 'final11@gmail.com', 'Qwerty9601', 0),
	(12, 'final12', 'final12', 'final12@gmail.com', 'Qwerty9601', 0),
	(14, 'final13', 'final13', '13@gmail.com', 'Qwerty9601', 1),
	(15, 'final14', 'final14', '14@gmail.com', 'Qwerty9601', 1),
	(16, 'final15', 'final15', '15@gmail.com', 'Qwerty9601', 1),
	(17, 'final16', 'final16', '16@gmail.com', 'Qwerty9601', 1),
	(18, 'final17', 'final17', '17@gmail.com', 'Qwerty9601', 1),
	(19, 'final18', 'final18', '18@gmail.com', 'Qwerty9601', 1),
	(20, 'final19', 'final19', '19@gmail.com', 'Qwerty9601', 1),
	(21, 'final20', 'final20', '20@gmail.com', 'Qwerty9601', 1),
	(22, 'final21', 'final21', '21@gmail.com', 'Qwerty9601', 1),
	(23, 'final22', 'final22', '22@gmail.com', 'Qwerty9601', 1),
	(24, 'final23', 'final23', '23@gmail.com', 'Qwerty9601', 1),
	(25, 'final24', 'final24', '24@gmail.com', 'Qwerty9601', 1),
	(26, 'final25', 'final25', '25@gmail.com', 'Qwerty9601', 1),
	(27, 'final26', 'final26', '26@gmail.com', 'Qwerty9601', 1),
	(28, 'final28', 'final28', '28@gmail.com', 'Qwerty9601', 1),
	(29, 'final29', 'final29', '29@gmail.com', 'Qwerty9601', 1),
	(30, 'final30', 'final30', '30@gmail.com', 'Qwerty9601', 1),
	(31, 'final31', 'final31', '31@gmail.com', 'Qwerty9601', 1),
	(32, 'final32', 'final32', '32@gmail.com', 'Qwerty9601', 1),
	(33, 'final33', 'final33', '33@gmail.com', 'Qwerty9601', 1),
	(34, 'final34', 'final34', '34@gmail.com', 'Qwerty9601', 1),
	(35, 'final35', 'final35', '35@gmail.com', 'Qwerty9601', 1),
	(36, 'final36', 'final36', '36@gmail.com', 'Qwerty9601', 1),
	(37, 'final37', 'final37', '37@gmail.com', 'Qwerty9601', 1),
	(38, 'final38', 'final38', '38@gmail.com', 'Qwerty9601', 0),
	(58, 'final39', 'final39', '39@gmail.com', 'Qwerty9601.', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
