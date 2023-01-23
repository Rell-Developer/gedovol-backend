// Importar las librerias y archivos necesarios
import express from "express";

// Funciones del controlador
import {
    obtenerFormularios,
    obtenerFormularioPorID,
    registrarFormulario,
    actualizarFormulario,
    eliminarFormulario
} from '../controllers/formularioController.js';

// INICIO DEL ENRUTADOR
const router = express.Router();

// ================================
// ========= METODOS HTTP =========
// ================================

// ========= AREA PRIVADA =========
// ==== GET ====
router.get('/obtener-formularios', obtenerFormularios);
router.get('/obtener-formulario/:id', obtenerFormularioPorID);

// ==== POST ====
router.post('/registrar-formulario', registrarFormulario);

// ==== PUT ====
router.put('/actualizar-formulario/:id', actualizarFormulario);

// ==== DELETE ====
router.delete('/eliminar-formulario/:id', eliminarFormulario);

// Exportar enrutador
export default router;