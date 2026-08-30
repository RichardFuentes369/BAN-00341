DELIMITER //

CREATE PROCEDURE sp_obtener_ventas_por_lote_y_producto(
    IN p_codigo_barra VARCHAR(50),
    IN p_lote VARCHAR(50),
    IN p_limit INT,
    IN p_page INT,
    IN p_order_by VARCHAR(50),   -- Campo por el que se ordenará (ej: 'fecha_venta', 'cantidad', 'nro_factura')
    IN p_order_dir VARCHAR(10)   -- Dirección: 'ASC' o 'DESC'
)
BEGIN
    DECLARE v_offset INT;
    
    -- Calcular el OFFSET de forma segura
    SET v_offset = (p_page - 1) * p_limit;

    -- Validar dirección por defecto si viene vacía
    IF p_order_dir IS NULL OR UPPER(p_order_dir) NOT IN ('ASC', 'DESC') THEN
        SET p_order_dir = 'DESC';
    END IF;

    -- Consulta principal con paginación y ordenamiento seguro
    SELECT 
        v.fecha_venta,
        v.nro_factura,
        CAST(item.cantidad AS UNSIGNED) AS cantidad
    FROM mod_registro_ventas v,
    JSON_TABLE(
        v.detalle_factura,
        '$[*]' COLUMNS (
            lote VARCHAR(50) PATH '$.lote',
            codigo_barra VARCHAR(50) PATH '$.codigo_barra',
            cantidad INT PATH '$.cantidad'
        )
    ) AS item
    WHERE item.codigo_barra = p_codigo_barra 
      AND item.lote = p_lote
    ORDER BY 
        -- Ordenamientos ASCENDENTES
        CASE WHEN p_order_dir = 'ASC' AND p_order_by = 'fecha_venta' THEN v.fecha_venta END ASC,
        CASE WHEN p_order_dir = 'ASC' AND p_order_by = 'cantidad' THEN CAST(item.cantidad AS UNSIGNED) END ASC,
        CASE WHEN p_order_dir = 'ASC' AND p_order_by = 'nro_factura' THEN v.nro_factura END ASC,
        
        -- Ordenamientos DESCENDENTES
        CASE WHEN p_order_dir = 'DESC' AND p_order_by = 'fecha_venta' THEN v.fecha_venta END DESC,
        CASE WHEN p_order_dir = 'DESC' AND p_order_by = 'cantidad' THEN CAST(item.cantidad AS UNSIGNED) END DESC,
        CASE WHEN p_order_dir = 'DESC' AND p_order_by = 'nro_factura' THEN v.nro_factura END DESC,
        
        -- Fallback por defecto si no coincide ninguno (Ordena por fecha descendente)
        v.fecha_venta DESC
    LIMIT p_limit OFFSET v_offset;
    
END //

DELIMITER ;