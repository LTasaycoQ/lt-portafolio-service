const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const EMAIL_USER = "ltasayco769@gmail.com";
const EMAIL_PASS = "uukz bgne ojya busv";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});

app.post('/contact-luis', async (req, res) => {
    const {
        name, email, asunto, mensaje
    } = req.body;

    try {
        await transporter.sendMail({
            from: `"Portafolio WEB - " <${EMAIL_USER}>`,
            to: "luistasayco3030@gmail.com",
            subject: `Mensaje de Pagina web - ${name}`,
            html: `
                
                <span style="font-weight:600;">Nombre:</span> ${name}
                <br /> 
                <span style="font-weight:600;">Email:</span> ${email}
                <br /> 
                <span style="font-weight:600;">Asunto:</span> ${asunto}
                <br /> 
                <span style="font-weight:600;">Asunto:</span> <br /> ${mensaje}

            `,

        });

        res.json({ mensaje: '¡Correo enviado con éxito!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno en el servidor' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});