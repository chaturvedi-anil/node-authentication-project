import User from '../models/users.js';
import bcrypt from 'bcrypt';


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
                req.flash('error', 'Password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                await User.create(req.body);
                // console.log('new user created');
                req.flash('success', 'New User registered');
                return res.redirect('/users/sign-in');
            }
        }
        else
        {
            // console.log('user is already registered');
            req.flash('error', 'This User is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating user :', err);
        return res.send('Internal Server Error');
    }
}

// creating session for signed in user
export function createSession(req, res)
{

    req.flash('success', 'Signed In Successfully');
    return res.redirect('/users/profile');
}

// updating existing password 
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
                req.flash('error', 'New password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

                // Update the user's password using the $set operator
                const update = { $set: { password: hashedPassword } };

                // Update the user's document with the new password
                await User.updateOne({ _id: userId }, update);
                // console.log('password updated successfully :');
                req.flash('success', 'Password updated successfully');
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

        // console.log('SignOut successfully');
        req.flash('success', 'SignOut successfully');
        return res.redirect('/');
    });
}