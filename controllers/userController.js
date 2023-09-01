import User from '../models/users.js';
import bcrypt from 'bcrypt';

export function signUp(req, res)
{
    return res.render('sign_up', {title: 'Sign Up'});
}

export function signIn(req, res)
{
    return res.render('sign_in', {title: 'Sign In'});
}

export function userProfile(req, res)
{
    return res.render('profile',{title: 'User Profile'});
}

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
    }
}

export async function createSession(req, res)
{
    console.log('createSession ');
    return res.redirect('/users/profile');
}

// detroy session 
export function destroySession(req, res)
{
    
}