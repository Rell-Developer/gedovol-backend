import Sequelize from 'sequelize';

// Declaracion de la conexion con la base de datos
const conectarDB = new Sequelize('gedovoldb', 'root', 'root',{
    host: '127.0.0.1',
    dialect: 'mysql'
})

// Exportando la conexion con la bd
export default conectarDB;