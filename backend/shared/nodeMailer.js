const { createTransport } = require('nodemailer');
const { config } = require('dotenv');

config();

const transporter = createTransport({
    service: "Gmail",
    auth: {
        user: process.env.email,
        pass: process.env.emailpass
    }
})

function sendMail(email, user, OTP, callback) {
    const mailMessage = {
        from: process.env.email,
        to: email,
        subject: "OTP for resetting password",
        text: `
        Hello ${user}, 
        
        Your OTP (One-Time-Password ) for resetting the account password is ${OTP}

        Thank You
        `
    }

    transporter.sendMail(mailMessage, async (err, info) => {
        if (err) {
            console.log(err)
            await callback(err)
        } else {
            console.log(`eamil sent success via id-${info.messageId}`)
            await callback(null, OTP)
        }
    })
}

module.exports = { sendMail }
