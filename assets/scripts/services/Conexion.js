const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/delilah");

const mysql = require('mysql2');

module.exports = {

    Conexion: () => {
        sequelize.authenticate()
            .then(() => {
                console.log('Conectado');
               // sequelize.close();
            })
            .catch(err => {

                const {original} = err;

                if (original.sqlMessage == "Unknown database 'delilah'") {

                    const connection = mysql.createConnection({
                        user: 'root',
                        password: 'root',
                        host: 'Localhost',
                        port: '3306'
                    });

                    const initialMySQL = [
                        {
                            query: "create database delilah;"
                        },
                        {
                            query: "use delilah;"
                        },
                        {
                            query: " create table USUARIO (ID int primary key auto_increment not null, Username varchar(255) not null, Fullname varchar(255) not null, Correo varchar(255) not null, Telefono varchar(15) not null, Direccion varchar(255) not null, Password varchar(20) not null, Rol enum('Admin','User') not null DEFAULT 'User');"
                        },
                        {
                            query: "create table PRODUCTO (ID int primary key auto_increment not null, Nombre varchar(255) not null, Detalle varchar(255) not null, Img varchar(255) not null, Valor float not null);"
                        },
                        {
                            query: "create table PEDIDO (ID int primary key auto_increment not null, Estado enum('Nuevo','Confirmado','Preparando','Enviado','Entregado','Cancelado') not null DEFAULT 'Nuevo',Total float not null, Pago enum('Efectivo','Tarjeta de debito') not null DEFAULT 'Efectivo', Fecha TIMESTAMP not null, ID_Usuario int not null);"
                        },
                        {
                            query: "create table PEDIDO_PRODUCTO (ID int primary key auto_increment not null, ID_Producto int not null, ID_Pedido int not null, Cantidad integer NOT NULL DEFAULT 1);"
                        },
                        {
                            query: "insert into USUARIO (Username, Fullname, Correo, Telefono, Direccion, Password, Rol) VALUES ('juanes','Juan Esteban Osorio Lopera','juan@hotmail','1234567891','calle 4 #55-70','JUANES1','Admin'),('estebano','esteban sanchez','esteban@hotmail','1547854698','calle 5 #5-7','ESTEBAN1',2),('oscar','oscar lopera lopez','oscar@hotmail','1547854598','calle 8 #58-76','OSCAR1','Admin');"
                        },
                        {
                            query: "insert into PRODUCTO (Nombre, Detalle, Img, Valor) VALUES ('papas fritas','papas, ensalada, gaseosa, carnes frias','Papas',15000),('perro caliente','pan, ensalada, gaseosa, carnes frias','perro-Caliente',10000),('hamburguesa','pan, ensalada, gaseosa, carnes frias','Papas',20000);"
                        },
                        {
                            query: "insert into PEDIDO (Estado,Total,Pago,Fecha,ID_Usuario) VALUES (1,30000,1,'2020-11-01 19:18:00',1),(1,10000,1,'2020-11-01 19:18:00',2),(1,40000,1,'2020-11-01 19:18:00',3),(1,20000,1,'2020-09-01 1:18:00',1);"
                        },
                        {
                            query: "insert into PEDIDO_PRODUCTO (ID_Producto, ID_Pedido, Cantidad) VALUES (1,1,2),(2,4,2),(2,2,1),(3,3,2);"
                        }
                    ];
                    initialMySQL.forEach((queryString) => {
                        connection.query(queryString.query);
                    })
                  //  connection.end();
                } else {
                    console.error('No Funciona por: ', err);
                }
            });
    }
}