const { ValidarDatosIngresoRegistro, ValidarDatosIngresadoslogin, ValidarPermisos } = require('./assets/scripts/MIddleware');
const { InsertarUsuario, validarUsuarioPassword,MostrarUsuarios } = require('./assets/scripts/Cliente');
const { InsertarProducto, MostrarProductos, ActualizarProdusctos, EliminarProdusctos } = require('./assets/scripts/Producto');
const { InsertarPedido, ActualizarPedido, EliminarPedido } = require('./assets/scripts/Pedido');
const { Conexion } = require('./assets/scripts/services/Conexion');

const express = require("express");
const PORT = 3000;
const app = express();
app.use(express.json());

///////////conexion//////////////////////////////////////////////////////////////////////////////
Conexion();
///////////Usuario/////////////////////////////////////////////////////////////////////////////
app.post("/NewUser", ValidarDatosIngresoRegistro, InsertarUsuario);

app.get("/R-User", ValidarPermisos,MostrarUsuarios);

app.post("/login", ValidarDatosIngresadoslogin, validarUsuarioPassword);

//////////Producto///////////////////////////////////////////////////////////////////////////////
app.post("/C-Producto", ValidarPermisos, InsertarProducto);

app.get("/R-Producto", MostrarProductos);

app.put("/U-Producto", ValidarPermisos, ActualizarProdusctos);

app.delete("/D-Producto", ValidarPermisos, EliminarProdusctos);

//////////Pedido////////////////////////////////////////////////////////////////////////////////
app.post("/C-Pedido",InsertarPedido);

app.get("/R-Pedido", ValidarPermisos);

app.put("/U-Pedido", ValidarPermisos, ActualizarPedido);

app.delete("/D-Pedido", ValidarPermisos, EliminarPedido);

/////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => { console.log("servidor escuchando en el puerto " + PORT) });