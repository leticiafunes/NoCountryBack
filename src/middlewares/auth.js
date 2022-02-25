const jwt = require('jsonwebtoken');
const moment = require ('moment');
const config = require ('../config')


function isAuth (req, res, next) {
   if (!req.headers.authorization){
       return res.status (403).send ({message: 'No authorization'})
   }

   const token = req.headers.authorization.split ("")[1]; //en el segundo elemento del array está el token. 
   const payload = jwt.decode (token, config.SECRET_TOKEN)



//Vemos si el token no ha caducado

if (payload.exp <= moment().unix()) {
    return res.status (401).send ({message: 'Token expired'})
}

req.user = payload.sub 
next()

}

module.exports  = isAuth



