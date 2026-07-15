CTRL + SHIFT + V

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
### Funcionalidades

	1. Hacer el editar de Variables del sistema
	2. Hacer vista para manejo de los colores
	3. Hacer enpoint para marcar un producto como vendido o devolución (validar como)
	4. Campanita de notificaciónes
	5. Graficos


### Filtros
	(arreglar filtros que si limpio no limpie todo el filtro (si ya existia un filtro previo))
	Alertas > vencimiento > filtro - order by > nombre de columnas
	Alertas > bodega > reporte > nombre de columnas
	Vatiables del sistems > Var > filtro - order by > nombre de columnas
	Vatiables del sistems > JSON > filtro - order by > nombre de columnas

### Reportes

	Catalogo > Proveedores > ecxel | csv
	Catalogo > Marca > ecxel | csv
	Catalogo > Productos > ecxel | csv  
	Bodega > ecxel | csv 
	Merma > Registro perdida > excel | csv 

## Entregables

	1. Hacer manuales

## Manejo sistema

	ng serve (inicio anular)
	nest start --watch  (inicio nest)
	pnpm run dev (inicio nest + angular)
	npx expo start -c   (inicio expo)

	eas build -p android --profile preview  (en la nube de expo)
	eas build -p android --profile preview --local (en mi local)
	ssh -p 443 -R0:localhost:3000 a.pinggy.io (abro el tunnel)


	// generar ejecutable
	npm i
	pkg ./ejecutable_code.js --targets node16-win-x64,node16-linux-x64,node16-macos-x64 --output dist/tunel
