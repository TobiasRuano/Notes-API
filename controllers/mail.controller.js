let nodemailer = require('nodemailer');

exports.sendEmail = async function (data){
    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port:587,
        auth: {
            user: 'ruano_t@outlook.com',
            pass: 'cyytaaqgnrghxlah'
        },
        tls: {
            ciphers:'SSLv3'
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'ruano_t@outlook.com',
        to: data.destinatario,
        subject: data.asunto,
        html: data.cuerpo,
    };
    console.log("mail",mailOptions)
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};