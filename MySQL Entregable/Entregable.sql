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
Rol varchar(5) not null
);
select * from USUARIO;
insert into USUARIO (Username,Fullname,Correo,Telefono,Direccion,Password,Rol) 
VALUES ("juanes","Juan Esteban Osorio Lopera","juan@hotmail",1234567891,"calle 4 #55-70","JUANES10","Admin");

#//////////////////////////////////////////////////////////////////////////////////////////////////
create table PRODUCTO(
ID int primary key auto_increment not null,
Nombre varchar(255) not null,
Detalle varchar(255) not null,
Img varchar(255) not null,
Valor int not null
);
select * FROM PRODUCTO;
DELETE FROM  PRODUCTO WHERE ID=3;
update PRODUCTO set Nombre ="hot dog" where ID=1;


#//////////////////////////////////////////////////////////////////////////////////////////////////
create table PEDIDO(
ID int primary key auto_increment not null,
Estado int(1) not null,
Detalle varchar(255) not null,
Total int not null,
Pago int(1) not null,
Fecha TIMESTAMP not null,
ID_Usuario int not null,
foreign key (ID_Usuario) references USUARIO (ID)
);
select * FROM PEDIDO;
insert into PEDIDO (Estado,Detalle,Total,Pago,Fecha) VALUES (1,"ensayo",4500,2,"1970-01-01 10:50:20");

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM PEDIDO as P,PEDIDO_PRODUCTO as PR
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;


#//////////////////////////////////////////////////////////////////////////////////////////////////
create table PEDIDO_PRODUCTO(
ID int primary key auto_increment not null,
ID_Producto int not null,
ID_Pedido int not null,
foreign key (ID_Producto) references PRODUCTO (ID),
foreign key (ID_Pedido) references PEDIDO (ID)
);
