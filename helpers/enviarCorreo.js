import nodemailer from 'nodemailer';

const enviarCorreo = async (datos, subject = 'Creacion de Cuenta', text = 'Confirma tu Cuenta') => {

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
        html: `<p class="text-red font-bold">Hola: ${nombre}, tu usuario en el sistema GEDOVOL ha sido creado éxitosamente.</p>
            <p>Para poder empezar a usar el sistema tu cuenta debes estar confirmada.</p>

            <p>Sigue el siguiente enlace para confirmar tu cuenta:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);
}

export default enviarCorreo;