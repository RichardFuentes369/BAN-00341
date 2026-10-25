sudo lsof -i :3000

### 1. Creamos una carperta nombre_proyecto
### 2. Dentro de nombre_proyecto creamos 2 carpetas frontend, backend y un archivo llamado ecosystem.config.js el cual contendra lo siguiente

    ```
    const path = require('path');

    module.exports = {
    apps: [
        {
        name: 'pos-backend',
        script: './main.js',
        cwd: path.join(__dirname, 'backend'),
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        env: {
            NODE_ENV: 'production',
            PORT: 9601
        }
        },
        {
        name: 'pos-frontend',
        script: 'serve',
        env: {
            PM2_SERVE_PATH: path.join(__dirname, './frontend'),
            PM2_SERVE_PORT: 9600,
            PM2_SERVE_SPA: 'true',
            PM2_SERVE_HOMEPAGE: '/index.html'
        }
        }
    ]
    };
    ```
### 3. Ajustamos los puertos del enviroment de nest y angular
### 4. Compilamos nest y pegamos en backend todo lo que esta dentro del dist
    - copiamos manualmente en nombre_proyecto/backend el .env e la carpeta nest
    - copiamos manualmente en nombre_proyecto/backend el package.json de la carpeta nest
    - ejecutamos npm i
### 5. Compilamos angular y pegamos en frontend todo lo que esta dentro de dist/browser

# NGINX

    > pm2 kill [mata todos los procesos]
    > pm2 delete pos-backend [mata el proceso pos-backend]
    > pm2 delete pos-frontend [mata el proceso pos-frontend]
    > pm2 start ecosystem.config.js [levanta los procesos configurados dentro del archivo]
    > pm2 save [guarda los ajustes]

* Para tener información de pm2 de cada sitio ejecutamos lo siguiente 
** Los 3 puntos significan el nombre del sitio ej "pos-backend"

    ```
        pm2 status
        pm2 logs ...
        pm2 stop ...
        pm2 restart ...
        pm2 delete ...

        pm2 info ...
        pm2 info ...
    ```
