import nodemailer from 'nodemailer';

const recuperarCuenta = async (datos, subject = 'Recuperación de Cuenta', text = 'Recupera tu Cuenta y no pierdas tu usuario') => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const {email, nombre, token} = datos;

    // Enviar email
    const info = await transporter.sendMail({
        from: 'GEDOVOL - Gestor de Donantes Voluntarios',
        to: email,
        subject,
        text,
        html: `<p class="text-red font-bold">Hola: ${nombre}, se ha enviado este correo para recuperar su cuenta en el sistema GEDOVOL.</p>

            <p>Sigue el siguiente enlace para restablecer tu contraseña y recuperar tu cuenta:
            <a href="${process.env.FRONTEND_URL}/recuperar-password/${token}">Recuperar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    // console.log(info);
    console.log('Mensaje enviado: %s', info.messageId);
}

export default recuperarCuenta;