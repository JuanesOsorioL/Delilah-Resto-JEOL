const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/delilah");
const { CodificarToken } = require('./Seguridad');

module.exports = {

    ValidarUsuario: (Username) => {
        const Resultado = sequelize.query('select Username from USUARIO where Username = "' + Username + '"', { type: sequelize.QueryTypes.SELECT }).catch((error) => { console.log(error) })
        return Resultado;
    },

    InsertarUsuario: (reg, res) => {
        const {
            Username,
            Fullname,
            Correo,
            Telefono,
            Direccion,
            Password,
            Rol
        } = reg.body;

        sequelize.query('insert into USUARIO (Username,Fullname,Correo,Telefono,Direccion,Password,Rol) VALUES ("' + Username + '", "' + Fullname + '", "' + Correo + '", "' + Telefono + '", "' + Direccion + '", "' + Password + '", ' + Rol + ' )', { type: sequelize.QueryTypes.INSERT })
            .then(RespuestaInsertar => {


                const ID_Usuario = RespuestaInsertar[0];
                const Token = CodificarToken(ID_Usuario, Username, Password, Rol);
                res.json({ estado: "Usuario Autenticado", Token });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })


    },

    validarUsuarioPassword: (reg, res) => {
        const {
            Username,
            Password
        } = reg.body;

        sequelize.query('select ID,Rol from USUARIO where Username = "' + Username + '" && Password = "' + Password + '"', { type: sequelize.QueryTypes.SELECT })
            .then(RespuestaValidar => {
                if (RespuestaValidar.length == 1) {
                    const { Rol, ID } = RespuestaValidar[0];
                    const Token = CodificarToken(ID, Username, Password, Rol);
                        (Token) ? res.json({ estado: "Usuario Autenticado", Token }) : res.json({ estado: "Usuario NO Autenticado" });
                } else {
                    res.json({ estado: "Username Ò Password Invalido" });
                }
            }).catch((error) => { res.json({ estado: " Error: " + error }) });
    },

    MostrarUsuarios: (reg, res) => {
        sequelize.query('select * from USUARIO ', { type: sequelize.QueryTypes.SELECT })
            .then(MostrarUsuario => {
                (MostrarUsuario.length == 0) ? res.json({ estado: "NO Hay Usuarios Registrados" }) : res.json({ estado: MostrarUsuario });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    MostrarUsuariosUser: (reg, res) => {
        const Usuario = res.locals.usuario;
        sequelize.query('select * from USUARIO where ID = ' + Usuario + '', { type: sequelize.QueryTypes.SELECT })
            .then(MostrarUsuario => {
                (MostrarUsuario.length == 0) ? res.json({ estado: "Usuario No Existe" }) : res.json({ estado: MostrarUsuario });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    }
}