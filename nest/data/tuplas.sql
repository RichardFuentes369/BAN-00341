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

-- Dumping data for table BAN_00341.mod_bodega: ~5 rows (approximately)
INSERT INTO `mod_bodega` (`id`, `lote`, `fecha_entrada`, `fecha_vencimiento`, `cantidad_comprada`, `cantidad_vendida`, `cantidad_en_bodega`, `estado`, `id_producto`, `id_proveedor`) VALUES
	(26, 'MCRE96', 1770613200, 1782881999, 58600, 3250, 55100, 'disponible', 10, 3),
	(27, 'Lecf282', 1776920400, 1787374799, 250, 0, 215, 'disponible', 1, 2),
	(28, 'sdas1', 1781154000, 1786683599, 1232, 0, 950, 'disponible', 8, 3),
	(29, '23dss', 1786942800, 1803704399, 896, 0, 686, 'disponible', 53, 2),
	(30, 'ad85w', 1759726800, 1789621199, 58233, 0, 58137, 'disponible', 11, 1);

-- Dumping data for table BAN_00341.mod_catalogo_marcas: ~8 rows (approximately)
INSERT INTO `mod_catalogo_marcas` (`id`, `nombre`) VALUES
	(1, 'Alqueria'),
	(2, 'Elite'),
	(13, 'Festivales'),
	(5, 'Matadero central'),
	(4, 'Nescafe'),
	(12, 'Nestle'),
	(14, 'Noel'),
	(3, 'Purina');

-- Dumping data for table BAN_00341.mod_catalogo_medida: ~5 rows (approximately)
INSERT INTO `mod_catalogo_medida` (`id`, `nombre`) VALUES
	(4, 'Gramos'),
	(3, 'Kilogramos'),
	(2, 'Litros'),
	(5, 'Mililitros'),
	(1, 'Unidades');

-- Dumping data for table BAN_00341.mod_catalogo_productos: ~14 rows (approximately)
INSERT INTO `mod_catalogo_productos` (`id`, `nombre`, `stock_minimo`, `es_perecedero`, `alerta_amarilla`, `alerta_naranja`, `estado`, `codigo_barra`, `id_marca`, `id_medida`) VALUES
	(1, 'Leche megalitro x 1100 ml', 10, 1, 19, 15, 1, '1000000000001', 1, 1),
	(2, 'Papel higienico DUO', 25, 0, NULL, NULL, 1, '1000000000002', 2, 1),
	(3, 'Yogurt - Fresa * 150 grs', 25, 1, 19, 15, 0, '1000000000003', 1, 1),
	(4, 'Crema de leche * 180 grs', 25, 1, 19, 15, 1, '1000000000004', 1, 1),
	(5, 'Servilletas * 150 und', 25, 0, NULL, NULL, 1, '1000000000005', 2, 1),
	(6, 'DogChow * 250 grs', 25, 1, 19, 15, 1, '1000000000006', 3, 1),
	(7, 'CatChow * 250 grs', 25, 1, 19, 15, 1, '1000000000007', 3, 1),
	(8, 'Nescafe * 250 grs', 25, 1, 19, 15, 1, '1000000000008', 4, 1),
	(9, 'Nescafe * 15 grs', 25, 1, 19, 15, 1, '1000000000009', 4, 1),
	(10, 'Carne de res (pierna)', 2000, 1, 19, 15, 1, '1000000000010', 5, 4),
	(11, 'Carne de cerdo (pierna)', 1000, 1, 19, 15, 1, '1000000000011', 5, 4),
	(52, 'Milo', 25, 1, 15, 20, 1, '7702024110187', 12, 1),
	(53, 'Gallets * 6 (Sabor a Limon)', 10, 1, 25, 8, 1, '7702025151981', 13, 1),
	(54, 'Saltinas (taco)', 10, 1, 15, 10, 1, '7702025150748', 14, 1);

-- Dumping data for table BAN_00341.mod_catalogo_proveedores: ~4 rows (approximately)
INSERT INTO `mod_catalogo_proveedores` (`id`, `razon_social`, `direccion`, `correo`, `telefono`, `dv`, `nit`) VALUES
	(1, 'Proveedor 1', 'calle 32 a # 52 - 35', 'proveedor1@gmail.com', '3504284145', '1', '1000241005'),
	(2, 'Proveedor 2', 'calle 3 # 23 - 75', 'proveedor2@gmail.com', '3168955632', '1', '1000241001'),
	(3, 'Proveedor 3', 'calle 125 # 32 - 15', 'proveedor3@gmail.com', '3162547852', '1', '1000241002'),
	(4, 'Proveedor 4', 'calle 206 # 55 - 95', 'proveedor4@gmail.com', '3504289963', '1', '1000241004');

