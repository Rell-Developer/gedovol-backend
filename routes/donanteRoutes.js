// Exportar las librearias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    registrarDonante,
    obtenerDonantes,
} from '../controllers/donanteController.js';

// Middlewares
import checkAuth from "../middleware/outMiddleware.js";

// Inicio del enrutado
const router = express.Router();

// ======== GET ========
router.get('/obtener-donantes', obtenerDonantes);

// ======== POST ========
router.post('/registrar-donante', registrarDonante);

// Exportar enrutador
export default router;