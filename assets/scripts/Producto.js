const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/delilah");

module.exports = {

    ValidarProducto: (NombreProducto) => {
        const Resultado = sequelize.query('select Nombre from PRODUCTO where Nombre = "' + NombreProducto + '"', { type: sequelize.QueryTypes.SELECT }).catch((error) => { console.log(error) })
        return Resultado;
    },

    InsertarProducto: (reg, res) => {

        const {
            Nombre,
            Detalle,
            Img,
            Valor
        } = reg.body;

        sequelize.query('insert into PRODUCTO (Nombre,Detalle,Img,Valor) VALUES ("' + Nombre + '", "' + Detalle + '", "' + Img + '",  ' + Valor + ')', { type: sequelize.QueryTypes.INSERT })
            .then(RespuestaInsertar => {
                const Contenido = RespuestaInsertar[RespuestaInsertar.length - 1];
                (Contenido == 1) ? res.json({ estado: "Producto Guardado Correctamente" }) : res.json({ estado: "Producto NO Fue Guardado Correctamente" });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    MostrarProductos: (reg, res) => {

        sequelize.query('select * from PRODUCTO', { type: sequelize.QueryTypes.SELECT })
            .then(RespuestaMostrar => {
                (RespuestaMostrar.length == 0) ?
                    res.json({ estado: "NO Hay Productos Almacenados" }) : res.json({ estado: RespuestaMostrar })
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    ActualizarProdusctos: (reg, res) => {

        const {
            ID,
            Nombre,
            Detalle,
            Img,
            Valor
        } = reg.body;

        sequelize.query('update PRODUCTO set Nombre = "' + Nombre + '", Detalle="' + Detalle + '", Img = "' + Img + '", Valor =' + Valor + ' where ID = ' + ID + '', { type: sequelize.QueryTypes.UPDATE })
            .then(RespuestaActualizar => {
                (RespuestaActualizar[RespuestaActualizar.length - 1] == 1) ? res.json({ estado: "Producto Actualizado Correctamente" }) : res.json({ estado: "Producto NO Fue Actualizado Ó ID NO Existe" });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    EliminarProdusctos: (reg, res) => {

        const {
            ID
        } = reg.body;

        sequelize.query('delete from PRODUCTO where ID = ' + ID + '', { type: sequelize.QueryTypes.Delete })
            .then(RespuestaEliminar => {
                const {
                    affectedRows
                } = RespuestaEliminar[0];

                (affectedRows == 1) ? res.json({ estado: "Producto Eliminado Correctamente" }) : res.json({ estado: "Producto NO Existe Ó Ya Fue Eliminado" });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    }
}