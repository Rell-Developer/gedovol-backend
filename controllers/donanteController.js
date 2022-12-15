// Importar Archivos necesarios
// Modelos
import Donante from '../models/Donante.js';

// Helpers
import generarID from '../helpers/generarID.js';
import generarJWT from '../helpers/generarJWT.js';
import { hashearPassword, comprobarPassword } from '../helpers/hashearPasswords.js';
import enviarCorreo from '../helpers/enviarCorreo.js';

// ====== Metodos del CRUD ======
// ====== GET ======
const obtenerDonantes = async(req,res) =>{

    try {
        
        // Busqueda de todos los donantes
        let donantes = await Donante.findAll();

        // Array con todos los datos de los donantes
        let datos = [];

        // Recorrido para llenar el array de los datos de los clientes
        donantes.forEach(donante=> datos.push(donante['dataValues']));

        // Retorno al frontend de los datos de los donantes
        res.json(datos);
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message, error:true});
    }
}

// ====== POST ======


// Registrar a un Donante
const registrarDonante = async(req, res) => {

    // Destructuring
    let {nombre, apellido, cedula, correo, telefono} = req.body;

    try {
        
        // Variables
        let dataObj = {};
        let donanteEncontrado = false;

        // Peticion a la base de datos para si la cedula ya está registrada
        let donantes = await Donante.findAll();

        // Busca si la cedula ya está registrada con otro donante
        donantes.forEach( donante => {
            if(donante['dataValues'].cedula === cedula){
                donanteEncontrado = true;
                dataObj.message = 'Esta cédula ya está registrada con un donante';
            }

            if(usuario['dataValues'].correo === correo){
                donanteEncontrado = true;
                dataObj.message = 'Este correo electronico ya está registrado con un donante';
            }
            if(usuario['dataValues'].telefono === telefono){
                donanteEncontrado = true;
                dataObj.message = 'Este numero de telefono ya está registrado con un donante';
            }
        });

        // Si no se encuentra algun donante registrado
        if(!donanteEncontrado){
            // Asignandole un identificador al usuario
            if(donantes.length > 0){
                req.body.id = (donantes[donantes.length - 1]['dataValues'].id + 1);
            }else{
                req.body.id = 1;
            }

            // Colocando la hora de creacion y actualizacion
            req.body.createdAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            req.body.updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;

            
            // Peticion de guardado en la base de datos
            // await Usuario.create({
            //     id: req.body.id,
            //     usuario,
            //     cedula,
            //     password,
            //     rol,
            //     token,
            //     createdAt: req.body.updatedAt,
            //     updatedAt: req.body.updatedAt,
            //     correo,
            // });

            //await enviarCorreo({nombre:nombre, email: correo, token}, 'Creacion de Cuenta', 'Confirma tu Cuenta');

            // Creando mensaje que se retornará
            dataObj.message = 'Donante creado correctamente.';
        }else{
            dataObj.error = true;
        }

        // Retorno de los datos del usuario al frontend
        res.json(dataObj);
    } catch (error) {
        console.log(error.message);
        // Retorna un error en caso de que lo haya
        res.json({error:true, message: error.message});
    }
}



// Exportar Metodos
export{
    registrarDonante,
    obtenerDonantes,
    
}