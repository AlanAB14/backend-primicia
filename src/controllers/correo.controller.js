const nodemailer = require('nodemailer');


exports.sendEmail = async(motivo, nombre, email, mensajemotivo, nombre, email, mensaje) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.tarjetaprimicia.com.ar",
        secure: true,
        port: 25,
        //25 o 995
        // host: "mon15.servidoraweb.net",
        // secure: true,
        // port: 465,
        auth: {
            user: "prueba1@tarjetaprimicia.com.ar",
            pass: "Primicia24*",
        },
    });


    var mailOptions = {
        from: "prueba1@tarjetaprimicia.com.ar", // sender address
        subject: "Solicitud de contacto",
        to: "abersia@cooperacionseguros.com.ar", // list of receivers
        // from: "transporter@tarjetaprimicia.com.ar", // sender address
        // subject: "Solicitud de contacto",
        // to: "casacentral@tarjetaprimicia.com.ar", // list of receivers
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
