USE `BAN_00341`;

DROP PROCEDURE IF EXISTS GenerarBodegaYMermas;

DELIMITER //

CREATE PROCEDURE GenerarBodegaYMermas()
BEGIN
    -- Control de bucles
    DECLARE i INT DEFAULT 1;
    DECLARE total_registros INT DEFAULT 25000;
    
    DECLARE j INT DEFAULT 1;
    DECLARE v_num_mermas INT;
    
    -- Variables para mod_bodega y producto
    DECLARE v_id_producto INT;
    DECLARE v_id_proveedor INT;
    DECLARE v_precio_unitario DECIMAL(10, 2);
    DECLARE v_lote VARCHAR(50);
    DECLARE v_fecha_entrada BIGINT;
    DECLARE v_fecha_vencimiento BIGINT;
    DECLARE v_cantidad_comprada INT;
    DECLARE v_cantidad_vendida INT;
    DECLARE v_cantidad_en_bodega INT;
    DECLARE v_estado ENUM('disponible', 'vencido', 'agotado');
    DECLARE v_es_perecedero TINYINT(1);
    
    -- Variables auxiliares, claves foráneas y cálculos
    DECLARE v_now_sec BIGINT;         -- Timestamp actual en SEGUNDOS (10 dígitos)
    DECLARE v_fecha_reporte BIGINT;     -- Fecha de reporte aleatoria en SEGUNDOS
    DECLARE v_dias_desfase INT;
    DECLARE v_bodega_id INT;
    DECLARE v_tipo_merma_id INT;
    DECLARE v_cantidad_merma INT;
    DECLARE v_valor_perdido DECIMAL(12, 2);
    DECLARE v_observacion VARCHAR(255);

    -- Timestamp actual exacto en segundos (ejemplo: 1727700000)
    SET v_now_sec = UNIX_TIMESTAMP(NOW());
    
    SET FOREIGN_KEY_CHECKS = 0;
    SET AUTOCOMMIT = 0;

    -- Vaciar tablas y reiniciar autoincrementables a 1
    TRUNCATE TABLE mod_merma_mermas;
    TRUNCATE TABLE mod_bodega;

    WHILE i <= total_registros DO
        
        -- 1. Selección aleatoria de producto y proveedor
        SELECT id, es_perecedero 
        INTO v_id_producto, v_es_perecedero
        FROM mod_catalogo_productos 
        ORDER BY RAND() LIMIT 1;

        SELECT id INTO v_id_proveedor 
        FROM mod_catalogo_proveedores 
        ORDER BY RAND() LIMIT 1;

        IF v_id_proveedor IS NULL THEN
            SET v_id_proveedor = 1;
        END IF;

        -- Precio aleatorio mayor a 100
        SET v_precio_unitario = ROUND(101 + (RAND() * 1399), 2);

        -- 2. Generación de lote y fechas (en SEGUNDOS: 86400 s/día)
        SET v_lote = CONCAT('LOT-', YEAR(NOW()), '-', FLOOR(1000 + (RAND() * 9000)));
        SET v_dias_desfase = FLOOR(1 + (RAND() * 180));
        SET v_fecha_entrada = v_now_sec - (CAST(v_dias_desfase AS UNSIGNED) * 86400);

        IF v_es_perecedero = 1 THEN
            IF RAND() < 0.25 THEN
                SET v_estado = 'vencido';
                SET v_fecha_vencimiento = v_now_sec - (CAST(FLOOR(1 + (RAND() * 45)) AS UNSIGNED) * 86400);
            ELSEIF RAND() < 0.50 THEN
                SET v_estado = 'disponible';
                SET v_fecha_vencimiento = v_now_sec + (CAST(FLOOR(1 + (RAND() * 10)) AS UNSIGNED) * 86400);
            ELSE
                SET v_estado = 'disponible';
                SET v_fecha_vencimiento = v_now_sec + (CAST(FLOOR(11 + (RAND() * 169)) AS UNSIGNED) * 86400);
            END IF;
        ELSE
            SET v_estado = 'disponible';
            SET v_fecha_vencimiento = v_now_sec + (CAST(365 AS UNSIGNED) * 86400);
        END IF;

        -- 3. Generación de cantidades
        SET v_cantidad_comprada = FLOOR(100 + (RAND() * 900));
        
        IF v_estado = 'vencido' THEN
            SET v_cantidad_vendida = FLOOR(v_cantidad_comprada * (0.1 + (RAND() * 0.4)));
        ELSE
            SET v_cantidad_vendida = FLOOR(v_cantidad_comprada * RAND());
        END IF;
        
        SET v_cantidad_en_bodega = v_cantidad_comprada - v_cantidad_vendida;

        IF v_cantidad_en_bodega <= 0 THEN
            SET v_cantidad_en_bodega = 0;
            SET v_estado = 'agotado';
        END IF;

        -- 4. Inserción en mod_bodega
        INSERT INTO mod_bodega (
            lote, fecha_entrada, fecha_vencimiento,
            cantidad_comprada, cantidad_vendida, cantidad_en_bodega,
            estado, id_producto, id_proveedor
        ) VALUES (
            v_lote, v_fecha_entrada, v_fecha_vencimiento,
            v_cantidad_comprada, v_cantidad_vendida, v_cantidad_en_bodega,
            v_estado, v_id_producto, v_id_proveedor
        );

        SET v_bodega_id = LAST_INSERT_ID();

        -- 5. Determinar número de mermas
        CASE FLOOR(1 + (RAND() * 3))
            WHEN 1 THEN SET v_num_mermas = 5;
            WHEN 2 THEN SET v_num_mermas = 10;
            ELSE SET v_num_mermas = 15;
        END CASE;

        -- 6. Insertar mermas con fecha_reporte ALEATORIA en SEGUNDOS
        SET j = 1;
        WHILE j <= v_num_mermas DO
            
            IF v_estado = 'vencido' AND RAND() < 0.6 THEN
                SET v_tipo_merma_id = 1;
                SET v_observacion = 'Merma por fecha de vencimiento alcanzada';
            ELSE
                SET v_tipo_merma_id = FLOOR(2 + (RAND() * 3));
                SET v_observacion = 'Merma registrada por manipulación o falla de empaque';
            END IF;

            SET v_cantidad_merma = FLOOR(1 + (RAND() * 5));
            SET v_valor_perdido = v_cantidad_merma * v_precio_unitario;

            -- Genera un timestamp de reporte aleatorio entre la fecha de entrada del lote y la fecha actual
            -- FLOOR() garantiza que sea un número entero exacto (sin decimales)
            SET v_fecha_reporte = FLOOR(v_fecha_entrada + (RAND() * (v_now_sec - v_fecha_entrada)));

            INSERT INTO mod_merma_mermas (
                id_lote, cantidad, valor_perdido,
                id_tipo_merma, observacion, fecha_reporte
            ) VALUES (
                v_bodega_id, v_cantidad_merma, v_valor_perdido,
                v_tipo_merma_id, v_observacion, v_fecha_reporte
            );

            SET j = j + 1;
        END WHILE;

        IF MOD(i, 500) = 0 THEN
            COMMIT;
        END IF;

        SET i = i + 1;
    END WHILE;

    COMMIT;
    SET FOREIGN_KEY_CHECKS = 1;
    SET AUTOCOMMIT = 1;
END //

DELIMITER ;