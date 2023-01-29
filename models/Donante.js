import conectarDB from "../config/db.js";
import { DataTypes } from "sequelize";
import generarID from '../helpers/generarID.js';

// Declaracion del modelo
const Donante = conectarDB.define('donantes', {
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    cedula:{
        type: DataTypes.STRING,
    },
    tipo_sangre:{
        type: DataTypes.STRING,
    },
    telefono_1:{
        type: DataTypes.STRING,
    },
    telefono_2:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    },
    direccion:{
        type: DataTypes.TEXT,
    },
    createdAt:{
        type: DataTypes.DATE,
        default: new Date().toLocaleString(),
    },
    updatedAt: {
        type: DataTypes.DATE,
        default: new Date().toLocaleString(),
    }
});


// Exportando el modelo
export default Donante;

