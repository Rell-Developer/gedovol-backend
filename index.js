// Importaciones
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

// Conexion con la BD
import conectarDB from "./config/db.js";

// Routes
import usuarioRoutes from './routes/usuarioRoutes.js';
import donanteRoutes from './routes/donanteRoutes.js';
import formularioRoutes from './routes/formularioRoutes.js';
import notificacionRoutes from './routes/notificacionRoutes.js';

// Instancia de Express
const app = express();

// Inicio de la configuracion del dotenv
dotenv.config();

// Uso del express json
app.use(express.json());

// Uso de los cors
app.use(cors());

// Uso del Enrutado
app.use('/api/usuario', usuarioRoutes);
app.use('/api/donante', donanteRoutes);
app.use('/api/formulario', formularioRoutes);
app.use('/api/notificacion', notificacionRoutes);

// Verificacion si se conecto con la base de datos
try {
    await conectarDB.authenticate();
    console.log('Conexion Exitos a la DB');
} catch (error) {
    console.log('El error de conexion es: ', error.message);
}

// Creando el puerto
const PORT = process.env.PORT || 4000;

// Evento Listen
app.listen(PORT, () =>{
    console.log('El servidor está funcionando en el puerto 4000');
})


