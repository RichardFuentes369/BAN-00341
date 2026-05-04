-- (FALTA AGREGAR EL ESTADO DEL LOTE) o definir que se hara con ello

-- Consulta para conocer los lotes de todos los productos que tienen 1 o mas (unidades, gramos etc) en stock
-- junto con su proveedor 
-- dias restantes a vencer o ya vencidos (calculado con el curdate o fecha actual del sistema)
-- bandera de aviso (ajustada a la configuracion de cada producto)

SELECT 
    ml.id_producto,
    ml.lote,
    FROM_UNIXTIME(ml.fecha_entrada) AS fecha_entrada,
    FROM_UNIXTIME(ml.fecha_vencimiento) AS fecha_vencimiento,
    DATEDIFF(FROM_UNIXTIME(ml.fecha_vencimiento), CURDATE()) AS dias_restantes,
    FROM_UNIXTIME(UNIX_TIMESTAMP()) hoy,
    CASE 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_amarilla 
      		THEN 'Artículo en alerta verde' 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_naranja 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_amarilla 
            THEN 'Artículo en alerta amarilla'
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_naranja 
            THEN 'Artículo en alerta naranja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) >= 0 
            THEN 'Artículo en alerta roja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) < 0 
            THEN 'Artículo vencido'
        ELSE 'Artículo no perecedero'
    END AS estado_alerta,
    ml.cantidad_comprada,
    ml.cantidad_vendida,
    ml.estado,
    mcprod.nombre AS nombre_producto,
    mcprov.razon_social AS nombre_proveedor,
    ml.cantidad_en_bodega
FROM mod_lote ml
LEFT JOIN mod_catalogo_productos mcprod ON ml.id_producto = mcprod.id
LEFT JOIN mod_catalogo_proveedores mcprov ON ml.id_proveedor = mcprov.id
WHERE ml.cantidad_en_bodega > 1;

-- Consulta para conocer los lotes de los productos perecederos que tienen 1 o mas (unidades, gramos etc) en stock
-- junto con su proveedor 
-- dias restantes a vencer o ya vencidos (calculado con el curdate o fecha actual del sistema)
-- bandera de aviso (ajustada a la configuracion de cada producto)

SELECT 
    ml.id_producto,
    ml.lote,
    FROM_UNIXTIME(ml.fecha_entrada) AS fecha_entrada,
    FROM_UNIXTIME(ml.fecha_vencimiento) AS fecha_vencimiento,
    DATEDIFF(FROM_UNIXTIME(ml.fecha_vencimiento), CURDATE()) AS dias_restantes,
    FROM_UNIXTIME(UNIX_TIMESTAMP()) hoy,
    CASE 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_amarilla 
      		THEN 'Artículo en alerta verde' 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_naranja 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_amarilla 
            THEN 'Artículo en alerta amarilla'
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_naranja 
            THEN 'Artículo en alerta naranja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) >= 0 
            THEN 'Artículo en alerta roja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) < 0 
            THEN 'Artículo vencido'
        ELSE 'Artículo no perecedero'
    END AS estado_alerta,
    ml.cantidad_comprada,
    ml.cantidad_vendida,
    ml.estado,
    mcprod.nombre AS nombre_producto,
    mcprov.razon_social AS nombre_proveedor,
    ml.cantidad_en_bodega
FROM mod_lote ml
LEFT JOIN mod_catalogo_productos mcprod ON ml.id_producto = mcprod.id
LEFT JOIN mod_catalogo_proveedores mcprov ON ml.id_proveedor = mcprov.id
WHERE ml.cantidad_en_bodega > 1
AND mcprod.es_perecedero = true;

-- Consulta para conocer los lotes de los productos que no son perecederos que tienen 1 o mas (unidades, gramos etc) en stock
-- junto con su proveedor 
-- dias restantes a vencer o ya vencidos (calculado con el curdate o fecha actual del sistema)
-- bandera de aviso (ajustada a la configuracion de cada producto)

SELECT 
    ml.id_producto,
    ml.lote,
    FROM_UNIXTIME(ml.fecha_entrada) AS fecha_entrada,
    FROM_UNIXTIME(ml.fecha_vencimiento) AS fecha_vencimiento,
    DATEDIFF(FROM_UNIXTIME(ml.fecha_vencimiento), CURDATE()) AS dias_restantes,
    FROM_UNIXTIME(UNIX_TIMESTAMP()) hoy,
    CASE 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_amarilla 
      		THEN 'Artículo en alerta verde' 
        WHEN 
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > mcprod.alerta_naranja 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_amarilla 
            THEN 'Artículo en alerta amarilla'
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) > 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= mcprod.alerta_naranja 
            THEN 'Artículo en alerta naranja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) <= 3 
		  		AND
		  		DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) >= 0 
            THEN 'Artículo en alerta roja' 
        WHEN DATEDIFF(DATE(FROM_UNIXTIME(ml.fecha_vencimiento)), FROM_UNIXTIME(UNIX_TIMESTAMP(CURDATE()))) < 0 
            THEN 'Artículo vencido'
        ELSE 'Artículo no perecedero'
    END AS estado_alerta,
    ml.cantidad_comprada,
    ml.cantidad_vendida,
    ml.estado,
    mcprod.nombre AS nombre_producto,
    mcprov.razon_social AS nombre_proveedor,
    ml.cantidad_en_bodega
FROM mod_lote ml
LEFT JOIN mod_catalogo_productos mcprod ON ml.id_producto = mcprod.id
LEFT JOIN mod_catalogo_proveedores mcprov ON ml.id_proveedor = mcprov.id
WHERE ml.cantidad_en_bodega > 1
AND mcprod.es_perecedero = false;