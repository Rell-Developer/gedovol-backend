import conectarDB from "../config/db.js";
import { DataTypes } from "sequelize";
import generarID from '../helpers/generarID.js';

// Declaracion del modelo
const Usuario = conectarDB.define('usuarios', {
    usuario: {
        type: DataTypes.STRING,
    },
    cedula:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.TEXT,
    },
    rol:{
        type: DataTypes.STRING,
    },
    token:{
        type: DataTypes.TEXT,
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
});

// Exportando el modelo
export default Usuario;