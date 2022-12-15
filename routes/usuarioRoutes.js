// Exportar las librearias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    unUsuario,
    registrarUsuario,
    obtenerUsuarios,
    cambiarPassword,
    confirmarCuenta
} from '../controllers/usuarioController.js';

// Middlewares
import checkAuth from "../middleware/outMiddleware.js";

// Inicio del enrutado
const router = express.Router();

// ============ Area Publica ============
// ======== GET ========
router.get('/confirmar-cuenta/:token', confirmarCuenta); //Confirmar Cuenta

// ======== POST ========
router.post('/login', unUsuario); //Login

// ======== PUT ========
router.put('/cambiar-password', cambiarPassword); //Cambiar Contraseña para Confirmarla

// ============ Area Privada ============
// ======== GET ========
router.get('/obtener-usuarios', obtenerUsuarios);

// ======== POST ========
router.post('/registrar-usuario', registrarUsuario);

// Exportar enrutador
export default router;