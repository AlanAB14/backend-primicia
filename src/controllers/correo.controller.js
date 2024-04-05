const nodemailer = require('nodemailer');


exports.sendEmail = async(tipo, campos) => {
    var email = '';
    //console.log(removerAcentos(campos.filial))

    switch (removerAcentos(campos.filial)) {
        case 'rufino':
            email = 'rufino@tarjetaprimicia.com.ar'
            break;
        case 'villa canas':
            email = 'villacanas@tarjetaprimicia.com.ar'
            break;
        case 'san gregorio':
            email = 'sangregorio@tarjetaprimicia.com.ar'
            break;
        case 'san nicolas':
            email = 'sannicolas@tarjetaprimicia.com.ar'
            break;
        case 'villa constitucion':
            email = 'villaconstitucion@tarjetaprimicia.com.ar'
            break;
        case 'villa ramallo':
            email = 'villaramallo@tarjetaprimicia.com.ar'
            break;
        case 'firmat':
            email = 'firmat@tarjetaprimicia.com.ar'
            break;
        default:
            email = 'casacentral@tarjetaprimicia.com.ar'
            break;
    }
    
    //console.log(email)

    
    var transporter = nodemailer.createTransport({
        //host: "smtp.tarjetaprimicia.com.ar",
        //secure: false,  //VA EN FALSE
        //port: 587,
        //requireTLS: false,  //VA EN TRUE
        // 25 o 995
        //auth: {
        //    user: "newsletter@mutualentreasoc.com.ar",
        //    pass: "LnCX/q81:f",
        //},
        //tls: {
            // do not fail on invalid certs
            //rejectUnauthorized: false,  //VA EN FALSE
        //  },


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
        to: email, // list of receivers
        //to: "abersia@cooperacionseguros.com.ar",
        // from: "transporter@tarjetaprimicia.com.ar", // sender address
        // subject: "Solicitud de contacto",
        // to: "casacentral@tarjetaprimicia.com.ar", // list of receivers
        //text: `El usuario ${nombre}, con mail ${email}, quiere comunicarse por el motivo: ${motivo}, ${mensaje !== '' ? `y escribio el siguiente mensaje: ${mensaje}` : ''}. Puede verificarlo en el panel administrativo del sitio web`, // plain text body
html: `
            ${ tipo === 'Solicitud de contacto' ? 
                `<p>
                El usuario ${campos.nombre ?? ''}, con mail ${campos.email ?? ''}, quiere comunicarse por el motivo: <strong>${campos.motivo ?? ''}</strong>.
                <br>
                Los datos que complet贸 fueron los siguientes:
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
                El usuario ${campos.nombre ?? ''}, con mail ${campos.email ?? ''}, quiere comunicarse por el motivo: <strong>${tipo ?? ''}</strong>.                
                <br>
                Los datos que complet贸 fueron los siguientes:
                <br>
                <br>
                ${campos.nombre    ? '<span style="text-decoration: underline">Nombre:</span> '     + campos.nombre   + '<br>' : ''}
                ${campos.email     ? '<span style="text-decoration: underline">Email:</span> '      + campos.email    + '<br>' : ''}
                ${campos.telefono  ? '<span style="text-decoration: underline">Tel茅fono:</span> '   + campos.telefono    + '<br>' : ''}
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
            //console.log("Email enviado", info)
            console.log("Email enviado")
        }
    })
}

function removerAcentos(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
