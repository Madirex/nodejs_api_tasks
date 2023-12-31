# nodejs_api_tasks
Aplicación API en Node JS junto a base de datos Mongo DB y una web para interactuar. Cuenta con 3 Dockerfile y un Docker-Compose para desplegar.

## Ejecución
- Usa el siguiente comando para ejecutar los contenedores: docker-compose up -d
- Puedes probar las consultas de la API utilizando la colección de Postman "Tasks List.postman_collection.json".
- La web se ejecuta en http://localhost:8080

## Estructura de Carpetas
- 📁 **images**: Contiene imágenes que ilustran los diferentes contenedores y aspectos esenciales del proyecto.
- 📁 **js**: Contiene el código JavaScript utilizado en la interfaz web.
- 📁 **styles**: Almacena los estilos utilizados en la interfaz web.

## Contenedores
### Contenedores
<p align="center">
  <img src="images/containers.png"/>
</p>
Panorama general que muestra todos los contenedores en interacción.

### 1. Contenedor Mongo
<p align="center">
  <img src="images/mongo_container.png"/>
</p>
Visualización del contenedor de MongoDB, una parte integral del sistema.

### 2. Contenedor API
<p align="center">
  <img src="images/api_container.png"/>
</p>
Imagen representativa del contenedor API.

### 3. Contenedor web (Nginx)
<p align="center">
  <img src="images/nginx_container.png"/>
</p>
Representación visual del contenedor Nginx, crucial para el funcionamiento fluido del proyecto.

## Postman
<p align="center">
  <img src="images/postman.png"/>
</p>
Captura de Postman para ilustrar la interacción con la API. La colección viene incluida en el proyecto.

## Web
<p align="center">
  <img src="images/web.png"/>
</p>
Vista previa de la interfaz web del proyecto.
