import conectarDB from "../config/db.js";
import { DataTypes } from "sequelize";
// import generarID from '../helpers/generators/generarID.js';

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
    telefono:{
        type: DataTypes.STRING,
    },
    correo:{
        type: DataTypes.STRING,
    },
    direccion:{
        type: DataTypes.TEXT,
    }
});

// Exportando el modelo
export default Donante;