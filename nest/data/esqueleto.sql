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


-- Dumping database structure for BAN_00341
DROP DATABASE IF EXISTS `BAN_00341`;
CREATE DATABASE IF NOT EXISTS `BAN_00341` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `BAN_00341`;

-- Dumping structure for table BAN_00341.mod_bodega
DROP TABLE IF EXISTS `mod_bodega`;
CREATE TABLE IF NOT EXISTS `mod_bodega` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lote` varchar(50) NOT NULL,
  `fecha_entrada` bigint(20) NOT NULL,
  `fecha_vencimiento` bigint(20) DEFAULT NULL,
  `cantidad_comprada` int(11) NOT NULL DEFAULT 0,
  `cantidad_vendida` int(11) NOT NULL DEFAULT 0,
  `cantidad_en_bodega` int(11) NOT NULL DEFAULT 0,
  `estado` enum('disponible','vencido','agotado') NOT NULL DEFAULT 'disponible',
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6138e455f12a930432c960966c3` (`id_producto`),
  KEY `FK_a707728565e09c6c5106a8335d1` (`id_proveedor`),
  CONSTRAINT `FK_6138e455f12a930432c960966c3` FOREIGN KEY (`id_producto`) REFERENCES `mod_catalogo_productos` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_a707728565e09c6c5106a8335d1` FOREIGN KEY (`id_proveedor`) REFERENCES `mod_catalogo_proveedores` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_marcas
DROP TABLE IF EXISTS `mod_catalogo_marcas`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_09768fd7375b60a05e91503d04` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_medida
DROP TABLE IF EXISTS `mod_catalogo_medida`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_medida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c279395252b4528e7bf8594d23` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_productos
DROP TABLE IF EXISTS `mod_catalogo_productos`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `stock_minimo` int(11) NOT NULL,
  `es_perecedero` tinyint(1) NOT NULL DEFAULT 1,
  `alerta_amarilla` int(11) DEFAULT NULL,
  `alerta_naranja` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `codigo_barra` varchar(13) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `id_medida` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_58c1252afc49ad323e7c5a3c0a` (`codigo_barra`),
  KEY `FK_f3087ae9693d048e2a9aba091a5` (`id_marca`),
  KEY `FK_50698dc31a0aa1ea5a81d79ea92` (`id_medida`),
  CONSTRAINT `FK_50698dc31a0aa1ea5a81d79ea92` FOREIGN KEY (`id_medida`) REFERENCES `mod_catalogo_medida` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f3087ae9693d048e2a9aba091a5` FOREIGN KEY (`id_marca`) REFERENCES `mod_catalogo_marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_proveedores
DROP TABLE IF EXISTS `mod_catalogo_proveedores`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `dv` char(1) NOT NULL,
  `nit` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_20124d60355ae6fbf4410be1f5` (`nit`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_merma_mermas
DROP TABLE IF EXISTS `mod_merma_mermas`;
CREATE TABLE IF NOT EXISTS `mod_merma_mermas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `fecha_reporte` bigint(20) NOT NULL,
  `observacion` text NOT NULL,
  `id_tipo_merma` int(11) NOT NULL,
  `id_lote` int(11) NOT NULL,
  `valor_perdido` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_f936b059227146a8e5f1ffaec0a` (`id_tipo_merma`),
  KEY `FK_c43c67defe5b3af684b4065015b` (`id_lote`),
  CONSTRAINT `FK_c43c67defe5b3af684b4065015b` FOREIGN KEY (`id_lote`) REFERENCES `mod_bodega` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_f936b059227146a8e5f1ffaec0a` FOREIGN KEY (`id_tipo_merma`) REFERENCES `mod_merma_tipos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_merma_tipos
DROP TABLE IF EXISTS `mod_merma_tipos`;
CREATE TABLE IF NOT EXISTS `mod_merma_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d4131d037acc1ff2cb862fe550` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_permisos_modulo
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
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_permisos_modulo_asignacion
DROP TABLE IF EXISTS `mod_permisos_modulo_asignacion`;
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo_asignacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_modulo` int(11) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6eb0af2f8e13274ad1819f4cfca` (`user_id`),
  CONSTRAINT `FK_6eb0af2f8e13274ad1819f4cfca` FOREIGN KEY (`user_id`) REFERENCES `mod_usuarios_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=899 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_registro_ventas
