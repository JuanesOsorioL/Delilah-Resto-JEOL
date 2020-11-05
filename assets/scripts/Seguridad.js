const jsonWebToken = require('jsonwebtoken');
const myJWTSecretKey = 'My_Clave_Secreta';

module.exports = {

    DescodificarToken: (token) => {
        const tokenDecodedData = jsonWebToken.verify(token, myJWTSecretKey);
        return tokenDecodedData;
    },

    CodificarToken: (ID, User, Password, Rol) => {
        const payload = {
            "ID": ID,
            "Usuario": User,
            "pass": Password,
            "Rol": Rol
        }
        //const Token = jsonWebToken.sign(payload, myJWTSecretKey, { expiresIn: 60 * 60 * 24 }); //24 horas en segundos
        const Token = jsonWebToken.sign(payload, myJWTSecretKey);
        return Token;
    }
}
