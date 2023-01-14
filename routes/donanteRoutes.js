// Exportar las librearias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    registrarDonante,
    obtenerDonantes,
    eliminarDonante,
    modificarDonante
} from '../controllers/donanteController.js';

// Middlewares
import checkAuth from "../middleware/outMiddleware.js";

// Inicio del enrutado
const router = express.Router();

// ======== GET ========
router.get('/obtener-donantes', obtenerDonantes);

// ======== DELETE ========
router.delete('/eliminar-donantes/:id', eliminarDonante);

// ======== POST ========
router.post('/registrar-donante', registrarDonante);

// ======== PUT ========
router.put('/modificar-donante/:id', modificarDonante);

// Exportar enrutador
export default router;