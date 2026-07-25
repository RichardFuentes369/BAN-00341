USE `BAN_00341`;

-- Dumping structure for procedure BAN_00341.sp_reporte_stock_paginado
DROP PROCEDURE IF EXISTS `sp_reporte_stock_paginado`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reporte_stock_paginado`(
    IN `p_pagina_actual` INT,
    IN `p_registros_por_pagina` INT,
    IN `p_order_field` VARCHAR(50),
    IN `p_order_direction` VARCHAR(4)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT 'Reporte de stock paginado con ordenamiento dinámico seguro'
BEGIN
    -- Declaración de variables
    DECLARE v_offset INT;
    DECLARE v_total_registros INT;
    DECLARE v_sql_query TEXT;
    
    -- 1. Normalización de parámetros de paginación
    SET p_pagina_actual = IFNULL(p_pagina_actual, 1);
    SET p_registros_por_pagina = IFNULL(p_registros_por_pagina, 10);
    SET v_offset = (p_pagina_actual - 1) * p_registros_por_pagina;

    -- 2. Normalización de parámetros de ordenamiento (con valores por defecto y seguridad)
    SET p_order_field = LOWER(IFNULL(p_order_field, 'nombre'));
    SET p_order_direction = UPPER(IFNULL(p_order_direction, 'ASC'));
    
    -- Validar dirección para evitar inyección SQL
    IF p_order_direction NOT IN ('ASC', 'DESC') THEN
        SET p_order_direction = 'ASC';
    END IF;

    -- Validar que la columna solicitada exista en la tabla temporal (Whitelist correspondiente a este SP)
    SET p_order_field = CASE p_order_field
        WHEN 'nombre' THEN 'nombre'
        WHEN 'stock_minimo' THEN 'stock_minimo'
        WHEN 'total_productos_disponibles' THEN 'total_productos_disponibles'
        WHEN 'aviso_stock' THEN 'aviso_stock'
        ELSE 'nombre' -- Columna por defecto si envían una inválida
    END;

    -- 3. Crear tabla temporal con la lógica de negocio de stock
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

    -- 4. Obtener el total para la paginación
    SELECT COUNT(*) INTO v_total_registros FROM temp_stock_reporte;

    -- 5. Retornar Metadatos
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 6. Retornar Datos paginados con Ordenamiento Dinámico
    SET @l = p_registros_por_pagina;
    SET @o = v_offset;
    
    -- Construcción segura de la consulta dinámica incluyendo ORDER BY
    SET v_sql_query = CONCAT(
        'SELECT * FROM temp_stock_reporte ORDER BY ', 
        p_order_field, ' ', p_order_direction, 
        ' LIMIT ? OFFSET ?'
    );
    
    PREPARE stmt FROM v_sql_query;
    EXECUTE stmt USING @l, @o;
    DEALLOCATE PREPARE stmt;

    -- 7. Limpieza
    DROP TEMPORARY TABLE IF EXISTS temp_stock_reporte;
END//
DELIMITER ;