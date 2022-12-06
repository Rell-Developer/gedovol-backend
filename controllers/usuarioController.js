// Importar Archivos necesarios
import Usuario from '../models/Usuario.js';
import generarID from '../helpers/generarID.js';

// ====== Metodos del CRUD ======
// ====== GET ======
const obtenerUsuarios = async(req,res) =>{

    try {
        
        let usuarios = await Usuario.findAll();
        let datos = []
        usuarios.forEach(usuario=> datos.push(usuario['dataValues']));

        console.log(datos);
        res.json(datos);
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message});
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
            userObj.token = generarID();
        }else{

            //Busqueda en la base de datos de los usuarios
            usuarios = await Usuario.findAll();

            // console.log('espacios en el array')
            // console.log(usuarios.length);
            //Si hay usuarios registrados
            if(usuarios.length > 0){
                //Recorrido por el array
                usuarios.forEach( usuarioData => {
                    
                    // Validacion si el usuario es correcto
                    if(usuarioData['dataValues'].usuario === usuario){

                        // Verificacion si la contraseña coincide
                        if(usuarioData['dataValues'].password === password){
                            //Creación de los datos a retornar
                            userObj.id = usuarioData['dataValues'].id;
                            userObj.usuario = usuarioData['dataValues'].usuario;
                            userObj.rol = usuarioData['dataValues'].rol;
                            userObj.token = generarID();
                        }
                        else{
                            // Creacion del error
                            userObj.error = true;
                            userObj.message = 'Credenciales Incorrectas';
                        }
                    }
                });
            }else{
                // Creacion del error
                userObj.error = true;
                userObj.message = 'Usuario no registrado, solicite su usuario al administrador.';
            }
        }

        // Retorno del objeto
        res.json(userObj);
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message});
    }
}

// Registrar a un Usuario
const registrarUsuario = async(req, res) => {

    console.log('registrando usuario');
    // Destructuring
    const {usuario, password, cedula, rol} = req.body;
    console.log(req.body);

    try {
        
        // Variables
        let dataObj = {};
        let usuarioEncontrado = false;

        // Peticion a la base de datos para si la cedula ya está registrada
        let usuarios = await Usuario.findAll();

        usuarios.forEach( usuario => {

            // console.log(usuario['data'])
            if(usuario['dataValues'].cedula === cedula){
                usuarioEncontrado = true;
            }
        });

        console.log('a verificar');
        console.log(usuarioEncontrado)

        if(!usuarioEncontrado){
            if(usuarios.length > 0){
                req.body.id = (usuarios[usuarios.length - 1]['dataValues'].id + 1);
            }else{
                req.body.id = 1;
            }

            req.body.createdAt = new Date().toLocaleDateString();
            req.body.updatedAt = new Date().toLocaleDateString();
            
            console.log('Guardando Usuario: ');
            console.log(req.body);
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


            dataObj.message = 'Usuario creado correctamente.';
        }else{
            dataObj.error = true;
            dataObj.message = 'Esta cédula ya está registrada con un usuario';
        }

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