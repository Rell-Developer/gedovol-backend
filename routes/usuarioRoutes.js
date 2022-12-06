// Exportar las librearias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    unUsuario,
    registrarUsuario,
    obtenerUsuarios
} from '../controllers/usuarioController.js';

// Middlewares
import checkAuth from "../middleware/outMiddleware.js";

// Inicio del enrutado
const router = express.Router();

// ============ Area Publica ============
router.post('/login', unUsuario); //Login

// ============ Area Privada ============
// ======== GET ========
router.get('/obtener-usuarios', obtenerUsuarios);

// ======== POST ========
router.post('/registrar-usuario', registrarUsuario);

// Exportar enrutador
export default router;