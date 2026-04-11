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

-- Dumping data for table BAN_00341.mod_catalogo_categorias: ~0 rows (approximately)

-- Dumping data for table BAN_00341.mod_catalogo_productos: ~0 rows (approximately)

-- Dumping data for table BAN_00341.mod_catalogo_proveedores: ~0 rows (approximately)

-- Dumping data for table BAN_00341.mod_lote: ~0 rows (approximately)

-- Dumping data for table BAN_00341.mod_merma_mermas: ~0 rows (approximately)

-- Dumping data for table BAN_00341.mod_merma_tipos: ~0 rows (approximately)
INSERT INTO `mod_merma_tipos` (`id`, `nombre`) VALUES
	(1, 'Consumo Interno'),
	(2, 'Daño Físico / Rotura'),
	(3, 'Deterioro por Humedad'),
	(4, 'Devolución Proveedor'),
	(5, 'Error de Empaque'),
	(6, 'Falla de Cadena de Frío'),
	(7, 'Muestra Comercial'),
	(8, 'Plagas'),
	(9, 'Robo o Extravío'),
	(10, 'Vencimiento');

-- Dumping data for table BAN_00341.mod_permisos_modulo: ~0 rows (approximately)
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

-- Dumping data for table BAN_00341.mod_permisos_modulo_asignacion: ~0 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `id_modulo`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'Usuarios', 'usuarios', 'Modulo usuarios', 1, NULL, 1),
	(3, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 9, 2, 1),
	(241, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 8, 2, 1),
	(242, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 6, 2, 1),
	(243, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 5, 2, 1),
	(244, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 4, 2, 1),
	(245, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 3, 2, 1),
	(247, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 11, 10, 1),
	(248, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 12, 10, 1),
	(249, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 13, 10, 1),
	(250, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 14, 10, 1),
	(252, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 16, 10, 1),
	(258, 'Ver', 'ver', 'ver', 65, 64, 1),
	(259, 'Crear', 'crear', 'crear', 66, 64, 1),
	(260, 'Editar', 'editar', 'editar', 67, 64, 1),
	(261, 'Eliminar (individual)', 'eliminar_individual', 'eliminar_individual', 68, 64, 1),
	(263, 'Ver', 'ver', 'Permiso ver, modulo modulos', 18, 17, 1),
	(264, 'Crear', 'crear', 'Permiso crear, modulo modulos', 19, 17, 1),
	(265, 'Editar', 'editar', 'Permiso editar, modulo modulos', 20, 17, 1),
	(266, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 21, 17, 1),
	(305, 'Categorias', 'categorias', 'Permiso categorias, modulo catalogo', 25, 22, 1),
	(306, 'Productos (asignar)', 'asignar_productos', 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 27, 25, 1),
	(307, 'Ver', 'ver', 'Permiso ver, submodulo categorias, modulo catalogo', 28, 25, 1),
	(308, 'Crear', 'crear', 'Permiso crear, submodulo categorias, modulo catalogo', 29, 25, 1),
	(309, 'Editar', 'editar', 'Permiso editar, submodulo categorias, modulo catalogo', 30, 25, 1),
	(311, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 26, 22, 1),
	(312, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 33, 26, 1),
	(313, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 34, 26, 1),
	(314, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 35, 26, 1),
	(315, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 36, 26, 1),
	(316, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 38, 22, 1),
	(317, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 39, 38, 1),
	(318, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 40, 38, 1),
	(319, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 41, 38, 1),
	(321, 'Cargar (excel)', 'cargar_excel', 'Permiso cargar_excel, submodulo productos, modulo catalogo', 63, 38, 1),
	(322, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 45, 44, 1),
	(323, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 47, 45, 1),
	(324, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 48, 45, 1),
	(325, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 49, 45, 1),
	(326, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 50, 45, 1),
	(329, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 46, 44, 1),
	(330, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 58, 46, 1),
	(331, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 59, 46, 1),
	(332, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 60, 46, 1),
	(333, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 61, 46, 1),
	(354, 'Usuarios', 'usuarios', 'Modulo usuarios', 1, NULL, 2),
	(355, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 2, 1, 2),
	(356, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 3, 2, 2),
	(357, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 4, 2, 2),
	(358, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 5, 2, 2),
	(359, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 6, 2, 2),
	(360, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 8, 2, 2),
	(361, 'Permisos (asignar)', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 9, 2, 2),
	(363, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 10, 1, 2),
	(364, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 11, 10, 2),
	(365, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 12, 10, 2),
	(366, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 13, 10, 2),
	(367, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 14, 10, 2),
	(368, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 16, 10, 2),
	(369, 'Modulos', 'modulos', 'Modulo modulos', 17, NULL, 2),
	(370, 'Ver', 'ver', 'Permiso ver, modulo modulos', 18, 17, 2),
	(371, 'Crear', 'crear', 'Permiso crear, modulo modulos', 19, 17, 2),
	(372, 'Editar', 'editar', 'Permiso editar, modulo modulos', 20, 17, 2),
	(373, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 21, 17, 2),
	(374, 'Lote', 'lote', 'Modulo lote', 64, NULL, 2),
	(375, 'Ver', 'ver', 'ver', 65, 64, 2),
	(376, 'Crear', 'crear', 'crear', 66, 64, 2),
	(377, 'Editar', 'editar', 'editar', 67, 64, 2),
	(378, 'Eliminar (individual)', 'eliminar_individual', 'eliminar_individual', 68, 64, 2),
	(379, 'Catalogo', 'catalogo', 'Modulo catalogo', 22, NULL, 2),
	(380, 'Categorias', 'categorias', 'Permiso categorias, modulo catalogo', 25, 22, 2),
	(381, 'Productos (asignar)', 'asignar_productos', 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 27, 25, 2),
	(383, 'Crear', 'crear', 'Permiso crear, submodulo categorias, modulo catalogo', 29, 25, 2),
	(384, 'Ver', 'ver', 'Permiso ver, submodulo categorias, modulo catalogo', 28, 25, 2),
	(385, 'Editar', 'editar', 'Permiso editar, submodulo categorias, modulo catalogo', 30, 25, 2),
	(386, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 31, 25, 2),
	(387, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 26, 22, 2),
	(388, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 33, 26, 2),
	(389, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 34, 26, 2),
	(390, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 35, 26, 2),
	(391, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 36, 26, 2),
	(392, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 38, 22, 2),
	(393, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 39, 38, 2),
	(394, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 40, 38, 2),
	(395, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 41, 38, 2),
	(396, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo productos, modulo catalogo', 42, 38, 2),
	(397, 'Cargar (excel)', 'cargar_excel', 'Permiso cargar_excel, submodulo productos, modulo catalogo', 63, 38, 2),
	(398, 'Merma', 'merma', 'Modulo merma', 44, NULL, 2),
	(399, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 45, 44, 2),
	(401, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 48, 45, 2),
	(402, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 47, 45, 2),
	(403, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 49, 45, 2),
	(404, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 50, 45, 2),
	(405, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 46, 44, 2),
	(406, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 58, 46, 2),
	(407, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 59, 46, 2),
	(408, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 60, 46, 2),
	(409, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 61, 46, 2),
	(411, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 75, 2, 1),
	(418, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 43, 38, 1),
	(420, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 31, 25, 1),
	(421, 'Modulos', 'modulos', 'Modulo modulos', 17, NULL, 1),
	(422, 'Catalogo', 'catalogo', 'Modulo catalogo', 22, NULL, 1),
	(423, 'Merma', 'merma', 'Modulo merma', 44, NULL, 1),
	(424, 'Lote', 'lote', 'Modulo lote', 64, NULL, 1),
	(426, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 2, 1, 1),
	(427, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 10, 1, 1);

-- Dumping data for table BAN_00341.mod_usuarios_admin: ~0 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(2, 'Admin2', 'Admin2', 'donald@correo.com', 'Qwerty9601', 1),
	(3, 'Mark', 'Zuckerberg', 'mark.zuckerbeg@correo.com', 'Qwerty9601', 0);

-- Dumping data for table BAN_00341.mod_usuarios_user: ~0 rows (approximately)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1),
	(3, 'final3', 'final3', 'final3@gmail.com', 'Qwerty9601', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
