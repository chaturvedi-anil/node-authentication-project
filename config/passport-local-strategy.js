import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // Specify the field for username (email in this case)
            passReqToCallback: true // Pass the request object to the callback function
        },
        async function(req, email, password, done) 
        { 
            try 
            {
                // Find the user by email in the database
                const user = await User.findOne({ email: email });
                
                if (!user) 
                {
                    console.log('User not found');
                    return done(null, false, { message: 'User not found' }); // Inform Passport that authentication failed
                }

                // Compare the provided password with the hashed password stored in the database
                const passwordMatch = await bcrypt.compare(password, user.password);
                
                if (passwordMatch) 
                {
                    console.log('Sign-in successful');
                    return done(null, user); // User is authenticated
                } 
                else 
                {
                    console.log('Password is incorrect');
                    return done(null, false, { message: 'Incorrect password' }); // Inform Passport that authentication failed
                }
            } 
            catch (error) 
            {
                console.error('Error during authentication:', error);
                return done(error); // Handle unexpected errors
            }
        }
    )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => 
{
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => 
{
    User.findById(id)
    .then((user)=>
    {
        return done(null, user);
    })
    .catch((err)=>
    {
        console.log(`Error in finding the user in deserialize function ${err}`);
        return done(err);
    });
});
  

export default passport;