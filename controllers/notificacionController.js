// Importar archivos necesarios

// Modelos 
import Notificacion from "../models/Notificacion.js";

// ====== Metodos del CRUD ======
// ====== GET ======
// Obtener Notificaciones
const obtenerNotificaciones = async(req, res) =>{

    const {limite} = req.body;

    try {
        
        let notificaciones = await Notificacion.findAll({ limit: limite });

        res.json(notificaciones);
    } catch (error) {
        console.log('error al obtener las notificaciones');
        console.log(error.message);
    }
}

// ====== PUT ======
// Actualizar una notificacion y pasarlo de no leida a leida
const notificacionLeida = async(req,res)=>{

    const {id} = req.body;

    try {
        let objInfo = {}
        let notification = await Notificacion.findOne({ where: { id }});

        if(notification){
            await notification.update({leido: true});
            objInfo.message = "Notificación actualizado con éxito";
        }else{
            console.log('No se encontró la notificacion');
            objInfo.message = "Notificación actualizado con éxito";
            objInfo.error = true;
        }

        res.json(objInfo);
    } catch (error) {
        console.log('Hubo un error al actualizar la notificacion');
        console.log(error.message);
    }
}

export {
    obtenerNotificaciones,
    notificacionLeida
}