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

-- Dumping data for table core_project_BAN_00341.mod_catalogo_categorias: ~10 rows (approximately)
INSERT INTO `mod_catalogo_categorias` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Lácteos', 'Productos derivados de la leche y refrigerados'),
	(2, 'Cárnicos', 'Carnes frías, embutidos y carnes rojas'),
	(3, 'Bebidas', 'Jugos, gaseosas, aguas, energizantes y licores'),
	(4, 'Panadería', 'Panes frescos, galletas y repostería'),
	(5, 'Aseo Hogar', 'Productos de limpieza y desinfección'),
	(6, 'Granos y Abarrotes', 'Arroz, lentejas, frijoles y cereales'),
	(8, ' Cuidado Personal', 'Jabones, champú y cremas dentales');

-- Dumping data for table core_project_BAN_00341.mod_catalogo_productos: ~11 rows (approximately)
INSERT INTO `mod_catalogo_productos` (`id`, `codigo_barra`, `nombre`, `stock_minimo`, `unidad_medida`, `id_categoria`, `marca`) VALUES
	(1, '770123456001', 'Leche Entera 1L', 20, 'kg', 1, 'Alpina'),
	(2, '25252525252', 'Arroz Blanco 1kg', 50, 'kg', 1, 'Diana'),
	(3, '770123456003', 'Jamón de Cerdo 250g', 10, 'kg', 1, 'Pietran'),
	(4, '770123456004', 'Agua Mineral 500ml', 30, 'kg', 1, 'Brisa'),
	(5, '770123456005', 'Detergente en Polvo 1kg', 15, 'kg', 1, 'Ajax'),
	(6, '770123456006', 'Pan de Molde Familiar', 12, 'kg', 1, 'Exito'),
	(7, '770123456007', 'Aceite de Girasol 1L', 10, 'kg', 1, 'Girasol'),
	(8, '770123456008', 'Atún en Agua 170g', 20, 'kg', 1, 'VanCan'),
	(9, '770123456009', 'Papas Fritas Naturales', 25, 'kg', 1, 'FritoLay'),
	(10, '770123456010', 'Manzanas Rojas x6', 8, 'kg', 1, 'Buen dia'),
	(21, '10002145', 'Salchichas', 15, 'paquete', 2, 'Zenu');

-- Dumping data for table core_project_BAN_00341.mod_catalogo_proveedores: ~2 rows (approximately)
INSERT INTO `mod_catalogo_proveedores` (`id`, `nit`, `razon_social`, `direccion`, `correo`, `telefono`) VALUES
	(1, 9001234561, 'Distribuidora Alimentos Express S.A.', 'Calle 45 #10-20', 'ventas@alimentos.com', '6012345678'),
	(14, 1098785729, 'Industrias JB Sas', 'Calle 6 # 12 - 72 villabel', 'jb.business@gmail.com', '3504284093');

-- Dumping data for table core_project_BAN_00341.mod_lote: ~7 rows (approximately)
INSERT INTO `mod_lote` (`id`, `fecha_entrada`, `fecha_vencimiento`, `costo_unitario`, `precio_venta_sugerido`, `estado`, `id_producto`, `id_proveedor`, `lote`, `cantidad_comprada`, `cantidad_vendida`, `stock`) VALUES
	(1, '2026-03-03 23:35:23', '2026-05-03 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021415', 250, 60, 155),
	(2, '2026-03-03 23:35:23', '2026-03-18 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021416', 300, 91, 199),
	(3, '2026-03-03 23:35:23', '2026-03-23 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021417', 180, 62, 118),
	(4, '2026-02-03 23:35:23', '2026-03-01 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021418', 175, 52, 123),
	(5, '2026-03-03 23:35:23', '2026-03-01 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021419', 243, 74, 164),
	(6, '2026-03-03 23:35:23', '2026-02-01 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021410', 592, 592, 0),
	(8, '2026-03-03 23:35:23', '2026-02-01 23:35:24', 2500.00, 2850.00, 'disponible', 1, 1, 'Lote2021421', 240, 200, 40);

