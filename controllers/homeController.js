export function homeController(req, res)
{
    return res.render('index',{
        title: 'Home'    
    });
}