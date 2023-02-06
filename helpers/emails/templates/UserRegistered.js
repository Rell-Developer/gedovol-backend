const UserRegistered = (datos) => {
    const {nombre, token} = datos;
    return (`

        <style>
            .text-red{
                color:red;
            }
        </style>

        <section>
            <p class="text-red font-bold">Hola: "${nombre}", tu usuario en el sistema GEDOVOL ha sido creado éxitosamente.</p>
            <p>Para poder empezar a usar el sistema tu cuenta debes estar confirmada.</p>

            <p>Sigue el siguiente enlace para confirmar tu cuenta:
            <a href={"${process.env.FRONTEND_URL}/confirmar/${token}"}>Confirmar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        </section>`
    )
}

export default UserRegistered