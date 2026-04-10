CREATE OR REPLACE VIEW vista_detalle_lote AS
SELECT 
    `t`.*,
    CASE 
        WHEN `t`.`dias_restantes` IS NULL THEN 'GRIS'
        WHEN `t`.`dias_restantes` <= 0 THEN 'ROJO' 
        WHEN `t`.`dias_restantes` <= 10 THEN 'NARANJA' 
        WHEN `t`.`dias_restantes` BETWEEN 11 AND 15 THEN 'AMARILLO' 
        WHEN `t`.`dias_restantes` > 15 THEN 'VERDE' 
        ELSE 'GRIS' 
    END AS `alerta_color`,
    CASE 
        WHEN `t`.`dias_restantes` IS NULL THEN 'Sin fecha de vencimiento'
        WHEN `t`.`dias_restantes` < 0 THEN 'Producto vencido' 
        WHEN `t`.`dias_restantes` = 0 THEN 'Vence hoy' 
        WHEN `t`.`dias_restantes` > 0 THEN CONCAT('Faltan ', `t`.`dias_restantes`, ' días') 
        ELSE 'Información no disponible' 
    END AS `alerta_notificacion`
FROM (
    SELECT 
        `lote`.`id` AS `id_lote`,
        `lote`.`lote` AS `lote`,
        `lote`.`cantidad_comprada` AS `productos_comprados`,
        `lote`.`stock` AS `en_existencia`,
        `lote`.`cantidad_vendida` AS `vendidos`,
        COALESCE((
            SELECT SUM(`mmm`.`cantidad`) 
            FROM `mod_merma_mermas` `mmm` 
            WHERE `mmm`.`id_lote` = `lote`.`id`
        ), 0) AS `afectados_merma`,
        `lote`.`precio_venta_sugerido` AS `precio_sugerido`,
        `mcproducto`.`nombre` AS `nombre_producto`,
        `mcproveedor`.`razon_social` AS `nombre_proveedor`,
        `lote`.`fecha_entrada` AS `timestamp_entrada`,
        `lote`.`fecha_vencimiento` AS `timestamp_vencimiento`,
        -- Cálculo: (TimestampVencimiento - TimestampActual) / segundos_del_dia
        -- Si fecha_vencimiento es NULL, dias_restantes será NULL
        FLOOR((`lote`.`fecha_vencimiento` - UNIX_TIMESTAMP(CURDATE())) / 86400) AS `dias_restantes`
    FROM `mod_lote` `lote`
    JOIN `mod_catalogo_productos` `mcproducto` ON `lote`.`id_producto` = `mcproducto`.`id`
    JOIN `mod_catalogo_proveedores` `mcproveedor` ON `lote`.`id_proveedor` = `mcproveedor`.`id`
    WHERE `lote`.`stock` > 0
) `t`;