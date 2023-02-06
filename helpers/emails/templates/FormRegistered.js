// Importaciones de otros componentes para el email
import HeaderEmail from "./HeaderEmail.js";

const FormRegistered = (datos) => {

    // Destructuring
    const {nombre} = datos;

    // Retorno HTML
    return (
        `
        ${HeaderEmail()}
        <section>
            <p>Hola: ${nombre}, tu formulario ha sido creado éxitosamente.</p>
        </section>`
    )
}

export default FormRegistered;