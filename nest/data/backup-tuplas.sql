-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.13-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
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

-- Volcando datos para la tabla core_project_BAN_00341.mod_catalogo_categorias: ~10 rows (aproximadamente)
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

-- Volcando datos para la tabla core_project_BAN_00341.mod_catalogo_productos: ~10 rows (aproximadamente)
INSERT INTO `mod_catalogo_productos` (`id`, `codigo_barra`, `nombre`, `stock_minimo`, `unidad_medida`, `id_categoria`) VALUES
	(1, '770123456001', 'Leche Entera 1L', 20, 'kg', 1),
	(2, '770123456002', 'Arroz Blanco 1kg', 50, 'kg', 1),
	(3, '770123456003', 'Jamón de Cerdo 250g', 10, 'kg', 1),
	(4, '770123456004', 'Agua Mineral 500ml', 30, 'kg', 1),
	(5, '770123456005', 'Detergente en Polvo 1kg', 15, 'kg', 1),
	(6, '770123456006', 'Pan de Molde Familiar', 12, 'kg', 1),
	(7, '770123456007', 'Aceite de Girasol 1L', 10, 'kg', 1),
	(8, '770123456008', 'Atún en Agua 170g', 20, 'kg', 1),
	(9, '770123456009', 'Papas Fritas Naturales', 25, 'kg', 1),
	(10, '770123456010', 'Manzanas Rojas x6', 8, 'kg', 1);

-- Volcando datos para la tabla core_project_BAN_00341.mod_catalogo_proveedores: ~10 rows (aproximadamente)
INSERT INTO `mod_catalogo_proveedores` (`id`, `nit`, `razon_social`, `direccion`, `correo`, `telefono`) VALUES
	(1, 9001234561, 'Distribuidora Alimentos Express S.A.', 'Calle 45 #10-20', 'ventas@alimentos.com', '6012345678'),
	(2, 9007890122, 'Lácteos del Campo Ltda', 'Carrera 15 #5-30', 'contacto@lacteos.com', '6019876543'),
	(3, 8005554443, 'Cárnicos Gourmet SAS', 'Zona Industrial Sur', 'pedidos@carnicos.com', '6012223334'),
	(4, 9106667774, 'Bebidas del Valle S.A.', 'Av. Central 88', 'logistica@bebidas.co', '6014445556'),
	(5, 8601112225, 'Panadería Central de Colombia', 'Calle 12 #4-15', 'admin@pancentral.com', '6017778889'),
	(6, 9013334446, 'Granos y Semillas de la Sabana', 'Puerto Seco Local 5', 'info@granos.com', '6013339990'),
	(7, 8009998887, 'Importaciones Express S.A.S', 'Calle del Comercio 9', 'ventas@importexpress.com', '6016665554'),
	(8, 9002221118, 'Químicos y Limpieza Total', 'Transversal 7 #2-10', 'comercial@limpieza.com', '6018990001'),
	(9, 8304445559, 'Frutas y Verduras El Jardín', 'Plaza Mayor Mod 4', 'fresco@eljardin.com', '6011112223'),
	(10, 9008887770, 'Empaques y Desechables del Caribe', 'Km 5 Vía Mar', 'servicio@empaques.co', '6015556667');

