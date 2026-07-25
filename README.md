CTRL + SHIFT + V

## PENDIENTE 

### Bodega

- habilitar el cargue por csv

## PENDIENTE (II PARTE)
### Funcionalidades

	1. tengo muchos bugs en los editar y crear cuando son [productos, proveedores] [validar todos los formularios y posibilidades] (*)
	2. Hacer enpoint para marcar un producto como vendido o devolución (validar como) (*)

	3. Campanita de notificaciónes (+/-)
	4. Reportes
		Catalogo > Proveedores > ecxel | csv
		Catalogo > Marca > ecxel | csv
		Catalogo > Productos > ecxel | csv  
		Bodega > ecxel | csv 
		Merma > Registro perdida > excel | csv 
	5. Graficos (*)

	6. Alertas > vencimiento > filtro (muy triplehp, pero facil) | reporte (*) | ver
	7. Alertas > bodega > filtro (muy triplehp, pero facil) | reporte (*)

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



