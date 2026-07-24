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

USE `BAN_00341`;

-- Dumping structure for procedure BAN_00341.sp_notificaciones_perecederos
DROP PROCEDURE IF EXISTS `sp_notificaciones_perecederos`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_notificaciones_perecederos`(
	IN `p_pagina_actual` INT,
	IN `p_registros_por_pagina` INT,
	IN `p_order_field` VARCHAR(50),
	IN `p_order_direction` VARCHAR(4)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
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
        WHEN 'nombre_producto' THEN 'nombre_producto'
        WHEN 'nombre_proveedor' THEN 'nombre_proveedor'
        WHEN 'cantidad_en_bodega' THEN 'cantidad_en_bodega'
        ELSE 'fecha_vencimiento' -- Columna por defecto si mandan una inválida
    END;

    -- 3. Crear tabla temporal con la lógica de negocio
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
    
    CREATE TEMPORARY TABLE temp_notificaciones_stock AS
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
        mcprod.nombre AS nombre_producto,
        mcprov.razon_social AS nombre_proveedor,
        mb.cantidad_en_bodega
    FROM mod_bodega mb
    LEFT JOIN mod_catalogo_productos mcprod ON mb.id_producto = mcprod.id
    LEFT JOIN mod_catalogo_proveedores mcprov ON mb.id_proveedor = mcprov.id
    WHERE mb.cantidad_en_bodega > 1 
    AND mb.fecha_vencimiento IS NOT NULL;

    -- 4. Obtener el total para la paginación
    SELECT COUNT(*) INTO v_total_registros FROM temp_notificaciones_stock;

    -- 5. Retornar Metadatos
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 6. Retornar Datos paginados con Ordenamiento Dinámico
    SET @l = p_registros_por_pagina;
    SET @o = v_offset;
    
    -- Construcción segura de la consulta dinámica incluyendo ORDER BY
    SET v_sql_query = CONCAT(
        'SELECT * FROM temp_notificaciones_stock ORDER BY ', 
        p_order_field, ' ', p_order_direction, 
        ' LIMIT ? OFFSET ?'
    );
    
    PREPARE stmt FROM v_sql_query;
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- 7. Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
END