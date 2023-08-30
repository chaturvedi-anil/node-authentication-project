export function homeController(req, res)
{
    return res.render('index',{
        title: 'Home'    
    });
}

export function signUp(req, res)
{
    return res.render('sign_up', {title: 'Sign Up'});
}

export function signIn(req, res)
{
    return res.render('sign_in', {title: 'Sign In'});
}