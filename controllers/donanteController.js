// Importar Archivos necesarios
// Modelos
import Donante from '../models/Donante.js';
import Preguntas from '../models/Preguntas.js';

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
        let preguntas = await Preguntas.findAll();

        // Array con todos los datos de los donantes
        let datos_donantes = [];
        let pregunta_donantes = [];

        // Recorrido para llenar el array de los datos de los clientes
        donantes.forEach(donante=> datos_donantes.push(donante['dataValues']));
        preguntas.forEach(preguntas=> pregunta_donantes.push(preguntas['dataValues']));

        // Retorno al frontend de los datos de los donantes
        res.json({datos_donantes, pregunta_donantes, msg: "busqueda completada"});
        
    } catch (error) {
        // retornando el mensaje de error
        res.json({msg: error.message, error:true});
    }
    
}

// ====== DELETE ======
//Eliminar un donante
const eliminarDonante = async(req, res) => {
    // Destructuring
    const {id} = req.params;
    let donante_id = id;
    
    try{

        const donante = await Donante.findOne({ where: { id }});

        if(!donante){

            res.json({msg: 'No se ha encontrado el donante', error:true});

        }else{

            //Query
            Donante.destroy({ where: { id }});
            Preguntas.destroy({ where: {donante_id}});
            
            // Retorno al frontend de los datos de los donantes
            res.json({msg: "eliminado"});
        }

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
         telefono_1,
         telefono_2,
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
        
        // Variables
        let dataObj = {};
        let donanteEncontrado = false;

        // Peticion a la base de datos para si la cedula ya está registrada
        let donantes = await Donante.findAll();
        let preguntas = await Preguntas.findAll();

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
            if(donante['dataValues'].telefono_1 === telefono_1){
                donanteEncontrado = true;
                dataObj.message = 'Este numero de telefono ya está registrado con un donante';
            }
            if(donante['dataValues'].telefono_2 === telefono_2){
                donanteEncontrado = true;
                dataObj.message = 'Este numero de telefono ya está registrado con un donante';
            }
        });

        // Si no se encuentra algun donante registrado
        if(!donanteEncontrado){
            // Asignandole un identificador al usuario
            if(donantes.length > 0){
                req.body.id = (donantes[donantes.length - 1]['dataValues'].id + 1);
                req.body.id = (preguntas[preguntas.length - 1]['dataValues'].id + 1);
            }else{
                req.body.id = 1;
            }
            
            // Colocando la hora de creacion y actualizacion
            req.body.createdAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            
            donantes = await Donante.create({
                id: req.body.id,
                nombre,
                apellido, 
                cedula,
                telefono_1,
                telefono_2,
                sexo,
                correo,
                direccion
            })

            preguntas = await Preguntas.create({
                id: req.body.id,
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
                donante_id: req.body.id
            });

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
    let {  nombre,
           apellido, 
           cedula,
           telefono_1,
           telefono_2,
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

       const {id} = req.params;
       
       let donante_id = id;

    try {

        let objInfo = {};

        // Query
        const donante = await Donante.findOne({ where: { id }});

        const preguntas =  await Preguntas.findOne({ where: { donante_id }});

        // Si no encuentra el donante
        if(!donante){
            objInfo.message = 'No se ha encontrado el donante';
            objInfo.error = true;
        }else{

            // Configurando la fecha de actualizacion
            let updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
            console.log('Fecha de actualizacion')
            console.log(updatedAt)
            
            // Actualizando los datos
            await donante.update({nombre,
                                  apellido, 
                                  cedula,
                                  telefono_1,
                                  telefono_2,
                                  sexo,
                                  correo,
                                  direccion, 
                                  updatedAt});
                            
            await preguntas.update({tipo_sangre,
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
                                  updatedAt});


            

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