const nodemailer = require('nodemailer');


exports.sendEmail = async() => {
    var transporter = nodemailer.createTransport({
        host: "mon15.servidoraweb.net",
        port: 465,
        auth: {
            user: "transporter@tarjetaprimicia.com.ar",
            pass: "zaZen_422Ddf",
        },
    });


    var mailOptions = {
        from: "transporter@tarjetaprimicia.com.ar", // sender address
        to: "casacentral@tarjetaprimicia.com.ar", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email enviado", info)
        }
    })
}
