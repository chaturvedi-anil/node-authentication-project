// Import required modules
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

// Create a transport object for sending emails
let transporter = nodemailer.createTransport(
    {
        service: 'smtp', // Use SMTP as the email service
        host: 'smtp.gmail.com', // SMTP host for Gmail
        port: 587, // Port number for the SMTP server
        secure: false, // Use TLS (true) or not (false)
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // Your Gmail username from environment variables
            pass: process.env.CODEIAL_GMAIL_PASSWORD // Your Gmail password from environment variables
        }
    }
);

// Function to render email templates
let renderTemplate = (data, relativePath) => 
{
    let mailHTML;
    // Render an email template using EJS
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), // Template path
        data, // Data to be passed to the template
        function (err, template) 
        {
            if (err) console.log("error in rendering the template for mail: ", err);
            mailHTML = template; // Store the rendered HTML in mailHTML
        }
    );

    return mailHTML; // Return the rendered HTML
}

// Export the transport and renderTemplates function
export default {
    transporter: transporter,
    renderTemplate: renderTemplate // Exported function name should match the defined function name
}
