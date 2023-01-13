// Importar Archivos necesarios
// Librerias
import {Op} from 'sequelize';

// Modelos
import Usuario from '../models/Usuario.js';
import Notificacion from '../models/Notificacion.js';

// Helpers
import generarID from '../helpers/generarID.js';
import generarJWT from '../helpers/generarJWT.js';
import { hashearPassword, comprobarPassword } from '../helpers/hashearPasswords.js';
import enviarCorreo from '../helpers/enviarCorreo.js';
import recuperarCuenta from '../helpers/recuperarCuenta.js';

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

const buscarPerfil = async(req,res) =>{

    // Destructuring
    const {id} = req.params;

    try {
        
        // Objeto de informacion
        let objInfo = {}

        // Busqueda por identificador
        let resultado = await Usuario.findOne({ where: { id }});

        // verificando si rajo datos
        if(resultado){
            // creacion de las propiedades del objeto con la informacion del usuario
            objInfo.usuario = resultado['dataValues'].usuario;
            objInfo.cedula = resultado['dataValues'].cedula;
            objInfo.correo = resultado['dataValues'].correo;
            objInfo.rol = resultado['dataValues'].rol;
            objInfo.confirmado = resultado['dataValues'].confirmado;
        }else{
            // Creacion del error a retornar
            objInfo.error = true;
            objInfo.message = 'No se ha encontrado al usuario';
        }

        // Retorno del frontend
        res.json(objInfo);
    } catch (error) {
        console.log('hubo un error');
        console.log(error.message)
        res.json({error: true, message:error.message})
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

// Buscar por Token
const buscarToken = async(req,res) =>{
    
    // Destructuring
    const {token} = req.params;

    // Funcionalidad
    try {
        // Objeto de informacion
        let objInfo = {};

        // Buscar al usuario donde token sea igual al valor del parametro token
        let user = await Usuario.findOne({ where: { token } });
        console.log(user)

        // Verificando si existe
        user === null ? objInfo.error = true: objInfo.error = false;
        
        // Retornando al frontend
        res.json(objInfo);
    } catch (error) {
        console.log(error.message)
    }
}

// ====== POST ======
// Buscar entre los usuarios si existe | LOGIN
const unUsuario = async(req,res) => {

    // Destructuring
    const {usuario, password} = req.body;

    try {
        // Variables a Utilizar
        let usuarioDB;           //Para guardar los usuarios extraidos de la DB
        let userObj = {};       //Objeto que se retornará con los datos del usuario

        //Verificacion si es usuario administrador
        if(usuario === "admin@admin.com"){
            
            if(password === "4dm1n123456"){

                //Creación de los datos a retornar
                userObj.usuario = 'Administrador';
                userObj.rol = 'administrador';
                userObj.token = generarJWT(0);
                userObj.confirmado = true;
            }else{

                // Creacion del error
                userObj.error = true;
                userObj.message = 'Credenciales Incorrectas';
            }

            // Retornando el resultado al frontend
            return res.json(userObj);
        }else{

            //Busqueda en la base de datos de los usuarios
            usuarioDB = await Usuario.findAll({ where: {usuario}});

            //Si hay usuarios registrados
            if(usuarioDB.length > 0){

                //Recorrido por el array 
                usuarioDB.forEach( async(usuarioData) => {

                    console.log(usuarioData['dataValues']);

                    // Comprobando contraseña
                    let comprobacion = await comprobarPassword(password, usuarioData['dataValues'].password);

                    // Verificacion si la contraseña coincide
                    if(comprobacion){
                        //Creación de los datos a retornar
                        userObj.id = usuarioData['dataValues'].id;
                        userObj.usuario = usuarioData['dataValues'].usuario;
                        userObj.rol = usuarioData['dataValues'].rol;
                        userObj.confirmado = usuarioData['dataValues'].confirmado;
                        userObj.token = generarJWT(0);

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
    let {usuario, password, cedula, rol, correo, usuario_id} = req.body;

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

            console.log(req.body.updatedAt)
            
            // Peticion de guardado en la base de datos
            await Usuario.create({
                id: req.body.id,
                usuario,
                cedula,
                password,
                rol,
                token: to,
                correo,
            });

            await enviarCorreo({nombre:usuario, email: correo, token:to}, 'Creacion de Cuenta', 'Confirma tu Cuenta');

            // Creando mensaje que se retornará
            dataObj.message = 'Usuario creado correctamente.';

            await crearNotificacion(
                {usuario, cedula, rol}, 
                false, 
                'creacion-usuario', 
                usuario_id, 
                req.body.createdAt
            );
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

// Envio del email por el usuario para recuperar la contraseña
const olvidePassword = async(req, res) =>{

    // Destructuring de lo enviado por el usuario
    const {email} = req.body;

    try {
    
        // Busqueda del usuario por el correo
        const user = await Usuario.findOne({where: {correo: email}});
        let objInfo = {};

        // Si no se ha encontrado usuario con ese correo
        if(user == null){

            objInfo.message = 'No se ha encontrado ningun usuario con este correo electronico';
            objInfo.error=  true;
        }else{
            
            
            let token = await generarJWT(user['dataValues'].cedula)
            let to = '';
            token.split('.').forEach( dato => to += dato );
            
            let datos = {
                nombre: user['dataValues'].usuario,
                email,
                token: to
            }

            let actualizarToken = await user.update({token:to});
            console.log(actualizarToken);

            await recuperarCuenta(datos, 'Recuperar Cuenta', 'Recupera tu cuenta y no pierdas tus avances');
            
            objInfo.message = 'Hemos enviado un mensaje a su correo electronico, por favor, reviselo.';
        }

        // Retorno al frontend
        res.json(objInfo);

    } catch (error) {
        console.log(error.message);
    }

}

// Creacion de la notificacion
const crearNotificacion = async(usuario_asociado, leido, tipo_id, usuario_id, fecha) => {

    try {
        // Variables y objetos
        let notificacion = {};
        
        console.log(tipo_id)

        usuario_id === undefined ? usuario_id = 0 : null;
        
        // Buscando al usuario responsable
        let usuario_responsable = await Usuario.findOne({ where: { id: usuario_id }});

        /*
            Los Tipos de mensajes son los siguientes
            1: creacion-usuario
            2: confirmacion-usuario
            3: eliminacion-usuario
            4: recuperacion-usuario
            5: creacion-donante
            6: eliminacion-donante
        */

        // Estableciendo id segun el tipo de notificacion
        if(tipo_id === 'creacion-usuario'){
            notificacion.tipo_id = 1;
                
            // Si lo encuentra
            if(usuario_responsable){
                notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha creado un nuevo usuario, ${usuario_asociado.usuario} (V-${usuario_asociado.cedula}), con rol como ${usuario_asociado.rol}.`
            }
        }else if(tipo_id === 'confirmacion-usuario'){
            notificacion.tipo_id = 2;

            // Si lo encuentra
            if(usuario_responsable){
                notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha confirmado su cuenta con rol ${usuario_responsable['dataValues'].rol}.`
            }
        }else if(tipo_id === 'eliminacion-usuario'){
            notificacion.tipo_id = 3

            notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha eliminado a un usuario: ${usuario_asociado.usuario} (V-${usuario_asociado.cedula}), con rol como ${usuario_asociado.rol}.`
        }else if(tipo_id === 'recuperacion-usuario'){
            notificacion.tipo_id = 4

            notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha restablecido su contraseña mediante la recuperacion de su usuario.`;
        }else if(tipo_id === 'creacion-donante'){
            notificacion.tipo_id = 5
    
            notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha registrado a un nuevo donante, ${usuario_asociado.usuario} (V-${usuario_asociado.cedula}), tipo de sangre: ${usuario_asociado.tipo_sangre}.`
        }else if(tipo_id === 'eliminacion-donante'){
            notificacion.tipo_id = 6
    
            notificacion.descripcion = `${usuario_responsable['dataValues'].usuario} (V-${usuario_responsable['dataValues'].cedula}) ha eliminado a un donante: ${usuario_asociado.usuario} (V-${usuario_asociado.cedula}), tipo de sangre: ${usuario_asociado.tipo_sangre}.`
        }


        // Estableciendo la fecha
        if(fecha != null){
            notificacion.fecha = fecha;
            notificacion.createdAt = fecha;
            notificacion.updatedAt = fecha;
        }else{
            notificacion.fecha = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            notificacion.createdAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            notificacion.updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
        }
        
        notificacion.leido = leido;

        // Estableciendo el identificador del usuario responsable
        notificacion.usuario_id = usuario_id;

        console.log(notificacion);

        // Guardado de la notificacion
        await Notificacion.create(notificacion);
        console.log('Notificacion guardada exitosamente')

    } catch (error) {
        console.log('Hubo un error al crear la notificacion');
        console.log(error.message)
    }
}

// ====== PUT ======
const resetearPassword = async(req, res) =>{

    // Destructuring
    let {password, token, accion} = req.body;

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
            await usuario.update({password, token: null, confirmado: true});

            // Mensaje de Proceso Realizado con éxito
            objInfo.message = 'Contraseña Actualizada Correctamente';
            console.log('Contraseña actualizada correctamente');

            // Creacion de la notificacion de cuenta confirmada
            crearNotificacion(null, false, accion, usuario['dataValues'].id, null);
        }

        // Retornando al frontend
        res.json(objInfo);
    } catch (error) {
        console.log(error.message)
        res.json({message: error.message, error:true});
    }
}

// Funcion para que los administradores puedan editar los datos de los usuarios
const actualizarUsuario = async(req, res) => {

    // Destructuring
    const {usuario, cedula, correo, clave, rol, id} = req.body;
    console.log('Actualizando los datos del usuario')
    console.log(req.body);

    try {
        
        // Variables
        let objInfo = {};
        let usuarioEncontrado = false;

        // Peticion a la base de datos para si la cedula ya está registrada
        let usuarios = await Usuario.findAll();
        let usuarioActualizar = await Usuario.findOne({ where: { id } });

        // Busca si la cedula ya está registrada con otro usuario
        usuarios.forEach( usuario => {

            if(usuarioActualizar['dataValues'].cedula !== cedula){
                if(usuario['dataValues'].cedula === cedula){
                    usuarioEncontrado = true;
                    objInfo.message = 'Esta cédula ya está registrada con un usuario';
                    objInfo.error = true;
                }
            }

            if(usuarioActualizar['dataValues'].correo !== correo){
                if(usuario['dataValues'].correo === correo){
                    usuarioEncontrado = true;
                    objInfo.message = 'Este correo electronico ya está registrado con un usuario';
                    objInfo.error = true;
                }
            }
        });

        console.log('Evaluar')

        if(!usuarioEncontrado){
            console.log('No se encontro usuario asi que a actualizar')

            // Configurando la fecha de actualizacion
            let updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            console.log('Fecha de actualizacion')
            console.log(updatedAt)

            // Actualizacion de los datos del usuario
            await usuarioActualizar.update({ usuario, correo, cedula, rol, updatedAt });

            // Creacion del mensaje de exito
            objInfo.message = 'Datos Actualizados correctamente';
            console.log('Datos actualizados correctamente')
        }

        // Retornando el valor a frontend
        res.json(objInfo);
    } catch (error) {
        console.log(error.message);
        res.json({error: true, message: error.message});
    }
}

const cambiarPassword = async(req, res) =>{

    // Destructuring
    let {password, nuevoPassword, id} = req.body;

    try {

        let objInfo = {};

        // Query
        let usuario = await Usuario.findOne({ where: { id }});

        // Si no encuentra el usuario
        if(!usuario){
            objInfo.message = 'No se ha encontrado el usuario';
            objInfo.error = true;
        }else{

            let comprobar = await comprobarPassword(password, usuario['dataValues'].password);

            if(comprobar){

                // Configurando la fecha de actualizacion
                let updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
                console.log('Fecha de actualizacion')
                console.log(updatedAt)

                // Hasheando la contraseña
                let passwordHash = await hashearPassword(nuevoPassword, undefined);

                console.log('Contraseña Hasheada');
                console.log(nuevoPassword);
                console.log(passwordHash)
    
                // Actualizando la contraseña
                // await usuario.update({passwordHash, updatedAt});
    
                // Mensaje de Proceso Realizado con éxito
                objInfo.message = 'Contraseña Actualizada Correctamente';
                console.log('Contraseña actualizada correctamente');
            }else{
                objInfo.error = true;
                objInfo.message = 'La contraseña Actual es incorrecta';
            }
        }

        // Retornando al frontend
        res.json(objInfo);
    } catch (error) {
        console.log(error.message)
        res.json({message: error.message, error:true});
    }
}

// ====== DELETE ====== 
const borrarUsuario = async(req,res) =>{

    // Destructuring
    let {cedula, identificador_responsable} = req.body;
    // let {id} = req.body;

    console.log(req.body)

    console.log(cedula);
    console.log(identificador_responsable);

    try {
        // Variables y Promesas
        let objInfo= {};                                                   // Objeto para la informacion a retornar
        let usuario_asociado = await Usuario.findOne({ where:{ cedula }}); // Buscar al usuario para enviarlo a la notificacion
        let resultado = await Usuario.destroy({ where:{ cedula } });       // query de eliminacion por la cedula

        // Si el query fue hecho exitosamente
        if(resultado == 1){
            objInfo.message = "Usuario borrado exitosamente";           // Se crea el mensaje a retornar

            crearNotificacion({ 
                usuario: usuario_asociado['dataValues'].usuario , 
                cedula: usuario_asociado['dataValues'].cedula ,
                rol: usuario_asociado['dataValues'].rol
            }, 
            false, 
            'eliminacion-usuario', 
            identificador_responsable, 
            null);
        }else{
            objInfo.error = true;                                       // Se crea el error
            objInfo.message = "Hubo un error al eliminar al usuario";   // Se crea el mensaje de error
        }

        // Se retorna al frontend
        res.json(objInfo);
    } catch (error) {
        // Se muestra el error y se retorna al frontend
        console.log(error.message);
        res.json({msg: error.message, error:true});
    }
}


// Exportar Metodos
export{
    unUsuario,
    registrarUsuario,
    obtenerUsuarios,
    cambiarPassword,
    confirmarCuenta,
    actualizarUsuario,
    borrarUsuario,
    buscarPerfil,
    resetearPassword,
    olvidePassword,
    buscarToken
}