-- Dumping data for table BAN_00341.mod_merma_mermas: ~5 rows (approximately)
INSERT INTO `mod_merma_mermas` (`id`, `cantidad`, `fecha_reporte`, `observacion`, `id_tipo_merma`, `id_lote`, `valor_perdido`) VALUES
	(42, 250, 1776834000, 'asdasd', 2, 26, 285556),
	(43, 35, 1777352400, 'asdasd', 9, 27, 8500),
	(44, 282, 1780894800, 'adasd', 2, 28, 250),
	(45, 210, 1799557200, 'asdasd', 8, 29, 1222),
	(46, 96, 1766638800, 'dasdasd', 2, 30, 1211);

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

-- Dumping data for table BAN_00341.mod_permisos_modulo: ~91 rows (approximately)
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
	(68, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo json, modulo variables del sistema', 64),
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
	(90, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo unidad_de_medida, modulo catalogo', 86),
	(91, 'Alertas', 'alertas', 1, 0, 'Modulo alertas', NULL),
	(92, 'Caducidad', 'alerta_caducidad', 0, 1, 'Aquí se mostrara la información de los lotes de los productos activos, con el detalle de (dias a vencer o ya vencidos)', 91),
	(94, 'Stock', 'alerta_stock', 0, 1, 'Aquí se mostrara a cerca de los productos que están en su stock o por debajo de el.', 91),
	(95, 'Variables del sistema', 'variables_sistema', 1, 0, 'Modulo configurables', NULL),
	(101, 'VAR', 'system_var', 0, 1, 'Permiso var, modulo configurable', 95),
	(102, 'JSON', 'system_json', 0, 1, 'Permiso json, modulo configurable', 95),
	(103, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo var, modulo variables del sistema', 101),
	(104, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo var, modulo variables del sistema', 101),
	(105, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo var, modulo variables del sistema', 101),
	(106, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo var, modulo variables del sistema', 101),
	(107, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo var, modulo variables del sistema', 101),
	(108, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo json, modulo variables del sistema', 102),
	(109, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo json, modulo variables del sistema', 102),
	(110, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo json, modulo variables del sistema', 102),
	(111, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo json, modulo variables del sistema', 102),
	(112, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo json, modulo variables del sistema', 102),
	(113, 'Personalizacion', 'estilos_sistema', 0, 1, 'Modulo general para el estilos del sistema', NULL),
	(114, 'Historico merma', 'historico_merma', 0, 1, 'Permiso historico_merma, modulo merma', 44),
	(115, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo historico_merma, modulo merma', 114);

-- Dumping data for table BAN_00341.mod_permisos_modulo_asignacion: ~115 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `id_modulo`, `modulo_padre_id`, `user_id`) VALUES
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
	(427, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 10, 1, 1),
	(429, 'Marcas', 'marcas', 'Permiso marcas, modulo catalogo', 79, 22, 1),
	(430, 'Ver', 'ver', 'Permiso ver, submodulo marcas, modulo catalogo', 80, 79, 1),
	(431, 'Crear', 'crear', 'Permiso crear, submodulo marcas, modulo catalogo', 81, 79, 1),
	(432, 'Editar', 'editar', 'Permiso editar, submodulo marcas, modulo catalogo', 82, 79, 1),
	(433, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo marcas, modulo catalogo', 83, 79, 1),
	(434, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 75, 2, 1),
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
	(484, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 9, 2, 1),
	(485, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 2, 1, 1),
	(487, 'Catalogo', 'catalogo', 'Modulo catalogo', 22, NULL, 9),
	(488, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 26, 22, 9),
	(489, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 33, 26, 9),
	(490, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 34, 26, 9),
	(491, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 35, 26, 9),
	(492, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 36, 26, 9),
	(493, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 38, 22, 9),
	(494, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 39, 38, 9),
	(495, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 40, 38, 9),
	(496, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 41, 38, 9),
	(497, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo productos, modulo catalogo', 42, 38, 9),
	(498, 'Marcas', 'marcas', 'Permiso marcas, modulo catalogo', 79, 22, 9),
	(499, 'Ver', 'ver', 'Permiso ver, submodulo marcas, modulo catalogo', 80, 79, 9),
	(501, 'Crear', 'crear', 'Permiso crear, submodulo marcas, modulo catalogo', 81, 79, 9),
	(502, 'Editar', 'editar', 'Permiso editar, submodulo marcas, modulo catalogo', 82, 79, 9),
	(503, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo marcas, modulo catalogo', 83, 79, 9),
	(504, 'asignar_productos', 'asignar_productos', 'Permiso asignar_productos, submodulo marcas, modulo catalogo', 85, 79, 9),
	(505, 'Unidad de medida', 'unidad_de_medida', 'Permiso unidad_de_medida, modulo catalogo', 86, 22, 9),
	(506, 'Ver', 'ver', 'Permiso ver, submodulo unidad_de_medida, modulo catalogo', 87, 86, 9),
	(507, 'Crear', 'crear', 'Permiso crear, submodulo unidad_de_medida, modulo catalogo', 88, 86, 9),
	(508, 'Editar', 'editar', 'Permiso editar, submodulo unidad_de_medida, modulo catalogo', 89, 86, 9),
	(509, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo unidad_de_medida, modulo catalogo', 90, 86, 9),
	(510, 'Merma', 'merma', 'Modulo merma', 44, NULL, 9),
	(511, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 45, 44, 9),
	(512, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 47, 45, 9),
	(513, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 48, 45, 9),
	(514, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 49, 45, 9),
	(515, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 50, 45, 9),
	(516, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo tipo_merma, modulo merma', 51, 45, 9),
	(517, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 46, 44, 9),
	(518, 'Ver', 'ver', 'Permiso ver, submodulo registro_merma, modulo merma', 58, 46, 9),
	(519, 'Crear', 'crear', 'Permiso crear, submodulo registro_merma, modulo merma', 59, 46, 9),
	(520, 'Editar', 'editar', 'Permiso editar, submodulo registro_merma, modulo merma', 60, 46, 9),
	(521, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 61, 46, 9),
	(522, 'Bodega', 'bodega', 'Modulo bodega', 64, NULL, 9),
	(523, 'Ver', 'ver', 'ver', 65, 64, 9),
	(524, 'Crear', 'crear', 'crear', 66, 64, 9),
	(525, 'Editar', 'editar', 'editar', 67, 64, 9),
	(526, 'Eliminar (individual)', 'eliminar_individual', 'eliminar_individual', 68, 64, 9),
	(528, 'Caducidad', 'alerta_caducidad', 'Aquí se mostrara la información de los lotes de los productos activos, con el detalle de (dias a vencer o ya vencidos)', 92, 91, 1),
	(529, 'Stock', 'alerta_stock', 'Aquí se mostrara a cerca de los productos que están en su stock o por debajo de el.', 94, 91, 1),
	(530, 'Usuarios', 'usuarios', 'Modulo Usuarios', 1, NULL, 1),
	(533, 'Catalogo', 'catalogo', 'Modulo catalogo', 22, NULL, 1),
	(535, 'Bodega', 'bodega', 'Modulo bodega', 64, NULL, 1),
	(536, 'Alertas', 'alertas', 'Modulo alertas', 91, NULL, 1),
	(543, 'VAR', 'system_var', 'Permiso var, modulo configurable', 101, 95, 1),
	(544, 'Ver', 'ver', 'Permiso ver, submodulo var, modulo variables del sistema', 103, 101, 1),
	(545, 'Crear', 'crear', 'Permiso crear, submodulo var, modulo variables del sistema', 104, 101, 1),
	(546, 'Editar', 'editar', 'Permiso editar, submodulo var, modulo variables del sistema', 105, 101, 1),
	(547, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo var, modulo variables del sistema', 106, 101, 1),
	(548, 'JSON', 'system_json', 'Permiso json, modulo configurable', 102, 95, 1),
	(549, 'Ver', 'ver', 'Permiso ver, submodulo json, modulo variables del sistema', 108, 102, 1),
	(550, 'Crear', 'crear', 'Permiso crear, submodulo json, modulo variables del sistema', 109, 102, 1),
	(551, 'Editar', 'editar', 'Permiso editar, submodulo json, modulo variables del sistema', 110, 102, 1),
	(552, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo json, modulo variables del sistema', 111, 102, 1),
	(554, 'Variables del sistema', 'variables_sistema', 'Modulo configurables', 95, NULL, 1),
	(555, 'Personalizacion', 'estilos_sistema', 'Modulo general para el estilos del sistema', 113, NULL, 1),
	(556, 'Merma', 'merma', 'Modulo merma', 44, NULL, 1),
	(557, 'Modulos', 'modulos', 'Modulo modulos', 17, NULL, 1),
	(558, 'Historico merma', 'historico_merma', 'Permiso historico_merma, modulo merma', 114, 44, 1),
	(560, 'Ver', 'ver', 'Permiso ver, submodulo historico_merma, modulo merma', 115, 114, 1);

-- Dumping data for table BAN_00341.mod_usuarios_admin: ~3 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Javier Ricardo', 'Baron Fuentes', 'admin1@correo.com', 'Qwerty9601', 1),
	(9, 'Oscar Eduardo', 'Villamizar Bautista', 'admin2@correo.com', 'Qwerty9601', 1),
	(12, 'Oscar Mauricio', 'Parra Correa', 'admin3@correo.com', 'Qwerty9601', 0);

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
