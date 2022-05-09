import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }); 

    // Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma Tu Cuenta",
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en UpTask</P>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</P>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Comprobar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}
export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }); 

    // Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Restablece Tu Password",
        text: "Restablece tu password",
        html: `
            <p>Hola ${nombre}, has solicitado restablecer tu password</P>
            <p>Sigue el sigueinte enlace para generar un nuevo password:</P>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" >Restablecer Password</a>
            <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
        `
    })
}