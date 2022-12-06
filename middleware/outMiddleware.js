// Importaciones
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";


// Checar(verificar) la autenticacion
const checkAuth = async(req,res,next) =>{

    let token;

    // console.log('hola');
    // console.log(req.headers)

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('Si tiene el token con bearer')

        try {
            
            // Extrayendo el token sin la palabra Bearer
            token = req.headers.authorization.split(' ')[1];
            console.log(token);

            // verificando con JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decoded);

            // Asignando los datos del usuario al request
            req.usuario = await Usuario.findOne({
                where:{
                    cedula: decoded.cedula
                }
            })

            // Retorna la siguiente accion
            return next();
        } catch (error) {
            // Retorna el error
            return res.json({error: true, message: 'Token no válido o Inexistente.'});
        }
    }

    // Si no existe el token
    if(!token){
        // Retorna el error
        res.json({error: true, message: 'Token no válido o Inexistente.'});
    }


    next();
}

export default checkAuth;