// Importar Archivos necesarios
// Modelos
import Donante from '../models/Donante.js';

// Helpers
import generarID from '../helpers/generarID.js';
//import enviarCorreo from '../helpers/enviarCorreo.js';

// ====== Metodos del CRUD ======
//consultar donantes
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

// ====== GET ======
//Eliminar un donante
const eliminarDonante = async(req, res) => {
    // Destructuring
    const {id} = req.params;
    
    try{

        //Query
        Donante.destroy({ where: { id }});
    
    res.json({msg: "eliminado"});
    }catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message, error:true});
    }
    

}

// ====== POST ======


// Registrar a un Donante
const registrarDonante = async(req, res) => {

    // Destructuring
    let {nombre,
         apellido, 
         cedula,
         telefono,
         sexo,
         correo,
         direccion,
         tipo_sangre,
         ultima_donacion,
         ultimo_tatuaje,
        enfermedad,
        estatus,
        pregunta1,
        pregunta2,
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        pregunta7,
        pregunta8,
        pregunta9,
        pregunta10,
        pregunta11,
        pregunta12,
        pregunta13,
        pregunta14,
        pregunta15,
        pregunta16,
        pregunta17,
        pregunta18,
        pregunta19,
        pregunta20,
        pregunta21,
        } = req.body;

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

            if(donante['dataValues'].correo === correo){
                donanteEncontrado = true;
                dataObj.message = 'Este correo electronico ya está registrado con un donante';
            }
            if(donante['dataValues'].telefono === telefono){
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

// modificar datos de donante
// ====== PUT ======
const modificarDonante = async(req, res) =>{

    // Destructuring
    const {nombre,
           apellido, 
           cedula,
           telefono,
           sexo,
           correo,
           direccion,
           tipo_sangre,
           ultima_donacion,
           ultimo_tatuaje,
           enfermedad,
           estatus,
           pregunta1,
           pregunta2,
           pregunta3,
           pregunta4,
           pregunta5,
           pregunta6,
           pregunta7,
           pregunta8,
           pregunta9,
           pregunta10,
           pregunta11,
           pregunta12,
           pregunta13,
           pregunta14,
           pregunta15,
           pregunta16,
           pregunta17,
           pregunta18,
           pregunta19,
           pregunta20,
           pregunta21
       } = req.body;

    try {

        let objInfo = {};

        // Query
        const donante = await Donante.findOne({ where: { cedula }});

        // Si no encuentra el donante
        if(!donante){
            objInfo.message = 'No se ha encontrado el donante';
            objInfo.error = true;
        }else{

            // Actualizando la contraseña
            await donante.update({nombre,
                                  apellido, 
                                  cedula,
                                  telefono,
                                  sexo,
                                  correo,
                                  direccion,
                                  tipo_sangre,
                                  ultima_donacion,
                                  ultimo_tatuaje,
                                  enfermedad,
                                  estatus,
                                  pregunta1,
                                  pregunta2,
                                  pregunta3,
                                  pregunta4,
                                  pregunta5,
                                  pregunta6,
                                  pregunta7,
                                  pregunta8,
                                  pregunta9,
                                  pregunta10,
                                  pregunta11,
                                  pregunta12,
                                  pregunta13,
                                  pregunta14,
                                  pregunta15,
                                  pregunta16,
                                  pregunta17,
                                  pregunta18,
                                  pregunta19,
                                  pregunta20,
                                  pregunta21});

            // Mensaje de Proceso Realizado con éxito
            objInfo.message = 'Se han actualizado los datos correctamente';
            console.log('datos actualizados correctamente')
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
    registrarDonante,
    eliminarDonante,
    obtenerDonantes,
    modificarDonante
    
}