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
  
// check if the user is authenticated 
passport.checkAuthentication = function(req, res, next)
{
    console.log('pahuch');
    // if user is authenticated, then pass the req to next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    // if not then
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookies and we are just sending this to locals for views 
        res.locals.user = req.user;
    }

    next();
}

export default passport;