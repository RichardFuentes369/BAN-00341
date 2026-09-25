CTRL + SHIFT + V

## PENDIENTE 

## PENDIENTE (II PARTE)
### Funcionalidades

	1. DASHBOARD: Graficos (*), traducciones
	2. Personalización
	3. Traducciónes modulos globales EAN13, Index, Login ...
	4. Hacer enpoint para marcar las devolución (validar como) (esto no va)
	5. Cambio de estado de bodega automaticos (merma, ventas, devoluciones) (esto no va)

### ¿Que pasa si el backend esta en servidor? => con el endpoint de front y back

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



