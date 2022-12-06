// Importar Archivos necesarios
// Modelos
import Usuario from '../models/Usuario.js';

// Helpers
import generarID from '../helpers/generarID.js';
import generarJWT from '../helpers/generarJWT.js';
import { hashearPassword, comprobarPassword } from '../helpers/hashearPasswords.js';

// ====== Metodos del CRUD ======
// ====== GET ======
const obtenerUsuarios = async(req,res) =>{

    try {
        
        // Busqueda de todos los usuarios
        let usuarios = await Usuario.findAll();

        // Array con todos los datos de los usuarios
        let datos = [];

        // Recorrido para llenar el array de los datos de los clientes
        usuarios.forEach(usuario=> datos.push(usuario['dataValues']));

        // Retorno al frontend de los datos de los usuarios
        res.json(datos);
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message, error:true});
    }
}

// ====== POST ======

// Buscar entre los usuarios si existe | LOGIN
const unUsuario = async(req,res) => {

    // Destructuring
    const {usuario, password} = req.body;

    try {
        // Variables a Utilizar
        let usuarios;           //Para guardar los usuarios extraidos de la DB
        let userObj = {};       //Objeto que se retornará con los datos del usuario

        //Verificacion si es usuario administrador
        if(usuario === "admin@admin.com" && password === "4dm1n123456"){
            
            //Creación de los datos a retornar
            userObj.usuario = 'Administrador';
            userObj.rol = 'administrador';
            userObj.token = generarJWT(0);
        }else{

            //Busqueda en la base de datos de los usuarios
            usuarios = await Usuario.findAll();

            //Si hay usuarios registrados
            if(usuarios.length > 0){

                //Recorrido por el array
                usuarios.forEach( async(usuarioData) => {

                    // Validacion si el usuario es correcto
                    if(usuarioData['dataValues'].usuario === usuario){

                        // Comprobando contraseña
                        let comprobacion = await comprobarPassword(password, usuarioData['dataValues'].password);

                        // Verificacion si la contraseña coincide
                        if(comprobacion){
                            //Creación de los datos a retornar
                            userObj.id = usuarioData['dataValues'].id;
                            userObj.usuario = usuarioData['dataValues'].usuario;
                            userObj.rol = usuarioData['dataValues'].rol;
                            userObj.token = generarJWT(usuarioData['dataValues'].cedula);

                            // Retornando el resultado al frontend
                            return res.json(userObj);
                        }
                        else{
                            // Creacion del error
                            userObj.error = true;
                            userObj.message = 'Credenciales Incorrectas';

                            // Retornando el resultado al frontend
                            return res.json(userObj);
                        }
                    }
                });
            }else{
                // Creacion del error
                userObj.error = true;
                userObj.message = 'Usuario no registrado, solicite su usuario al administrador.';

                // Retornando el resultado al frontend
                return res.json(userObj);
            }
        }
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message});
    }
}

// Registrar a un Usuario
const registrarUsuario = async(req, res) => {

    // Destructuring
    let {usuario, password, cedula, rol} = req.body;

    try {
        
        // Variables
        let dataObj = {};
        let usuarioEncontrado = false;

        // Peticion a la base de datos para si la cedula ya está registrada
        let usuarios = await Usuario.findAll();

        // Busca si la cedula ya está registrada con otro usuario
        usuarios.forEach( usuario => {
            if(usuario['dataValues'].cedula === cedula){
                usuarioEncontrado = true;
            }
        });

        // Si no se encuentra algun usuario registrado
        if(!usuarioEncontrado){
            // Asignandole un identificador al usuario
            if(usuarios.length > 0){
                req.body.id = (usuarios[usuarios.length - 1]['dataValues'].id + 1);
            }else{
                req.body.id = 1;
            }

            // Colocando la hora de creacion y actualizacion
            req.body.createdAt = new Date().toLocaleDateString();
            req.body.updatedAt = new Date().toLocaleDateString();

            // Hasheando la contraseña del usuario
            password = await hashearPassword(password, undefined);
            
            // Peticion de guardado en la base de datos
            await Usuario.create({
                id: req.body.id,
                usuario,
                cedula,
                password,
                rol,
                createdAt: req.body.updatedAt,
                updatedAt: req.body.updatedAt
            });

            // Creando mensaje que se retornará
            dataObj.message = 'Usuario creado correctamente.';
        }else{
            dataObj.error = true;
            dataObj.message = 'Esta cédula ya está registrada con un usuario';
        }

        // Retorno de los datos del usuario al frontend
        res.json(dataObj);
    } catch (error) {
        // Retorna un error en caso de que lo haya
        res.json({error:true, message: error.message});
    }
}

// Exportar Metodos
export{
    unUsuario,
    registrarUsuario,
    obtenerUsuarios
}