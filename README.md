CTRL + SHIFT + V

## PENDIENTE 

### Bodega

- habilitar el cargue por csv

## PENDIENTE (II PARTE)
### Funcionalidades

	1. Checkear todos los editar (hay bugs) [Algunos campos actualizan, otros no] [Los select dependientes]
	2. Hacer enpoint para marcar un producto como vendido o devolución (validar como) (*)
		
	3. Graficos (*)

	4. Alertas > vencimiento > filtro (muy triplehp, pero facil) | ver
	5. Alertas > bodega > filtro (muy triplehp, pero facil) | ver

	6. Campanita de notificaciónes (+/-) (mirar si hay algo que me acualice en tiempo real)
	7. Permisos (mirar si hay algo que me acualice en tiempo real)

### Ajustes

	1. Arreglar index
	
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



