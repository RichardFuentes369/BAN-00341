DELIMITER //

-- 1. Resumen de cantidades compradas, vendidas, en bodega y afectadas
CREATE PROCEDURE sp_report_1(
    IN p_codigo_barra VARCHAR(13)
)
BEGIN
    SELECT 
        mcp.nombre,
        mcp.codigo_barra,
        SUM(mb.cantidad_comprada) AS cantidad_comprada,
        SUM(mb.cantidad_vendida) AS cantidad_vendida,
        SUM(mb.cantidad_en_bodega) AS cantidad_en_bodega,
        (SUM(mb.cantidad_comprada) - (SUM(mb.cantidad_vendida) + SUM(mb.cantidad_en_bodega))) AS cantidad_afectada
    FROM mod_catalogo_productos mcp
    INNER JOIN mod_bodega mb ON mb.id_producto = mcp.id
    WHERE mcp.codigo_barra = p_codigo_barra
    GROUP BY mcp.id, mcp.nombre, mcp.codigo_barra;
END //

-- 2. Cantidad de unidades mermadas por tipo de merma
CREATE PROCEDURE sp_report_2(
    IN p_codigo_barra VARCHAR(13)
)
BEGIN
    SELECT 
        mmt.nombre AS nombre, 
        COALESCE((
            SELECT SUM(mmm.cantidad)
            FROM mod_merma_mermas mmm
            INNER JOIN mod_bodega mb ON mmm.id_lote = mb.id
            INNER JOIN mod_catalogo_productos mcp ON mb.id_producto = mcp.id
            WHERE mmm.id_tipo_merma = mmt.id
              AND mcp.codigo_barra = p_codigo_barra
        ), 0) AS cantidad_por_merma
    FROM mod_merma_tipos mmt;
END //

-- 3. Porcentaje de pérdida respecto al stock en bodega por tipo de merma
CREATE PROCEDURE sp_report_3(
    IN p_codigo_barra VARCHAR(13)
)
BEGIN
    SELECT 
        mmt.nombre AS nombre, 
        ROUND(
            (
                COALESCE((
                    SELECT SUM(mmm.cantidad)
                    FROM mod_merma_mermas mmm
                    INNER JOIN mod_bodega mb ON mmm.id_lote = mb.id
                    INNER JOIN mod_catalogo_productos mcp ON mb.id_producto = mcp.id
                    WHERE mmm.id_tipo_merma = mmt.id
                      AND mcp.codigo_barra = p_codigo_barra
                ), 0) 
                / NULLIF((
                    SELECT SUM(mb.cantidad_en_bodega)
                    FROM mod_bodega mb
                    INNER JOIN mod_catalogo_productos mcp ON mb.id_producto = mcp.id
                    WHERE mcp.codigo_barra = p_codigo_barra
                ), 0)
            ) * 100, 2
        ) AS porcentaje_perdida_bodega
    FROM mod_merma_tipos mmt;
END //

-- 4. Distribución y porcentaje de merma según el día de la semana
CREATE PROCEDURE sp_report_4(
    IN p_codigo_barra VARCHAR(13)
)
BEGIN
    SELECT 
        dias.nombre_dia AS dia_semana,
        COALESCE(SUM(m.cantidad), 0) AS cantidad_mermada,
        CONCAT(
            ROUND(
                COALESCE((SUM(m.cantidad) / NULLIF(total.total_general, 0)) * 100, 0), 
                2
            ), 
            '%'
        ) AS porcentaje_merma
    FROM (
        SELECT 1 AS num_dia, 'Domingo' AS nombre_dia UNION ALL
        SELECT 2, 'Lunes' UNION ALL
        SELECT 3, 'Martes' UNION ALL
        SELECT 4, 'Miércoles' UNION ALL
        SELECT 5, 'Jueves' UNION ALL
        SELECT 6, 'Viernes' UNION ALL
        SELECT 7, 'Sábado'
    ) dias
    CROSS JOIN (
        SELECT p.id
        FROM mod_catalogo_productos p
        WHERE p.codigo_barra = p_codigo_barra
    ) prod
    LEFT JOIN mod_bodega b ON b.id_producto = prod.id
    LEFT JOIN mod_merma_mermas m ON m.id_lote = b.id 
        AND DAYOFWEEK(FROM_UNIXTIME(m.fecha_reporte)) = dias.num_dia
    LEFT JOIN (
        SELECT 
            p_sub.id,
            SUM(m_sub.cantidad) AS total_general
        FROM mod_merma_mermas m_sub
        INNER JOIN mod_bodega b_sub ON m_sub.id_lote = b_sub.id
        INNER JOIN mod_catalogo_productos p_sub ON b_sub.id_producto = p_sub.id
        WHERE p_sub.codigo_barra = p_codigo_barra
    ) total ON total.id = prod.id
    GROUP BY dias.num_dia, dias.nombre_dia, total.total_general
    ORDER BY FIELD(dias.num_dia, 2, 3, 4, 5, 6, 7, 1);
END //

DELIMITER ;