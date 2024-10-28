const nodemailer=require('nodemailer');
require('dotenv').config();

const sendEmail=async function(email,subject,message){

    //create reusable transporter object using the default SMTP transporter
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
    await transporter.sendMail({
        from:'EdTech-By Souvik',
        to:email,
        subject:subject,
        html:message,
    })
}
module.exports=sendEmail;