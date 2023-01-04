// Exportar las librearias y archivos necesarios
import express from "express";

// Metodos del controlador
import {
    unUsuario,
    registrarUsuario,
    obtenerUsuarios,
    cambiarPassword,
    confirmarCuenta,
    actualizarUsuario,
    borrarUsuario,
    buscarPerfil,
    resetearPassword,
} from '../controllers/usuarioController.js';

// Middlewares
import checkAuth from "../middleware/outMiddleware.js";

// Inicio del enrutado
const router = express.Router();

// ============ Area Publica ============
// ======== GET ========
router.get('/confirmar-cuenta/:token', confirmarCuenta); // Confirmar Cuenta
router.get('/buscar-perfil/:id', buscarPerfil);          // Buscar un perfil 

// ======== POST ========
router.post('/login', unUsuario); //Login

// ======== PUT ========
router.put('/resetear-password', resetearPassword);       // Resetear Contraseña para Confirmarla

// ============ Area Privada ============
// ======== GET ========
router.get('/obtener-usuarios', obtenerUsuarios);

// ======== POST ========
router.post('/registrar-usuario', registrarUsuario);

// ======== PUT ========
router.put('/actualizar-usuario', actualizarUsuario);   // Para Actualizar los datos del usuario
router.put('/cambiar-password', cambiarPassword);       // Cambiar Contraseña

// ======== DELETE ========
router.post('/borrar-usuario', borrarUsuario);

// Exportar enrutador
export default router;