const nodemailer = require('nodemailer');


exports.sendEmail = async(motivo, nombre, email, mensaje) => {
    var transporter = nodemailer.createTransport({
        host: "mon15.servidoraweb.net",
        secure: true,
        port: 465,
        auth: {
            user: "transporter@tarjetaprimicia.com.ar",
            pass: "zaZen_422Ddf",
        },
    });


    var mailOptions = {
        from: "transporter@tarjetaprimicia.com.ar", // sender address
        subject: "Solicitud de contacto",
        to: "casacentral@tarjetaprimicia.com.ar", // list of receivers
        text: `El usuario ${nombre}, con mail ${email}, quiere comunicarse por el motivo ${motivo}, y escribio el siguiente mensaje: ${mensaje}. Puede verificarlo en el panel administrativo del sitio web`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email enviado", info)
        }
    })
}
