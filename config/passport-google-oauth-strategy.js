import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import passport from 'passport';
import passportOauth from 'passport-google-oauth';
import crypto from 'crypto';
import User from '../models/users.js';
import { newUserCreatedMailer } from '../mailers/userMailer.js';
const googleStrategy = passportOauth.OAuth2Strategy;

passport.use(new googleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async function(accessTokens, refreshTokens, profile, done) 
    {
        try 
        {
            let user;
            try 
            {
                // find user 
                user = await User.findOne({ email: profile.emails[0].value });
            } 
            catch(err) 
            {
                console.error('Error in finding user in passport-google: ', err);
                return done(err);
            }
            
            // if user found then set it as req.user
            if(user)
            {
                console.log('singin using google');
                return done(null, user);
            }
            // if user not found then create user and set it as req.user 
            else 
            {
                try 
                {
                    // Create a new user 
                    let newUser = await User.create(
                        {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: crypto.randomBytes(20).toString('hex')
                        }
                    );

                    if (!newUser) 
                    {
                        console.error('Error in creating newUser in passport-google');
                        return done(err);
                    }
                    // new user passing to mailer function
                    newUserCreatedMailer(newUser);
                    
                    console.log('New User created using Google');
                    return done(null, newUser);
                } 
                catch(err) 
                {
                    console.error('Error in creating a new user: ', err);
                    return done(err);
                }
            }
        } 
        catch(err) 
        {
            console.error('Error in passport-google-oauth-strategy: ', err);
            return done(err);
        }
    }
));

export default passport;