-- Dumping data for table core_project_BAN_00341.mod_merma_mermas: ~6 rows (approximately)
INSERT INTO `mod_merma_mermas` (`id`, `cantidad`, `fecha_reporte`, `valor_perdido`, `observaciones`, `id_tipo_merma`, `id_lote`) VALUES
	(1, 20, '2026-03-04 00:46:47', 25000.00, 'ninguna', 2, 1),
	(2, 10, '2026-03-04 00:46:47', 25000.00, 'ninguna', 9, 1),
	(3, 5, '2026-03-04 00:46:47', 25000.00, 'ninguna', 1, 1),
	(4, 5, '2026-03-04 00:46:47', 25000.00, 'ninguna', 4, 2),
	(5, 5, '2026-03-04 00:46:47', 25000.00, 'ninguna', 4, 2),
	(6, 5, '2026-03-04 00:46:47', 25000.00, 'dañados', 4, 5);

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

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo: ~60 rows (approximately)
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
	(28, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo categorias, modulo catalogo', 25),
	(29, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo categorias, modulo catalogo', 25),
	(30, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo categorias, modulo catalogo', 25),
	(31, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 25),
	(32, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo categorias, modulo catalogo', 25),
	(33, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo proveedores, modulo catalogo', 26),
	(34, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo proveedores, modulo catalogo', 26),
	(35, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo proveedores, modulo catalogo', 26),
	(36, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 26),
	(37, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo proveedores, modulo catalogo', 26),
	(38, 'Productos', 'productos', 1, 1, 'Permiso productos, modulo catalogo', 22),
	(39, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo productos, modulo catalogo', 38),
	(40, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo productos, modulo catalogo', 38),
	(41, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo productos, modulo catalogo', 38),
	(42, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo productos, modulo catalogo', 38),
	(43, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 38),
	(44, 'Merma', 'merma', 1, 0, 'Modulo merma', NULL),
	(45, 'Tipos merma', 'tipo_merma', 0, 1, 'Permiso tipo_merma, modulo merma', 44),
	(46, 'Registro merma', 'registro_merma', 0, 1, 'Permiso registro_merma, modulo merma', 44),
	(47, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo tipo_merma, modulo merma', 45),
	(48, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo tipo_merma, modulo merma', 45),
	(49, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo tipo_merma, modulo merma', 45),
	(50, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo tipo_merma, modulo merma', 45),
	(51, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo tipo_merma, modulo merma', 45),
	(52, 'Lote', 'lote', 0, 1, 'Permiso lote, modulo catalogo', 22),
	(53, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo lote, modulo catalogo', 52),
	(54, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo lote, modulo catalogo', 52),
	(55, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo lote, modulo catalogo', 52),
	(56, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo lote, modulo catalogo', 52),
	(57, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo lote, modulo catalogo', 52),
	(58, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo registro_merma, modulo merma', 46),
	(59, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo registro_merma, modulo merma', 46),
	(60, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo registro_merma, modulo merma', 46),
	(61, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo registro_merma, modulo merma', 46),
	(62, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo registro_merma, modulo merma', 46);

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo_asignacion: ~48 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1),
	(2, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 1, 1),
	(3, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 1),
	(5, 'Categorias', 'categorias', 'Permiso categorias, modulo catalogo', 22, 1),
	(7, 'Ver', 'ver', 'Permiso ver, submodulo categorias, modulo catalogo', 25, 1),
	(8, 'Crear', 'crear', 'Permiso crear, submodulo categorias, modulo catalogo', 25, 1),
	(9, 'Editar', 'editar', 'Permiso editar, submodulo categorias, modulo catalogo', 25, 1),
	(11, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo categorias, modulo catalogo', 25, 1),
	(12, 'Ver', 'ver', 'Permiso ver, submodulo proveedores, modulo catalogo', 26, 1),
	(17, 'Productos (asignar)', 'asignar_productos', 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 25, 1),
	(18, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 2, 1),
	(19, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 2, 1),
	(20, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 2, 1),
	(23, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2, 1),
	(24, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 1, 1),
	(25, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2, 1),
	(26, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 10, 1),
	(27, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 1),
	(28, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 10, 1),
	(29, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10, 1),
	(30, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 10, 1),
	(31, 'Modulos', 'modulos', 'Modulo modulos', NULL, 1),
	(32, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 1),
	(33, 'Crear', 'crear', 'Permiso crear, modulo modulos', 17, 1),
	(34, 'Editar', 'editar', 'Permiso editar, modulo modulos', 17, 1),
	(35, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 17, 1),
	(36, 'Productos', 'productos', 'Permiso productos, modulo catalogo', 22, 1),
	(37, 'Ver', 'ver', 'Permiso ver, submodulo productos, modulo catalogo', 38, 1),
	(38, 'Crear', 'crear', 'Permiso crear, submodulo productos, modulo catalogo', 38, 1),
	(39, 'Editar', 'editar', 'Permiso editar, submodulo productos, modulo catalogo', 38, 1),
	(40, 'Eliminar', 'eliminar', 'Permiso productos, modulo catalogo', 38, 1),
	(42, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo productos, modulo catalogo', 38, 1),
	(46, 'Crear', 'crear', 'Permiso crear, submodulo proveedores, modulo catalogo', 26, 1),
	(47, 'Editar', 'editar', 'Permiso editar, submodulo proveedores, modulo catalogo', 26, 1),
	(48, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo proveedores, modulo catalogo', 26, 1),
	(50, 'Catalogo', 'catalogo', 'Modulo catalogo', NULL, 1),
	(52, 'Proveedores', 'proveedores', 'Permiso proveedores, modulo catalogo', 22, 1),
	(53, 'Merma', 'merma', 'Modulo merma', NULL, 1),
	(54, 'Tipos merma', 'tipo_merma', 'Permiso tipo_merma, modulo merma', 44, 1),
	(55, 'Registro merma', 'registro_merma', 'Permiso registro_merma, modulo merma', 44, 1),
	(56, 'Ver', 'ver', 'Permiso ver, submodulo tipo_merma, modulo merma', 45, 1),
	(57, 'Crear', 'crear', 'Permiso crear, submodulo tipo_merma, modulo merma', 45, 1),
	(58, 'Editar', 'editar', 'Permiso editar, submodulo tipo_merma, modulo merma', 45, 1),
	(59, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar_multiple, submodulo tipo_merma, modulo merma', 45, 1),
	(60, 'Lote', 'lote', 'Permiso lote, modulo catalogo', 22, 1),
	(61, 'Ver', 'ver', 'Permiso ver, submodulo lote, modulo catalogo', 52, 1),
	(62, 'Crear', 'crear', 'Permiso crear, submodulo lote, modulo catalogo', 52, 1),
	(63, 'Editar', 'editar', 'Permiso editar, submodulo lote, modulo catalogo', 52, 1);

-- Dumping data for table core_project_BAN_00341.mod_usuarios_admin: ~2 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(19, 'Donald', 'Trump', 'donald@correo.com', 'Qwerty9601', 1);

-- Dumping data for table core_project_BAN_00341.mod_usuarios_user: ~20 rows (approximately)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1),
	(3, 'final3', 'final3', 'final3@gmail.com', 'Qwerty9601', 1),
	(4, 'final4', 'final4', 'final4@gmail.com', 'Qwerty9601', 1),
	(5, 'final5', 'final5', 'final5@gmail.com', 'Qwerty9601', 1),
	(11, 'final11', 'final11', 'final11@gmail.com', 'Qwerty9601', 0),
	(12, 'final12', 'final12', 'final12@gmail.com', 'Qwerty9601', 0),
	(14, 'final13', 'final13', '13@gmail.com', 'Qwerty9601', 1),
	(15, 'final14', 'final14', '14@gmail.com', 'Qwerty9601', 1),
	(16, 'final15', 'final15', '15@gmail.com', 'Qwerty9601', 1),
	(17, 'final16', 'final16', '16@gmail.com', 'Qwerty9601', 1),
	(18, 'final17', 'final17', '17@gmail.com', 'Qwerty9601', 1),
	(19, 'final18', 'final18', '18@gmail.com', 'Qwerty9601', 1),
	(20, 'final19', 'final19', '19@gmail.com', 'Qwerty9601', 0),
	(21, 'final20', 'final20', '20@gmail.com', 'Qwerty9601', 0),
	(22, 'final21', 'final21', '21@gmail.com', 'Qwerty9601', 0),
	(23, 'final22', 'final22', '22@gmail.com', 'Qwerty9601', 0),
	(24, 'final23', 'final23', '23@gmail.com', 'Qwerty9601', 0),
	(25, 'final24', 'final24', '24@gmail.com', 'Qwerty9601', 0),
	(26, 'final25', 'final25', '25@gmail.com', 'Qwerty9601', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
