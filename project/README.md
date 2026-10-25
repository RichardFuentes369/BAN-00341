CTRL + SHIFT + V

## PENDIENTE 

## PENDIENTE (II PARTE)
### Funcionalidades pendientes
	1. Manual instalación plugin
	2. Manual instalación aplicativo web
	3. Ajustar los filtros a los reportes excel csv

### Futuras mejoras

	4. Hacer enpoint para marcar las devolución (validar como) (esto no va)
	5. Cambio de estado de bodega automaticos (merma, ventas, devoluciones) (esto no va)
	6. Auditorias de tablas

## Manejo sistema

	(Angular)
	npm i --legacy-peer-deps (Angular, por el datatable library estar desactualizado)
	ng serve

	(Nest)
	npm i 
	cp .env.example .env
	nest start --watch  

	(Expo)
	npm i
	npx expo start -c   
		(Generar apk)
		eas build -p android --profile preview  (en la nube de expo)
		eas build -p android --profile preview --local (en mi local)

	(Cloudflared)
	cloudflared tunnel --url http://localhost:3000 