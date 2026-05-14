CTRL + SHIFT + V
#### (Validar que no se pueda eliminar no por permiso si no por delete cascade)

## PENDIENTE (I PARTE) [11-May-2026  23-May-2026]

### OJO: La bodega y la merma debe controlar muy bien la cantidad

- si elimino la merma debo aumentar la cantidad "En bodega"
- si creo merma diminuyo la cantidad "En bodega" o aumento depende la merma
- si uso el enpoint igualmente [se puede usar para comprar, vender, colocar merma]
- depende del estado de la bodega podria agregar mas merma o no

	Bodega
	```
		Cuando yo consulte las mermas toca buscar (lote + producto)
		Editar [ya tengo el modal, falta la accion - no se si desde aqui pueda aplicar merma]
		Eliminar [Falta todo - pilas si tiene mermas aplicadas]
	```
		
	Merma
	```
		Cuando yo consulte las mermas toca buscar (lote + producto)
		Registro de perdida [
			CRUD - FALTA EN FRONTEND Y EN BACKNED (
				SI ELIMINO, CREO O EDITO ACTUALIZAR AUTOMATICAMENTE LO QUE QUEDA O HALLA 
			)
			Agregar id de usuario que hizo el registro
		]
	```
		
	CRONJOBS
	```
		* cronjob para avisar por correo "se queda sin stock" - ya esta andando
		* cronjob para avisar por correo las de vencimiento - ya esta andando
		
		* funcion para indicar si se vendio o fue afectada por merma, necesitaria "codigo de barra" y lote - falta
	```

	NOTIFICACIÓNES
	```
		* crear un notificador (tabla) para ver notificaciónes de los cronjobs
	```
		
## PENDIENTE (II PARTE)  [25-May-2026  29-May-2026]
### Filtros

	CATALOGO/PRODUCTOS (ARREGLAR)
	CATALOGO/MARCAS => PRODUCTOS (ARREGLAR, YA NO PODRIA SELECCIONAR LA MARCA DESEADA)
	BODEGA
	MERMA/REGISTRO PERDIDAS	
	
	
## PENDIENTE (III PARTE)  [01-Jun-2026 30-Jun-2026]
### Graficos

	EN BASE A LA BODEGA Y MERMAS
	
## PENDIENTE (IV PARTE)  [01-Jul-2026 30-Jul-2026]
### Reportes
	
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