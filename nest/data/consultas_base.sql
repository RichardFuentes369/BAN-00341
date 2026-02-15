SELECT 
  id, 
  nombre, 
  descripcion 
FROM mod_catalogo_categorias;

SELECT 
  mcp.id, 
  mcp.codigo_barra, 
  mcp.nombre, 
  mcp.stock_minimo, 
  mcp.unidad_medida, 
  -- mcp.id_categoria > mcc.nombre,
  mcc.nombre AS nombre_categoria 
FROM mod_catalogo_productos AS mcp
INNER JOIN mod_catalogo_categorias AS mcc ON mcp.id_categoria = mcc.id;

SELECT 
  id, 
  nit, 
  razon_social, 
  direccion, 
  telefono, 
  correo 
FROM mod_catalogo_proveedores;

SELECT 
	l.id, 
	UNIX_TIMESTAMP(l.fecha_entrada), 
	UNIX_TIMESTAMP(l.fecha_vencimiento), 
	l.cantidad_inicial, 
	l.stock_actual, 
	l.costo_unitario, 
	l.precio_venta_sugerido, 
	l.estado, 
	-- l.id_proveedor > mcpv.razon_social,
	mcpv.razon_social AS razon_social, 
	-- l.id_producto > mcpr.nombre,
	mcpr.nombre AS nombre_producto
FROM mod_lote AS l
INNER JOIN mod_catalogo_productos mcpr ON l.id_producto = mcpr.id
INNER JOIN mod_catalogo_proveedores mcpv ON l.id_proveedor = mcpv.id;

SELECT 
  id, 
  nombre 
FROM mod_merma_tipos;

SELECT 
	mmm.id, 
	UNIX_TIMESTAMP(mmm.fecha_reporte), 
	mmm.valor_perdido, 
	mmm.observaciones, 
	mmm.cantidad, 
	-- mmm.id_tipo_merma > mmt.nombre,
	mmt.nombre AS tipo_merma,
	-- mmm.id_lote > ml.id_producto > mcpr.nombre
	mcpr.nombre AS producto,
	-- mmm.id_lote > ml.id_proveedor > mcpr.razon_social
	mcpv.razon_social AS proveedor
FROM mod_merma_mermas AS mmm
INNER JOIN mod_merma_tipos AS mmt ON mmm.id_tipo_merma = mmt.id
INNER JOIN mod_lote AS ml ON mmm.id_lote = ml.id
INNER JOIN mod_catalogo_productos AS mcpr ON ml.id_producto = mcpr.id
INNER JOIN mod_catalogo_proveedores AS mcpv ON ml.id_proveedor = mcpv.id;