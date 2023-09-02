import User from '../models/users.js';

export function signUp(req, res)
{
    if(req.isAuthenticated())
    {
        res.redirect('/users/profile');
    }
    return res.render('sign_up', {title: 'Sign Up'});
}

export function signIn(req, res)
{
    if(req.isAuthenticated())
    {
        res.redirect('/users/profile');
    }
    return res.render('sign_in', {title: 'Sign In'});
}

export function userProfile(req, res)
{
    // Check if the user is authenticated.
    if (req.isAuthenticated()) 
    {
        return res.render('profile',{title: 'User Profile'});
    } 
    else 
    {
        res.redirect('/users/sign-in');
    }
}
export function getResetPasswordPage(req, res)
{
    if(req.isAuthenticated())
    {
        return res.render('reset_password', {title: 'Reset Password'});
    }

    // TODO adding flash messages 
}

// creating new users
export async function createUser(req, res)
{
    try
    {
        // console.log(req.body);
        let user = await User.findOne({email: req.body.email});

        if(!user)
        {
            if(req.body.password !== req.body.confirm_password)
            {
                console.log('password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                await User.create(req.body);
                console.log('new user created');

                return res.redirect('/users/sign-in');
            }
        }
        else
        {
            console.log('user is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating user :', err);
        return res.send('Internal Server Error');
    }
}

export function createSession(req, res)
{

    return res.redirect('/users/profile');
}

export async function updatePassword(req, res)
{
    try
    {
        let userId = req.user._id;
        let user = await User.findById({_id: userId});
        
        if(user)
        {
            if(req.body.newPassword !== req.body.confirmNewPassword)
            {
                console.log('password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                // Update the user's password
                user.updateUserPassword(req.body.newPassword);

                console.log('password updated successfully');
                return res.redirect('/users/profile');
            }
        }
        return res.status(404).send('user not found');
    }
    catch(error)
    {
        console.error('Error in updating the password:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// destroy session 
export function destroySession(req, res)
{
    req.logout((err)=>
    {
        if(err) console.log("Error in signOut ", err);

        console.log('SignOut successfully');
        return res.redirect('/');
    });
}