// Exportar las librerias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    obtenerNotificaciones,
    notificacionLeida
} from '../controllers/notificacionController.js';

// Inicio del enrutado
const router = express.Router();

// ============ Area Privada ============
// ======== GET ========
router.get('/obtener-notificaciones', obtenerNotificaciones); // Para obtener notificaciones


// ======== PUT ========
router.put('/notificacion-leida', notificacionLeida); // Para marcar una notificacion como leida


// Exportar enrutador
export default router;