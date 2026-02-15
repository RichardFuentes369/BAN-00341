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
	(3, 'Bebidas', 'Jugos, gaseosas, aguas y licores'),
	(4, 'Panadería', 'Panes frescos, galletas y repostería'),
	(5, 'Aseo Hogar', 'Productos de limpieza y desinfección'),
	(6, 'Granos', 'Arroz, lentejas, frijoles y cereales'),
	(7, 'Snacks', 'Papas fritas, dulces y pasabocas'),
	(8, 'Frutas y Verduras', 'Productos frescos del campo'),
	(9, 'Enlatados', 'Conservas, atún y verduras enlatadas'),
	(10, 'Cuidado Personal', 'Jabones, champú y cremas dentales');

-- Dumping data for table core_project_BAN_00341.mod_catalogo_productos: ~10 rows (approximately)
INSERT INTO `mod_catalogo_productos` (`id`, `codigo_barra`, `nombre`, `stock_minimo`, `id_categoria`, `unidad_medida`) VALUES
	(1, '770123456001', 'Leche Entera 1L', 20, '1', 'litro'),
	(2, '770123456002', 'Arroz Blanco 1kg', 50, '6', 'kg'),
	(3, '770123456003', 'Jamón de Cerdo 250g', 10, '2', 'paquete'),
	(4, '770123456004', 'Agua Mineral 500ml', 30, '3', 'unidad'),
	(5, '770123456005', 'Detergente en Polvo 1kg', 15, '5', 'unidad'),
	(6, '770123456006', 'Pan de Molde Familiar', 12, '4', 'paquete'),
	(7, '770123456007', 'Aceite de Girasol 1L', 10, '6', 'litro'),
	(8, '770123456008', 'Atún en Agua 170g', 20, '9', 'unidad'),
	(9, '770123456009', 'Papas Fritas Naturales', 25, '7', 'paquete'),
	(10, '770123456010', 'Manzanas Rojas x6', 8, '8', 'paquete');

-- Dumping data for table core_project_BAN_00341.mod_catalogo_proveedores: ~10 rows (approximately)
INSERT INTO `mod_catalogo_proveedores` (`id`, `nit`, `razon_social`, `direccion`, `telefono`, `correo`) VALUES
	(1, 9001234561, 'Distribuidora Alimentos Express S.A.', 'Calle 45 #10-20', '6012345678', 'ventas@alimentos.com'),
	(2, 9007890122, 'Lácteos del Campo Ltda', 'Carrera 15 #5-30', '6019876543', 'contacto@lacteos.com'),
	(3, 8005554443, 'Cárnicos Gourmet SAS', 'Zona Industrial Sur', '6012223334', 'pedidos@carnicos.com'),
	(4, 9106667774, 'Bebidas del Valle S.A.', 'Av. Central 88', '6014445556', 'logistica@bebidas.co'),
	(5, 8601112225, 'Panadería Central de Colombia', 'Calle 12 #4-15', '6017778889', 'admin@pancentral.com'),
	(6, 9013334446, 'Granos y Semillas de la Sabana', 'Puerto Seco Local 5', '6013339990', 'info@granos.com'),
	(7, 8009998887, 'Importaciones Express S.A.S', 'Calle del Comercio 9', '6016665554', 'ventas@importexpress.com'),
	(8, 9002221118, 'Químicos y Limpieza Total', 'Transversal 7 #2-10', '6018990001', 'comercial@limpieza.com'),
	(9, 8304445559, 'Frutas y Verduras El Jardín', 'Plaza Mayor Mod 4', '6011112223', 'fresco@eljardin.com'),
	(10, 9008887770, 'Empaques y Desechables del Caribe', 'Km 5 Vía Mar', '6015556667', 'servicio@empaques.co');

-- Dumping data for table core_project_BAN_00341.mod_lote: ~10 rows (approximately)
INSERT INTO `mod_lote` (`id`, `fecha_entrada`, `fecha_vencimiento`, `cantidad_inicial`, `stock_actual`, `costo_unitario`, `precio_venta_sugerido`, `id_producto`, `id_proveedor`, `estado`) VALUES
	(1, '2026-02-15 04:36:16', '2026-05-20 05:00:00', 100, 85, 2500.00, 3200.00, 1, 2, 'disponible'),
	(2, '2026-02-15 04:36:16', '2027-01-15 05:00:00', 200, 190, 1800.00, 2400.00, 2, 6, 'disponible'),
	(3, '2026-02-15 04:36:16', '2026-03-10 05:00:00', 50, 42, 4500.00, 5800.00, 3, 3, 'disponible'),
	(4, '2026-02-15 04:36:16', '2027-12-01 05:00:00', 300, 300, 800.00, 1500.00, 4, 4, 'disponible'),
	(5, '2026-02-15 04:36:16', '2028-06-30 05:00:00', 40, 35, 7500.00, 9500.00, 5, 8, 'disponible'),
	(6, '2026-02-15 04:36:16', '2026-02-28 05:00:00', 30, 10, 3200.00, 4500.00, 6, 5, 'disponible'),
	(7, '2026-02-15 04:36:16', '2027-08-14 05:00:00', 60, 58, 6200.00, 8200.00, 7, 6, 'disponible'),
	(8, '2026-02-15 04:36:16', '2028-11-20 05:00:00', 100, 100, 3800.00, 5000.00, 8, 7, 'disponible'),
	(9, '2026-02-15 04:36:16', '2025-12-01 05:00:00', 50, 0, 1200.00, 2200.00, 9, 1, 'vencido'),
	(10, '2026-02-15 04:36:16', '2026-07-22 05:00:00', 80, 0, 2000.00, 3500.00, 10, 9, 'agotado');

