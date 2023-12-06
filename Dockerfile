FROM nginx:1-alpine

# Se elimina el contenido predeterminado de nginx
RUN rm -rf /usr/share/nginx/html/*

# Se copian todos los archivos HTML, CSS y JS al contenedor
COPY index.html /usr/share/nginx/html/
COPY styles/ /usr/share/nginx/html/styles/
COPY js/ /usr/share/nginx/html/js/

# Se expone el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]