-- Volcando datos para la tabla core_project_BAN_00341.mod_lote: ~10 rows (aproximadamente)
INSERT INTO `mod_lote` (`id`, `fecha_entrada`, `fecha_vencimiento`, `cantidad_inicial`, `stock_actual`, `costo_unitario`, `precio_venta_sugerido`, `estado`, `id_producto`, `id_proveedor`) VALUES
	(1, '2026-02-15 04:36:16', '2026-05-20 05:00:00', 100, 85, 2500.00, 3200.00, 'disponible', 1, 1),
	(2, '2026-02-15 04:36:16', '2027-01-15 05:00:00', 200, 190, 1800.00, 2400.00, 'disponible', 1, 1),
	(3, '2026-02-15 04:36:16', '2026-03-10 05:00:00', 50, 42, 4500.00, 5800.00, 'disponible', 1, 1),
	(4, '2026-02-15 04:36:16', '2027-12-01 05:00:00', 300, 300, 800.00, 1500.00, 'disponible', 1, 1),
	(5, '2026-02-15 04:36:16', '2028-06-30 05:00:00', 40, 35, 7500.00, 9500.00, 'disponible', 1, 1),
	(6, '2026-02-15 04:36:16', '2026-02-28 05:00:00', 30, 10, 3200.00, 4500.00, 'disponible', 1, 1),
	(7, '2026-02-15 04:36:16', '2027-08-14 05:00:00', 60, 58, 6200.00, 8200.00, 'disponible', 1, 1),
	(8, '2026-02-15 04:36:16', '2028-11-20 05:00:00', 100, 100, 3800.00, 5000.00, 'disponible', 1, 1),
	(9, '2026-02-15 04:36:16', '2025-12-01 05:00:00', 50, 0, 1200.00, 2200.00, 'vencido', 1, 1),
	(10, '2026-02-15 04:36:16', '2026-07-22 05:00:00', 80, 0, 2000.00, 3500.00, 'agotado', 1, 1);

-- Volcando datos para la tabla core_project_BAN_00341.mod_merma_mermas: ~10 rows (aproximadamente)
INSERT INTO `mod_merma_mermas` (`id`, `cantidad`, `fecha_reporte`, `valor_perdido`, `observaciones`, `id_tipo_merma`, `id_lote`) VALUES
	(1, 2, '2026-02-15 04:41:26', 5000.00, 'Dos bolsas de leche rotas en descarga', 1, 1),
	(2, 2, '2026-02-15 04:41:26', 9000.00, 'Pérdida de vacío en empaque de jamón', 2, 2),
	(3, 1, '2026-02-15 04:41:26', 3200.00, 'Pan de molde aplastado', 3, 3),
	(4, 50, '2026-02-15 04:41:26', 60000.00, 'Lote completo de snacks vencido', 1, 4),
	(5, 2, '2026-02-15 04:41:26', 3600.00, 'Bolsa de arroz mojada', 2, 7),
	(6, 1, '2026-02-15 04:41:26', 7500.00, 'Faltante en inventario cíclico', 3, 8),
	(7, 1, '2026-02-15 04:41:26', 2500.00, 'Leche con mal olor prematuro', 4, 9),
	(8, 1, '2026-02-15 04:41:26', 6200.00, 'Aceite con envase perforado', 1, 10),
	(9, 1, '2026-02-15 04:41:26', 4500.00, 'Producto roído por ratones', 1, 9),
	(10, 2, '2026-02-15 04:41:26', 1600.00, 'Botellas de agua abolladas', 1, 8);

-- Volcando datos para la tabla core_project_BAN_00341.mod_merma_tipos: ~10 rows (aproximadamente)
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

-- Volcando datos para la tabla core_project_BAN_00341.mod_permisos_modulo: ~35 rows (aproximadamente)
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
	(37, 'Eliminar (multiple)', 'eliminar_multiple', 0, 1, 'Permiso eliminar_multiple, submodulo proveedores, modulo catalogo', 26);


-- Volcando datos para la tabla core_project_BAN_00341.mod_permisos_modulo_asignacion: ~24 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`) VALUES
  (1, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1),
  (2, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 1, 1),
  (3, 'Permisos (asignar)\r\n', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 1);


-- Volcando datos para la tabla core_project_BAN_00341.mod_usuarios_admin: ~13 rows (aproximadamente)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Admin1', 'Principal', 'admin1@correo.com', 'Qwerty9601', 1),
	(2, 'admin2', 'admin2', 'admin2@correo.com', 'Qwerty9601', 1);

-- Volcando datos para la tabla core_project_BAN_00341.mod_usuarios_user: ~17 rows (aproximadamente)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'final1', 'final1', 'final1@gmail.com', 'Qwerty9601', 1),
	(2, 'final2', 'final2', 'final2@gmail.com', 'Qwerty9601', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
