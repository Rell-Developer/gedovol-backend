// Importaciones
import bcrypt from 'bcrypt';

// Hashear una contraseña
const hashearPassword = async(pass, claveDB) =>{
    
    // Comprobando si ya hay contraseña registrada
    if(claveDB === undefined || !comprobarPassword(pass, claveDB)){
        // Declarando los saltos que tendrá el hasheado
        const salt = await bcrypt.genSalt(10);
        
        // Hasheando la contraseña en base a la contraseña dada y los saltos declarados
        claveDB = await bcrypt.hash( pass, salt);

        // Retornando la contraseña hasheada
        return claveDB;
    }
}

// Comprobar una contraseña hasheada
const comprobarPassword = async(passwordFormulario, claveDB) => {
    // Comparando las contraseñas
    return await bcrypt.compare(passwordFormulario, claveDB);
}

// Exportar las funciones para las contraseñas
export{
    hashearPassword,
    comprobarPassword
}