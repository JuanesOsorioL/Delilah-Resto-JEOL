create database delilah;
use delilah;

show databases;
drop database delilah;

create table USUARIO(
ID int primary key auto_increment not null,
Username varchar(255) not null,
Fullname varchar(255) not null,
Correo varchar(255) not null,
Telefono varchar(15) not null,
Direccion varchar(255) not null,
Password varchar(20) not null,
Rol enum('Admin','User') not null DEFAULT 'User'
);

insert into USUARIO (Username,Fullname,Correo,Telefono,Direccion,Password,Rol) 
VALUES ("juanes","Juan Esteban Osorio Lopera","juan@hotmail","1234567891","calle 4 #55-70","JUANES1","Admin");

insert into USUARIO (Username,Fullname,Correo,Telefono,Direccion,Password,Rol) 
VALUES ("estebano","esteban sanchez","esteban@hotmail","1547854698","calle 5 #5-7","ESTEBAN1",2);

insert into USUARIO (Username,Fullname,Correo,Telefono,Direccion,Password,Rol) 
VALUES ("oscar","oscar lopera lopez","oscar@hotmail","1547854598","calle 8 #58-76","OSCAR1","Admin");

#select * from USUARIO;
#//////////////////////////////////////////////////////////////////////////////////////////////////

create table PRODUCTO(
ID int primary key auto_increment not null,
Nombre varchar(255) not null,
Detalle varchar(255) not null,
Img varchar(255) not null,
Valor float not null
);

insert into PRODUCTO (Nombre,Detalle,Img,Valor) 
VALUES ("papas fritas","papas, ensalada, gaseosa, carnes frias","Papas",15000);

insert into PRODUCTO (Nombre,Detalle,Img,Valor) 
VALUES ("perro caliente","pan, ensalada, gaseosa, carnes frias","perro-Caliente",10000);

insert into PRODUCTO (Nombre,Detalle,Img,Valor) 
VALUES ("hamburguesa","pan, ensalada, gaseosa, carnes frias","Papas",20000);

#select * from PRODUCTO;
#//////////////////////////////////////////////////////////////////////////////////////////////////

create table PEDIDO(
ID int primary key auto_increment not null,
Estado enum('Nuevo','Confirmado','Preparando','Enviado','Entregado','Cancelado') not null DEFAULT 'Nuevo',
Total float not null,
Pago enum('Efectivo','Tarjeta de debito') not null DEFAULT 'Efectivo',
Fecha TIMESTAMP not null,
ID_Usuario int not null
);

insert into PEDIDO (Estado,Total,Pago,Fecha,ID_Usuario) 
VALUES (1,30000,1,"2020-11-01 19:18:00",1);

insert into PEDIDO (Estado,Total,Pago,Fecha,ID_Usuario) 
VALUES (1,10000,1,"2020-11-01 19:18:00",2);

insert into PEDIDO (Estado,Total,Pago,Fecha,ID_Usuario) 
VALUES (1,40000,1,"2020-11-01 19:18:00",3);

insert into PEDIDO (Estado,Total,Pago,Fecha,ID_Usuario) 
VALUES (1,20000,1,"2020-09-01 1:18:00",1);

create table PEDIDO_PRODUCTO(
ID int primary key auto_increment not null,
ID_Producto int not null,
ID_Pedido int not null,
Cantidad integer NOT NULL DEFAULT 1
);

insert into PEDIDO_PRODUCTO (ID_Producto,ID_Pedido,Cantidad) 
VALUES (1,1,2);

insert into PEDIDO_PRODUCTO (ID_Producto,ID_Pedido,Cantidad) 
VALUES (2,4,2);

insert into PEDIDO_PRODUCTO (ID_Producto,ID_Pedido,Cantidad) 
VALUES (2,2,1);

insert into PEDIDO_PRODUCTO (ID_Producto,ID_Pedido,Cantidad) 
VALUES (3,3,2);

#select * from PEDIDO;
#select * from PEDIDO_PRODUCTO;





