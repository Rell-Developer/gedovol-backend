// Importar el modelo
import Formulario from "../models/Formulario.js";
import Donante from "../models/Donante.js";
import enviarCorreo from "../helpers/enviarCorreo.js";

// Funciones CRUD
// ========= GET ==========
// Obtener todos los formularios
const obtenerFormularios = async(req,res) =>{
    try{
        // Busqueda de todos los formularios
        let formularios = await Formulario.findAll({});

        console.log('=======obteniendo todos los formularios=======')

        // Retorno de los formularios
        res.json(formularios);
    }catch(error){
        // Mensaje de error por consola del servidor
        console.log('Hubo un error en la operacion');
        console.log(error.message);
    }
}

// Obtener un formulario por su identificación
const obtenerFormularioPorID = async(req,res) =>{

    console.log('obtener formulario por ID');
    const { id } = req.params;
    console.log(id);

    try{
        let objInfo = {};

        let Busqueda = await Formulario.findOne({ where: { id }});

        if(Busqueda){
            console.log('se consiguio el formulario')
            console.log(Busqueda['dataValues']);
            objInfo = Busqueda['dataValues'];
        }else{
            objInfo.error = true;
            objInfo.message = 'No se encontró un formulario asociado a ese identificador';
        }

        res.json(objInfo);
    }catch(error){
        console.log('Hubo un error en la operacion');
        console.log(error.message);
    }
}

// ========= POST ==========
// Registrar un formulario
const registrarFormulario = async(req,res) =>{

    console.log('registrarFormulario');
    console.log(req.body);

    try{
        let objInfo = {};
        let objDatos = {};
        let i = 1;

        objInfo = Object.values(req.body);
        objInfo.forEach((element, index)=>{
            if(index > 4){
                objDatos[`pregunta${i}`] = element;
                i += 1;
            }
        });

        objDatos.ultima_donacion = req.body.fechaDonadoUltimamente;
        objDatos.ultimo_tatuaje = req.body.fechaTatuadoUltimamente;
        objDatos.enfermedad = req.body.enfermedadVenerea;
        objDatos.estatus = req.body.estatus;
        objDatos.donante_id = parseInt(req.body.donante);
        objDatos.fechaDonacion = req.body.fechaDonacion;

        console.log(objDatos);
        console.log('guardando datos');
        let guardado = await Formulario.create(objDatos);

        console.log(guardado);
        if(guardado){
            objInfo = {message: 'El formulario ha sido guardado exitosamente'};
            await enviarCorreo({email:'roquel@gmail.com', nombre: 'Roque Emilio Lopez Loreto'}, 'Formulario Registrado', 'Su formulario ha sido guardado correctamente');
        }else{
            objInfo = {message: "Hubo un error al guardar el formulario",error:true};
        }


        console.log(objInfo.length);

        res.json(objInfo);
    }catch(error){
        // Mensaje de error por consola
        console.log('Hubo un error en la operacion');
        console.log(error.message);
    }
}

// ========= PUT ==========
// Actualizar un formulario
const actualizarFormulario = async(req,res) =>{

    const {donante_id} = req.body;
    console.log('actualizando formulario');
    console.log(req.body);

    try{

        let busqueda = await Formulario.findOne({where: {donante_id}});
        let objInfo = {};
        console.log('Este es el resultado de la busqueda')
        console.log(busqueda)

        if(busqueda){

            let objDatos = {};
            let i = 1;
    
            objInfo = Object.values(req.body);
            objInfo.forEach((element, index)=>{
                if(index > 4){
                    objDatos[`pregunta${i}`] = element;
                    i += 1;
                }
            });
    
            objDatos.ultima_donacion = req.body.fechaDonadoUltimamente;
            objDatos.ultimo_tatuaje = req.body.fechaTatuadoUltimamente;
            objDatos.enfermedad = req.body.enfermedadVenerea;
            objDatos.estatus = req.body.estatus;
            objDatos.donante_id = parseInt(req.body.donante_id);
            objDatos.fechaDonacion = req.body.fechaDonacion;
    
            console.log(objDatos);
            console.log('guardando datos');

            // Actualizacion de los datos del formulario
            let actualizacion = await busqueda.update(objDatos);

            console.log(actualizacion)

            if(actualizacion){
                objInfo= {message:"Formulario actualizado correctamente"};
            }else{
                objInfo= {message:"Hubo un error al actualizar el formulario", error:true};
            }

        }else{
            objInfo.message = "No se ha encontrado este formulario en la base de datos";
            objInfo.error = true;
        }

        res.json(objInfo);
    }catch(error){
        console.log('Hubo un error en la operacion');
        console.log(error.message);
    }
}
// ========= DELETE ==========
// Eliminar un formulario
const eliminarFormulario = async(req,res) =>{

    console.log('eliminar formularioo');
    // Obteniendo los parametros del endpoint
    const {id} = req.params;

    try{
        // Objeto a Retornar al frontend
        let objInfo = {};

        // Query
        let resultado = await Formulario.destroy({ where:{ id }})

        // Si el eliminado es exitoso
        if(resultado){
            // Se crea un mensaje para notificar la accion
            objInfo.message = 'Formulario eliminado exitosamente';
        }else{
            // Si no, se crea un mensaje de error
            objInfo.message = 'Hubo un problema al eliminar el formulario';
            objInfo.error = true;
        }

        // El retorno del objeto con la informacion
        res.json(objInfo);
    }catch(error){
        console.log('Hubo un error en la operacion');
        console.log(error.message);
    }
}

// Exportar las funciones
export{
    obtenerFormularios,
    obtenerFormularioPorID,
    registrarFormulario,
    actualizarFormulario,
    eliminarFormulario
}