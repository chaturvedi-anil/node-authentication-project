import User from '../models/users.js';
import bcrypt from 'bcrypt';

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

                return res.redirect('/sign-in');
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
    try
    {
        const username = req.body.email;
        const passwordToCheck = req.body.password; // The password entered by the user

        let user = await User.findOne({ email:username });
        if(!user)
        {
            console.log('user not found');
            return res.redirect('back');
        }
        else 
        {
            const passwordMatch = await bcrypt.compare(passwordToCheck, user.password);
            if(passwordMatch) 
            {
                console.log('signIn successfully');
                return res.redirect('/users/profile');
            } 
            else 
            {
                console.log('Password is incorrect');
                return res.redirect('back');
            }
        }
    }
    catch(err)
    {
        console.log("error in sign in :", err);
        return res.redirect('back');
    }
}