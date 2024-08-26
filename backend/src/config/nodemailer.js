import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configuración de nodemailer (transporter)
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
});

// Función para enviar correo al usuario
const sendMailToAdmin = (userMail, token) => {
  // Configuración del correo
  let mailOptions = {
    from: process.env.USER_MAILTRAP, // Dirección del remitente
    to: userMail, // Lista de destinatarios
    subject: "Verifica tu cuenta", // Línea de asunto
    html: `
    <h1>Verifica tu cuenta</h1>
    <hr>
    <p>Hola, haz clic <a href="${process.env.URL_FRONTEND}confirmar-email/${encodeURIComponent(token)}">aquí</a> para confirmar tu cuenta.</p>
    <hr>
    <footer>Comisiones APP</footer>
    `, // Cuerpo del correo
  };

  transporter.sendMail(mailOptions, function (error, info) {
    // Enviar el correo
    if (error) {
      console.log(error); // Si hay un error, imprimirlo en consola
    } else {
      console.log("Correo enviado: " + info.response); // Si se envía correctamente, imprimirlo en consola
    }
  });
};

// Funcion para enviar correo de recuperación de contraseña
const sendMailToRecoveryPassword = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Comisiones APP</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Residuos</footer>
    `,
    });
    console.log("Mensaje enviado satisfactoriamente: %s", info.messageId);
}

// Funcion para enviar un correo al ciudadano
const sendMailToUser = async (userMail, password, token) => {
  let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Correo de verificacion de cuenta",
    html: `
    <h1>Comisiones APP</h1>
    <hr>
    <h2>Click <a href=${process.env.URL_FRONTEND}confirmar-email/${encodeURIComponent(token)}>aqui</a> para confirmar tu cuenta.</h2>
    <hr>
    <h2>Credenciales para iniciar sesión</h3>
    <h3>Correo Electrónico:<span> (tu correo electrónico)</span></h3>
    <h3>Contraseña:<span> ${password}</span></h3>
    <hr>
    <span>Recomendaciones:</span>
    <ul>
        <li>Actualizar la contraseña lo más pronto posible.</li>
        <li>No compartir con nadie tu contraseña.</li>
        <li>Si tienes dudas, habla con el administrador del sistema.</li>
    </ul>
    <footer>Comisiones APP</footer>
    `,
  });
  console.log("Mensaje enviado satisfactoriamente: %s", info.messageId);
}

export { sendMailToAdmin, sendMailToRecoveryPassword, sendMailToUser };