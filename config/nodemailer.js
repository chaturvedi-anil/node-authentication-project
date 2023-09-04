import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname

// Load environment variables from .env file
dotenv.config();

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = dirname(__filename);

// Import required modules
import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

// Create a transport object for sending emails
let transporter = nodeMailer.createTransport({
    service: 'smtp', // Use SMTP as the email service
    host: 'smtp.gmail.com', // SMTP host for Gmail
    port: 587, // Port number for the SMTP server
    secure: false, // Use TLS (true) or not (false)
    auth: {
        type: 'LOGIN',
        user: process.env.GMAIL_USERNAME, // Your Gmail username from environment variables
        pass: process.env.GMAIL_PASSWORD, // Your Gmail password from environment variables
    },
});

// Function to render email templates
let renderTemplate = (data, relativePath) => {
    let mailHTML;

    // Render an email template using EJS
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), // Use __dirname here
        data,
        function (err, template) {
            if (err) {
                console.log("error in rendering the template for mail: ", err);
            }
            mailHTML = template;
        }
    );

    return mailHTML;
};

// Export the transport and renderTemplates function
export default {
    transporter: transporter,
    renderTemplate: renderTemplate,
};
