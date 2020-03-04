var nodeMailer = require('nodemailer');
var sender = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'budhathoki1418@gmail.com',
        pass: 'budhathoki1418'
    }
});
module.exports = sender;