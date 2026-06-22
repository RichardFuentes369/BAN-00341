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

-- Dumping structure for procedure BAN_00341.sp_notificaciones_perecederos
DROP PROCEDURE IF EXISTS `sp_notificaciones_perecederos`;
DELIMITER //
CREATE PROCEDURE `sp_notificaciones_perecederos`(
    IN p_pagina_actual INT,
    IN p_registros_por_pagina INT
)
BEGIN
    -- Declaración de variables
    DECLARE v_offset INT;
    DECLARE v_total_registros INT;
    
    -- 1. Normalización de parámetros
    SET p_pagina_actual = IFNULL(p_pagina_actual, 1);
    SET p_registros_por_pagina = IFNULL(p_registros_por_pagina, 10);
    SET v_offset = (p_pagina_actual - 1) * p_registros_por_pagina;

    -- 2. Crear tabla temporal con la lógica de negocio
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
    
    CREATE TEMPORARY TABLE temp_notificaciones_stock AS
    SELECT 
        mb.id_producto,
        mb.lote,
        FROM_UNIXTIME(mb.fecha_entrada) AS fecha_entrada,
        FROM_UNIXTIME(mb.fecha_vencimiento) AS fecha_vencimiento,
        DATEDIFF(FROM_UNIXTIME(mb.fecha_vencimiento), CURDATE()) AS dias_restantes,
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
    WHERE mb.cantidad_en_bodega > 1;

    -- 3. Obtener el total para la paginación
    SELECT COUNT(*) INTO v_total_registros FROM temp_notificaciones_stock;

    -- 4. Retornar Metadatos
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 5. Retornar Datos paginados
    SET @l = p_registros_por_pagina;
    SET @o = v_offset;
    
    PREPARE stmt FROM 'SELECT * FROM temp_notificaciones_stock LIMIT ? OFFSET ?';
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- 6. Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_notificaciones_stock;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
