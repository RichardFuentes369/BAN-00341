CTRL + SHIFT + V

## PENDIENTE 

### Bodega

- habilitar el cargue por csv

## PENDIENTE (II PARTE)
### Funcionalidades
	2. Editar registros de perdida (*)
	3. Hacer enpoint para marcar un producto como vendido o devolución (validar como) (*)
	4. Campanita de notificaciónes (+/-)
	5. Reportes
		Catalogo > Proveedores > ecxel | csv
		Catalogo > Marca > ecxel | csv
		Catalogo > Productos > ecxel | csv  
		Bodega > ecxel | csv 
		Merma > Registro perdida > excel | csv 
	6. Graficos (*)
	7. Alertas > vencimiento > filtro (muy triplehp, pero facil) |reporte (*)
	8. Alertas > bodega > filtro (muy triplehp, pero facil) |reporte (*)
### Ajustes
	1. Arreglar index
	2. (arreglar filtros que si limpio no limpie todo el filtro (si ya existia un filtro previo))
### Tener en cuenta diseño
	layout admin
		barra lateral
		barra horizontal
               breadcrumbs
               iconos
		fondo
		footer
    search
    report
    modal
    input
    card
		
	layout index
		banner
		header
		
	notfound
	nopermission

## Entregables

	1. Hacer manuales
		- hacer manual para usar tunnel de cloudflare
		- hacer manuales de usuario
		- hacer manual de instalación del backend, frontend y base de datos

	2. Otros entregables
		- hacer investigacion de porque no se pudo usar una api de ean13
		- casos de uso
		- mer
		- diagrama de clases
		- diagrama de secuencia

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




bodega editar registro, (tengo un problema de valdiaciónes con el producto y proveedor, a veces cambia el boton editar y a veces no)
merma editar registro, al cambiar el producto por alguno que no existe (no podria crear productos y tengo permisos)