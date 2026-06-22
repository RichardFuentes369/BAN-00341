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

-- Dumping structure for procedure BAN_00341.sp_reporte_stock_paginado
DROP PROCEDURE IF EXISTS `sp_reporte_stock_paginado`;
DELIMITER //
CREATE PROCEDURE `sp_reporte_stock_paginado`(
    IN p_pagina_actual INT,
    IN p_registros_por_pagina INT
)
BEGIN
    -- Declaración de variables
    DECLARE v_offset INT;
    DECLARE v_limit INT;
    DECLARE v_total_registros INT;
    
    -- 1. LÓGICA DE PAGINACIÓN SEGURA
    IF p_registros_por_pagina IS NULL OR p_registros_por_pagina <= 0 THEN
        SET v_limit = 999999999; 
        SET v_offset = 0;
    ELSE
        SET v_limit = p_registros_por_pagina;
        SET v_offset = (IFNULL(p_pagina_actual, 1) - 1) * p_registros_por_pagina;
    END IF;

    -- 2. TABLA TEMPORAL CON LA LÓGICA DE TU CONSULTA
    DROP TEMPORARY TABLE IF EXISTS temp_stock_reporte;
    
    CREATE TEMPORARY TABLE temp_stock_reporte AS
    SELECT 
        t.nombre,
        t.stock_minimo,
        t.total_productos_disponibles,
        CASE 		  
            WHEN t.total_productos_disponibles = 0
                THEN 'ADVERTENCIA: Stock agotado'
            WHEN t.total_productos_disponibles > t.stock_minimo
                THEN 'ADVERTENCIA: Aun cuenta con stock disponible'
            WHEN t.total_productos_disponibles = t.stock_minimo
                THEN 'ADVERTENCIA: Está al limite de su stock '
            WHEN t.total_productos_disponibles < t.stock_minimo AND t.total_productos_disponibles > 0 
                THEN 'ADVERTENCIA: Pedir ya, bajo el mínimo'
        END AS aviso_stock
    FROM (
        SELECT 
            mcp.id,
            mcp.nombre,
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

    -- 3. TOTALES
    SELECT COUNT(*) INTO v_total_registros FROM temp_stock_reporte;

    -- 4. RESULTADO 1: METADATOS
    SELECT 
        v_total_registros AS total,
        IFNULL(p_registros_por_pagina, v_total_registros) AS perPage,
        IFNULL(p_pagina_actual, 1) AS currentPage,
        CEIL(v_total_registros / IFNULL(p_registros_por_pagina, v_total_registros)) AS lastPage;

    -- 5. RESULTADO 2: DATOS PAGINADOS
    SET @l = v_limit;
    SET @o = v_offset;
    
    PREPARE stmt FROM 'SELECT * FROM temp_stock_reporte LIMIT ? OFFSET ?';
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_stock_reporte;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