DROP TABLE IF EXISTS `mod_registro_ventas`;
CREATE TABLE IF NOT EXISTS `mod_registro_ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_factura` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fecha_venta` int(11) NOT NULL,
  `nro_factura` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_usuarios_admin
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
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_usuarios_user
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_vars_json
DROP TABLE IF EXISTS `mod_vars_json`;
CREATE TABLE IF NOT EXISTS `mod_vars_json` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `valor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`valor`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_vars_var
DROP TABLE IF EXISTS `mod_vars_var`;
CREATE TABLE IF NOT EXISTS `mod_vars_var` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `valor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure BAN_00341.sp_notificaciones_perecederos
DROP PROCEDURE IF EXISTS `sp_notificaciones_perecederos`;
DELIMITER //
CREATE PROCEDURE `sp_notificaciones_perecederos`(
    IN `p_pagina_actual` INT,
    IN `p_registros_por_pagina` INT,
    IN `p_order_field` VARCHAR(50),
    IN `p_order_direction` VARCHAR(4),
    -- Nuevos parámetros de filtrado (si van NULL o '', no aplican)
    IN `p_lote` VARCHAR(100),
    IN `p_codigo_barra` VARCHAR(100),
    IN `p_nombre_producto` VARCHAR(100),
    IN `p_estado_alerta` VARCHAR(100),
    IN `p_cantidad_comprada_min` DECIMAL(12,4),
    IN `p_cantidad_comprada_max` DECIMAL(12,4),
    IN `p_cantidad_vendida_min` DECIMAL(12,4),
    IN `p_cantidad_vendida_max` DECIMAL(12,4),
    IN `p_cantidad_bodega_min` DECIMAL(12,4),
    IN `p_cantidad_bodega_max` DECIMAL(12,4),
    IN `p_dias_restantes_min` INT,
    IN `p_dias_restantes_max` INT,
    IN `p_fecha_entrada_min` BIGINT,
    IN `p_fecha_entrada_max` BIGINT,
    IN `p_fecha_vencimiento_min` BIGINT,
    IN `p_fecha_vencimiento_max` BIGINT
)
BEGIN
    -- Declaración de variables
    DECLARE v_offset INT;
    DECLARE v_total_registros INT;
    DECLARE v_sql_query TEXT;
    
    -- 1. Normalización de parámetros de paginación
    SET p_pagina_actual = IFNULL(p_pagina_actual, 1);
    SET p_registros_por_pagina = IFNULL(p_registros_por_pagina, 10);
    SET v_offset = (p_pagina_actual - 1) * p_registros_por_pagina;

    -- 2. Normalización de parámetros de ordenamiento (con valores por defecto y seguridad)
    SET p_order_field = LOWER(IFNULL(p_order_field, 'fecha_vencimiento'));
    SET p_order_direction = UPPER(IFNULL(p_order_direction, 'ASC'));
    
    -- Validar dirección para evitar inyección SQL
    IF p_order_direction NOT IN ('ASC', 'DESC') THEN
        SET p_order_direction = 'ASC';
    END IF;

    -- Validar que la columna solicitada exista en la tabla temporal para evitar errores
    SET p_order_field = CASE p_order_field
        WHEN 'id_producto' THEN 'id_producto'
        WHEN 'lote' THEN 'lote'
        WHEN 'fecha_entrada' THEN 'fecha_entrada'
        WHEN 'fecha_vencimiento' THEN 'fecha_vencimiento'
        WHEN 'dias_restantes' THEN 'dias_restantes'
        WHEN 'estado_alerta' THEN 'estado_alerta'
        WHEN 'cantidad_comprada' THEN 'cantidad_comprada'
        WHEN 'cantidad_vendida' THEN 'cantidad_vendida'
        WHEN 'estado' THEN 'estado'
        WHEN 'codigo_barra' THEN 'codigo_barra'
        WHEN 'nombre_producto' THEN 'nombre_producto'
        WHEN 'nombre_proveedor' THEN 'nombre_proveedor'
        WHEN 'cantidad_en_bodega' THEN 'cantidad_en_bodega'
        ELSE 'fecha_vencimiento' -- Columna por defecto si mandan una inválida
    END;

    -- 3. Crear tabla temporal con la lógica de negocio y filtros inteligentes
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
    
    CREATE TEMPORARY TABLE temp_notificaciones_stock AS
    SELECT * FROM (
        SELECT
            mb.id_producto,
            mb.lote,
            FROM_UNIXTIME(mb.fecha_entrada) AS fecha_entrada,
            IF(mb.fecha_vencimiento IS NULL, '**********', FROM_UNIXTIME(mb.fecha_vencimiento)) AS fecha_vencimiento,
            IF(mb.fecha_vencimiento IS NULL, '**********', DATEDIFF(FROM_UNIXTIME(mb.fecha_vencimiento), CURDATE())) AS dias_restantes,
            CASE 
                WHEN DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) > mcprod.alerta_amarilla THEN 'Artículo en alerta verde' 
                WHEN DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) > mcprod.alerta_naranja 
                    AND DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) <= mcprod.alerta_amarilla THEN 'Artículo en alerta amarilla'
                WHEN DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) > 3 
                    AND DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) <= mcprod.alerta_naranja THEN 'Artículo en alerta naranja' 
                WHEN DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) <= 3 
                    AND DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) >= 0 THEN 'Artículo en alerta roja' 
                WHEN DATEDIFF(DATE(FROM_UNIXTIME(mb.fecha_vencimiento)), CURDATE()) < 0 THEN 'Artículo vencido'
                ELSE 'Artículo no perecedero'
            END AS estado_alerta,
            mb.cantidad_comprada,
            mb.cantidad_vendida,
            mb.estado,
            mcprod.codigo_barra AS codigo_barra,
            mcprod.nombre AS nombre_producto,
            mcprov.razon_social AS nombre_proveedor,
            mb.cantidad_en_bodega
        FROM mod_bodega mb
        LEFT JOIN mod_catalogo_productos mcprod ON mb.id_producto = mcprod.id
        LEFT JOIN mod_catalogo_proveedores mcprov ON mb.id_proveedor = mcprov.id
        WHERE mb.cantidad_en_bodega > 1 
        AND mb.fecha_vencimiento IS NOT NULL
        AND mb.estado = 'disponible'
        -- Filtros de texto (Soportan NULL o '')
        AND (p_lote IS NULL OR p_lote = '' OR mb.lote LIKE CONCAT('%', p_lote, '%'))
        AND (p_codigo_barra IS NULL OR p_codigo_barra = '' OR mcprod.codigo_barra LIKE CONCAT('%', p_codigo_barra, '%'))
        AND (p_nombre_producto IS NULL OR p_nombre_producto = '' OR mcprod.nombre LIKE CONCAT('%', p_nombre_producto, '%'))
        
        -- Filtros de rangos numéricos y de fechas (Min / Max)
        AND (p_cantidad_comprada_min IS NULL OR mb.cantidad_comprada >= p_cantidad_comprada_min)
        AND (p_cantidad_comprada_max IS NULL OR mb.cantidad_comprada <= p_cantidad_comprada_max)
        AND (p_cantidad_vendida_min IS NULL OR mb.cantidad_vendida >= p_cantidad_vendida_min)
        AND (p_cantidad_vendida_max IS NULL OR mb.cantidad_vendida <= p_cantidad_vendida_max)
        AND (p_cantidad_bodega_min IS NULL OR mb.cantidad_en_bodega >= p_cantidad_bodega_min)
        AND (p_cantidad_bodega_max IS NULL OR mb.cantidad_en_bodega <= p_cantidad_bodega_max)
        AND (p_dias_restantes_min IS NULL OR DATEDIFF(FROM_UNIXTIME(mb.fecha_vencimiento), CURDATE()) >= p_dias_restantes_min)
        AND (p_dias_restantes_max IS NULL OR DATEDIFF(FROM_UNIXTIME(mb.fecha_vencimiento), CURDATE()) <= p_dias_restantes_max)
        AND (p_fecha_entrada_min IS NULL OR mb.fecha_entrada >= p_fecha_entrada_min)
        AND (p_fecha_entrada_max IS NULL OR mb.fecha_entrada <= p_fecha_entrada_max)
        AND (p_fecha_vencimiento_min IS NULL OR mb.fecha_vencimiento >= p_fecha_vencimiento_min)
        AND (p_fecha_vencimiento_max IS NULL OR mb.fecha_vencimiento <= p_fecha_vencimiento_max)
    ) AS subquery
    WHERE (p_estado_alerta IS NULL OR p_estado_alerta = '' OR estado_alerta LIKE CONCAT('%', p_estado_alerta, '%'));

    -- 4. Obtener el total para la paginación
    SELECT COUNT(*) INTO v_total_registros FROM temp_notificaciones_stock;

    -- 5. Retornar Metadatos
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 6. Retornar Datos paginados con Ordenamiento Dinámico
    SET @inicio = v_offset;
    SET @l = p_registros_por_pagina;
    SET @o = v_offset;

    -- Construcción segura de la consulta dinámica incluyendo el consecutivo
    SET v_sql_query = CONCAT(
        'SELECT
            (@inicio := @inicio + 1) AS id,
            t.*
        FROM temp_notificaciones_stock t
        ORDER BY ',
        p_order_field, ' ', p_order_direction,
        ' LIMIT ? OFFSET ?'
    );

    PREPARE stmt FROM v_sql_query;
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- 7. Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
END//
DELIMITER ;

-- Dumping structure for procedure BAN_00341.sp_reporte_permisos_paginado
DROP PROCEDURE IF EXISTS `sp_reporte_permisos_paginado`;
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

-- Dumping structure for procedure BAN_00341.sp_reporte_stock_paginado
DROP PROCEDURE IF EXISTS `sp_reporte_stock_paginado`;
DELIMITER //
CREATE PROCEDURE `sp_reporte_stock_paginado`(
    IN `p_pagina_actual` INT,
    IN `p_registros_por_pagina` INT,
    IN `p_order_field` VARCHAR(50),
    IN `p_order_direction` VARCHAR(4),
    -- Parámetros de filtrado
    IN `p_codigo_barra` VARCHAR(100),
    IN `p_nombre_producto` VARCHAR(100),
    IN `p_stock_min` DECIMAL(12,4),
    IN `p_stock_max` DECIMAL(12,4),
    IN `p_bodega_min` DECIMAL(12,4),
    IN `p_bodega_max` DECIMAL(12,4),
    IN `p_aviso_stock` VARCHAR(100)
)
    COMMENT 'Reporte de stock paginado con ordenamiento dinámico seguro'
BEGIN
    -- Declaración de variables
    DECLARE v_offset INT;
    DECLARE v_total_registros INT;
    DECLARE v_sql_query TEXT;
    
    -- 1. Normalización de parámetros de paginación
    SET p_pagina_actual = IFNULL(p_pagina_actual, 1);
    SET p_registros_por_pagina = IFNULL(p_registros_por_pagina, 10);
    SET v_offset = (p_pagina_actual - 1) * p_registros_por_pagina;

    -- 2. Normalización de parámetros de ordenamiento (con valores por defecto y seguridad)
    SET p_order_field = LOWER(IFNULL(p_order_field, 'nombre'));
    SET p_order_direction = UPPER(IFNULL(p_order_direction, 'ASC'));
    
    -- Validar dirección para evitar inyección SQL
    IF p_order_direction NOT IN ('ASC', 'DESC') THEN
        SET p_order_direction = 'ASC';
    END IF;

    -- Validar que la columna solicitada exista en la tabla temporal (Whitelist correspondiente a este SP)
    SET p_order_field = CASE p_order_field
        WHEN 'nombre' THEN 'nombre'
        WHEN 'stock_minimo' THEN 'stock_minimo'
        WHEN 'total_productos_disponibles' THEN 'total_productos_disponibles'
        WHEN 'aviso_stock' THEN 'aviso_stock'
        ELSE 'nombre' -- Columna por defecto si envían una inválida
    END;

    -- 3. Crear tabla temporal con la lógica de negocio de stock y aplicación de filtros opcionales
    DROP TEMPORARY TABLE IF EXISTS temp_stock_reporte;
    
    CREATE TEMPORARY TABLE temp_stock_reporte AS
    SELECT 
        t.nombre,
        t.codigo_barra,
        t.stock_minimo,
        t.total_productos_disponibles,
        CASE          
            WHEN t.total_productos_disponibles = 0
                THEN 'ADVERTENCIA: Stock agotado'
            WHEN t.total_productos_disponibles > t.stock_minimo
                THEN 'ADVERTENCIA: Aun cuenta con stock disponible'
            WHEN t.total_productos_disponibles = t.stock_minimo
                THEN 'ADVERTENCIA: Está al limite de su stock'
            WHEN t.total_productos_disponibles < t.stock_minimo AND t.total_productos_disponibles > 0 
                THEN 'ADVERTENCIA: Pedir ya, bajo el mínimo'
        END AS aviso_stock
    FROM (
        SELECT 
            mcp.id,
            mcp.nombre,
            mcp.codigo_barra,
            mcp.stock_minimo,
            COALESCE((
                SELECT SUM(mb.cantidad_en_bodega)
                FROM mod_bodega mb
                WHERE mb.id_producto = mcp.id
                AND mb.estado = 'disponible'
            ), 0) AS total_productos_disponibles
        FROM mod_catalogo_productos mcp
        WHERE mcp.estado = true
    ) AS t;

    -- 4. Crear tabla temporal final aplicando el filtro de aviso_stock sobre el campo ya calculado
    DROP TEMPORARY TABLE IF EXISTS temp_stock_filtrado;
    
    CREATE TEMPORARY TABLE temp_stock_filtrado AS
    SELECT *
    FROM temp_stock_reporte
    WHERE (p_nombre_producto IS NULL OR nombre LIKE CONCAT('%', p_nombre_producto, '%'))
      AND (p_codigo_barra IS NULL OR codigo_barra LIKE CONCAT('%', p_codigo_barra, '%'))
      AND (p_stock_min IS NULL OR stock_minimo >= p_stock_min)
      AND (p_stock_max IS NULL OR stock_minimo <= p_stock_max)
      AND (p_bodega_min IS NULL OR total_productos_disponibles >= p_bodega_min)
      AND (p_bodega_max IS NULL OR total_productos_disponibles <= p_bodega_max)
      AND (p_aviso_stock IS NULL OR aviso_stock LIKE CONCAT('%', p_aviso_stock, '%'));

    -- 5. Obtener el total para la paginación
    SELECT COUNT(*) INTO v_total_registros FROM temp_stock_filtrado;

    -- 6. Retornar Metadatos
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 7. Retornar Datos paginados con Ordenamiento Dinámico
    SET @l = p_registros_por_pagina;
    SET @o = v_offset;
    
    -- Construcción segura de la consulta dinámica incluyendo ORDER BY
    SET v_sql_query = CONCAT(
        'SELECT * FROM temp_stock_filtrado ORDER BY ', 
        p_order_field, ' ', p_order_direction, 
        ' LIMIT ? OFFSET ?'
    );
    
    PREPARE stmt FROM v_sql_query;
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- 8. Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_stock_reporte;
    DROP TEMPORARY TABLE IF EXISTS temp_stock_filtrado;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
