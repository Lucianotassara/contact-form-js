const nodemailer = require("nodemailer");


export async function enviarMail(mail) {
  let transporter = nodemailer.createTransport({
    host: process.env.SENDER_EMAIL_HOST, 
    port: 587,
    secure: false,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PSSWD
    },
    tls: { rejectUnauthorized: false },
    log: true,
    debug: true
  });

  let info = await transporter.sendMail(mail);
  console.log(`MEssage sent: ${info.messageId}`)
  return info.messageId;

}

export async function armarMailReceiver(body){
  let mail = {
    from: `"Contact-form-js" <${process.env.SENDER_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `${body.nombre} ha enviado una consulta contact-form-js`,
    html: 
    `<h3><b>Consulta de ${body.nombre}</b><h3>
      <ul>
      <li>Nombre: ${body.nombre}</li>
      <li>Fecha: ${new Date()}</li>
      <li>Teléfono: ${body.telefono}</li>
      <li>Correo electrónico: ${body.email}</li>
      <br>
      <li>Motivo: ${body.consulta}</li>
      </ul>
      <br>
      <p>Sin mas, gracias por leer este correo.</p>`
  }

  return mail;
}


export async function armarMailSender(body){
  let mailPersona = {
    from: `"Contact-form-js" <${process.env.SENDER_EMAIL}>`,
    to: body.email,
    subject: `Hola ${body.nombre} hemos recibido tu consulta`,
    html: 
      `<p>consultaste por: ${body.consulta}</p>
      <p>Nos estaremos comunicando al número de teléfono que se indicó: <b>${body.telefono}</b></p>
      <br>
      <p>O bien a través de esta dirección de correo electrónico: <b>${body.email}</b></p>
      </p>Sin mas, gracias por leer este correo.</p>`
  }

  return mailPersona;
}