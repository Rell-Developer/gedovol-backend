// Importaciones
import conectarDB from "../config/db.js";
import { DataTypes } from "sequelize";

// Modelo del formulario
const Formulario = conectarDB.define('formularios', {
    ultima_donacion:{
        type: DataTypes.STRING,
    },
    ultimo_tatuaje: {
        type: DataTypes.STRING,
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
    },
    fechaDonacion: {
        type: DataTypes.DATE,
    },
    donante_id:{
        type: DataTypes.INTEGER,
    },
    createdAt:{
        type: DataTypes.DATE,
        default: new Date().toLocaleString(),
    },
    updatedAt:{
        type: DataTypes.DATE,
        default: new Date().toLocaleString(),
    }
});

// Exportar Formularios
export default Formulario;
