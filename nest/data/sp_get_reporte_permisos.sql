DELIMITER //

CREATE PROCEDURE sp_get_reporte_permisos(
    IN p_modulo VARCHAR(255),
    IN p_submodulo VARCHAR(255),
    IN p_permiso VARCHAR(255)
)
BEGIN
    SELECT 
        t.MODULO,
        t.SUBMODULO,
        t.PERMISO,
        t.IDENTIFICADOR,
        t.CORREO_USUARIO,
        t.ESTADO_USUARIO
    FROM (
        -- INICIO DE TU CONSULTA ORIGINAL
        SELECT
            -- Lógica de MÓDULO (Nivel raíz o abuelo)
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
                    THEN (
                        SELECT mpm.nombre
                        FROM mod_permisos_modulo mpm
                        WHERE mpm.id = mpma.id_modulo
                    )
                    ELSE (
                       SELECT mpm.nombre
                        FROM mod_permisos_modulo mpm
                        WHERE mpm.id = mpma.modulo_padre_id
                    )
            END AS SUBMODULO,
            mpma.nombre AS PERMISO,
            mpma.permiso AS IDENTIFICADOR,
            mua.email AS CORREO_USUARIO,
            CASE mua.isActive WHEN 1 THEN 'ACTIVO' ELSE 'INACTIVO' END AS ESTADO_USUARIO
        FROM mod_permisos_modulo_asignacion mpma
        INNER JOIN mod_usuarios_admin mua ON mpma.user_id = mua.id
        -- FIN DE TU CONSULTA ORIGINAL
    ) AS t
    WHERE 
        (p_modulo IS NULL OR t.MODULO = p_modulo) AND
        (p_submodulo IS NULL OR t.SUBMODULO = p_submodulo) AND
        (p_permiso IS NULL OR t.PERMISO LIKE CONCAT('%', p_permiso, '%'));
END //

DELIMITER ;