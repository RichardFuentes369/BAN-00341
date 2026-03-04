USE core_project_BAN_00341;

-- vista_detalle_lote

    -- No contempla si hay 2 registros con el mismo lote 
    -- (no lo veo necesario) debido a que el lote debe ser unico

    CREATE OR REPLACE VIEW vista_detalle_lote AS
    SELECT 
    t.id_lote,
    t.lote,
    t.productos_comprados,
    t.en_existencia,
    t.vendidos,
    t.afectados_merma,
    t.precio_sugerido,
    t.nombre_producto,
    t.nombre_proveedor,
    t.dias_restantes,
    CASE 
        WHEN t.dias_restantes <= 0 THEN 'ROJO' 
        WHEN t.dias_restantes <= 10 THEN 'NARANJA' 
        WHEN t.dias_restantes BETWEEN 11 AND 15 THEN 'AMARILLO' 
        WHEN t.dias_restantes > 15 THEN 'VERDE' 
        ELSE 'SIN_COLOR' 
    END AS alerta_color,
    CASE 
        WHEN t.dias_restantes < 0 THEN 'Producto vencido' 
        WHEN t.dias_restantes = 0 THEN 'Vence hoy' 
        WHEN t.dias_restantes > 0 THEN CONCAT('Faltan ', t.dias_restantes, ' días') 
        ELSE 'Información no disponible' 
    END AS alerta_notificacion 
    FROM (
    SELECT 
        lote.id AS id_lote,
        lote.lote AS lote,
        lote.cantidad_comprada AS productos_comprados,
        lote.stock AS en_existencia,
        COALESCE((
            SELECT SUM(mmm.cantidad) 
            FROM mod_merma_mermas mmm 
            WHERE mmm.id_lote = lote.id
        ), 0) AS afectados_merma,
        lote.cantidad_vendida AS vendidos,
        lote.precio_venta_sugerido AS precio_sugerido,
        mcproducto.nombre AS nombre_producto,
        mcproveedor.razon_social AS nombre_proveedor,
        TIMESTAMPDIFF(DAY, CURDATE(), lote.fecha_vencimiento) AS dias_restantes 
    FROM mod_lote lote
    JOIN mod_catalogo_productos mcproducto ON lote.id_producto = mcproducto.id
    JOIN mod_catalogo_proveedores mcproveedor ON lote.id_proveedor = mcproveedor.id
    WHERE lote.stock > 0
    ) t;

