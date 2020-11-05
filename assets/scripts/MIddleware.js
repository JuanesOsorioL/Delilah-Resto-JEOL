const { ValidarUsuario,MostrarUsuariosUser,MostrarUsuarios } = require('./Cliente');
const { ValidarProducto } = require('./Producto');
const { DescodificarToken } = require('./Seguridad');
const { MostrarPedidoUser, MostrarPedidoAdmin } = require('./Pedido');

module.exports = {

    ValidarDatosIngresoRegistro: async (reg, res, next) => {
        
        const {
            Username,
            Fullname,
            Correo,
            Telefono,
            Direccion,
            Password,
            Rol
        } = reg.body;

        if (Username != "" && Fullname != "" && Correo != "" && Telefono != "" && Direccion != "" && Password != "" && Rol != "") {
            await ValidarUsuario(Username)
                .then(RespuestaValidar => {
                    if (RespuestaValidar.length == 0) {
                        next();
                    } else {
                        res.json({ estado: "Username Invalido" });
                    }
                }).catch((error) => { res.json({ estado: " Error: " + error }) })
        } else {
            res.send({ estado: "Por favor NO Dejar Campos Vacios!" });
        }
    },

    ValidarDatosIngresadoslogin: (reg, res, next) => {

        const {
            Username,
            Password
        } = reg.body;

        if (Username == "" && Password == "") {
            res.send({ estado: "Por favor NO Dejar Campos Vacios!" });
        } else {
            next();
        }
    },

    ValidarPermisos: async (reg, res, next) => {

        const Token = reg.headers.autenticacion;

        if (!Token) {
            res.json({ estado: "No Tienes Permisos " })
        } else {
            const Datos = DescodificarToken(Token);

            const {
                ID,
                Rol
            } = Datos;

console.log(Rol);



            if (Rol == "Admin") {

                switch (reg.path) {
                    case '/C-Producto':
                        const {
                            Nombre
                        } = reg.body;
                        await ValidarProducto(Nombre)
                            .then(RespuestaValidar => {
                                if (RespuestaValidar.length == 0) {
                                    next();
                                } else {
                                    res.json({ estado: "Nombre Del Producto Ya Esta Registrado" })
                                }
                            }).catch((error) => { res.json({ estado: " Error: " + error }) })
                        break;


                    case '/R-Pedido':
                        MostrarPedidoAdmin(reg, res);
                        break;


                    case '/R-User':
                        MostrarUsuarios(reg, res);
                        break;


                    default: next();
                        break;
                }
            } else {
                //usuario
                switch (reg.path) {
                    case 'R-Producto':
                        next();
                        break;

                    case '/C-Pedido':
                        next();
                        break;

                    case '/R-User':
                        res.locals.usuario = ID;
                        MostrarUsuariosUser(reg, res)
                        break;

                    case '/R-Pedido':
                        res.locals.usuario = ID;
                        MostrarPedidoUser(reg, res)
                        break;

                    default: res.json({ estado: "NO Tienes Permisos" })
                        break;
                }
            }
        }
    }
}

