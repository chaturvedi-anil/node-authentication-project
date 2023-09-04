import nodeMailer from '../config/nodemailer.js';

export function newUserCreatedMailer(newUser)
{
    let htmlString = nodeMailer.renderTemplate({newUser: newUser}, 'newUser.ejs');

    nodeMailer.transporter.sendMail(
        {
            from: process.env.GMAIL_USERNAME,
            to: newUser.email,
            subject: 'Account Created',
            html: htmlString
        },
        function(err, info)
        {
            if(err)
            {
                console.log('Error in sending mail to user : ', err);
                return;
            }
            // console.log('mail sent to user', info);
            return;
        }
    );
}