// Importaciones
// Configuracion db
import conectarDB from '../config/db.js';

// Librerias
import { DataTypes } from 'sequelize';

// Declaracion del modelo
const Notificacion = conectarDB.define('notificaciones',{
    descripcion:{
        type: DataTypes.STRING,
    },
    leido:{
        type: DataTypes.BOOLEAN,
        default: false,
    },
    tipo_id: {
        type: DataTypes.INTEGER,
    },
    usuario_id:{
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
        default: new Date().toLocaleString()
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
});

// Exportando el modelo
export default Notificacion;