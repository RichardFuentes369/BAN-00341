CTRL + SHIFT + V

## PENDIENTE 

## PENDIENTE (II PARTE)
### Funcionalidades

	1. Traducciónes modulos globales EAN13
	2. DASHBOARD: Graficos (*), traducciones
	3. Hacer enpoint para marcar las devolución (validar como) 
	4. Cambio de estado de bodega automaticos (merma, ventas, devoluciones)
		
### Personalización
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

### ¿Que pasa si el backend esta en servidor? => con el endpoint de front y back

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



