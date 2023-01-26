// Importar el modelo
import Formulario from "../models/Formulario.js";
import Donante from "../models/Donante.js";

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

    try{
        let objInfo = {};


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

    console.log('registrarFormulario');

    try{
        let objInfo = {};


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