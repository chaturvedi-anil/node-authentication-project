import nodeMailer from '../config/nodemailer.js';

export function newUserCreatedMailer(newUser)
{
    console.log('inside the newUserCreated mailer : ',newUser );

    nodeMailer.transporter.sendMail(
        {
            from: process.env.GMAIL_USERNAME,
            to: newUser.email,
            subject: 'Account Created',
            html: '<h1> Congratulations, your account is created !</h1>' 
        },
        function(err, info)
        {
            if(err)
            {
                console.log('Error in sending mail to user : ', err);
                return;
            }
            console.log('mail sent to user', info);
            return;
        }
    );
}