CTRL + SHIFT + V

## PENDIENTE 

## PENDIENTE (II PARTE)
### Funcionalidades pendientes

	1. DASHBOARD: Graficos sobre ventas y cuando hago codigo_barra y lote 
	2. Aplicar filtro fechas
	
	3. Personalización
	4. Manual web: Agregar la instalacion del plugin en chrome
	5. Ajustar los filtros a los reportes excel csv

### Futuras mejoras

	6. Hacer enpoint para marcar las devolución (validar como) (esto no va)
	7. Cambio de estado de bodega automaticos (merma, ventas, devoluciones) (esto no va)

## Manejo sistema

	ng serve (inicio anular)
	nest start --watch  (inicio nest)
	pnpm run dev (inicio nest + angular)
	npx expo start -c   (inicio expo)

	eas build -p android --profile preview  (en la nube de expo)
	eas build -p android --profile preview --local (en mi local)

	ssh -p 443 -R0:localhost:3000 a.pinggy.io (abro el tunnel pinggy)
	cloudflared tunnel --url http://localhost:3000 (abro el tunnel cloudflared)


	// generar ejecutable
	npm i
	pkg ./ejecutable_code.js --targets node16-win-x64,node16-linux-x64,node16-macos-x64 --output dist/tunel



