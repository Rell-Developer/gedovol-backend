// Importaciones
import HeaderEmail from "./HeaderEmail.js";

// Mensaje
const UserRegistered = (datos) => {
    const {nombre, token} = datos;
    return (`
        ${HeaderEmail()}
        <style>
            section{
                width:100%;f
                text-align: center;
            }
            section p span{
                font-weight: bold;
            }
        </style>

        <section>
            <p>Hola: <span>${nombre}</span>, tu usuario en el sistema GEDOVOL ha sido creado éxitosamente.</p>
            <p>Para poder empezar a usar el sistema tu cuenta debes estar confirmada.</p>

            <p>Sigue el siguiente enlace para confirmar tu cuenta:
            <a href={"${process.env.FRONTEND_URL}/confirmar/${token}"}><span>Confirmar Cuenta</span></a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        </section>`
    )
}

export default UserRegistered