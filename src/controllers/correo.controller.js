const nodemailer = require('nodemailer');

// Configurar el transportador
const transporter = nodemailer.createTransport({
    host: 'mail.tarjetaprimicia.com.ar',
    port: 9025,
    secure: false,
    auth: {
        user: 'transporter@tarjetaprimicia.com.ar',
        pass: 's-csu0;$E~0f'
    }
});

// Función para enviar el correo electrónico
const enviarCorreo = async (destinatario, asunto, cuerpo) => {
    try {
        // Configurar el correo electrónico
        const mailOptions = {
            from: 'transporter@mutualentreasoc.com.ar',
            to: destinatario,
            subject: asunto,
            text: cuerpo
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

module.exports = { enviarCorreo };
