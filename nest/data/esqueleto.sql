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

-- Dumping structure for table BAN_00341.mod_catalogo_marcas
DROP TABLE IF EXISTS `mod_catalogo_marcas`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_09768fd7375b60a05e91503d04` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_medida
DROP TABLE IF EXISTS `mod_catalogo_medida`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_medida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c279395252b4528e7bf8594d23` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_catalogo_productos
DROP TABLE IF EXISTS `mod_catalogo_productos`;
CREATE TABLE IF NOT EXISTS `mod_catalogo_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `unidad_medida` enum('unidad','kg','litro','paquete') NOT NULL DEFAULT 'kg',
  `stock_minimo` int(11) NOT NULL,
  `es_perecedero` tinyint(1) NOT NULL DEFAULT 1,
  `alerta_amarilla` int(11) DEFAULT NULL,
  `alerta_naranja` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `codigo_barra` varchar(13) NOT NULL,
  `id_marca` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_58c1252afc49ad323e7c5a3c0a` (`codigo_barra`),
  KEY `FK_f3087ae9693d048e2a9aba091a5` (`id_marca`),
  CONSTRAINT `FK_f3087ae9693d048e2a9aba091a5` FOREIGN KEY (`id_marca`) REFERENCES `mod_catalogo_marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_lote
DROP TABLE IF EXISTS `mod_lote`;
CREATE TABLE IF NOT EXISTS `mod_lote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lote` varchar(50) NOT NULL,
  `fecha_entrada` bigint(20) NOT NULL,
  `fecha_vencimiento` bigint(20) DEFAULT NULL,
  `cantidad_comprada` int(11) NOT NULL DEFAULT 0,
  `cantidad_vendida` int(11) NOT NULL DEFAULT 0,
  `stock` int(11) NOT NULL DEFAULT 0,
  `costo_unitario` decimal(10,2) NOT NULL DEFAULT 0.00,
  `precio_venta_sugerido` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` enum('disponible','vencido','agotado') NOT NULL DEFAULT 'disponible',
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0fa3203835ac3fa160d1931dbb` (`lote`),
  KEY `FK_c092e4d64074c5be85e9116dd94` (`id_producto`),
  KEY `FK_2a6dab7c1ebe24649a8d88a5e51` (`id_proveedor`),
  CONSTRAINT `FK_2a6dab7c1ebe24649a8d88a5e51` FOREIGN KEY (`id_proveedor`) REFERENCES `mod_catalogo_proveedores` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_c092e4d64074c5be85e9116dd94` FOREIGN KEY (`id_producto`) REFERENCES `mod_catalogo_productos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_merma_mermas
DROP TABLE IF EXISTS `mod_merma_mermas`;
CREATE TABLE IF NOT EXISTS `mod_merma_mermas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `fecha_reporte` bigint(20) NOT NULL,
  `valor_perdido` decimal(10,2) NOT NULL DEFAULT 0.00,
  `observaciones` text NOT NULL,
  `id_tipo_merma` int(11) NOT NULL,
  `id_lote` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f936b059227146a8e5f1ffaec0a` (`id_tipo_merma`),
  KEY `FK_c43c67defe5b3af684b4065015b` (`id_lote`),
  CONSTRAINT `FK_c43c67defe5b3af684b4065015b` FOREIGN KEY (`id_lote`) REFERENCES `mod_lote` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `FK_f936b059227146a8e5f1ffaec0a` FOREIGN KEY (`id_tipo_merma`) REFERENCES `mod_merma_tipos` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table BAN_00341.mod_merma_tipos
DROP TABLE IF EXISTS `mod_merma_tipos`;
CREATE TABLE IF NOT EXISTS `mod_merma_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d4131d037acc1ff2cb862fe550` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=478 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
