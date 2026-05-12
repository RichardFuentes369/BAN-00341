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

-- Dumping data for table BAN_00341.mod_bodega: ~6 rows (approximately)
INSERT INTO `mod_bodega` (`id`, `lote`, `fecha_entrada`, `fecha_vencimiento`, `cantidad_comprada`, `cantidad_vendida`, `cantidad_en_bodega`, `estado`, `id_producto`, `id_proveedor`) VALUES
	(1, 'Al-mg-1100', 1769922838, 1777698838, 25, 0, 16, 'disponible', 1, 1),
	(2, 'Elt-du-366', 1769922838, NULL, 25, 0, 23, 'disponible', 2, 2),
	(3, 'Al-yogfre-180', 1769922838, 1779254038, 25, 0, 22, 'disponible', 3, 1),
	(4, 'Al-cremle-180', 1769922838, 1778649238, 25, 0, 32, 'disponible', 4, 1),
	(5, 'MC-res-2586', 1769922838, 1777958038, 5800, 0, 5800, 'disponible', 10, 3),
	(6, 'MC-res-2526', 1777853638, 1780118038, 3600, 0, 3600, 'disponible', 11, 3);

-- Dumping data for table BAN_00341.mod_catalogo_marcas: ~5 rows (approximately)
INSERT INTO `mod_catalogo_marcas` (`id`, `nombre`) VALUES
	(1, 'Alqueria'),
	(2, 'Elite'),
	(5, 'Matadero central'),
	(4, 'Nescafe'),
	(3, 'Purina');

-- Dumping data for table BAN_00341.mod_catalogo_medida: ~5 rows (approximately)
INSERT INTO `mod_catalogo_medida` (`id`, `nombre`) VALUES
	(4, 'Gramos'),
	(3, 'Kilogramos'),
	(2, 'Litros'),
	(5, 'Mililitros'),
	(1, 'Unidades');

-- Dumping data for table BAN_00341.mod_catalogo_productos: ~11 rows (approximately)
INSERT INTO `mod_catalogo_productos` (`id`, `nombre`, `stock_minimo`, `es_perecedero`, `alerta_amarilla`, `alerta_naranja`, `estado`, `codigo_barra`, `id_marca`, `unidad_medida`) VALUES
	(1, 'Leche megalitro x 1100 ml', 10, 1, 19, 15, 1, '1000000000001', 1, 'Unidades'),
	(2, 'Papel higienico DUO', 25, 0, NULL, NULL, 1, '1000000000002', 2, 'Unidades'),
	(3, 'Yogurt - Fresa * 150 grs', 25, 1, 19, 15, 1, '1000000000003', 1, 'Unidades'),
	(4, 'Crema de leche * 180 grs', 25, 1, 19, 15, 1, '1000000000004', 1, 'Unidades'),
	(5, 'Servilletas * 150 und', 25, 0, NULL, NULL, 1, '1000000000005', 2, 'Unidades'),
	(6, 'DogChow * 250 grs', 25, 1, 19, 15, 1, '1000000000006', 3, 'Unidades'),
	(7, 'CatChow * 250 grs', 25, 1, 19, 15, 1, '1000000000007', 3, 'Unidades'),
	(8, 'Nescafe * 250 grs', 25, 1, 19, 15, 1, '1000000000008', 4, 'Unidades'),
	(9, 'Nescafe * 15 grs', 25, 1, 19, 15, 1, '1000000000009', 4, 'Unidades'),
	(10, 'Carne de res (pierna)', 2000, 1, 19, 15, 1, '1000000000010', 4, 'Gramos'),
	(11, 'Carne de cerdo (pierna)', 1000, 1, 19, 15, 1, '1000000000011', 4, 'Gramos');

-- Dumping data for table BAN_00341.mod_catalogo_proveedores: ~4 rows (approximately)
INSERT INTO `mod_catalogo_proveedores` (`id`, `razon_social`, `direccion`, `correo`, `telefono`, `dv`, `nit`) VALUES
	(1, 'Proveedor 1', 'calle 32 a # 52 - 35', 'proveedor1@gmail.com', '3504284145', '1', '1000241005'),
	(2, 'Proveedor 2', 'calle 3 # 23 - 75', 'proveedor2@gmail.com', '3168955632', '1', '1000241001'),
	(3, 'Proveedor 3', 'calle 125 # 32 - 15', 'proveedor3@gmail.com', '3162547852', '1', '1000241002'),
	(4, 'Proveedor 4', 'calle 206 # 55 - 95', 'proveedor4@gmail.com', '3504289963', '1', '1000241004');

-- Dumping data for table BAN_00341.mod_merma_mermas: ~3 rows (approximately)
INSERT INTO `mod_merma_mermas` (`id`, `cantidad`, `fecha_reporte`, `valor_perdido`, `observaciones`, `id_tipo_merma`, `id_lote`) VALUES
	(1, 5, 1778199473, 32000.00, 'se perdio', 1, 1),
	(2, 2, 1778199478, 32000.00, 'ninguna', 2, 1),
	(3, 2, 1778199520, 32000.00, 'ninguna', 3, 1),
	(4, 2, 1778199520, 32000.00, 'ninguna', 1, 2);

-- Dumping data for table BAN_00341.mod_merma_tipos: ~10 rows (approximately)
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

