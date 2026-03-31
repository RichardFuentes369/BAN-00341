BEGIN
    DECLARE v_offset INT;
    DECLARE v_total_registros INT;
    
    SET v_offset = (p_pagina_actual - 1) * p_registros_por_pagina;

    -- 1. CREAMOS UNA TABLA TEMPORAL CON EL RESULTADO FILTRADO (Sin paginar aún)
    -- Esto lo hacemos para no repetir la lógica del CASE dos veces
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_reporte AS
    SELECT 
        t.*
    FROM (
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

    -- 2. OBTENEMOS EL TOTAL PARA EL CÁLCULO DE PÁGINAS
    SELECT COUNT(*) INTO v_total_registros FROM temp_reporte;

    -- 3. DEVOLVEMOS EL METADATO DE PAGINACIÓN
    SELECT 
        v_total_registros AS total,
        p_registros_por_pagina AS perPage,
        p_pagina_actual AS currentPage,
        CEIL(v_total_registros / p_registros_por_pagina) AS lastPage;

    -- 4. DEVOLVEMOS LOS DATOS PAGINADOS
    SELECT * FROM temp_reporte 
    LIMIT p_registros_por_pagina OFFSET v_offset;

    -- LIMPIEZA
    DROP TEMPORARY TABLE temp_reporte;
END