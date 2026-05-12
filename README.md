# (Validar que no se pueda eliminar no por permiso si no por delete cascade)

## PENDIENTE (I PARTE) [11-May-2026  23-May-2026]

	Bodega
		Cuando yo consulte las mermas toca buscar (lote + producto)
		Editar [ya tengo el modal, falta la accion]
		Eliminar 
		
	Merma
		Cuando yo consulte las mermas toca buscar (lote + producto)
		Registro de perdida (crud + contadores)
		

	CRONJOBS (II PARTE)
		* cronjob para avisar por correo "se queda sin stock" - ya esta andando
		* cronjob para avisar por correo las de vencimiento - ya esta andando
		
		* funcion para indicar si se vendio o fue afectada por merma, necesitaria "codigo de barra" y lote - falta
		
## FILTROS (I PARTE) [25-May-2026  29-May-2026]

	CATALOGO/PRODUCTOS (ARREGLAR)
	CATALOGO/MARCAS => PRODUCTOS (ARREGLAR, YA NO PODRIA SELECCIONAR LA MARCA DESEADA)
	BODEGA
	MERMA/REGISTRO PERDIDAS	
	
	
## GRAFICOS Y ESTADISTICAS (III PARTE) [01-Jun-2026 30-Jun-2026]
	
	EN BASE A LA BODEGA Y MERMAS
	
## REPORTES (IV PARTE) [01-Jun-2026 30-Jul-2026]
	
	CATALOGO/PROVEEDORES
		Reporte en csv y excel
		
	CATALOGO/PRODUCTOS
		Reporte en csv y excel

	BODEGA
		Reporte de stock de producto
		Reporte de vencimientos de producto
		Reporte de ingresos de producto
		Reporte de mermas de producto
		Reporte de lote afectados de producto
		Reporte de productos en bodega 

	MERMAS/REGISTRO DE PERDIDA
		Reporte de perdidas por producto
		Reporte de perdidas por fecha