const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/delilah");

 function InsertarPedidoPriducto( ID_Pedido, element) {
   
    let {
        ID,
        Cantidad
    } = element;

     sequelize.query('insert into PEDIDO_PRODUCTO (ID_Producto,ID_Pedido,Cantidad) VALUES (' + ID + ',' + ID_Pedido + ',' + Cantidad + ')', { type: sequelize.QueryTypes.INSERT })
        .then(RespuestaInsertarPP => {  // [ 4, 1 ]
            return true;
        }).catch((error) => { return false; });
}



module.exports = {

    InsertarPedido: async (reg, res) => {

        const {
            Estado,
            Total,
            Pago,
            ID_Usuario,
            Productos //[ { ID: 1, Cantidad: 2 }, { ID: 2, Cantidad: 1 } ]
        } = reg.body;

        const data = new Date();
        const tms = `${data.getFullYear()}-${data.getMonth()}-${data.getDay()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;


        sequelize.query('insert into PEDIDO (Estado, Total, Pago, Fecha, ID_Usuario) VALUES (' + Estado + ',' + Total + ',' + Pago + ',"' + tms + '",' + ID_Usuario + ')', { type: sequelize.QueryTypes.INSERT })

            .then(RespuestaInsertarP => {   // [ 4, 1 ]
                const CapturarPosicion=RespuestaInsertarP[RespuestaInsertarP.length - 1];
                if (CapturarPosicion == 0) {
                    res.json({ estado: "NO Se Ingreso Pedido" });
                } else {
                    const ID_Pedido = RespuestaInsertarP[0];

                    for (let i = 0; i < Productos.length; i++) {
                        InsertarPedidoPriducto(ID_Pedido,Productos[i]);
                    }
                    res.json({ estado: " Se Ingreso Pedido Correctamente" })
                }
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },


    MostrarPedidoAdmin: (reg, res) => {
        sequelize.query('select pe.ID as ID_Pedido, pe.Estado,  pe.Fecha, pr.ID as ID_Producto,  pr.Nombre,pr.Detalle, pr.Valor as Valor_Unitario,pp.Cantidad, pe.Total as Valor_Total, pe.Pago from PEDIDO pe JOIN PEDIDO_PRODUCTO PP ON pp.ID_Pedido=pe.ID JOIN PRODUCTO pr ON pr.ID=pp.ID_Producto', { type: sequelize.QueryTypes.SELECT })
            .then(ResPedidoAdmin => {
                (ResPedidoAdmin.length == 0) ? res.json({ estado: "NO Hay Pedidos Guardados" }) : res.json({ estado: ResPedidoAdmin });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    MostrarPedidoUser: (reg, res) => {
        const Usuario = res.locals.usuario;
        sequelize.query('select pe.ID as ID_Pedido, pe.Estado,  pe.Fecha, pr.ID as ID_Producto,  pr.Nombre,pr.Detalle, pr.Valor as Valor_Unitario,pp.Cantidad, pe.Total as Valor_Total, pe.Pago from PEDIDO pe JOIN PEDIDO_PRODUCTO PP ON pp.ID_Pedido=pe.ID JOIN PRODUCTO pr ON pr.ID=pp.ID_Producto where ID_Usuario = ' + Usuario + '',{ type: sequelize.QueryTypes.SELECT })
            .then(ResPedidoUser => {
                (ResPedidoUser.length == 0) ? res.json({ estado: "NO Hay Pedidos Con Este ID" }) : res.json(ResPedidoUser)
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    ActualizarPedido: async (reg, res) => {

        const {
            ID_Pedido,
            Estado
        } = reg.body;

        sequelize.query('update PEDIDO set Estado = ' + Estado + ' where ID = ' + ID_Pedido + '', { type: sequelize.QueryTypes.UPDATE })
            .then(RespuestaActualizar => {
                (RespuestaActualizar[RespuestaActualizar.length - 1] == 1) ? res.json({ estado: "Estado Actualizado Correctamente" }) : res.json({ estado: "Estado NO Fue Actualizado Ó ID NO Existe" });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    },

    EliminarPedido: (reg, res) => {
        const {
            ID_Pedido
        } = reg.body;

        sequelize.query('delete from PEDIDO where ID = ' + ID_Pedido + '', { type: sequelize.QueryTypes.Delete })
        sequelize.query('delete from PEDIDO_PRODUCTO where ID_Pedido = ' + ID_Pedido + '', { type: sequelize.QueryTypes.Delete })

            .then(RespuestaPedido => {
                /*             [
                                ResultSetHeader {
                                  fieldCount: 0,
                                  affectedRows: 1,
                                  insertId: 0,
                                  info: '',
                                  serverStatus: 2,
                                  warningStatus: 0
                                },
                                ResultSetHeader {
                                  fieldCount: 0,
                                  affectedRows: 1,
                                  insertId: 0,
                                  info: '',
                                  serverStatus: 2,
                                  warningStatus: 0
                                }
                              ] */
                const {
                    affectedRows
                } = RespuestaPedido[0];
                (affectedRows == 1) ? res.json({ estado: "Pedido Eliminado Correctamente" }) : res.json({ estado: "Pedido NO Fue Eliminado PEDIDO" });
            }).catch((error) => { res.json({ estado: " Error: " + error }) })
    }
}