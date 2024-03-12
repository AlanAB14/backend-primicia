const nodemailer = require('nodemailer');


exports.sendEmail = async(tipo, campos) => {
    var transporter = nodemailer.createTransport({
        // host: "smtp.tarjetaprimicia.com.ar",
        // secure: false,
        // port: 587,
        // requireTLS: false,
        // // 25 o 995
        // auth: {
        //     user: "newsletter@mutualentreasoc.com.ar",
        //     pass: "LnCX/q81:f",
        // },
        // tls: {
        //     // do not fail on invalid certs
        //     rejectUnauthorized: false,
        //   },


        // host: "mon15.servidoraweb.net",
        // secure: true,
        // port: 465,
        // auth: {
        //     user: "transporter@tarjetaprimicia.com.ar",
        //     pass: "zaZen_422Ddf",
        // },
        host: "mon15.servidoraweb.net",
        secure: true,
        port: 465,
        auth: {
            user: "transporter@tarjetaprimicia.com.ar",
            pass: ".-RmkjjoC?SV",
         },
    });


    var mailOptions = {
        from: "transporter@tarjetaprimicia.com.ar", // sender address
        subject: `${ tipo === 'Solicitud de contacto' ? 'Solicitud de contacto - ' + (campos.motivo ?? '') : tipo}`,
        to: "abersia@cooperacionseguros.com.ar", // list of receivers
        // from: "transporter@tarjetaprimicia.com.ar", // sender address
        // subject: "Solicitud de contacto",
        // to: "casacentral@tarjetaprimicia.com.ar", // list of receivers
        html: `
            ${ tipo === 'Solicitud de contacto' ? 
                `<p>
                El usuario ${campos.nombre ?? ''}, con mail ${campos.email ?? ''}, quiere comunicarse por el motivo: <strong>${campos.motivo ?? ''}</strong>.
                <br>
                Los datos que completó fueron los siguientes:
                <br>
                <br>
                ${campos.motivo    ? '<span style="text-decoration: underline">Motivo:</span> '     + campos.motivo   + '<br>' : ''}
                ${campos.nombre    ? '<span style="text-decoration: underline">Nombre:</span> '     + campos.nombre   + '<br>' : ''}
                ${campos.dni       ? '<span style="text-decoration: underline">DNI:</span> '        + campos.dni      + '<br>' : ''}
                ${campos.ciudad    ? '<span style="text-decoration: underline">Ciudad:</span> '     + campos.ciudad   + '<br>' : ''}
                ${campos.email     ? '<span style="text-decoration: underline">Email:</span> '      + campos.email    + '<br>' : ''}
                ${campos.mensaje   ? '<span style="text-decoration: underline">Mensaje:</span> '    + campos.mensaje  + '<br>' : ''}
                <br>
                Puede verificarlo en el panel administrativo del sitio web
                </p>`
                : 
                `<p>
                El usuario ${nombre ?? ''}, con mail ${email ?? ''}, quiere comunicarse por el motivo: <strong>${tipo ?? ''}</strong>.                
                <br>
                Los datos que completó fueron los siguientes:
                <br>
                <br>
                ${campos.nombre    ? '<span style="text-decoration: underline">Nombre:</span> '     + campos.nombre   + '<br>' : ''}
                ${campos.email     ? '<span style="text-decoration: underline">Email:</span> '      + campos.email    + '<br>' : ''}
                ${campos.telefono  ? '<span style="text-decoration: underline">Teléfono:</span> '   + campos.telefono    + '<br>' : ''}
                ${campos.domicilio ? '<span style="text-decoration: underline">Domicilio:</span> '  + campos.domicilio    + '<br>' : ''}
                ${campos.ciudad    ? '<span style="text-decoration: underline">Ciudad:</span> '     + campos.ciudad    + '<br>' : ''}
                ${campos.dni       ? '<span style="text-decoration: underline">DNI:</span> '        + campos.dni  + '<br>' : ''}
                ${campos.ingresos  ? '<span style="text-decoration: underline">Ingresos:</span> '   + campos.ingresos  + '<br>' : ''}
                ${campos.filial    ? '<span style="text-decoration: underline">Filial:</span> '     + campos.filial  + '<br>' : ''}
                ${campos.mensaje   ? '<span style="text-decoration: underline">Mensaje:</span> '    + campos.mensaje  + '<br>' : ''}
                <br>
                Puede verificarlo en el panel administrativo del sitio web
                </p>`
            }
                `, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email enviado", info)
        }
    })
}
