import express from 'express';
import routes from './routes/index.js';
import db from './config/mongoose.js';
import expressLayout from 'express-ejs-layouts';
import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport-local-strategy.js';
import passportGoogle from './config/passport-google-oauth-strategy.js';
import flash from 'connect-flash';
import { setFlash } from './config/middleware.js';

const PORT = 8000;
const app = express();

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// Configure the session middleware
app.use(
    session(
    {
        secret: 'ZNMDVNqWsy', // Replace with a strong, random string
        resave: false, // Do not save the session if it's not modified
        saveUninitialized: false, // Do not save uninitialized sessions
        cookie: 
        {
            secure: false, // Set to true if using HTTPS
            maxAge: 1000 * 60 * 60 * 24, // Session duration in milliseconds (1 day)
        },
    })
);


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals for views
app.use(passportLocal.setAuthenticatedUser);

app.use(flash());
app.use(setFlash);

// all routes
app.use(routes);

app.listen(PORT, (err)=>{
    if(err) console.log('Error : ',err);
    console.log(`server is runing on ${PORT} port`);
});