
# Node Authentication System

## Overview

The Node Authentication System is a robust and secure user authentication solution built on Node.js, MongoDB, and Passport.js. This system provides user registration, login, and authentication capabilities, with support for both local and Google OAuth2.0 authentication methods. It incorporates best practices in security, data storage, and user experience to ensure the confidentiality and integrity of user information.


## Features

- Local Authentication: Securely register and authenticate users   with email and password, utilizing bcrypt for password hashing and salted storage.

- Google OAuth2.0 Integration: Enable users to register and log in through their Google accounts, ensuring a seamless and user-friendly experience.

- MongoDB Database: Store user data in a MongoDB database, ensuring scalability, reliability, and ease of data management.

- Noty.js Notifications: Provide users with beautiful and interactive notifications using the Noty.js library to enhance the user experience.

- Nodemailer Email Verification: Send congratulation emails to users upon registration.

- Bcrypt and Crypto: Bcrypt for encrpting the password before storing on Database, Crypto for genrating random password for gmail Authentication.
## Installation

Clone this repository to your local machine.

```bash
git clone https://github.com/chaturvedi-anil/node-authentication-system.git
```
Install the required dependencies using npm.

```bash
cd node-authentication-system
npm install
```
Configure your environment variables by creating a .env file in the root directory. You can use the provided .env as a template.

Start the application.

```bash
npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`GOOGLE_CLIENT_ID` = `your_google_client_id`             
`GOOGLE_CLIENT_SECRETE` = `your_google_client_secrete`   
`GOOGLE_CALLBACK_URL` = `http://localhost:8000/users/auth/google/callback`

#### This is for nodemailer
`GMAIL_USERNAME` = `your_gmail_username`  
`GMAIL_PASSWORD` = `your_gmail_password`

#### Database URI
`MONGO_DB_URL_LOCAL` = `mongodb://localhost:27017/your_database_name`

`MONGO_DB_CLOUD_SERVER` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?ssl=true&authSource=admin&w=majority`


## Usage

- Access the application in your web browser by navigating to http://localhost:8000.

- Register a new user account or log in with existing credentials.

- Utilize the Google OAuth2.0 option for a quick and hassle-free login experience.


## Configuration

To customize this authentication system for your specific needs, you can modify the following configuration files:

- `config/passport-local-strategy.js`: Configure passport-local authentication method.

- `config/passport-google-oauth-strategy.js`: Configure passport-google-oauth-strategy method.

- `config/nodemailer.js`: Configure Nodemailer settings for email notifications.

- `config/mongoose.js` : Configure mongoose file to change in your mongodb connection file.
## Authors

- [@chaturvedi-anil](https://github.com/chaturvedi-anil)

