# Delilah-Resto-JEOL

API RESTful utilizando:

nodejs
MySQL
Descripcion Javascript: "API para manejo de información de pedidos en un restaurante". versión: "1.0.0" titulo: "Delillah Resto" contacto: Juan Esteban Osorio email:juanesosorio@outlook.com

SERVIDOR:
Para iniciar el servidor: -Instalar la dependencia "express" (npm install express); -Dentro del archivo "index.js" se puede ver que el puerto que se esta utilizando es 3000, si desea puede cambiarlo.

DEPENDENCIAS:
En esta API se utilizan las siguientes dependencias que deberán instalar: -  sequelize - jsonwebtoken - MySQL2 (Encontrarán todas las dependencias en el archivo "package.json")

BASE DE DATOS:
Una vez instalada la dependencia, en el archivo "deliallah.sql" encontrará todo lo necesario para crear la base de datos. Pero en el Archivo Conexion.js esta inplementado un codigo para crear la base de datos con sus Tablas y Algunos Registros para realizar pruebas que si desea se puede omitir.

CARTERO:
En el archivo "Api_Material.json" se encuentran los Recursos para realizar pruebas a los endopoints.

RESPUESTA:
Toda las respuestas serán un objeto json.

PUNTOS FINALES:
A clientes: - post / NewUser - post /login - get /R-User 

A productos: - post /C-Producto - get /R-Producto - put /U-Producto - delete /D-Producto

A Pedidos - post /C-Pedido - get /R-Pedido - put /U-Pedido - delete /D-Pedido