-- Dumping data for table core_project_BAN_00341.mod_merma_mermas: ~0 rows (approximately)
INSERT INTO `mod_merma_mermas` (`id`, `id_lote`, `id_tipo_merma`, `fecha_reporte`, `valor_perdido`, `observacioens`, `cantidad`) VALUES
	(51, 1, 4, '2026-02-15 04:41:26', 5000.00, 'Dos bolsas de leche rotas en descarga', 2),
	(52, 3, 4, '2026-02-15 04:41:26', 9000.00, 'Pérdida de vacío en empaque de jamón', 2),
	(53, 6, 4, '2026-02-15 04:41:26', 3200.00, 'Pan de molde aplastado', 1),
	(54, 9, 4, '2026-02-15 04:41:26', 60000.00, 'Lote completo de snacks vencido', 50),
	(55, 2, 7, '2026-02-15 04:41:26', 3600.00, 'Bolsa de arroz mojada', 2),
	(56, 5, 7, '2026-02-15 04:41:26', 7500.00, 'Faltante en inventario cíclico', 1),
	(57, 1, 7, '2026-02-15 04:41:26', 2500.00, 'Leche con mal olor prematuro', 1),
	(58, 7, 9, '2026-02-15 04:41:26', 6200.00, 'Aceite con envase perforado', 1),
	(59, 3, 9, '2026-02-15 04:41:26', 4500.00, 'Producto roído por ratones', 1),
	(60, 4, 9, '2026-02-15 04:41:26', 1600.00, 'Botellas de agua abolladas', 2);

-- Dumping data for table core_project_BAN_00341.mod_merma_tipos: ~10 rows (approximately)
INSERT INTO `mod_merma_tipos` (`id`, `nombre`) VALUES
	(11, 'Consumo Interno'),
	(5, 'Daño Físico / Rotura'),
	(9, 'Deterioro por Humedad'),
	(10, 'Devolución Proveedor'),
	(8, 'Error de Empaque'),
	(6, 'Falla de Cadena de Frío'),
	(12, 'Muestra Comercial'),
	(13, 'Plagas'),
	(7, 'Robo o Extravío'),
	(4, 'Vencimiento');

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo: ~35 rows (approximately)
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
	(27, 'Asignar productos', 'asignar_productos', 0, 1, 'Permiso asignar_productos, submodulo categorias, modulo catalogo', 25),
	(28, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo categorias, modulo catalogo', 25),
	(29, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo categorias, modulo catalogo', 25),
	(30, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo categorias, modulo catalogo', 25),
	(31, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo categorias, modulo catalogo', 25),
	(32, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo categorias, modulo catalogo', 25),
	(33, 'Ver', 'ver', 0, 1, 'Permiso ver, submodulo proveedores, modulo catalogo', 26),
	(34, 'Crear', 'crear', 0, 1, 'Permiso crear, submodulo proveedores, modulo catalogo', 26),
	(35, 'Editar', 'editar', 0, 1, 'Permiso editar, submodulo proveedores, modulo catalogo', 26),
	(36, 'Eliminar (individual)', 'eliminar_individual', 0, 1, 'Permiso eliminar_individual, submodulo proveedores, modulo catalogo', 26),
	(37, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo proveedores, modulo catalogo', 26);

-- Dumping data for table core_project_BAN_00341.mod_permisos_modulo_asignacion: ~24 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`) VALUES
	(2, 'Administradores', 'administradores', 'Modulo Usuarios', 1, 1),
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
	(61, 'Administradores', 'administradores', 'Modulo Usuarios', 1, 19),
	(63, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 19),
	(64, 'Finales', 'finales', 'Modulo Usuarios', 1, 19),
	(66, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 19),
	(79, 'Modulos', 'modulos', 'Modulo modulos', NULL, 19),
	(81, 'Finales', 'finales', 'Modulo Usuarios', 1, 1),
	(82, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 1),
	(83, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1);

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

-- Dumping data for table core_project_BAN_00341.mod_usuarios_user: ~38 rows (approximately)
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