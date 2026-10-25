sudo lsof -i :3000

1. Creamos una carperta nombre_proyecto
2. Dentro de nombre_proyecto creamos 2 carpetas frontend y backend
3. Ajustamos los puertos del enviroment de nest y angular
4. Compilamos nest y pegamos en backend todo lo que esta dentro del dist
    - copiamos manualmente en nombre_proyecto/backend el .env
    - copiamos el package.json en nombre_proyecto/backend
    - ejecutamos npm i
5. Compilamos angular y pegamos en frontend todo lo que esta dentro de dist/browser

# NGINX

    pm2 kill
    pm2 delete pos-backend
    pm2 delete pos-frontend
    pm2 start ecosystem.config.js

    pm2 save

* Para tener información de pm2 de cada sitio ejecutamos lo siguiente 
** Los 2 puntos significan el nombre del sitio ej "pos-backend"

    ```
        pm2 status
        pm2 logs ...
        pm2 stop ...
        pm2 restart ...
        pm2 delete ...

        pm2 info ...
        pm2 info ...
    ```
