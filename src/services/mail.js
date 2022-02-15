const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: process.env.MAIL_PROVIDER | 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = {
    send: (to, subject, text) => {
        var mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: to,
            subject: subject,
            text: text,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
}