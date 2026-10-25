CTRL + SHIFT + V

## PENDIENTE 

## PENDIENTE (II PARTE)
### Funcionalidades pendientes
	1. Manual web: Agregar la instalacion del plugin en chrome
	2. Ajustar los filtros a los reportes excel csv

### Futuras mejoras

	3. Hacer enpoint para marcar las devolución (validar como) (esto no va)
	4. Cambio de estado de bodega automaticos (merma, ventas, devoluciones) (esto no va)

## Manejo sistema

	(Angular)
	npm i --legacy-peer-deps (Angular, por el datatable library estar desactualizado)
	ng serve

	(Nest)
	npm i 
	nest start --watch  

	(Expo)
	npm i
	npx expo start -c   
		(Generar apk)
		eas build -p android --profile preview  (en la nube de expo)
		eas build -p android --profile preview --local (en mi local)

	(Cloudflared)
	cloudflared tunnel --url http://localhost:3000 