-- Dumping data for table BAN_00341.mod_permisos_modulo: ~68 rows (approximately)
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
	(26, 'Proveedores', 'proveedores', 0, 1, 'Permiso proveedores, modulo catalogo', 22),
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
	(64, 'Bodega', 'bodega', 0, 1, 'Modulo bodega', NULL),
	(65, 'Ver', 'ver', 0, 0, 'ver', 64),
	(66, 'Crear', 'crear', 0, 0, 'crear', 64),
	(67, 'Editar', 'editar', 0, 0, 'editar', 64),
	(68, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'eliminar_individual', 64),
	(69, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'eliminar_multiple', 64),
	(75, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 0, 0, 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(78, 'Descargar (Reporte trazabilidad)', 'descarga_reporte_trazabilidad', 1, 0, 'descarga_reporte_trazabilidad', 64),
	(79, 'Marcas', 'marcas', 0, 1, 'Permiso marcas, modulo catalogo', 22),
	(80, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo marcas, modulo catalogo', 79),
	(81, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo marcas, modulo catalogo', 79),
	(82, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo marcas, modulo catalogo', 79),
	(83, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo marcas, modulo catalogo', 79),
	(84, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo marcas, modulo catalogo', 79),
	(85, 'asignar_productos', 'asignar_productos', 0, 1, 'Permiso asignar_productos, submodulo marcas, modulo catalogo', 79),
	(86, 'Unidad de medida', 'unidad_de_medida', 0, 1, 'Permiso unidad_de_medida, modulo catalogo', 22),
	(87, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo unidad_de_medida, modulo catalogo', 86),
	(88, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo unidad_de_medida, modulo catalogo', 86),
	(89, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo unidad_de_medida, modulo catalogo', 86),
	(90, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo unidad_de_medida, modulo catalogo', 86);

-- Dumping data for table BAN_00341.mod_permisos_modulo_asignacion: ~59 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `id_modulo`, `modulo_padre_id`, `user_id`) VALUES
	(3, 'Usuarios', 'usuarios', 'Modulo usuarios', 1, NULL, 1),
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
	(311, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 26, 22, 1),
	(312, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 33, 26, 1),
	(313, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 34, 26, 1),
	(314, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 35, 26, 1),
	(322, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 45, 44, 1),
	(324, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 48, 45, 1),
	(325, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 49, 45, 1),
	(326, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 50, 45, 1),
	(329, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 46, 44, 1),
	(330, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 58, 46, 1),
	(331, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 59, 46, 1),
	(332, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 60, 46, 1),
	(333, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 61, 46, 1),
	(422, 'Catalogo', 'catalogo', 'Modulo catalogo', 22, NULL, 1),
	(426, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 2, 1, 1),
	(427, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 10, 1, 1),
	(428, 'Modulos', 'modulos', 'Modulo modulos', 17, NULL, 1),
	(429, 'Marcas', 'marcas', 'Permiso marcas, modulo catalogo', 79, 22, 1),
	(430, 'Ver', 'ver', 'Permiso ver, submodulo marcas, modulo catalogo', 80, 79, 1),
	(431, 'Crear', 'crear', 'Permiso crear, submodulo marcas, modulo catalogo', 81, 79, 1),
	(432, 'Editar', 'editar', 'Permiso editar, submodulo marcas, modulo catalogo', 82, 79, 1),
	(433, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo marcas, modulo catalogo', 83, 79, 1),
	(434, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 75, 2, 1),
	(437, 'Merma', 'merma', 'Modulo merma', 44, NULL, 1),
	(438, 'Bodega', 'bodega', 'Modulo bodega', 64, NULL, 1),
	(441, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 36, 26, 1),
	(466, 'asignar_productos', 'asignar_productos', 'Permiso asignar_productos, submodulo marcas, modulo catalogo', 85, 79, 1),
	(467, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 38, 22, 1),
	(468, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 39, 38, 1),
	(469, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 40, 38, 1),
	(470, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 41, 38, 1),
	(471, 'Cargar (excel)', 'cargar_excel', 'Permiso cargar_excel, submodulo productos, modulo catalogo', 63, 38, 1),
	(472, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 43, 38, 1),
	(473, 'Unidad de medida', 'unidad_de_medida', 'Permiso unidad_de_medida, modulo catalogo', 86, 22, 1),
	(474, 'Ver', 'ver', 'Permiso ver, submodulo unidad_de_medida, modulo catalogo', 87, 86, 1),
	(475, 'Crear', 'crear', 'Permiso crear, submodulo unidad_de_medida, modulo catalogo', 88, 86, 1),
	(476, 'Editar', 'editar', 'Permiso editar, submodulo unidad_de_medida, modulo catalogo', 89, 86, 1),
	(477, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo unidad_de_medida, modulo catalogo', 90, 86, 1),
	(482, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 47, 45, 1),
	(484, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 9, 2, 1);

-- Dumping data for table BAN_00341.mod_usuarios_admin: ~3 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(9, 'admin2', 'admin2', 'admin2@correo.com', 'Qwerty9601', 0);

-- Dumping data for table BAN_00341.mod_usuarios_user: ~3 rows (approximately)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1),
	(3, 'final3', 'final3', 'final3@gmail.com', 'Qwerty9601', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
