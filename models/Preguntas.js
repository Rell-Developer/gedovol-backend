import conectarDB from "../config/db.js";
import { DataTypes } from "sequelize";
import generarID from '../helpers/generarID.js';

const Preguntas = conectarDB.define('preguntas', {
    tipo_sangre:{
        type: DataTypes.STRING,
    },
    ultima_donacion:{
        type: DataTypes.DATE,
    },
    ultimo_tatuaje: {
        type: DataTypes.DATE,
    },
    enfermedad:{
        type: DataTypes.STRING,
    },
    estatus: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta1: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta2: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta3: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta4: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta5: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta6: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta7: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta8: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta9: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta10: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta11: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta12: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta13: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta14: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta15: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta16: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta17: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta18: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta19: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta20: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    pregunta21: {
        type: DataTypes.BOOLEAN,
        default: false,
    }
    
});

// Exportando el modelo
export default Preguntas;