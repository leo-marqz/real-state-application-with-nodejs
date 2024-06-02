import nodemailer from 'nodemailer';

const sendEmailToConfirmaAccount = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const { name, email, token } = data;

      await transport.sendMail({
        from: 'Bienes Raices MVC',
        to: email,
        subject: 'Confirma tu cuenta de Bienes Raices',
        text: 'Confirma tu cuenta de Bienes Raices MVC',
        html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Cuenta - Bienes Raíces</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 600px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007bff;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                    color: #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content h2 {
                    color: #007bff;
                }
                .content p {
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .content a {
                    display: inline-block;
                    background-color: #28a745;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    color: #777;
                    padding: 20px;
                    border-top: 1px solid #dddddd;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Bienes Raíces</h1>
                </div>
                <div class="content">
                    <h2>Confirmación de Cuenta</h2>
                    <p>Hola ${name},</p>
                    <p>Gracias por registrarte en Bienes Raíces. Por favor, confirma tu cuenta haciendo clic en el botón de abajo:</p>
                    <p><a href="${process.env.APP_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}">Confirmar Cuenta</a></p>
                    <p>Si no creaste una cuenta, puedes ignorar este correo electrónico.</p>
                    <p>Saludos,<br>El equipo de Bienes Raíces</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Bienes Raíces. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `
      });

}


export {
    sendEmailToConfirmaAccount
}