// Importar Archivos necesarios
// Modelos
import Usuario from '../models/Usuario.js';

// Helpers
import generarID from '../helpers/generarID.js';
import generarJWT from '../helpers/generarJWT.js';
import { hashearPassword, comprobarPassword } from '../helpers/hashearPasswords.js';
import enviarCorreo from '../helpers/enviarCorreo.js';

// ====== Metodos del CRUD ======
// ====== GET ======
// Obtener Usuarios
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

// Confirmar Cuenta
const confirmarCuenta = async(req,res)=>{

    console.log('confirmarCuenta');
    
    const {token} = req.params;
    // console.log(token);
    
    try {
        
        let objInfo = {}

        let usuario = await Usuario.findOne({
            where:{
                token
            }
        });

        if(usuario){
            objInfo.token = usuario.token;
            objInfo.confirmado = usuario.confirmado;
            
        }else{
            objInfo.message = 'Token no Existente o Inválido';
            objInfo.error= true;
        }

        console.log('resultado de la busqueda')
        console.log(usuario);

        res.json(objInfo);
    } catch (error) {
        res.json({message: error.message, error:true});
    }
}

// ====== POST ======

// Buscar entre los usuarios si existe | LOGIN
const unUsuario = async(req,res) => {

    // Destructuring
    const {usuario, password} = req.body;
    console.log(usuario);
    console.log(password);

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
            userObj.confirmado = true;

            // Retornando el resultado al frontend
            return res.json(userObj);
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
                            userObj.confirmado = usuarioData['dataValues'].confirmado;

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
    } catch (e) {
        console.log(e.message)
        // retornando el mensaje de error
        res.json({msg: e.message, error: true});
    }
}

// Registrar a un Usuario
const registrarUsuario = async(req, res) => {

    // Destructuring
    let {usuario, password, cedula, rol, correo} = req.body;

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
                dataObj.message = 'Esta cédula ya está registrada con un usuario';
            }

            if(usuario['dataValues'].correo === correo){
                usuarioEncontrado = true;
                dataObj.message = 'Este correo electronico ya está registrado con un usuario';
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
            req.body.createdAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            req.body.updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;

            // Hasheando la contraseña del usuario
            password = await hashearPassword(password, undefined);

            // let identificador=generarID();
            // console.log('ID GENERADO')
            // console.log(identificador);

            // Se genera el token 
            let token = await generarJWT(cedula);

            console.log('TOOKEEN')
            console.log(token.split('.'))

            let to = '';

            token.split('.').forEach( dato => {
                to += dato;
            })

            console.log('Token sin puntos')
            console.log(to);
            
            // Peticion de guardado en la base de datos
            await Usuario.create({
                id: req.body.id,
                usuario,
                cedula,
                password,
                rol,
                token: to,
                createdAt: req.body.updatedAt,
                updatedAt: req.body.updatedAt,
                correo,
            });

            await enviarCorreo({nombre:usuario, email: correo, token:to}, 'Creacion de Cuenta', 'Confirma tu Cuenta');

            // Creando mensaje que se retornará
            dataObj.message = 'Usuario creado correctamente.';
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

// ====== PUT ======
const cambiarPassword = async(req, res) =>{

    // Destructuring
    let {password, token} = req.body;

    try {

        let objInfo = {};

        // Query
        let usuario = await Usuario.findOne({ where: { token }});

        // Si no encuentra el usuario
        if(!usuario){
            objInfo.message = 'No se ha encontrado el usuario';
            objInfo.error = true;
        }else{

            // Hasheando la contraseña
            password = await hashearPassword(password, undefined);

            // Actualizando la contraseña
            await usuario.update({password, token: '', confirmado: true});

            // Mensaje de Proceso Realizado con éxito
            objInfo.message = 'Contraseña Actualizada Correctamente';
            console.log('Contraseña actualizada correctamente')
        }

        // Retornando al frontend
        res.json(objInfo);
    } catch (error) {
        console.log(error.message)
        res.json({message: error.message, error:true});
    }
}

// Exportar Metodos
export{
    unUsuario,
    registrarUsuario,
    obtenerUsuarios,
    cambiarPassword,
    confirmarCuenta
}