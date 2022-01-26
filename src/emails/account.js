const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from : "haddad.alglob@hotmail.com", 
        subject : "Welcome to Task App",
        text : `Hello ${name},, we're happy to join us .. we hope you enjoy our service `
    })
}

const sendFarewellEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: "haddad.alglob@hotmail.com",
        subject : "cancelation ressons survey",
        text : `We are sad to see you leaving ${name} .. could you please tell us why`
    })
}
module.exports = {
    sendWelcomeEmail : sendWelcomeEmail,
    sendFarewellEmail // short from es5 syntax
}