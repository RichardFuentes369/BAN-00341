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
            SELECT SUM(ml.cantidad_en_bodega)
            FROM mod_lote ml
            WHERE ml.id_producto = mcp.id
            AND ml.estado = 'disponible'
        ), 0) AS total_productos_disponibles
    FROM mod_catalogo_productos mcp
    WHERE mcp.estado = true
) AS t;