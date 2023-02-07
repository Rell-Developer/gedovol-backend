// Importaciones de otros componentes para el email
import HeaderEmail from "./HeaderEmail.js";

const FormRegistered = (datos) => {

    // Destructuring
    const {nombre} = datos;

    // Retorno HTML
    return (
        `
        ${HeaderEmail()}
        <style>
            section{
                width:100%;
                text-align: center;
            }
            section p span{
                font-weight: bold;
            }
        </style>
        <section>
            <p>Hola: <span>${nombre}</span>, su formulario ha sido registrado éxitosamente en el sistema.</p>
        </section>`
    )
}

export default FormRegistered;