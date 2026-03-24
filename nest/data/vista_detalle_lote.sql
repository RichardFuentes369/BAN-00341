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


-- Dumping database structure for core_project_BAN_00341
CREATE DATABASE IF NOT EXISTS `core_project_BAN_00341` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `core_project_BAN_00341`;

-- Dumping structure for view core_project_BAN_00341.vista_detalle_lote
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `vista_detalle_lote` (
	`id_lote` INT(11) NOT NULL,
	`lote` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`productos_comprados` INT(11) NOT NULL,
	`en_existencia` INT(11) NOT NULL,
	`vendidos` INT(11) NOT NULL,
	`afectados_merma` DECIMAL(32,0) NOT NULL,
	`precio_sugerido` DECIMAL(10,2) NOT NULL,
	`nombre_producto` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`nombre_proveedor` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`dias_restantes` BIGINT(21) NULL,
	`alerta_color` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci',
	`alerta_notificacion` VARCHAR(1) NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `vista_detalle_lote`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vista_detalle_lote` AS select `t`.`id_lote` AS `id_lote`,`t`.`lote` AS `lote`,`t`.`productos_comprados` AS `productos_comprados`,`t`.`en_existencia` AS `en_existencia`,`t`.`vendidos` AS `vendidos`,`t`.`afectados_merma` AS `afectados_merma`,`t`.`precio_sugerido` AS `precio_sugerido`,`t`.`nombre_producto` AS `nombre_producto`,`t`.`nombre_proveedor` AS `nombre_proveedor`,`t`.`dias_restantes` AS `dias_restantes`,case when `t`.`dias_restantes` <= 0 then 'ROJO' when `t`.`dias_restantes` <= 10 then 'NARANJA' when `t`.`dias_restantes` between 11 and 15 then 'AMARILLO' when `t`.`dias_restantes` > 15 then 'VERDE' else 'SIN_COLOR' end AS `alerta_color`,case when `t`.`dias_restantes` < 0 then 'Producto vencido' when `t`.`dias_restantes` = 0 then 'Vence hoy' when `t`.`dias_restantes` > 0 then concat('Faltan ',`t`.`dias_restantes`,' días') else 'Información no disponible' end AS `alerta_notificacion` from (select `lote`.`id` AS `id_lote`,`lote`.`lote` AS `lote`,`lote`.`cantidad_comprada` AS `productos_comprados`,`lote`.`stock` AS `en_existencia`,coalesce((select sum(`mmm`.`cantidad`) from `mod_merma_mermas` `mmm` where `mmm`.`id_lote` = `lote`.`id`),0) AS `afectados_merma`,`lote`.`cantidad_vendida` AS `vendidos`,`lote`.`precio_venta_sugerido` AS `precio_sugerido`,`mcproducto`.`nombre` AS `nombre_producto`,`mcproveedor`.`razon_social` AS `nombre_proveedor`,timestampdiff(DAY,curdate(),`lote`.`fecha_vencimiento`) AS `dias_restantes` from ((`mod_lote` `lote` join `mod_catalogo_productos` `mcproducto` on(`lote`.`id_producto` = `mcproducto`.`id`)) join `mod_catalogo_proveedores` `mcproveedor` on(`lote`.`id_proveedor` = `mcproveedor`.`id`)) where `lote`.`stock` > 0) `t`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
