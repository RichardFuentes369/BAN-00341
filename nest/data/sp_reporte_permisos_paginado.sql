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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
