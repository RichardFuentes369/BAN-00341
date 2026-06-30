CTRL + SHIFT + V
#### (Validar que no se pueda eliminar no por permiso si no por delete cascade)

## PENDIENTE 

### Mermas y CronJobs

- si uso el enpoint igualmente [se puede usar para comprar, vender, colocar merma]
- depende del estado de la bodega podria agregar mas merma o no
		
	Merma
	```
		Cuando yo consulte las mermas toca buscar (lote + producto)
		Registro de perdida [
			Agregar id de usuario que hizo el registro
		]
	```
		
	CRONJOBS
	```
		* cronjob para avisar por correo "se queda sin stock" - ya esta andando
		* cronjob para avisar por correo las de vencimiento - ya esta andando
		
		* funcion para indicar si se vendio o fue afectada por merma, necesitaria "codigo de barra" y lote - falta
	```
### Bodega
- habilitar el cargue por csv

## PENDIENTE (II PARTE)
### Filtros

	CATALOGO/PRODUCTOS (Arreglar, quitar o mejorar los planchelholder)
	CATALOGO/MARCAS => PRODUCTOS (ARREGLAR, YA NO PODRIA SELECCIONAR LA MARCA DESEADA, va por default)
	BODEGA => Hacer
	Merma/Registro perdida => Hacer
	Merma/Registro perdida historico => Hacer (3)
	Alertas/bodega => Hacer	
	Alertas/Vencimiento => Hacer	
	Variables del sistema/Var => Hacer	
	Variables del sistema/Json => Hacer	

### Reportes
	
	Catalogo/Proveedores =>Reporte en csv y excel
	Catalogo/Productod => Reporte en csv y excel
	Catalogo/Marcas => Reporte en csv y excel

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


ng serve (inicio anular)
nest start --watch  (inicio nest)
pnpm run dev (inicio nest + angular)
npx expo start -c   (inicio expo)

eas build -p android --profile preview  (en la nube de expo)
eas build -p android --profile preview --local (en mi local)
ssh -p 443 -R0:localhost:3000 a.pinggy.io (abro el tunnel)
